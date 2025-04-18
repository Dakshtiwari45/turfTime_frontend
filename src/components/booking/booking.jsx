import React from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./booking.css";

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
  { id: 10, name: "Legends Arena", location: "Lucknow", price: "₹1240/2hr", rating: 4.6, image: "/turf16.jpg" },
];

const timeSlots = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
  "8:00 PM - 10:00 PM",
  "10:00 PM - 12:00 AM",
];

const Booking = () => {
  const { id } = useParams();
  const turf = dummyTurfs.find((t) => t.id === parseInt(id));

  if (!turf) {
    return (
      <div className="error-container">
        <h1>⚠ Turf Data Not Found!</h1>
        <p>Please go back and select a turf again.</p>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <Header />
      <div className="turf-info">
        <img src={turf.image} alt={turf.name} className="turf-image" />
        <h1>{turf.name}</h1>
        <p>📍 {turf.location}</p>
        <p>💰 {turf.price}</p>
        <p>⭐ {turf.rating} Rating</p>

        <div className="booking-section">
          <h2>Book Your Slot</h2>
          <label>Select Date:</label>
          <input type="date" />

          <label>Select Time Slot:</label>
          <select>
            {timeSlots.map((slot, index) => (
              <option key={index}>{slot}</option>
            ))}
          </select>

          <button className="book-btn">Confirm Booking</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
