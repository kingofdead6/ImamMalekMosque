import express from 'express';
import { createTilawa, getTilawas, deleteTilawa, toggleShowOnMainPage } from '../controllers/tilawaController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.single('audio'), createTilawa);
router.get('/', getTilawas);
router.delete('/:id', protect, deleteTilawa);
router.patch('/:id/toggle-main', protect, toggleShowOnMainPage);

export default router;