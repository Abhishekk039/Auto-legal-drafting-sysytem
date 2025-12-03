import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addDocument, updateDocument } from '../../store/slices/userSlice';
import toast from 'react-hot-toast';

function DocumentEditor({ document, isNew = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [editorContent, setEditorContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock AI-generated content
  const mockAIContent = `# ${document?.template_id || 'Document'}

## PARTIES:
This Agreement is entered into as of [DATE], between:

**Party A:** ${document?.fields?.partyA_name || '[Party A Name]'}
Address: [Address]

**Party B:** ${document?.fields?.partyB_name || '[Party B Name]'}
Address: [Address]

## 1. PURPOSE:
The purpose of this agreement is to ${document?.fields?.purpose || 'define the terms and conditions'}.

## 2. TERMS AND CONDITIONS:
The parties agree to the following terms and conditions:

- [Condition 1]
- [Condition 2]
- [Condition 3]

## 3. OBLIGATIONS:
Each party shall:
- Perform their obligations in good faith
- Comply with all applicable laws
- Maintain confidentiality as required

## 4. GOVERNING LAW:
This Agreement shall be governed by the laws of ${document?.fields?.governing_law || '[Jurisdiction]'}.

## 5. ENTIRE AGREEMENT:
This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations.

## 6. SIGNATURES:
IN WITNESS WHEREOF, the parties have executed this Agreement.

_________________________          _________________________
Party A Signature                  Party B Signature

_________________________          _________________________
Date                               Date
`;

  useEffect(() => {
    // Generate or load document content
    if (isNew) {
      setEditorContent(mockAIContent);
    } else {
      setEditorContent(document?.content || mockAIContent);
    }
  }, [document, isNew]);

  const handleSave = async () => {
    if (!editorContent.trim()) {
      toast.error('Document cannot be empty');
      return;
    }

    setIsSaving(true);

    // Simulate saving
    setTimeout(() => {
      const documentData = {
        ...document,
        _id: document?._id || `doc_${Date.now()}`,
        content: editorContent,
        owner_id: user?._id,
        status: 'draft',
        updated_at: new Date(),
      };

      if (isNew) {
        dispatch(addDocument(documentData));
        toast.success('Document created successfully!');
      } else {
        dispatch(updateDocument(documentData));
        toast.success('Document updated successfully!');
      }

      setIsSaving(false);
    }, 500);
  };

  const handleDownload = (format) => {
    const element = document.createElement('a');
    const file = new Blob([editorContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${document?.title || 'document'}.${format === 'pdf' ? 'pdf' : 'docx'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Document downloaded as ${format.toUpperCase()}`);
  };

  const handleSendReview = () => {
    if (!editorContent.trim()) {
      toast.error('Please save document first');
      return;
    }
    navigate('/user/lawyer-connect');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {document?.title || 'New Document'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isNew ? 'AI-Generated Draft' : 'Editing'}
              </p>
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              {showPreview ? '✏️ Edit' : '👁️ Preview'}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Toolbar */}
              <div className="border-b border-gray-200 p-4 bg-gray-50 flex items-center gap-2 flex-wrap">
                <button
                  title="Bold"
                  className="p-2 rounded hover:bg-gray-200 transition font-bold"
                >
                  B
                </button>
                <button
                  title="Italic"
                  className="p-2 rounded hover:bg-gray-200 transition italic"
                >
                  I
                </button>
                <button
                  title="Underline"
                  className="p-2 rounded hover:bg-gray-200 transition underline"
                >
                  U
                </button>
                <div className="border-l border-gray-300 mx-2"></div>
                <button
                  title="Heading 1"
                  className="p-2 rounded hover:bg-gray-200 transition text-sm font-semibold"
                >
                  H1
                </button>
                <button
                  title="Heading 2"
                  className="p-2 rounded hover:bg-gray-200 transition text-sm font-semibold"
                >
                  H2
                </button>
                <div className="border-l border-gray-300 mx-2"></div>
                <button
                  title="Bullet List"
                  className="p-2 rounded hover:bg-gray-200 transition"
                >
                  • List
                </button>
                <button
                  title="Numbered List"
                  className="p-2 rounded hover:bg-gray-200 transition"
                >
                  1. List
                </button>
              </div>

              {/* Editor Area */}
              {showPreview ? (
                <div className="p-8 prose prose-sm max-w-none bg-white min-h-96">
                  {editorContent.split('\n').map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap text-gray-900">
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full p-8 border-0 focus:ring-0 font-mono text-sm resize-none min-h-96"
                  placeholder="Document content..."
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Document Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Document Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="font-medium text-gray-900">{document?.template_id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                    Draft
                  </span>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-medium text-gray-900">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {isSaving ? '💾 Saving...' : '💾 Save Draft'}
              </button>

              <button
                onClick={handleSendReview}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                👨‍⚖️ Send to Lawyer
              </button>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">Download as:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleDownload('pdf')}
                    className="bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-3 rounded-lg transition text-sm"
                  >
                    📄 PDF
                  </button>
                  <button
                    onClick={() => handleDownload('docx')}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-3 rounded-lg transition text-sm"
                  >
                    📝 DOCX
                  </button>
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="font-semibold text-blue-900 mb-3">🤖 AI Suggestions</h3>
              <ul className="space-y-2 text-xs text-blue-800">
                <li>• Add liability clause</li>
                <li>• Include termination conditions</li>
                <li>• Add payment terms section</li>
                <li>• Review confidentiality clause</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentEditor;
