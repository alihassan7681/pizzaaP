import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register user
export const register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log('Existing user check:', existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if this is the admin email
    const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
    console.log('Assigned role:', role);

    // Create user
    console.log('Creating user with data:', { name, email, password, phone, role });
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role
    });
    console.log('User created:', user);

    // Generate token
    const token = generateToken(user._id, user.role);
    console.log('Token generated');

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password using callback
    user.comparePassword(password, async (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate token
      const token = generateToken(user._id, user.role);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};