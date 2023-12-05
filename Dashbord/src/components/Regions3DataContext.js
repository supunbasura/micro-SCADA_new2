import React, { createContext, useState } from 'react';

export const Regions3DataContext = createContext();

export const Regions3DataProvider = ({ children }) => {
  const [currentValue, setCurrentValue] = useState("0");
  const [voltageValue, setVoltageValue] = useState("0");
  const [frequency, setFrequency] = useState("0");
  const [power, setPower] = useState("0");

  const value = {
    currentValue, setCurrentValue,
    voltageValue, setVoltageValue,
    frequency, setFrequency,
    power, setPower
  };

  return (
    <Regions3DataContext.Provider value={value}>
      {children}
    </Regions3DataContext.Provider>
  );
};
