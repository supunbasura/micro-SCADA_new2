
import React, { useState, useEffect ,useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SwitchOn from '../SVG/Switch_On_new2.svg';
import SwitchOff from '../SVG/Switch_Off_new2.svg';


import SwitchVisible from '../SVG/switchDefault_0000.svg';
import SwitchOffVisible from '../SVG/Switch_off_10_10.svg';
import SwitchOnVisible from '../SVG/Switch_off_01_01.svg';
import Switch_00_visible from '../SVG/Switch_off_00_00.svg';
import Switch_11_visible from '../SVG/Switch_off_11_11.svg';

import DataList from './RegionAlartList'
import '../Styling/Regions.css';
import LastBookContext from './LastBookContext';

function Regions() {
    const { lastBookElement } = useContext(LastBookContext);

    const [currentValue, setCurrentValue ] = useState("0");
    const [VoltageValue, setVoltageValue ] = useState("0");
    const [Frequency ,setFrequency] =useState("0");
    const [Power, setPower]=useState("0");
    
    const initialSwitchState = lastBookElement ? lastBookElement.fields.status :"01";
    const [isSwitchedOn, setIsSwitchedOn] = useState(initialSwitchState);
    console.log("initial :",initialSwitchState);

    // const [isSwitchedOn, setIsSwitchedOn] = useState("off");
    const [isToggling, setIsToggling] = useState(false);


    useEffect(() => {
        const handleWheel = (event) => {
            if (event.ctrlKey === true) {
                event.preventDefault();
            }
        };
    
        window.addEventListener('wheel', handleWheel, { passive: false });
    
        return () => {
            window.removeEventListener('wheel', handleWheel, { passive: false });
        };
    }, []); 
    

    const handleToggle = async () => {
        const newStatus = isSwitchedOn === "01" ? "10" : "01";
        const confirmationMessage = newStatus === "01" 
            ? "Are you sure you want to turn on?" 
            : "Are you sure you want to turn off?";

        const isConfirmed = window.confirm(confirmationMessage);
        if (!isConfirmed) {
            return;
        }

        setIsToggling(true);

        try {
            const response = await fetch('http://localhost:8000/send/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await response.json();
            if (data.status && data.status !== newStatus) {
                setIsSwitchedOn(data.status);
            }
        } catch (error) {
            alert("Failed to toggle:", error);
        } finally {
            setIsToggling(false);
        }
    };

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/simple_message/');

        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setIsSwitchedOn(data.message.CB_POS);

            setCurrentValue(data.message.CURRENT);
            setVoltageValue(data.message.VOLTAGE);
            setFrequency(data.message.FREQ);
            setPower(data.message.POW);

            console.log(data);
            console.log(data.message.CB_POS);
        };

        socket.onopen = function(event) {
            console.log("WebSocket opened:", event);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
      <div className="Regions" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <div className="circuit-Border">  
            <div className="circuit" style={{marginBottom:'800px', marginLeft:'-600px', marginRight:'200px'}}>
                <img src={SwitchVisible} alt="Switch visible" style={{width:'150%'}}/>
                <div>
                    {isSwitchedOn === "01" ? (
                        <img src={SwitchOnVisible } alt="Switch on SVG" className="switch_on"/>
                    )
                    : isSwitchedOn === "10" ? (
                        <img src={SwitchOffVisible} alt="Switch off SVG" className="switch_off"/>
                    )
                    : isSwitchedOn === "00" ? (
                        <img src={Switch_00_visible} alt="Switch 00 SVG" className="switch_00"/>
                    ):(
                        <img src={Switch_11_visible} alt="Switch 11 SVG" className="switch_11"/>
                    )
                }
                </div>
                <div onClick={handleToggle} style={{ 
                    marginLeft: '240px', 
                    marginTop: '-40px', 
                    opacity: 0, 
                    // width: '200px', 
                    // height: '100px', 
                    clip: 'rect(1px, 1px, 1px, 1px)', 
                    whiteSpace: 'nowrap'
                    }}>
                    <label style={{ cursor: 'pointer' }}>
                        {isSwitchedOn === "01" ? "Switch is on" : "Switch is off"}
                    </label>
                </div>
            </div>
        </div>
        <div class="data-display">
                <p>{VoltageValue} kV</p> 
                <p>{currentValue} A</p> 
                <p>{Frequency} Hz</p> 
                <p>{Power} p</p> 
        </div>

        <div className="DataList" style={{ marginBottom:'160px' ,marginLeft:'200px',marginRight:'50px'}}>
            <DataList />
        </div>
    </div>
    );
}

export default Regions;
