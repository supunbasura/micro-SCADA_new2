import React, { useState, useEffect } from 'react';
import SwitchOn from '../SVG/Switch_On_new2.svg';
import SwitchOff from '../SVG/Switch_Off_new2.svg';

import SwitchVisible from '../SVG/isSwitchedVisible.svg';
import SwitchOffVisible from '../SVG/isSwitchedOffVisible_new.svg';
import SwitchOnVisible from '../SVG/isSwitchedOnVisible_new.svg';

import DataList from './RegionAlartList'

import '../Styling/Regions.css';

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
      <div className="Regions" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <header className="Regions-header">
            <img src={SwitchVisible} alt="Switch visible" />
            <div>
                {isSwitchedOn === "on" ? (
                    <img src={SwitchOnVisible } alt="Switch on SVG" style={{ position: 'absolute' ,marginLeft: '404px', marginTop: '-272px'  }} />
                ) : (
                    <img src={SwitchOffVisible} alt="Switch off SVG" style={{ position: 'absolute' ,marginLeft: '392px', marginTop: '-272px'  }} />
                )}
            </div>
            <div onClick={handleToggle} style={{ 
                marginLeft: '350px', 
                marginTop: '-247px', 
                opacity: 0,
                width: '100px', 
                height: '90px', 
                clip: 'rect(1px, 1px, 1px, 1px)', 
                whiteSpace: 'nowrap'
                }}>
                <label style={{ cursor: 'pointer' }}>
                    {isSwitchedOn === "on" ? "Switch is on" : "Switch is off"}
                </label>
            </div>
        </header>
        <div className="DataList">
            <DataList />
        </div>
    </div>
    );
}

export default Regions;
