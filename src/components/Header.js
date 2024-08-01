// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import mainLogo from '../images/logo.jpg';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={mainLogo} alt="Logo" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="auth-buttons">
        <Link to="/login"><button type="button">Login</button></Link>
        <Link to="/register"><button type="button">Register</button></Link>
        <Link to="/purchase-history"><button type="button">Purchase History</button></Link> {/* Add this line */}
      </div>
    </header>
  );
};

export default Header;
