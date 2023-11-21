import React, { createContext, useState, useEffect } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/simple_message/');
    
    socket.onmessage = function(event) {
        console.log("WebS");
        const data = JSON.parse(event.data);
        console.log(data);
        console.log(data.message.status);
        setData(data.message.status);
    };

    socket.onopen = function(event) {
        console.log("WebSocket opened:", event);
    };

    return () => {
        socket.close();
    };
}, []);

  return (
    <WebSocketContext.Provider value={data}>
      {children}
    </WebSocketContext.Provider>
  );
};
