import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.model.js';

dotenv.config();

const adminUserData = {
  name: 'Admin User',
  email: 'admin@pizzaplanet.com',
  password: 'admin123',
  role: 'admin'
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizzaplanet');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminUserData.email });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }
    
    // Create admin user
    const adminUser = await User.create(adminUserData);
    console.log('Admin user created successfully:', {
      _id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role
    });
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();