import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here
    console.log('Login:', email, password);

    // Redirect to home page or other page upon successful login
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="auth-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
