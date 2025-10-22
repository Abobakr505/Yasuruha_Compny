import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { WhatsAppButton } from './components/WhatsAppButton';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import AdminProjects from './pages/AdminProjects';
import Error404 from './pages/Error404';

function AppLayout() {
  const location = useLocation();

  // الصفحات التي نريد إخفاء الـ Navbar و Footer و زر واتساب فيها
  const hideLayoutPaths = ['/login', '/admin/projects'];

  // تحقق مما إذا كان المسار الحالي ضمن الصفحات المخفية
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>

      {!hideLayout && <WhatsAppButton />}
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
