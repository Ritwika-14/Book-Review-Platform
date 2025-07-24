import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, addReview } from '../api';
import { AuthContext } from '../context/authContext';

const BookDetailPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. State for the new review form
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. A function to fetch all data for the page
  const fetchBookDetails = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getBookById(id);
      setBook(data.book);
      setReviews(data.reviews);
    } catch (err) {
      setError('Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  // 3. The handler for submitting the review form
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) {
      alert('Please write a review text.');
      return;
    }
    setIsSubmitting(true);
    try {
      // Call the API to add the review
      await addReview(id, { rating, review_text: reviewText });
      
      // Clear the form and fetch the data again to show the new review instantly
      setRating(5);
      setReviewText('');
      fetchBookDetails(); // <-- This makes it feel "real-time" on the frontend
    } catch (err) {
      console.error('Failed to add review', err);
      alert('Failed to add review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {book && (
        <>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <h3>Average Rating: {book.averageRating.toFixed(1)} / 5</h3>
        </>
      )}
      <hr />

      {/* 4. The Review Form (only shows if logged in) */}
      {token && (
        <form onSubmit={handleReviewSubmit} style={{ margin: '2rem 0' }}>
          <h4>Write a Review</h4>
          <div>
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Fair</option>
              <option value={1}>1 - Poor</option>
            </select>
          </div>
          <div>
            <label>Review:</label>
            <textarea rows="4" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required style={{ width: '100%' }}/>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
      <hr />

      {/* 5. The Reviews List */}
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.slice().reverse().map(review => ( // Use slice().reverse() to show newest first
          <div key={review._id} style={{ borderBottom: '1px solid #eee', marginBottom: '1rem', paddingBottom: '1rem' }}>
            <p><strong>Rating: {review.rating}/5</strong></p>
            <p>{review.review_text}</p>
            <small>by {review.reviewer.username} on {new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to write one!</p>
      )}
    </div>
  );
};

export default BookDetailPage;