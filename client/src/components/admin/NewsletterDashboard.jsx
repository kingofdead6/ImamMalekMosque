import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { X, Send, Check, Trash } from 'lucide-react';
import { API_BASE_URL } from '../../../api.js';

export default function NewsletterDashboard() {
  const [data, setData] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isHtml, setIsHtml] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/api/newsletter`, {
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

  const handleSelectEmail = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
    setSuccess('');
    setError('');
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === data.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(data.map((item) => item.email));
    }
    setSuccess('');
    setError('');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/api/newsletter/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.filter((item) => item._id !== id));
      setSelectedEmails(selectedEmails.filter((email) => !data.find((item) => item._id === id && item.email === email)));
      setError('');
      setSuccess('تم حذف المشترك بنجاح');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل حذف المشترك');
    }
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    if (selectedEmails.length === 0) {
      setError('يرجى تحديد بريد إلكتروني واحد على الأقل');
      return;
    }
    if (!subject || !message) {
      setError('الموضوع والرسالة مطلوبان');
      return;
    }
    setIsLoading(true);
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/newsletter/send`,
        { emails: selectedEmails, subject, message, isHtml },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message);
      setSubject('');
      setMessage('');
      setIsHtml(false);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل إرسال النشرة');
    } finally {
      setIsLoading(false);
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
        النشرة الإخبارية
      </h2>
      {error && (
        <p className="text-red-500 dark:text-red-400 mb-4 font-amiri">{error}</p>
      )}
      {success && (
        <p className="text-green-500 dark:text-green-400 mb-4 font-amiri">{success}</p>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        disabled={data.length === 0}
        className={`cursor-pointer mb-6 w-full sm:w-auto px-6 py-3 ml-4 rounded-lg font-amiri ${
          data.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white'
        }`}
      >
        إرسال نشرة إخبارية
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSelectAll}
        className="cursor-pointer mb-6 ml-4 w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold text-white font-amiri"
      >
        {selectedEmails.length === data.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
      </motion.button>
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.map((item, index) => (
            <motion.div
              key={item._id}
              className="p-4 rounded-lg bg-light-surface dark:bg-dark-surface shadow-xl neon-glow-card font-amiri relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(item.email)}
                  onChange={() => handleSelectEmail(item.email)}
                  className="w-5 h-5"
                />
                <p>البريد: {item.email}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(item._id)}
                className="cursor-pointer  top-2 right-2 text-red-500 hover:text-red-600"
              >
                <Trash size={24} />
              </motion.button>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full font-amiri">لا توجد بيانات</p>
        )}
      </div>

      {/* Modal for Sending Newsletter */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-md p-6 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-lg shadow-xl neon-glow-card"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer  top-4 right-4 text-light-subtext dark:text-dark-subtext hover:text-light-primary dark:hover:text-dark-primary"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-light-primary dark:text-dark-primary mb-4 font-amiri">
              إرسال نشرة إخبارية
            </h3>
            <form onSubmit={handleSendNewsletter} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="موضوع الرسالة"
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text font-amiri"
                />
                <label className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 font-amiri">
                  موضوع الرسالة
                </label>
              </div>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="نص الرسالة"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text font-amiri"
                ></textarea>
                <label className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 font-amiri">
                  نص الرسالة
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isHtml}
                  onChange={() => setIsHtml(!isHtml)}
                  className="cursor-pointer w-5 h-5"
                />
                <label className="font-amiri">إرسال كنشرة HTML</label>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className={`cursor-pointer w-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-amiri ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'جارٍ الإرسال...' : 'إرسال'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}