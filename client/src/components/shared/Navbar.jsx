import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Framer Motion variants
  const navVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.1, color: isDark ? "#f59e0b" : "#f59e0b" },
  };

  const mobileMenuVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-20 bg-gradient-to-r from-light-primary/80 to-light-accent/80 dark:from-dark-primary/80 dark:to-dark-accent/80 backdrop-blur-md text-dark-text px-6 py-4"
      variants={navVariants}
      initial="initial"
      animate="animate"
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <a href="/">
            <h1 className="text-2xl font-bold font-amiri neon-glow-text">مسجد الإمام مالك</h1>
          </a>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 text-lg font-amiri">
          {[
            { name: "الرئيسية", href: "/" },
            { name: "المكتبة", href: "/library" },
            { name: "القرآن", href: "/quran" },
            { name: "الدورات", href: "/dawarat" },
          ].map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="hover:text-light-gold dark:hover:text-dark-gold transition"
              variants={linkVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Theme Toggle and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full bg-light-accent/20 dark:bg-dark-accent/20 hover:bg-light-accent/30 dark:hover:bg-dark-accent/30 transition neon-glow-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-dark-gold" />
            ) : (
              <Moon className="w-6 h-6 text-light-gold" />
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-light-gold dark:text-dark-gold" />
            ) : (
              <Menu className="w-6 h-6 text-light-gold dark:text-dark-gold" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-light-surface dark:bg-dark-surface mt-4 rounded-lg shadow-xl neon-glow-card font-amiri"
          variants={mobileMenuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex flex-col items-center gap-4 py-4">
            {[
              { name: "الرئيسية", href: "/" },
              { name: "المكتبة", href: "/library" },
              { name: "القرآن", href: "/quran" },
              { name: "الدورات", href: "/dawarat" },
            ].map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-lg text-light-text dark:text-dark-text hover:text-light-gold dark:hover:text-dark-gold transition"
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                onClick={toggleMenu}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}