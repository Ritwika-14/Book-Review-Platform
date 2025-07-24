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

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) {
      alert('Please write a review text.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addReview(id, { rating, review_text: reviewText });
      setRating(5);
      setReviewText('');
      fetchBookDetails();
    } catch (err) {
      console.error('Failed to add review', err);
      alert('Failed to add review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 text-center bg-slate-50">
      {book && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-700"><span className="font-semibold">Author:</span> {book.author}</p>
          <p className="text-gray-700"><span className="font-semibold">Genre:</span> {book.genre}</p>
          <h3 className="mt-2 text-lg text-yellow-600 font-medium">
            Average Rating: {book.averageRating.toFixed(1)} / 5
          </h3>
        </div>
      )}

      {token && (
        <form onSubmit={handleReviewSubmit} className="bg-white shadow-md rounded p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Write a Review</h4>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Fair</option>
              <option value={1}>1 - Poor</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Review:</label>
            <textarea
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.slice().reverse().map((review) => (
            <div
              key={review._id}
              className="border-b border-gray-200 pb-4 mb-4 shadow-sm p-4 bg-white rounded"
            >
              <p className="font-medium text-yellow-600">Rating: {review.rating}/5</p>
              <p className="text-gray-800 mt-1">{review.review_text}</p>
              <p className="text-sm text-gray-500 mt-2">
                by <span className="font-medium">{review.reviewer.username}</span> on{' '}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
