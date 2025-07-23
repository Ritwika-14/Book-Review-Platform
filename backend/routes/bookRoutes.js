import express from 'express';
import { addBook, getBooks, getBookById } from '../controllers/bookController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, addBook) // Protect this route
  .get(getBooks);

router.route('/:id')
  .get(getBookById);

export default router;