import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function DocumentList({ documents }) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Review' },
      reviewed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Reviewed' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getDocumentIcon = (docType) => {
    const icons = {
      'NDA': '🔐',
      'Employment Agreement': '👔',
      'Service Agreement': '📋',
      'Freelancer Agreement': '🤝',
      'Partnership Agreement': '🤲',
      'Vendor Agreement': '🏢',
      'Lease Agreement': '🏠',
      'Loan Agreement': '💰',
      'Software Development Agreement': '💻',
      'Consulting Agreement': '👨‍💼',
      'MoU': '📝',
      'POA': '✍️',
      'Shareholder Agreement': '📊',
      'Terms & Conditions': '⚖️',
      'Investment Agreement': '💼',
    };
    return icons[docType] || '📄';
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <div className="text-5xl mb-4">📋</div>
        <p className="text-gray-600">No documents to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr
                key={doc._id}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getDocumentIcon(doc.template_id)}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                      <p className="text-xs text-gray-500">{doc._id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700">{doc.template_id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(doc.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">
                    {formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/user/edit-document/${doc._id}`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/user/lawyer-connect`)}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Review
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentList;
