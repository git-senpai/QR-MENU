import express from 'express';
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderById
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public route for creating orders
router.post('/', createOrder);
router.get('/:id', getOrderById);

// Protected admin routes
router.get('/', protect, admin, getOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router; 