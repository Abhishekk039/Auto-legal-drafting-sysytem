import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviewRequests, setInProgressReviews, setCompletedReviews } from '../../store/slices/lawyerSlice';
import { reviewAPI } from '../../utils/api';
import PendingRequests from './PendingRequests';
import EarningsStats from './EarningsStats';

function LawyerDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    reviewRequests,
    inProgressReviews,
    completedReviews,
    earnings,
    ratings,
    availability,
    stats
  } = useSelector((state) => state.lawyer);

  useEffect(() => {
    // Load reviews from API
    const fetchReviews = async () => {
      try {
        const response = await reviewAPI.getReviews();
        const allReviews = response.data.data || [];

        const pending = allReviews.filter((r) => r.status === 'pending');
        const inProgress = allReviews.filter((r) => r.status === 'in_progress');
        const completed = allReviews.filter((r) => r.status === 'completed');

        dispatch(setReviewRequests(pending));
        dispatch(setInProgressReviews(inProgress));
        dispatch(setCompletedReviews(completed));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name}! 👨‍⚖️
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your document reviews and connect with clients
          </p>
        </div>

        {/* Availability Status */}
        <div className="mb-8 bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Your Status</p>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className={`w-3 h-3 rounded-full ${availability.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                ></div>
                <p className="text-lg font-bold text-gray-900">
                  {availability.isOnline ? 'Online' : 'Offline'}
                  {availability.isBusy && ' (Busy)'}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition">
                🟢 Go Online
              </button>
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition">
                ⏸️ Go Busy
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Pending Requests */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {reviewRequests.length}
                </p>
              </div>
              <div className="text-4xl opacity-20">📋</div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {inProgressReviews.length}
                </p>
              </div>
              <div className="text-4xl opacity-20">⏳</div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalReviewsCompleted}
                </p>
              </div>
              <div className="text-4xl opacity-20">✅</div>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Rating</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-3xl font-bold text-gray-900">
                    {ratings.averageRating}
                  </p>
                  <span className="text-yellow-400">⭐</span>
                </div>
              </div>
              <div className="text-4xl opacity-20">⭐</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Requests */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pending Requests</h2>
            {reviewRequests.length > 0 ? (
              <PendingRequests requests={reviewRequests} />
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-gray-600">No pending requests</p>
              </div>
            )}
          </div>

          {/* Earnings & Quick Stats */}
          <div className="space-y-6">
            {/* Earnings Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Earnings</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{earnings.thisMonth.toLocaleString()}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600">Pending Payout</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{earnings.pendingPayout.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">
                  👁️ View Profile
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">
                  💰 View Earnings
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">
                  ⭐ View Reviews
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700">
                  ⚙️ Settings
                </button>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Acceptance Rate</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${stats.acceptanceRate}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-700 font-medium mt-1">
                    {stats.acceptanceRate}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Avg Response Time</p>
                  <p className="text-gray-900 font-medium">{stats.averageResponseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerDashboard;
