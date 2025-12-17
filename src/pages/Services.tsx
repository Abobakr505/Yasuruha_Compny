import { motion } from 'framer-motion';
import {
  Code, Smartphone, Globe, Database, Cloud, Lock, Palette,
  Rocket, Settings, TrendingUp, Cpu, ShoppingCart, Sparkles,
  ChevronRight,
  Clock,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StarField from '../components/StarField';
import { useEffect } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Services() {
useDocumentTitle("يسِّرها - خدمات  ");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const services = [
    {
      icon: Code,
      title: 'تطوير الويب',
      description: 'تطبيقات React متقدمة',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'تطبيقات الموبايل',
      description: 'iOS & Android احترافية',
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'قواعد البيانات',
      description: 'تصميم آمن وقوي',
      color: '#10b981',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Cloud,
      title: 'الحلول السحابية',
      description: 'AWS & Azure متطورة',
      color: '#f97316',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Lock,
      title: 'الأمن السيبراني',
      description: 'حماية شاملة',
      color: '#ef4444',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      icon: Palette,
      title: 'تصميم UI/UX',
      description: 'تجربة مستخدم مذهلة',
      color: '#ec4899',
      gradient: 'from-pink-500 to-violet-500'
    },
    {
      icon: ShoppingCart,
      title: 'المتاجر الإلكترونية',
      description: 'بيع أونلاين متكامل',
      color: '#22c55e',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'التسويق الرقمي',
      description: 'SEO & Social Media',
      color: '#eab308',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Cpu,
      title: 'الذكاء الاصطناعي',
      description: 'Chatbots & ML',
      color: '#6366f1',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Settings,
      title: 'الصيانة والدعم',
      description: '24/7 متاح دائماً',
      color: '#6b7280',
      gradient: 'from-gray-500 to-slate-500'
    },
    {
      icon: Rocket,
      title: 'استشارات تقنية',
      description: 'خطط تنفيذ مثالية',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Globe,
      title: 'التحول الرقمي',
      description: 'رحلة كاملة لنجاحك',
      color: '#14b8a6',
      gradient: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-slate-900 to-[#1e293b] pt-32 pb-24 relative overflow-hidden">
      {/* Animated Background */}
      <StarField />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 80%, rgba(16,185,129,0.3), transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(6,182,212,0.3), transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.3), transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ======= HERO MAGIC ======= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-24"
        >
          <motion.div variants={itemVariants}>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8 shadow-2xl"
            >
              <Sparkles className="w-5 h-5" />
              <motion.div animate={{ textShadow: ['0 0 10px #10b981', '0 0 20px #10b981'] }} transition={{ duration: 2, repeat: Infinity }}>
                خدماتنا الساحرة
              </motion.div>
            </motion.span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
          >
            <motion.span 
              animate={{ 
                backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'],
                color: ['#ffffff', '#10b981', '#06b6d4']
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="GraphicSchool bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              الحلول التقنية
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            نحن <span className="text-emerald-400 font-bold"> صُنّاع الدهشة </span>، نزرع الإبداع {' '}
            <span className="text-cyan-400">في قلب كل</span>  <span className="text-purple-400">حل رقمي</span> نقدمه
          </motion.p>
        </motion.div>

        {/* ======= SERVICES ORBIT ======= */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              عالم <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">خدماتنا</span>
            </h2>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    transform: `rotate(${index * 30}deg) translateY(-220px) rotate(${-index * 30}deg)`
                  }}
                  className="absolute top-1/2 left-1/2 w-80 h-80"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, y: -15 }}
                    className="w-48 h-48 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center text-center p-6 shadow-2xl"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 bg-gradient-to-br from-white to-transparent rounded-xl flex items-center justify-center mb-4 shadow-lg"
                      style={{ backgroundColor: service.color }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-xs text-gray-300">{service.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ======= SERVICES GALAXY GRID ======= */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 9).map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  y: -20
                }}
                className="group relative"
              >
                <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border-2 border-white/20 overflow-hidden">
                  <motion.div 
                    className="w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                    style={{ backgroundColor: `${service.color}20` }}
                    transition={{ duration: 20 + index * 2, repeat: Infinity }}
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-xl"
                      style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}80)` }}
                      whileHover={{ boxShadow: `0 0 30px ${service.color}80`, scale: 1.1 }}
                    >
                      <service.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-300 text-sm">{service.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ======= COSMIC CTA ======= */}
        <motion.section 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              لم تجد <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">الحل</span> المثالي؟
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-12"
            >
              سنصنع لك حلاً <span className="text-emerald-400">مخصصاً</span> يفوق توقعاتك
            </motion.p>
            <Link to="/contact">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-bold text-xl shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  تحدث مع خبرائنا
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Services Orbit */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { icon: Rocket, text: 'حلول مخصصة', color: '#10b981' },
              { icon: Clock, text: 'تسليم سريع', color: '#06b6d4' },
              { icon: Award, text: 'جودة مضمونة', color: '#f59e0b' }
            ].map((item, index) => (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center"
              >
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10 + index * 2, repeat: Infinity }}
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex justify-center"
                  style={{ backgroundColor: item.color + '40' }}
                >
                  <item.icon className={`w-6 h-6 text-white mx-auto mt-3`} />
                </motion.div>
                <p className="text-white font-medium">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}