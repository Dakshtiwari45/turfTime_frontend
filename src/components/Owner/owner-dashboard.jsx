import React from "react";
import { Link } from "react-router-dom";
import "./owner-dashboard.css";

function OwnerDashboard() {
  const turfData = [
    {
      name: "Elite Turf Arena",
      location: "Bhuwana, Udaipur",
      price: "₹700/hour",
      image: "/turf10.jpg", // Static image for now
    },
    {
      name: "Greenfield Sports Hub",
      location: "Fatehpura, Udaipur",
      price: "₹800/hour",
      image: "/turf12.jpg", // Static image for now
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Owner Dashboard</h2>
        <ul>
          <li>
            <Link to="/homepage">🏠 Home</Link>
          </li>
          <li>
            <Link to="/turfdetails">➕ Add Turf</Link>
          </li>
          <li>
            <Link to="#">📅 Manage Bookings</Link>
          </li>
          <li>
            <Link to="#">💰 Earnings</Link>
          </li>
          <li>
            <Link to="#">⚙️ Settings</Link>
          </li>
          <li>
            <Link to="/login">🚪 Logout</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome, Owner!</h1>
        <p>Here’s a quick glance at your turfs.</p>

        <div className="turf-list">
          {turfData.map((turf, index) => (
            <div key={index} className="turf-card">
              <img src={turf.image} alt={turf.name} className="turf-image" />
              <h3>⚽ {turf.name}</h3>
              <p>📍 {turf.location}</p>
              <p>💵 {turf.price}</p>
              <button className="edit-btn">Edit</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default OwnerDashboard;
