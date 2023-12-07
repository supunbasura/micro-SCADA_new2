import React,{useEffect} from 'react';
import myImage from '../Images/QQ_-2.png';
import '../Styling/Login.css';
import LoginForm from './LoginForm';

function Login() {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;  
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = originalStyle;
  }, []);
  return (
      <div className="content">
        <div className="image-container">
          <img class="custom-image" src={myImage} alt="My Image" />
        </div>
        <div className="login-container">
          <LoginForm />
        </div>
      </div>
  );
}

export default Login;
