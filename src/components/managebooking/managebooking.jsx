import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./managebooking.css";

function ManageBookings() {
  const staticBookings = [
    {
      _id: "1",
      turfName: "Sunrise Arena",
      userName: "Rahul Sharma",
      date: "2025-04-28",
      timeSlot: "4 PM - 6 PM",
    },
    {
      _id: "2",
      turfName: "Greenfield Turf",
      userName: "Anjali Verma",
      date: "2025-04-30",
      timeSlot: "6 PM - 8 PM",
    },
  ];

  const handleCancel = (id) => {
    alert(`Booking with ID ${id} canceled! (Mock)`);
  };

  return (
    <>
      <Header />
      <div className="manage-bookings-container">
        <h2>📅 Manage Bookings</h2>
        <div className="bookings-list">
          {staticBookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.turfName}</h3>
              <p><strong>User:</strong> {booking.userName}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
              <button className="cancel-btn" onClick={() => handleCancel(booking._id)}>
                ❌ Cancel Booking
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ManageBookings;
