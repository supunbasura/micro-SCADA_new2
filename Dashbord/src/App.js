import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import NetworkDiagram from './components/NetworkDiagram';
import Regions from './components/Regions';
import EventViewer from './components/EventViewer';
// ... import other components
import './App.css';
import Footer from './components/Footer';
import AlarmViewer from './components/AlarmViewer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/network-diagram" element={<NetworkDiagram />} />
            <Route path="/Regions" element={<Regions />} />
            <Route path="/AlarmViewer" element={<AlarmViewer />} />
            <Route path="/EventViewer" element={<EventViewer />} />
            {/* Define other routes here */}
          </Routes>
        </div>
        <Footer /> {/* Footer outside the Routes but inside the container */}
      </div>
    </Router>
  );
}

export default App;
