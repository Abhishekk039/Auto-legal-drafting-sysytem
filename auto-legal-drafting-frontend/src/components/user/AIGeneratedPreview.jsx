import React from 'react';

function AIGeneratedPreview({ document }) {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">AI-Generated Preview</h2>
        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
          <span>✨ Generated with AI</span>
        </div>
      </div>

      {/* Document Preview */}
      <div className="prose prose-sm max-w-none bg-gray-50 p-8 rounded-lg border border-gray-200">

        {/* Certificate Layout */}
        {document?.template_id?.includes('Certificate') ? (
          <div className="border-8 border-double border-gray-300 p-8 text-center bg-white">
            <div className="mb-8">
              <span className="text-6xl">🎓</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2 uppercase tracking-widest">
              {document.template_id}
            </h1>
            <p className="text-gray-500 italic mb-8">This is to certify that</p>

            <h2 className="text-4xl font-serif font-bold text-blue-900 mb-8 border-b-2 border-blue-900 inline-block px-8 pb-2">
              {document?.fields?.intern_name || document?.fields?.employee_name || document?.fields?.recipient_name}
            </h2>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {document.template_id === 'Internship Certificate' && (
                <>
                  has successfully completed an internship in the <strong>{document?.fields?.department}</strong> department
                  from <strong>{document?.fields?.start_date}</strong> to <strong>{document?.fields?.end_date}</strong>.
                </>
              )}
              {document.template_id === 'Experience Certificate' && (
                <>
                  has worked with <strong>{document?.fields?.company_name}</strong> as <strong>{document?.fields?.designation}</strong>
                  from <strong>{document?.fields?.joining_date}</strong> to <strong>{document?.fields?.relieving_date}</strong>.
                </>
              )}
              {document.template_id === 'Appreciation Certificate' && (
                <>
                  is hereby awarded this certificate for <strong>{document?.fields?.achievement}</strong>.
                </>
              )}
            </p>

            <div className="flex justify-between items-end mt-16 px-12">
              <div className="text-center">
                <p className="text-gray-900 font-bold border-t border-gray-400 pt-2 px-4">
                  {document?.fields?.date || new Date().toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
              </div>
              <div className="text-center">
                <div className="h-12 mb-2">
                  {/* Signature Placeholder */}
                  <span className="font-script text-2xl text-blue-800">Signed</span>
                </div>
                <p className="text-gray-900 font-bold border-t border-gray-400 pt-2 px-4">
                  {document?.fields?.authorized_signatory || document?.fields?.presenter_name || 'Authorized Signatory'}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Signature</p>
              </div>
            </div>
          </div>
        ) :

          /* Letter/Notice Layout */
          (document?.template_id?.includes('Letter') || document?.template_id?.includes('Notice')) ? (
            <div className="bg-white p-8 shadow-sm">
              <div className="mb-8 text-right text-gray-600">
                {new Date().toLocaleDateString()}
              </div>

              <div className="mb-8">
                <p className="font-bold text-gray-900">To,</p>
                <p className="text-gray-800">{document?.fields?.recipient_name || document?.fields?.candidate_name || document?.fields?.debtor_name || document?.fields?.manager_name}</p>
                {document?.fields?.recipient_address && (
                  <p className="text-gray-600 whitespace-pre-wrap">{document?.fields?.recipient_address}</p>
                )}
                {document?.fields?.company_name && (
                  <p className="text-gray-600">{document?.fields?.company_name}</p>
                )}
              </div>

              {document?.fields?.subject && (
                <div className="mb-6 font-bold text-gray-900 underline">
                  Subject: {document.fields.subject}
                </div>
              )}

              <div className="mb-6 text-gray-800 leading-relaxed whitespace-pre-wrap">
                <p className="mb-4">Dear {document?.fields?.recipient_name?.split(' ')[0] || 'Sir/Madam'},</p>

                {document.template_id === 'Offer Letter' && (
                  <p>
                    We are pleased to offer you the position of <strong>{document?.fields?.position}</strong> at <strong>{document?.fields?.company_name}</strong>.
                    Your annual salary will be <strong>{document?.fields?.salary}</strong> and your start date will be <strong>{document?.fields?.start_date}</strong>.
                  </p>
                )}

                {document.template_id === 'Legal Notice' && (
                  <>
                    <p className="mb-4">
                      I am writing to formally notify you regarding: <strong>{document?.fields?.grievance}</strong>.
                    </p>
                    <p>
                      I hereby demand that you: <strong>{document?.fields?.demand}</strong>.
                    </p>
                  </>
                )}

                {document.template_id === 'Demand Letter' && (
                  <p>
                    This is to remind you that an amount of <strong>{document?.fields?.amount_due}</strong> was due on <strong>{document?.fields?.due_date}</strong>.
                    Please clear this payment by <strong>{document?.fields?.payment_deadline}</strong> to avoid further action.
                  </p>
                )}

                {document.template_id === 'Resignation Letter' && (
                  <p>
                    Please accept this letter as formal notification that I am resigning from my position as <strong>{document?.fields?.position}</strong>.
                    My last day will be <strong>{document?.fields?.last_working_day}</strong>.
                    {document?.fields?.reason && <><br /><br />Reason: {document.fields.reason}</>}
                  </p>
                )}
              </div>

              <div className="mt-12">
                <p className="text-gray-800">Sincerely,</p>
                <br />
                <p className="font-bold text-gray-900">{document?.fields?.sender_name || 'Signature'}</p>
              </div>
            </div>
          ) :

            /* Email Layout */
            document?.template_id?.includes('Email') ? (
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4 border-b">
                  <div className="flex gap-2 mb-2">
                    <span className="text-gray-500 w-16 text-right">To:</span>
                    <span className="text-gray-900">{document?.fields?.recipient_name}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-16 text-right">Subject:</span>
                    <span className="font-medium text-gray-900">{document?.fields?.subject || 'No Subject'}</span>
                  </div>
                </div>
                <div className="p-6 text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {document?.fields?.message_body || document?.fields?.value_proposition}

                  {document?.fields?.call_to_action && (
                    <p className="mt-4 font-medium text-blue-600">
                      👉 {document.fields.call_to_action}
                    </p>
                  )}
                </div>
              </div>
            ) :

              /* Default Agreement Layout */
              (
                <>
                  <h1 className="text-2xl font-bold mb-4">{document?.template_id}</h1>

                  <p className="text-gray-700 mb-6">
                    <strong>This Agreement is made on:</strong> [Current Date]
                  </p>

                  <h2 className="text-lg font-bold mb-4 mt-6">PARTIES:</h2>
                  <p className="text-gray-700 mb-2">
                    <strong>Party A:</strong> {document?.fields?.partyA_name}
                  </p>
                  <p className="text-gray-700 mb-6">
                    <strong>Party B:</strong> {document?.fields?.partyB_name}
                  </p>

                  <h2 className="text-lg font-bold mb-4 mt-6">PURPOSE:</h2>
                  <p className="text-gray-700 mb-6">{document?.fields?.purpose}</p>

                  <h2 className="text-lg font-bold mb-4 mt-6">TERMS & CONDITIONS:</h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                    <li>All parties agree to comply with applicable laws</li>
                    <li>Confidentiality must be maintained</li>
                    <li>Disputes shall be resolved through mediation</li>
                    <li>This agreement is effective from {document?.fields?.effective_date}</li>
                  </ol>

                  <h2 className="text-lg font-bold mb-4 mt-6">GOVERNING LAW:</h2>
                  <p className="text-gray-700 mb-6">
                    This agreement shall be governed by the laws of {document?.fields?.governing_law}.
                  </p>

                  <hr className="my-8" />

                  <div className="grid grid-cols-2 gap-8 mt-8">
                    <div>
                      <p className="text-gray-700 mb-4">_____________________________</p>
                      <p className="text-gray-700">
                        <strong>Signature of Party A</strong>
                      </p>
                      <p className="text-gray-600">Date: __________________</p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-4">_____________________________</p>
                      <p className="text-gray-700">
                        <strong>Signature of Party B</strong>
                      </p>
                      <p className="text-gray-600">Date: __________________</p>
                    </div>
                  </div>
                </>
              )}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> This is an AI-generated preview. You can edit and customize it before downloading or sending to a lawyer for review.
        </p>
      </div>
    </div>
  );
}

export default AIGeneratedPreview;
