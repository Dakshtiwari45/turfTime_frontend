import React from "react";
import "./Header.css";
import logo from "/public/logo.png"; // Ensure correct path

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Turf Time Logo" className="header-logo" />
                <span className="tagline">Your Game, Your Turf!</span>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search by turf name or location" className="search-bar" />
                <button className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </header>
    );
};

export default Header;

