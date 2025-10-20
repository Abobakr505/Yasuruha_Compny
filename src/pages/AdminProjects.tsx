import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Download, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function AdminProjects() {
  const [projects] = useState([
    { id: 1, title: 'منصة التجارة', category: 'متجر', status: 'منشور', date: '2025-01-15' },
    { id: 2, title: 'تطبيق صحي', category: 'صحة', status: 'مسودة', date: '2025-02-10' },
    { id: 3, title: 'نظام ERP', category: 'أعمال', status: 'منشور', date: '2025-01-20' },
  ]);

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
                      <div className="text-gray-300">{project.date}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-blue-400 hover:text-blue-300">
                          <Eye size={16} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-emerald-400 hover:text-emerald-300">
                          <Edit size={16} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-purple-400 hover:text-purple-300">
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

        {/* Quick Add Form */}
        <motion.div 
          variants={containerVariants}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Plus size={20} className="text-emerald-400" />
            إضافة مشروع سريع
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <input placeholder="عنوان المشروع" className="p-3 rounded-xl bg-white/10 border border-white/20 text-white" />
            <input placeholder="الفئة" className="p-3 rounded-xl bg-white/10 border border-white/20 text-white" />
            <select className="p-3 rounded-xl bg-white/10 border border-white/20 text-white">
              <option>مسودة</option>
              <option>منشور</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold"
            >
              إضافة
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}