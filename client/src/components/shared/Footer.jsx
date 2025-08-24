import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Facebook } from "lucide-react";
import axios from 'axios';
import { API_BASE_URL } from '../../../api.js';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/newsletter`, { email });
      setEmail('');
      setSuccess(response.data.message || 'تم الاشتراك في النشرة الإخبارية');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل الاشتراك في النشرة');
    }
  };

  // Framer Motion variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const inputVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    focus: { boxShadow: "0 0 15px rgba(52, 211, 153, 0.6)" },
  };

  return (
    <footer
      id="footer"
      className="relative pt-16 pb-6 bg-cover bg-center bg-dark-background text-dark-text"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756059114/20250824_1910_Decorative_Fence_Pattern_remix_01k3em846wecbsyb0ey0q6qw6d_mamxp6.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <motion.div
        className="relative max-w-8xl mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Newsletter */}
          <motion.div
            className="text-center md:text-right"
            variants={containerVariants}
          >
            <h3 className="text-2xl font-bold mb-4 font-amiri">
              اشترك في النشرة الإخبارية
            </h3>
            <p className="mb-4 text-sm sm:text-base font-amiri text-dark-subtext">
              ابقَ على اطلاع بآخر الأخبار والفعاليات المتعلقة بالمسجد والدورات.
            </p>
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
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 w-full">
              <motion.input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto sm:max-w-sm px-4 py-2 rounded-lg bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border font-amiri neon-glow-input"
                variants={inputVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              />
              <motion.button
                type="submit"
                className="z-1000 cursor-pointer w-full sm:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold text-white font-semibold font-amiri neon-glow-button"
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                اشترك
              </motion.button>
            </form>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="text-center"
            variants={containerVariants}
          >
            <h3 className="text-2xl font-bold mb-4 font-amiri">روابط سريعة</h3>
            <ul className="space-y-2 text-md text-dark-subtext">
              {[
                { name: "القرآن الكريم", href: "/quran" },
                { name: "دورة الحفظ", href: "/dawarat" },
                { name: "المكتبة", href: "/library" },
                { name: "الكتب", href: "/books" },
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="hover:text-light-accent dark:hover:text-dark-accent font-amiri"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            className="text-center md:text-right"
            variants={containerVariants}
          >
            <h3 className="text-2xl font-bold mb-4 font-amiri">تواصلوا معنا</h3>
            <ul className="space-y-2 font-amiri text-dark-subtext">
              <motion.li
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <MapPin className="inline-block w-5 h-5 ml-2 text-light-gold dark:text-dark-gold" />
                مسجد الإمام مالك، الإقامة الجامعية بوراوي عمار
              </motion.li>
              <motion.li
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <Mail className="inline-block w-5 h-5 ml-2 text-light-gold dark:text-dark-gold" />
                mosqueebouraoui@gmail.com
              </motion.li>
            </ul>
            <div className="flex justify-center md:justify-start gap-5 mt-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/bouraouimasjid/" },
                { icon: Facebook, href: "https://www.facebook.com/share/16rNYKAoxq/" },
              ].map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-gold dark:text-dark-gold hover:text-light-accent dark:hover:text-dark-accent"
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756062090/470950075_1140787384288973_5922062471597926328_n_pxylcf.png"
              alt="مسجد الإمام مالك"
              className="h-26 w-auto sm:h-36"
            />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-light-border dark:border-dark-border text-center text-md font-amiri text-dark-subtext hover:text-dark-accent"
          variants={itemVariants}
          initial="initial"
          animate="animate"
        >
          <p>
            &copy; {new Date().getFullYear()} مسجد الإمام مالك. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}