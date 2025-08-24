import React from "react";
import { motion } from "framer-motion";
import { Smartphone, BookOpen, GraduationCap } from "lucide-react";

export default function DawratContent() {
  // Framer Motion variants for animations
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.03, boxShadow: "0 0 20px rgba(52, 211, 153, 0.6)" },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } },
  };

  return (
    <section
      id="details"
      className="py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          className="mb-12"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block font-amiri">
            تفاصيل الدورة
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
          </h2>
      
        </motion.div>
        <motion.p
          className="text-lg max-w-3xl mx-auto mb-16 text-light-subtext dark:text-dark-subtext font-amiri"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          يسر مسجد الإمام مالك بالإقامة الجامعية بوراوي عمار الإعلان عن انطلاق دورة لحفظ القرآن الكريم عن بعد عبر تطبيق Telegram، بإشراف مشايخ مؤهلين، وتمتد إلى غاية 1 سبتمبر. الدورة مخصصة لجميع الأعمار والمستويات، مع توفير بيئة تعليمية مناسبة ومتابعة مستمرة.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="relative bg-light-surface dark:bg-dark-surface rounded-2xl p-8 shadow-xl neon-glow-card"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Smartphone className="w-12 h-12 mx-auto text-light-gold dark:text-dark-gold mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-light-primary dark:text-dark-primary font-amiri">
              تعليم عن بعد
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext font-amiri">
              دروس تفاعلية عبر تطبيق Telegram
            </p>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
          </motion.div>

          <motion.div
            className="relative bg-light-surface dark:bg-dark-surface rounded-2xl p-8 shadow-xl neon-glow-card"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <GraduationCap className="w-12 h-12 mx-auto text-light-gold dark:text-dark-gold mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-light-primary dark:text-dark-primary font-amiri">
              مشايخ مؤهلين
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext font-amiri">
              إشراف مباشر من مشايخ متخصصين
            </p>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
          </motion.div>

          <motion.div
            className="relative bg-light-surface dark:bg-dark-surface rounded-2xl p-8 shadow-xl neon-glow-card"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <BookOpen className="w-12 h-12 mx-auto text-light-gold dark:text-dark-gold mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-light-primary dark:text-dark-primary font-amiri">
              منهج متكامل
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext font-amiri">
              برنامج تعليمي شامل ومتابعة مستمرة
            </p>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}