import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Trophy, Medal, Award, TrendingUp, Filter, Search } from 'lucide-react';

function Leaderboard() {
  const { leaderboard } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGame, setFilterGame] = useState('All');

  const games = ['All', 'Cricket', 'Football', 'Basketball', 'Volleyball', 'Tennis'];

  const filteredLeaderboard = leaderboard.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = filterGame === 'All' || player.favoriteGame === filterGame;
    return matchesSearch && matchesGame;
  });

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-600" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-500" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
        <div className="z-10">
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight drop-shadow">Leaderboard</h1>
          <p className="text-blue-100 text-lg font-medium">See who's dominating the sports scene on campus!</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full sm:w-64 bg-white/80 text-blue-900 placeholder-blue-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
            <select
              value={filterGame}
              onChange={(e) => setFilterGame(e.target.value)}
              className="pl-10 pr-8 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white/80 text-blue-900"
            >
              {games.map(game => (
                <option key={game} value={game}>{game === 'All' ? 'All Games' : game}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/10 rounded-full blur-2xl z-0" />
      </div>
      {/* Top 3 Podium */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center tracking-tight">Hall of Fame</h2>
        <div className="flex items-end justify-center gap-12 mb-8 flex-wrap">
          {/* Second Place */}
          {filteredLeaderboard[1] && (
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={filteredLeaderboard[1].avatar}
                  alt={filteredLeaderboard[1].name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-400 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                  <span className="text-base font-bold">2</span>
                </div>
              </div>
              <h3 className="font-semibold text-blue-900 text-center text-lg">{filteredLeaderboard[1].name}</h3>
              <p className="text-blue-400 text-sm">{filteredLeaderboard[1].points} pts</p>
              <div className="bg-gray-200 w-24 h-20 mt-4 rounded-t-lg flex items-end justify-center pb-2">
                <Medal className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          )}
          {/* First Place */}
          {filteredLeaderboard[0] && (
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={filteredLeaderboard[0].avatar}
                  alt={filteredLeaderboard[0].name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow-xl"
                />
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                  <span className="text-base font-bold">1</span>
                </div>
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6 text-yellow-800" />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-blue-900 text-center text-xl">{filteredLeaderboard[0].name}</h3>
              <p className="text-blue-400 text-base font-bold">{filteredLeaderboard[0].points} pts</p>
              <div className="bg-yellow-200 w-28 h-24 mt-4 rounded-t-lg flex items-end justify-center pb-2">
                <Trophy className="w-7 h-7 text-yellow-600" />
              </div>
            </div>
          )}
          {/* Third Place */}
          {filteredLeaderboard[2] && (
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={filteredLeaderboard[2].avatar}
                  alt={filteredLeaderboard[2].name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-400 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                  <span className="text-base font-bold">3</span>
                </div>
              </div>
              <h3 className="font-semibold text-blue-900 text-center text-lg">{filteredLeaderboard[2].name}</h3>
              <p className="text-blue-400 text-sm">{filteredLeaderboard[2].points} pts</p>
              <div className="bg-orange-200 w-24 h-16 mt-4 rounded-t-lg flex items-end justify-center pb-2">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-blue-900">Complete Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">Rank</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">Player</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">Points</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">Games Played</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">Favorite Game</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filteredLeaderboard.map((player, index) => (
                <tr key={player.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRankBadge(player.rank)}`}>
                        #{player.rank}
                      </div>
                      {getRankIcon(player.rank)}
                    </div>
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-12 h-12 rounded-full object-cover shadow"
                      />
                      <div>
                        <p className="font-bold text-blue-900">{player.name}</p>
                        <p className="text-sm text-blue-400">Student Athlete</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-bold text-blue-900">{player.points}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <span className="font-bold text-blue-900">{player.gamesPlayed}</span>
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <span className="font-bold text-blue-900">{player.favoriteGame}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard; 