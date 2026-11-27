
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/mainLayout";

// Public website pages
import Home from "./pages/home";
import Services from "./pages/services";
import About from "./pages/about";
import Contact from "./pages/contact";

// Admin pages
import AdminLogin from "./admin/pages/adminLogin";
import AdminDashboard from "./admin/pages/adminDashboard";
import AdminLayout from "./admin/pages/adminLayout";
import AdminServices from "./admin/pages/services";
import AdminRoadmap from "./admin/pages/roadmap";
import AdminTeam from "./admin/pages/teamManagement";

import ProtectedRoute from "./admin/components/protectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Admin Login */}
      <Route path="admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="services" element={<AdminServices />} />

        <Route path="roadmap" element={<AdminRoadmap />} />

        <Route path="team" element={<AdminTeam />} />
      </Route>
    </Routes>
  );
}

export default App;
