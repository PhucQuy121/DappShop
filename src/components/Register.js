import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Perform registration logic here
    console.log('Register:', email, password);

    // Redirect to login page or home page upon successful registration
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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
        <button type="submit">Register</button>
      </form>
      <p className="auth-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
