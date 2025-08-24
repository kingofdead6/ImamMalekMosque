import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Users, Search } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../../api';

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId') || '');

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'خطأ في جلب المستخدمين');
      }
    };
    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/auth/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== userId));
        setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
        setSuccess('تم حذف المستخدم بنجاح');
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'فشل حذف المستخدم');
      }
    }
  };

  // Framer Motion variants
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
    hover: { scale: 1.02, boxShadow: '0 0 15px rgba(52, 211, 153, 0.6)' },
  };

  return (
    <motion.section
      className="relative min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div className="mb-12" variants={titleVariants} initial="initial" animate="animate">
          <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block font-amiri">
            إدارة المستخدمين
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

        <motion.div
          className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg p-6 neon-glow-card mb-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center gap-2 mb-6">
            <Search className="w-6 h-6 text-light-gold dark:text-dark-gold" />
            <input
              type="text"
              placeholder="ابحث عن مستخدم بالبريد الإلكتروني..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent font-amiri"
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg p-6 neon-glow-card"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-8 h-8 text-light-gold dark:text-dark-gold" />
            <h3 className="text-2xl font-bold text-light-primary dark:text-dark-primary font-amiri">
              قائمة المستخدمين
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right font-amiri">
              <thead>
                <tr className="text-light-subtext dark:text-dark-subtext border-b border-light-border dark:border-dark-border">
                  <th className="p-3">البريد الإلكتروني</th>
                  <th className="p-3">الدور</th>
                  <th className="p-3">تاريخ الإنشاء</th>
                  <th className="p-3">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-light-border/30 dark:border-dark-border/30 hover:bg-light-bg/50 dark:hover:bg-dark-bg/50"
                  >
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role === 'superadmin' ? 'سوبر أدمن' : 'أدمن'}</td>
                    <td className="p-3">{new Date(user.createdAt).toLocaleDateString('en-US')}</td>
                    <td className="p-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-full ${
                          user._id === currentUserId || user.role === 'superadmin'
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'cursor-pointer text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300'
                        }`}
                        onClick={() => user._id !== currentUserId && user.role !== 'superadmin' && handleDelete(user._id)}
                        disabled={user._id === currentUserId || user.role === 'superadmin'}
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}