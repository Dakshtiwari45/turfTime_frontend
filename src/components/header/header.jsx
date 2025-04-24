import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "/public/logo.png";

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ownerId = localStorage.getItem("ownerId");
    const userId = localStorage.getItem("userId");

    setIsOwner(!!ownerId);
    setIsLoggedIn(!!ownerId || !!userId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      setIsLoggedIn(false);
      setIsOwner(false);
      alert("Logged out successfully!");
      navigate("/login");
    }
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Turf Time Logo" className="header-logo" />
        <span className="tagline">Your Game, Your Turf!</span>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by turf name or location"
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

        {isOwner && (
          <a href="/owner-dashboard" className="nav-item">Owner Dashboard</a>
        )}

        {isLoggedIn && (
          <a href="/history" className="nav-item">History</a>
        )}

        {!isLoggedIn ? (
          <>
            <a href="/login" className="nav-item">Login</a>
            <a href="/signup" className="nav-item signup-btn">Signup</a>
          </>
        ) : (
          <span
            className="nav-item logout-btn"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        )}
      </nav>
    </header>
  );
};

export default Header;

