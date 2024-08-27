import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  PointersDirective,
  PointerDirective,
  Legend,
  RangesDirective,
  RangeDirective
} from "@syncfusion/ej2-react-circulargauge";
import { CircularChart3DComponent, Inject } from '@syncfusion/ej2-react-charts';

export default function CircularGauge(props) {
  return (
    <CircularGaugeComponent width='inherit' height="inherit" legendSettings={{
      visible: true,
  }}>
    <Inject services={[ Legend ]}/>
      <AxesDirective>
      <AxisDirective minimum={0} maximum={100} majorTicks = {{ useRangeColor: true }}>
      <RangesDirective>
            <RangeDirective start = {0} end = {25} radius = '108%' legendText= 'light air'></RangeDirective>
            <RangeDirective start = {25} end = {50} radius = '108%' legendText= 'light air'></RangeDirective>
            <RangeDirective start = {50} end = {75} radius = '108%'  legendText= 'light breeze'></RangeDirective>
            <RangeDirective start = {75} end = {100} radius = '108%' legendText= "gentle breeze"></RangeDirective>
        </RangesDirective>
          
          <PointersDirective >
            <PointerDirective value={props.data} ></PointerDirective>
          </PointersDirective>
          
        </AxisDirective>
      </AxesDirective>
    </CircularGaugeComponent>
  );
}
