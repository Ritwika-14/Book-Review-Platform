// src/routes/authRoutes.js
import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { check } from 'express-validator';

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', [
    // Validation middleware
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], signup);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').exists()
], login);


export default router;