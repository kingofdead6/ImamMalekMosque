import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Login Admin/Superadmin
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role });
});

// Create Admin (Superadmin only)
const createAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Only superadmin can create admins' });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, role: 'admin' });
  res.status(201).json({ message: 'Admin created', user: { id: user._id, email: user.email, role: user.role } });
});
const createSuperAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, role: 'superadmin' });
  res.status(201).json({ message: 'Admin created', user: { id: user._id, email: user.email, role: user.role } });
});


// Get all users (Superadmin only)
const getUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== 'superadmin') {
    res.status(403);
    throw new Error('Only superadmin can view users');
  }
  const users = await User.find({}).select('-password');
  res.json(users);
});

// Delete a user (Superadmin only)
const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.role !== 'superadmin') {
    res.status(403);
    throw new Error('Only superadmin can delete users');
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (user.role === 'superadmin') {
    res.status(403);
    throw new Error('Cannot delete superadmin');
  }
  if (user._id.toString() === req.user.id) {
    res.status(403);
    throw new Error('Cannot delete yourself');
  }
  await User.deleteOne({ _id: req.params.id });
  res.json({ message: 'User deleted successfully' });
});

export { login, createAdmin, createSuperAdmin, getUsers, deleteUser };
