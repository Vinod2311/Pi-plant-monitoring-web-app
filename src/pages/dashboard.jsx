import { Container, Flex,Button,Box, IconButton, Stack, useColorModeValue, Grid, GridItem, Image, Text, Center, HStack, Icon, Spacer, Select, CardBody, Card } from "@chakra-ui/react";
import '@fontsource/zcool-xiaowei';
import React from "react"
import { Category, ChartComponent,Tooltip, ColumnSeries, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, DataLabel, Legend } from '@syncfusion/ej2-react-charts';
import { registerLicense } from '@syncfusion/ej2-base';
import GridLayout from "react-grid-layout";
import MyFirstGrid from "../components/gridLayout";
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import Footer from "../components/footer";
import Nav from "../components/navEntry";
import Logo from "../components/logo";
import NavMain from "../components/navMain";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import * as Realm from "realm-web";
import { getApp, initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import ComplexInterfaceGrid from "../components/gridLayout2";
import { IoChevronDownCircleOutline } from "react-icons/io5";

const DashboardPage = () =>{
  
  console.log("Rendering dashboard page")
  registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVF3WmFZfVpgdVVMYFlbRnNPMyBoS35RckVrW3xfcXZcRmZYVEVy');
  

  const [formDisplayed, setFormDisplayed] = useState(false)
  const [raspberryPiName,setRaspberryPiName] = useState('')
  const [userData,setUserData] = useState([])
  const [updateTable,setUpdateTable] = useState(['spread operator'])
  const [sensorPiName,setSensorPiName] = useState('')
  const [sensorName,setSensorName]= useState('')
  const [sensorData, setSensorData] = useState({})
  const [firebaseDBFrequency, setFirebaseDBFrequency] = useState(5)
  const [mongoDBFrequency, setMongoDBFrequency] = useState(1)
  
  useEffect(() => {
    async function getUserData(){
      try{
        //Mongo
        const appRealm = Realm.App.getApp("application-1-dkzsnxq")
        const mongo = await appRealm.currentUser.mongoClient("mongodb-atlas");
        const collection = await mongo.db("Raspberry_pi").collection("Devices")
        const user = appRealm.currentUser
        const devices = await collection.find({"owner_id":user.id})
        //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        //saveAs(blob, "hello world.txt");

        //firebase
        const appFirebase = initializeApp(firebaseConfig)
        const auth = getAuth(appFirebase);
        const userFirebase = await auth.currentUser
        const databaseFirebase = await getDatabase(appFirebase)
        const dataRef = await ref(databaseFirebase, 'users/' + userFirebase.uid + '/raspi 1/reading');
        onValue(dataRef, (snapshot) => {
          const firebaseSnapshot = snapshot.val();
          setSensorData(firebaseSnapshot)
          console.log('firebase data:' + firebaseSnapshot.timestamp)})
        
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

  //const appFirebase = initializeApp(firebaseConfig)
  //const databaseFirebase = getDatabase(appFirebase)
  //const auth = getAuth(appFirebase);

  //const app = Realm.App.getApp("application-1-dkzsnxq");
  //const userFirebase = auth.currentUser

  //get firebase data
//  async function getFirebaseData(){
  
    //const dataRef = ref(databaseFirebase, 'users/' + userFirebase.uid + '/raspi 1/reading');
    //onValue(dataRef, (snapshot) => {
    //const data = snapshot.val();
    //console.log(data)
//});}

 

  //const userMongo = JSON.parse(sessionStorage.getItem('userMongo'))
  //const userFirebase = JSON.parse(sessionStorage.getItem('userFirebase'))
  //console.log(userFirebase.email)
  //console.log(userMongo.profile.data.email)
  const data = [
    { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
    { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
    { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
    { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
    { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
];
  

  function createChart(){
    const tooltip = { enable: true, shared: false };
    const primaryyAxis = { labelFormat: '${value}K' };
    const primarxyAxis = { valueType: 'Category' };
    const legendSettings = { visible: true };
    const marker = { dataLabel: { visible: true } };
    return <ChartComponent id="charts" primaryXAxis={primarxyAxis} legendSettings={legendSettings} primaryYAxis={primaryyAxis} tooltip={tooltip}>
    <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]}/>
    <SeriesCollectionDirective>
      <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker}/>
    </SeriesCollectionDirective>
  </ChartComponent>;
  }

  return(
    <>
    <Container  background={'#A0A5CB'} h='100vh' maxW={'1500px'} minW={"1300px"}  minHeight={'800px'} paddingInlineEnd={'0'} paddingInlineStart={'0'}>
        <Grid  maxH={'100%'}
         gridTemplateColumns={'1fr 1fr 1fr 1fr'} gridTemplateRows={'300px 1fr 50px'}
         templateAreas={`"logo nav nav nav"
                        "main1 main1 main1 main1"
                        "footer footer footer footer"`}>
        <GridItem  area={'nav'}>
          <NavMain />
        </GridItem>
        <GridItem area={'logo'}>
          <Logo />
        </GridItem>
        <GridItem area={'main1'}>
          <Center>
          <Select bg='white' placeholder='Select raspberry pi' value={sensorPiName} onChange={e=> setSensorPiName(e.target.value)} w={'200px'}>
              {userData.length > 0 ?  (
                userData.map(function(object, i){
                return <option key={i}>{object.raspberryPiName}</option>}
              )): null}
            </Select>
            </Center>
            {(!sensorPiName) ? null : (
              <>
              <Box overflow={'hidden'}  padding={'20px'} margin={"20px"} boxShadow={'2xl'} rounded={'2xl'} >
              <ComplexInterfaceGrid></ComplexInterfaceGrid>
                
                
              </Box>
              
              </>
            )}
          </GridItem>
        <GridItem area={'footer'} >
          <Footer />
        </GridItem>
    </Grid>
      
    </Container>
    </>
  );
};


export default DashboardPage