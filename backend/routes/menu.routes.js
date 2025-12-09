import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menu.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getMenuItems);
router.route('/:id').get(getMenuItemById);

// Admin routes
router.route('/').post(protect, admin, createMenuItem);
router.route('/:id').put(protect, admin, updateMenuItem).delete(protect, admin, deleteMenuItem);

export default router;