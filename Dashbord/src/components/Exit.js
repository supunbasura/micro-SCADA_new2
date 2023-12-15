import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Exit.css';
import companyLogo from '../Images/Company_logo.png';

function Exit() {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;  
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = originalStyle;
  }, []);

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
    <div className="exit-page">
      <div>
        {/* <img style={{width:"700px", height:"160px" ,marginTop:"40px", marginLeft:"600px",}} src={companyLogo} alt="CEB Logo" className="logo" /> */}
        <img style={{width:"500px", height:"100px" ,marginTop:"40px"}} src={companyLogo} alt="CEB Logo" className="logo" />
      </div>
      <div className="exit-content">
        <h1 className="heading"><i>G</i>DIS</h1>
        <p className='para'>GIS based Distribution Management System</p>
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </div>
  );
}

export default Exit;
