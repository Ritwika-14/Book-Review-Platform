import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  // Check if the token is in the header and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using your JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's payload and attach it to the request object
      // We exclude the password when fetching the user data
      req.user = await User.findById(decoded.user.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ msg: 'Not authorized, user not found' });
      }

      next(); // Move to the next function in the route
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

export default protect;