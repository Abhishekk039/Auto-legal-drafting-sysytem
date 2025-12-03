import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStats } from '../../store/slices/adminSlice';
import AdminStatsCards from './AdminStatsCards';
import PendingVerifications from './PendingVerifications';
import FlaggedReviews from './FlaggedReviews';

function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, pendingVerifications: pendingVerificationsCount, flaggedReviews: flaggedReviewsCount } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    // Admin stats will be loaded from backend API when admin routes are ready
    // For now, component will use default stats from Redux
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard 🛡️</h1>
          <p className="text-gray-600 mt-2">
            Monitor platform activity and manage user verifications
          </p>
        </div>

        {/* Stats Overview */}
        <AdminStatsCards stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Section - Pending Verifications & Disputes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Lawyer Verifications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📋 Pending Lawyer Verifications ({stats.pendingVerifications})
              </h2>
              <PendingVerifications />
            </div>

            {/* Flagged Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🚩 Flagged Reviews ({stats.flaggedReviews})
              </h2>
              <FlaggedReviews />
            </div>
          </div>

          {/* Right Section - Quick Stats */}
          <div className="space-y-6">
            {/* Platform Health */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Health</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Users</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-1">85% online</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">System Uptime</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-1">99.9% uptime</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">API Response</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-1">92ms avg</p>
                </div>
              </div>
            </div>

            {/* Recent Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Actions</h3>
              <div className="space-y-2 text-sm">
                {[
                  { action: 'Verified lawyer', user: 'Adv. Rahul Kumar', time: '2 min ago' },
                  { action: 'Resolved dispute', user: 'Dispute #245', time: '1 hour ago' },
                  { action: 'Suspended account', user: 'User #5432', time: '3 hours ago' },
                  { action: 'Approved payout', user: 'Lawyer #123', time: '5 hours ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-600">{item.user}</p>
                    </div>
                    <p className="text-xs text-gray-600">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">
                  👥 Manage Users
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">
                  👨‍⚖️ Manage Lawyers
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">
                  💬 View Disputes
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">
                  📊 Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
