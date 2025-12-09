import express from 'express';
import {
  getDashboardStats,
  getUsers,
  getOrders,
  updateOrderStatus,
  deleteUser
} from '../controllers/admin.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply middleware to all routes
router.use(protect);
router.use(admin);

router.route('/dashboard').get(getDashboardStats);
router.route('/users').get(getUsers);
router.route('/users/:id').delete(deleteUser);
router.route('/orders').get(getOrders);
router.route('/orders/:id/status').put(updateOrderStatus);

export default router;