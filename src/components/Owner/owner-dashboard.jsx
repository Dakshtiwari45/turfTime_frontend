import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./owner-dashboard.css";

function OwnerDashboard() {
  const [turfs, setTurfs] = useState([]);
  const ownerId = localStorage.getItem("ownerId"); // Make sure this is set after login/signup
  const token = localStorage.getItem("token"); // If your API uses authentication

  useEffect(() => {
    if (ownerId) {
      // Fetch turfs for the owner
      fetch(`http://localhost:3000/api/turfs/owner/${ownerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // If your endpoint is protected, include the token
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.turfs) {
            setTurfs(data.turfs);
          }
        })
        .catch((err) => console.error("Error fetching turfs:", err));
    }
  }, [ownerId, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ownerId");
    localStorage.removeItem("userId");
    navigate("/login");
  };

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
            <Link to="/login" onClick={handleLogout}>🚪 Logout</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome, Owner!</h1>
        <p>Here’s a quick glance at your turfs.</p>

        <div className="turf-list">
          {turfs.length > 0 ? (
            turfs.map((turf, index) => (
              <div key={index} className="turf-card">
                <img
                  src={`http://localhost:3000/api/turfs/image/${turf.image}`}
                  alt={turf.name}
                  className="turf-image"/>
                <h3>⚽ {turf.name}</h3>
                <p>📍 {turf.address}</p>
                <p>💵 {turf.price}</p>
                <button className="edit-btn">Edit</button>
              </div>
            ))
          ) : (
            <p>No turfs found. Please add one!</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default OwnerDashboard;
