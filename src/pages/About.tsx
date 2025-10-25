import { motion, useAnimation, useInView } from 'framer-motion';
import {
  Users,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Award,
  Target,
  Zap,
  Shield,
  Sparkles,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Building,
  Rocket,
  Trophy,
  Users as UsersIcon,
  Globe,
  Eye,
  Flag,
  Medal,
  CheckCircle, // Added CheckCircle icon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import StarField from '../components/StarField';

export default function About() {
  // Animation variants for the new section
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // References and animation controls for the new section
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const contentControls = useAnimation();
  const imageControls = useAnimation();

  // UseInView to trigger animations when in view
  const contentInView = useInView(contentRef, { once: true });
  const imageInView = useInView(imageRef, { once: true });

  useEffect(() => {
    if (contentInView) contentControls.start('visible');
    if (imageInView) imageControls.start('visible');
  }, [contentInView, imageInView, contentControls, imageControls]);
  // Achievements data
  const achievements = [
    'خبرة تزيد عن 10 سنوات في التصميم الإبداعي',
    'إتمام 100+ مشروع بنجاح عالمي',
    'حائزون على جوائز دولية للابتكار',
    'فريق متخصص يحول الأحلام إلى واقع',
  ];


  // Existing variants and data (unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const typingVariants = {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };

  const teamMembers = [
    {
      name: 'أبوبكر حسن',
      role: 'المؤسس',
      specialty: 'مطور ويب كامل',
      years: 8,
      social: Github,
      color: '#10b981',
    },
    {
      name: 'محمد أحمد',
      role: 'مطور تطبيقات',
      specialty: 'تطبيقات الموبايل',
      years: 6,
      social: Twitter,
      color: '#06b6d4',
    },
    {
      name: 'محمد عبدالرحيم',
      role: 'مطور واجهات أمامية',
      specialty: 'تجربة المستخدم',
      years: 7,
      social: Linkedin,
      color: '#f59e0b',
    },
    {
      name: 'محمد محمود',
      role: 'مطور واجهات خلفية',
      specialty: 'قواعد البيانات',
      years: 7,
      social: Linkedin,
      color: '#14b8a6',
    },
    {
      name: 'أحمد أمين',
      role: 'مصمم UI/UX',
      specialty: 'تجربة المستخدم',
      years: 5,
      social: Building,
      color: '#8b5cf6',
    },
  ];

  const journey = [
    { year: '2018', event: 'التأسيس', desc: '3 أعضاء بحلم كبير', color: '#10b981', icon: Rocket },
    { year: '2020', event: '100 مشروع', desc: 'نمو سريع', color: '#06b6d4', icon: UsersIcon },
    { year: '2022', event: 'جوائز عالمية', desc: 'التميز الدولي', color: '#f59e0b', icon: Trophy },
    { year: '2024', event: '500+ عميل', desc: 'توسع إقليمي', color: '#8b5cf6', icon: Globe },
  ];

  const values = [
    { icon: Target, title: 'التميز', desc: 'أفضل جودة', color: '#10b981' },
    { icon: Zap, title: 'السرعة', desc: 'حلول فورية', color: '#06b6d4' },
    { icon: Shield, title: 'الأمان', desc: 'حماية كاملة', color: '#ef4444' },
    { icon: Users, title: 'الشراكة', desc: 'نجاح مشترك', color: '#f59e0b' },
  ];

  const balls = [
    { icon: Zap, title: 'التحول الرقمي', description: 'رحلة كاملة لنجاحك', color: '#06b6d4' },
  ];

  useEffect(() => {
    document.title = 'يسِّرها - من نحن';
  }, []);

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
              'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.3), transparent 50%)',
            ],
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
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8 shadow-2xl"
            >
              <Sparkles className="w-5 h-5" />
              <motion.div
                animate={{ textShadow: ['0 0 10px #10b981', '0 0 20px #10b981'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
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
                color: ['#ffffff', '#10b981', '#06b6d4'],
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
            نحن نُعيد تعريف <span className="text-emerald-400 font-bold">الإبداع الرقمي</span>، لنصنع{' '}
            <span className="text-cyan-400">مستقبلك</span> بـ{' '}
            <span className="text-purple-400">إبداع</span> لا حدود له
          </motion.p>
        </motion.div>

 {/* ======= MAIN CONTENT SECTION ======= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-24"
        >
          <motion.div
            ref={contentRef}
            variants={contentVariants}
            initial="hidden"
            animate={contentControls}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full px-6 py-3 mb-6">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                من نحن
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              نسج قصصكم بـ
              <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent py-2">
                التصميم والإبداع
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              في يسِّرها، نحن فريق شغوف يحول الأفكار إلى واقع مبهر. نصمم مساحات
              تجمع بين الأناقة والابتكار، لنروي قصة كل مساحة بأسلوب فريد.
            </p>
            <p className="text-base text-gray-400 mb-6 leading-relaxed">
              باستخدام أحدث التقنيات ولمسة إبداعية، نحن هنا لنصنع تجارب بصرية
              تعكس رؤيتكم، سواء لمنزل أحلامكم، مكتب عملي، أو مشروع تجاري يلفت
              الأنظار.
            </p>
            <div className="space-y-3 mb-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{achievement}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-4">
              <a href="#team">
                <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-105 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg">
                  اكتشف فريقنا
                </button>
              </a>
              <a href="#journey">
                <button className="bg-white/10 backdrop-blur-sm text-gray-300 px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg">
                  رحلتنا
                </button>
              </a>
            </div>
          </motion.div>
          <motion.div
            ref={imageRef}
            variants={imageVariants}
            initial="hidden"
            animate={imageControls}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/about.png"
                alt="فريق العمل"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
            <div
              className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl blur-2xl opacity-50 animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
          </motion.div>
        </motion.section>
{/* ======= JOURNEY TIMELINE ======= */}
<motion.section
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="mb-24 relative"
  id="journey"
>
  <motion.div variants={itemVariants} className="text-center mb-12">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
      رحلتنا{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
        الساحرة
      </span>
    </h2>
    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
      انضم إلينا في رحلة الإبداع والابتكار عبر السنين
    </p>
  </motion.div>

  {/* Balls Section */}
  <div className="relative max-w-6xl mx-auto hidden md:block">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      className="relative"
    >
      {balls.map((ball, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          style={{
            transform: `rotate(${index * 30}deg) translateY(-220px) rotate(${-index * 30}deg)`,
          }}
          className="absolute top-1/2 left-1/2 w-80 h-80"
        >
          <motion.div
            whileHover={{ scale: 1.15, y: -15 }}
            className="w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center text-center p-6 shadow-2xl"
            style={{ backgroundColor: `${ball.color}20` }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-white to-transparent rounded-full flex items-center justify-center mb-4 shadow-lg"
              style={{ backgroundColor: ball.color }}
            >
              <ball.icon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{ball.title}</h3>
            <p className="text-xs text-gray-300">{ball.description}</p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  </div>

  {/* Timeline Section */}
  <div className="relative max-w-4xl mx-auto">
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full rounded-full"
      style={{ background: 'linear-gradient(to bottom, #10b981, #06b6d4, #8b5cf6)' }}
      animate={{
        boxShadow: [
          '0 0 10px rgba(16, 185, 129, 0.5)',
          '0 0 20px rgba(6, 182, 212, 0.7)',
          '0 0 10px rgba(139, 92, 246, 0.5)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />

    {journey.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex items-center flex-col mb-12 md:mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} `}
              >
        <div className="w-full md:w-1/2 px-4 md:px-8 mb-6 md:mb-0">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 25px ${step.color}80`,
              borderColor: `${step.color}80`,
            }}
            className="relative p-6 md:p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${step.color}20, transparent)` }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20"
              style={{ background: `radial-gradient(circle at center, ${step.color}, transparent)` }}
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{step.year}</h3>
            <p className="text-lg md:text-xl font-semibold text-gray-200 mb-2">{step.event}</p>
            <p className="text-sm text-gray-300">{step.desc}</p>
          </motion.div>
        </div>

        <motion.div
          className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center z-10 mx-4 md:mx-6 relative"
          style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}80)` }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.2, boxShadow: `0 0 30px ${step.color}cc` }}
        >
          <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 20px ${step.color}80` }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="hidden md:block w-1/2" />
      </motion.div>
    ))}
  </div>
</motion.section>
        {/* ======= TEAM GALAXY ======= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
          id='team'
        >
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
                  y: -20,
                }}
                className="group relative"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border-2 border-white/20 mb-6 overflow-hidden">
                  <motion.div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: member.color + '40' }}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
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
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              قيمنا{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                الأساسية
              </span>
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
                  rotateY: 5,
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
              جاهز للسحر{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                الرقمي
              </span>
              ؟
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-12">
              انضم إلى رحلتنا واصنع معنا مستقبلًا مذهلاً
            </motion.p>
            <Link to="/contact">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-bold text-xl shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ابدأ الرحلة
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto"
          >
            {[
              { icon: MapPin, text: 'سوهاج, مصر', color: '#10b981' },
              { icon: Phone, text: '+201093954137', color: '#06b6d4' },
              { icon: Mail, text: 'yasuruha1@gmail.com', color: '#f59e0b' },
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
                  <item.icon className="w-6 h-6 text-white mx-auto mt-3" />
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