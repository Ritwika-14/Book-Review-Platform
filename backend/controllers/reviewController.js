import Review from '../models/reviewModel.js';
import Book from '../models/bookModel.js';

export const addReview = async (req, res) => {
    const { rating, review_text } = req.body;
    const { bookId } = req.params;
    if (!rating || !review_text) {
        return res.status(400).json({ msg: 'Please provide a rating and review text' });
    }
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        const review = new Review({
            rating,
            review_text,
            book: bookId,
            reviewer: req.user.id // From our 'protect' middleware
        });

        await review.save();
        res.status(201).json({ msg: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};