import express from 'express';
import { subscribeNewsletter, getSubscribers, deleteSubscriber, sendNewsletter } from '../controllers/newsletterController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', subscribeNewsletter);
router.get('/', protect, getSubscribers);
router.delete('/:id', protect, deleteSubscriber);
router.post('/send', protect, sendNewsletter);

export default router;