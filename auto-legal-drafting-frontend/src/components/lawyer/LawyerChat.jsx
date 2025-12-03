import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

function LawyerChat({ requestId }) {
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'client',
      senderName: 'Rajesh Kumar',
      text: 'Hi, can you review this NDA? I have some questions about clause 3.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: 2,
      sender: 'lawyer',
      senderName: user?.name,
      text: 'Of course! Clause 3 is about confidentiality period. Let me clarify that for you.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      const message = {
        id: messages.length + 1,
        sender: 'lawyer',
        senderName: user?.name,
        text: newMessage,
        timestamp: new Date(),
      };

      setMessages([...messages, message]);
      setNewMessage('');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-96">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4">
        <h3 className="font-bold">Client Discussion - {requestId}</h3>
        <p className="text-sm opacity-90">Rajesh Kumar</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'lawyer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'lawyer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.sender === 'client' && (
                <p className="text-xs font-semibold opacity-75 mb-1">
                  {message.senderName}
                </p>
              )}
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 opacity-70`}
              >
                {message.timestamp.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {loading ? '...' : '📤'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LawyerChat;
