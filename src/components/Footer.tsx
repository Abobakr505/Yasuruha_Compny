import { motion } from "framer-motion";
import {
  Code2,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0b101b] border-t border-emerald-500/20 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNiA2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNnptMCAxMGMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNCA0IDEuNzkgNCA0LTEuNzkgNC00IDR6IiBmaWxsPSJyZ2JhKDE2LCAxODUsIDEyOSwgMC4wMykiLz48L2c+PC9zdmc+')] opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bracket text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 ">
                {"<"}
              </span>
              <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400  text-3xl font-bold">
                {" "}
                يسِّرها
              </span>
              <span className="bracket text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 ">
                {">"}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              شركة رائدة في مجال تطوير البرمجيات والحلول الرقمية المبتكرة
            </p>
            <div className="flex space-x-4 space-x-reverse mt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.facebook.com/profile.php?id=61569823090886"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r from-emerald-500 to-cyan-500 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.tiktok.com/@yasuruha"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r from-emerald-500 to-cyan-500 transition-colors"
              >
                <FaTiktok size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/yasuruha1"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r from-emerald-500 to-cyan-500 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.youtube.com/@yasuruha"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r from-emerald-500 to-cyan-500 transition-colors"
              >
                <Youtube size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="tel:+20115818874"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <Phone size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-teal-400">
              روابط سريعة
            </h3>
            <div className="space-y-2 flex flex-col text-gray-400">
              <Link
                to="/about"
                className="hover:text-white transition-colors cursor-pointer"
              >
                {" "}
                 الرئيسية{" "}
              </Link>
              <Link
                to="/about"
                className="hover:text-white transition-colors cursor-pointer"
              >
                {" "}
                من نحن{" "}
              </Link>
              <Link
                to="/services"
                className="hover:text-white transition-colors cursor-pointer"
              >
                الخدمات
              </Link>
              <Link
                to="/projects"
                className="hover:text-white transition-colors cursor-pointer"
              >
                المشاريع
              </Link>
              <Link
                to="/contact"
                className="hover:text-white transition-colors cursor-pointer"
              >
               تواصل معنا
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-teal-400">
              تواصل معنا
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400" />
                <span>yasuruha1@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400" />
                <span dir="ltr">+20115818874</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span> سوهاج , مصر </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 flex justify-center items-center flex-col gap-4 border-t border-emerald-500/20 text-center text-gray-400"
        >
          <p>© 2025 يسرها. جميع الحقوق محفوظة.</p>
          <motion.div className="relative">
            <span className="Tiny5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-3xl">
              {"<"}
            </span>
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-xl font-bold animate-gradient-x "
            >
              {" "}
              يـسِّـرهـا و مـتـعـقـدهـاش{" "}
            </motion.span>
            <span className="Tiny5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-3xl">
              {">"}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
