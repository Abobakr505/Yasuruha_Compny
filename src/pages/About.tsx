import { motion } from 'framer-motion';
import { 
  Users, Star, Calendar, MapPin, Phone, Mail, Award, 
  Target, Zap, Shield, Sparkles, ChevronRight, 
  Github, Twitter, Linkedin, Building
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StarField from '../components/StarField';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const teamMembers = [
    {
      name: 'أحمد الشريف',
      role: 'المؤسس',
      specialty: 'تطوير الويب',
      years: 8,
      social: Github,
      color: '#10b981'
    },
    {
      name: 'فاطمة السعدي',
      role: 'مديرة التطوير',
      specialty: 'تطبيقات الموبايل',
      years: 6,
      social: Twitter,
      color: '#06b6d4'
    },
    {
      name: 'محمد العتيبي',
      role: 'خبير السحابة',
      specialty: 'حلول AWS',
      years: 7,
      social: Linkedin,
      color: '#f59e0b'
    },
    {
      name: 'نورة الدوسري',
      role: 'مصممة UI/UX',
      specialty: 'تجربة المستخدم',
      years: 5,
      social: Building,
      color: '#8b5cf6'
    }
  ];

  const journey = [
    { year: '2018', event: 'التأسيس', desc: '3 أعضاء بحلم كبير', color: '#10b981' },
    { year: '2020', event: '100 مشروع', desc: 'نمو سريع', color: '#06b6d4' },
    { year: '2022', event: 'جوائز عالمية', desc: 'التميز الدولي', color: '#f59e0b' },
    { year: '2024', event: '500+ عميل', desc: 'توسع إقليمي', color: '#8b5cf6' }
  ];

  const values = [
    { icon: Target, title: 'التميز', desc: 'أفضل جودة', color: '#10b981' },
    { icon: Zap, title: 'السرعة', desc: 'حلول فورية', color: '#06b6d4' },
    { icon: Shield, title: 'الأمان', desc: 'حماية كاملة', color: '#ef4444' },
    { icon: Users, title: 'الشراكة', desc: 'نجاح مشترك', color: '#f59e0b' }
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
                قصتنا الملهمة
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
              من نحن
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            نحن نُعيد تعريف <span className="text-emerald-400 font-bold">الإبداع الرقمي </span>، لنصنع{' '}
            <span className="text-cyan-400">مستقبلك</span> بـ <span className="text-purple-400">إبداع</span> لا حدود له
          </motion.p>
        </motion.div>

        {/* ======= JOURNEY ORB ======= */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              رحلتنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">الساحرة</span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              {journey.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    transform: `rotate(${index * 90}deg) translateY(-200px) rotate(${-index * 90}deg)`
                  }}
                  className="absolute top-1/2 left-1/2 w-72 h-72"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center text-center p-6 shadow-2xl"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 bg-gradient-to-br from-white to-transparent rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: step.color }}
                    >
                      <Star className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-1">{step.year}</h3>
                    <p className="text-xs text-gray-300">{step.event}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ======= TEAM GALAXY ======= */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">فريقنا</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
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
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border-2 border-white/20 mb-6 overflow-hidden">
                  <motion.div 
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: member.color + '40' }}
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: member.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  >
                    <Users className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{member.name}</h3>
                <p className="text-gray-400 text-center text-sm mb-1">{member.role}</p>
                <p className="text-xs text-gray-500 text-center">{member.specialty}</p>
                <motion.p 
                  className="text-center mt-2 text-sm font-medium"
                  style={{ color: member.color }}
                >
                  {member.years} سنوات
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ======= VALUES CRYSTALS ======= */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              قيمنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">الأساسية</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotateX: 5,
                  rotateY: 5
                }}
                className="relative group"
              >
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 w-full h-full rounded-2xl transform rotate-12"
                    style={{ backgroundColor: value.color + '30' }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity }}
                  />
                  <motion.div 
                    className="relative w-full h-full rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${value.color}, ${value.color}80)` }}
                    whileHover={{ boxShadow: `0 0 30px ${value.color}80` }}
                  >
                    <value.icon className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">{value.title}</h3>
                <p className="text-gray-400 text-center text-sm">{value.desc}</p>
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
              جاهز للسحر <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">الرقمي</span>؟
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-12"
            >
              انضم إلى رحلتنا واصنع معنا مستقبلًا مذهلاً
            </motion.p>
            <Link to="/contact">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500  text-white rounded-full font-bold text-xl shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ابدأ الرحلة
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Contact Orbit */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto"
          >
            {[
              { icon: MapPin, text: 'الرياض، السعودية', color: '#10b981' },
              { icon: Phone, text: '+966 50 123 4567', color: '#06b6d4' },
              { icon: Mail, text: 'info@graphic-school.com', color: '#f59e0b' }
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