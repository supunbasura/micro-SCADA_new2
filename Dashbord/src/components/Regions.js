import React, { useState, useEffect } from 'react';
import { TbCircuitSwitchClosed, TbCircuitSwitchOpen } from 'react-icons/tb'; 
import '../Styling/Regions.css';
import Navbar from "./Navbar"

function Regions() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonStatus, setButtonStatus] = useState("off");
    const [isToggling, setIsToggling] = useState(false); // Add this state to track if a toggle is in progress
       
    const handleToggle = async () => {
        const newStatus = buttonStatus === "on" ? "off" : "on";
        const confirmationMessage = newStatus === "on" 
            ? "Are you sure you want to turn on?" 
            : "Are you sure you want to turn off?";
        
        // Show confirmation dialog
        const isConfirmed = window.confirm(confirmationMessage);
        
        // If user chooses "Cancel", don't proceed with the toggle
        if (!isConfirmed) {
            return;
        }
        
        // Optimistically set the status in UI
        // setButtonStatus(newStatus);
        setIsToggling(true); // Disable polling

        try {
            const response = await fetch('http://localhost:8000/send/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await response.json();
            // If the server responds with a different status, update the UI
            if (data.status && data.status !== newStatus) {
                //setButtonStatus(data.status);
            }
        } catch (error) {
            // Revert the button status if there's an error
            setButtonStatus(buttonStatus === "on" ? "on" : "off");
            alert("Failed to toggle:", error);
        } finally {
            setIsToggling(false); // Re-enable polling
        }
    };

    const handleFetchBooks = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/books/');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            alert("Failed to fetch books:", error);
        } finally {
            setIsLoading(false);
        }
    };

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

    // useEffect(() => {
    //     const socket = new WebSocket('ws://localhost:8000/ws/book_data/');
    
    //     socket.onmessage = function(event) {
    //         setIsLoading(true);
    //         try{
    //             const data = JSON.parse(event.data);
    //             console.log("book_data received");
    //             if (data.book_data) {
    //                 setBooks(data.book_data);
    //             }
    //         } catch(error) {
    //             alert("Failed to fetch books:", error);
    //         } finally{
    //             setIsLoading(false);
    //         }
    //     };
        
    // }, []);
    

    return (
        <div className="Regions">
            <header className="Regions-header">
                <h1>Kafka React App</h1>
                <button onClick={handleToggle} className={buttonStatus === "on" ? "button-on" : "button-off"}>
                    {buttonStatus === "on" ? <TbCircuitSwitchClosed size={30} /> : <TbCircuitSwitchOpen size={30} />}
                </button>
                <label>Status: {buttonStatus}</label>
            </header>
        </div>
    );
}

export default Regions;
