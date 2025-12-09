import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
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
    
    // Find all users
    const users = await User.find({});
    console.log('Found users:', users.length);
    
    // Update each user with hashed password
    for (const user of users) {
      console.log(`Processing user: ${user.email}`);
      
      // Check if password is already hashed (bcrypt hashes start with $2b$ or $2a$)
      if (!user.password.startsWith('$2b$') && !user.password.startsWith('$2a$')) {
        console.log(`Hashing password for user: ${user.email}`);
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        // Update the user
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        console.log(`Updated password for user: ${user.email}`);
      } else {
        console.log(`Password already hashed for user: ${user.email}`);
      }
    }
    
    console.log('All passwords updated successfully!');
    
    // Verify the updates
    const updatedUsers = await User.find({});
    console.log('Updated users:');
    updatedUsers.forEach(user => {
      console.log(`- ${user.email}: ${user.password.substring(0, 10)}...`);
    });
    
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    mongoose.connection.close();
  });