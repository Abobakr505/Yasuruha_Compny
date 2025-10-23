import { motion } from 'framer-motion';
import { ArrowLeft, Code, Smartphone, Globe, ShoppingCart, Heart, Building2, Sparkles, ChevronRight, Eye, Download, Calendar, Clock, Users, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import StarField from '../components/StarField';

const iconMap = {
  ShoppingCart,
  Heart,
  Building2,
  Code,
  Smartphone,
  Globe,
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
  useEffect(() => {
    if (project && project.title) {
      document.title = `يسِّرها - ${project.title}`;
    } else {
      document.title = 'يسِّرها';
    }
  }, [project]);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
        if (error) {
          throw new Error('فشل جلب تفاصيل المشروع');
        }
        if (!data) {
          throw new Error('المشروع غير موجود');
        }
        setProject(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching project:', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.from('reviews').select('*').eq('project_id', id);
        if (error) {
          throw new Error('فشل جلب الآراء');
        }
        setReviews(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching reviews:', err);
      }
    };

    fetchProject();
    fetchReviews();
  }, [id]);

  if (error) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-slate-900 to-[#1e293b] flex items-center justify-center"
      >
        <motion.div
          variants={itemVariants}
          className="text-center flex flex-col items-center gap-2 text-white text-xl"
        >
          <p className="text-red-400">{error}</p>
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 flex items-center gap-2 text-emerald-400 hover:text-white transition-colors"
            >
              <ChevronRight className="rotate-180" />
              العودة للمشاريع
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  if (!project) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-slate-900 to-[#1e293b] flex items-center justify-center"
      >
        <motion.div
          variants={itemVariants}
          className="text-center flex flex-col items-center gap-2 text-white text-xl"
        >
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          جاري التحميل...
        </motion.div>
      </motion.div>
    );
  }

  const IconComponent = iconMap[project.icon_name] || Code;

  // Validate URLs
  const safeLiveUrl = project.live_url?.startsWith('http') ? project.live_url : `https://${project.live_url}`;
  const safeCaseStudyUrl = project.case_study_url?.startsWith('http') ? project.case_study_url : `https://${project.case_study_url}`;

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
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-24">
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-emerald-400 hover:text-white transition-colors"
              >
                <ChevronRight className="rotate-180" />
                العودة للمشاريع
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8 shadow-2xl"
          >
            <Sparkles className="w-5 h-5" />
            <motion.div animate={{ textShadow: ['0 0 10px #10b981', '0 0 20px #10b981'] }} transition={{ duration: 2, repeat: Infinity }}>
              مشروع مميز
            </motion.div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'],
                color: ['#ffffff', '#10b981', '#06b6d4'],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="GraphicSchool bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              {project.title}
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {project.description}
          </motion.p>
        </motion.div>

        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative group">
              <div className={`relative group rounded-3xl overflow-hidden border-2 border-white/20 ${project.gradient}`}>
  <img
    src={project.image || 'https://via.placeholder.com/800x600'}
    alt={project.title}
    className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
    loading="lazy"
  />

  {/* overlay للتعتيم — pointer-events-none حتى لا يقطع الهوف */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none z-10" />

  {/* النص — pointer-events-none حتى لا يمنع الهوف، أعلى z-index */}
  <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none z-20">
    <h3 className="LAXR text-2xl font-bold text-white mb-2">{project.title}</h3>
    <div className="flex items-center gap-4 text-emerald-400">
      <Eye className="w-5 h-5" />
      <span className="GraphicSchool bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
        متع نظرك
      </span>
    </div>
  </div>
</div>

            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className={`p-6 rounded-2xl border border-white/10 ${project.gradient} bg-gradient-to-br `}>
                <IconComponent className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{project.category}</h3>
                <p className="text-gray-300">{project.long_description || 'لا يوجد وصف طويل متاح'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {project.stats &&
                  Object.entries(project.stats).map(([key, value], index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center"
                    >
                      <div className="text-2xl font-bold text-emerald-400 mb-1">{value || 'غير متوفر'}</div>
                      <div className="text-gray-400 text-sm capitalize">{key}</div>
                    </motion.div>
                  ))}
              </div>

              <div className="flex gap-4 pt-4">
                {project.live_url && (
                  <motion.a
                    href={safeLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className={`flex-1 px-6 py-4 bg-gradient-to-r ${project.gradient} text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg`}
                  >
                    <Globe className="w-5 h-5" />
                    عرض الموقع
                  </motion.a>
                )}
                {project.case_study_url && (
                  <motion.a
                    href={safeCaseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    دراسة الحالة
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {project.screenshots?.length > 0 && (
          <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                لمحة من <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">التصميم</span>
              </h2>
            </motion.div>
            <div className="relative">
              <motion.div
                animate={{ x: [0, -100, 0] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="flex gap-6 overflow-hidden"
              >
                {project.screenshots.map((src, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="flex-shrink-0 w-80"
                  >
                    <div className={`rounded-2xl overflow-hidden border-2 border-white/20 ${project.gradient}`}>
                      <img src={src} alt={`Screenshot ${index + 1}`} className="w-full h-96 object-cover" loading="lazy" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}

        {project.tags?.length > 0 && (
          <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                التقنيات <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">المستخدمة</span>
              </h2>
            </motion.div>
            <div className="relative max-w-4xl mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                {project.tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    style={{
                      transform: `rotate(${index * 60}deg) translateY(-150px) rotate(${-index * 60}deg)`,
                    }}
                    className="absolute top-1/2 left-1/2 w-32 h-32"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center text-center p-3 shadow-2xl"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mb-2">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-bold text-white">{tag}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}

        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Calendar, title: 'تاريخ التسليم', value: project.date || 'غير محدد', color: '#10b981' },
              { icon: Clock, title: 'مدة المشروع', value: project.duration || 'غير محدد', color: '#06b6d4' },
              { icon: Users, title: 'حجم الفريق', value: project.team_size || 'غير محدد', color: '#f59e0b' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10 + index * 2, repeat: Infinity }}
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: item.color + '40' }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">{item.title}</h3>
                <p className="text-center text-emerald-400 font-semibold">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              آراء <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">العميل</span>
            </h2>
          </motion.div>
          <div className="relative max-w-2xl mx-auto">
            {reviews.length > 0 ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id || index}
                    style={{
                      transform: `rotate(${index * (360 / reviews.length)}deg) translateY(-120px) rotate(${-index * (360 / reviews.length)}deg)`,
                    }}
                    className="absolute top-1/2 left-1/2 w-64 h-64"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-48 h-48 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border border-emerald-500/30 p-6 flex flex-col justify-center shadow-2xl"
                    >
                      <div className="flex gap-1 mb-2">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-white text-sm mb-2">"{review.text}"</p>
                      <p className="text-emerald-400 font-semibold text-xs">— {review.name}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                variants={itemVariants}
                className="text-center text-gray-300 text-lg"
              >
                لا توجد آراء متاحة لهذا المشروع
              </motion.p>
            )}
          </div>
        </motion.section>

        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-white mb-6">
              جاهز لمشروعك <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">التالي</span>؟
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-12">
              بعد نجاح هذا المشروع، دعنا نصنع معاً <span className="text-emerald-400">تحفة رقمية</span> جديدة
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
        </motion.section>
      </div>
    </div>
  );
}