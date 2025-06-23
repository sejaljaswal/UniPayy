import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, CreditCard } from 'lucide-react';

function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 rounded-3xl shadow-xl p-10 flex flex-col md:flex-row md:items-center gap-8 relative overflow-hidden">
        <div className="z-10">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=6d28d9&color=fff&size=128`}
            alt={user?.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl mb-4 md:mb-0"
          />
        </div>
        <div className="flex-1 text-white z-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow">{user?.name}</h1>
          </div>
          <p className="text-blue-100 mb-4 text-lg">Student ID: {user?.studentId}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-2xl drop-shadow">{user?.points || 0}</span>
                <span className="text-sm text-blue-100">Total Points</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-2xl drop-shadow">{user?.clubsJoined || 0}</span>
                <span className="text-sm text-blue-100">Clubs Joined</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-2xl drop-shadow">{user?.rank || '-'}</span>
                <span className="text-sm text-blue-100">Rank</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/10 rounded-full blur-2xl z-0" />
      </div>
      {/* Profile Information */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Profile Information</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <div className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg bg-gray-50 text-blue-900">
                {user?.name}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <div className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg bg-gray-50 text-blue-900">
                {user?.email}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">Student ID</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <div className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg bg-gray-50 text-blue-900">
                {user?.studentId}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Game History & Badges - Empty State */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <span className="text-5xl mb-4">🎮</span>
          <h3 className="text-2xl font-bold text-blue-900 mb-2">No game history yet</h3>
          <p className="text-blue-400 mb-4">Join or play games to see your history here.</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <span className="text-5xl mb-4">🏅</span>
          <h3 className="text-2xl font-bold text-blue-900 mb-2">No badges earned yet</h3>
          <p className="text-blue-400 mb-4">Participate and win to earn badges!</p>
        </div>
      </div>
    </div>
  );
}

export default Profile; 