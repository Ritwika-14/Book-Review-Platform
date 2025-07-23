import Book from '../models/bookModel.js';
import Review from '../models/reviewModel.js';

// @desc    Add a new book
// @route   POST /api/books
// @access  Private
export const addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  
  if (!title || !author || !genre) {
    return res.status(400).json({ msg: 'Please provide title, author, and genre' });
  }

  try {
    const book = new Book({
      title,
      author,
      genre,
      addedBy: req.user.id // From our 'protect' middleware
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get all books with filters and pagination
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  const { genre, author, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (genre) filter.genre = genre;
  if (author) filter.author = new RegExp(author, 'i'); // Case-insensitive search

  try {
    const books = await Book.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }); // Sort by newest first

    const count = await Book.countDocuments(filter);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get a single book by ID with its reviews
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    
    const reviews = await Review.find({ book: req.params.id })
      .populate('reviewer', 'username'); // Get username from reviewer

    res.json({ book, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};