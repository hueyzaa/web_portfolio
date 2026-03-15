import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProjectDetail from '../pages/Portfolio/ProjectDetail';
import AdminLogin from '../pages/Admin/Login';
import Dashboard from '../pages/Admin/Dashboard';
import ProjectsManager from '../pages/Admin/ProjectsManager';
import AdminLayout from '../components/admin/AdminLayout';
import AboutSettings from '../pages/Admin/AboutSettings';
import SkillsManager from '../pages/Admin/SkillsManager';
import ServicesManager from '../pages/Admin/ServicesManager';
import ContactReports from '../pages/Admin/ContactReports';
import CategoriesManager from '../pages/Admin/CategoriesManager';
import MainSettings from '../pages/Admin/MainSettings';
import FooterSettings from '../pages/Admin/FooterSettings';
import ContactSettings from '../pages/Admin/ContactSettings';
import AccountManager from '../pages/Admin/AccountManager';
import NewsManager from '../pages/Admin/NewsManager';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<LandingPage />} />
      <Route path="/portfolio" element={<LandingPage />} />
      <Route path="/skills" element={<LandingPage />} />
      <Route path="/services" element={<LandingPage />} />
      <Route path="/contact" element={<LandingPage />} />
      <Route path="/blog" element={<LandingPage />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts" element={<AccountManager />} />
        <Route path="settings/main" element={<MainSettings />} />
        <Route path="settings/footer" element={<FooterSettings />} />
        <Route path="settings/contact" element={<ContactSettings />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="news" element={<NewsManager />} />
        <Route path="categories" element={<CategoriesManager />} />
        <Route path="about" element={<AboutSettings />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="contact" element={<ContactReports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
