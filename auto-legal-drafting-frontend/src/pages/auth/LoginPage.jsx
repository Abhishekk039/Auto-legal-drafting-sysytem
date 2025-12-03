import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

function LoginPage() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${role}/dashboard`);
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              ⚖️
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AutoLegal</h1>
          </div>
          <p className="text-lg text-gray-600">Intelligent Legal Document Automation</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Info Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast & Secure</h3>
              <p className="text-sm text-gray-600">
                Enterprise-grade security with instant document generation
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Powered</h3>
              <p className="text-sm text-gray-600">
                Intelligent suggestions powered by advanced AI models
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">👨‍⚖️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Review</h3>
              <p className="text-sm text-gray-600">
                Connect with experienced lawyers for professional guidance
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            <div className="p-6 max-w-md mx-auto">
              <p className="text-gray-600 mb-3">
                This is a production-ready legal document automation system. Choose your role and sign in.
              </p>
              <div className="text-sm text-gray-500">
                • <strong>User</strong>: Create and manage legal documents
                <br />
                • <strong>Lawyer</strong>: Review and approve documents
                <br />
                • <strong>Admin</strong>: Manage users and system
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
