import express from 'express';
import { createJumuaSubject, getJumuaSubjects, deleteJumuaSubject, toggleShowOnMainPage } from '../controllers/jumuaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createJumuaSubject);
router.get('/', getJumuaSubjects);
router.delete('/:id', protect, deleteJumuaSubject);
router.patch('/:id/toggle-main', protect, toggleShowOnMainPage);

export default router;