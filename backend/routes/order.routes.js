import express from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply protection middleware to all routes
router.use(protect);

// Create a new order
router.route('/').post(createOrder);

// Get user's orders
router.route('/my-orders').get(getUserOrders);

export default router;