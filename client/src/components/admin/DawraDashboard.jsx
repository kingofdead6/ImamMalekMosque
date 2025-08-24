import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { X, Send, Info, Trash } from 'lucide-react';
import { API_BASE_URL } from '../../../api.js';

export default function DawraDashboard() {
  const [data, setData] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
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
        const response = await axios.get(`${API_BASE_URL}/api/dawra`, {
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
      await axios.delete(`${API_BASE_URL}/api/dawra/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.filter((item) => item._id !== id));
      setSelectedEmails(selectedEmails.filter((email) => !data.find((item) => item._id === id && item.email === email)));
      setError('');
      setSuccess('تم حذف التسجيل بنجاح');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل حذف التسجيل');
    }
  };

  const handleSendEmail = async (e) => {
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
        `${API_BASE_URL}/api/dawra/send`,
        { emails: selectedEmails, subject, message, isHtml },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message);
      setSubject('');
      setMessage('');
      setIsHtml(false);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل إرسال الرسالة');
    } finally {
      setIsLoading(false);
    }
  };

  const openDetailsModal = (registrant) => {
    setSelectedRegistrant(registrant);
    setIsDetailsModalOpen(true);
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    hover: { scale: 1.03, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' },
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-br from-light-background to-light-surface/50 dark:from-dark-background dark:to-dark-surface/50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-light-primary dark:text-dark-primary mb-8 font-amiri bg-clip-text  bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold">
          تسجيلات الدورة
        </h2>
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
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            disabled={data.length === 0}
            className={`cursor-pointer flex-1 sm:flex-none px-6 py-3 rounded-lg font-amiri text-white font-semibold transition-all duration-300 ${
              data.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent shadow-lg hover:shadow-xl'
            }`}
          >
            إرسال بريد إلكتروني
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSelectAll}
            className="cursor-pointer flex-1 sm:flex-none px-6 py-3 rounded-lg bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold text-white font-semibold font-amiri shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {selectedEmails.length === data.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5  gap-6">
          {data.length > 0 ? (
            data.map((item, index) => (
              <motion.div
                key={item._id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300 font-amiri border border-light-border/50 dark:border-dark-border/50 cursor-pointer group"
                onClick={() => openDetailsModal(item)}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(item.email)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectEmail(item.email);
                    }}
                    className="cursor-pointer w-5 h-5 accent-light-primary dark:accent-dark-primary rounded"
                  />
                  <div>
                    <p className="text-lg font-semibold text-light-primary dark:text-dark-primary">{item.name}</p>
                    <p className="text-sm text-light-subtext dark:text-dark-subtext">{item.email}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id);
                  }}
                  className="cursor-pointer  top-4 right-4 text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash size={20} />
                </motion.button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full font-amiri text-lg text-light-subtext dark:text-dark-subtext">
              لا توجد بيانات
            </p>
          )}
        </div>

        {/* Details Modal */}
        {isDetailsModalOpen && selectedRegistrant && (
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-md  flex items-center justify-center z-50 p-4"
          >
            <motion.div
              className="relative w-full max-w-lg p-8 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-light-border/30 dark:border-dark-border/30"
            >
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="cursor-pointer  top-4 right-4 text-light-subtext dark:text-dark-subtext hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                <X size={24} />
              </button>
              <h3 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-6 font-amiri bg-clip-text  bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold">
                تفاصيل التسجيل: {selectedRegistrant.name}
              </h3>
              <div className="space-y-3 font-amiri text-light-text dark:text-dark-text">
                <p className="flex justify-between"><span className="font-medium">تاريخ الميلاد:</span> {new Date(selectedRegistrant.birthdate).toLocaleDateString()}</p>
                <p className="flex justify-between"><span className="font-medium">الولاية:</span> {selectedRegistrant.state}</p>
                <p className="flex justify-between"><span className="font-medium">المدرسة:</span> {selectedRegistrant.school}</p>
                <p className="flex justify-between"><span className="font-medium">الهاتف:</span> {selectedRegistrant.phone}</p>
                <p className="flex justify-between"><span className="font-medium">البريد:</span> {selectedRegistrant.email}</p>
                <p className="flex justify-between"><span className="font-medium">تليغرام:</span> {selectedRegistrant.telegram || 'غير متوفر'}</p>
                <p className="flex justify-between"><span className="font-medium">الحفظ:</span> {selectedRegistrant.memorization}</p>
                <p className="flex justify-between"><span className="font-medium">الرواية:</span> {selectedRegistrant.narration || 'غير متوفر'}</p>
                <p className="flex justify-between"><span className="font-medium">التجويد:</span> {selectedRegistrant.tajweed || 'غير متوفر'}</p>
                <p className="flex justify-between"><span className="font-medium">الوقت:</span> {selectedRegistrant.sessionTime}</p>
                <p className="flex justify-between"><span className="font-medium">ملاحظات:</span> {selectedRegistrant.notes || 'غير متوفر'}</p>
                <p className="flex justify-between"><span className="font-medium">الالتزام:</span> {selectedRegistrant.commitment ? 'نعم' : 'لا'}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Email Sending Modal */}
        {isModalOpen && (
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              className="relative w-full max-w-lg p-8 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-light-border/30 dark:border-dark-border/30"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer  top-4 right-4 text-light-subtext dark:text-dark-subtext hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                <X size={24} />
              </button>
              <h3 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-6 font-amiri bg-clip-text  bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold">
                إرسال بريد إلكتروني
              </h3>
              <form onSubmit={handleSendEmail} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder=" "
                    className="cursor-pointer peer w-full px-4 py-3 rounded-lg bg-white/70 dark:bg-dark-surface/70 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text font-amiri transition-all duration-300"
                  />
                  <label className="absolute right-4 top-3 text-sm font-medium text-light-subtext dark:text-dark-subtext peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white/90 dark:peer-focus:bg-dark-surface/90 peer-focus:px-1 transition-all duration-200 font-amiri">
                    موضوع الرسالة
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder=" "
                    rows="5"
                    className="peer w-full px-4 py-3 rounded-lg bg-white/70 dark:bg-dark-surface/70 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text font-amiri transition-all duration-300"
                  ></textarea>
                  <label className="absolute right-4 top-3 text-sm font-medium text-light-subtext dark:text-dark-subtext peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white/90 dark:peer-focus:bg-dark-surface/90 peer-focus:px-1 transition-all duration-200 font-amiri">
                    نص الرسالة
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isHtml}
                    onChange={() => setIsHtml(!isHtml)}
                    className="cursor-pointer w-5 h-5 accent-light-primary dark:accent-dark-primary rounded"
                  />
                  <label className="font-amiri text-light-text dark:text-dark-text">إرسال كرسالة HTML</label>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className={`cursor-pointer w-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-amiri ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      جارٍ الإرسال...
                    </span>
                  ) : (
                    'إرسال'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}