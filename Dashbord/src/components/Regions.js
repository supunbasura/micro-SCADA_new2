
import React, { useState, useEffect ,useContext} from 'react';
import SwitchOn from '../SVG/Switch_On_new2.svg';
import SwitchOff from '../SVG/Switch_Off_new2.svg';


import SwitchVisible from '../SVG/isSwitchedVisible_new.svg';
import SwitchOffVisible from '../SVG/isSwitchedOffVisible_new.svg';
import SwitchOnVisible from '../SVG/isSwitchedOnVisible_new.svg';

import DataList from './RegionAlartList'
import '../Styling/Regions.css';
import LastBookContext from './LastBookContext';

function Regions() {
    const { lastBookElement } = useContext(LastBookContext);
    
    const initialSwitchState = lastBookElement ? lastBookElement.fields.status :"on";
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
    
        // Cleanup function
        return () => {
            window.removeEventListener('wheel', handleWheel, { passive: false });
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
    

    const handleToggle = async () => {
        const newStatus = isSwitchedOn === "on" ? "off" : "on";
        const confirmationMessage = newStatus === "on" 
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
            setIsSwitchedOn(data.message.status);
            console.log(data);
            console.log(data.message.status);
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
            <div className="circuit" style={{marginBottom:'400px', marginLeft:'-300px' ,paddingRight:'150px', paddingLeft:'280px', marginRight:'200px'}}>
                <img src={SwitchVisible} alt="Switch visible" style={{width:'120%'}}/>
                <div>
                    {isSwitchedOn === "on" ? (
                        <img src={SwitchOnVisible } alt="Switch on SVG" className="switch_on"/>
                    ) : (
                        <img src={SwitchOffVisible} alt="Switch off SVG" className="switch_off"/>
                    )}
                </div>
                <div onClick={handleToggle} style={{ 
                    marginLeft: '450px', 
                    marginTop: '-310px', 
                    opacity: 0, 
                    width: '100px', 
                    height: '100px', 
                    clip: 'rect(1px, 1px, 1px, 1px)', 
                    whiteSpace: 'nowrap'
                    }}>
                    <label style={{ cursor: 'pointer' }}>
                        {isSwitchedOn === "on" ? "Switch is on" : "Switch is off"}
                    </label>
                </div>
            </div>
        </div>
        <div className="DataList" style={{ marginBottom:'160px' ,marginLeft:'100px',marginRight:'50px'}}>
            <DataList />
        </div>
    </div>
    );
}

export default Regions;
