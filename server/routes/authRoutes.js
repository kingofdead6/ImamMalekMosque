import express from 'express';
import { login, createAdmin, createSuperAdmin, getUsers, deleteUser } from '../controllers/authController.js';
import { protect, superadmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/admin', protect, superadmin, createAdmin);
router.post('/superadmin', createSuperAdmin);
router.get('/users', protect, superadmin, getUsers);
router.delete('/users/:id', protect, superadmin, deleteUser);

export default router;