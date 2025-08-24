import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../../../api.js';

export default function LibraryRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    school: '',
    schoolYear: '',
    roomNumber: '',
    wilaya: '',
    phone: '',
    email: '',
    prayerPromise: false,
    pfp: null, // profile picture
  });

  const [preview, setPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview(file ? URL.createObjectURL(file) : null); // preview image
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/api/library`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsSubmitted(true);
      setFormData({
        name: '',
        birthdate: '',
        school: '',
        schoolYear: '',
        roomNumber: '',
        wilaya: '',
        phone: '',
        email: '',
        prayerPromise: false,
        pfp: null,
      });
      setPreview(null);
      setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'فشل التسجيل، حاول مرة أخرى');
    } finally {
      setIsLoading(false);
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

  const inputVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    focus: { boxShadow: '0 0 12px rgba(52, 211, 153, 0.5)' },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.05, boxShadow: '0 0 15px rgba(52, 211, 153, 0.8)' },
    tap: { scale: 0.95 },
  };

  const successVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      id="library-registration"
      className="relative min-h-screen py-26 bg-cover bg-center text-light-text dark:text-dark-text"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756057411/20250824_1840_Library_Meeting_Room_remix_01k3ejhz1ee8kt847nvtzgz34v_vsbdoh.png')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        className="relative max-w-2xl mx-auto px-6"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          className="text-5xl font-extrabold text-light-primary dark:text-dark-primary mb-6 text-center font-amiri"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          📚 تسجيل في المكتبة
        </motion.h2>

        <motion.div
          className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl p-8 neon-glow-card"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {isSubmitted && (
            <motion.div
              className="text-center text-light-accent dark:text-dark-accent mb-6 font-amiri"
              variants={successVariants}
              initial="initial"
              animate="animate"
            >
              ✅ تم تسجيلك بنجاح!
            </motion.div>
          )}
          {error && (
            <motion.div
              className="text-center text-red-500 dark:text-red-400 mb-6 font-amiri"
              variants={successVariants}
              initial="initial"
              animate="animate"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                صورة الملف الشخصي *
              </label>
              <motion.input
                type="file"
                name="pfp"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-subtext dark:text-dark-subtext border-light-border dark:border-dark-border font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
              />
              {preview && (
                <div className="mt-3 flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-light-primary dark:border-dark-primary"
                  />
                </div>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                الاسم الكامل *
              </label>
              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك الكامل"
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border neon-glow-input font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                البريد الإلكتروني *
              </label>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border neon-glow-input font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                رقم الهاتف *
              </label>
              <motion.input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="أدخل رقم هاتفك"
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border neon-glow-input font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                تاريخ الميلاد *
              </label>
              <motion.input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border neon-glow-input font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </div>

            {/* School */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                المدرسة *
              </label>
              <motion.input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="أدخل اسم مدرستك"
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border neon-glow-input font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </div>

            {/* School Year */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                السنة الدراسية *
              </label>
              <motion.input
                type="text"
                name="schoolYear"
                value={formData.schoolYear}
                onChange={handleChange}
                placeholder="أدخل سنتك الدراسية"
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border neon-glow-input font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </div>

            {/* Wilaya */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                الولاية *
              </label>
              <motion.input
                type="text"
                name="wilaya"
                value={formData.wilaya}
                onChange={handleChange}
                placeholder="أدخل ولايتك"
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border neon-glow-input font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </div>

            {/* Room Number */}
            <div>
              <label className="block text-light-text dark:text-dark-text font-medium mb-1 font-amiri">
                رقم الغرفة *
              </label>
              <motion.input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="أدخل رقم الغرفة"
                className="w-full p-3 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border-light-border dark:border-dark-border neon-glow-input font-amiri"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
            </div>

            {/* Prayer Promise */}
            <div className="flex items-start gap-2">
              <motion.input
                type="checkbox"
                id="prayer-promise"
                name="prayerPromise"
                checked={formData.prayerPromise}
                onChange={handleChange}
                className="mt-1 accent-light-accent dark:accent-dark-accent"
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
              />
              <label
                htmlFor="prayer-promise"
                className="text-light-subtext dark:text-dark-subtext font-amiri"
              >
                أعد بأن أصلي جميع الصلوات في وقتها
              </label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`cursor-pointer w-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white py-3 rounded-lg font-semibold neon-glow-button font-amiri ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover={isLoading ? {} : 'hover'}
              whileTap={isLoading ? {} : 'tap'}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  جارٍ التسجيل...
                </span>
              ) : (
                'تسجيل'
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}