import { Container, Flex,Button,Box, IconButton, Stack, useColorModeValue, Grid, GridItem, Image, Text, Center, HStack, Icon, Spacer, FormControl, FormLabel, Select, VStack, ButtonGroup, CheckboxIcon, TagCloseButton, Editable, EditablePreview, Input, useEditableControls, EditableInput, Card, CardBody, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper, NumberInputField, NumberInput, RangeSliderFilledTrack, TableContainer, Table, Thead, TableCaption, Th, Tr, Tbody, Td, Tfoot, OrderedList, ListItem } from "@chakra-ui/react";
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
import React, { useEffect, useState } from "react"
import * as Realm from "realm-web";
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword} from "firebase/auth";

import Footer from "../components/footer";
import Nav from "../components/navEntry";
import Logo from "../components/logo";
import NavMain from "../components/navMain";

const RegisterPiPage = () =>{
  console.log("Rendering Register Pi page")

  const [formDisplayed, setFormDisplayed] = useState(false)
  const [raspberryPiName,setRaspberryPiName] = useState({raspberryPiName:''})
  const [submit,setSubmit] = useState(false)
  const [sensorData,setSensorData]= useState({
    sensors: [], ownerId: ''
  })
  const [firebaseDBFrequency, setFirebaseDBFrequency] = useState(5)
  const [mongoDBFrequency, setMongoDBFrequency] = useState(1)

  useEffect(() =>{
    try{
      const mongo =  app.currentUser.mongoClient("mongodb-atlas");
      const collection =  mongo.db("Raspberry_pi").collection("Devices")
      const count = await collection.count()
      const value = {raspberryPiName: raspberryPiName}
      const result = await collection.insertOne(value)
      console.log(result)}
      catch (err){
        console.log(err)
      }
  },[submit])
  
  
  const formatMinute = (val) => val + ` mins`
  const formatHour = (val) => val + ` hours`
  const dummyData = {}


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
    const count = await collection.count()
    const value = {raspberryPiName: raspberryPiName}
    const result = await collection.insertOne(value)
    console.log(result)}
    catch (err){
      console.log(err)
    }
    
  }

  async function handleUploadName() {
    await uploadRaspberryPiName()
  } 

  async function testMongo(){
    const mongo = await app.currentUser.mongoClient("mongodb-atlas");
    const collection = await mongo.db("Raspberry_pi").collection("Devices")
    const count = await collection.count()
    const name = raspberryPiName
    const result = await collection.insertOne({raspberryPiName: "drg"})
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
            
            <FormControl  >
            <Text align={'Register'} fontSize={'5xl'}>
              
            </Text>
            <HStack spacing={'20px'}  alignItems={'start'}>
              <Card background={'#8d94cc'} width={'fit-content'}>
                <Flex >
                <CardBody flex={'fit-content'}>
                  <VStack spacing={'20px'} >
                  <Text fontSize={'4xl'} >
                        Add Raspberry Pi
                      </Text>
                      <form>
                      <Editable 
                      placeholder="Enter raspberry pi name"
                          bg={'white'}
                        
                           
                          
                        >
                          <EditablePreview width={'auto'} paddingStart={'20px'} paddingEnd={'20px'}/>
                          {/* Here is the custom input */}
                          <EditableInput  paddingStart={'20px'} paddingEnd={'20px'} value= {raspberryPiName} onChange={e => setRaspberryPiName(e.target.value)}/>
                          
                        </Editable>
                
                        <Button size='lg' colorScheme='blue' type="submit" alignSelf='center' onClick={ setSubmit(true)}>
                          + Add Raspberry Pi
                        </Button>
                        </form>
                  </VStack>
                </CardBody>
                </Flex>
              </Card>
               
                <>
                <Card background={'#8d94cc'} w={'600px'}>
                  <CardBody>
                    
                    <VStack spacing={'30px'}>
                      <Text fontSize={'4xl'}>
                        Add Sensor
                      </Text>

                    <Select bg='white' placeholder='Select raspberry pi' w={'200px'}>
                      <option>rasp1</option>
                      <option>rasp2</option>
                      
                    </Select>

                      <Select bg='white' placeholder='Select sensor' w={'200px'}>
                      <option>sensor1</option>
                      <option>sensor2</option>
                      <option>sensor3</option>
                      <option>sensor4</option>
                      <option>sensor5</option>
                      <option>sensor6</option>
                    </Select>
                    
                      <HStack spacing={'20px'} w={"100%"} >
                        <Text padding={'10px'} bg={'#F5F5F5'} w={'600px'} fontWeight={'bold'} >
                          Realtime data collection frequency:
                        </Text>
                    <NumberInput step={5} min={5} max={30} bg='white' w={'250px'} mr='2rem' value={formatMinute(firebaseDBFrequency)} onChange={handleMinChange}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Slider step={5} min={5} max={30}
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
                    <NumberInput step={1} min={1} max={24} bg='white' w={'250px'} mr='2rem' value={formatHour(mongoDBFrequency)} onChange={handleHourChange}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Slider step={5} min={5} max={30}
                      
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
                    <Button size='lg' colorScheme='blue' type="submit" alignSelf='center'>
                      + Add sensor
                    </Button>
                    

                  </VStack>
                </CardBody>
              </Card>
              
              </>
              
            </HStack>
          </FormControl>
          </>
          )}
          </GridItem>
          <GridItem area={'main2'} >
          <VStack>
            
              <Text fontSize={'3xl'}>Current Devices</Text>
          
              <TableContainer bg={'white'}>
                <Table variant='simple'>
                  <TableCaption>Your Devices</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Device</Th>
                      <Th>Value</Th>
                      
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Raspberry Name</Td>
                      <Td>To be filled</Td>
                    </Tr>
                    
                    <Tr>
                      <Td>Sensors</Td>
                      <Td>
                      <OrderedList>
                        <ListItem>Lorem ipsum dolor sit amet</ListItem>
                        <ListItem>Consectetur adipiscing elit</ListItem>
                        <ListItem>Integer molestie lorem at massa</ListItem>
                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                      </OrderedList>
                      </Td>
                    </Tr>
                    
                    
                  </Tbody>
                  <Tfoot>
                    
                  </Tfoot>
                </Table>
              </TableContainer>
                  <Button size='lg' colorScheme='blue' type="submit" alignSelf='center'>
                      Save
                  </Button>
        
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