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
    const bookId = this.book;
    const reviews = await this.constructor.find({ book: bookId });
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    const averageRating = totalRating / reviews.length;

    await Book.findByIdAndUpdate(bookId, { averageRating: averageRating.toFixed(2) });
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
