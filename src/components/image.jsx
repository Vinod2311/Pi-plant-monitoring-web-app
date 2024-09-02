import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { getApp, initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import * as React from "react";
import { useEffect, useState } from "react";
import * as Realm from "realm-web";

function ImageChart(props) {
  const [chartName, setChartName] = useState("");
  const [dateTime, setDateTime] = useState();
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    async function setupFirebase() {
      try {
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
        const appRealm = Realm.App.getApp("application-1-dkzsnxq");
        const mongo = await appRealm.currentUser.mongoClient("mongodb-atlas");
        const user = appRealm.currentUser;
        const collectionImages = mongo.db("Images").collection(`${user.id}`);

        //get max and min date of data
        const first = await collectionImages.findOne();
        const last = await collectionImages.aggregate([
          { $sort: { _id: -1 } },
          { $limit: 1 },
          {
            $project: {
              _id: 0,
              url: 1,
              timestamp: 1,
            },
          },
        ]);
        setMinDate(first.timestamp);
        setMaxDate(last[0].timestamp);
        setDateTime(last[0].timestamp);

        //access firebase storage for image download URL
        const appFirebase = await initializeApp(firebaseConfig);
        const storage = await getStorage(appFirebase);
        const pathReference = ref(storage, `${last[0].url}.jpg`);

        await getDownloadURL(pathReference)
          .then((url) => {
            const img = document.getElementById("plantImage");
            img.setAttribute("src", url);
          })
          .catch((error) => {
            switch (error.code) {
              case "storage/object-not-found":
                console.log("No object found");
                break;
              case "storage/unauthorized":
                console.log("Not authorized");
                break;
              case "storage/canceled":
                console.log("Cancelled");
                break;
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
    setupFirebase();
  }, []);

  //show or hide time picker
  function handleCheckChange(value) {
    if (value) {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  }

  async function handleDateTimeChange(value) {
    const appRealm = Realm.App.getApp("application-1-dkzsnxq");
    const mongo = await appRealm.currentUser.mongoClient("mongodb-atlas");
    const user = appRealm.currentUser;
    const collectionImages = mongo.db("Images").collection(`${user.id}`);

    //get closest data reading to inputed dateTime
    const addOneHour = value.getTime() + 3660000;
    const newDateTime = new Date(addOneHour);
    const result = await collectionImages.find({
      timestamp: { $gt: value, $lt: newDateTime },
    });

    //Get downloadURL of image
    const appFirebase = await getApp();
    const storage = await getStorage(appFirebase);
    const pathReference = ref(storage, `${result[0].url}.jpg`);

    await getDownloadURL(pathReference)
      .then((url) => {
        const img = document.getElementById("plantImage");
        img.setAttribute("src", url);
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            console.log("No object found");
            break;
          case "storage/unauthorized":
            console.log("Not authorized");
            break;
          case "storage/canceled":
            console.log("Cancelled");
            break;
        }
      });
    setDateTime(result[0].timestamp);
  }

  return (
    <Card height={"100%"} width={"100%"}>
      <CardBody height={"100%"}>
        <VStack height={"100%"}>
          <HStack width={"100%"}>
            <Flex width={"100%"}>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => props.onDelete()}
              >
                x
              </Button>
              <Spacer />

              <Editable
                placeholder="Enter chart name"
                textAlign="center"
                bg={"white"}
                fontWeight={"bold"}
                fontSize="2xl"
              >
                <EditablePreview value={chartName} />
                {/* Here is the custom input */}
                <EditableInput
                  paddingStart={"20px"}
                  paddingEnd={"20px"}
                  value={chartName}
                  onChange={(e) => setChartName(e.target.value)}
                />
              </Editable>
              <Spacer />
              <Menu closeOnSelect={false}>
                <MenuButton size={"sm"} colorScheme="blue" as={Button}>
                  menu
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Toggle Show">
                    <Checkbox
                      paddingStart={"10px"}
                      value={showDatePicker}
                      onChange={(e) => handleCheckChange(e.target.checked)}
                    >
                      Time range picker
                    </Checkbox>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
          {showDatePicker ? (
            <DateTimePickerComponent
              placeholder="Select date and time"
              value={dateTime}
              onChange={(e) => handleDateTimeChange(e.value)}
              strictMode={true}
              min={minDate}
              max={maxDate}
            />
          ) : null}

          <Box boxSize="100%" overflow={"hidden"} objectFit="fill">
            <Image
              id="plantImage"
              boxSize={"100%"}
              src="../../logo.png"
              alt="plant image"
              fallbackSrc="https://via.placeholder.com/150"
            />
          </Box>
          {dateTime ? (
            <Text fontWeight={"semibold"} align={"center"} fontSize={"xl"}>
              Time of capture: {dateTime.toString()}
            </Text>
          ) : null}
        </VStack>
      </CardBody>
    </Card>
  );
}

export default ImageChart;
