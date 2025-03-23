import React from "react";
import "./About.css";
import logo from "/public/logo.png"// ✅ Turf Finder Logo

const About = () => {
  return (
    <div className="about-container">
      {/* ✅ Turf Finder Logo at the Top */}
      <div className="logo-container">
        <img src={logo} alt="Turf Finder Logo" className="turf-logo" />
      </div>

      <div className="about-header">
        <h1>About <span className="highlight">Turf Time</span></h1>
        <p>Your Ultimate Destination for Booking the Best Sports Turfs!</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>🌟 Who We Are</h2>
          <p>
            Turf Time is your **go-to platform** for discovering and booking 
            the **finest sports turfs** near you. Whether you're a **casual player** 
            or a **professional athlete**, we help you find the **perfect turf** 
            that suits your game.
          </p>
        </div>

        <div className="about-section">
          <h2>🎯 Why Choose Us?</h2>
          <ul>
            <li><span className="icon">🏆</span> **Verified and high-quality sports turfs**</li>
            <li><span className="icon">📅</span> **Easy online booking with real-time availability**</li>
            <li><span className="icon">📍</span> **Find nearby turfs with location-based search**</li>
            <li><span className="icon">💳</span> **Secure and hassle-free online payments**</li>
            <li><span className="icon">🤝</span> **Trusted by thousands of sports enthusiasts**</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>🚀 Our Mission</h2>
          <p>
            Our mission is to create a **seamless and hassle-free booking** 
            experience for sports lovers. We aim to promote a **healthy lifestyle** 
            by making sports more **accessible and enjoyable** for everyone.
          </p>
        </div>

        <div className="about-section contact-section">
          <h2>📞 Get in Touch</h2>
          <p>
            Have any questions? We're here to help! Reach out to us at  
            <b> tiwaridaksh22@gmail.com</b> or follow us on our **social media**  
            channels to stay updated.
          </p>

          {/* ✅ Social Icons */}
          <div className="social-icons">
            <span className="social-icon">🌐</span>
            <span className="social-icon">📘</span>
            <span className="social-icon">📷</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
