import asyncHandler from 'express-async-handler';
import LibraryTimes from '../models/LibraryTimes.js';

// Get all library times
const getLibraryTimes = asyncHandler(async (req, res) => {
  const times = await LibraryTimes.find().sort({ _id: 1 });
  res.json(times);
});

// Create or update library times for a specific day (admin or superadmin)
const setLibraryTime = asyncHandler(async (req, res) => {
  const { day, open, close, isClosed } = req.body;

  if (!day || !['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].includes(day)) {
    res.status(400);
    throw new Error('يوم غير صالح');
  }

  if (!isClosed && (!open || !close)) {
    res.status(400);
    throw new Error('يجب تحديد أوقات الفتح والإغلاق للأيام المفتوحة');
  }

  const existingTime = await LibraryTimes.findOne({ day });

  if (existingTime) {
    // Update existing record
    const updatedTime = await LibraryTimes.findOneAndUpdate(
      { day },
      { open: isClosed ? null : open, close: isClosed ? null : close, isClosed },
      { new: true, runValidators: true }
    );
    res.json({ message: 'تم تحديث أوقات اليوم بنجاح', time: updatedTime });
  } else {
    // Create new record
    const newTime = await LibraryTimes.create({
      day,
      open: isClosed ? null : open,
      close: isClosed ? null : close,
      isClosed,
    });
    res.status(201).json({ message: 'تم إنشاء أوقات اليوم بنجاح', time: newTime });
  }
});

export { getLibraryTimes, setLibraryTime };