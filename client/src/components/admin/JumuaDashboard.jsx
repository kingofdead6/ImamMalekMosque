import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { X, CheckCircle, Circle } from 'lucide-react';
import { API_BASE_URL } from '../../../api.js';

export default function JumuaDashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  // Fetch Jumua subjects
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jumua`, {
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
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/jumua`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData([response.data, ...data]);
      setTitle('');
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل إضافة الموضوع');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/api/jumua/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.filter((item) => item._id !== id));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل حذف الموضوع');
    }
  };

  // Handle toggle show on main page
  const handleToggleMainPage = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/jumua/${id}/toggle-main`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(
        data.map((item) =>
          item._id === id
            ? { ...item, showOnMainPage: response.data.showOnMainPage }
            : { ...item, showOnMainPage: false }
        )
      );
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل تحديث حالة العرض');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <h2 className="text-4xl font-bold text-light-primary dark:text-dark-primary mb-6 font-amiri">
        مواضيع الجمعة
      </h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer mb-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-amiri"
      >
        إضافة موضوع جديد
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
              <p className="text-lg font-medium">{item.title}</p>
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

      {/* Modal for adding new subject */}
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
              إضافة موضوع جديد
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان الموضوع"
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text peer placeholder-transparent font-amiri"
                />
                <label
                  htmlFor="title"
                  className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm font-amiri"
                >
                  عنوان الموضوع
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