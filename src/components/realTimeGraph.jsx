import {
  Button,
  Card,
  CardBody,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Text,
  VStack
} from "@chakra-ui/react";
import { Inject } from "@syncfusion/ej2-react-charts";
import {
  AxesDirective,
  AxisDirective,
  CircularGaugeComponent,
  Legend,
  PointerDirective,
  PointersDirective,
  RangeDirective,
  RangesDirective,
} from "@syncfusion/ej2-react-circulargauge";
import { LinearGaugeComponent } from "@syncfusion/ej2-react-lineargauge";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import * as React from "react";
import { useEffect, useState } from "react";

function RealTimeGraph(props) {
  const [chartName, setChartName] = useState("");
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("");
  const [chartType, setChartType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        //create instance of firebase client
        const appFirebase = await initializeApp(firebaseConfig);
        const databaseFirebase = await getDatabase(appFirebase);
        const auth = await getAuth(appFirebase);
        await auth.authStateReady()
        const userFirebase = await auth.currentUser;
        const dataRef = await ref(
          databaseFirebase,
          "users/" + userFirebase.uid + "/raspi 1/reading"
        );

        //attach listener for any changes to real time data
        await onValue(dataRef, (snapshot) => {
          const firebaseSnapshot = snapshot.val();
          setData(firebaseSnapshot);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    }
    setupFirebase();
  }, []);

  //Create ranges and legend for circular and linear gauges 
  function handleDataTypeChange(
    dataType,
    min,
    max,
    start1,
    end1,
    legend1,
    color1,
    start2,
    end2,
    legend2,
    color2,
    start3,
    end3,
    legend3,
    color3
  ) {
    setDataType(dataType);
    const newValue = {
      data: data[dataType],
      min: min,
      max: max,
      start1: start1,
      end1: end1,
      legend1: legend1,
      color1: color1,
      start2: start2,
      end2: end2,
      legend2: legend2,
      color2: color2,
      start3: start3,
      end3: end3,
      legend3: legend3,
      color3: color3,
    };
    setValue(newValue);
  }


  function handleChartTypeChange(value) {
    setChartType(value);
  };

  

  return (
    <Card height={"100%"} width={"100%"}>
      <CardBody height={'100%'}>
        <VStack  height={'100%'}>
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
                  <MenuOptionGroup title="Data" type="radio">
                    <MenuItemOption
                      value="temperature BMP280(*C)"
                      onClick={(e) =>
                        handleDataTypeChange(
                          e.currentTarget.value,
                          0,
                          35,
                          0,
                          10,
                          "cold",
                          "#00ffff",
                          10,
                          25,
                          "warm",
                          "#065535",
                          25,
                          35,
                          "hot",
                          "#ff0000"
                        )
                      }
                    >
                      Temperature
                    </MenuItemOption>
                    <MenuItemOption
                      value="Pressure(hPa)"
                      onClick={(e) =>
                        handleDataTypeChange(
                          e.currentTarget.value,
                          1500,
                          1800,
                          1500,
                          1600,
                          "low",
                          "#00ffff",
                          1600,
                          1700,
                          "normal",
                          "#065535",
                          1700,
                          1800,
                          "high",
                          "#ff0000"
                        )
                      }
                    >
                      Pressure
                    </MenuItemOption>
                    <MenuItemOption
                      value="soilMoisture(RH)"
                      onClick={(e) =>
                        handleDataTypeChange(
                          e.currentTarget.value,
                          0,
                          100,
                          0,
                          15,
                          "dry",
                          "#00ffff",
                          15,
                          30,
                          "normal",
                          "#065535",
                          30,
                          100,
                          "wet",
                          "#ff0000"
                        )
                      }
                    >
                      Soil Moisture
                    </MenuItemOption>
                    <MenuItemOption
                      value="lightIntensity(lux)"
                      onClick={(e) =>
                        handleDataTypeChange(
                          e.currentTarget.value,
                          0,
                          50,
                          0,
                          15,
                          "dark",
                          "#00ffff",
                          15,
                          30,
                          "normal",
                          "#065535",
                          30,
                          50,
                          "bright",
                          "#ff0000"
                        )
                      }
                    >
                      Light Intensity
                    </MenuItemOption>
                  </MenuOptionGroup>
                  <MenuOptionGroup title="Graph Type" type="radio">
                    <MenuItemOption
                      value="linearGauge"
                      onClick={(e) =>
                        handleChartTypeChange(e.currentTarget.value)
                      }
                    >
                      Linear Gauge
                    </MenuItemOption>

                    <MenuItemOption
                      value="circularGauge"
                      onClick={(e) =>
                        handleChartTypeChange(e.currentTarget.value)
                      }
                    >
                      Circular Gauge
                    </MenuItemOption>
                    
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
          
          {!isLoading && Object.keys(value).length > 0 ? (
            
              <>
                {(() => {
                  switch (chartType) {
                    case "circularGauge":
                      return (
                        
                        <CircularGaugeComponent
                          width="100%"
                          height="100%"
                          className = "charts"
                          //id={props.id}
                          legendSettings={{
                            visible: true,
                          }}
                        >
                          <Inject services={[Legend]} />
                          <AxesDirective>
                            <AxisDirective
                              minimum={value.min}
                              maximum={value.max}
                              majorTicks={{ useRangeColor: true }}
                            >
                              <RangesDirective>
                                <RangeDirective
                                  start={value.start1}
                                  end={value.end1}
                                  radius="108%"
                                  color={value.color1}
                                  legendText={value.legend1}
                                ></RangeDirective>

                                <RangeDirective
                                  start={value.start2}
                                  end={value.end2}
                                  radius="108%"
                                  color={value.color2}
                                  legendText={value.legend2}
                                ></RangeDirective>
                                <RangeDirective
                                  start={value.start3}
                                  end={value.end3}
                                  radius="108%"
                                  color={value.color3}
                                  legendText={value.legend3}
                                ></RangeDirective>
                              </RangesDirective>

                              <PointersDirective>
                                <PointerDirective
                                  value={value.data}
                                ></PointerDirective>
                              </PointersDirective>
                            </AxisDirective>
                          </AxesDirective>
                        </CircularGaugeComponent>
                        
                      );

                    case "linearGauge":
                      return (
                        <LinearGaugeComponent
                        width="100%"
                        height="100%"
                        //id={props.id}
                          className = "charts"
                          legendSettings={{
                            visible: true,
                          }}
                        >
                          <Inject services={[Legend]} />
                          <AxesDirective>
                            <AxisDirective
                              minimum={value.min}
                              maximum={value.max}
                              majorTicks={{ useRangeColor: true }}
                            >
                              <RangesDirective>
                                <RangeDirective
                                  start={value.start1}
                                  end={value.end1}
                                  radius="108%"
                                  color={value.color1}
                                  legendText={value.legend1}
                                ></RangeDirective>

                                <RangeDirective
                                  start={value.start2}
                                  end={value.end2}
                                  radius="108%"
                                  color={value.color2}
                                  legendText={value.legend2}
                                ></RangeDirective>
                                <RangeDirective
                                  start={value.start3}
                                  end={value.end3}
                                  radius="108%"
                                  color={value.color3}
                                  legendText={value.legend3}
                                ></RangeDirective>
                              </RangesDirective>

                              <PointersDirective>
                                <PointerDirective
                                  value={value.data}
                                ></PointerDirective>
                              </PointersDirective>
                            </AxisDirective>
                          </AxesDirective>
                        </LinearGaugeComponent>
                      );

                    default:
                      return (
                        <Text textAlign={"center"}>Choose graph type</Text>
                      );
                  }
                })()}
              {(chartType) ?
              <Text fontWeight="bold" fontSize={"large"}>
                {dataType}
              </Text>:null}
              </>
              
            
          ) : (
            
            <Center height={'100%'}>
                <Text fontSize={'xl'} textAlign={'center'}>
                  No Data to show. Choose Data type and graph type.
                </Text>
              </Center>
          )}
          
        </VStack>
      </CardBody>
    </Card>
  );
};

export default RealTimeGraph
