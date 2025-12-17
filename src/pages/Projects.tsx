import { motion } from 'framer-motion';
import {
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  ShoppingCart,
  Heart,
  Building2,
  Sparkles,
  ChevronRight,
  Users,
  TrendingUp,
  Award,
  X,
  Brain,
  PenTool,
  Code as CodeIcon,
  CheckCircle,
  Rocket,
  Filter,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import StarField from '../components/StarField';
import useDocumentTitle from '../hooks/useDocumentTitle';

const iconMap = {
  ShoppingCart,
  Heart,
  Building2,
  Code,
  Smartphone,
  Globe,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

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

  const toastVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  // بيانات خطوات بناء المشاريع
  const projectSteps = [
    {
      step: 'التخطيط',
      desc: 'تحليل الاحتياجات ووضع الخطة الاستراتيجية',
      color: '#10b981',
      icon: Brain,
    },
    {
      step: 'التصميم',
      desc: 'تصميم واجهات مستخدم جذابة وتجربة مستخدم مثالية',
      color: '#06b6d4',
      icon: PenTool,
    },
    {
      step: 'التطوير',
      desc: 'بناء الحلول التقنية باستخدام أحدث التقنيات',
      color: '#f59e0b',
      icon: CodeIcon,
    },
    {
      step: 'الاختبار',
      desc: 'اختبارات شاملة لضمان الأداء والجودة',
      color: '#14b8a6',
      icon: CheckCircle,
    },
    {
      step: 'الإطلاق',
      desc: 'إطلاق المشروع مع دعم مستمر',
      color: '#8b5cf6',
      icon: Rocket,
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'منشور'); // Only fetch published projects
      if (error) {
        console.error('Error fetching projects:', error);
        console.log('خطأ في جلب المشاريع: ' + error.message, 'error');
      } else {
        console.log('Fetched projects:', data); // Debug log
        setProjects(data);
        if (data.length === 0) {
          console.log('لا توجد مشاريع منشورة متاحة', 'info');
        }
      }
      setLoading(false);
    };
   
    fetchProjects();
  }, []);
 useDocumentTitle('يسِّرها - المشاريع');
  // const showNotification = (message, type) => {
  //   setNotification({ message, type });
  //   setTimeout(() => setNotification(null), 5000);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-slate-900 to-[#1e293b] pt-32 pb-24 relative overflow-hidden">
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
        {/* Header */}
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
                أعمالنا المميزة
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
              مشاريع ناجحة
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            بعض <span className="text-emerald-400 font-bold">مشاريعنا الناجحة</span>، نصنع{' '}
            <span className="text-cyan-400">نجاحك</span> بـ{' '}
            <span className="text-purple-400">إبداع</span> لا حدود له
          </motion.p>
        </motion.div>

        {/* Project Building Steps Timeline */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24 relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              خطوات بناء{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                مشاريعنا
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              عملية منظمة لتحويل أفكارك إلى واقع رقمي مذهل
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* الخط العمودي الرابط مع توهج */}
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

            {projectSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex items-center flex-col mb-12 md:mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} `}
              >
                {/* النصف الأيسر/الأيمن */}
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
                    {/* تأثير خلفية متوهجة */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20"
                      style={{ background: `radial-gradient(circle at center, ${step.color}, transparent)` }}
                      animate={{ opacity: [0, 0.2, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <h3 className="text-2xl font-bold text-white mb-3">{step.step}</h3>
                    <p className="text-sm text-gray-300">{step.desc}</p>
                  </motion.div>
                </div>

                {/* النقطة الزمنية */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center z-10 mx-6 relative"
                  style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}80)` }}
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.2, boxShadow: `0 0 30px ${step.color}cc` }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                  {/* هالة متوهجة حول النقطة */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: `0 0 20px ${step.color}80` }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* النصف الآخر فارغ */}
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.section>

       

        {/* Projects Carousel */}
        
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                عالم{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  مشاريعنا
                </span>
              </h2>
            </motion.div>
             {/* Loading State */}
        {loading && (
          <motion.div
            variants={itemVariants}
            className="text-center flex flex-col items-center gap-2 text-white text-xl my-16"
          >
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            جاري التحميل...
          </motion.div>
        )}
{!loading && projects.length > 0 && (
            <div className="relative max-w-6xl mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                {projects.map((project, index) => {
                  const IconComponent = iconMap[project.icon_name] || Code;
                  return (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      style={{
                        transform: `rotate(${index * (360 / projects.length)}deg) translateY(-250px) rotate(-${
                          index * (360 / projects.length)
                        }deg)`,
                      }}
                      className="absolute top-1/2 left-1/2 w-96 h-96"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, y: -15 }}
                        className="w-56 h-56 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center text-center p-6 shadow-2xl"
                        style={{ backgroundColor: `${project.color}20` }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-16 h-16 bg-gradient-to-br from-white to-transparent rounded-xl flex items-center justify-center mb-4 shadow-lg"
                          style={{ backgroundColor: project.color }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-xs text-gray-300">{project.category}</p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            )}
          </motion.section>
        

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                const IconComponent = iconMap[project.icon_name] || Code;
                return (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 10,
                      y: -20,
                    }}
                    className="group relative"
                  >
                    <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border-2 border-white/20 overflow-hidden">
                      <motion.div
                        className="w-full h-full rounded-2xl relative"
                        style={{ backgroundColor: `${project.color}20` }}
                      >
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-1/2 object-cover"
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.5 }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
                        <motion.div
                          initial={{ x: -50 }}
                          animate={{ x: 0 }}
                          className="absolute top-4 left-4"
                        >
                          <span className={`px-3 py-1 bg-gradient-to-br ${project.gradient} backdrop-blur-sm text-white rounded-full text-xs font-bold`}>
                            {project.category}
                          </span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${project.gradient}  rounded-full flex items-center justify-center `}
                        >
                          <IconComponent className="w-6 h-6 text-white " />
                        </motion.div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.tags.slice(0, 3).map((tag, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="px-2 py-1 bg-slate-800/50 text-white text-xs rounded"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} className="mt-4 flex justify-center">
                      <Link to={`/projects/${project.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-full font-bold text-sm shadow-lg flex items-center gap-2`}
                        >
                          عرض المشروع
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div variants={itemVariants} className="text-center text-white text-xl my-16">
            <Filter className="mx-auto text-gray-400 mb-4" size={56} />
            لا توجد مشاريع منشورة متاحة
          </motion.div>
        )}

        {/* Call to Action */}
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
              انضم إلى رحلتنا واصنع معنا <span className="text-emerald-400">قصة نجاح</span> مذهلة
            </motion.p>
            <Link to="/contact">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-bold text-xl shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ابدأ مشروعك الآن
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
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, text: '500+ عميل', color: '#10b981' },
              { icon: TrendingUp, text: '95% نجاح', color: '#06b6d4' },
              { icon: Award, text: 'جوائز دولية', color: '#f59e0b' },
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
                <p className="text-white font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Toast Notification */}
        {notification && (
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-4 right-4 p-4 rounded-xl text-white flex items-center gap-2 shadow-lg ${
              notification.type === 'success'
                ? 'bg-green-500/80'
                : notification.type === 'error'
                ? 'bg-red-500/80'
                : 'bg-blue-500/80'
            }`}
          >
            <X size={20} />
            {notification.message}
          </motion.div>
        )}
      </div>
    </div>
  );
}