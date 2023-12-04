import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route ,useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import NetworkDiagram from './components/NetworkDiagram';
import Regions from './components/Regions';
import EventViewer from './components/EventViewer';
import './App.css';
import Footer from './components/Footer';
import AlarmViewer from './components/AlarmViewer';
import Login from './components/Login';
import LastBookContext from './components/LastBookContext';

function App() {
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
            <Route path="/AlarmViewer" element={<AlarmViewer />} />
            <Route path="/EventViewer" element={<EventViewer />} />
            <Route path="/Login" element={<Login />} />

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

  if (location.pathname !== "/Login") {
    return <Footer />;
  }

  return null;
}

export default App;
