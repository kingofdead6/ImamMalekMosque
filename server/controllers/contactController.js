import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

// Submit Contact Form
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error('جميع الحقول مطلوبة');
  }
  const contact = await Contact.create({ name, email, message });
  res.status(201).json({ message: 'تم إرسال الرسالة بنجاح', contact });
});

// Get All Contacts (Admin only)
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// Delete Contact (Admin only)
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error('الرسالة غير موجودة');
  }

  await contact.deleteOne();
  res.json({ message: 'تم حذف الرسالة بنجاح' });
});

export { submitContact, getContacts, deleteContact };