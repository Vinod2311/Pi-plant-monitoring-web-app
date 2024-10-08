import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Grid,
  GridItem,
  HStack,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import "@fontsource/zcool-xiaowei";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Realm from "realm-web";
import Footer from "../components/footer";
import Logo from "../components/logo";
import NavMain from "../components/navMain";

const RegisterPiPage = () => {
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [raspberryPiName, setRaspberryPiName] = useState("");
  const [userData, setUserData] = useState([]);
  const [updateTable, setUpdateTable] = useState(["spread operator"]);
  const [sensorPiName, setSensorPiName] = useState("");
  const [sensorName, setSensorName] = useState("");
  const [firebaseDBFrequency, setFirebaseDBFrequency] = useState(5);
  const [mongoDBFrequency, setMongoDBFrequency] = useState(1);
  const [cameraFrequency, setCameraFrequency] = useState(1);

  //Create instance of MongoDB client
  const appMongo = new Realm.App({
    id: "application-1-dkzsnxq",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      try {
        console.log("Rendering Register Pi page");
        const appMongo = new Realm.App({
          id: "application-1-dkzsnxq",
        });
        const mongoUser = await appMongo.currentUser;
        const mongo = await mongoUser.mongoClient("mongodb-atlas");
        const collection = await mongo.db("Raspberry_pi").collection("Devices");
        const devices = await collection.find({ owner_id: mongoUser.id });
        setUserData(devices);
      } catch (err) {
        console.log(err);
      }
    }

    //check if user is logged in.
    if (sessionStorage.getItem("userFirebase") == null) {
      navigate("/");
    }
    getUserData();
  }, [navigate, updateTable]);

  //Public firebase API
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

  //Create instance of connection with FirebaseDB
  const appFirebase = initializeApp(firebaseConfig);
  const databaseFirebase = getDatabase(appFirebase);
  const auth = getAuth(appFirebase);

  //formatting of the timestamp
  const formatSeconds = (val) => val + ` s`;
  const formatMinute = (val) => val + ` mins`;
  const formatHour = (val) => val + ` hrs`;
  const handleSecondChange = (value) => setFirebaseDBFrequency(value);
  const handleMinuteChange = (value) => setMongoDBFrequency(value);
  const handleHourChange = (value) => setCameraFrequency(value);

  //Upload Pi name to firebase and mongoDb
  async function uploadRaspberryPiName() {
    try {
      const mongo = await appMongo.currentUser.mongoClient("mongodb-atlas");
      const collection = await mongo.db("Raspberry_pi").collection("Devices");
      const user = appMongo.currentUser;
      const result = await collection.insertOne({
        raspberryPiName: raspberryPiName,
        owner_id: user.id,
      });
      setRaspberryPiName("");
      //Force re-render
      setUpdateTable([...updateTable]);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  //Upload sensor details to mongoDB
  async function uploadSensor() {
    try {
      const mongo = await appMongo.currentUser.mongoClient("mongodb-atlas");
      const collection = await mongo.db("Raspberry_pi").collection("Devices");
      const sensorData = { sensorName: sensorName };
      const result = await collection.updateOne(
        { raspberryPiName: sensorPiName },
        { $push: { sensors: sensorData } }
      );
      setSensorName("");
      //Force re-render
      setUpdateTable([...updateTable]);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  //Upload reading collection frequency to mongo and firebase
  async function uploadTimings() {
    try {
      if (sensorPiName) {
        const mongo = await appMongo.currentUser.mongoClient("mongodb-atlas");
        const collection = await mongo.db("Raspberry_pi").collection("Devices");
        const userFirebase = auth.currentUser;
        await collection.updateOne(
          { raspberryPiName: sensorPiName },
          {
            $set: {
              timings: {
                firebaseDBFrequency: firebaseDBFrequency,
                mongoDBFrequency: mongoDBFrequency,
                cameraFrequency: cameraFrequency,
              },
            },
          },
          { upsert: true }
        );
        await update(
          ref(
            databaseFirebase,
            "users/" + userFirebase.uid + "/" + sensorPiName + "/config"
          ),
          {
            firebaseDBFrequency: firebaseDBFrequency,
            mongoDBFrequency: mongoDBFrequency,
            cameraFrequency: cameraFrequency,
          }
        );
        setMongoDBFrequency(1);
        setFirebaseDBFrequency(5);
        setCameraFrequency(1);
        setUpdateTable([...updateTable]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Container
        background={"#A0A5CB"}
        minHeight={"1300px"}
        minW={"1300px"}
        paddingInlineEnd={"0"}
        paddingInlineStart={"0"}
      >
        <Grid
          h={"100%"}
          w={"100%"}
          gridTemplateColumns={"1fr 1fr 1fr 1fr"}
          gridTemplateRows={"300px 1fr 50px"}
          templateAreas={`"logo nav nav nav"
                        "main1 main1 main1 main2"
                        "footer footer footer footer"`}
        >
          <GridItem area={"nav"}>
            <NavMain />
          </GridItem>
          <GridItem area={"logo"}>
            <Logo />
          </GridItem>
          <GridItem area={"main1"}>
            {!formDisplayed ? (
              <Center>
                <Button
                  size="lg"
                  colorScheme="blue"
                  w="300px"
                  justifyContent={"center"}
                  onClick={() => setFormDisplayed(true)}
                >
                  + Register Pi or sensor
                </Button>
              </Center>
            ) : (
              <>
                <Box>
                  <Text align={"Register"} fontSize={"5xl"}></Text>
                  <HStack spacing={"20px"} alignItems={"start"}>
                    <VStack spacing={"20px"}>
                      <Card background={"#8d94cc"} width={"fit-content"}>
                        <Flex>
                          <CardBody flex={"fit-content"}>
                            <VStack spacing={"20px"}>
                              <Text fontSize={"4xl"}>Add Raspberry Pi</Text>

                              <Editable
                                placeholder="Enter raspberry pi name"
                                bg={"white"}
                                width={"100%"}
                              >
                                <EditablePreview
                                  paddingStart={"20px"}
                                  paddingEnd={"20px"}
                                  value={raspberryPiName}
                                />
                                <EditableInput
                                  paddingStart={"20px"}
                                  paddingEnd={"20px"}
                                  value={raspberryPiName}
                                  onChange={(e) =>
                                    setRaspberryPiName(e.target.value)
                                  }
                                />
                              </Editable>

                              <Button
                                size="lg"
                                colorScheme="blue"
                                type="button"
                                alignSelf="center"
                                onClick={() => uploadRaspberryPiName()}
                              >
                                + Add Raspberry Pi
                              </Button>
                            </VStack>
                          </CardBody>
                        </Flex>
                      </Card>
                      <Card background={"#8d94cc"} w={"300px"}>
                        <CardBody>
                          <VStack spacing={"30px"}>
                            <Text fontSize={"4xl"}>Add Sensor</Text>

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
                                      <option key={i}>
                                        {object.raspberryPiName}
                                      </option>
                                    );
                                  })
                                : null}
                            </Select>

                            <Select
                              bg="white"
                              placeholder="Select sensor"
                              value={sensorName}
                              onChange={(e) => setSensorName(e.target.value)}
                              w={"200px"}
                            >
                              <option>SEN0193 - soil moisture</option>
                              <option>BH170 - light sensor</option>
                              <option>
                                BMP280 - temperature + air pressure
                              </option>

                              <option>PiCamera</option>
                            </Select>

                            <Button
                              size="lg"
                              colorScheme="blue"
                              type="submit"
                              alignSelf="center"
                              onClick={() => uploadSensor()}
                            >
                              + Add sensor
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>
                    </VStack>
                    <Card background={"#8d94cc"} w={"600px"}>
                      <CardBody>
                        <VStack>
                          <Text fontSize={"4xl"}>Add Timing</Text>
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
                                    <option key={i}>
                                      {object.raspberryPiName}
                                    </option>
                                  );
                                })
                              : null}
                          </Select>
                          <HStack spacing={"20px"} w={"100%"}>
                            <Text
                              padding={"10px"}
                              bg={"#F5F5F5"}
                              w={"600px"}
                              fontWeight={"bold"}
                            >
                              Realtime data collection frequency:
                            </Text>
                            <NumberInput
                              step={5}
                              min={5}
                              max={60}
                              bg="white"
                              w={"500px"}
                              mr="2rem"
                              value={formatSeconds(firebaseDBFrequency)}
                              onChange={handleSecondChange}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <Slider
                              step={5}
                              min={5}
                              max={60}
                              focusThumbOnChange={false}
                              value={firebaseDBFrequency}
                              onChange={handleSecondChange}
                              w={"200px"}
                            >
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb fontSize="sm" boxSize="20px" />
                            </Slider>
                          </HStack>

                          <HStack spacing={"20px"} w={"100%"}>
                            <Text
                              padding={"10px"}
                              bg={"#F5F5F5"}
                              w={"600px"}
                              fontWeight={"bold"}
                            >
                              Persistent data collection frequency:
                            </Text>
                            <NumberInput
                              step={1}
                              min={1}
                              max={60}
                              bg="white"
                              w={"500px"}
                              mr="2rem"
                              value={formatMinute(mongoDBFrequency)}
                              onChange={handleMinuteChange}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <Slider
                              step={1}
                              min={1}
                              max={60}
                              focusThumbOnChange={false}
                              value={mongoDBFrequency}
                              onChange={handleMinuteChange}
                              w={"200px"}
                            >
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb fontSize="sm" boxSize="20px" />
                            </Slider>
                          </HStack>
                          <HStack spacing={"20px"} w={"100%"}>
                            <Text
                              padding={"10px"}
                              bg={"#F5F5F5"}
                              w={"600px"}
                              fontWeight={"bold"}
                            >
                              Camera Frequency:
                            </Text>
                            <NumberInput
                              step={1}
                              min={1}
                              max={60}
                              bg="white"
                              w={"500px"}
                              mr="2rem"
                              value={formatHour(cameraFrequency)}
                              onChange={handleHourChange}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <Slider
                              step={1}
                              min={1}
                              max={60}
                              focusThumbOnChange={false}
                              value={cameraFrequency}
                              onChange={handleHourChange}
                              w={"200px"}
                            >
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb fontSize="sm" boxSize="20px" />
                            </Slider>
                          </HStack>
                          <Button
                            size="lg"
                            colorScheme="blue"
                            type="submit"
                            alignSelf="center"
                            onClick={uploadTimings}
                          >
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
          <GridItem area={"main2"}>
            <VStack marginStart={"20px"}>
              <Text fontSize={"3xl"}>Current Devices</Text>

              <TableContainer bg={"white"}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Device</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userData.length > 0
                      ? userData.map(function (object, i) {
                          return (
                            <div key={i}>
                              <Tr>
                                <Td>Raspberry Pi Name</Td>
                                <Td>{object.raspberryPiName}</Td>
                              </Tr>
                              <Tr>
                                <Td>Sensors</Td>
                                <UnorderedList>
                                  {userData[i].sensors ? (
                                    userData[i].sensors.map(function (
                                      sensor,
                                      j
                                    ) {
                                      return (
                                        <ListItem key={j}>
                                          {sensor.sensorName}
                                        </ListItem>
                                      );
                                    })
                                  ) : (
                                    <ListItem>No sensors</ListItem>
                                  )}
                                </UnorderedList>
                              </Tr>
                              <Tr>
                                <Td>Realtime DB Frequency</Td>
                                {userData[i].timings ? (
                                  <Td>
                                    {object.timings.firebaseDBFrequency} seconds
                                  </Td>
                                ) : (
                                  <Td>No timing yet</Td>
                                )}
                              </Tr>
                              <Tr>
                                <Td>Persistent DB Frequency</Td>
                                {userData[i].timings ? (
                                  <Td>
                                    {object.timings.mongoDBFrequency} mins
                                  </Td>
                                ) : (
                                  <Td>No timing yet</Td>
                                )}
                              </Tr>
                              {object.sensors &&
                              object.sensors.find(
                                (e) => e.sensorName == "PiCamera"
                              ) ? (
                                <Tr>
                                  <Td>Camera Frequency</Td>
                                  {userData[i].timings ? (
                                    <Td>
                                      {object.timings.cameraFrequency} hours
                                    </Td>
                                  ) : (
                                    <Td>No timing yet</Td>
                                  )}
                                </Tr>
                              ) : null}

                              <Tr>
                                <Td></Td>
                              </Tr>
                              <Tr>
                                <Td></Td>
                              </Tr>
                            </div>
                          );
                        })
                      : null}
                    <Tr>
                      <Td></Td>
                    </Tr>
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              </TableContainer>
            </VStack>
          </GridItem>
          <GridItem bottom="0" area={"footer"}>
            <Footer />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default RegisterPiPage;
