import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api.js";
import { Eye, EyeOff } from "lucide-react"; // 👈 icons for show/hide

export default function AddAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/admin`,
        { email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("تم إضافة الأدمن بنجاح");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "فشل إضافة الأدمن");
      } else {
        setError("خطأ في الخادم. حاول لاحقًا.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background px-4">
      <motion.div
        ref={formRef}
        className="relative z-10 w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-light-border dark:border-dark-border bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg neon-glow-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-light-primary dark:text-dark-primary mb-6 font-amiri">
          إضافة أدمن جديد
        </h2>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 rounded-lg text-sm text-center font-amiri"
          >
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 rounded-lg text-sm text-center font-amiri"
          >
            {error}
          </motion.div>
        )}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-6"
          onSubmit={handleAddAdmin}
        >
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text peer placeholder-transparent font-amiri"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm font-amiri"
            >
              البريد الإلكتروني
            </label>
          </div>

          {/* Password Field with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle type
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full px-4 py-3 pr-12 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text peer placeholder-transparent font-amiri"
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm font-amiri"
            >
              كلمة المرور
            </label>

            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-light-subtext dark:text-dark-subtext hover:text-light-primary dark:hover:text-dark-primary"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer w-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-amiri ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "جارٍ الإضافة..." : "إضافة أدمن"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
