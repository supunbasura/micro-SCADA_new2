import React, { createContext, useState } from 'react';

export const Regions3DataContext = createContext();

export const Regions3DataProvider = ({ children }) => {
  // const [currentValue, setCurrentValue] = useState(" ");
  // const [voltageValue, setVoltageValue] = useState(" ");
  // const [frequency, setFrequency] = useState(" ");
  // const [power, setPower] = useState(" ");

  // const { currentRphase, setcurrentRphase,currentYphase, setcurrentYphase,currentBphase, setcurrentBphase,voltageRphase, setvoltageRphase,voltageYphase, setvoltageYphase,voltageBphase, setvoltageBphase, frequency, setFrequency, ApparentPower, setApparentPower, ReactivePower, setReactivePower } = useContext(Regions3DataContext);
  
  const [currentRphase, setcurrentRphase] = useState(" ");
  const [currentYphase, setcurrentYphase] = useState(" ");
  const [currentBphase, setcurrentBphase] = useState(" ");

  const [voltageRphase, setvoltageRphase] = useState(" ");
  const [voltageYphase, setvoltageYphase] = useState(" ");
  const [voltageBphase, setvoltageBphase] = useState(" ");

  const [frequency, setFrequency] = useState(" ");

  const [ApparentPower, setApparentPower] = useState(" ");
  const [ReactivePower, setReactivePower] = useState(" ");

  // const value = {
  //   currentValue, setCurrentValue,
  //   voltageValue, setVoltageValue,
  //   frequency, setFrequency,
  //   power, setPower
  // };
  const value = {
    currentRphase, setcurrentRphase,
    currentYphase, setcurrentYphase,
    currentBphase, setcurrentBphase,

    voltageRphase, setvoltageRphase,
    voltageYphase, setvoltageYphase,
    voltageBphase, setvoltageBphase,

    frequency, setFrequency,

    ApparentPower, setApparentPower,
    ReactivePower, setReactivePower
  };

  return (
    <Regions3DataContext.Provider value={value}>
      {children}
    </Regions3DataContext.Provider>
  );
};
