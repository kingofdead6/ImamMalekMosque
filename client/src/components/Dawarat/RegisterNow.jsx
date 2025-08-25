import { motion } from "framer-motion";

export default function RegisterNow() {
  // Framer Motion variants for animations
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.1, boxShadow: "0 0 15px rgba(52, 211, 153, 0.8)" },
    tap: { scale: 0.95 },
  };

  return (
    <section
      id="register"
      className="relative py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
    >
      
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
      
        <motion.h2
          className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block mb-8 font-amiri"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          سجّل الآن
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
        </motion.h2>
        <motion.p
          className="text-lg text-light-subtext dark:text-dark-subtext mb-10 max-w-2xl mx-auto font-amiri"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          انضم إلى الدورة الآن واحجز مكانك لتبدأ رحلتك المباركة في حفظ القرآن الكريم مع نخبة من المشايخ المؤهلين.
        </motion.p>
        <motion.a
          href="/registration" 
          className="inline-block px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white neon-glow-button font-amiri"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          سجّل الآن 
        </motion.a>
      </motion.div>
    </section>
  );
}