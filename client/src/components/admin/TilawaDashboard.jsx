import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { X, CheckCircle, Circle, Upload } from 'lucide-react';
import { API_BASE_URL } from '../../../api.js';

export default function TilawaDashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [rank, setRank] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch Tilawa entries
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/api/tilawa`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'خطأ في جلب البيانات');
      }
    };
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('rank', rank);
    if (audioFile) {
      formData.append('audio', audioFile);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tilawa`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setData((prevData) => {
        const existing = prevData.find((item) => item.rank === parseInt(rank));
        if (existing) {
          return prevData.map((item) =>
            item.rank === parseInt(rank) ? response.data : item
          );
        }
        return [response.data, ...prevData];
      });
      setTitle('');
      setRank('');
      setAudioFile(null);
      fileInputRef.current.value = null;
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل إضافة التلاوة');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/api/tilawa/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.filter((item) => item._id !== id));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل حذف التلاوة');
    }
  };

  // Handle toggle show on main page
  const handleToggleMainPage = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/tilawa/${id}/toggle-main`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(
        data.map((item) =>
          item._id === id
            ? { ...item, showOnMainPage: response.data.showOnMainPage }
            : item
        )
      );
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل تحديث حالة العرض');
    }
  };

  // Get available ranks
  const availableRanks = [1, 2, 3].filter(
    (r) => !data.some((item) => item.rank === r)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <h2 className="text-4xl font-bold text-light-primary dark:text-dark-primary mb-6 font-amiri">
        أفضل التلاوات
      </h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer mb-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-amiri"
      >
        إضافة تلاوة جديدة
      </motion.button>
      {error && (
        <p className="text-red-500 dark:text-red-400 mb-4 font-amiri">{error}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((item, index) => (
            <motion.div
              key={item._id}
              className="p-4 rounded-lg bg-light-surface dark:bg-dark-surface shadow-xl neon-glow-card font-amiri"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-lg font-medium">{item.title} (الترتيب: {item.rank})</p>
              <audio
                controls
                className="w-full rounded-lg bg-gradient-to-r from-light-accent/20 to-light-gold/20 dark:from-dark-accent/20 dark:to-dark-gold/20 neon-glow-audio mt-2"
              >
                <source src={item.audioUrl} type="audio/mpeg" />
                متصفحك لا يدعم مشغل الصوت.
              </audio>
              <div className="flex items-center gap-2 mt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggleMainPage(item._id)}
                  className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-amiri ${
                    item.showOnMainPage
                      ? 'bg-light-gold dark:bg-dark-gold text-white'
                      : 'bg-light-subtext dark:bg-dark-subtext text-light-text dark:text-dark-text'
                  }`}
                >
                  {item.showOnMainPage ? (
                    <>
                      <CheckCircle size={20} />
                      معروض في الصفحة الرئيسية
                    </>
                  ) : (
                    <>
                      <Circle size={20} />
                      تعيين للصفحة الرئيسية
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(item._id)}
                  className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-amiri"
                >
                  حذف
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full font-amiri">لا توجد بيانات</p>
        )}
      </div>

      {/* Modal for adding new Tilawa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-md p-6 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-lg shadow-xl neon-glow-card"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer top-4 right-4 text-light-subtext dark:text-dark-subtext hover:text-light-primary dark:hover:text-dark-primary"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-light-primary dark:text-dark-primary mb-4 font-amiri">
              إضافة تلاوة جديدة
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان التلاوة"
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text peer placeholder-transparent font-amiri"
                />
                <label
                  htmlFor="title"
                  className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm font-amiri"
                >
                  عنوان التلاوة
                </label>
              </div>
              <div className="relative">
                <select
                  id="rank"
                  required
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text font-amiri"
                >
                  <option value="" disabled>
                    اختر الترتيب
                  </option>
                  {availableRanks.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                  {data.map((item) => (
                    <option key={item.rank} value={item.rank}>
                      {item.rank} (تحديث: {item.title})
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="rank"
                  className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 font-amiri"
                >
                  الترتيب
                </label>
              </div>
              <div className="relative">
                <input
                  type="file"
                  id="audio"
                  accept="audio/mpeg"
                  required
                  ref={fileInputRef}
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text font-amiri"
                />
                <label
                  htmlFor="audio"
                  className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 font-amiri"
                >
                  ملف الصوت
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className={`cursor-pointer w-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-amiri ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'جارٍ الإضافة...' : 'إضافة'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}