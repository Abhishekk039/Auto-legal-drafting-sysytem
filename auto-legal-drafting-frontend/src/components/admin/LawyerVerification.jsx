import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { approveLawyer, rejectLawyer } from '../../store/slices/adminSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import toast from 'react-hot-toast';

function PendingVerifications() {
  const dispatch = useDispatch();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);

  // Mock pending lawyers
  const pendingLawyers = [
    {
      _id: 'lawyer_pending_1',
      name: 'Adv. Rahul Sharma',
      email: 'rahul@example.com',
      qualifications: 'LLB, LLM',
      experience: '8 years',
      specializations: ['Corporate Law', 'Contract Law'],
      documents: ['Bar Certificate', 'Educational Certificate', 'ID Proof'],
      submittedAt: '2024-11-25',
    },
    {
      _id: 'lawyer_pending_2',
      name: 'Adv. Sneha Patel',
      email: 'sneha@example.com',
      qualifications: 'LLB',
      experience: '5 years',
      specializations: ['IP Law', 'Tech Law'],
      documents: ['Bar Certificate', 'ID Proof'],
      submittedAt: '2024-11-24',
    },
  ];

  const handleVerify = (lawyerId) => {
    dispatch(approveLawyer(lawyerId));
    dispatch(
      addNotification({
        type: 'approval',
        title: 'Lawyer Verified',
        message: `Lawyer ${lawyerId} has been verified`,
      })
    );
    toast.success('Lawyer verified successfully!');
  };

  const handleReject = (lawyerId) => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    dispatch(rejectLawyer(lawyerId, rejectionReason));
    dispatch(
      addNotification({
        type: 'alert',
        title: 'Lawyer Rejected',
        message: `Lawyer ${lawyerId} has been rejected`,
      })
    );
    toast.success('Lawyer rejected successfully!');
    setShowRejectModal(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-4">
      {pendingLawyers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-gray-600">No pending verifications</p>
        </div>
      ) : (
        pendingLawyers.map((lawyer) => (
          <div
            key={lawyer._id}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{lawyer.name}</h3>
                <p className="text-sm text-gray-600">{lawyer.email}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                  Pending
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Submitted {lawyer.submittedAt}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 py-4 border-t border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-600">Qualifications</p>
                <p className="font-medium text-gray-900">{lawyer.qualifications}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Experience</p>
                <p className="font-medium text-gray-900">{lawyer.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Specializations</p>
                <p className="font-medium text-gray-900">
                  {lawyer.specializations.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Documents</p>
                <p className="font-medium text-gray-900">{lawyer.documents.length}</p>
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-600 mb-2">SPECIALIZATIONS</p>
              <div className="flex flex-wrap gap-2">
                {lawyer.specializations.map((spec, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-600 mb-2">SUBMITTED DOCUMENTS</p>
              <ul className="space-y-1">
                {lawyer.documents.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    ✅ {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleVerify(lawyer._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                ✅ Approve & Verify
              </button>
              <button
                onClick={() => setShowRejectModal(lawyer._id)}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-lg transition"
              >
                ❌ Reject
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">
                👁️ Review
              </button>
            </div>

            {/* Rejection Modal */}
            {showRejectModal === lawyer._id && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this application is being rejected..."
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReject(lawyer._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Confirm Rejection
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectModal(null);
                      setRejectionReason('');
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default PendingVerifications;
