import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import { 
  Home, 
  Trophy, 
  Users, 
  MessageCircle, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Play,
  Users2
} from 'lucide-react';
import PropTypes from 'prop-types';

// Custom Logo Component
function UniPlayLogo({ className = "w-8 h-8" }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#6366F1'}} />
            <stop offset="50%" style={{stopColor: '#A855F7'}} />
            <stop offset="100%" style={{stopColor: '#EC4899'}} />
          </linearGradient>
        </defs>
        <path 
          d="M 20,10 C 20,5 25,0 30,0 L 70,0 C 75,0 80,5 80,10 L 80,60 C 80,80 65,100 50,100 C 35,100 20,80 20,60 Z"
          fill="url(#logoGradient)" 
        />
        <circle cx="50" cy="45" r="18" fill="white" />
        <path d="M 50 27 A 18 18 0 0 0 50 63" fill="none" stroke="#E5E7EB" strokeWidth="4" />
         <path d="M 38 35 A 18 18 0 0 1 62 55" fill="none" stroke="#E5E7EB" strokeWidth="4" />
      </svg>
    </div>
  );
}

function Layout() {
  const { user, logout } = useAuth();
  const { notifications, clearNotifications } = useNotification();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Clubs', href: '/clubs', icon: Users2 },
    { name: 'Leaderboard', href: '/leaderboard', icon: Users },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Helper: navigate to club chat (update route as needed)
  function goToClubChat(navigate, clubId) {
    // If you have a dedicated club chat route, update this path
    navigate(`/clubs?chat=${clubId}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <UniPlayLogo />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">UniPlay</span>
              <span className="text-xs text-gray-500 -mt-1">Sports Community</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-500" />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <div className="relative">
                <button
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <Bell className="w-6 h-6 text-gray-500" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b font-bold text-gray-800 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-blue-500" /> Notifications
                      <button onClick={() => { clearNotifications(); setDropdownOpen(false); }} className="ml-auto text-xs text-blue-600 hover:underline">Clear all</button>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">No new notifications</div>
                    ) : (
                      <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                        {notifications.map((n, idx) => (
                          <li
                            key={idx}
                            className="p-4 hover:bg-blue-50 cursor-pointer"
                            onClick={() => {
                              setDropdownOpen(false);
                              goToClubChat(navigate, n.clubId);
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-blue-700">{n.clubName}</span>
                              <span className="text-xs text-gray-400 ml-auto">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="text-sm text-gray-700">
                              <span className="font-semibold">{n.senderName}:</span> {n.text}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.points} points</p>
                </div>
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;