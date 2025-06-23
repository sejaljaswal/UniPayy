import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { Send, MessageCircle, Users, Smile } from 'lucide-react';

function ChatSection({ gameId, gameName }) {
  const { getGameMessages, sendMessage } = useApp();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(getGameMessages(gameId));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(getGameMessages(gameId));
  }, [gameId, getGameMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    sendMessage(gameId, user.id, user.name, user.avatar || '', message.trim());
    setMessage('');
    
    // Update local messages state
    setTimeout(() => {
      setMessages(getGameMessages(gameId));
    }, 100);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isToday = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    return messageDate.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{gameName} Chat</h3>
            <p className="text-sm text-gray-600">Team coordination and announcements</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <MessageCircle className="w-12 h-12 mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h4>
            <p className="text-gray-600">
              Be the first to start the conversation! Send a message to coordinate with your teammates.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <img
                src={msg.userAvatar}
                alt={msg.userName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{msg.userName}</span>
                  <span className="text-xs text-gray-500">
                    {isToday(msg.timestamp) ? formatTime(msg.timestamp) : new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2 inline-block max-w-full">
                  <p className="text-gray-900 break-words">{msg.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              maxLength={500}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Smile className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </form>
        
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>Press Enter to send</span>
          <span>{message.length}/500</span>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;