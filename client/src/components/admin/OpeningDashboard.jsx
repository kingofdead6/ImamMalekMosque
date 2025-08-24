import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, XCircle, X } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../../api.js';

export default function OpeningDashboard() {
  const [librarySchedule, setLibrarySchedule] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [formData, setFormData] = useState({ day: '', open: '', close: '', isClosed: false });
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  // Define all days for display
  const allDays = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  useEffect(() => {
    const fetchLibraryTimes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/library-times`);
        // Create a full schedule with unset days
        const fullSchedule = allDays.map((day) => {
          const existing = response.data.find((item) => item.day === day);
          return existing || { day, open: null, close: null, isClosed: false, _id: day };
        });
        setLibrarySchedule(fullSchedule);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'خطأ في جلب أوقات المكتبة');
      }
    };
    fetchLibraryTimes();
  }, []);

  const openEditModal = (day) => {
    setSelectedDay(day);
    setFormData({
      day: day.day,
      open: day.open || '',
      close: day.close || '',
      isClosed: day.isClosed,
    });
    setIsModalOpen(true);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'isClosed' && value ? { open: '', close: '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/library-times`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLibrarySchedule((prev) =>
        prev.map((item) =>
          item.day === selectedDay.day ? { ...response.data.time, _id: response.data.time._id || item._id } : item
        )
      );
      setSuccess('تم تحديث أوقات اليوم بنجاح');
      setIsModalOpen(false);
      setFormData({ day: '', open: '', close: '', isClosed: false });
      setSelectedDay(null);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل تحديث أوقات اليوم');
    }
  };

  // Framer Motion variants for animations
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    hover: { scale: 1.05, boxShadow: '0 0 15px rgba(52, 211, 153, 0.6)' },
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  // Format time for display (convert "09:00" to "09:00 صباحًا")
  const formatTime = (time) => {
    if (!time) return 'غير محدد';
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'مساءً' : 'صباحًا';
    const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <motion.section
      id="library-times"
      className="relative min-h-screen py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div className="mb-12" variants={titleVariants} initial="initial" animate="animate">
          <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block font-amiri">
            أوقات فتح المكتبة
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
          </h2>
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 dark:text-red-400 mb-6 font-amiri text-lg bg-red-100/50 dark:bg-red-900/30 p-3 rounded-lg"
          >
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 dark:text-green-400 mb-6 font-amiri text-lg bg-green-100/50 dark:bg-green-900/30 p-3 rounded-lg"
          >
            {success}
          </motion.p>
        )}

        <motion.div className="flex flex-wrap justify-center gap-4" variants={containerVariants} initial="initial" animate="animate">
          {librarySchedule.map((item, index) => (
            <motion.div
              key={item._id}
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg bg-gradient-to-br from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg neon-glow-card min-w-[220px] max-w-[320px] transition-all duration-300 hover:shadow-xl cursor-pointer"
              variants={itemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.08 }}
              onClick={() => (role === 'admin' || role === 'superadmin') && openEditModal(item)}
            >
              {item.isClosed ? (
                <XCircle className="w-8 h-8 mb-3 dark:text-red-500 text-red-400" />
              ) : (
                <Calendar className="w-8 h-8 mb-3 text-light-gold dark:text-dark-gold" />
              )}
              <p className="text-lg font-bold text-light-text dark:text-dark-text font-amiri">{item.day}</p>
              {item.isClosed ? (
                <p className="mt-2 text-red-500 dark:text-red-400 font-semibold text-md font-amiri">مغلق</p>
              ) : (
                <div className="flex flex-col items-center gap-1 mt-2 text-md font-amiri text-blue-800 dark:text-yellow-500">
                  <span>{formatTime(item.open)}</span>
                  <span className="text-light-accent dark:text-dark-accent">—</span>
                  <span>{formatTime(item.close)}</span>
                </div>
              )}
              {!item.isClosed && (
                <Clock className="w-6 h-6 mt-4 text-light-accent dark:text-dark-accent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {isModalOpen && (role === 'admin' || role === 'superadmin') && (
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              className="relative w-full max-w-md p-8 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-light-border/30 dark:border-dark-border/30"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer absolute top-4 right-4 text-light-subtext dark:text-dark-subtext hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-light-primary dark:text-dark-primary mb-6 font-amiri">
                تعديل أوقات {formData.day}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isClosed}
                    onChange={(e) => handleInputChange('isClosed', e.target.checked)}
                    className="cursor-pointer w-5 h-5 accent-light-primary dark:accent-dark-primary rounded"
                  />
                  <label className="font-amiri text-light-text dark:text-dark-text">مغلق</label>
                </div>
                {!formData.isClosed && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                        وقت الفتح
                      </label>
                      <input
                        type="time"
                        value={formData.open}
                        onChange={(e) => handleInputChange('open', e.target.value)}
                        className="w-full p-2 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border font-amiri"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                        وقت الإغلاق
                      </label>
                      <input
                        type="time"
                        value={formData.close}
                        onChange={(e) => handleInputChange('close', e.target.value)}
                        className="w-full p-2 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border font-amiri"
                        required
                      />
                    </div>
                  </div>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer w-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold py-3 rounded-lg font-amiri shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  حفظ التغييرات
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}

        <motion.p
          className="mt-6 text-2xl text-light-subtext dark:text-dark-subtext font-amiri"
          variants={itemVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: librarySchedule.length * 0.1 }}
        >
          🕌 مغلق وقت الصلاة
        </motion.p>
      </div>
    </motion.section>
  );
}