import express from 'express';
import { getDashboardStats, getUsers, updateUserRole, getAllOrders } from '../controllers/admin.controller.js';
import { updateOrderStatus } from '../controllers/order.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(protect);
router.use(admin);

// Dashboard routes
router.get('/dashboard', getDashboardStats);

// User management routes
router.get('/users', getUsers);
router.put('/users/:userId', updateUserRole);

// Order management routes
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

export default router;