import { Container, Flex,Button,Box, IconButton, Stack, useColorModeValue, Grid, GridItem, Image, Text, Center, HStack, Icon, Spacer, FormControl, FormLabel, Select, VStack, ButtonGroup, CheckboxIcon, TagCloseButton, Editable, EditablePreview, Input, useEditableControls, EditableInput, Card, CardBody, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper, NumberInputField, NumberInput, RangeSliderFilledTrack, TableContainer, Table, Thead, TableCaption, Th, Tr, Tbody, Td, Tfoot, OrderedList, ListItem, UnorderedList } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import '@fontsource/zcool-xiaowei';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from "react"
import * as Realm from "realm-web";
import { initializeApp } from "firebase/app";
import { getAuth ,} from "firebase/auth";
import { getDatabase, ref, child, push, update } from "firebase/database";

import Footer from "../components/footer";
import Nav from "../components/navEntry";
import Logo from "../components/logo";
import NavMain from "../components/navMain";


const RegisterPiPage = () =>{
  console.log("Rendering Register Pi page")

  const [formDisplayed, setFormDisplayed] = useState(false)
  const [raspberryPiName,setRaspberryPiName] = useState('')
  const [userData,setUserData] = useState([])
  const [updateTable,setUpdateTable] = useState(['spread operator'])
  const [sensorPiName,setSensorPiName] = useState('')
  const [sensorName,setSensorName]= useState('')
  const [firebaseDBFrequency, setFirebaseDBFrequency] = useState(5)
  const [mongoDBFrequency, setMongoDBFrequency] = useState(1)

  useEffect(() => {
    async function getUserData(){
      try{
        const app = Realm.App.getApp("application-1-dkzsnxq")
        const mongo = await app.currentUser.mongoClient("mongodb-atlas");
        const collection = await mongo.db("Raspberry_pi").collection("Devices")
        const user = app.currentUser
        const devices = await collection.find({"owner_id":user.id})
        //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        //saveAs(blob, "hello world.txt");
        
        console.log("devices",devices)
        setUserData(devices)
       
      } catch(err){
      console.log(err)
      }}
    getUserData()
    }, [updateTable]);

  const firebaseConfig = {
    apiKey: "AIzaSyCHfnIcqTbOKuKtizPN4qUp6_AuwABENF8",
    authDomain: "raspberry-pi-plant-monitoring.firebaseapp.com",
    databaseURL: "https://raspberry-pi-plant-monitoring-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "raspberry-pi-plant-monitoring",
    storageBucket: "raspberry-pi-plant-monitoring.appspot.com",
    messagingSenderId: "656085848146",
    appId: "1:656085848146:web:d899dd1a52857536610f8b",
    measurementId: "G-XZ4ZSM1J4X"
  };

  const appFirebase = initializeApp(firebaseConfig)
  const databaseFirebase = getDatabase(appFirebase)
  const auth = getAuth(appFirebase);
  
  
  const formatMinute = (val) => val + ` s`
  const formatHour = (val) => val + ` mins`
  


  const handleMinChange = (value) => setFirebaseDBFrequency(value)
  const handleHourChange = (value) => setMongoDBFrequency(value)
  const userMongo = JSON.parse(sessionStorage.getItem('userMongo'))

  const app = Realm.App.getApp("application-1-dkzsnxq"); // replace this with your App ID
  //const user = app.allUsers['66c4881adb9532821c24406b']
  //const mongo = app.currentUser.mongoClient("mongodb-atlas");
  //const collection = mongo.db("Raspberry_pi").collection("Devices")

  
  
  

  async function uploadRaspberryPiName() {
    try{
    const mongo = await app.currentUser.mongoClient("mongodb-atlas");
    const collection = await mongo.db("Raspberry_pi").collection("Devices")
    const user = app.currentUser
    const count = await collection.count()
    const result = await collection.insertOne({"raspberryPiName": raspberryPiName, "owner_id": user.id})
    //const resultFirebase = await update(ref(databaseFirebase), {'config/': {raspberryPiName: raspberryPiName}})
    setRaspberryPiName('')
    setUpdateTable([...updateTable])
    
    console.log(result)}
    catch (err){
      console.log(err)
    }
    
  }

  function resetForm(){
    setSensorName('')
    setMongoDBFrequency(1)
    setFirebaseDBFrequency(5)
    setSensorPiName('')
    
  }

  async function uploadSensor(){
    try{
      const mongo = await app.currentUser.mongoClient("mongodb-atlas");
      const collection = await mongo.db("Raspberry_pi").collection("Devices")
      const user = app.currentUser
      const sensorData = {sensorName: sensorName}
      const result = await collection.updateOne({"raspberryPiName": sensorPiName}, {$push: {'sensors': sensorData}})
      console.log('sdfsdf'+sensorData.sensorName)
      
      //const resultFirebase = await update(ref(databaseFirebase), { path : {sensors: sensorData}})
      setSensorName('')
      setUpdateTable([...updateTable])
      console.log(result)}
      catch (err){
        console.log(err)
      }
  }

  async function uploadTimings(){
    try{
      const mongo = await app.currentUser.mongoClient("mongodb-atlas");
      const collection = await mongo.db("Raspberry_pi").collection("Devices")
      const userFirebase = auth.currentUser
      await collection.updateOne({"raspberryPiName": sensorPiName}, {$set:{'timings': {firebaseDBFrequency: firebaseDBFrequency, mongoDBFrequency:mongoDBFrequency}}},{ upsert:true})
      await update(ref(databaseFirebase,'users/' + userFirebase.uid +'/' + sensorPiName +  '/config'),{firebaseDBFrequency: firebaseDBFrequency, mongoDBFrequency:mongoDBFrequency})
      
      //const resultFirebase = await update(ref(databaseFirebase), { path : {sensors: sensorData}})
      setMongoDBFrequency(1)
      setFirebaseDBFrequency(5)
      setUpdateTable([...updateTable])}
      catch (err){
        console.log(err)
      }
  }
  

 

  async function testMongo(){
    const mongo = await app.currentUser.mongoClient("mongodb-atlas");
    const collection = await mongo.db("Raspberry_pi").collection("Devices")
    const count = await collection.count()
    const name = raspberryPiName
    //const result = await collection.insertOne({raspberryPiName: "drg"})
  }
  function test(){
    userData.length > 0 ?  (
      userData.map(function(object, i){
        console.log("value" + i)
      }
    )): null
  }
  
  
  
  //testMongo()

  //const mongo2 = userMongo.mongoClient("mongodb-atlas")


  return(
    <>
    <Container  background={'#A0A5CB'} h='100%' maxW={'1500px'} minW={"1300px"}  minHeight={'800px'} paddingInlineEnd={'0'} paddingInlineStart={'0'}>
        <Grid  h={'100%'} w={'100%'}
         gridTemplateColumns={'1fr 1fr 1fr 1fr'} gridTemplateRows={'400px 1fr 50px'}
         templateAreas={`"logo nav nav nav"
                        "main1 main1 main1 main2"
                        "footer footer footer footer"`}>
        <GridItem  area={'nav'}>
          <NavMain />
        </GridItem>
        <GridItem area={'logo'}> 
          <Logo />
        </GridItem>
        <GridItem area={'main1'}>
          {(!formDisplayed) ? (
          <Center>
            <Button size='lg' colorScheme='blue' w='300px' justifyContent={'center'} onClick={() => setFormDisplayed(true)}>
              + Register Pi or sensor
            </Button>
          </Center>) : (
            <>
            
            <Box  >
            <Text align={'Register'} fontSize={'5xl'}>
              
            </Text>
            <HStack spacing={'20px'}  alignItems={'start'}>
              <VStack spacing={'20px'}>
                <Card background={'#8d94cc'} width={'fit-content'}>
                  <Flex >
                  <CardBody flex={'fit-content'}>
                    <VStack spacing={'20px'} >
                    <Text fontSize={'4xl'} >
                          Add Raspberry Pi
                        </Text>
                        
                        <Editable 
                          placeholder="Enter raspberry pi name"
                            bg={'white'}
                            width={'100%'}
                          >
                            <EditablePreview  paddingStart={'20px'} paddingEnd={'20px'} value= {raspberryPiName}/>
                            {/* Here is the custom input */}
                            <EditableInput  paddingStart={'20px'} paddingEnd={'20px'} value= {raspberryPiName} onChange={e => setRaspberryPiName(e.target.value)}/>
                            
                          </Editable>
                          
                          <Button size='lg' colorScheme='blue' type="button" alignSelf='center' onClick={() => uploadRaspberryPiName()}>
                            + Add Raspberry Pi
                          </Button>
                          
                      </VStack>
                  </CardBody>
                  </Flex>
                </Card>
                <Card background={'#8d94cc'} w={'300px'} >
                  <CardBody>
                    
                    <VStack spacing={'30px'}>
                      <Text fontSize={'4xl'}>
                        Add Sensor
                      </Text>

                    <Select bg='white' placeholder='Select raspberry pi' value={sensorPiName} onChange={e=> setSensorPiName(e.target.value)} w={'200px'}>
                      {userData.length > 0 ?  (
                        userData.map(function(object, i){
                        return <option key={i}>{object.raspberryPiName}</option>}
                      )): null}
                    </Select>

                      <Select bg='white' placeholder='Select sensor' value={sensorName} onChange={e => setSensorName(e.target.value)} w={'200px'}>
                      <option>SEN0193 - soil moisture</option>
                      <option>BH170 - light sensor</option>
                      <option>BMP280 - temperature + air pressure</option>
                      <option>DHT22 - temperature + humidity</option>
                      <option>PiCamera</option>
                      
                    </Select>
                    
                      
                    <Button size='lg' colorScheme='blue' type="submit" alignSelf='center' onClick={() => uploadSensor()}>
                      + Add sensor
                    </Button>
                    

                  </VStack>
                </CardBody>
              </Card>
                
              </VStack>
              <Card background={'#8d94cc'} w={'600px'}>
                  <CardBody>
                    <VStack>
                      <Text fontSize={'4xl'}>
                        Add Timing
                      </Text>
                        <Select bg='white' placeholder='Select raspberry pi' value={sensorPiName} onChange={e=> setSensorPiName(e.target.value)} w={'200px'}>
                        {userData.length > 0 ?  (
                          userData.map(function(object, i){
                          return <option key={i}>{object.raspberryPiName}</option>}
                        )): null}
                      </Select>
                      <HStack spacing={'20px'} w={"100%"} >
                        <Text padding={'10px'} bg={'#F5F5F5'} w={'600px'} fontWeight={'bold'} >
                          Realtime data collection frequency:
                        </Text>
                    <NumberInput step={5} min={5} max={60} bg='white' w={'250px'} mr='2rem' value={formatMinute(firebaseDBFrequency)} onChange={handleMinChange}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Slider step={5} min={5} max={60}
                      focusThumbOnChange={false}
                      value={firebaseDBFrequency}
                      onChange={handleMinChange}
                      w={'200px'}>
                      <SliderTrack>
                        <SliderFilledTrack/>
                      </SliderTrack>
                      <SliderThumb fontSize='sm' boxSize='20px'  />
                    </Slider>
                    </HStack>

                    <HStack spacing={'20px'} w={'100%'}>
                        <Text padding={'10px'} bg={'#F5F5F5'} w={'600px'} fontWeight={'bold'} >
                          Persistent data collection frequency:
                        </Text>
                    <NumberInput step={1} min={1} max={60} bg='white' w={'250px'} mr='2rem' value={formatHour(mongoDBFrequency)} onChange={handleHourChange}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Slider step={1} min={1} max={60}
                      
                      focusThumbOnChange={false}
                      value={mongoDBFrequency}
                      onChange={handleHourChange}
                      w={'200px'}>
                      <SliderTrack>
                        <SliderFilledTrack/>
                      </SliderTrack>
                      <SliderThumb fontSize='sm' boxSize='20px'  />
                    </Slider>
                    </HStack>
                    <Button size='lg' colorScheme='blue' type="submit" alignSelf='center' onClick={() => uploadTimings()}>
                      + Add Timing
                    </Button>
                    </VStack>
                  </CardBody>
                </Card> 
              
              
            </HStack>
          </Box>
          </>
          )}
          </GridItem>
          <GridItem area={'main2'} >
          <VStack>
            
              <Text fontSize={'3xl'}>Current Devices</Text>
          
              <TableContainer bg={'white'}>
                <Table variant='simple'>
                  
                  <Thead>
                    <Tr>
                      <Th>Device</Th>
                      <Th>Value</Th>
                      
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userData.length > 0 ? 
                     ( userData.map(function(object, i){
                      return (
                        <div key={i}>
                          <Tr >
                            <Td>Raspberry Pi Name</Td>
                            <Td>{object.raspberryPiName}</Td>
                            
                          </Tr>
                          <Tr>
                            <Td>Sensors</Td>
                            <UnorderedList>
                              { (userData[i].sensors) ? 
                                ( userData[i].sensors.map(function(sensor,j){
                                  
                                return (<ListItem key={j}>{sensor.sensorName}</ListItem>
                                )
                                })) : <ListItem>No sensors</ListItem>}
                              
                            
                            </UnorderedList>
                          </Tr>
                          <Tr>
                            <Td>Realtime DB Frequency</Td>
                            { (userData[i].timings ) ? 
                            (<Td>{object.timings.firebaseDBFrequency} seconds</Td>): <Td>No timing yet</Td>}
                            
                          </Tr>
                          <Tr>
                            <Td>Persistent DB Frequency</Td>
                            { (userData[i].timings ) ? 
                            (<Td>{object.timings.mongoDBFrequency} mins</Td>): <Td>No timing yet</Td>}
                          </Tr>
                          <Tr>
                            <Td></Td>
                          </Tr>
                          <Tr>
                            <Td></Td>
                          </Tr>

                        </div>
                      )
                     })) 
                     : null } 
                    <Tr>
                      <Td></Td>
                    </Tr>
                    
                  </Tbody>
                  <Tfoot>
                    
                  </Tfoot>
                </Table>
              </TableContainer>
                  
        
          </VStack>
        </GridItem>
        <GridItem area={'footer'} paddingTop={'30px'}>
          <Footer />
        </GridItem>
    </Grid> 
      
    </Container>
    </>
  );
};


export default RegisterPiPage