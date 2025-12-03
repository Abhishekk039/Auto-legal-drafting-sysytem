import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { completeReview } from '../../store/slices/lawyerSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import AnnotationTool from './AnnotationTool';
import FeedbackForm from './FeedbackForm';
import LawyerChat from './LawyerChat';
import toast from 'react-hot-toast';

function DocumentReview() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('document'); // 'document', 'feedback', 'chat'
  const [annotations, setAnnotations] = useState([]);
  const [showPreview, setShowPreview] = useState(true);

  // Mock document content
  const mockDocument = `# Non-Disclosure Agreement

## PARTIES:
This Agreement is entered into between TechCorp Industries and Innovation Labs Pvt Ltd.

## PURPOSE:
The purpose of this agreement is to discuss potential partnership and technology collaboration.

## TERMS & CONDITIONS:
1. All parties agree to comply with applicable laws
2. Confidentiality must be maintained
3. Disputes shall be resolved through mediation
4. This agreement is effective from 2024-11-25

## GOVERNING LAW:
This agreement shall be governed by the laws of India.`;

  const handleSubmitReview = (feedbackData) => {
    dispatch(completeReview(requestId));
    dispatch(
      addNotification({
        type: 'review_completed',
        title: 'Review Submitted',
        message: 'Your document review has been submitted successfully',
      })
    );
    toast.success('Review submitted successfully!');
    navigate('/lawyer/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Review Document</h1>
              <p className="text-gray-600 mt-1">Request ID: {requestId}</p>
            </div>
            <button
              onClick={() => navigate('/lawyer/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            {['document', 'feedback', 'chat'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'document' && '📄 Document'}
                {tab === 'feedback' && '📝 Feedback'}
                {tab === 'chat' && '💬 Chat'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'document' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Toolbar */}
                <div className="border-b border-gray-200 p-4 bg-gray-50 flex items-center gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm"
                  >
                    {showPreview ? '📝 Edit' : '👁️ Preview'}
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium text-sm">
                    💾 Save Annotations
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium text-sm">
                    📥 Download
                  </button>
                </div>

                {/* Document Area */}
                <div className="p-8 bg-gray-50 min-h-96">
                  {showPreview ? (
                    <div className="prose prose-sm max-w-none bg-white p-6 rounded-lg shadow-sm">
                      {mockDocument.split('\n').map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap text-gray-900">
                          {line}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <AnnotationTool
                      content={mockDocument}
                      annotations={annotations}
                      onAddAnnotation={(annotation) => {
                        setAnnotations([...annotations, annotation]);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Annotations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Annotations</h3>
              {annotations.length === 0 ? (
                <p className="text-gray-600 text-sm">No annotations yet</p>
              ) : (
                <div className="space-y-3">
                  {annotations.map((annotation, i) => (
                    <div
                      key={i}
                      className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <p className="text-xs font-medium text-yellow-800 mb-1">
                        {annotation.type.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-900">{annotation.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <FeedbackForm requestId={requestId} onSubmit={handleSubmitReview} />
        )}

        {activeTab === 'chat' && <LawyerChat requestId={requestId} />}
      </div>
    </div>
  );
}

export default DocumentReview;
