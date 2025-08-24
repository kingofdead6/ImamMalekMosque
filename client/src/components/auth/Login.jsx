import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Eye, EyeOff } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loginRef = useRef(null);
  const navigate = useNavigate();

  // Load saved credentials from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }

    // GSAP animation for form
    gsap.fromTo(
      loginRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Handle "Remember Me" functionality
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message || "فشل تسجيل الدخول. حاول مرة أخرى."
        );
      } else {
        setError("خطأ في الخادم. حاول لاحقًا.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-light-background dark:bg-dark-background px-4 bg-[url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756042557/20250824_1434_Serene_Quranic_Glow_simple_compose_01k3e4gtv3fyc96dc88pp9newk_axbowt.png')] bg-cover bg-center">
      <motion.div
        ref={loginRef}
        className="relative z-10 w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-light-border dark:border-dark-border bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg neon-glow-card"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-amiri">
            <Typewriter
              words={["مرحبًا بك", "تسجيل الدخول", "إمام مالك"]}
              loop={5}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </h2>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 rounded-lg text-sm text-center font-amiri"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text peer placeholder-transparent font-amiri"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm font-amiri"
            >
              البريد الإلكتروني
            </label>
          </div>

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full px-4 py-3 pr-12 rounded-lg bg-white/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary text-light-text dark:text-dark-text peer placeholder-transparent font-amiri"
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-2.5 text-sm font-medium text-light-subtext dark:text-dark-subtext bg-white/70 dark:bg-dark-surface/70 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm font-amiri"
            >
              كلمة المرور
            </label>

            {/* Eye icon toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-light-subtext dark:text-dark-subtext hover:text-light-primary dark:hover:text-dark-primary"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

        

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer w-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-amiri ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
