import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewRequest } from '../../store/slices/userSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import toast from 'react-hot-toast';

function ReviewRequest({ lawyer, onClose }) {
  const dispatch = useDispatch();
  const { documents } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    documentId: '',
    priceTier: 'standard',
    additionalNotes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.documentId) {
      toast.error('Please select a document');
      return;
    }

    setLoading(true);

    // Simulate sending request
    setTimeout(() => {
      const reviewRequest = {
        _id: `req_${Date.now()}`,
        document_id: formData.documentId,
        user_id: user._id,
        lawyer_id: lawyer._id,
        price_tier: formData.priceTier,
        status: 'pending',
        created_at: new Date(),
        sla_deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      dispatch(addReviewRequest(reviewRequest));

      // Add notification for lawyer
      dispatch(
        addNotification({
          type: 'review_request',
          title: 'New Review Request',
          message: `${user.name} has sent you a document for review`,
        })
      );

      toast.success('Review request sent successfully!');
      setLoading(false);
      onClose();
    }, 800);
  };

  const priceTierInfo = {
    quick: { label: 'Quick Review', time: '6 hours', price: lawyer.pricing.quick },
    standard: {
      label: 'Standard Review',
      time: '24 hours',
      price: lawyer.pricing.standard,
    },
    premium: {
      label: 'Premium Review',
      time: '1-2 hours',
      price: lawyer.pricing.premium,
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Document Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Document
        </label>
        <select
          value={formData.documentId}
          onChange={(e) =>
            setFormData({ ...formData, documentId: e.target.value })
          }
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">-- Select a document --</option>
          {documents.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.title}
            </option>
          ))}
        </select>
        {documents.length === 0 && (
          <p className="text-sm text-yellow-600 mt-2">
            No documents available. Create one first.
          </p>
        )}
      </div>

      {/* Price Tier Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Review Type
        </label>
        <div className="space-y-3">
          {Object.entries(priceTierInfo).map(([key, info]) => (
            <label
              key={key}
              className={`p-3 border-2 rounded-lg cursor-pointer transition ${
                formData.priceTier === key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="priceTier"
                  value={key}
                  checked={formData.priceTier === key}
                  onChange={(e) =>
                    setFormData({ ...formData, priceTier: e.target.value })
                  }
                  disabled={loading}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{info.label}</p>
                  <p className="text-sm text-gray-600">
                    Response within {info.time}
                  </p>
                </div>
                <p className="font-bold text-gray-900">₹{info.price}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Instructions (Optional)
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) =>
            setFormData({ ...formData, additionalNotes: e.target.value })
          }
          placeholder="Any specific areas you'd like the lawyer to focus on?"
          rows="3"
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Note:</strong> The lawyer will receive your request and can accept or
          decline. You'll be notified once they respond.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </div>
    </form>
  );
}

export default ReviewRequest;
