import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentLayout } from './components/layout/StudentLayout';
import { AdminLayout } from './components/layout/AdminLayout';

import { Login } from './pages/auth/Login';
import { Dashboard as StudentDashboard } from './pages/student/Dashboard';
import { Projects as StudentProjects } from './pages/student/Projects';
import { ProjectDetails } from './pages/student/ProjectDetails';

import { Portfolio as StudentPortfolio } from './pages/student/Portfolio';
import { Settings as StudentSettings } from './pages/student/Settings';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StudentsList as AdminStudents } from './pages/admin/StudentsList';
import { ProjectReview as AdminProjectReview } from './pages/admin/ProjectReview';
import { Reports as AdminReports } from './pages/admin/Reports';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="projects" element={<StudentProjects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="portfolio" element={<StudentPortfolio />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="projects/:id" element={<AdminProjectReview />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
