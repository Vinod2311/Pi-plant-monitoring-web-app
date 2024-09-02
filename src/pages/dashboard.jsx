import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import "@fontsource/zcool-xiaowei";
import { registerLicense } from "@syncfusion/ej2-base";
import { DashboardLayoutComponent } from "@syncfusion/ej2-react-layouts";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Realm from "realm-web";
import ChartSeries from "../components/chartSeries";
import Footer from "../components/footer";
import Logo from "../components/logo";
import NavMain from "../components/navMain";
import RealTimeGraph from "../components/realTimeGraph";

import { FiChevronDown } from "react-icons/fi";
import ImageChart from "../components/image";

const DashboardPage = () => {
  //syncfusion register license
  registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVF3WmFZfVpgdVVMYFlbRnNPMyBoS35RckVrW3xfcXZcRmZYVEVy"
  );

  const [userData, setUserData] = useState([]);
  const [sensorPiName, setSensorPiName] = useState("");
  const showMessage = useRef(false);
  const navigate = useNavigate();

  //dashboard configuration settings -- panel resize settings
  let resize = ["e-south-east", "e-east", "e-west", "e-north", "e-south"];
  let count = 0;
  let dashboardObj;

  useEffect(() => {
    async function getUserData() {
      console.log("Rendering dashboard page");
      try {
        //Mongo Client creation
        const appMongo = new Realm.App({
          id: "application-1-dkzsnxq",
        });
        const mongoClient = await appMongo.currentUser.mongoClient(
          "mongodb-atlas"
        );
        const collectionDevices = await mongoClient
          .db("Raspberry_pi")
          .collection("Devices");

        //set user data state from mongoDB
        const devices = await collectionDevices.find({
          owner_id: appMongo.currentUser.id,
        });
        setUserData(devices);
        showMessage.current = true;
      } catch (err) {
        console.log(err);
      }
    }

    //if user is not loggedIn , go to landing page
    if (sessionStorage.getItem("userFirebase") == null) {
      navigate("/");
    }
    getUserData();
  }, [navigate]);

  //Creates charts component for historical data
  function chartCreater() {
    return (
      <Flex display="flex" className="template" height="100%" width="100%">
        <ChartSeries id={this} onDelete={() => onRemove(this)} />
      </Flex>
    );
  }

  //Creates graph component for real time data
  function graphCreater() {
    return (
      <Flex display="flex" className="template" height="100%" width="100%">
        <RealTimeGraph id={this} onDelete={() => onRemove(this)} />
      </Flex>
    );
  }

  //Creates image viewer component
  function imageCreater() {
    return (
      <Flex display="flex" className="template" height="100%" width="100%">
        <ImageChart id={this} onDelete={() => onRemove(this)} />
      </Flex>
    );
  }

  //Starting panel
  const panels = [
    {
      id: "starter",
      sizeX: 3,
      sizeY: 3,
      minSizeX: 3,
      minSizeY: 3,
      maxSizeY: 10,
      maxSizeX: 10,
      row: 0,
      col: 0,
      type: "chartSeries",
      content: chartCreater.bind("starter"),
    },
  ];

  //Method to add a new panel to dashboard
  const onAdd = (args) => {
    let contentToAdd;
    const id = (count + 1).toString() + "_layout";
    if (args == "chartSeries") {
      contentToAdd = chartCreater;
    } else if (args == "realTimeGraph") {
      contentToAdd = graphCreater;
    } else if (args == "imageChart") {
      contentToAdd = imageCreater;
    }
    let panel = [
      {
        id: id,
        sizeX: 3,
        sizeY: 3,
        minSizeX: 3,
        minSizeY: 3,
        maxSizeY: 10,
        maxSizeX: 10,
        row: 0,
        col: 0,
        type: args,
        content: contentToAdd.bind(id),
      },
    ];

    dashboardObj.addPanel(panel[0]);
    count++;
    showMessage.current = false;
  };

  //Remove a panel from dashboard
  function onRemove(id) {
    dashboardObj.removePanel(id);
  }

  //Updates panel content when panel size is changed
  const onPanelResize = (args) => {
    args.element
      .querySelector(" .e-panel-container .e-panel-content .charts")
      .ej2_instances[0].refresh();
  };

  return (
    <>
      <Container
        minHeight={"1300px"}
        background={"#A0A5CB"}
        maxW={"1500px"}
        minW={"1300px"}
        paddingInlineEnd={"0"}
        paddingInlineStart={"0"}
      >
        <Grid
          h={"100%"}
          minH={"700px"}
          w={"100%"}
          gridTemplateColumns={"1fr 1fr 1fr 1fr"}
          gridTemplateRows={"300px 1fr 50px"}
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
          <GridItem height={"100%"} area={"main1"}>
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
                      return <option key={i}>{object.raspberryPiName}</option>;
                    })
                  : null}
              </Select>
            </Center>
            {!sensorPiName ? null : (
              <Box
                background={"#948ec0"}
                padding={"20px"}
                margin={"20px"}
                boxShadow={"2xl"}
                rounded={"2xl"}
              >
                <div className="dashboard">
                  <DashboardLayoutComponent
                    id="defaultLayout"
                    ref={(s) => (dashboardObj = s)}
                    cellSpacing={[20, 20]}
                    allowResizing={true}
                    panels={panels}
                    resizeStop={onPanelResize}
                    allowFloating={true}
                    allowPushing={true}
                    columns={10}
                    resizableHandles={resize}
                  ></DashboardLayoutComponent>
                </div>

                <Menu className="menu">
                  <MenuButton
                    margin={"50px"}
                    colorScheme="blue"
                    as={Button}
                    rightIcon={<FiChevronDown />}
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
                    <MenuItem onClick={() => onAdd("imageChart")}>
                      Image
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </GridItem>
          <GridItem area={"footer"}>
            <Footer />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardPage;
