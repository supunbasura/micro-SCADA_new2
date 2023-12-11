import React, { useContext } from 'react';
import { Regions3DataContext } from './Regions3DataContext';

function AnalogData() {
  const { currentValue, voltageValue, frequency, power } = useContext(Regions3DataContext);
  console.log("CUrrent value::::",currentValue);

  // Define ranges for row colors
  const getRowColor = (value, type) => {
    switch (type) {
      case 'voltage':
        if (value >= 10 && value <= 30) return 'red';
        break;
      case 'current':
        if (value >= 51.50 && value <= 60) return 'red'; 
        break;
      case 'frequency':
        if (value >= 50.20 && value <= 60) return 'red';
        break;
      case 'power':
        if (value >= 40 && value <= 50) return 'red'; 
        break;
      default:
        return 'none';
    }
    return '#F8F8FF';
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '10px', 
    // fontWeight: 'bold', 
    fontSize: '20px',
    fontFamily: 'SF-UI, sans-serif',
    
  };

  // Style specifically for the table headers
  const headerStyle = {
    ...cellStyle, 
    textAlign: 'center',
    backgroundColor: 'Gray', 
    color: 'Black', 
    fontFamily: 'SF-UI, sans-serif',
  };

  return (
    <table style={{ width: '100%',marginTop:'35px'}}>
      <thead>
        <tr>
          <th style={headerStyle}>Parameter</th>
          <th style={headerStyle}>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: getRowColor(voltageValue, 'voltage') }}>
          <td style={cellStyle}>Voltage Value</td>
          <td style={cellStyle}>{voltageValue} kV</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(currentValue, 'current') }}>
          <td style={cellStyle}>Current Value</td>
          <td style={cellStyle}>{currentValue} A</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(frequency, 'frequency') }}>
          <td style={cellStyle}>Frequency Value</td>
          <td style={cellStyle}>{frequency} Hz</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(power, 'power') }}>
          <td style={cellStyle}>Power Value</td>
          <td style={cellStyle}>{power} p</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(power, 'power') }}>
          <td style={cellStyle}>Power Value</td>
          <td style={cellStyle}>{power} p</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(power, 'power') }}>
          <td style={cellStyle}>Power Value</td>
          <td style={cellStyle}>{power} p</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(power, 'power') }}>
          <td style={cellStyle}>Power Value</td>
          <td style={cellStyle}>{power} p</td>
        </tr>
      </tbody>
    </table>
  );
}

export default AnalogData;
