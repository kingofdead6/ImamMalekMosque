import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, XCircle, X } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../../api'; // Adjust the path to your API base URL

export default function LibraryTimes() {
  const [librarySchedule, setLibrarySchedule] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Define all days for display
  const allDays = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  // Fetch library times on mount
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

  // Open edit modal for a specific day
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



  // Format time for display
  const formatTime = (time) => {
    if (!time) return 'غير محدد';
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'مساءً' : 'صباحًا';
    const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <section
      id="library-times"
      className="relative py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
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
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg bg-gradient-to-br from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg neon-glow-card min-w-[220px] max-w-[320px] transition-all duration-300 hover:shadow-xl "
              variants={itemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.08 }}
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
    </section>
  );
}