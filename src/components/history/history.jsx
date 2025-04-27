import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import './history.css';

const History = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState({
    bookingId: null,
    turfId: null,
    turfName: ''
  });
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  // Fetch booking history
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/bookings/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to fetch bookings');
      }
      const data = await res.json();
      setBookingHistory(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      alert('Could not load your booking history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openModal = (booking) => {
    setSelectedTurf({
      bookingId: booking._id,
      turfId: booking.turf._id,
      turfName: booking.turf.name
    });
    setRating(0);
    setReviewText('');
    setShowModal(true);
  };

  const handleSubmitReview = async () => {
    if (!rating) return alert('Please select a rating.');

    try {
      const res = await fetch('http://localhost:3000/api/rating/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          bookingId: selectedTurf.bookingId,
          turfId: selectedTurf.turfId,
          userId: localStorage.getItem('userId') || localStorage.getItem('ownerId'),
          rating,
          review: reviewText
        })
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to submit review');
      }
      await res.json();
      alert(`Your ${rating}-star review for "${selectedTurf.turfName}" has been submitted!`);
      setShowModal(false);
      fetchBookings();
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Something went wrong submitting your review.');
    }
  };

  // Filter out any entries without a turf
  const validBookings = bookingHistory.filter(b => b.turf && b.turf._id);

  return (
    <>
      <Header />

      <div className="history-page">
        <h2>Booking History</h2>

        {loading ? (
          <p>Loading your history…</p>
        ) : validBookings.length === 0 ? (
          <p>You have no past bookings.</p>
        ) : (
          <div className="history-list">
            {validBookings.map((b) => (
              <div className="history-card" key={b._id}>
                <h3>{b.turf.name}</h3>
                <img
                  src={`http://localhost:3000/api/turfs/image/${b.turf.image}`}
                  alt={b.turf.name}
                  className="turf-image"
                />
                <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {b.timeSlot}</p>
                <p><strong>Location:</strong> {b.turf.address}</p>
                <button
                  className="review-button"
                  onClick={() => openModal(b)}
                >
                  Leave a Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="review-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h3>Review for {selectedTurf.turfName}</h3>

            <div className="rating-input">
              <label>Rating:</label>
              <div className="stars">
                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    className={star <= rating ? 'star selected' : 'star'}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            />

            <button
              className="submit-review-btn"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default History;
