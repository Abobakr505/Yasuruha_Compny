import { motion } from 'framer-motion';
import { 
  ExternalLink, Code, Smartphone, Globe, ShoppingCart, Heart, 
  Building2, Sparkles, ChevronRight, Users, TrendingUp, Award 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StarField from '../components/StarField';

export default function Projects() {
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

  const projects = [
    {
      title: 'منصة التجارة الإلكترونية',
      category: 'متجر إلكتروني',
      description: 'منصة تجارة إلكترونية متكاملة مع أنظمة دفع متعددة وإدارة متقدمة للمخزون',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: ShoppingCart,
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      stats: { users: '50K+', rating: '4.9', transactions: '100K+' },
      color: '#10b981',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'تطبيق الرعاية الصحية',
      category: 'صحة',
      description: 'تطبيق شامل لإدارة المواعيد الطبية والاستشارات عن بعد',
      image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Heart,
      tags: ['React Native', 'Firebase', 'WebRTC', 'AI'],
      stats: { users: '30K+', rating: '4.8', doctors: '500+' },
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'نظام إدارة الأعمال',
      category: 'أعمال',
      description: 'نظام ERP متكامل لإدارة جميع عمليات الشركة من مكان واحد',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Building2,
      tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
      stats: { companies: '200+', users: '10K+', modules: '15+' },
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'منصة التعليم الإلكتروني',
      category: 'تعليم',
      description: 'منصة تعليمية متقدمة مع فصول افتراضية واختبارات تفاعلية',
      image: 'https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Code,
      tags: ['Vue.js', 'Laravel', 'MySQL', 'Zoom API'],
      stats: { students: '40K+', courses: '500+', rating: '4.9' },
      color: '#f97316',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'تطبيق توصيل الطعام',
      category: 'خدمات',
      description: 'تطبيق توصيل طعام مع تتبع فوري للطلبات وتقييمات المطاعم',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Smartphone,
      tags: ['Flutter', 'Express.js', 'MongoDB', 'Maps API'],
      stats: { restaurants: '1K+', orders: '200K+', rating: '4.7' },
      color: '#eab308',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'منصة الحجوزات السياحية',
      category: 'سياحة',
      description: 'منصة شاملة لحجز الفنادق والرحلات السياحية بأفضل الأسعار',
      image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Globe,
      tags: ['Next.js', 'GraphQL', 'Prisma', 'Stripe'],
      stats: { bookings: '80K+', hotels: '5K+', rating: '4.8' },
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
                color: ['#ffffff', '#10b981', '#06b6d4']
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
            بعض <span className="text-emerald-400 font-bold"> مشاريعنا الناجحة </span>، نصنع{' '}
            <span className="text-cyan-400">نجاحك</span> بـ <span className="text-purple-400">إبداع</span> لا حدود له
          </motion.p>
        </motion.div>

        {/* ======= PROJECTS ORB ======= */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              عالم <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">مشاريعنا</span>
            </h2>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    transform: `rotate(${index * 60}deg) translateY(-250px) rotate(${-index * 60}deg)`
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
                      <project.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-xs text-gray-300">{project.category}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ======= PROJECTS GALAXY ======= */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
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
                <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border-2 border-white/20 overflow-hidden">
                  <motion.div 
                    className="w-full h-full rounded-2xl relative"
                    style={{ backgroundColor: `${project.color}20` }}
                    transition={{ duration: 30 + index * 5, repeat: Infinity }}
                  >
                    {/* Image */}
                    <motion.img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-1/2 object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
                    
                    {/* Category Badge */}
                    <motion.div
                      initial={{ x: -50 }}
                      animate={{ x: 0 }}
                      className="absolute top-4 left-4"
                    >
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full text-xs font-bold">
                        {project.category}
                      </span>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`absolute top-4 right-4 w-12 h-12 ${project.gradient} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <project.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                      
                      {/* Tags */}
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

                      {/* Stats */}
                      <div className="flex justify-between">
                        {Object.values(project.stats).slice(0, 3).map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="text-center"
                          >
                            <div className="text-lg font-bold text-emerald-400 text-sm">{stat}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 flex justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-full font-bold text-sm shadow-lg flex items-center gap-2`}
                  >
                    عرض المشروع
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
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
              انضم إلى رحلتنا واصنع معنا <span className="text-emerald-400">قصة نجاح</span> مذهلة
            </motion.p>
            <Link to="/contact">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500  text-white rounded-full font-bold text-xl shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ابدأ مشروعك الآن
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Success Orbit */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, text: '500+ عميل', color: '#10b981' },
              { icon: TrendingUp, text: '95% نجاح', color: '#06b6d4' },
              { icon: Award, text: 'جوائز دولية', color: '#f59e0b' }
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
                <p className="text-white font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}