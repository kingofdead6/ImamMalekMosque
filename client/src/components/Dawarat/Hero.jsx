import React from "react";
import { motion } from "framer-motion";

export default function DawratHero() {
  // Smooth scroll handler
  const scrollToDetails = () => {
    const section = document.getElementById("details");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="dawrat-hero"
      className="h-screen relative bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756042557/20250824_1434_Serene_Quranic_Glow_simple_compose_01k3e4gtv3fyc96dc88pp9newk_axbowt.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-extrabold leading-tight mb-8"
        >
          دورة لحفظ القرآن الكريم
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-3xl max-w-3xl mx-auto mb-8"
        >
          انضم إلينا عبر تطبيق Telegram لحفظ القرآن الكريم بإشراف مشايخ مؤهلين
          ومتابعة مستمرة لجميع المستويات.
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          onClick={scrollToDetails}
          className="cursor-pointer mt-4 px-10 py-4 rounded-2xl bg-light-primary  dark:bg-dark-surface text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          اعرف المزيد من التفاصيل
        </motion.button>
      </div>
    </section>
  );
}
