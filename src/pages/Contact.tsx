import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, Clock, Sparkles, 
  ChevronRight, Users, Zap, Shield, ChevronDown 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import StarField from '../components/StarField';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const formRef = useRef();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        'service_1bdsc8t', // Replace with your EmailJS service ID
        'template_zvn7klm', // Replace with your EmailJS template ID
        formRef.current,
        'k9Ti1ib4trNRh4VAQ' // Replace with your EmailJS public key
      );


      if (result.status === 200) {
        Swal.fire({
          title: 'تم الإرسال!',
          text: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!',
          icon: 'success',
          confirmButtonText: 'حسنًا',
          customClass: {
            popup: 'bg-white/95 backdrop-blur-sm rounded-2xl',
            title: 'text-2xl font-bold text-emerald-600',
            content: 'text-gray-700',
            confirmButton: 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl'
          },
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });

        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (error) {
      Swal.fire({
        title: 'خطأ!',
        text: 'حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.',
        icon: 'error',
        confirmButtonText: 'حسنًا',
        customClass: {
          popup: 'bg-white/95 backdrop-blur-sm rounded-2xl',
          title: 'text-2xl font-bold text-red-600',
          content: 'text-gray-700',
          confirmButton: 'bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectSelect = (subject) => {
    setFormData({ ...formData, subject: subject.value });
    setIsDropdownOpen(false);
  };

    useEffect(() =>{
    document.title = "يسِّرها - تواصل معنا  ";
  })

  const contactInfo = [
    { icon: Mail, title: 'البريد الإلكتروني', value: 'yasuruha1@gmail.com', link: 'mailto:yasuruha1@gmail.com', color: '#3b82f6' },
    { icon: Phone, title: 'الهاتف', value: '+201093954137', link: 'tel:+201093954137', color: '#10b981' },
    { icon: MapPin, title: 'الموقع', value: 'سوهاج , مصر ', link: '#', color: '#8b5cf6' },
    { icon: Clock, title: 'ساعات العمل', value: '9AM - 6PM', link: '#', color: '#f97316' }
  ];

  const subjects = [
    { value: 'web', label: 'تطوير الويب', icon: '🌐', color: '#3b82f6' },
    { value: 'mobile', label: 'تطبيقات الموبايل', icon: '📱', color: '#10b981' },
    { value: 'ecommerce', label: 'متاجر إلكترونية',

 icon: '🛒', color: '#8b5cf6' },
    { value: 'consulting', label: 'استشارات', icon: '💡', color: '#f97316' },
    { value: 'other', label: 'أخرى', icon: '❓', color: '#ec4899' }
  ];

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
              'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.3), transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                تواصل معنا
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
              نبني المستقبل
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            <span className="text-emerald-400 font-bold"> تواصل معنا </span>، حتي {' '}
            <span className="text-cyan-400">نحول</span> <span className="text-purple-400">مشروعك </span> إلى نجاح مذهل
          </motion.p>
        </motion.div>

        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              طرق <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">التواصل</span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    transform: `rotate(${index * 90}deg) translateY(-180px) rotate(${-index * 90}deg)`
                  }}
                  className="absolute top-1/2 left-1/2 w-64 h-64"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="w-40 h-40 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center text-center p-4 shadow-2xl"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 bg-gradient-to-br from-white to-transparent rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: info.color }}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-sm font-bold text-white mb-1">{info.title}</h3>
                    <p className="text-xs text-gray-300">{info.value}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="relative group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden h-full">
                <motion.div 
                  className="p-8 md:p-12 h-full flex flex-col"
                  transition={{ duration: 40, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-8 h-8 text-emerald-400" />
                    <h2 className="text-3xl font-bold text-white">أرسل رسالة</h2>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 flex-1">
                    {['name', 'email', 'phone'].map((field) => (
                      <motion.div 
                        key={field}
                        variants={itemVariants}
                        className="relative"
                      >
                        <input
                          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required={field !== 'phone'}
                          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 transition-all text-lg"
                          placeholder={`أدخل ${field === 'name' ? 'اسمك' : field === 'email' ? 'البريد' : 'الهاتف'}`}
                          dir={field === 'email' || field === 'phone' ? 'ltr' : 'rtl'}
                        />
                      </motion.div>
                    ))}

                    <motion.div variants={itemVariants} className="relative z-20">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                      >
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white text-lg flex items-center justify-between focus:outline-none focus:border-emerald-400/50 transition-all"
                        >
                          <span>
                            {formData.subject 
                              ? subjects.find(s => s.value === formData.subject)?.icon + ' ' + 
                                subjects.find(s => s.value === formData.subject)?.label
                              : 'اختر الموضوع'}
                          </span>
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </button>
                        <input
                          type="hidden"
                          name="subject"
                          value={formData.subject}
                        />
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="absolute w-full mt-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl z-20 overflow-hidden "
                            >
                              {subjects.map((subject) => (
                                <motion.button
                                  key={subject.value}
                                  type="button"
                                  onClick={() => handleSubjectSelect(subject)}
                                  whileHover={{ 
                                    backgroundColor: `${subject.color}20`,
                                    x: 10
                                  }}
                                  className="w-full px-6 py-3 text-white text-lg flex items-center gap-3 text-right hover:bg-white/20 transition-colors "
                                  style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                  <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-8 h-8 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: subject.color }}
                                  >
                                    {subject.icon}
                                  </motion.span>
                                  {subject.label}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 transition-all text-lg resize-none"
                        placeholder="رسالتك هنا..."
                      />
                    </motion.div>

                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative px-8 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-bold text-xl shadow-2xl overflow-hidden disabled:opacity-50 z-10"
                    >
                      <span className="relative z-10 flex items-center gap-3 ">
                        {isSubmitting ? (
                          <>
                            جاري الإرسال...
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full "
                            />
                          </>
                        ) : (
                          <>
                            إرسال الرسالة
                            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </span>
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity " />
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, rotateY: 10, y: -10 }}
                  className="group relative block"
                >
                  <div className="w-full h-32 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/10 overflow-hidden">
                    <motion.div 
                      className="w-full h-full p-6 flex items-center gap-4"
                      style={{ backgroundColor: `${info.color}20` }}
                      transition={{ duration: 20 + index * 5, repeat: Infinity }}
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        className={`w-14 h-14 ${info.color === '#3b82f6' ? 'from-blue-500 to-cyan-500' : info.color === '#10b981' ? 'from-emerald-500 to-teal-500' : info.color === '#8b5cf6' ? 'from-purple-500 to-pink-500' : 'from-orange-500 to-red-500'} bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg`}
                        style={{ backgroundColor: info.color }}
                      >
                        <info.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{info.title}</h3>
                        <p className="text-gray-300" dir={info.title === 'البريد الإلكتروني' || info.title === 'الهاتف' ? 'ltr' : 'rtl'}>{info.value}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.a>
              ))}

              <motion.div
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center"
              >
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 bg-emerald-400 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">متاحون الآن</h3>
                <p className="text-emerald-400 font-semibold">فريق الدعم جاهز للرد فوراً!</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-24">
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
              جاهز لـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">البداية</span>؟
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-12"
            >
              تواصل معنا الآن وابدأ <span className="text-emerald-400">رحلة النجاح</span>
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, text: 'رد فوري', color: '#10b981' },
              { icon: Zap, text: '24/7 متاح', color: '#06b6d4' },
              { icon: Shield, text: 'أمان مضمون', color: '#f59e0b' }
            ].map((item, index) => (
              <motion.div
                key={index}
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

        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6847798424!2d46.7285!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDMnNDIuNiJF!5e0!3m2!1sar!2ssa!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقعنا"
          />
        </motion.div>
      </div>
    </div>
  );
}