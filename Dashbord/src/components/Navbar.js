import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../Styling/Navbar.css';
import companyLogo from '../Images/Company_logo.png';
import CEBlogo from '../Images/CEB.png';

const Navbar = () => {
  const [isOnLoginPage, setIsOnLoginPage] = useState(false);
  const [isOnExitPage, setIsOnExitPage] = useState(false);
  const [isOnRegionsPage, setIsOnRegionsPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOnLoginPage(location.pathname === '/login');
    setIsOnExitPage(location.pathname === '/');
  }, [location]);

  const renderNavLink = (to, label) => {
    // Determine if the link should be enabled
    // Links are enabled if not on the Login page or if it's the 'Exit' link
    // and if not on the Exit page or if it's the 'Login' link
    const isLinkEnabled = (!isOnLoginPage || to === '/') && (!isOnExitPage || to === '/login');

    return (
      <div className={`nav-link ${!isLinkEnabled ? 'disabled' : ''}`}>
        <NavLink to={to} activeClassName="active" disabled={!isLinkEnabled}>
          {label}
        </NavLink>
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="logo-section left-logo">
        <img src={CEBlogo} alt="Systems Logo" className="logo" />
      </div>
      
      {renderNavLink('http://127.0.0.1:5501/', 'GIS Network')}
      {renderNavLink('/regions2', 'Regions')}
      {renderNavLink('/EventViewer', 'Event Viewer')}
      {renderNavLink('/alarm-viewer', 'Alarm Viewer')}
      {renderNavLink('/history-trends', 'History / Trends')}
      {renderNavLink('/Reports', 'Reports')}
      {renderNavLink('/login', 'Login')}
      {renderNavLink('/', 'Exit')}
      {/* {renderNavLink('/Exit', 'Exit')} */}

      <div className="logo-section right-logo">
        <img src={companyLogo} alt="CEB Logo" className="logo" />
      </div>
    </nav>
  );
};

export default Navbar;
