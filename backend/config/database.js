import { connect } from 'mongoose';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;