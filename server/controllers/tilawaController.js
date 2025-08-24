import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';
import Tilawa from '../models/Tilawa.js';

// Create or Update Tilawa
const createTilawa = asyncHandler(async (req, res) => {
  const { title, rank } = req.body;
  const file = req.file;
  if (!file) {
    res.status(400);
    throw new Error('ملف الصوت مطلوب');
  }
  if (!title || !rank) {
    res.status(400);
    throw new Error('العنوان والترتيب مطلوبان');
  }

  const existingTilawa = await Tilawa.findOne({ rank });
  const imageUrls = [];
  if (file) {
      const result = await cloudinary.uploader.upload(file.path, { resource_type: 'video' });
      imageUrls.push(result.secure_url);
  }

  if (existingTilawa) {
    // Update existing Tilawa for the rank
    existingTilawa.title = title;
    existingTilawa.audioUrl = imageUrls[0];
    existingTilawa.showOnMainPage = false; // Reset showOnMainPage on update
    await existingTilawa.save();
    res.status(200).json(existingTilawa);
  } else {
    // Create new Tilawa
    const tilawa = await Tilawa.create({ title, rank, audioUrl: imageUrls[0], showOnMainPage: false });
    res.status(201).json(tilawa);
  }
});

// Get All Tilawas
const getTilawas = asyncHandler(async (req, res) => {
  const tilawas = await Tilawa.find().sort({ createdAt: -1 });
  res.json(tilawas);
});

// Delete Tilawa
const deleteTilawa = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tilawa = await Tilawa.findById(id);

  if (!tilawa) {
    res.status(404);
    throw new Error('التلاوة غير موجودة');
  }

  await tilawa.deleteOne();
  res.json({ message: 'تم حذف التلاوة بنجاح' });
});

// Toggle Show on Main Page
const toggleShowOnMainPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tilawa = await Tilawa.findById(id);

  if (!tilawa) {
    res.status(404);
    throw new Error('التلاوة غير موجودة');
  }

  tilawa.showOnMainPage = !tilawa.showOnMainPage;
  await tilawa.save();

  res.json(tilawa);
});

export { createTilawa, getTilawas, deleteTilawa, toggleShowOnMainPage };