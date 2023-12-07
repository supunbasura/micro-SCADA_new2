import React, { useState } from 'react';
import '../Styling/LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (username === "Admin" && password === "Admin") {
      window.location.href = 'http://127.0.0.1:5501/';
    } else {
      console.log('Invalid username or password');
      window.alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome</h2>
        <div className="input-group">
          <label htmlFor="username">Email or Username</label>
          <input
            id="username"
            type="text"
            value={username}
            className="input-text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            className="input-text"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <button type="submit" className="login-button">Sign in</button>
        <div className="login-footer">
          <a href="/">Forgot Password?</a>
          <a href="/">Create an account</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
