import React, { useState } from "react";
import "./Header.css";
import logo from "/public/logo.png"; // Ensure correct path

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="header">
      {/* Logo and Tagline */}
      <div className="logo-container">
        <img src={logo} alt="Turf Time Logo" className="header-logo" />
        <span className="tagline">Your Game, Your Turf!</span>
      </div>

      {/* Centered Search Bar */}
      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search by turf name or location"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <a href="/" className="nav-item">Home</a>
        <a href="/about" className="nav-item">About</a>
        <a href="/login" className="nav-item">Login</a>
        <a href="/signup" className="nav-item signup-btn">Signup</a>
      </nav>
    </header>
  );
};

export default Header;
