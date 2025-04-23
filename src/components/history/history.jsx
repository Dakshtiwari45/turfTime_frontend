import React, { useState, useEffect } from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";
import './history.css';

const History = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState({ id: null, name: '' });
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  // 1. Fetch booking history using Fetch API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/bookings/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(res);
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

    fetchBookings();
  }, []);

  const openModal = (booking) => {
    setSelectedTurf({ id: booking.turf._id, name: booking.turf.name });
    setReviewText('');
    setRating(0);
    setShowModal(true);
  };

  // 2. Submit or update review via Fetch API
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
          turfId: selectedTurf.id,
          rating,
          review: reviewText
        })
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to submit review');
      }
      alert(`Your ${rating}-star review for "${selectedTurf.name}" has been submitted!`);
      setShowModal(false);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Something went wrong submitting your review.');
    }
  };

  if (loading) return <p>Loading your history…</p>;

  return (
    <>
      <Header onSearch={() => {}} />

      <div className="history-page">
        <h2>Booking History</h2>

        {bookingHistory.length === 0 ? (
          <p>You have no past bookings.</p>
        ) : (
          <div className="history-list">
  {bookingHistory.map((b) => (
    <div className="history-card" key={b._id}>
      <h3>{b.turf.name}</h3>
      <img
        src={`http://localhost:3000/api/turfs/image/${b.turf.image}`}
        alt={b.turf.name}
        className="turf-image"
      />
      <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {b.turf.slots}</p>
      <p><strong>Location:</strong> {b.turf.address}</p>
      <button className="review-button" onClick={() => openModal(b)}>
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
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
            <h3>Review for {selectedTurf.name}</h3>

            <div className="rating-input">
              <label>Rating:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating ? 'star selected' : 'star'}
                    onClick={() => setRating(star)}
                  >★</span>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <button className="submit-review-btn" onClick={handleSubmitReview}>
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
