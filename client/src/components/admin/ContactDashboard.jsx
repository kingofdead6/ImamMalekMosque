import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Trash, X } from 'lucide-react';
import { API_BASE_URL } from '../../../api.js';

export default function ContactDashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/api/contact`, {
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

  // Handle delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.filter((item) => item._id !== id));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل حذف الرسالة');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-light-primary dark:text-dark-primary mb-6 font-amiri">
        رسائل التواصل
      </h2>
      {error && (
        <p className="text-red-500 dark:text-red-400 mb-4 font-amiri">{error}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((item, index) => (
            <motion.div
              key={item._id}
              className="p-4 rounded-lg bg-light-surface dark:bg-dark-surface shadow-xl neon-glow-card font-amiri relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="font-medium">الاسم: {item.name}</p>
              <p>البريد: {item.email}</p>
              <p>الرسالة: {item.message}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(item._id)}
                className="cursor-pointer top-2 right-2 text-red-500 hover:text-red-600"
              >
                <Trash size={24} />
              </motion.button>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full font-amiri">لا توجد بيانات</p>
        )}
      </div>
    </motion.div>
  );
}