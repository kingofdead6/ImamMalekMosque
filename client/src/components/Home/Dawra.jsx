import { motion } from "framer-motion";

export default function Dawra() {
  const handleRegister = (title) => {
    // Replace with your form/modal or navigation
    alert(`التسجيل في: ${title}`);
  };

  const courses = [
    { title: "دورة في التجويد", time: "كل جمعة بعد صلاة المغرب" },
    { title: "دورة في الفقه", time: "كل سبت بعد صلاة العشاء" },
    { title: "دورة في السيرة النبوية", time: "كل أحد بعد صلاة العصر" },
  ];

  // Framer Motion variants for animations
  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.03, boxShadow: "0 0 20px rgba(52, 211, 153, 0.6)" },
  };

  const titleVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } },
  };

  const buttonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } },
    hover: { scale: 1.1, boxShadow: "0 0 15px rgba(52, 211, 153, 0.8)" },
    tap: { scale: 0.95 },
  };

  return (
    <section
      id="dawarat"
      className="py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block mb-8"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          الدورات العلمية
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
        </motion.h2>
        <motion.p
          className="text-lg mb-12 max-w-3xl mx-auto text-light-subtext dark:text-dark-subtext"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          تعرف على الدورات التعليمية المتاحة في المسجد وقم بالتسجيل.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <motion.div
              key={c.title}
              className="relative p-6 rounded-2xl bg-light-surface dark:bg-dark-surface shadow-xl neon-glow-card text-start"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-6 h-6 text-light-gold dark:text-dark-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-6.22-8.66M12 3v3m0 12v3m9-9h-3m-12 0H3"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  />
                </svg>
                <h3 className="font-bold text-xl text-light-primary dark:text-dark-primary">
                  {c.title}
                </h3>
              </div>
              <p className="mb-4 text-light-subtext dark:text-dark-subtext">{c.time}</p>
              <motion.button
                onClick={() => handleRegister(c.title)}
                className="px-6 py-3 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white rounded-lg font-semibold neon-glow-button"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                التسجيل
              </motion.button>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}