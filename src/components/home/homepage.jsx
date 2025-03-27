import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../Sidebar/sidebar";
import "./HomePage.css";

const HomePage = () => {
  const [turfs, setTurfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyTurfs = [
      { id: 1, name: "Green Field Turf", location: "Mumbai", price: "₹1000/2hr", rating: 4.5, image: "/turf1.jpg" },
      { id: 2, name: "Elite Sports Arena", location: "Pune", price: "₹1400/2hr", rating: 4.7, image: "/turf5.jpg" },
      { id: 3, name: "Urban Playzone", location: "Delhi", price: "₹1200/2hr", rating: 4.2, image: "/turf6.jpg" },
      { id: 4, name: "Prime Turf Arena", location: "Bangalore", price: "₹1300/2hr", rating: 4.6, image: "/turf7.jpg" },
      { id: 5, name: "Victory Sports Turf", location: "Hyderabad", price: "₹1100/2hr", rating: 4.4, image: "/turf8.jpg" },
      { id: 6, name: "Champion's Ground", location: "Chennai", price: "₹960/2hr", rating: 4.3, image: "/turf10.jpg" },
      { id: 7, name: "Pro Sports Arena", location: "Jaipur", price: "₹1500/2hr", rating: 4.8, image: "/turf11.jpg" },
      { id: 8, name: "Metro Turf", location: "Kolkata", price: "₹1060/2hr", rating: 4.2, image: "/turf12.jpg" },
      { id: 9, name: "Sports Ville", location: "Ahmedabad", price: "₹1180/2hr", rating: 4.5, image: "/turf13.jpg" },
      { id: 10, name: "Legends Arena", location: "Lucknow", price: "₹1240/2hr", rating: 4.6, image: "/turf14.jpg" },
    ];
    setTurfs(dummyTurfs);
  }, []);

  return (
    <div className="homepage-container">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
          <div className="turf-grid">
            {turfs.map((turf) => (
              <div 
                key={turf.id} 
                className="turf-card" 
                onClick={() => navigate(`/booking/${turf.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={turf.image} alt={turf.name} />
                <h2>{turf.name}</h2>
                <p>{turf.location}</p>
                <p className="price">{turf.price}</p>
                <p className="rating">⭐ {turf.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
