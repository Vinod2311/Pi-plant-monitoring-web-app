import { Button, Editable, EditableInput, EditablePreview, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, VStack } from "@chakra-ui/react";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { Component } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useState } from "react";
import { useEffect } from "react";
import * as Realm from "realm-web";

const LineChart = (props) => {
  const [chartName,setChartName] = useState('')
  const [data,setData] = useState([])
  const [dataType, setDataType] = useState('')
  const [collectionReading, setCollectionReading] = useState()
  const [dateRange, setDateRange] = useState({})

  const [chosenRange, setChosenRange] = useState({startDate: Date, endDate: Date})
  
  
  const tooltip = { enable: true, shared: false };
  const primaryyAxis = { labelFormat: "" };
  const primarxyAxis = { valueType: "Category" };
  const legendSettings = { visible: true };
  const marker = { dataLabel: { visible: true } };

  useEffect(() => {
    async function getData() {
      try {
        //Mongo
        const appRealm = Realm.App.getApp("application-1-dkzsnxq");
        const mongo = await appRealm.currentUser.mongoClient("mongodb-atlas")
        const user = appRealm.currentUser;
        const collectionReading = mongo
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
        setDateRange({minDate: first, maxDate: last})
        
        
        setCollectionReading(collectionReading);
        //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        //saveAs(blob, "hello world.txt");

        
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
    setData(await getMongoTimeData(startDate, endDate));
  }


  


  return (
    <>
      <VStack>
        <HStack align-items={'start'}>
          <Flex margin={'auto'} width={"100%"} onMouseDown={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => props.delete()}
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
                onChange={(e) =>
                  setChartName(e.target.value)
                }
              />
            </Editable>
            <Spacer />
            <Menu>
            <MenuButton
              size={"sm"}
              colorScheme="blue"
              onClick={() =>
                handleChartChange("2024-08-24-00-00-00", "2024-08-25-01-00-00")
              }
            >
              edit
            </MenuButton>
            <MenuList>
              <MenuItem>Select Data </MenuItem>
              <MenuItem>Select Time Range</MenuItem>
              <MenuItem>Select Graph Type</MenuItem>
            </MenuList>
            </Menu>
            
          </Flex>
        </HStack>
        <DateTimePickerComponent id="datetimepicker" value={''} min={dateRange.minDate[0]._id} strictMode={true} max={dateRange.maxDate[0]._id}/>;
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
              primaryXAxis={primarxyAxis}
              legendSettings={legendSettings}
              //primaryYAxis={primaryyAxis}
              tooltip={tooltip}
            >
              <Inject
                services={[DataLabel, Tooltip, Legend, LineSeries, Category]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={data}
                  xName="time"
                  yName="temperature BMP280(*C)"
                  name="Temperature"
                  //marker={marker}
                  type="Line"
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

export default LineChart;
