import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Smartphone, Globe, Zap, Shield, Users, ChevronDown, Sparkles, Rocket, Target, Award, Database, Cloud, Lock, Palette, X, Star, CheckCircle, Filter, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Terminal from '../components/Terminal';
import StarField from '../components/StarField';
import { supabase } from '../lib/supabase';
import Testimonials  from '../components/Testimonials'


// Motion variants used across the component
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const toastVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Home() {
  const [latestProjects, setLatestProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [openFaq, setOpenFaq] = useState(null); // State to manage open FAQ

  const features = [
    {
      icon: Code,
      title: 'تطوير تطبيقات الويب',
      description: 'حلول ويب متقدمة ومتجاوبة مع جميع الأجهزة باستخدام أحدث التقنيات',
      gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    },
    {
      icon: Smartphone,
      title: 'تطبيقات الموبايل',
      description: 'تطبيقات ذكية لنظامي iOS و Android بتجربة مستخدم استثنائية',
      gradient: 'from-cyan-400 via-blue-400 to-emerald-400',
    },
    {
      icon: Globe,
      title: 'حلول السحابة',
      description: 'بنية تحتية سحابية آمنة وقابلة للتوسع مع أفضل الممارسات',
      gradient: 'from-teal-400 via-emerald-400 to-green-400',
    },
    {
      icon: Zap,
      title: 'أداء عالي',
      description: 'تطبيقات سريعة ومُحسّنة للأداء الأمثل بتقنيات متطورة',
      gradient: 'from-emerald-400 via-green-400 to-teal-400',
    },
    {
      icon: Shield,
      title: 'أمان متقدم',
      description: 'حماية البيانات والمعلومات بأعلى معايير الأمان العالمية',
      gradient: 'from-cyan-400 via-teal-400 to-emerald-400',
    },
    {
      icon: Users,
      title: 'دعم مستمر',
      description: 'فريق دعم فني متاح على مدار الساعة لضمان نجاح أعمالك',
      gradient: 'from-teal-400 via-cyan-400 to-blue-400',
    },
  ];

  const stats = [
    { number: '500+', label: 'مشروع منجز' },
    { number: '250+', label: 'عميل راضٍ' },
    { number: '50+', label: 'خبير متخصص' },
    { number: '99%', label: 'رضا العملاء' },
  ];

  const achievements = [
    {
      icon: Award,
      title: 'جودة مضمونة',
      description: 'معايير عالمية في كل مشروع',
    },
    {
      icon: Rocket,
      title: 'سرعة التسليم',
      description: 'نلتزم بالمواعيد المحددة',
    },
    {
      icon: Target,
      title: 'تركيز على النتائج',
      description: 'نحقق أهدافك بدقة',
    },
  ];

  const latestServices = [
    {
      icon: Database,
      title: 'قواعد البيانات',
      description: 'تصميم وإدارة قواعد بيانات قوية وآمنة',
      gradient: 'from-emerald-500 to-teal-500',
    },
,
    {
      icon: Settings,
      title: 'الصيانة والدعم',
      description: '24/7 متاح دائماً',
      gradient: 'from-gray-500 to-slate-500'
    },
    {
      icon: Rocket,
      title: 'استشارات تقنية',
      description: 'خطط تنفيذ مثالية',
      gradient: 'from-cyan-500 to-blue-500'
    },

    {
      icon: Palette,
      title: 'تصميم UI/UX',
      description: 'تصميمات جذابة وواجهات مستخدم سهلة',
      gradient: 'from-pink-500 to-violet-500',
    },
  ];


  const faqs = [
    {
      question: 'ما هي الخدمات التي تقدمها يسرها؟',
      answer: 'نقدم مجموعة واسعة من الخدمات تشمل تطوير تطبيقات الويب والموبايل، حلول السحابة، تصميم واجهات المستخدم، والأمن السيبراني.',
    },
    {
      question: 'كم يستغرق تطوير مشروع؟',
      answer: 'يعتمد ذلك على حجم المشروع وتعقيده. عادةً، نقدم تقديرًا زمنيًا دقيقًا بعد مناقشة متطلبات المشروع مع العميل.',
    },
    {
      question: 'هل تقدمون دعمًا فنيًا بعد إطلاق المشروع؟',
      answer: 'نعم، نقدم دعمًا فنيًا مستمرًا على مدار الساعة لضمان استمرارية عمل مشروعك بكفاءة.',
    },
    {
      question: 'كيف يمكنني الحصول على عرض أسعار؟',
      answer: 'يمكنك التواصل معنا عبر صفحة "اتصل بنا"، وسنقوم بتقديم عرض أسعار مخصص بناءً على احتياجاتك.',
    },
  ];

  useEffect(() => {
    const fetchLatestProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'منشور')
        .order('created_at', { ascending: false })
        .limit(4);
      if (error) {
        console.error('Error fetching latest projects:', error);
        console.log('خطأ في جلب المشاريع: ' + error.message, 'error');
      } else {
        console.log('Fetched latest projects:', data); // Debug log
        setLatestProjects(data);
        if (data.length === 0) {
          console.log('لا توجد مشاريع منشورة متاحة', 'info');
        }
      }
      setLoading(false);
    };

    fetchLatestProjects();
  }, []);

  // const showNotification = (message, type) => {
  //   setNotification({ message, type });
  //   setTimeout(() => setNotification(null), 5000);
  // };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index); // Toggle open/close FAQ
  };

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <StarField />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:pt-6 pb-[6rem] lg:py-8 relative z-10 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center ">
            <div className="text-center lg:text-right">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(16, 185, 129, 0.3)',
                      '0 0 40px rgba(16, 185, 129, 0.5)',
                      '0 0 20px rgba(16, 185, 129, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-6 rounded-full"
                >
                  <span className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/50 rounded-full text-emerald-400 text-sm font-medium ">
                    <Sparkles className="w-4 h-4" />
                    الشركة الرائدة في التحول الرقمي
                  </span>
                </motion.div>
              </motion.div>
              <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-relaxed md:leading-snug  lg:leading-snug"
