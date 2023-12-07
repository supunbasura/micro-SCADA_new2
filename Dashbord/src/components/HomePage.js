import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route ,useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import NetworkDiagram from './NetworkDiagram';
import Regions from './Regions';
import Regions2 from './Regions2';
import Regions3 from './Regions3';
import EventViewer from './EventViewer';
// import './App.css';
import Footer from './Footer';
import AlarmViewer from './AlarmViewer';
import Login from './Login';
import Exit from './Exit';
import LastBookContext from './LastBookContext';

function HomePage() {
  const [lastBookElement, setLastBookElement] = useState(null);
  return (
    <LastBookContext.Provider value={{ lastBookElement, setLastBookElement }}>
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/network-diagram" element={<NetworkDiagram />} />
            <Route path="/Regions" element={<Regions />} />
            <Route path="/Regions2" element={<Regions2 />} />
            <Route path="/Regions3" element={<Regions3 />} />
            <Route path="/AlarmViewer" element={<AlarmViewer />} />
            <Route path="/EventViewer" element={<EventViewer />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Exit" element={<Exit />} />

          </Routes>
        </div>
        <ConditionalFooter />
      </div>
    </Router>
    </LastBookContext.Provider>
  );
}
function ConditionalFooter() {
  const location = useLocation();

  if (location.pathname !== "/login" && location.pathname !== "/Exit") {
    return <Footer />;
  }

  return null;
}

export default HomePage;
