import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../../components/auth/SignupForm';

function SignupPage() {
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
          <p className="text-lg text-gray-600">Create Your Account</p>
        </div>

        {/* Signup Form */}
        <SignupForm />

        {/* Benefits Section */}
        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Why Join AutoLegal?</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Create Legal Documents in Minutes</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Generate professionally drafted legal documents instantly with our AI-powered system
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Expert Lawyer Reviews</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Get your documents reviewed by experienced legal professionals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Secure & Compliant</h4>
                <p className="text-sm text-gray-600 mt-1">
                  All documents are encrypted and stored securely with full compliance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Save Time & Money</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Reduce legal document preparation costs by up to 80%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
