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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import "@fontsource/zcool-xiaowei";
import { renderToStaticMarkup, renderToString } from "react-dom/server"
import {
  DashboardLayoutComponent,
  PanelDirective,
  PanelsDirective,
} from "@syncfusion/ej2-react-layouts";
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
import "../../node_modules/@syncfusion/ej2-react-layouts/styles/material.css";
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
import ChartSeries from "../components/chartSeries";
import RealTimeGraph from "../components/realTimeGraph";
import { useRef } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

const DashboardPage = () => {
  registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVF3WmFZfVpgdVVMYFlbRnNPMyBoS35RckVrW3xfcXZcRmZYVEVy"
  );

  const [formDisplayed, setFormDisplayed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [updateTable, setUpdateTable] = useState(["spread operator"]);
  const [sensorPiName, setSensorPiName] = useState("");
  const [dashboardObj, setDashboardObj] = useState([]);

  const mongo = useRef(null);

  useEffect(() => {
    async function getUserData() {
      console.log("Rendering dashboard page");
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
        
        const devices = await collectionDevices.find({ owner_id: user.id });
        setUserData(devices);
        
        //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        //saveAs(blob, "hello world.txt");

      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, []);

  
  let cellSpacing = [5, 5];
  let data = ["Panel1"];

  
  function addComponent() {
    dashboardObj.map(function (object, i) {
      //console.log(object.col);
      //console.log(contentCreater(object.type));

      return (
        <PanelDirective
          key={0}
          sizeX={2}
          sizeY={2}
          row={0}
          col={0}
          content={0}
          header={null}
        />
      );
    });
  }

  function chartCreater() {
    return (
      <Flex display='flex' className="template" height='100%' width='100%' >
        <ChartSeries key={this} onDelete={() => onRemove(this)} />
      </Flex>
    );
  };

  function graphCreater() {
    return ( 
      <Flex  display='flex' className="template" height='100%' width='100%' >
        <RealTimeGraph   />
      </Flex>
    );
  };

  const memoizedGraphCreater = useCallback(graphCreater,[])
  
  const onAdd = (args) => {
    let panel = [
      {
        id: (dashboardObj.length + 1).toString() + "_layout",
        sizeX: 2,
        sizeY: 2,
        row: 0,
        col: 0,
        type: args,

      },
    ];
    setDashboardObj([...dashboardObj, panel[0]]);
  };

  const onRemove = (id) => {
    console.log("dashboard: " + dashboardObj);
    const newLayout = dashboardObj.filter((item) => item.id !== id)
    setDashboardObj(newLayout)
  };
  let dashboardObj2

  let restoreModel = [];
    function onRestore(args) {
        dashboardObj.panels = restoreModel;
    }
    function onSave(args) {
        restoreModel = dashboardObj.serialize();
        console.log(restoreModel)
    }
  
  return (
    <>
      <Flex style={styles.app}>
        <Container
          minHeight={"max-content"}
          background={"#A0A5CB"}
          //h="max-content"
          h={'100vh'}
          maxW={"1500px"}
          minW={"1300px"}
          paddingInlineEnd={"0"}
          paddingInlineStart={"0"}
        >
          <Grid
            flex="1"
            gridTemplateColumns={"1fr 1fr 1fr 1fr"}
            gridTemplateRows={'300px 1fr 50px'}
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
                      {dashboardObj.length > 0 ? (
                        <div className="control-section">
                          <DashboardLayoutComponent
                            id="defaultLayout"
                            cellSpacing={cellSpacing}
                            allowResizing={true}
                            showGridLines={true}
                            created={onSave}
                            //panels={dashboardObj}
                            
                            columns={5}
                          >
                            <PanelsDirective>
                              {dashboardObj.map(function (object, i) {
                                
                                if (object.type == 'chartSeries'){
                                  
                                return (
                                  <PanelDirective
                                    key={object.id}
                                    sizeX={2}
                                    sizeY={2}
                                    row={0}
                                    col={0}
                                    content={chartCreater.bind(object.id)}
                                    header={null}
                                    
                                  />
                                )} else if (object.type == 'realTimeGraph'){
                                  
                                  return (
                                    <PanelDirective
                                      key={object.id}
                                      sizeX={2}
                                      sizeY={2}
                                      row={0}
                                      col={0}
                                      content={memoizedGraphCreater}
                                      header={null}
                                    />)
                                };
                              })}
                              ;
                            </PanelsDirective>
                          </DashboardLayoutComponent>
                        </div>
                      ) : (
                        <Card width={"20%"}>
                          <CardBody>Add a display</CardBody>
                        </Card>
                      )}

                      <Menu>
                        <MenuButton
                          as={Button}
                          margin={"30px"}
                          colorScheme="blue"
                        >
                          Add
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => onAdd("chartSeries")}>
                            Historical chart
                          </MenuItem>
                          <MenuItem onClick={() => onAdd("realTimeGraph")}>
                            Real time graph
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      <Button onClick={onSave}>save</Button>
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
