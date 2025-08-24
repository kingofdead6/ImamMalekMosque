import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-md p-10 rounded-3xl shadow-2xl border border-light-border dark:border-dark-border bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg neon-glow-card"
      >
        <motion.div
          initial={{ rotate: -20, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <BookOpen className="w-20 h-20 text-light-primary dark:text-dark-primary" />
        </motion.div>

        <h1 className="text-6xl font-bold text-light-primary dark:text-dark-primary mb-4 font-amiri">
          404
        </h1>
        <p className="text-lg text-light-subtext dark:text-dark-subtext mb-8 font-amiri">
          عذرًا! الصفحة التي تبحث عنها غير موجودة.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="cursor-pointer px-6 py-3 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-amiri"
        >
          العودة إلى الصفحة الرئيسية
        </motion.button>
      </motion.div>
    </div>
  );
}
