import express from 'express';
import { getLibraryTimes, setLibraryTime } from '../controllers/libraryTimesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getLibraryTimes);
router.post('/', protect, setLibraryTime);

export default router;