import React from "react";
import { Link } from "react-router-dom";
import "./owner-dashboard.css";

function OwnerDashboard() {
  const turfData = [
    {
      name: "Elite Turf Arena",
      location: "Bhuwana, Udaipur",
      price: "₹700/hour",
    },
    {
      name: "Greenfield Sports Hub",
      location: "Fatehpura, Udaipur",
      price: "₹800/hour",
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
        <p>Here’s a quick glance at your turf bookings.</p>

        <div className="turf-list">
          {turfData.map((turf, index) => (
            <div key={index} className="turf-card">
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
