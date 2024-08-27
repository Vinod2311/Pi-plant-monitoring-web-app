import {
  Container,
  Flex,
  Button,
  Box,
  IconButton,
  Stack,
  useColorModeValue,
  Grid,
  GridItem,
  Image,
  Text,
  Center,
  HStack,
  Icon,
  Spacer,
  Select,
  CardBody,
  Card,
  VStack,
  Heading,
  SimpleGrid,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import "@fontsource/zcool-xiaowei";
import React from "react";
import {
  Category,
  ChartComponent,
  Tooltip,
  ColumnSeries,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  DataLabel,
  Legend,
} from "@syncfusion/ej2-react-charts";
import { registerLicense } from "@syncfusion/ej2-base";
import GridLayout from "react-grid-layout";
import MyFirstGrid from "../components/gridLayout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import Footer from "../components/footer";
import Nav from "../components/navEntry";
import Logo from "../components/logo";
import NavMain from "../components/navMain";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import * as Realm from "realm-web";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import ComplexInterfaceGrid from "../components/grid";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import styles from "../styles/styles";
import LineChart from "../components/lineChart";
import CircularGauge from "../components/circularGauge";
import { useRef } from "react";

const DashboardPage = () => {
  
  registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVF3WmFZfVpgdVVMYFlbRnNPMyBoS35RckVrW3xfcXZcRmZYVEVy"
  );

  const [formDisplayed, setFormDisplayed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [updateTable, setUpdateTable] = useState(["spread operator"]);
  const [sensorPiName, setSensorPiName] = useState("");
  const [collectionReading, setCollectionReading] = useState();
  const [chartNames, setChartNames] = useState([])

  const [sensorData, setSensorData] = useState({});
  const [readingsMongo, setReadingsMongo] = useState([]);
  const [widgets, setWidgets] = useState([]);
  console.log(widgets[0])
  const mongo = useRef(null);

  useEffect(() => {
    async function getUserData() {
      console.log("Rendering dashboard page");
      const firebaseConfig = {
        apiKey: "AIzaSyCHfnIcqTbOKuKtizPN4qUp6_AuwABENF8",
        authDomain: "raspberry-pi-plant-monitoring.firebaseapp.com",
        databaseURL:
          "https://raspberry-pi-plant-monitoring-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "raspberry-pi-plant-monitoring",
        storageBucket: "raspberry-pi-plant-monitoring.appspot.com",
        messagingSenderId: "656085848146",
        appId: "1:656085848146:web:d899dd1a52857536610f8b",
        measurementId: "G-XZ4ZSM1J4X",
      };
      try {
        //Mongo
        const appRealm = Realm.App.getApp("application-1-dkzsnxq");
        mongo.current = await appRealm.currentUser.mongoClient("mongodb-atlas");
        const collectionDevices = await mongo.current
          .db("Raspberry_pi")
          .collection("Devices");

        const user = appRealm.currentUser;
        const collectionReading = mongo.current
          .db("Readings")
          .collection(`${user.id}`);
        var inputDate = new Date();

        const first = await collectionReading.findOne();
        const last = await collectionReading.aggregate([
          {
            $group: {
              _id: "$time",
            },
          },
          { $sort: { _id: -1 } },
          { $limit: 1 },
        ]);

        console.log("first: " + first.time.toLocaleString());
        console.log("last: " + last[0]._id.toLocaleString());
        const devices = await collectionDevices.find({ owner_id: user.id });
        setUserData(devices);
        setCollectionReading(collectionReading);
        //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        //saveAs(blob, "hello world.txt");

        //firebase
        //const appsFirebase = getApps()
        //const appFirebase = appsFirebase[0]
        /*
        const appFirebase = initializeApp(firebaseConfig);
        const databaseFirebase = await getDatabase(appFirebase);
        const auth = getAuth(appFirebase);
        const userFirebase = auth.currentUser;

        const dataRef = await ref(
          databaseFirebase,
          "users/" + userFirebase.uid + "/raspi 1/reading"
        );

        onValue(dataRef, (snapshot) => {
          const firebaseSnapshot = snapshot.val();
          setSensorData(firebaseSnapshot);
          console.log("firebase data:" + firebaseSnapshot.timestamp);
        });*/
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
    //getMongoTimeData('2024-08-23-00-00-00','2024-08-23-01-00-00')
  }, []);

  async function setupFirebase() {
    const appFirebase = initializeApp(firebaseConfig);
    const databaseFirebase = getDatabase(appFirebase);
    const auth = getAuth(appFirebase);
    const userFirebase = auth.currentUser;
    const dataRef = await ref(
      databaseFirebase,
      "users/" + userFirebase.uid + "/raspi 1/reading"
    );
    onValue(dataRef, (snapshot) => {
      const firebaseSnapshot = snapshot.val();
      setSensorData(firebaseSnapshot);
      console.log("firebase data:" + firebaseSnapshot.timestamp);
    });
  }

  async function setupMongo() {
    const appRealm = Realm.App.getApp("application-1-dkzsnxq");
    const mongo = await appRealm.currentUser.mongoClient("mongodb-atlas");
    const collectionDevices = await mongo
      .db("Raspberry_pi")
      .collection("Devices");

    const user = appRealm.currentUser;
    const collectionReading = mongo.db("Readings").collection(`${user.id}`);
    var inputDate = new Date();
    const readingsMongo = await collectionReading.find({
      "soilMoisture(RH)": 27.86,
    });
    const devices = await collectionDevices.find({ owner_id: user.id });
    console.log("devices", devices);
    setUserData(devices);
    setCollectionReading(collectionReading);
  }

  //setupFirebase()
  //setupMongo()

  const addWidget = () => {
    const newWidget = { i: `widget ${widgets.length + 1}` };
    //const newArray = ([...widgets,newWidget])
    setWidgets([newWidget]);
  }

  const removeWidget = (i) => {
    const newLayout = widgets.filter((item) => item.i !== i);
    setWidgets(newLayout);
  };
  

  const getMongoRange = async () => {
    const last = await collectionReading.findOne();
    const first = await collectionReading.findOne({});
    console.log("first: " + first.time);
    console.log("last: " + last.time);
  };
  //getMongoRange()

  function toISOString(date) {
    const parts = date.split("-");
    const mydate = new Date(
      parts[0],
      parts[1] - 1,
      parts[2],
      parts[3],
      parts[4],
      parts[5]
    );
    console.log(mydate);
    return mydate;
  }
  //toISOString('2024-08-22')

  const getMongoTimeData = async (startDate, endDate) => {
    console.log(new Date());
    const startDateISO = toISOString(startDate);
    const endDateISO = toISOString(endDate);
    const last = await collectionReading.aggregate([
      {
        $group: {
          _id: "$time",
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 1 },
    ]);
    console.log("last: " + last[0]._id);

    const readingsMongoCount = await collectionReading.aggregate([
      {
        $match: {
          time: { $lte: endDateISO, $gte: startDateISO },
        },
      },
      {
        $group: {
          _id: "$time",
        },
      },
      {
        $count: "items",
      },
    ]);

    const readingsMongo = await collectionReading.aggregate([
      {
        $match: {
          time: { $lte: endDateISO, $gte: startDateISO },
        },
      },

      //{
      //  $group: {
      //    _id: "$soilMoisture(RH)",
      //  },
      //},
    ]);
    console.log(readingsMongo[0]);
    return readingsMongo;
  };
  //setReadingsMongo(readingsMongo)

  //getMongoTimeData('2024-08-23-00-00-00','2024-08-23-01-00-00')
  async function handleChartChange(startDate, endDate) {
    setReadingsMongo(await getMongoTimeData(startDate, endDate));
  }
  return (
    <>
      <Flex style={styles.app}>
        <Container
          minHeight={"max-content"}
          background={"#A0A5CB"}
          h="max-content"
          maxW={"1500px"}
          minW={"1300px"}
          paddingInlineEnd={"0"}
          paddingInlineStart={"0"}
        >
          <Grid
            flex="1"
            gridTemplateColumns={"1fr 1fr 1fr 1fr"}
            gridTemplateRows={"2fr 5fr 1fr"}
            templateAreas={`"logo nav nav nav"
                        "main1 main1 main1 main1"
                        "footer footer footer footer"`}
          >
            <GridItem area={"nav"}>
              <NavMain />
            </GridItem>
            <GridItem area={"logo"}>
              <Logo />
            </GridItem>
            <GridItem area={"main1"}>
              <Center>
                <Select
                  bg="white"
                  placeholder="Select raspberry pi"
                  value={sensorPiName}
                  onChange={(e) => setSensorPiName(e.target.value)}
                  w={"200px"}
                >
                  {userData.length > 0
                    ? userData.map(function (object, i) {
                        return (
                          <option key={i}>{object.raspberryPiName}</option>
                        );
                      })
                    : null}
                </Select>
              </Center>
              {!sensorPiName ? null : (
                <>
                  <Flex>
                    <Box
                      flex={"1"}
                      overflow={"auto"}
                      padding={"20px"}
                      margin={"20px"}
                      boxShadow={"2xl"}
                      rounded={"2xl"}
                    >
                      <SimpleGrid columns={2} spacing={10}>
                        {widgets.length > 0 ? (
                          widgets.map(function(item,j){
                            return (
                            <div key={item.i} style={{ background: "#009688" }}>
                              <Card>
                                <CardBody>
                                  <LineChart  onDelete={ (item) => removeWidget(item.i)}/>
                                </CardBody>
                              </Card>
                            </div>)
                          }
                        )) : (
                          <Card>
                            <CardBody>Add a display</CardBody>
                          </Card>
                        )}
                      </SimpleGrid>
                      <Button
                        margin={"30px"}
                        colorScheme="blue"
                        onClick={() => addWidget()}
                      >
                        Add
                      </Button>
                    </Box>
                  </Flex>
                </>
              )}
            </GridItem>
            <GridItem area={"footer"}>
              <Footer />
            </GridItem>
          </Grid>
        </Container>
      </Flex>
    </>
  );
};

export default DashboardPage;
