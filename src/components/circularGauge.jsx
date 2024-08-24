import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  PointersDirective,
  PointerDirective,
} from "@syncfusion/ej2-react-circulargauge";

export default function CircularGauge(props) {
  return (
    <CircularGaugeComponent width='inherit' height="inherit">
      <AxesDirective>
        <AxisDirective>
          <PointersDirective>
            <PointerDirective value={35}></PointerDirective>
          </PointersDirective>
        </AxisDirective>
      </AxesDirective>
    </CircularGaugeComponent>
  );
}
