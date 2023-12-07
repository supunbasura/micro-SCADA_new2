import React,{useEffect} from 'react';
import MyComponent from './Test';
import CustomIframe from './CustomIframe';
import Frame from 'react-frame-component';
import Regions from './Regions';
import Regions3 from './Regions3';
import DataList from './RegionAlartList';
import AnalogData from './AnalogData';
import { Regions3DataProvider } from './Regions3DataContext';


function Regions2() {
  useEffect(() => {
    const handleWheel = (event) => {
        if (event.ctrlKey === true) {
            event.preventDefault();
        }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
        window.removeEventListener('wheel', handleWheel, { passive: false });
    };
  }, []); 
  return (
    <div className="app">
      <Regions3DataProvider>
      <Frame
        title="Frame 1"
        width="980px"
        height="420px"
      >
        <Regions3/>
      </Frame>
      <Frame
        title="Frame 2"
        width="980px"
        height="420px"
      >
        <DataList/>
      </Frame>
      
      <Frame
        title="Frame 3"
        width="980px"
        height="420px"
      >
        <AnalogData/>
      </Frame>
      <iframe
        src="http://127.0.0.1:8050/"
        title="Frame4"
        width="980px"
        height="420px"
      ></iframe>
      </Regions3DataProvider>
        <iframe
        title="Footer"
        width="1400px"
        height="160px"
      ></iframe>
    </div>
  );
};

export default Regions2;
