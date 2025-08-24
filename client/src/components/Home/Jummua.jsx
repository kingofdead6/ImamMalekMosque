import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../api.js';

export default function Jummua() {
  const [mainSubject, setMainSubject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMainSubject = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jumua`);
        const main = response.data.find((subject) => subject.showOnMainPage);
        setMainSubject(main || null);
        setError('');
      } catch (err) {
        setError('خطأ في جلب موضوع الجمعة');
      }
    };
    fetchMainSubject();
  }, []);

  return (
    <section
      id="jummua"
      className="relative py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756041351/Islamic_Frame_Transparent_l4cznf.png')",
        backgroundSize: "1000px",
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block mb-12 font-amiri">
          موضوع خطبة الجمعة
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
        </h2>

        <div className="relative max-w-3xl mx-auto bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md rounded-2xl shadow-xl neon-glow-card p-8">
          {error ? (
            <p className="text-red-500 dark:text-red-400 font-amiri">{error}</p>
          ) : mainSubject ? (
            <p className="text-lg font-medium text-light-text dark:text-dark-text font-amiri">
              {mainSubject.title}
            </p>
          ) : (
            <p className="text-lg font-medium text-light-subtext dark:text-dark-subtext font-amiri">
              سيتم نشر موضوع خطبة الجمعة القادمة هنا بإذن الله.
            </p>
          )}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}