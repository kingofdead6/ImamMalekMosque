import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Hero() {
  const { isDark } = useContext(ThemeContext);

  const bgImage = isDark
    ? "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756039111/WhatsApp_Image_2025-08-24_at_13.32.52_10309aec_ajrkyy.jpg')" // Dark mode image
    : "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756040011/20250824_1351_White_Building_Exterior_remix_01k3e202xjfwjtqkwp57k76z12_2_otg7wu.png')"; // Light mode image

  // Framer Motion variants for animations
  const containerVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 1, ease: "easeOut" } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 1, ease: "easeOut" } },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.9, duration: 1, ease: "easeOut" } },
    hover: { scale: 1.1, boxShadow: "0 0 15px rgba(52, 211, 153, 0.8)" },
    tap: { scale: 0.95 },
  };

  // Smooth scroll function
  const scrollToMawaqit = () => {
    const section = document.getElementById("mawaqit");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: bgImage }}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-[#ffffff00]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 text-dark-text"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-8 relative inline-block"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          مرحبًا بكم في مسجد الإمام مالك
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto text-dark-subtext"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          بيت الله حيث السكينة والطمأنينة
        </motion.p>
        <motion.button
          onClick={scrollToMawaqit}
          className="cursor-pointer px-8 py-4 rounded-lg text-lg font-semibold bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white neon-glow-button"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          عرض مواقيت الصلاة
        </motion.button>
      </motion.div>
    </div>
  );
}
