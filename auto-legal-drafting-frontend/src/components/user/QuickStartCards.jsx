import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/uiSlice';

function QuickStartCards() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quickStartItems = [
    {
      title: 'Create NDA',
      description: 'Non-Disclosure Agreement',
      icon: '🔐',
      docType: 'NDA',
    },
    {
      title: 'Employment Agreement',
      description: 'Employment Contract',
      icon: '👔',
      docType: 'Employment Agreement',
    },
    {
      title: 'Service Agreement',
      description: 'Service Contract',
      icon: '📋',
      docType: 'Service Agreement',
    },
    {
      title: 'Upload for Review',
      description: 'Send document to lawyer',
      icon: '📤',
      docType: 'upload',
    },
  ];

  const handleQuickStart = (docType) => {
    if (docType === 'upload') {
      navigate('/user/my-documents');
    } else {
      dispatch(setFilter({ key: 'documentType', value: docType }));
      navigate('/user/create-document');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStartItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleQuickStart(item.docType)}
          className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-left hover:border-blue-600 border-2 border-transparent"
        >
          <div className="text-4xl mb-3">{item.icon}</div>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          <div className="mt-4 text-blue-600 font-medium text-sm">
            Start Now →
          </div>
        </button>
      ))}
    </div>
  );
}

export default QuickStartCards;
