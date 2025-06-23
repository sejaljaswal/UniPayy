import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  MessageCircle, 
  Send,
  UserPlus,
  Clock,
  Trophy,
  Star
} from 'lucide-react';
import ChatSection from './ChatSection';

function GamePage() {
  const { gameId } = useParams();
  const { games, joinGame } = useApp();
  const { user } = useAuth();
  const [hasJoined, setHasJoined] = useState(false);

  const game = games.find(g => g.id === gameId);

  if (!game) {
    return <Navigate to="/games" />;
  }

  const isUserJoined = hasJoined || game.registeredPlayers.some(player => player.id === user?.id);
  const canJoin = !isUserJoined && game.currentPlayers < game.maxPlayers;

  const handleJoinGame = () => {
    if (user && canJoin) {
      joinGame(game.id, user.id);
      setHasJoined(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Game Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{game.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="text-blue-100 mb-6 max-w-2xl">{game.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Schedule</p>
                      <p className="text-sm text-blue-100">{new Date(game.schedule).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-sm text-blue-100">{game.venue}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Players</p>
                      <p className="text-sm text-blue-100">{game.currentPlayers}/{game.maxPlayers} joined</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:ml-8">
              {canJoin ? (
                <button
                  onClick={handleJoinGame}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 w-full lg:w-auto justify-center"
                >
                  <UserPlus className="w-5 h-5" />
                  Join Game
                </button>
              ) : isUserJoined ? (
                <div className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 w-full lg:w-auto justify-center">
                  <Star className="w-5 h-5" />
                  Joined
                </div>
              ) : (
                <div className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold w-full lg:w-auto text-center">
                  Game Full
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game Details & Players */}
        <div className="lg:col-span-1 space-y-6">
          {/* Game Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Spots</span>
                <span className="font-semibold">{game.maxPlayers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Available Spots</span>
                <span className="font-semibold text-green-600">{game.maxPlayers - game.currentPlayers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Category</span>
                <span className="font-semibold">{game.category}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Registration Progress</span>
                <span>{Math.round((game.currentPlayers / game.maxPlayers) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(game.currentPlayers / game.maxPlayers) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Registered Players */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Registered Players ({game.registeredPlayers.length})
            </h3>
            
            <div className="space-y-3">
              {game.registeredPlayers.map((player, index) => (
                <div key={player.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <p className="text-xs text-gray-500">Player #{index + 1}</p>
                  </div>
                  {index < 3 && (
                    <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Top Player
                    </div>
                  )}
                </div>
              ))}
              
              {game.registeredPlayers.length === 0 && (
                <p className="text-gray-500 text-center py-4">No players registered yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="lg:col-span-2">
          <ChatSection gameId={game.id} gameName={game.name} />
        </div>
      </div>
    </div>
  );
}

export default GamePage;