>
  نصنع
  <br />
<motion.span
  className="GraphicSchool text-3xl md:text-[2.9rem] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient-x px-4 py-1 rounded-3xl backdrop-blur-md bg-white/20 border border-teal-400/50 shadow-lg"
  animate={{
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  }}
  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
  style={{ backgroundSize: '200% 200%' }}
>
  مستقبلك الرقمي
</motion.span>

  <br />
  بتميز وإبداع
</motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
              >
                نحوّل أفكارك المبتكرة إلى حلول رقمية تتميز في السوق، نتفوق وننجح معًا
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/contact" className='flex justify-center'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-bold text-lg flex items-center gap-2 justify-center shadow-lg shadow-emerald-500/30"
                  >
                    ابدأ رحلتك معنا
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link to="/projects">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-emerald-400/50 text-white rounded-full font-bold text-lg hover:bg-emerald-500/10 transition-colors"
                  >
                    استكشف إبداعنا
                  </motion.button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-12 text-emerald-400"
              >
                <p className="text-sm mb-2 font-bold">الثقة والتميز في كل مشروع</p>
                <div className="flex justify-center lg:justify-start gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      className="text-xl"
                    >
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className=" lg:block"
            >
              <Terminal />
            </motion.div>
          </div>
        </div>
        <a href="#about" >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2  lg:block "
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative">
          <div className="w-1 h-3 bg-gradient-to-b from-cyan-500 to-emerald-400 rounded-full mt-2 animate-pulse">
            </div>
            <div className="absolute -bottom-6 text-white/60 text-xs whitespace-nowrap">اكتشف المزيد</div>
            </div>
        </motion.div>
        </a>
      </section>
      {/* ======= ABOUT SECTION ======= */}
      <section id='about' className="py-24 bg-slate-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              من <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">نحن</span>
            </h2>
            <div className="mx-auto w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-4"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              نحن فريق من المبدعين والمطورين الذين يسعون لتحويل الأفكار إلى واقع رقمي استثنائي. نؤمن بأن التكنولوجيا هي المفتاح للمستقبل.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              src="/about.png"
              alt="من نحن"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl shadow-lg"
            />
            <motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="relative"
>
  {/* عنوان */}
  <h3 className="LAXR text-3xl md:text-4xl font-bold text-white mb-4">
    رؤيتنا ورسالتنا
  </h3>


  {/* الوصف */}
  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
    نعمل على تمكين المؤسسات والأفراد من التميز في عالم رقمي سريع التغير، عبر تقديم
    حلول تقنية مبتكرة تجمع بين الإبداع، الأداء العالي، وسهولة الاستخدام.
  </p>

  {/* نقاط مميزة */}
  <div className="space-y-4 mb-10">
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
  className="flex items-start gap-4"
>
  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
  <p className="text-gray-300">
    بناء تجارب رقمية حديثة تعكس هوية العملاء وتحقق أهدافهم.
  </p>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="flex items-start gap-4"
