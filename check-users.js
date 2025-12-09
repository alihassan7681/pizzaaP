import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the backend directory
dotenv.config({ path: path.resolve(__dirname, 'backend', '.env') });

// Import User model
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const User = require('./backend/models/User.model.js').default;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-planet')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check if there are any users
    const users = await User.find({});
    console.log('Users in database:', users);
    
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    mongoose.connection.close();
  });