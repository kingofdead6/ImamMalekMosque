import { motion } from "framer-motion";

export default function LibraryHero() {
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

  return (
    <section
      id="library-hero"
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center text-light-text dark:text-dark-text"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756057411/20250824_1840_Library_Meeting_Room_remix_01k3ejhz1ee8kt847nvtzgz34v_vsbdoh.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
           <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl px-6"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
   
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-dark-text relative inline-block mb-8 font-amiri"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          مكتبة المسجد
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl max-w-2xl mx-auto text-dark-subtext font-amiri"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          مكان مخصص لطلاب العلم والباحثين، يوفر بيئة هادئة ومجموعة من الكتب القيمة في العلوم الشرعية واللغة العربية.
        </motion.p>
      </motion.div>
    </section>
  );
}