import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  // We will store a reference to the user who added the book
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // We will also store the average rating to make querying faster
  averageRating: {
      type: Number,
      default: 0
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;