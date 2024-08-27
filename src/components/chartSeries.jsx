import {
  Button,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  DateTime,
  DateTimeCategory,
  Inject,
  Legend,
  ScatterSeries,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  AreaSeries,
  StepLineSeries
} from "@syncfusion/ej2-react-charts";
import { Component } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useState } from "react";
import { useEffect } from "react";
import * as Realm from "realm-web";
import { DateRangePicker } from "@syncfusion/ej2-calendars";

const ChartSeries = (props) => {
  const [chartName, setChartName] = useState("");
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("Line");
  const [collectionReading, setCollectionReading] = useState();
  const [dateRange, setDateRange] = useState({});
  const [chartType, setChartType] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  //console.log(isLoading);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [chosenRange, setChosenRange] = useState({
    startDate: "",
    endDate: Date,
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const tooltip = { enable: true, shared: false };
  const primaryyAxis = { title: dataType };
  const primaryxAxis = {
    labelIntersectAction: "Hide",
    title: "time",
    valueType: "DateTime",
    intervalType: "Hours",
    interval: 1,
  };
  const legendSettings = { visible: true };
  const marker = { dataLabel: { visible: true } };

  useEffect(() => {
    async function getData() {
      try {
        //Mongo
        const appRealm = Realm.App.getApp("application-1-dkzsnxq");
        const mongo = await appRealm.currentUser.mongoClient("mongodb-atlas");
        const user = appRealm.currentUser;
        const collectionReading = mongo.db("Readings").collection(`${user.id}`);
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
        //console.log("first: " + first.time.toLocaleString());
        //console.log("last: " + last[0]._id.toLocaleString());
        setDateRange({ minDate: first.time, maxDate: last[0]._id });

        setCollectionReading(collectionReading);

        //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        //saveAs(blob, "hello world.txt");
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getData();

    //getMongoTimeData('2024-08-23-00-00-00','2024-08-23-01-00-00')
  }, []);

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
    //console.log(new Date());
    //const startDateISO = toISOString(startDate);
    //const endDateISO = toISOString(endDate);
    const last = await collectionReading.aggregate([
      {
        $group: {
          _id: "$time",
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 1 },
    ]);
    dataType
    //console.log("last: " + last[0]._id);

    const readingsMongoCount = await collectionReading.aggregate([
      {
        $match: {
          time: { $lte: endDate, $gte: startDate },
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
          time: { $lte: endDate, $gte: startDate },
        },
      },

      {
        $project: {
          _id: 0, [dataType]:1, time: 1
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
    //if (startDate && endDate) {
    //  handleChartChange(startDate, endDate)
  }

  function handleEndDateTimeChange(value) {
    setEndDate(value);
    const newRange = { minDate: dateRange.minDate, maxDate: value };
    setDateRange(newRange);
    //if (startDate && endDate) {
    //  handleChartChange(startDate, endDate)
  }

  //getMongoTimeData('2024-08-23-00-00-00','2024-08-23-01-00-00')
  async function handleChartChange(startDate, endDate) {
    setData(await getMongoTimeData(startDate, endDate));
  }

  function handleCheckChange(value){
    if (value){
      setShowDatePicker(true)
    } else{
      setShowDatePicker(false)
    }
  }

  function handleDataTypeChange(value){
    setDataType(value)
    setData([])
  }

  function handleChartTypeChange(value){
    setChartType(value)
    //setData([])
  }

  //if (startDate && endDate) {
  //  handleChartChange(startDate, endDate)}

  return (
    <>
      <VStack>
        <HStack width={"100%"}>
          <Flex width={"100%"} >
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
                <MenuGroup title="Toggle Show" >
                  <Checkbox paddingStart={'10px'}  value={showDatePicker}  onChange={(e) => (handleCheckChange(e.target.checked))} >Time range picker</Checkbox>
                </MenuGroup>
                <MenuOptionGroup title="Data" type="radio">
                  <MenuItemOption
                    value="temperature BMP280(*C)"
                    onClick={(e) => handleDataTypeChange(e.currentTarget.value)}
                  >
                    Temperature
                  </MenuItemOption>
                  <MenuItemOption
                    value="Pressure(hPa)"
                    onClick={(e) => handleDataTypeChange(e.currentTarget.value)}
                  >
                    Pressure
                  </MenuItemOption>
                  <MenuItemOption
                    value="humidity(RH)"
                    onClick={(e) => handleDataTypeChange(e.currentTarget.value)}
                  >
                    Humidity
                  </MenuItemOption>
                  <MenuItemOption
                    value="soilMoisture(RH)"
                    onClick={(e) => handleDataTypeChange(e.currentTarget.value)}
                  >
                    Soil Moisture
                  </MenuItemOption>
                  <MenuItemOption
                    value="lightIntensity(lux)"
                    onClick={(e) => handleDataTypeChange(e.currentTarget.value)}
                  >
                    Light Intensity
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuOptionGroup title="Chart Type" type="radio">
                <MenuItemOption
                    value="Line"
                    onClick={(e) => handleChartTypeChange(e.currentTarget.value)}
                  >
                    Line
                  </MenuItemOption>
                  
                  <MenuItemOption
                    value="Scatter"
                    onClick={(e) => handleChartTypeChange(e.currentTarget.value)}
                  >
                    Scatter
                  </MenuItemOption>
                  <MenuItemOption
                    value="Area"
                    onClick={(e) => handleChartTypeChange(e.currentTarget.value)}
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
              id="datetimepicker"
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
            overflow: "auto",
            width: "100%",
            height: "100%",
          }}
        >
          {data.length > 1 ? (
            <ChartComponent
              background="white"
              data={data}
              width="100%"
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
                  ColumnSeries
                ]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={data}
                  xName="time"
                  yName={dataType}
                  //name="Temperature"
                  width={1}
                  //marker={marker}
                  type={chartType}
                />
              </SeriesCollectionDirective>
            </ChartComponent>
          ) : (
            <Text textAlign={"center"}>
              No Data to show. Choose Data type and time range with the menu.
            </Text>
          )}
        </div>
      </VStack>
    </>
  );
};

export default ChartSeries;
