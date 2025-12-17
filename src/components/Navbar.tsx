import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code2, Menu, X, Sparkles, Home, BadgeInfo, Package, FolderOpenDot , MessageCircleHeart 
} from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/about', label: 'من نحن', icon: BadgeInfo },
    { path: '/services', label: 'الخدمات', icon: Sparkles },
    { path: '/projects', label: 'المشاريع', icon: FolderOpenDot  },
    { path: '/contact', label: 'تواصل معنا ', icon: MessageCircleHeart },
  ];

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { x: '100%' }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#0a0e17]/95 to-slate-900/95 backdrop-blur-xl border-b border-emerald-500/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.15}}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <span className="bracket text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-sm">{"<"}</span>
                <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-2xl font-bold"> يسِّرها</span>
                <span className="bracket text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-sm">{">"}</span>
              </motion.div>
            </Link>

                        {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group text-lg"
                >
                  <motion.span
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    className={`${
                      location.pathname === item.path
                        ? 'text-emerald-400 font-bold'
                        : 'text-gray-300 hover:text-white'
                    } transition-all duration-300`}
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    {item.label}
                  </motion.span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* MOBILE MENU BUTTON */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden  relative p-2 text-white rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Menu size={24} />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity"
              />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "exit"}
        className="fixed  top-0 right-0 h-full w-80 bg-gradient-to-b from-[#0a0e17]/95 to-slate-900/95 backdrop-blur-xl border-l border-emerald-500/30 z-50"
      >
        {/* HEADER */}
        <div className="p-8 border-b border-emerald-500/20">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-3"
            >
              <span className="bracket  text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-sm">{"<"}</span>
                <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-2xl font-bold"> يسِّرها</span>
                <span className="bracket  text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-sm">{">"}</span>
             
            </motion.div> 
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsOpen(false)}
              className="p-2 text-white rounded-xl bg-white/10"
            >
              <X size={24} />
            </motion.button>
          </div>
        </div>

        {/* NAV ITEMS */}
        <div className="p-6 space-y-2 flex-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 text-emerald-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon 
                  size={24} 
                  className={`transition-transform group-hover:scale-110 ${
                    location.pathname === item.path ? 'text-emerald-400' : 'text-gray-400'
                  }`} 
                />
                <span className="text-lg font-medium">{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeMobileNav"
                    className="ml-auto w-2 h-2 bg-emerald-400 rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}