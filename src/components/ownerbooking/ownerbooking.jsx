import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from '../config';
import Header from "../header/header";
import Footer from "../footer/footer";
import "./ownerbooking.css";

const OwnerBookings = () => {
  const { turfId } = useParams();  // Get turfId from the URL params
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch turf bookings with pagination
  const fetchBookings = async (pageNumber) => {
    try {
      setLoading(true); // Set loading to true when the fetch starts

      const response = await fetch(`${API_URL}/api/bookings/turf/${turfId}?page=${pageNumber}&pageSize=12`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Authorization header with token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setBookings((prevBookings) => [...prevBookings, ...data.bookings]);  // Append new bookings
      setTotalPages(data.totalPages); // Update total pages for pagination
    } catch (err) {
      console.error('Error fetching bookings:', err);
      alert('Could not load your bookings.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch initial bookings when component mounts or when page/turfId changes
  useEffect(() => {
    setBookings([]); // Clear bookings on turfId change
    fetchBookings(page);
  }, [turfId, page]); // Fetch again if page or turfId changes

  if (loading) return <p>Loading your bookings...</p>;

  return (
    <>
      <Header />
      <div className="owner-bookings-page">
        <h2>Your Turf Bookings</h2>
        <div className="booking-cards">
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            bookings.map((booking, index) => (
              <div key={index} className="booking-card">
                <h3>{booking.turfName}</h3>
                <p><strong>User:</strong> {booking.userName}</p>
                <p><strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Rating:</strong> {"⭐".repeat(booking.rating)}</p>
                <p><strong>Review:</strong> {booking.review}</p>
              </div>
            ))
          )}
        </div>

        {page < totalPages && (
          <div className="load-more">
            <button onClick={() => setPage(page + 1)} disabled={loading}>
              Load More
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OwnerBookings;
