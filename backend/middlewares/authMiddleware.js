import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const JWT_SECRET="eaff6acad29106d2e782583b9d70996d73c8520851903261ea4904516322a6db1264ef1529e97079fea007345e2211a5b3b0ce8d20c8231b0410c519a8c59b00"

const protect = async (req, res, next) => {
  let token;

  // Check if the token is in the header and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using your JWT_SECRET
      const decoded = jwt.verify(token, JWT_SECRET);

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