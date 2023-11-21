import React, { useState, useEffect } from 'react';
import SwitchOn from '../SVG/Switch_on.svg';
import SwitchOff from '../SVG/Switch_Off.svg';

function Regions() {
    const [isSwitchedOn, setIsSwitchedOn] = useState("off");
    const [isToggling, setIsToggling] = useState(false);

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
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <div>
            {isSwitchedOn === "on" ? (
                <img src={SwitchOn} alt="Switch On" />
            ) : (
                <img src={SwitchOff} alt="Switch Off" />
            )}
        </div>
        <div onClick={handleToggle} style={{ 
          marginLeft: '-430px', 
          marginBottom: '50px', 
          opacity: 0,
          width: '150px', 
          height: '100px', 
          clip: 'rect(1px, 1px, 1px, 1px)', 
          whiteSpace: 'nowrap'
          }}>
            <label style={{ cursor: 'pointer' }}>
                {isSwitchedOn === "on" ? "Switch is ON" : "Switch is OFF"}
            </label>
        </div>
    </div>
    );
}

export default Regions;
