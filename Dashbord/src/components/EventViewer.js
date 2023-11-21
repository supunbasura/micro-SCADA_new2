import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line, Text, Rect, Arrow,Circle } from 'react-konva';
import Navbar from "./Navbar"

function EventViewer(){
    const [buttonStatus, setButtonStatus] = useState("off");
    const [switch_QA1, setSwitch_QA1] = useState(false);

    useEffect(() => {
      if (buttonStatus === 'on') {
        setSwitch_QA1(true);
      } else {
        setSwitch_QA1(false);
      }
    }, [buttonStatus]);

    useEffect(() => {
      const socket = new WebSocket('ws://localhost:8000/ws/simple_message/');
      
      socket.onmessage = function(event) {
          console.log("WebS");
          const data = JSON.parse(event.data);
          console.log(data);
          console.log(data.message.status);
          setButtonStatus(data.message.status);
      };

      socket.onopen = function(event) {
          console.log("WebSocket opened:", event);
      };

      return () => {
          socket.close();
      };
  }, []);

    const CircuitSpline = ({ points, color, tension }) => (
      <Line
        points={points}  // array of points [x1, y1, x2, y2, ..., xn, yn]
        stroke={color}
        strokeWidth={4}
        tension={tension}
        lineCap="round"
        lineJoin="round"
      />
    );

    const CircuitCircle = ({ x, y, radius, color }) => (
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill={color}
        stroke={color}
        strokeWidth={1} // If you want the circle to have a border
      />
    );

    const CircuitArrow = ({ points, color, pointerLength, pointerWidth }) => (
      <Arrow
        points={points}
        fill={color}
        stroke={color}
        strokeWidth={2}
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
      />
    );

    const CircuitLine = ({ points, isDotted, color }) => (
      <Line
        points={points}
        stroke={color}
        strokeWidth={2}
        lineJoin="round"
        dash={isDotted ? [4, 4] : []}
      />
    );

    const CircuitLabel = ({ x, y, text }) => (
      <Text x={x} y={y} text={text} fontSize={15} />
    );

    const CircuitComponent = ({ x, y, label, color }) => (
      <Rect
        x={x}
        y={y}
        width={50}
        height={20}
        fill={color}
        shadowBlur={5}
      />
    );
    const CircuitComponent_v = ({ x, y, label, color }) => (
      <Rect
        x={x}
        y={y}
        width={20}
        height={50}
        fill={color}
        shadowBlur={5}
      />
    );

    const Circuit = () => {
      const componentColor = '#AAFF00';
      const lineColor = '#000000';
      const circuitColor = 'green'; 

      const switchX = 20;
      const switchY = 120;
      const switchLength = 20; 

      const splineColor = '#AAFF00';
      const splineTension = 0.5;

      const startX = 100;
      const startY = 240;

      const startX_QB9 = 100;
      const startY_QB9 = 150;

      const startX_QB1 = 100;
      const startY_QB1 = 350;


      const switchGap = 40;
      const endY = startY + 2 * switchGap; 
      const endY_QB9 = startY_QB9 + 2 * switchGap;
      const endY_QB1 = startY_QB1 + 2 * switchGap;





      let switch_QC9 = true;
      let switch_QB9 = false;
      // let switch_QA1 = true;
      let switch_QB1 = false;
      
      return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {/* Labels */}
            <CircuitLabel x={60} y={10} text="D05 Future Bay" />
            <CircuitLabel x={35} y={80} text="QC9" />
            <CircuitLabel x={35} y={170} text="QB9" />
            <CircuitLabel x={35} y={270} text="QA1" />
            <CircuitLabel x={35} y={370} text="QB1" />
            {/* Lines */}
            {/* <CircuitLine points={[100, 60, 100, 450]} color={lineColor}isDotted /> */}
            <CircuitLine points={[100, 120, 80, 120]} color={lineColor} isDotted />
            <CircuitLine points={[100, 60, 100, 170]} color={lineColor}isDotted />
            <CircuitLine points={[100, 230, 100, 260]} color={lineColor}isDotted />
            <CircuitLine points={[100, 300, 100, 370]} color={lineColor}isDotted />
            <CircuitLine points={[100, 410, 100, 460]} color={lineColor}isDotted />
            {/* Components */}
            {/* <CircuitComponent x={25} y={110} label="CB8" color={componentColor} /> */}
            {/* <CircuitComponent_v x={90} y={150} label="CB9" color={componentColor} /> */}
            {/* <CircuitComponent_v x={90} y={250} label="CB10" color={componentColor} /> */}
            {/* <CircuitComponent_v x={90} y={350} label="CB11" color={componentColor} /> */}
            {/* Arrow */}
            <CircuitArrow points={[100, 60, 100, 50]} color={lineColor}isDotted />
            {/* Circle */}
            <CircuitCircle x={100} y={119} radius={5} color="black" />
            {/* <CircuitCircle x={100} y={450} radius={5} color="black" /> */}

            
            {/* Switch -- QC9 */}
            <Line
              points={[switchX, switchY, switchX + switchLength, switchY]}
              stroke={switch_QC9 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />

            {switch_QC9 && 
            (<Line
              points={[switchX + switchLength, 120, switchX + 2 * switchLength, switchY]}
              stroke={switch_QC9 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />)}

            {!switch_QC9 && 
            (<Line
              points={[switchX+4 + switchLength, 105, switchX + 2 * switchLength, switchY]}
              stroke={switch_QC9 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />)}  
            
            <Line
              points={[switchX + 2 * switchLength, switchY, switchX + 3 * switchLength, switchY]}
              stroke={switch_QC9 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />

            <Circle
              x={switchX + switchLength}
              y={switchY}
              radius={3}
              fill={switch_QC9 ? "green": "red"}
            />
            <Circle
              x={switchX + 2 * switchLength}
              y={switchY}
              radius={3}
              fill={switch_QC9 ? "green": "red"}
            />
            {/* End ____ QC9 */}

            {/* Switch _____ QB9 */}
            <Line
              points={[startX_QB9, 170, startX_QB9, startY_QB9 + switchGap]}
              stroke={switch_QB9 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />

            {switch_QB9 && 
            (<Line
              points={[startX_QB9, startY_QB9 + switchGap, 100, 210]}
              stroke={switch_QB9 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />)}

            {!switch_QB9 && 
            (<Line
              points={[startX_QB9, startY_QB9 + switchGap, 85, 206]}
              stroke={switch_QB9 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />)}

            <Line
              points={[startX_QB9, startY_QB9 + switchGap + 20, startX_QB9, endY_QB9]}
              stroke={switch_QB9 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />
            
            <Circle
              x={startX_QB9}
              y={startY_QB9 + switchGap}
              radius={3}
              fill={switch_QB9 ? "green": "red"}
            />
            <Circle
              x={startX_QB9}
              y={startY_QB9 + switchGap + 20}
              radius={3}
              fill={switch_QB9 ? "green": "red"}
            />
            {/* End ____ QB9 */}

            {/* Switch _____ QA1 */}
            <Line
              points={[startX, 260, startX, startY + switchGap]}
              stroke={switch_QA1 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />

            {switch_QA1 && 
            (<Line
              points={[startX, startY + switchGap, 100, 300]}
              stroke={switch_QA1 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />)}

            {!switch_QA1 && 
            (<Line
              points={[startX, startY + switchGap, 85, 296]}
              stroke={switch_QA1 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />)}

            <Line
              points={[startX, startY + switchGap + 20, startX, endY]}
              stroke={switch_QA1 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />
            
            <Circle
              x={startX}
              y={startY + switchGap}
              radius={3}
              fill={switch_QA1 ? "green": "red"}
            />
            <Circle
              x={startX}
              y={startY + switchGap + 20}
              radius={3}
              fill={switch_QA1 ? "green": "red"}
            />
            {/* End ____ QA1 */}

            {/* Switch _____ QB1 */}
            <Line
              points={[startX_QB1, 370, startX_QB1, startY_QB1 + switchGap]}
              stroke={switch_QB1 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />

            {switch_QB1 && 
            (<Line
              points={[startX_QB1, startY_QB1 + switchGap, 100, 410]}
              stroke={switch_QB1 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />)}

            {!switch_QB1 && 
            (<Line
              points={[startX_QB1, startY_QB1 + switchGap, 87, 404]}
              stroke={switch_QB1 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />)}

            <Line
              points={[startX_QB1, startY_QB1 + switchGap + 20, startX_QB1, endY_QB1]}
              stroke={switch_QB1 ? "green": "red"}
              strokeWidth={3}
              lineCap="round"
            />
            
            <Circle
              x={startX_QB1}
              y={startY_QB1 + switchGap}
              radius={3}
              fill={switch_QB1 ? "green": "red"}
            />
            <Circle
              x={startX_QB1}
              y={startY_QB1 + switchGap + 20}
              radius={3}
              fill={switch_QB1 ? "green": "red"}
            />
            {/* End ____ QB1 */}

          </Layer>
        </Stage>
      );
    };

  return (
    <div className="App">
      <Circuit />
    </div>
  );
}

export default EventViewer;
