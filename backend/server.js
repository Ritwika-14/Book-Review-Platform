// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';     
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);     // <-- Use book routes
app.use('/api/reviews', reviewRoutes); // <-- Use review routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));