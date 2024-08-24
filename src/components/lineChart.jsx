import { Flex } from "@chakra-ui/react";
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

const LineChart =(props) => {
  
    const data = [
      { month: "Jan", sales: 35 },
      { month: "Feb", sales: 28 },
      { month: "Mar", sales: 34 },
      { month: "Apr", sales: 32 },
      { month: "May", sales: 40 },
      { month: "Jun", sales: 32 },
      { month: "Jul", sales: 35 },
      { month: "Aug", sales: 55 },
      { month: "Sep", sales: 38 },
      { month: "Oct", sales: 30 },
      { month: "Nov", sales: 25 },
      { month: "Dec", sales: 32 },
    ];
    const tooltip = { enable: true, shared: false };
    const primaryyAxis = { labelFormat: "${value}K" };
    const primarxyAxis = { valueType: "Category" };
    const legendSettings = { visible: true };
    const marker = { dataLabel: { visible: true } };
    return (
      <>
      <ChartComponent 
        
        background="white"
        
        
        title="Chart"
        primaryXAxis={primarxyAxis}
        legendSettings={legendSettings}
        primaryYAxis={primaryyAxis}
        tooltip={tooltip}
      >
        <Inject
          services={[
            ColumnSeries,
            DataLabel,
            Tooltip,
            Legend,
            LineSeries,
            Category,
          ]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            xName="month"
            yName="sales"
            name="Sales"
            marker={marker}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
      </>
    );
  
}

export default LineChart
