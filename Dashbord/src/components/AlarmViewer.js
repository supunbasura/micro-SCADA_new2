import React, { useState } from 'react';

const CircuitSwitch = ({ id, isOn, toggleSwitch }) => {
  const handleClick = () => {
    toggleSwitch(id);
  };

  const fillColor = isOn ? 'green' : 'gray';

  return <rect onClick={handleClick} fill={fillColor} /* ...other SVG props... */ />;
};

const AlarmViewer = () => {
  const [switchStates, setSwitchStates] = useState({
    sw1: false,
    sw2: false,
    // ... other switches
  });

  const toggleSwitch = (id) => {
    setSwitchStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <svg /* ...svg size and other attributes... */>
      {/* Draw lines and other static parts of the circuit here */}
      
      {/* Add switches, passing state and toggle function */}
      <CircuitSwitch id="sw1" isOn={switchStates.sw1} toggleSwitch={toggleSwitch} />
      <CircuitSwitch id="sw2" isOn={switchStates.sw2} toggleSwitch={toggleSwitch} />
      {/* ...other switches */}
    </svg>
  );
};

export default AlarmViewer;
