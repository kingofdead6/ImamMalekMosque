import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Play, Pause } from "lucide-react";
import { API_BASE_URL } from "../../../api.js";

export default function Tilawa() {
  const [tilawas, setTilawas] = useState([]);
  const [error, setError] = useState("");
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/tilawa`);
        const mainTilawas = response.data
          .filter((tilawa) => tilawa.showOnMainPage)
          .sort((a, b) => a.rank - b.rank);
        setTilawas(mainTilawas);
        setError("");
      } catch (err) {
        setError("خطأ في جلب التلاوات");
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0 0 25px rgba(245, 208, 66, 0.6)" },
  };

  return (
    <section
      id="tilawa-section"
      className="py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300 relative overflow-hidden"
    >
      {/* Floating Qur’an Icon */}
      <motion.div
        className="absolute left-0 md:left-40 top-1/2 -translate-y-1/2 w-24 h-24"
        animate={{ y: [0, -12, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <img
          src="https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756114340/quran_pljsay.png"
          alt="Quran Icon"
          className="w-full h-full object-contain drop-shadow-xl"
        />
        <div className="absolute inset-0 rounded-full blur-2xl bg-yellow-300 opacity-40 animate-pulse"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {tilawas.map((tilawa, index) => (
              <TilawaCard
                key={tilawa._id}
                tilawa={tilawa}
                isPlaying={currentPlaying === tilawa._id}
                onPlay={() => setCurrentPlaying(tilawa._id)}
                onPause={() => setCurrentPlaying(null)}
                index={index}
                variants={cardVariants}
              />
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

function TilawaCard({ tilawa, isPlaying, onPlay, onPause, index, variants }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration || 0);
  };

  const handleTimeUpdate = () => {
    if (!isSeeking) {
      const ct = audioRef.current.currentTime;
      setCurrentTime(ct);
      setProgress((ct / audioRef.current.duration) * 100);
    }
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    const newTime = (newProgress / 100) * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime; 
  };

  const handleSeekStart = () => setIsSeeking(true);
  const handleSeekEnd = () => setIsSeeking(false);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <motion.div
      className="relative p-6 rounded-2xl bg-light-surface dark:bg-dark-surface shadow-xl neon-glow-card overflow-hidden flex flex-col gap-4"
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ delay: index * 0.05 }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-light-primary dark:text-dark-primary font-amiri relative z-10">
        {tilawa.title}
        <span className="text-base text-light-subtext dark:text-dark-subtext ml-2">
          (ترتيب: {tilawa.rank})
        </span>
      </h3>

      {/* Audio Player */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          {/* Play/Pause Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold text-white shadow-lg"
            onClick={isPlaying ? onPause : onPlay}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </motion.button>

          {/* Progress Bar */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="relative w-full h-2">
              {/* Background track */}
              <div className="absolute top-0 left-0 w-full h-2 rounded-lg bg-light-border dark:bg-dark-border" />
              {/* Filled progress */}
              <div
                className="absolute top-0 left-0 h-2 rounded-lg bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold"
                style={{ width: `${progress}%` }}
              />
              {/* Range input on top */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                step="0.1"
                dir="ltr"
                className="absolute top-0 left-0 w-full h-2 bg-transparent cursor-pointer
                  appearance-none
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r 
                  [&::-webkit-slider-thumb]:from-light-accent [&::-webkit-slider-thumb]:to-light-gold
                  dark:[&::-webkit-slider-thumb]:from-dark-accent dark:[&::-webkit-slider-thumb]:to-dark-gold"
                onChange={handleSeek}
                onMouseDown={handleSeekStart}
                onMouseUp={handleSeekEnd}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between text-xs font-amiri text-light-subtext dark:text-dark-subtext">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={tilawa.audioUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={onPause}
        />
      </div>
    </motion.div>
  );
}

