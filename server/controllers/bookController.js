import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';
import Book from '../models/Book.js';

// Create Book
const createBook = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const files = req.files;
  const imageUrls = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }
  }
  if (!title) {
    res.status(400);
    throw new Error('العنوان مطلوب');
  }
  const book = await Book.create({ title, description, images: imageUrls, showOnMainPage: false });
  res.status(201).json(book);
});

// Get All Books
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// Delete Book
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    res.status(404);
    throw new Error('الكتاب غير موجود');
  }

  await book.deleteOne();
  res.json({ message: 'تم حذف الكتاب بنجاح' });
});

// Toggle Show on Main Page
const toggleShowOnMainPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    res.status(404);
    throw new Error('الكتاب غير موجود');
  }

  book.showOnMainPage = !book.showOnMainPage;
  await book.save();

  res.json(book);
});

export { createBook, getBooks, deleteBook, toggleShowOnMainPage };