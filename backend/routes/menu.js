import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController.js';

const router = express.Router();

// Public route
router.get('/', getMenuItems);

// Protected routes
router.post('/', protect, admin, upload.single('image'), createMenuItem);
router.put('/:id', protect, admin, upload.single('image'), updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

export default router; 