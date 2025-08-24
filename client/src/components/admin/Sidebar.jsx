import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { name: 'مواضيع الجمعة', id: 'jumua', path: '/dashboard/jumua' },
    { name: 'أفضل التلاوات', id: 'tilawa', path: '/dashboard/tilawa' },
    { name: 'رسائل التواصل', id: 'contact', path: '/dashboard/contact' },
    { name: 'النشرة الإخبارية', id: 'newsletter', path: '/dashboard/newsletter' },
    { name: 'تسجيلات الدورة', id: 'dawra', path: '/dashboard/dawra' },
    { name: 'تسجيلات المكتبة', id: 'library', path: '/dashboard/library' },
    { name: 'أوقات فتح المكتبة', id: 'library-times', path: '/dashboard/library-times' },
    { name: 'الكتب', id: 'books', path: '/dashboard/books' },
    ...(role === 'superadmin' ? [{ name: 'إدارة المستخدمين', id: 'users', path: '/dashboard/users' }] : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedPassword');
    navigate('/login');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Sidebar animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    closed: { x: '-100%', transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <>
      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-light-text dark:text-dark-text p-2 rounded-lg bg-light-surface dark:bg-dark-surface"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.aside
            className="fixed md:sticky top-0 left-0 h-screen w-64 bg-light-surface dark:bg-dark-surface p-6 shadow-xl neon-glow-card flex flex-col justify-between overflow-y-auto z-40 scrollbar-thin scrollbar-thumb-light-accent dark:scrollbar-thumb-dark-accent scrollbar-track-light-background dark:scrollbar-track-dark-background"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div>
              <div className="flex justify-center mb-8">
                <img
                  src="https://res.cloudinary.com/dtwa3lxdk/image/upload/v1756062090/470950075_1140787384288973_5922062471597926328_n_pxylcf.png"
                  alt="إمام مالك لوغو"
                  className="h-30"
                />
              </div>
              <ul className="space-y-4 font-amiri text-lg">
                {sections.map((section) => (
                  <motion.li
                    key={section.id}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <NavLink
                      to={section.path}
                      className={({ isActive }) =>
                        `block text-light-text dark:text-dark-text hover:text-light-gold dark:hover:text-dark-gold ${isActive ? 'text-light-gold dark:text-dark-gold font-bold' : ''}`
                      }
                      onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
                    >
                      {section.name}
                    </NavLink>
                  </motion.li>
                ))}
                {role === 'superadmin' && (
                  <motion.li
                    className="cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <NavLink
                      to="/dashboard/add-admin"
                      className={({ isActive }) =>
                        `block text-light-text dark:text-dark-text hover:text-light-gold dark:hover:text-dark-gold ${isActive ? 'text-light-gold dark:text-dark-gold font-bold' : ''}`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      إضافة أدمن
                    </NavLink>
                  </motion.li>
                )}
              </ul>
            </div>
            <motion.button
              className="cursor-pointer flex items-center justify-center gap-2 text-light-subtext dark:text-dark-subtext hover:text-red-500 font-amiri"
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}