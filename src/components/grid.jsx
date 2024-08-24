import { Button, Card, CardBody, Flex, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import LineChart from "./lineChart";
import CircularGauge from "./circularGauge"
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";

const ComplexInterfaceGrid = (props) => {
  const [layout, setLayout] = useState([
    { i: "screen 1", x: 0, y: 0, w: 5, h: 8 },
  ]);

  const onLayoutChange = () => {};

  const addWidget = () => {
    const newWidget = {
      i: `screen ${layout.length + 1}`,
      x: 0,
      y: Infinity,
      w: 5,
      h: 8,
    };
    setLayout([...layout, newWidget]);
  };

  const removeWidget = (i) => {
    const newLayout = layout.filter((item) => item.i !== i);
    setLayout(newLayout);
  };

  // Function to remove a widget...
  // Function to update a widget...

  return (
    
      <GridLayout
        className="complex-interface-layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        Flex={"1"}
        isDraggable={true}
        onLayoutChange={onLayoutChange}
      >
        {layout.length > 0 ? (
          layout.map((item) => (
            <div  key={item.i} style={{  background: "#009688" }}>
              <VStack h={"100%"} width={"100%"} alignItems={"start"}>
                <Flex width={'100%'} onMouseDown={(e) => e.stopPropagation()}>
                  
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeWidget(item.i)}
                  >
                    x
                  </Button>
                  <Spacer />
                  <Heading>{` ${item.i}`}</Heading>
                  <Spacer />
                  <Button
                  size={'sm'} 
                  colorScheme="blue">edit</Button>
                </Flex>
                <div style={{ overflow:'auto', width: "100%", height: "100%", }}>
                  <LineChart height='100%' id={`${item.i} chart`} />
                </div>
              </VStack>
            </div>
          ))
        ) : (
          <div key={"empty"} data-grid={{ x: 0, y: 0, w: 2, h: 2 }}>
            <Card>
              <CardBody>Add a display</CardBody>
            </Card>
          </div>
        )}

        <div key={"add"} data-grid={{ x: 5, y: 0, w: 1, h: 2 }}>
          <div
            style={{ width: "100%", height: "100%" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Button
              w="100%"
              h={"100%"}
              colorScheme="blue"
              onClick={() => addWidget()}
            >
              Add
            </Button>
          </div>
        </div>
      </GridLayout>
    
  );
};

export default ComplexInterfaceGrid;
