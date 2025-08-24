import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../../../api.js';

export default function Tilawa() {
  const [tilawas, setTilawas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/tilawa`);
        const mainTilawas = response.data
          .filter((tilawa) => tilawa.showOnMainPage)
          .sort((a, b) => a.rank - b.rank); // Sort by rank
        setTilawas(mainTilawas);
        setError('');
      } catch (err) {
        setError('خطأ في جلب التلاوات');
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    hover: { scale: 1.05, boxShadow: '0 0 20px rgba(52, 211, 153, 0.6)' },
  };

  return (
    <section
      id="tilawa-section"
      className="py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block font-amiri">
            التلاوات المميزة
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
          </h2>
        </motion.div>

        {error ? (
          <motion.div
            className="text-center text-red-500 dark:text-red-400 font-semibold font-amiri"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {error}
          </motion.div>
        ) : tilawas.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {tilawas.map((tilawa, index) => (
              <motion.div
                key={tilawa._id}
                className="relative p-4 rounded-lg bg-light-surface dark:bg-dark-surface shadow-xl neon-glow-card"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="text-xl font-bold text-light-primary dark:text-dark-primary font-amiri">
                  {tilawa.title} (الترتيب: {tilawa.rank})
                </h3>
                <audio
                  controls
                  className="w-full rounded-lg bg-gradient-to-r from-light-accent/20 to-light-gold/20 dark:from-dark-accent/20 dark:to-dark-gold/20 neon-glow-audio mt-2"
                >
                  <source src={tilawa.audioUrl} type="audio/mpeg" />
                  متصفحك لا يدعم مشغل الصوت.
                </audio>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center text-lg text-light-subtext dark:text-dark-subtext font-amiri"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            سيتم عرض التلاوات المميزة هنا بإذن الله.
          </motion.div>
        )}
      </div>
    </section>
  );
}