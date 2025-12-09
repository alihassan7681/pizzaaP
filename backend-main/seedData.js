import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pizza from './models/Pizza.model.js';

dotenv.config();

const pizzaData = [
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    category: 'vegetarian',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Fresh Basil']
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Delicious pizza topped with spicy pepperoni slices',
    price: 14.99,
    category: 'non-vegetarian',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni']
  },
  {
    name: 'Vegetable Supreme',
    description: 'Loaded with fresh vegetables and herbs',
    price: 13.99,
    category: 'vegetarian',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Bell Peppers', 'Onions', 'Mushrooms', 'Olives']
  },
  {
    name: 'Chicken Tikka Pizza',
    description: 'Grilled chicken tikka with aromatic spices',
    price: 15.99,
    category: 'non-vegetarian',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Chicken Tikka', 'Onions', 'Green Chilies']
  },
  {
    name: 'Vegan Delight',
    description: 'Plant-based pizza with vegan cheese and vegetables',
    price: 14.99,
    category: 'vegan',
    ingredients: ['Vegan Tomato Sauce', 'Vegan Cheese', 'Bell Peppers', 'Red Onions', 'Spinach', 'Mushrooms']
  }
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizzaplanet');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Pizza.deleteMany();
    console.log('Existing data cleared');
    
    // Insert new data
    await Pizza.insertMany(pizzaData);
    console.log('Sample data imported successfully');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();