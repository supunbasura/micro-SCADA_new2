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
import HomePage from './components/HomePage';


function App() {
  return (
      <div>
        <HomePage/>
      </div>
  );
}


export default App;
