import express from 'express';
import { createBook, getBooks, deleteBook, toggleShowOnMainPage } from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.array('images', 15), createBook);
router.get('/', getBooks);
router.delete('/:id', protect, deleteBook);
router.patch('/:id/toggle-main', protect, toggleShowOnMainPage);

export default router;