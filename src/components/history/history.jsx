import React, { useState } from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";
import './history.css';

const History = () => {
  const bookingHistory = [
    {
      id: 1,
      turfName: 'Green Field Arena',
      date: '2025-04-20',
      time: '10:00 AM - 12:00 PM',
      location: 'Mumbai',
    },
    {
      id: 2,
      turfName: 'Soccer Pro Turf',
      date: '2025-04-18',
      time: '2:00 PM - 4:00 PM',
      location: 'Delhi',
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const openModal = (turfName) => {
    setSelectedTurf(turfName);
    setReviewText('');
    setRating(0);
    setShowModal(true);
  };

  const handleSubmitReview = () => {
    console.log(`Review for ${selectedTurf}:`, reviewText, `Rating: ${rating} star(s)`);
    alert(`Your ${rating}-star review for "${selectedTurf}" has been submitted!`);
    setShowModal(false);
  };

  return (
    <>
      <Header onSearch={() => {}} />

      <div className="history-page">
        <h2>Booking History</h2>

        <div className="history-list">
          {bookingHistory.map((b) => (
            <div className="history-card" key={b.id}>
              <h3>{b.turfName}</h3>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
              <p><strong>Location:</strong> {b.location}</p>
              <button className="review-button" onClick={() => openModal(b.turfName)}>
                Leave a Review
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="review-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
            <h3>Review for {selectedTurf}</h3>

            <div className="rating-input">
              <label>Rating:</label>
              <div className="stars">
                {[1,2,3,4,5].map((star) => (
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
