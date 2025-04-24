import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./ownerbooking.css";

const OwnerBookings = () => {
  const demoBookings = [
    {
      turfName: "Greenfield Arena",
      userName: "Aryan Sharma",
      bookingDate: "2025-04-15",
      rating: 4,
      review: "Great turf! Clean and well maintained."
    },
    {
      turfName: "Sunrise Turf",
      userName: "Sneha Patel",
      bookingDate: "2025-04-20",
      rating: 5,
      review: "Loved the ambience and lights. Highly recommend!"
    }
  ];

  return (
    <>
      <Header />
      <div className="owner-bookings-page">
        <h2>Your Turf Bookings</h2>
        <div className="booking-cards">
          {demoBookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <h3>{booking.turfName}</h3>
              <p><strong>User:</strong> {booking.userName}</p>
              <p><strong>Booked On:</strong> {booking.bookingDate}</p>
              <p><strong>Rating:</strong> {"⭐".repeat(booking.rating)}</p>
              <p><strong>Review:</strong> {booking.review}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OwnerBookings;
