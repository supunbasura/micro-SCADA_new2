import React from 'react';
import myImage from '../Images/QQ_.png';
import '../Styling/Login.css';
import LoginForm from './LoginForm';

function Login() {
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
