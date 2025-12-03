import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDocuments } from '../../store/slices/userSlice';
import { documentAPI } from '../../utils/api';
import QuickStartCards from './QuickStartCards';
import DocumentList from './DocumentList';

function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { documents, stats } = useSelector((state) => state.user);

  useEffect(() => {
    // Load user documents from API
    const fetchDocuments = async () => {
      try {
        const response = await documentAPI.getDocuments();
        dispatch(setDocuments(response.data.data || []));
      } catch (error) {
        console.error('Error fetching documents:', error);
        dispatch(setDocuments([]));
      }
    };
    fetchDocuments();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Create, manage, and get legal documents reviewed
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Documents Drafted */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Documents Drafted</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalDocuments}
                </p>
              </div>
              <div className="text-4xl opacity-20">📄</div>
            </div>
          </div>

          {/* Reviewed by Lawyers */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Reviewed by Lawyers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.reviewedByLawyers}
                </p>
              </div>
              <div className="text-4xl opacity-20">✅</div>
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Reviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.pendingReviews}
                </p>
              </div>
              <div className="text-4xl opacity-20">⏳</div>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
          <QuickStartCards />
        </div>

        {/* Recent Documents Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Documents</h2>
            <button
              onClick={() => navigate('/user/my-documents')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All →
            </button>
          </div>
          {documents.length > 0 ? (
            <DocumentList documents={documents.slice(0, 5)} />
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first legal document to get started
              </p>
              <button
                onClick={() => navigate('/user/create-document')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Create Document
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions & Certificates Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions & Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'Legal Notice', name: 'Legal Notice', icon: '⚖️' },
              { id: 'Demand Letter', name: 'Demand Letter', icon: '📢' },
              { id: 'Resignation Letter', name: 'Resignation Letter', icon: '👋' },
              { id: 'Professional Email', name: 'Professional Email', icon: '📧' },
              { id: 'Cold Outreach', name: 'Cold Outreach Email', icon: 'bs' },
              { id: 'Internship Certificate', name: 'Internship Certificate', icon: '🎓' },
              { id: 'Experience Certificate', name: 'Experience Certificate', icon: '⭐' },
              { id: 'Appreciation Certificate', name: 'Appreciation Certificate', icon: '🏆' },
              { id: 'Offer Letter', name: 'Offer Letter', icon: '🤝' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  dispatch({ type: 'ui/setFilter', payload: { key: 'documentType', value: item.id } });
                  navigate('/user/create-document');
                }}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center gap-3 border border-gray-100 hover:border-blue-500 text-left"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-gray-900">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use AutoLegal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  ⚡
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600 mt-2">
                  Generate professional legal documents in minutes, not days
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  🤖
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Powered</h3>
                <p className="text-gray-600 mt-2">
                  Smart suggestions and automatic clause generation
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  👨‍⚖️
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Expert Review</h3>
                <p className="text-gray-600 mt-2">
                  Connect with experienced lawyers for professional reviews
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  🔒
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Secure & Private</h3>
                <p className="text-gray-600 mt-2">
                  End-to-end encryption for all your legal documents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