>
  <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
  <p className="text-gray-300">
    التركيز على الجودة، السرعة، وقابلية التوسع في جميع مشاريعنا.
  </p>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
  className="flex items-start gap-4"
>
  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
  <p className="text-gray-300">
    شراكة طويلة الأمد قائمة على الثقة والدعم المستمر.
  </p>
</motion.div>

  </div>

  {/* زر */}
  <Link to="/about">
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 
                 text-white rounded-full font-bold text-lg 
                 shadow-lg shadow-emerald-500/30 
                 hover:shadow-cyan-500/40 transition-all"
    >
      اكتشف المزيد
    </motion.button>
  </Link>
</motion.div>

          </div>
        </div>
      </section>
      <section className="relative py-24 bg-gradient-to-b from-[#0a0e17] to-slate-900/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNiA2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNnptMCAxMGMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNCA0IDEuNzkgNCA0LTEuNzkgNC00IDR6IiBmaWxsPSJyZ2JhKDE2LCAxODUsIDEyOSwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              لماذا <span className="LAXR text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">يسرها</span>؟
            </h2>
            <p className="text-xl text-gray-400">نقدم حلولاً متكاملة تلبي احتياجاتك بأعلى معايير الجودة</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
                />
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-6 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full origin-right"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/30 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4"
                >
                  <achievement.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-24 bg-slate-900/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              أرقام تتحدث عن <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">التميزنا </span>
            </h2>
            <p className="text-xl text-gray-400">إنجازاتنا تعكس التزامنا بالتميز والابتكار</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative p-8 rounded-2xl bg-slate-900/50 border border-emerald-500/20 group-hover:border-emerald-500/50 transition-all"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative">
                    <div className="LAXR text-3xl md:text-6xl py-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mb-3">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-lg font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ======= LATEST SERVICES SECTION ======= */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a0e17] to-slate-900/50">
        <StarField />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              أحدث <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">الخدمات</span>
            </h2>
            <p className="text-xl text-gray-300">اكتشف أحدث ما نقدمه من حلول تقنية مبتكرة</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 overflow-hidden transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative p-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-500/30"
              >
                شاهد جميع الخدمات
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* ======= LATEST PROJECTS SECTION ======= */}
      <section className="relative py-24 bg-gradient-to-b from-slate-900/50 to-[#0a0e17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              أحدث <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">المشاريع</span>
            </h2>
            <p className="text-xl text-gray-300">تعرف على أحدث إنجازاتنا في عالم التقنية</p>
          </motion.div>
          {loading ? (
            <motion.div
              variants={itemVariants}
              className="text-center flex flex-col items-center gap-2 text-white text-xl mb-4"
            >
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              جاري التحميل...
            </motion.div>
          ) : latestProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestProjects.map((project, index) => (
                <Link to={`/projects/${project.id}`} key={project.id} className="no-underline">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 overflow-hidden transition-all"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x192?text=صورة+غير+متوفرة';
                      }}
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <span className="inline-block px-4 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/50 rounded-full text-emerald-400 text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center text-white text-xl"
            >
              <Filter className="mx-auto text-gray-400 mb-4" size={56} />
              لا توجد مشاريع منشورة متاحة
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-500/30"
              >
                شاهد جميع المشاريع
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* ======= FAQ SECTION ======= */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a0e17] to-slate-900/50">
        <StarField />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              الأسئلة <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">الشائعة</span>
            </h2>
            <p className="text-xl text-gray-300">إجابات على أكثر الأسئلة شيوعًا حول خدماتنا</p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-6 text-right"
                  >
                    <span className="text-xl font-bold text-white">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-emerald-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-300 text-lg leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ======= TESTIMONIALS SECTION ======= */}
     <Testimonials />
      <section className="py-24 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-y border-emerald-500/20 relative overflow-hidden">
        <StarField />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              جاهز لبدء <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">مشروعك</span>؟
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              دعنا نحول فكرتك إلى واقع رقمي متميز يفوق التوقعات
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-bold text-lg shadow-xl shadow-emerald-500/30 overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative">احصل على عرض أسعار</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Toast Notification */}
      {notification && (
        <motion.div
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed top-4 right-4 p-4 rounded-xl text-white flex items-center gap-2 shadow-lg ${
            notification.type === 'success' ? 'bg-green-500/80' :
            notification.type === 'error' ? 'bg-red-500/80' :
            'bg-blue-500/80'
          }`}
        >
          <X size={20} />
          {notification.message}
        </motion.div>
      )}
    </div>
  );
}