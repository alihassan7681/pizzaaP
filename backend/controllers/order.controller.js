import Order from '../models/Order.model.js';
import MenuItem from '../models/Menu.model.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    const userId = req.user._id; // Fixed: Use _id instead of userId

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    // Validate total amount
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Valid total amount is required' });
    }

    // Create order items with proper references
    const orderItems = [];
    for (const item of items) {
      // Verify menu item exists
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(400).json({ message: `Menu item with ID ${item.menuItemId} not found` });
      }

      orderItems.push({
        menuItem: menuItem._id,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      });
    }

    // Create the order
    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        zipCode: shippingAddress.zipCode || ''
      },
      phoneNumber: shippingAddress.phone // Add phone number from shipping address
    });

    const createdOrder = await order.save();
    
    // Populate the order with menu item details for the response
    const populatedOrder = await Order.findById(createdOrder._id)
      .populate('user', 'name email phone')
      .populate('items.menuItem');

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }) // Fixed: Use _id instead of userId
      .populate('items.menuItem')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};