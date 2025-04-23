import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./booking.css";

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
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/turfs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch turf");
        const data = await res.json();
        setTurf(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, [id]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      setError("Please select a date and a time slot.");
      return;
    }
  
    const bookingData = {
      turfId: id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
    };
  
    // Get token from localStorage or sessionStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("You need to log in first.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Sending the token
        },
        body: JSON.stringify(bookingData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to book turf.");
      }
  
      alert("Booking successful!");
    } catch (err) {
      setError(err.message);
    }
  };
  

  if (loading) {
    return <div>Loading turf details...</div>;
  }

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
        <img
          src={`http://localhost:3000/api/turfs/image/${turf.image}`}
          alt={turf.name}
          className="turf-image"
        />
        <h1>{turf.name}</h1>
        <p>📍 {turf.address}</p>
        <p>💰 {turf.price}</p>
        <p>⭐ {turf.rating}</p>

        <div className="booking-section">
          <h2>Book Your Slot</h2>

          <label>Select Date:</label>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate}
          />

          <label>Select Time Slot:</label>
          <select
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            value={selectedTimeSlot}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          {error && <div className="error-message">{error}</div>}

          <button className="book-btn" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
