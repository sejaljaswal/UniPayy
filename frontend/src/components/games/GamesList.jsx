import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Search, Filter, Calendar, MapPin, Users, Clock } from 'lucide-react';

function GamesList() {
  const { games } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Indoor', 'Outdoor'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sports Games</h1>
            <p className="text-gray-600">Discover and join exciting sports events with your classmates</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 overflow-hidden group"
          >
            {/* Game Header */}
            <div className="relative p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{game.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(game.status)}`}>
                  {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {game.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {game.description}
              </p>
            </div>

            {/* Game Details */}
            <div className="px-6 pb-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(game.schedule).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{game.venue}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className={getAvailabilityColor(game.currentPlayers, game.maxPlayers)}>
                    {game.currentPlayers}/{game.maxPlayers} players
                  </span>
                </div>
                
                {game.currentPlayers >= game.maxPlayers && (
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    Full
                  </span>
                )}
              </div>
            </div>

            {/* Players Preview */}
            <div className="px-6 pb-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {game.registeredPlayers.slice(0, 4).map((player, index) => (
                    <img
                      key={player.id}
                      src={player.avatar}
                      alt={player.name}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      title={player.name}
                    />
                  ))}
                  {game.registeredPlayers.length > 4 && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        +{game.registeredPlayers.length - 4}
                      </span>
                    </div>
                  )}
                </div>
                {game.registeredPlayers.length > 0 && (
                  <span className="text-xs text-gray-500 ml-2">
                    {game.registeredPlayers.length} joined
                  </span>
                )}
              </div>
            </div>

            {/* Hover Effect Indicator */}
            <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </Link>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No games found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default GamesList;