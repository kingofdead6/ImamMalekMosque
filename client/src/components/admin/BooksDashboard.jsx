import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { X, CheckCircle, Circle, Upload } from 'lucide-react';
import { API_BASE_URL } from '../../../api.js';

export default function BooksDashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch Books
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/api/books`, {
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
    formData.append('description', description);
    imageFiles.forEach((file) => formData.append('images', file));

    try {
      const response = await axios.post(`${API_BASE_URL}/api/books`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setData([response.data, ...data]);
      setTitle('');
      setDescription('');
      setImageFiles([]);
      fileInputRef.current.value = null;
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'فشل إضافة الكتاب');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.filter((item) => item._id !== id));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل حذف الكتاب');
    }
  };

  // Handle toggle show on main page
  const handleToggleMainPage = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/books/${id}/toggle-main`,
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

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 15) {
      setError('يمكنك رفع ما يصل إلى 15 صورة فقط');
      return;
    }
    setImageFiles([...imageFiles, ...files]);
  };

  // Remove selected image
  const removeImage = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <h2 className="text-4xl font-bold text-light-primary dark:text-dark-primary mb-6 font-amiri">
        الكتب
      </h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer mb-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-amiri"
      >
        إضافة كتاب جديد
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
              <p className="text-lg font-medium">العنوان: {item.title}</p>
              <p>الوصف: {item.description || 'غير متوفر'}</p>
              {item.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.images.map((img, i) => (
                    <img key={i} src={img} alt={`Book ${i}`} className="w-16 h-16 object-cover rounded" />
                  ))}
                </div>
              )}
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

      {/* Modal for adding new book */}
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
              إضافة كتاب جديد
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان الكتاب"
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text peer placeholder-transparent font-amiri"
                />
                <label
                  htmlFor="title"
                  className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm font-amiri"
                >
                  عنوان الكتاب
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف الكتاب"
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text peer placeholder-transparent font-amiri h-24"
                />
                <label
                  htmlFor="description"
                  className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm font-amiri"
                >
                  وصف الكتاب
                </label>
              </div>
              <div className="relative">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text font-amiri"
                />
                <label
                  htmlFor="images"
                  className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 font-amiri"
                >
                  صور الكتاب (حتى 15 صورة)
                </label>
              </div>
              {imageFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="cursor-pointer absolute -top-2 -right-2 text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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