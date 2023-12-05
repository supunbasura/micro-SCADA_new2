import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styling/Navbar.css';
import companyLogo from '../Images/Company_logo.png';
import CEBlogo from '../Images/CEB.png';
// import Footer from './components/Footer';

const Navbar = () => {

  const handleExitClick = () => {
    window.location.href = 'http://127.0.0.1:5501/';
  };

  return (
    <nav className="navbar">
      <div className="logo-section left-logo">
        <img src={CEBlogo} alt="Systems Logo" className="logo" />
      </div>

      {/* Since we have 6 navigation links, each will take up one "column" */}
      <div className="nav-link"><NavLink to="/network-diagram" activeClassName="active">Network Diagram</NavLink></div>
      <div className="nav-link"><NavLink to="/regions2" activeClassName="active">Regions</NavLink></div>
      <div className="nav-link"><NavLink to="/event-viewer" activeClassName="active">Event Viewer</NavLink></div>
      <div className="nav-link"><NavLink to="/alarm-viewer" activeClassName="active">Alarm Viewer</NavLink></div>
      <div className="nav-link"><NavLink to="/history-trends" activeClassName="active">History / Trends</NavLink></div>
      <div className="nav-link"><NavLink to="/Reports" activeClassName="active">Reports</NavLink></div>
      <div className="nav-link"><NavLink to="/login" activeClassName="active">Login</NavLink></div>
      <div className="nav-link" onClick={handleExitClick}><NavLink to=" "activeClassName="active">Exit</NavLink></div>

      <div className="logo-section right-logo">
        <img src={companyLogo} alt="CEB Logo" className="logo" />
      </div>
    </nav>
    
  );
};

export default Navbar;
