import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./managebooking.css";

function ManageBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const ownerId = localStorage.getItem("ownerId");

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/bookings/${ownerId}/active`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            }
          }
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        
        // Flatten the data to extract active bookings from each turf
        const activeBookings = data
          .flatMap(turf => turf.activeBookings); // Flatten the activeBookings arrays
          
        setBookings(activeBookings);
      } catch (err) {
        console.error(err);
        setError("Could not load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [ownerId, token]);

  // Cancel a booking
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/bookings/close/${id}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!res.ok) throw new Error("Cancel failed");
      // remove it from state
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Booking canceled!");
    } catch (err) {
      console.error(err);
      alert("Could not cancel booking.");
    }
  };

  if (loading) return <p>Loading bookings…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <Header />
      <div className="manage-bookings-container">
        <h2>📅 Manage Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking._id}>
                <h3>{booking.turf.name}</h3>
                <p><strong>User:</strong> {booking.user?.name || 'N/A'}</p> {/* Check user availability */}
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(booking._id)}
                >
                  ❌ Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ManageBookings;
