import { motion } from "framer-motion";
import { Library, BookOpen, UserPlus } from "lucide-react";

export default function LibraryActions() {
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
    hover: { scale: 1.05, boxShadow: "0 0 20px rgba(52, 211, 153, 0.6)" },
    tap: { scale: 0.95 },
  };

  return (
    <section
      id="library-actions"
      className="relative py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          className="mb-12"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block font-amiri">
            خدمات المكتبة
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-center gap-8"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="relative flex-1 bg-light-surface dark:bg-dark-surface rounded-2xl p-8 shadow-xl neon-glow-card"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <UserPlus className="w-12 h-12 mx-auto text-light-gold dark:text-dark-gold mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-light-primary dark:text-dark-primary font-amiri">
              التسجيل في المكتبة
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext font-amiri mb-4">
              سجل الآن لتصبح عضوًا في مكتبة المسجد واستفد من خدماتها المتنوعة والبيئة الهادئة.
            </p>
            <a
              href="/libraryregistration"
              className="inline-block px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold text-white neon-glow-button font-amiri"
            >
              التسجيل
            </a>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
          </motion.div>

          <motion.div
            className="relative flex-1 bg-light-surface dark:bg-dark-surface rounded-2xl p-8 shadow-xl neon-glow-card"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <BookOpen className="w-12 h-12 mx-auto text-light-gold dark:text-dark-gold mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-light-primary dark:text-dark-primary font-amiri">
              تصفح الكتب
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext font-amiri mb-4">
              اكتشف مجموعتنا الواسعة من الكتب في العلوم الشرعية، اللغة العربية، وغيرها.
            </p>
            <a
              href="/books"
              className="inline-block px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white neon-glow-button font-amiri"
            >
              تصفح الآن
            </a>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}