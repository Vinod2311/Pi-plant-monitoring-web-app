import { Button, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import CreateChart from './createChart';

const ComplexInterfaceGrid = () => {
  const [layout, setLayout] = useState([
    { i: 'screen 1', x: 0, y: 0, w: 5, h: 10 },
    
  ]);

  const addWidget = () => {
    const newWidget = { i: `screen ${layout.length + 1}`, x: 0 , y: Infinity, w: 2, h: 8 };
    setLayout([...layout, newWidget]);
  };

  const removeWidget = (i) => {
    const newLayout = layout.filter((item) => item.i !== i)
    setLayout(newLayout)
  }

  // Function to remove a widget...
  // Function to update a widget...

  return (
    <Flex flex={'1'}>
    <GridLayout
      className="complex-interface-layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      {layout.map((item) => (
        <div key={item.i}  style={{ background: '#009688' }}>
          <Card   h={'0px'}>
            <CardBody  >
              <Button  size='sm' colorScheme='red' onClick={() => removeWidget(item.i)}>x</Button>
              {` ${item.i}`}
              <CreateChart></CreateChart>
            </CardBody>
          </Card>
        </div>
      ))}
      <div key={'add'}  data-grid={{ x: 5, y: 0, w: 1, h: 1, static: true }}>
         <Button size='lg' colorScheme='blue' onClick={() => addWidget()}>Add</Button>
         </div>
    </GridLayout>
    </Flex>
  );
};

export default ComplexInterfaceGrid;