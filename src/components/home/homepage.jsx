import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Sidebar from "../Sidebar/sidebar";
import "./HomePage.css";

const HomePage = () => {
  const [turfs, setTurfs] = useState([]);

  // Function to fetch turfs (currently using static data)
  const fetchTurfs = async () => {
    // Static data for now
    const dummyTurfs = [
      {
        id: 1,
        name: "Green Field Turf",
        location: "Mumbai, India",
        price: "₹500/hr",
        rating: 4.5,
        image: "/turf1.jpg",
      },
      {
        id: 2,
        name: "Elite Sports Arena",
        location: "Pune, India",
        price: "₹700/hr",
        rating: 4.7,
        image: "/turf5.jpg",
      },
      {
        id: 3,
        name: "Urban Playzone",
        location: "Delhi, India",
        price: "₹600/hr",
        rating: 4.2,
        image: "/turf6.jpg",
      },
      {
        id: 4,
        name: "Prime Turf Arena",
        location: "Bangalore, India",
        price: "₹650/hr",
        rating: 4.6,
        image: "/turf7.jpg",
      },
      {
        id: 5,
        name: "Victory Sports Turf",
        location: "Hyderabad, India",
        price: "₹550/hr",
        rating: 4.4,
        image: "/turf8.jpg",
      },
      {
        id: 6,
        name: "Champion's Ground",
        location: "Chennai, India",
        price: "₹480/hr",
        rating: 4.3,
        image: "/turf10.jpg",
      },
      {
        id: 7,
        name: "Pro Sports Arena",
        location: "Jaipur, India",
        price: "₹750/hr",
        rating: 4.8,
        image: "/turf11.jpg",
      },
      {
        id: 8,
        name: "Metro Turf",
        location: "Kolkata, India",
        price: "₹530/hr",
        rating: 4.2,
        image: "/turf12.jpg",
      },
      {
        id: 9,
        name: "Sports Ville",
        location: "Ahmedabad, India",
        price: "₹590/hr",
        rating: 4.5,
        image: "/turf13.jpg",
      },
      {
        id: 10,
        name: "Legends Arena",
        location: "Lucknow, India",
        price: "₹620/hr",
        rating: 4.6,
        image: "/turf14.jpg",
      },
    ];
    setTurfs(dummyTurfs);
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  return (
    <div className="homepage-container">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
          <div className="turf-grid">
            {turfs.map((turf) => (
              <div key={turf.id} className="turf-card">
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
