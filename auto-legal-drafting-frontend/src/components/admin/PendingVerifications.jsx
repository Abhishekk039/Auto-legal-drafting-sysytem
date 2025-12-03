import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPendingLawyers, approveLawyer, rejectLawyer } from '../../store/slices/adminSlice';
import LawyerKYCModal from './LawyerKYCModal';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiEye, FiClock, FiBriefcase, FiAward } from 'react-icons/fi';

function PendingVerifications() {
    const dispatch = useDispatch();
    const { pendingLawyers } = useSelector((state) => state.admin);
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [showKYCModal, setShowKYCModal] = useState(false);

    useEffect(() => {
        // Load pending lawyers - In production, this would be an API call
        const mockPendingLawyers = [
            {
                _id: 'pending_1',
                name: 'Adv. Rahul Kumar',
                email: 'rahul.kumar@lawfirm.com',
                phone: '+91-9876543220',
                avatar: 'https://i.pravatar.cc/150?img=11',
                specializations: ['Corporate Law', 'Contract Law', 'M&A'],
                experience_years: 6,
                bar_council_id: 'BC/2018/12345',
                submitted_at: '2024-11-28T10:30:00',
                kyc_documents: {
                    bar_council_certificate: 'https://example.com/docs/bar_cert.pdf',
                    id_proof: 'https://example.com/docs/id_proof.pdf',
                    address_proof: 'https://example.com/docs/address_proof.pdf',
                    degree_certificate: 'https://example.com/docs/degree.pdf',
                },
            },
            {
                _id: 'pending_2',
                name: 'Adv. Sneha Reddy',
                email: 'sneha.reddy@legalservices.com',
                phone: '+91-9876543221',
                avatar: 'https://i.pravatar.cc/150?img=12',
                specializations: ['Family Law', 'Property Law', 'Civil Litigation'],
                experience_years: 9,
                bar_council_id: 'BC/2015/67890',
                submitted_at: '2024-11-27T14:20:00',
                kyc_documents: {
                    bar_council_certificate: 'https://example.com/docs/bar_cert2.pdf',
                    id_proof: 'https://example.com/docs/id_proof2.pdf',
                    address_proof: 'https://example.com/docs/address_proof2.pdf',
                    degree_certificate: 'https://example.com/docs/degree2.pdf',
                },
            },
            {
                _id: 'pending_3',
                name: 'Adv. Arjun Mehta',
                email: 'arjun.mehta@advocates.in',
                phone: '+91-9876543222',
                avatar: 'https://i.pravatar.cc/150?img=13',
                specializations: ['IP Law', 'Tech Law', 'Startup Legal'],
                experience_years: 4,
                bar_council_id: 'BC/2020/11223',
                submitted_at: '2024-11-26T09:15:00',
                kyc_documents: {
                    bar_council_certificate: 'https://example.com/docs/bar_cert3.pdf',
                    id_proof: 'https://example.com/docs/id_proof3.pdf',
                    address_proof: 'https://example.com/docs/address_proof3.pdf',
                    degree_certificate: 'https://example.com/docs/degree3.pdf',
                },
            },
        ];
        dispatch(setPendingLawyers(mockPendingLawyers));
    }, [dispatch]);

    const handleViewKYC = (lawyer) => {
        setSelectedLawyer(lawyer);
        setShowKYCModal(true);
    };

    const handleApprove = (lawyerId, lawyerName) => {
        dispatch(approveLawyer(lawyerId));
        toast.success(`${lawyerName} has been approved and verified! 🎉`);
        setShowKYCModal(false);
    };

    const handleReject = (lawyerId, lawyerName) => {
        dispatch(rejectLawyer(lawyerId));
        toast.error(`${lawyerName}'s application has been rejected.`);
        setShowKYCModal(false);
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const submitted = new Date(timestamp);
        const diffMs = now - submitted;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return 'Just now';
    };

    if (!pendingLawyers || pendingLawyers.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up! 🎉</h3>
                <p className="text-gray-600">No pending lawyer verifications at the moment.</p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {pendingLawyers.map((lawyer) => (
                    <div
                        key={lawyer._id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200"
                    >
                        <div className="flex items-start justify-between">
                            {/* Lawyer Info */}
                            <div className="flex items-start space-x-4 flex-1">
                                <img
                                    src={lawyer.avatar}
                                    alt={lawyer.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900">{lawyer.name}</h3>
                                        <span className="px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                                            Pending
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{lawyer.email}</p>
                                    <p className="text-sm text-gray-600 mb-3">{lawyer.phone}</p>

                                    {/* Specializations */}
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FiBriefcase className="w-4 h-4 text-gray-500" />
                                        <div className="flex flex-wrap gap-2">
                                            {lawyer.specializations.map((spec, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Experience & Bar Council */}
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <FiAward className="w-4 h-4" />
                                            <span>{lawyer.experience_years} years experience</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className="font-medium">Bar Council:</span>
                                            <span>{lawyer.bar_council_id}</span>
                                        </div>
                                    </div>

                                    {/* Submitted Time */}
                                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-2">
                                        <FiClock className="w-3 h-3" />
                                        <span>Submitted {getTimeAgo(lawyer.submitted_at)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-2 ml-4">
                                <button
                                    onClick={() => handleViewKYC(lawyer)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                                >
                                    <FiEye className="w-4 h-4" />
                                    <span>View KYC</span>
                                </button>
                                <button
                                    onClick={() => handleApprove(lawyer._id, lawyer.name)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                                >
                                    <FiCheckCircle className="w-4 h-4" />
                                    <span>Approve</span>
                                </button>
                                <button
                                    onClick={() => handleReject(lawyer._id, lawyer.name)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                                >
                                    <FiXCircle className="w-4 h-4" />
                                    <span>Reject</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* KYC Modal */}
            {showKYCModal && selectedLawyer && (
                <LawyerKYCModal
                    lawyer={selectedLawyer}
                    onClose={() => setShowKYCModal(false)}
                    onApprove={() => handleApprove(selectedLawyer._id, selectedLawyer.name)}
                    onReject={() => handleReject(selectedLawyer._id, selectedLawyer.name)}
                />
            )}
        </>
    );
}

export default PendingVerifications;
