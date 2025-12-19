import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import BookingPage from "./pages/BookingPage";
import GuestPortal from "./pages/GuestPortal";
import OperatorDashboard from "./pages/OperatorDashboard";
import LoginPage from "./pages/LoginPage";
import AdminLogin from "./pages/AdminLogin";
import './index.css'

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/guest-portal" element={<GuestPortal />} />
          <Route path="/operator-dashboard" element={<OperatorDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
