import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { acceptReviewRequest } from '../../store/slices/lawyerSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import toast from 'react-hot-toast';

function PendingRequests({ requests }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPricingInfo = (tier) => {
    const info = {
      quick: { label: 'Quick Review', price: '₹199', time: '6 hours' },
      standard: { label: 'Standard Review', price: '₹499', time: '24 hours' },
      premium: { label: 'Premium Review', price: '₹999', time: '1-2 hours' },
    };
    return info[tier] || info.standard;
  };

  const handleAccept = (requestId) => {
    dispatch(acceptReviewRequest(requestId));
    dispatch(
      addNotification({
        type: 'message',
        title: 'Review Request Accepted',
        message: 'You have accepted a new review request',
      })
    );
    toast.success('Review request accepted!');
    navigate(`/lawyer/review/${requestId}`);
  };

  const handleReject = (requestId) => {
    // Simulate rejection
    toast.success('Review request rejected');
  };

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-600">No pending requests at the moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const pricing = getPricingInfo(request.price_tier);
        return (
          <div
            key={request._id}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600 hover:shadow-lg transition"
          >
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Request Info */}
              <div>
                <p className="text-sm text-gray-600 font-medium">Request ID</p>
                <p className="text-sm font-mono text-gray-900">{request._id}</p>
              </div>

              {/* Pricing Tier */}
              <div>
                <p className="text-sm text-gray-600 font-medium">Review Type</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {pricing.label}
                  </span>
                  <span className="font-bold text-gray-900">{pricing.price}</span>
                </div>
              </div>

              {/* SLA */}
              <div>
                <p className="text-sm text-gray-600 font-medium">SLA</p>
                <p className="text-sm font-medium text-gray-900">
                  Complete in {pricing.time}
                </p>
              </div>
            </div>

            {/* Document Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 font-medium mb-2">Document to Review</p>
              <p className="text-sm font-medium text-gray-900">
                📄 {request.document_id} ({request.user_id})
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => handleAccept(request._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                ✅ Accept Request
              </button>
              <button
                onClick={() => handleReject(request._id)}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-lg transition"
              >
                ❌ Decline
              </button>
              <button
                onClick={() => navigate(`/lawyer/review/${request._id}`)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                👁️ Preview
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PendingRequests;
