import mongoose from 'mongoose';
import Book from './bookModel.js';

const reviewSchema = new mongoose.Schema({
  review_text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  // Reference to the book being reviewed
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  },
  // Reference to the user who wrote the review
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

// After a new review is saved, recalculate the average rating for the book
reviewSchema.post('save', async function() {
  const review = this; // 'this' refers to the review that was just saved

  try {
    // 1. Find all reviews for the specific book that was just reviewed
    const reviews = await mongoose.model('Review').find({ book: review.book });

    // 2. Calculate the average rating
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    const averageRating = totalRating / reviews.length;

    // 3. Find the corresponding Book document and update its averageRating field
    await Book.findByIdAndUpdate(review.book, { averageRating: averageRating });

  } catch (error) {
    console.error('Failed to update average rating:', error);
  }
});


const Review = mongoose.model('Review', reviewSchema);

export default Review;