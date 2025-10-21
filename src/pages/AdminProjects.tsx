import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Download, X, Check, Star, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { login, getSession } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    long_description: '',
    image: '',
    screenshots: [],
    icon_name: 'Code',
    tags: [],
    stats: { users: '', rating: '', transactions: '' },
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-500',
    date: '',
    duration: '',
    team_size: '',
    client: '',
    live_url: '',
    case_study_url: '',
    status: 'مسودة',
  });
  const [newReview, setNewReview] = useState({ text: '', name: '', rating: 5 });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const navigate = useNavigate();

  const Infos = {
    ecommerce: {
      title: 'متجر إلكتروني',
      category: 'متجر',
      description: 'منصة تسوق إلكترونية متكاملة',
      long_description: 'منصة تسوق إلكترونية تدعم الدفع الإلكتروني والتوصيل',
      icon_name: 'ShoppingCart',
      tags: ['React', 'Node.js', 'Stripe'],
      stats: { users: '10000', rating: '4.8', transactions: '5000' },
      color: '#10b981',
      gradient: 'from-emerald-500 to-teal-500',
      date: '2025-10-01',
      duration: '3 أشهر',
      team_size: '5 أشخاص',
      client: 'شركة التجارة',
      live_url: 'https://example.com',
      case_study_url: 'https://example.com/case-study',
      status: 'منشور',
    },
    health: {
      title: 'تطبيق صحي',
      category: 'صحة',
      description: 'تطبيق لتتبع الصحة واللياقة',
      long_description: 'تطبيق يساعد المستخدمين على تتبع نشاطاتهم الصحية',
      icon_name: 'Heart',
      tags: ['React Native', 'Firebase'],
      stats: { users: '5000', rating: '4.5', transactions: '1000' },
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500',
      date: '2025-09-15',
      duration: '4 أشهر',
      team_size: '4 أشخاص',
      client: 'مركز الصحة',
      live_url: 'https://health.example.com',
      case_study_url: 'https://health.example.com/case-study',
      status: 'منشور',
    },
    corporate: {
      title: 'موقع مؤسسي',
      category: 'مؤسسة',
      description: 'موقع رسمي لشركة',
      long_description: 'موقع مؤسسي يعرض خدمات الشركة ومشاريعها',
      icon_name: 'Building2',
      tags: ['Next.js', 'Tailwind'],
      stats: { users: '2000', rating: '4.7', transactions: '500' },
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-indigo-500',
      date: '2025-08-01',
      duration: '2 أشهر',
      team_size: '3 أشخاص',
      client: 'شركة المستقبل',
      live_url: 'https://corporate.example.com',
      case_study_url: 'https://corporate.example.com/case-study',
      status: 'منشور',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const toastVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await getSession();
      if (error || !data.session) {
        navigate('/login');
      } else {
        fetchProjects();
        fetchReviews();
      }
    };
    checkSession();
  }, [navigate]);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
      showNotification('خطأ في جلب المشاريع: ' + error.message, 'error');
    } else {
      setProjects(data);
    }
  };

  const fetchReviews = async (projectId = null) => {
    const query = supabase.from('reviews').select('*');
    if (projectId) query.eq('project_id', projectId);
    const { data, error } = await query;
    if (error) {
      showNotification('خطأ في جلب الآراء: ' + error.message, 'error');
    } else {
      setReviews(data);
    }
  };

  const uploadImage = async (file, path) => {
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(path, file, { upsert: true });
    if (error) {
      showNotification('خطأ في رفع الصورة: ' + error.message, 'error');
      return null;
    }
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(path);
    return urlData.publicUrl;
  };

  const handleAddOrUpdateProject = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image;
    let screenshotUrls = formData.screenshots;

    // Upload main image
    if (imageFile) {
      const imagePath = `images/${Date.now()}_${imageFile.name}`;
      imageUrl = await uploadImage(imageFile, imagePath);
      if (!imageUrl) return;
    }

    // Upload screenshots
    if (screenshotFiles.length) {
      screenshotUrls = [];
      for (const file of screenshotFiles) {
        const screenshotPath = `screenshots/${Date.now()}_${file.name}`;
        const url = await uploadImage(file, screenshotPath);
        if (url) screenshotUrls.push(url);
      }
    }

    const projectData = {
      ...formData,
      image: imageUrl,
      screenshots: screenshotUrls,
      tags: formData.tags.length ? formData.tags : [],
      stats: formData.stats,
    };

    if (isEditing) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editId);
      if (error) {
        showNotification('خطأ في تحديث المشروع: ' + error.message, 'error');
      } else {
        showNotification('تم تحديث المشروع بنجاح', 'success');
        fetchProjects();
        resetForm();
      }
    } else {
      const { error } = await supabase.from('projects').insert([projectData]);
      if (error) {
        showNotification('خطأ في إضافة المشروع: ' + error.message, 'error');
      } else {
        showNotification('تم إضافة المشروع بنجاح', 'success');
        fetchProjects();
        resetForm();
      }
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!editId && isEditing) {
      showNotification('يرجى تحديد مشروع أولاً', 'error');
      return;
    }
    const { error } = await supabase.from('reviews').insert({
      project_id: editId || projects[0]?.id,
      ...newReview,
    });
    if (error) {
      showNotification('خطأ في إضافة الرأي: ' + error.message, 'error');
    } else {
      showNotification('تم إضافة الرأي بنجاح', 'success');
      fetchReviews(editId || projects[0]?.id);
      setNewReview({ text: '', name: '', rating: 5 });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
    if (error) {
      showNotification('خطأ في حذف الرأي: ' + error.message, 'error');
    } else {
      showNotification('تم حذف الرأي بنجاح', 'success');
      fetchReviews(editId || projects[0]?.id);
    }
  };

  const handleEditProject = (project) => {
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      long_description: project.long_description || '',
      image: project.image || '',
      screenshots: project.screenshots || [],
      icon_name: project.icon_name || 'Code',
      tags: project.tags || [],
      stats: project.stats || { users: '', rating: '', transactions: '' },
      color: project.color || '#10b981',
      gradient: project.gradient || 'from-emerald-500 to-teal-500',
      date: project.date || '',
      duration: project.duration || '',
      team_size: project.team_size || '',
      client: project.client || '',
      live_url: project.live_url || '',
      case_study_url: project.case_study_url || '',
      status: project.status || 'مسودة',
    });
    setIsEditing(true);
    setEditId(project.id);
    setShowForm(true);
    fetchReviews(project.id);
  };

  const handleDeleteProject = async () => {
    const { error } = await supabase.from('projects').delete().eq('id', deleteId);
    if (error) {
      showNotification('خطأ في حذف المشروع: ' + error.message, 'error');
    } else {
      showNotification('تم حذف المشروع بنجاح', 'success');
      fetchProjects();
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      long_description: '',
      image: '',
      screenshots: [],
      icon_name: 'Code',
      tags: [],
      stats: { users: '', rating: '', transactions: '' },
      color: '#10b981',
      gradient: 'from-emerald-500 to-teal-500',
      date: '',
      duration: '',
      team_size: '',
      client: '',
      live_url: '',
      case_study_url: '',
      status: 'مسودة',
    });
    setImageFile(null);
    setScreenshotFiles([]);
    setNewReview({ text: '', name: '', rating: 5 });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
    setReviews([]);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleArrayInput = (field, value) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map(item => item.trim()).filter(item => item),
    });
  };

  const applyInfo = (InfoName) => {
    setFormData({ ...formData, ...Infos[InfoName] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-slate-900 to-[#1e293b] pt-24 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-bold text-white mb-2">
                إدارة <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">المشاريع</span>
              </h1>
              <p className="text-gray-300">إضافة وتعديل ونشر المشاريع</p>
            </motion.div>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
              onClick={() => setShowForm(true)}
            >
              <Plus size={20} />
              مشروع جديد
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { num: projects.length, label: 'المشاريع', color: 'emerald' },
              { num: projects.filter(p => p.status === 'منشور').length, label: 'منشور', color: 'cyan' },
              { num: projects.filter(p => p.status === 'مسودة').length, label: 'مسودة', color: 'gray' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-xl text-center border ${
                  stat.color === 'emerald' ? 'border-emerald-500/30 bg-emerald-500/10' :
                  stat.color === 'cyan' ? 'border-cyan-500/30 bg-cyan-500/10' :
                  'border-gray-500/30 bg-gray-500/10'
                }`}
              >
                <div className="text-3xl font-bold text-white">{stat.num}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Table */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-4 text-left text-white font-bold">العنوان</th>
                  <th className="p-4 text-left text-white font-bold">الفئة</th>
                  <th className="p-4 text-left text-white font-bold">الحالة</th>
                  <th className="p-4 text-left text-white font-bold">التاريخ</th>
                  <th className="p-4 text-left text-white font-bold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <motion.tr
                    key={project.id}
                    variants={itemVariants}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-white">{project.title}</div>
                        <div className="text-gray-400 text-sm">ID: {project.id}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        project.category === 'متجر' ? 'bg-emerald-500/20 text-emerald-400' :
                        project.category === 'صحة' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {project.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        project.status === 'منشور' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-300">{project.date || 'غير محدد'}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          className="p-2 text-blue-400 hover:text-blue-300"
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          <Eye size={16} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          className="p-2 text-emerald-400 hover:text-emerald-300"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit size={16} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          className="p-2 text-red-400 hover:text-red-300"
                          onClick={() => {
                            setDeleteId(project.id);
                            setShowDeleteConfirm(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          className="p-2 text-purple-400 hover:text-purple-300"
                        >
                          <Download size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Project Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus size={20} className="text-emerald-400" />
                  {isEditing ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                </h3>
                <button onClick={resetForm} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddOrUpdateProject} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">القالب</label>
                  <select
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    onChange={(e) => applyInfo(e.target.value)}
                  >
                    <option value="">اختر قالباً</option>
                    <option value="ecommerce">متجر إلكتروني</option>
                    <option value="health">تطبيق صحي</option>
                    <option value="corporate">موقع مؤسسي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">العنوان</label>
                  <input
                    placeholder="عنوان المشروع"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">الفئة</label>
                  <input
                    placeholder="الفئة"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">الوصف</label>
                  <textarea
                    placeholder="وصف المشروع"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">الوصف الطويل</label>
                  <textarea
                    placeholder="الوصف الطويل"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">الصورة الرئيسية</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                  {formData.image && <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
                </div>
                <div>
                  <label className="block text-white mb-2">الصور الفرعية</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    onChange={(e) => setScreenshotFiles(Array.from(e.target.files))}
                  />
                  {formData.screenshots.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {formData.screenshots.map((src, index) => (
                        <img key={index} src={src} alt={`Screenshot ${index}`} className="w-16 h-16 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-white mb-2">الأيقونة</label>
                  <select
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.icon_name}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  >
                    {['Code', 'ShoppingCart', 'Heart', 'Building2', 'Smartphone', 'Globe'].map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">الوسوم (مفصولة بفواصل)</label>
                  <input
                    placeholder="الوسوم,مثال: React,Node.js"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.tags.join(',')}
                    onChange={(e) => handleArrayInput('tags', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">الإحصائيات</label>
                  <input
                    placeholder="عدد المستخدمين"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white mb-2"
                    value={formData.stats.users}
                    onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, users: e.target.value } })}
                  />
                  <input
                    placeholder="التقييم"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white mb-2"
                    value={formData.stats.rating}
                    onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, rating: e.target.value } })}
                  />
                  <input
                    placeholder="المعاملات"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.stats.transactions}
                    onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, transactions: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">اللون</label>
                  <input
                    type="color"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">التدرج اللوني</label>
                  <input
                    placeholder="التدرج,مثال: from-emerald-500 to-teal-500"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.gradient}
                    onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">تاريخ التسليم</label>
                  <input
                    placeholder="تاريخ التسليم"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">مدة المشروع</label>
                  <input
                    placeholder="مدة المشروع"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">حجم الفريق</label>
                  <input
                    placeholder="حجم الفريق"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.team_size}
                    onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">العميل</label>
                  <input
                    placeholder="اسم العميل"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">رابط الموقع</label>
                  <input
                    placeholder="رابط الموقع"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">رابط دراسة الحالة</label>
                  <input
                    placeholder="رابط دراسة الحالة"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.case_study_url}
                    onChange={(e) => setFormData({ ...formData, case_study_url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">الحالة</label>
                  <select
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option>مسودة</option>
                    <option>منشور</option>
                  </select>
                </div>

                {/* Reviews Section */}
                {(isEditing || projects.length > 0) && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">آراء العملاء</h3>
                    <div className="space-y-4">
                      <form onSubmit={handleAddReview} className="space-y-4">
                        <input
                          placeholder="اسم العميل"
                          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          required
                        />
                        <textarea
                          placeholder="نص الرأي"
                          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                          value={newReview.text}
                          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                          required
                        />
                        <select
                          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                          value={newReview.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                        >
                          {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n} نجوم</option>
                          ))}
                        </select>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          type="submit"
                          className="w-full p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold"
                        >
                          إضافة رأي
                        </motion.button>
                      </form>
                      <div className="space-y-2">
                        {reviews
                          .filter(r => r.project_id === (editId || projects[0]?.id))
                          .map(review => (
                            <motion.div
                              key={review.id}
                              variants={itemVariants}
                              className="p-4 bg-white/10 rounded-xl border border-white/20 flex justify-between items-center"
                            >
                              <div>
                                <div className="flex gap-1 mb-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                                <p className="text-white">{review.text}</p>
                                <p className="text-gray-400 text-sm">— {review.name}</p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-red-400 hover:text-red-300"
                                onClick={() => handleDeleteReview(review.id)}
                              >
                                <Trash2 size={16} />
                              </motion.button>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="flex-1 p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold"
                  >
                    {isEditing ? 'تحديث' : 'إضافة'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    className="flex-1 p-3 bg-gray-500/50 text-white rounded-xl font-bold"
                    onClick={resetForm}
                  >
                    إلغاء
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-white mb-6">تأكيد الحذف</h3>
              <p className="text-gray-300 mb-6">هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.</p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 p-3 bg-red-500 text-white rounded-xl font-bold"
                  onClick={handleDeleteProject}
                >
                  حذف
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 p-3 bg-gray-500/50 text-white rounded-xl font-bold"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  إلغاء
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Enhanced Toast Notifications */}
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
            {notification.type === 'success' ? <Check size={20} /> :
             notification.type === 'error' ? <X size={20} /> :
             <Info size={20} />}
            {notification.message}
          </motion.div>
        )}
      </div>
    </div>
  );
}