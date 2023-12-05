import React, { useContext } from 'react';
import { Regions3DataContext } from './Regions3DataContext';

function AnalogData() {
  const { currentValue, voltageValue, frequency, power } = useContext(Regions3DataContext);

  // Define ranges for row colors
  const getRowColor = (value) => {
    if (value < -500) return 'red'; // Lower range, color the row red
    if (value >= -500 && value <= 500) return 'White'; // Middle range, color the row light green
    return 'none'; // Upper range, no color
  };

  // Style for the table cells to align text to the center, make text bold, and font size 20px
  const cellStyle = {
    textAlign: 'center',
    padding: '10px', // Adjust padding as needed
    fontWeight: 'bold', // Make font bold
    fontSize: '20px' // Set font size to 20px
  };

  // Style specifically for the table headers
  const headerStyle = {
    ...cellStyle, // Spread the existing cell styles
    backgroundColor: 'Gray', // Background color for header
    color: 'Black', // Text color for header
  };

  return (
    <table style={{ width: '100%',marginTop:'15px'}}>
      <thead>
        <tr>
          <th style={headerStyle}>Parameter</th>
          <th style={headerStyle}>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: getRowColor(voltageValue) }}>
          <td style={cellStyle}>Voltage Value:</td>
          <td style={cellStyle}>{voltageValue} kV</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(currentValue) }}>
          <td style={cellStyle}>Current Value:</td>
          <td style={cellStyle}>{currentValue} A</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(frequency) }}>
          <td style={cellStyle}>Frequency Value:</td>
          <td style={cellStyle}>{frequency} Hz</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(power) }}>
          <td style={cellStyle}>Power Value:</td>
          <td style={cellStyle}>{power} p</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(power) }}>
          <td style={cellStyle}>Power Value:</td>
          <td style={cellStyle}>{power} p</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(power) }}>
          <td style={cellStyle}>Power Value:</td>
          <td style={cellStyle}>{power} p</td>
        </tr>
        <tr style={{ backgroundColor: getRowColor(power) }}>
          <td style={cellStyle}>Power Value:</td>
          <td style={cellStyle}>{power} p</td>
        </tr>
      </tbody>
    </table>
  );
}

export default AnalogData;
