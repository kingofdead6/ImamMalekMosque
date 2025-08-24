import { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import axios from 'axios';
import { API_BASE_URL } from '../../../api.js';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setFormData({ name: "", email: "", message: "" });
      setSuccess(response.data.message || 'تم إرسال الرسالة بنجاح');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل إرسال الرسالة');
    }
  };

  // Framer Motion variants
  const inputVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    focus: { scale: 1.02, boxShadow: "0 0 12px rgba(52, 211, 153, 0.7)" },
  };

  const buttonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } },
    hover: { scale: 1.1, boxShadow: "0 0 15px rgba(52, 211, 153, 0.8)" },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4, ease: "easeOut" } },
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756041510/Islamic_Frame_Transparent_q54b3e.png')",
        backgroundSize: "1400px",
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-xl mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block mb-12 font-amiri"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          اتصل بنا
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
        </motion.h2>

        <div className="relative bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md rounded-2xl shadow-xl neon-glow-card p-8">
          {success && (
            <motion.p
              className="text-green-500 dark:text-green-400 mb-4 font-amiri"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {success}
            </motion.p>
          )}
          {error && (
            <motion.p
              className="text-red-500 dark:text-red-400 mb-4 font-amiri"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}
          <div className="space-y-6 text-right">
            {/* Name */}
            <motion.div variants={inputVariants} initial="initial" animate="animate" whileFocus="focus">
              <input
                type="text"
                name="name"
                placeholder="الاسم"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-300 neon-glow-input font-amiri"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={inputVariants} initial="initial" animate="animate" whileFocus="focus">
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-300 neon-glow-input font-amiri"
              />
            </motion.div>

            {/* Message */}
            <motion.div variants={inputVariants} initial="initial" animate="animate" whileFocus="focus">
              <textarea
                name="message"
                placeholder="رسالتك"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-300 neon-glow-input font-amiri"
              ></textarea>
            </motion.div>

            {/* Submit + Socials */}
            <div className="flex justify-between items-center gap-4">
              <motion.button
                type="button"
                onClick={handleSubmit}
                className="cursor-pointer px-8 py-3 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white rounded-lg font-semibold neon-glow-button font-amiri"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                إرسال
              </motion.button>

              {/* Social Icons */}
              <div className="flex justify-center items-center gap-6">
                <motion.a
                  href="https://www.facebook.com/share/16rNYKAoxq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-gold dark:text-dark-gold hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaFacebookF className="w-8 h-8" />
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/bouraouimasjid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-gold dark:text-dark-gold hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaInstagram className="w-8 h-8" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}