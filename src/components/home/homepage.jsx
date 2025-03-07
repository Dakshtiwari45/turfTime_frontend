import React from "react";
import Header from "../header/header"; // Import existing header
import Footer from "../footer/footer"; // Import existing footer
import Sidebar from "../Sidebar/sidebar"; //Import existing Sidebar
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
          <h1>Welcome to Turf Time</h1>
          <p>Find and book the best turfs near you!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

