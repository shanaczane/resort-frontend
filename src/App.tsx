import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import BookingPage from "./pages/BookingPage";
import GuestPortal from "./pages/Guest/GuestPortal";
import OperatorDashboard from "./pages/Operator/OperatorDashboard";
import LoginPage from "./pages/Authentication/LoginPage";
import AdminLogin from "./pages/Authentication/AdminLogin";
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
