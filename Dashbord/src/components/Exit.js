import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Exit.css';

function Exit() {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;  
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = originalStyle;
  }, []);

  return (
    <div className="exit-page">
      <div className="exit-content">
        <h1 className="heading">Welcome to Our Website</h1>
        <p>This is the exit page. You can provide some introductory content here.</p>
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </div>
  );
}

export default Exit;
