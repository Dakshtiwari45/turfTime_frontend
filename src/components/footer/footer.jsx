import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <h2>Turf Time</h2>
                    <p>
                        Embark on a sporting journey across cities with our diverse turf selection.
                        Find your ideal playing ground and book your game today!
                    </p>
                    <div className="contact">
                        <p><strong>Contact us</strong></p>
                        <a href="tel:+918279214199">+91 8279214199</a> |
                        <a href="mailto:tiwaridaksh22@gmail.com"> tiwaridaksh22@gmail.com</a>
                    </div>
                </div>

                <div className="footer-right">
                    <h2>Important Links</h2>
                    <ul>
                        <li><a href="/homepage">About ↺</a></li>
                        <li><a href="/homepage">Privacy Policy ↺</a></li>
                        <li><a href="/homepage">Terms & Conditions ↺</a></li>
                    </ul>
                    <div className="social-icons">
                        <a href="#"><i className="fas fa-bus"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Turf Time © 2025</p>
            </div>
        </footer>
    );
};

export default Footer;
