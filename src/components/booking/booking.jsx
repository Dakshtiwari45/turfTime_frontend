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
  const { id } = useParams(); // turfId
  const [turf, setTurf] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingTurf, setLoadingTurf] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/turfs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch turf");
        setTurf(await res.json());
      } catch (err) {
        console.error(err);
        setError("Could not load turf details.");
      } finally {
        setLoadingTurf(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {

      const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to log in first.");
      return;
    }

      try {
        const res = await fetch(`http://localhost:3000/api/rating/rating-review/${id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json" 
          },
        });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const json = await res.json();
        setReviews(json.reviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingReviews(false);
      }
    })();
  }, [id]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      setError("Please select a date and a time slot.");
      return;
    }

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          turfId: id,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to book turf.");
      alert("Booking successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loadingTurf) return <div>Loading turf details…</div>;

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
      <div className="booking-content">
        {/* Left: Turf Info + Booking Form */}
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
              {timeSlots.map((slot, i) => (
                <option key={i} value={slot}>
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

        {/* Right: Reviews */}
        <div className="review-section">
          <h2>Reviews & Ratings</h2>
          {loadingReviews ? (
            <p>Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((r, idx) => (
              <div key={idx} className="review-card">
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.floor(r.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="comment">“{r.review}”</p>
                <p className="reviewer">
                  — {r.userName},{" "}
                  <span className="review-date">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
