import express from 'express';
import { createOrder, getOrderById, getMyOrders, getOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, admin, updateOrderStatus);

export default router;