import express from 'express';
import { registerDawra, getDawraRegistrations, deleteRegistration, sendDawraEmail } from '../controllers/dawraController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerDawra);
router.get('/', protect, getDawraRegistrations);
router.delete('/:id', protect, deleteRegistration);
router.post('/send', protect, sendDawraEmail);

export default router;