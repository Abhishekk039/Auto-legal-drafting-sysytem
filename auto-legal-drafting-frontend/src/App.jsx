import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// User Pages
import UserDashboardPage from './pages/user/UserDashboardPage';
import CreateDocumentPage from './pages/user/CreateDocumentPage';
import EditDocumentPage from './pages/user/EditDocumentPage';
import LawyerConnectPage from './pages/user/LawyerConnectPage';
import MyDocumentsPage from './pages/user/MyDocumentsPage';
import UserProfilePage from './pages/user/ProfilePage';

// Lawyer Pages
import LawyerDashboardPage from './pages/lawyer/LawyerDashboardPage';
import ReviewPage from './pages/lawyer/ReviewPage';
import LawyerProfilePage from './pages/lawyer/ProfilePage';
import EarningsPage from './pages/lawyer/EarningsPage';
import ReviewsPage from './pages/lawyer/ReviewsPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import VerificationPage from './pages/admin/VerificationPage';
import ModerationPage from './pages/admin/ModerationPage';
import DisputePage from './pages/admin/DisputePage';
import SettingsPage from './pages/admin/SettingsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import AuditPage from './pages/admin/AuditPage';

// 404 Page
import NotFoundPage from './pages/404Page';

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar />}

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* User Routes */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/create-document"
              element={
                <ProtectedRoute requiredRole="user">
                  <CreateDocumentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/edit-document/:id"
              element={
                <ProtectedRoute requiredRole="user">
                  <EditDocumentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/lawyer-connect"
              element={
                <ProtectedRoute requiredRole="user">
                  <LawyerConnectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/my-documents"
              element={
                <ProtectedRoute requiredRole="user">
                  <MyDocumentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Lawyer Routes */}
            <Route
              path="/lawyer/dashboard"
              element={
                <ProtectedRoute requiredRole="lawyer">
                  <LawyerDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lawyer/review/:requestId"
              element={
                <ProtectedRoute requiredRole="lawyer">
                  <ReviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lawyer/profile"
              element={
                <ProtectedRoute requiredRole="lawyer">
                  <LawyerProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lawyer/earnings"
              element={
                <ProtectedRoute requiredRole="lawyer">
                  <EarningsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lawyer/reviews"
              element={
                <ProtectedRoute requiredRole="lawyer">
                  <ReviewsPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/verification"
              element={
                <ProtectedRoute requiredRole="admin">
                  <VerificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/moderation"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ModerationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/disputes"
              element={
                <ProtectedRoute requiredRole="admin">
                  <DisputePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/audit"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AuditPage />
                </ProtectedRoute>
              }
            />

            {/* Default & 404 Routes */}
            <Route path="/" element={isAuthenticated ? <Navigate to={`/${user?.role}/dashboard`} /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
