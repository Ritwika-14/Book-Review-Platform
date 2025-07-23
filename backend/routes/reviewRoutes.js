import express from 'express';
import { addReview } from '../controllers/reviewController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/:bookId')
  .post(protect, addReview); // Protect this route

export default router;