import User from '../models/User.model.js';
import Order from '../models/Order.model.js';

// Get admin dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get total orders count
    const totalOrders = await Order.countDocuments();
    
    // Get total revenue (sum of all order amounts)
    const orders = await Order.find({}, 'totalAmount');
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
    // Get recent orders (last 5)
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name');
    
    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (for user management)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, select: '-password' } // Return updated user without password
    );
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (for order management)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDashboardStats, getUsers, updateUserRole, getAllOrders };