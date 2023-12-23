import React,{useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import MyComponent from './Test';
import CustomIframe from './CustomIframe';
import Frame from 'react-frame-component';
import Regions from './Regions';
import Regions3 from './Regions3';
import DataList from './RegionAlartList';
import AnalogData from './AnalogData';
import { Regions3DataProvider } from './Regions3DataContext';


function Regions2() {
  const [searchParams] = useSearchParams();
  const topicHtml = decodeURIComponent(searchParams.get('topic') || '');

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
        width="49.6%"
        height="440px"
      >
        {/* <Regions3/> */}
        <Regions3 topicHtml={topicHtml} />
        <div>{topicHtml}</div>
      </Frame>
      <Frame
        title="Frame 2"
        width="50%"
        height="440px"
      >
        <DataList/>
      </Frame>
      
      <Frame
        title="Frame 3"
        width="49.6%"
        height="432px"
      >
        <AnalogData/>
      </Frame>
      <iframe
        src="http://127.0.0.1:8050/"
        title="Frame4"
        width="50%"
        height="432px"
      ></iframe>
      </Regions3DataProvider>
        <iframe
        title="Footer"
        width="2085px"
        height="180px"
      ></iframe>
    </div>
  );
};

export default Regions2;
