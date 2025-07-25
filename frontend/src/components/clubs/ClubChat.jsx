import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
const socket = io(API_URL); // Use env var for socket connection

function ClubChat({ clubId, clubName, clubIcon }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [forbidden, setForbidden] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      setError('');
      setForbidden(false);
      try {
        const token = localStorage.getItem('uniplay_token');
        const res = await fetch(`${API_URL}/api/clubs/clubs/${clubId}/chat`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 403) {
          setForbidden(true);
          setLoading(false);
          toast.error('You must join this club to access the chat.');
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch chat');
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError('Error fetching chat');
        toast.error('Error fetching chat');
      } finally {
        setLoading(false);
      }
    };
    fetchChat();
  }, [clubId]);

  useEffect(() => {
    socket.emit('joinClubRoom', clubId);
    socket.off('newClubMessage');
    socket.on('newClubMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socket.off('newClubMessage');
    };
  }, [clubId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    try {
      if (!user) {
        toast.error('User not found. Please log in again.');
        return;
      }
      socket.emit('clubChatMessage', {
        clubId,
        userId: user.id,
        text: input,
      });
      setInput('');
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading chat...</div>;
  if (forbidden) return <div className="text-center py-20 text-red-500">You must join this club to access the chat.</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col h-[70vh]">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{clubIcon}</span>
        <h2 className="text-2xl font-bold text-gray-800">{clubName} Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 rounded-xl p-4">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-4 flex items-start gap-3">
              <img
                src={msg.user.avatar || `https://ui-avatars.com/api/?name=${msg.user.name}`}
                alt={msg.user.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-blue-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">{msg.user.name}</span>
                  <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 mt-1 shadow text-gray-800">
                  {msg.text}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ClubChat; 