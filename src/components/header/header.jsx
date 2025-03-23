import React from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation
import "./Header.css";
import logo from "/public/logo.png"; // Ensure correct path

const Header = () => {
    return (
        <header className="header">
            {/* Logo and Tagline */}
            <div className="logo-container">
                <img src={logo} alt="Turf Time Logo" className="header-logo" />
                <span className="tagline">Your Game, Your Turf!</span>
            </div>

            {/* Centered Search Bar */}
            <div className="search-container">
                <input type="text" placeholder="Search by turf name or location" className="search-bar" />
                <button className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="nav-links">
                <Link to="#" className="nav-item">Home</Link>
                <Link to="/about" className="nav-item">About</Link>
                <Link to="/login" className="nav-item">Login</Link>
                <Link to="/signup" className="nav-item signup-btn">Signup</Link>
            </nav>
        </header>
    );
};

export default Header;


