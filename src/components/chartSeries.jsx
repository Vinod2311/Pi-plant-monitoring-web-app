import {
  Button,
  Card,
  CardBody,
  Center,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Text,
  VStack
} from "@chakra-ui/react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  AreaSeries,
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  DateTime,
  DateTimeCategory,
  Inject,
  Legend,
  LineSeries,
  ScatterSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  StepLineSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";

function ChartSeries(props) {
  const [chartName, setChartName] = useState("");
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("Line");
  const [collectionReading, setCollectionReading] = useState();
  const [dateRange, setDateRange] = useState({});
  const [chartType, setChartType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  //Define chart settings
  const tooltip = { enable: true, shared: false };
  const primaryyAxis = { title: dataType };
  const primaryxAxis = {
    labelIntersectAction: "Rotate45",
    title: "time",
    valueType: "DateTime",
    intervalType: "Auto",
    //minimum: startDate,
    //maximum: endDate,
    //interval: 5,
    labelFormat: "dd/MM hh:mm a",
  };
  const legendSettings = { visible: true };
  

  useEffect(() => {
    async function getData() {
      try {
        //Mongo
        const appRealm = Realm.App.getApp("application-1-dkzsnxq");
        const mongo = await appRealm.currentUser.mongoClient("mongodb-atlas");
        const user = appRealm.currentUser;
        const collectionReading = mongo.db("Readings").collection(`${user.id}`);

        //Get max date and min date of readings
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
        setDateRange({ minDate: first.time, maxDate: last[0]._id });
        setCollectionReading(collectionReading);
        //Finish loading
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);


  //Get readings based on time range
  const getMongoTimeData = async (startDate, endDate) => {
    const readingsMongo = await collectionReading.aggregate([
      {
        $match: {
          time: { $lte: endDate, $gte: startDate },
        },
      },

      {
        $project: {
          _id: 0,
          [dataType]: 1,
          time: 1,
        },
      },
    ]);
    console.log(dataType);
    return readingsMongo;
  };

  function handleStartDateTimeChange(value) {
    setStartDate(value);
    const newRange = { minDate: value, maxDate: dateRange.maxDate };
    setDateRange(newRange);
    console.log("start datetime: " + value);

  }

  function handleEndDateTimeChange(value) {
    setEndDate(value);
    const newRange = { minDate: dateRange.minDate, maxDate: value };
    setDateRange(newRange);
  }


  async function handleChartChange(startDate, endDate) {
    setData(await getMongoTimeData(startDate, endDate));
  }

  //Show or hide date picker
  function handleCheckChange(value) {
    if (value) {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  }

  function handleDataTypeChange(value) {
    setDataType(value);
    setData([]);
  }

  function handleChartTypeChange(value) {
    setChartType(value);
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
                  <MenuOptionGroup title="Data" type="radio">
                    <MenuItemOption
                      value="temperature BMP280(*C)"
                      onClick={(e) =>
                        handleDataTypeChange(e.currentTarget.value)
                      }
                    >
                      Temperature
                    </MenuItemOption>
                    <MenuItemOption
                      value="Pressure(hPa)"
                      onClick={(e) =>
                        handleDataTypeChange(e.currentTarget.value)
                      }
                    >
                      Pressure
                    </MenuItemOption>

                    <MenuItemOption
                      value="soilMoisture(RH)"
                      onClick={(e) =>
                        handleDataTypeChange(e.currentTarget.value)
                      }
                    >
                      Soil Moisture
                    </MenuItemOption>
                    <MenuItemOption
                      value="lightIntensity(lux)"
                      onClick={(e) =>
                        handleDataTypeChange(e.currentTarget.value)
                      }
                    >
                      Light Intensity
                    </MenuItemOption>
                  </MenuOptionGroup>
                  <MenuOptionGroup title="Chart Type" type="radio">
                    <MenuItemOption
                      value="Line"
                      onClick={(e) =>
                        handleChartTypeChange(e.currentTarget.value)
                      }
                    >
                      Line
                    </MenuItemOption>

                    <MenuItemOption
                      value="Scatter"
                      onClick={(e) =>
                        handleChartTypeChange(e.currentTarget.value)
                      }
                    >
                      Scatter
                    </MenuItemOption>
                    <MenuItemOption
                      value="Area"
                      onClick={(e) =>
                        handleChartTypeChange(e.currentTarget.value)
                      }
                    >
                      Area
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
          {!isLoading && showDatePicker ? (
            <>
              <DateTimePickerComponent
                id="datetimepicker"
                placeholder="Select start date and time"
                value={startDate}
                onChange={(e) => handleStartDateTimeChange(e.value)}
                min={dateRange.minDate}
                strictMode={true}
                max={dateRange.maxDate}
              />
              <DateTimePickerComponent
                id="datetimepicker2"
                placeholder="Select end date and time"
                value={endDate}
                onChange={(e) => handleEndDateTimeChange(e.value)}
                min={dateRange.minDate}
                strictMode={true}
                max={dateRange.maxDate}
              />
              <Button
                size={"sm"}
                colorScheme="blue"
                onClick={() => handleChartChange(startDate, endDate)}
              >
                Update
              </Button>
            </>
          ) : null}
          <div
            style={{
              
              width: "100%",
              height: "100%",
            }}
          >
            {data.length > 1 ? (
              <ChartComponent
                background="white"
                
                overflow={"auto"}
                id={props.id}
                className="charts"
                data={data}
                width="100%"
                height="100%"
                primaryXAxis={primaryxAxis}
                primaryYAxis={primaryyAxis}
                legendSettings={legendSettings}
                tooltip={tooltip}
              >
                <Inject
                  services={[
                    DateTimeCategory,
                    DateTime,
                    DataLabel,
                    Tooltip,
                    Legend,
                    LineSeries,
                    Category,
                    AreaSeries,
                    StepLineSeries,
                    ScatterSeries,
                    ColumnSeries,
                  ]}
                />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={data}
                    xName="time"
                    yName={dataType}
                    width={1}
                    //marker={marker}
                    type={chartType}
                  />
                </SeriesCollectionDirective>
              </ChartComponent>
            ) : (
              <Center height={"100%"}>
                <Text fontSize={"xl"} textAlign={"center"}>
                  No Data to show. Choose Data type and time range with the
                  menu.
                </Text>
              </Center>
            )}
          </div>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default ChartSeries;
