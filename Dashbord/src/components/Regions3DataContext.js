import React, { createContext, useState } from 'react';

export const Regions3DataContext = createContext();

export const Regions3DataProvider = ({ children }) => {
  const [currentValue, setCurrentValue] = useState(" ");
  const [voltageValue, setVoltageValue] = useState(" ");
  const [frequency, setFrequency] = useState(" ");
  const [power, setPower] = useState(" ");

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
