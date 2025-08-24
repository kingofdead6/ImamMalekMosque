import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import axios from 'axios';
import { API_BASE_URL } from '../../../api.js';

export default function DawratRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    state: "",
    school: "",
    phone: "",
    email: "",
    telegram: "",
    memorization: "",
    narration: "",
    tajweed: "",
    sessionTime: "",
    notes: "",
    commitment: false,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/dawra`, formData);
      setFormData({
        name: "", birthdate: "", state: "", school: "", phone: "", email: "",
        telegram: "", memorization: "", narration: "", tajweed: "", sessionTime: "", notes: "", commitment: false
      });
      setSuccess(response.data.message || 'تم التسجيل في الدورة بنجاح');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل التسجيل في الدورة');
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const inputVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    focus: { boxShadow: "0 0 12px rgba(52, 211, 153, 0.5)" },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0 0 15px rgba(52, 211, 153, 0.8)" },
    tap: { scale: 0.95 },
  };

  return (
    <section
      className="relative min-h-screen py-26 bg-cover bg-center text-light-text dark:text-dark-text"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756042557/20250824_1434_Serene_Quranic_Glow_simple_compose_01k3e4gtv3fyc96dc88pp9newk_axbowt.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <motion.div
        className="relative max-w-4xl mx-auto px-6"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-5xl font-extrabold text-center text-light-primary dark:text-dark-primary mb-6 font-amiri"
          variants={titleVariants}
        >
          🕌 تسجيل في الدورة
        </motion.h1>

        <motion.div
          className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg p-8 neon-glow-card"
          variants={containerVariants}
        >
          {success && (
            <motion.div
              className="text-center text-green-500 dark:text-green-400 mb-6 font-amiri"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ✅ {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              className="text-center text-red-500 dark:text-red-400 mb-6 font-amiri"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ❌ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div>
              <h2 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-4 font-amiri flex items-center gap-2">
                🧑‍🎓 البيانات الشخصية
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-amiri">الاسم الكامل (بالعربية) *</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك"
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-amiri">تاريخ الميلاد *</label>
                  <motion.input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-amiri">الولاية *</label>
                  <motion.input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="أدخل ولايتك"
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-amiri">المدرسة والمستوى الدراسي *</label>
                  <motion.input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="أدخل مدرستك ومستواك"
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-4 font-amiri flex items-center gap-2">
                📞 معلومات التواصل
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-amiri">رقم الهاتف *</label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="أدخل رقم هاتفك"
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-amiri">البريد الإلكتروني *</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-amiri">معرف Telegram</label>
                  <motion.input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
              </div>
            </div>

            {/* Quran Memorization */}
            <div>
              <h2 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-4 font-amiri flex items-center gap-2">
                📖 معلومات الحفظ وأحكام التجويد
              </h2>
              <label className="block mb-1 font-amiri">مقدار الحفظ *</label>
              <motion.textarea
                name="memorization"
                value={formData.memorization}
                onChange={handleChange}
                placeholder="حدد الأجزاء التي تحفظها"
                className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                rows="3"
                required
                variants={inputVariants}
                whileFocus="focus"
              />
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block mb-1 font-amiri">الرواية</label>
                  <motion.input
                    type="text"
                    name="narration"
                    value={formData.narration}
                    onChange={handleChange}
                    placeholder="رواية حفص مثلا"
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-amiri">مستوى التجويد</label>
                  <motion.input
                    type="text"
                    name="tajweed"
                    value={formData.tajweed}
                    onChange={handleChange}
                    placeholder="مبتدئ / متوسط / متقدم"
                    className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block mb-1 font-amiri">الوقت المناسب *</label>
                <motion.input
                  type="time"
                  name="sessionTime"
                  value={formData.sessionTime}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-1 font-amiri">ملاحظات إضافية</label>
              <motion.textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="اكتب أي ملاحظات أو طلبات (اختياري)"
                className="border p-3 rounded-lg w-full bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-amiri"
                rows="4"
                variants={inputVariants}
                whileFocus="focus"
              />
            </div>

            {/* Commitment */}
            <div className="flex items-start gap-2">
              <motion.input
                type="checkbox"
                name="commitment"
                checked={formData.commitment}
                onChange={handleChange}
                className="mt-1 accent-light-accent dark:accent-dark-accent"
                required
                variants={inputVariants}
              />
              <p className="text-sm font-amiri">
                أتعهد بالالتزام بالحضور والجدية في متابعة الحصص، وبالأمانة في استظهار المحفوظ.
              </p>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white py-3 rounded-lg font-semibold font-amiri"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              ✅ تسجيل الآن
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}