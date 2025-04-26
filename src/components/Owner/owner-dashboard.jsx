import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./owner-dashboard.css";
import Header from "../header/header";

function OwnerDashboard() {
  const [turfs, setTurfs] = useState([]);
  const ownerId = localStorage.getItem("ownerId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (ownerId) {
      fetch(`http://localhost:3000/api/turfs/owner/${ownerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      alert("Logged out successfully!");
      navigate("/login");
    }
  };

  const handleDelete = (turfId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this turf?");
    if (confirmDelete) {
      fetch('http://localhost:3000/api/turfs/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: turfId }),  // Send 'id' instead of 'turfId'
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTurfs(turfs.filter((turf) => turf._id !== turfId));
          alert("Turf deleted successfully!");
          navigate(0);
        } else {
          alert(data.message);  // If deletion failed, show message from server
        }
      })
      .catch((err) => {
        console.error("Error deleting turf:", err);
        alert("Error deleting turf.");
      });
    }
  };
  

  return (
    <div className="dashboard-container">
      <Header />
      <aside className="sidebar">
        <h2>Owner Dashboard</h2>
        <ul>
          <li>
            <Link to="/owner-dashboard">🏠 Dashboard</Link>
          </li>
          <li>
            <Link to="/turfdetails">➕ Add Turf</Link>
          </li>
          <li>
            <Link to="/managebooking">📅 Manage Bookings</Link>
          </li>
          <li>
            <Link to="/login" onClick={handleLogout}>🚪 Logout</Link>
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <h1>Welcome, Owner!</h1>
        <p>Here’s a quick glance at your turfs.</p>

        <div className="turf-list">
          {turfs.length > 0 ? (
            turfs.map((turf) => (
              <div key={turf._id} className="turf-card">
                <img
                  src={`http://localhost:3000/api/turfs/image/${turf.image}`}
                  alt={turf.name}
                  className="turf-image"
                />
                <h3>⚽ {turf.name}</h3>
                <p>📍 {turf.address}</p>
                <p>💵 {turf.price}</p>
                <button className="booking-button">
                  <Link to={`/ownerbooking/${turf._id}`}>Bookings</Link>
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(turf._id)}
                >
                  🗑️ Delete
                </button>
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
