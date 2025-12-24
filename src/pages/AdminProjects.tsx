import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Download, X, Check, Star, Info, MessageSquare  } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

// ReviewForm component for adding and editing reviews
function ReviewForm(props: any) {
  const { projectId, onAddReview, onUpdateReview, isAddingReview, setIsAddingReview, editingReview, setEditingReview } = props;
  const [newReview, setNewReview] = useState(editingReview || { text: '', name: '', rating: 5 });
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | string) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e?: any) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    console.log('Form submission triggered for review:', newReview, 'projectId:', projectId);

    // show loading state in parent when available
    if (typeof setIsAddingReview === 'function') setIsAddingReview(true);

    if (!projectId) {
      console.error('No projectId provided');
      showNotification('لا يوجد مشروع محدد لإضافة الرأي', 'error');
      if (typeof setIsAddingReview === 'function') setIsAddingReview(false);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    console.log('Session:', session);
    if (!session) {
      console.error('No session found');
      showNotification('يجب تسجيل الدخول لإضافة رأي', 'error');
      if (typeof setIsAddingReview === 'function') setIsAddingReview(false);
      return;
    }
    const userId = session.user?.id;
    if (!userId) {
      console.error('No user id in session');
      showNotification('خطأ في الجلسة: معرف المستخدم غير موجود', 'error');
      if (typeof setIsAddingReview === 'function') setIsAddingReview(false);
      return;
    }

    if (!newReview.name || !newReview.text) {
      console.error('Missing required fields:', { name: newReview.name, text: newReview.text });
      showNotification('يرجى ملء جميع حقول الرأي', 'error');
      if (typeof setIsAddingReview === 'function') setIsAddingReview(false);
      return;
    }
    if (newReview.rating < 1 || newReview.rating > 5) {
      console.error('Invalid rating:', newReview.rating);
      showNotification('التقييم يجب أن يكون بين 1 و5', 'error');
      if (typeof setIsAddingReview === 'function') setIsAddingReview(false);
      return;
    }

    try {
      if (editingReview) {
        console.log('Updating review with ID:', editingReview.id);
        const { data, error } = await supabase
          .from('reviews')
          .update({
            text: newReview.text,
            name: newReview.name,
            rating: parseInt(newReview.rating),
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingReview.id)
          .eq('project_id', projectId)
          .select();
        if (error) {
          console.error('Supabase update error:', error);
          throw new Error(error.message);
        }
        console.log('Review updated successfully:', data);
        // ensure project_id exists on updated review before passing up
        const updated = { ...(data && data[0]) };
        if (updated && !updated.project_id) updated.project_id = projectId;
        onUpdateReview(updated);
        setNewReview({ text: '', name: '', rating: 5 });
        setEditingReview(null);
        showNotification('تم تحديث الرأي بنجاح', 'success');
      } else {
        console.log('Inserting new review with data:', {
          project_id: projectId,
          text: newReview.text,
          name: newReview.name,
          rating: parseInt(newReview.rating),
          created_at: new Date().toISOString(),
        });
        const { data, error } = await supabase
          .from('reviews')
          .insert({
            project_id: projectId,
            user_id: userId,
            text: newReview.text,
            name: newReview.name,
            rating: parseInt(newReview.rating),
            created_at: new Date().toISOString(),
          })
          .select();
        if (error) {
          console.error('Supabase insert error:', error);
          throw new Error(error.message);
        }
        console.log('Review added successfully:', data);
        // ensure project_id exists on inserted review before passing up
        const inserted = { ...(data && data[0]) };
        if (inserted && !inserted.project_id) inserted.project_id = projectId;
        onAddReview(inserted);
        setNewReview({ text: '', name: '', rating: 5 });
        showNotification('تم إضافة الرأي بنجاح', 'success');
      }
    } catch (err: any) {
      console.error('Error in handleSubmit:', err);
      showNotification(`خطأ في ${editingReview ? 'تحديث' : 'إضافة'} الرأي: ${err.message || err}`, 'error');
    }
    finally {
      if (typeof setIsAddingReview === 'function') setIsAddingReview(false);
    }
  };

  return (
    <div className="space-y-4 bg-slate-800/30 p-6 rounded-xl border border-emerald-500/30">
      {/* Use a div instead of nested form to avoid submitting the parent project form (prevents page refresh) */}
  <div className="space-y-4" onKeyDown={(e: any) => { if (e.key === 'Enter') e.preventDefault(); }}>
        <input
          placeholder="اسم العميل"
          className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          
        />
        <textarea
          placeholder="نص الرأي"
          className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
          
          rows={3}
        />
        <select
          className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} نجوم</option>
          ))}
        </select>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={(e: any) => handleSubmit(e)}
            disabled={isAddingReview || !projectId}
            className={`flex-1 p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 ${
              isAddingReview || !projectId ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAddingReview ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              <Plus size={20} />
            )}
            {isAddingReview ? 'جاري الإضافة...' : editingReview ? 'تحديث الرأي' : 'إضافة رأي'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="button"
            className="flex-1 p-3 bg-gray-600/50 text-white rounded-xl font-bold flex items-center justify-center gap-2"
            onClick={() => {
              setNewReview({ text: '', name: '', rating: 5 });
              setEditingReview(null);
            }}
          >
            <X size={20} />
            إلغاء
          </motion.button>
        </div>
      </div>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`p-4 rounded-xl text-white flex items-center gap-2 shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-500/90'
              : notification.type === 'error'
              ? 'bg-red-500/90'
              : 'bg-blue-500/90'
          }`}
        >
          {notification.type === 'success' ? (
            <Check size={20} />
          ) : notification.type === 'error' ? (
            <X size={20} />
          ) : (
            <Info size={20} />
          )}
          {notification.message}
        </motion.div>
      )}
    </div>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
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
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newProjectId, setNewProjectId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const [imageFile, setImageFile] = useState(null);
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const navigate = useNavigate();

  const tagOptions = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Next.js', label: 'Next.js' },
    { value: 'Tailwind', label: 'Tailwind' },
    { value: 'Firebase', label: 'Firebase' },
    { value: 'Stripe', label: 'Stripe' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'GraphQL', label: 'GraphQL' },
  ];

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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const toastVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      console.log('Fetched projects:', data);
      setProjects(data || []);
    } catch (err) {
      showNotification('خطأ في جلب المشاريع: ' + err.message, 'error');
    }
  }, []);

  const fetchReviews = useCallback(async (projectId = null) => {
    setIsLoadingReviews(true);
    try {
      let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (projectId) {
        query = query.eq('project_id', projectId);
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      console.log('Fetched reviews for projectId:', projectId, 'data:', data);
      setReviews(data || []);
    } catch (err) {
      showNotification('خطأ في جلب الآراء: ' + err.message, 'error');
    } finally {
      setIsLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    document.title = "لوحة التحكم";
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session on load:', session);
      if (!session) {
        navigate('/login');
      } else {
        fetchProjects();
        if (editId || newProjectId) {
          fetchReviews(editId || newProjectId);
        }
      }
    };
    checkSession();
  }, [navigate, fetchProjects, fetchReviews, editId, newProjectId]);

  const uploadImage = useCallback(async (file, path) => {
    if (!file) return null;
    if (!file.type.startsWith('image/')) {
      showNotification('يرجى رفع ملف صورة صالح (JPEG/PNG)', 'error');
      return null;
    }
    if (file.size > 5 * 1024 * 1024) {
      showNotification('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
      return null;
    }

    try {
      const { error } = await supabase.storage
        .from('project-images')
        .upload(path, file, {
          upsert: true,
          onUploadProgress: (progress) => {
            setUploadProgress((prev) => ({
              ...prev,
              [path]: Math.round((progress.loaded / progress.total) * 100),
            }));
          },
        });

      if (error) throw new Error(error.message);

      const { data: urlData } = supabase.storage.from('project-images').getPublicUrl(path);
      return urlData.publicUrl;
    } catch (err) {
      showNotification('خطأ في رفع الصورة: ' + err.message, 'error');
      return null;
    }
  }, []);

  const handleAddOrUpdateProject = async (e) => {
    e.preventDefault();
    console.log('Project form submission triggered');
    if (!formData.title || !formData.category || !formData.description) {
      showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    let imageUrl = formData.image;
    let screenshotUrls = formData.screenshots;

    if (imageFile) {
      const imagePath = `images/${Date.now()}_${imageFile.name}`;
      imageUrl = await uploadImage(imageFile, imagePath);
      if (!imageUrl) return;
    }

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
      live_url: formData.live_url?.startsWith('http') ? formData.live_url : (formData.live_url ? `https://${formData.live_url}` : ''),
      case_study_url: formData.case_study_url?.startsWith('http') ? formData.case_study_url : (formData.case_study_url ? `https://${formData.case_study_url}` : ''),
    };

    try {
      let projectId;
      if (isEditing) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', editId);
        if (error) throw new Error(error.message);
        showNotification('تم تحديث المشروع بنجاح', 'success');
        projectId = editId;
      } else {
        const { data, error } = await supabase.from('projects').insert([projectData]).select();
        if (error) throw new Error(error.message);
        showNotification('تم إضافة المشروع بنجاح', 'success');
        projectId = data[0].id;
        setNewProjectId(projectId);
      }
      fetchProjects();
      setEditId(projectId);
      setIsEditing(true);
      fetchReviews(projectId);
    } catch (err) {
      showNotification('خطأ في حفظ المشروع: ' + err.message, 'error');
    }
  };

  const handleAddReview = (review) => {
    console.log('Adding review:', review);
    setReviews((prev) => {
      if ((editId || newProjectId) && review.project_id === (editId || newProjectId)) {
        return [review, ...prev];
      }
      return prev;
    });
    setIsAddingReview(false);
    fetchReviews(editId || newProjectId);
  };

  const handleUpdateReview = (updatedReview) => {
    console.log('Updating review:', updatedReview);
    setReviews((prev) =>
      prev.map((review) => (review.id === updatedReview.id ? updatedReview : review))
    );
    fetchReviews(editId || newProjectId);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
      if (error) throw new Error(error.message);
      showNotification('تم حذف الرأي بنجاح', 'success');
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (err) {
      showNotification('خطأ في حذف الرأي: ' + err.message, 'error');
    }
  };

  const handleEditReview = (review) => {
    console.log('Editing review:', review);
    setEditingReview(review);
  };

  const handleEditProject = (project) => {
    console.log('Editing project:', project);
    setFormData({
      title: project.title || '',
      category: project.category || '',
      description: project.description || '',
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
    setNewProjectId(null);
    setShowForm(true);
    fetchReviews(project.id);
  };

  const handleDeleteProject = async () => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', deleteId);
      if (error) throw new Error(error.message);
      showNotification('تم حذف المشروع بنجاح', 'success');
      fetchProjects();
      setShowDeleteConfirm(false);
      setDeleteId(null);
    } catch (err) {
      showNotification('خطأ في حذف المشروع: ' + err.message, 'error');
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
    setIsEditing(false);
    setEditId(null);
    setNewProjectId(null);
    setShowForm(false);
    setReviews([]);
    setEditingReview(null);
    setUploadProgress({});
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const applyInfo = (InfoName) => {
    setFormData({ ...formData, ...Infos[InfoName] });
  };

  const removeScreenshot = (index) => {
    setScreenshotFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-slate-900 to-[#1e293b] pt-24 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
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
              { num: projects.filter((p) => p.status === 'منشور').length, label: 'منشور', color: 'cyan' },
              { num: projects.filter((p) => p.status === 'مسودة').length, label: 'مسودة', color: 'gray' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-xl text-center border ${
                  stat.color === 'emerald'
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : stat.color === 'cyan'
                    ? 'border-cyan-500/30 bg-cyan-500/10'
                    : 'border-gray-500/30 bg-gray-500/10'
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
                {projects.map((project) => (
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          project.category === 'متجر'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : project.category === 'صحة'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}
                      >
                        {project.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          project.status === 'منشور' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-emerald-500/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Plus size={24} className="text-emerald-400" />
                  {isEditing ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                </h3>
                <motion.button whileHover={{ scale: 1.1 }} onClick={resetForm} className="text-gray-300 hover:text-white">
                  <X size={28} />
                </motion.button>
              </div>
              <form onSubmit={handleAddOrUpdateProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-2">
                  <label className="block text-white font-semibold mb-1">القالب</label>
                  <select
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    onChange={(e) => applyInfo(e.target.value)}
                  >
                    <option value="">اختر قالباً</option>
                    <option value="ecommerce">متجر إلكتروني</option>
                    <option value="health">تطبيق صحي</option>
                    <option value="corporate">موقع مؤسسي</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">
                    العنوان <span className="text-red-400">*</span>
                  </label>
                  <input
                    placeholder="عنوان المشروع"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">
                    الفئة <span className="text-red-400">*</span>
                  </label>
                  <input
                    placeholder="الفئة"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">
                    الوصف <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    placeholder="وصف المشروع"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">الوصف الطويل</label>
                  <textarea
                    placeholder="الوصف الطويل"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">الصورة الرئيسية</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    {uploadProgress[`images/${imageFile?.name}`] && (
                      <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-emerald-500 h-2.5 rounded-full"
                          style={{ width: `${uploadProgress[`images/${imageFile?.name}`]}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  {formData.image && (
                    <div className="mt-4">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-xl border border-emerald-500/30"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">الصور الفرعية</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
                      onChange={(e) => setScreenshotFiles(Array.from(e.target.files))}
                    />
                    {Object.keys(uploadProgress)
                      .filter((key) => key.startsWith('screenshots/'))
                      .map((key) => (
                        uploadProgress[key] && (
                          <div key={key} className="mt-2 w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-emerald-500 h-2.5 rounded-full"
                              style={{ width: `${uploadProgress[key]}%` }}
                            ></div>
                          </div>
                        )
                      ))}
                  </div>
                  {formData.screenshots.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {formData.screenshots.map((src, index) => (
                        <div key={index} className="relative">
                          <img
                            src={src}
                            alt={`Screenshot ${index}`}
                            className="w-24 h-24 object-cover rounded-xl border border-emerald-500/30"
                            loading="lazy"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
                            onClick={() => removeScreenshot(index)}
                          >
                            <X size={16} className="text-white" />
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">الأيقونة</label>
                  <select
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.icon_name}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  >
                    {['Code', 'ShoppingCart', 'Heart', 'Building2', 'Smartphone', 'Globe' , 'CircleUserRound'].map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">الوسوم</label>
                  <CreatableSelect
                    isMulti
                    options={tagOptions}
                    value={tagOptions.filter((option) => formData.tags.includes(option.value)).concat(
                      formData.tags
                        .filter((tag) => !tagOptions.some((option) => option.value === tag))
                        .map((tag) => ({ value: tag, label: tag }))
                    )}
                    onChange={(selected) => setFormData({ ...formData, tags: selected.map((opt) => opt.value) })}
                    formatCreateLabel={(inputValue) => `إضافة وسم: "${inputValue}"`}
                    placeholder="اكتب أو اختر الوسوم..."
                    className="text-black"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: 'rgba(15, 23, 42, 0.5)',
                        borderColor: 'rgba(16, 185, 129, 0.3)',
                        color: 'white',
                        borderRadius: '0.75rem',
                        padding: '0.75rem',
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      }),
                      option: (base, { isFocused }) => ({
                        ...base,
                        backgroundColor: isFocused ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                        color: 'white',
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: 'rgba(16, 185, 129, 0.3)',
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: 'white',
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: 'white',
                        ':hover': {
                          backgroundColor: 'rgba(239, 68, 68, 0.5)',
                        },
                      }),
                      input: (base) => ({
                        ...base,
                        color: 'white',
                      }),
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">الإحصائيات</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      placeholder="عدد المستخدمين"
                      className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                      value={formData.stats.users}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stats: { ...formData.stats, users: e.target.value },
                        })
                      }
                    />
                    <input
                      placeholder="التقييم"
                      className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                      value={formData.stats.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stats: { ...formData.stats, rating: e.target.value },
                        })
                      }
                    />
                    <input
                      placeholder="المعاملات"
                      className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                      value={formData.stats.transactions}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stats: { ...formData.stats, transactions: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  
                  <label className="block text-white font-semibold mb-2">اللون</label>
                  <input
                    type="color"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">التدرج اللوني</label>
                  <input
                    placeholder="التدرج, مثال: from-emerald-500 to-teal-500"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.gradient}
                    onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">تاريخ التسليم</label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">مدة المشروع</label>
                  <input
                    placeholder="مدة المشروع"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">حجم الفريق</label>
                  <input
                    placeholder="حجم الفريق"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.team_size}
                    onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">العميل</label>
                  <input
                    placeholder="اسم العميل"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white font-semibold mb-2">رابط الموقع</label>
                  <input
                    placeholder="رابط الموقع"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                <label className="block text-white font-semibold mb-2">رابط قصّة المشروع</label>
                  <input
                    placeholder="رابط دراسة الحالة"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.case_study_url}
                    onChange={(e) => setFormData({ ...formData, case_study_url: e.target.value })}
                  />
                </div>
                <div className="col-span-2 ">
                  <label className="block text-white font-semibold mb-2">الحالة</label>
                  <select
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-emerald-500/30 text-white focus:ring-2 focus:ring-emerald-400"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option>مسودة</option>
                    <option>منشور</option>
                  </select>
                </div>
                {(isEditing || newProjectId) && (editId || newProjectId) && (
                  <div className="col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <MessageSquare size={20} className="text-emerald-400" />
                      آراء العملاء
                    </h3>
                    <ReviewForm
                      projectId={editId || newProjectId}
                      onAddReview={handleAddReview}
                      onUpdateReview={handleUpdateReview}
                      isAddingReview={isAddingReview}
                      setIsAddingReview={setIsAddingReview}
                      editingReview={editingReview}
                      setEditingReview={setEditingReview}
                    />
                    <div className="mt-4 space-y-4">
                      {isLoadingReviews ? (
                        <motion.p variants={itemVariants} className="text-center text-gray-300">
                          جاري تحميل الآراء...
                        </motion.p>
                      ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                          <motion.div
                            key={review.id}
                            variants={itemVariants}
                            className="p-4 bg-slate-800/30 rounded-xl border border-emerald-500/30 flex justify-between items-center"
                          >
                            <div>
                              <div className="flex gap-1 mb-2">
                                {[...Array(review.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <p className="text-white text-sm">{review.text}</p>
                              <p className="text-gray-400 text-xs">— {review.name}</p>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 bg-emerald-500/80 rounded-full text-white"
                                onClick={() => handleEditReview(review)}
                              >
                                <Edit size={16} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 bg-red-500/80 rounded-full text-white"
                                onClick={() => handleDeleteReview(review.id)}
                              >
                                <Trash2 size={16} />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.p variants={itemVariants} className="text-center text-gray-300">
                          لا توجد آراء متاحة لهذا المشروع
                        </motion.p>
                      )}
                    </div>
                  </div>
                )}
                <div className="col-span-2 flex gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="flex-1 p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    {isEditing ? 'تحديث' : 'إضافة'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    className="flex-1 p-3 bg-gray-600/50 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                    onClick={resetForm}
                    disabled={isAddingReview}
                  >
                    <X size={20} />
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-emerald-500/30 w-full max-w-md shadow-2xl"
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
                  className="flex-1 p-3 bg-gray-600/50 text-white rounded-xl font-bold"
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
              notification.type === 'success'
                ? 'bg-green-500/90'
                : notification.type === 'error'
                ? 'bg-red-500/90'
                : 'bg-blue-500/90'
            }`}
          >
            {notification.type === 'success' ? (
              <Check size={20} />
            ) : notification.type === 'error' ? (
              <X size={20} />
            ) : (
              <Info size={20} />
            )}
            {notification.message}
          </motion.div>
        )}
      </div>
    </div>
  );
}
