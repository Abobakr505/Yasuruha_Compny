import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <WhatsAppButton/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
