import { Button } from "@chakra-ui/react";
import React from "react";
import GridLayout from "react-grid-layout";

class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
      { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: "c", x: 4, y: 0, w: 1, h: 2 }
      
    ];

    function addButton(){
      return <Button>text</Button>
    }
    
    return (
      <>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a" style={{ background: '#ff4d4f' }}>a</div>
        <div key="b" style={{ background: '#40a9ff' }}>b</div>
        <span key="c" style={{ background: '#73d13d' }}>c</span>
        
      </GridLayout>
      <Button></Button></>
    );
  }
}

export default MyFirstGrid

/*
const ExampleGrid = () => {
      // Define the layout configuration for each grid item
      const layoutConfig = [
        { i: 'item1', x: 0, y: 0, w: 2, h: 3 },
        { i: 'item2', x: 2, y: 0, w: 4, h: 3 },
        { i: 'item3', x: 6, y: 0, w: 2, h: 3 }
      ];
    
      return (
        <GridLayout className="example-layout" layout={layoutConfig} cols={12} rowHeight={30} width={1200}>
          <div key="item1" style={{ background: '#ff4d4f' }}>Item 1</div>
          <div key="item2" style={{ background: '#40a9ff' }}>Item 2</div>
          <div key="item3" style={{ background: '#73d13d' }}>Item 3</div>
        </GridLayout>
      );
    };
    */