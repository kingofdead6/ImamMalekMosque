import express from 'express';
import { registerLibrary, getLibraryRegistrations, deleteLibraryRegistration, sendLibraryEmail } from '../controllers/libraryController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('pfp'), registerLibrary);
router.get('/', protect, getLibraryRegistrations);
router.delete('/:id', protect, deleteLibraryRegistration);
router.post('/send', protect, sendLibraryEmail);

export default router;