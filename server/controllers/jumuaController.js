import asyncHandler from 'express-async-handler';
import JumuaSubject from '../models/JumuaSubject.js';

// Create Jumua Subject
const createJumuaSubject = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('العنوان مطلوب');
  }

  const jumuaSubject = await JumuaSubject.create({
    title,
    showOnMainPage: false, // Always false on creation; toggle separately
  });

  res.status(201).json(jumuaSubject);
});

// Get All Jumua Subjects
const getJumuaSubjects = asyncHandler(async (req, res) => {
  const jumuaSubjects = await JumuaSubject.find().sort({ createdAt: -1 });
  res.json(jumuaSubjects);
});

// Delete Jumua Subject
const deleteJumuaSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const jumuaSubject = await JumuaSubject.findById(id);

  if (!jumuaSubject) {
    res.status(404);
    throw new Error('الموضوع غير موجود');
  }

  await jumuaSubject.deleteOne();
  res.json({ message: 'تم حذف الموضوع بنجاح' });
});

// Toggle Show on Main Page
const toggleShowOnMainPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const jumuaSubject = await JumuaSubject.findById(id);

  if (!jumuaSubject) {
    res.status(404);
    throw new Error('الموضوع غير موجود');
  }

  const newStatus = !jumuaSubject.showOnMainPage;

  if (newStatus) {
    // Set all others to false
    await JumuaSubject.updateMany({}, { showOnMainPage: false });
  }

  jumuaSubject.showOnMainPage = newStatus;
  await jumuaSubject.save();

  res.json(jumuaSubject);
});

export { createJumuaSubject, getJumuaSubjects, deleteJumuaSubject, toggleShowOnMainPage };