import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Crown, Shield, Edit3, Save, X } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

interface User {
  username: string;
  email?: string;
  subscription: 'none' | 'basic' | 'silver' | 'gold';
  registeredAt: string;
  subscriptionDate?: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editSubscription, setEditSubscription] = useState<'none' | 'basic' | 'silver' | 'gold'>('none');

  useEffect(() => {
    // Load all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('plasmaUsers') || '[]');
    setUsers(allUsers);
  }, []);

  const handleEditUser = (username: string, currentSubscription: string) => {
    setEditingUser(username);
    setEditSubscription(currentSubscription as 'none' | 'basic' | 'silver' | 'gold');
  };

  const handleSaveEdit = (username: string) => {
    const updatedUsers = users.map(user => {
      if (user.username === username) {
        return {
          ...user,
          subscription: editSubscription,
          subscriptionDate: editSubscription !== 'none' ? new Date().toISOString() : undefined
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('plasmaUsers', JSON.stringify(updatedUsers));

    // Update current user if they're editing themselves
    const currentUser = localStorage.getItem('plasmaUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      if (userData.username === username) {
        userData.subscription = editSubscription;
        userData.subscriptionDate = editSubscription !== 'none' ? new Date().toISOString() : undefined;
        localStorage.setItem('plasmaUser', JSON.stringify(userData));
      }
    }

    setEditingUser(null);
  };

  const getBadgeInfo = (subscription: string, username: string) => {
    if (username.toLowerCase() === 'yon') {
      return {
        text: 'ADMIN+',
        color: 'from-red-500 to-orange-500',
        textColor: 'text-white',
        glow: 'shadow-red-500/50'
      };
    }
    
    switch (subscription) {
      case 'basic':
        return {
          text: 'BASIC',
          color: 'from-amber-600 to-amber-800',
          textColor: 'text-white',
          glow: 'shadow-amber-500/50'
        };
      case 'silver':
        return {
          text: 'SILVER',
          color: 'from-gray-400 to-gray-600',
          textColor: 'text-white',
          glow: 'shadow-gray-400/50'
        };
      case 'gold':
        return {
          text: 'GOLD',
          color: 'from-yellow-400 to-yellow-600',
          textColor: 'text-black',
          glow: 'shadow-yellow-400/50'
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particle System */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-purple-300 hover:text-white transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-red-400 animate-pulse mr-3" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-float">
                Admin Panel
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Manage users and their subscription levels
            </p>
          </div>

          {/* Users Table */}
          <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 animate-fade-in-up">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Registered Users ({users.length})</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Username</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Email</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Subscription</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Registered</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.username} className="border-b border-gray-800/30 hover:bg-purple-900/10 transition-colors duration-300">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{user.username.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="text-white font-medium">{user.username}</span>
                          {getBadgeInfo(user.subscription, user.username) && (
                            <div className={`px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${getBadgeInfo(user.subscription, user.username)?.color} ${getBadgeInfo(user.subscription, user.username)?.textColor} shadow-lg ${getBadgeInfo(user.subscription, user.username)?.glow} animate-pulse`}>
                              {getBadgeInfo(user.subscription, user.username)?.text}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{user.email || 'N/A'}</td>
                      <td className="py-4 px-4">
                        {editingUser === user.username ? (
                          <select
                            value={editSubscription}
                            onChange={(e) => setEditSubscription(e.target.value as 'none' | 'basic' | 'silver' | 'gold')}
                            className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white focus:border-purple-400 focus:outline-none"
                          >
                            <option value="none">None</option>
                            <option value="basic">Basic</option>
                            <option value="silver">Silver</option>
                            <option value="gold">Gold</option>
                          </select>
                        ) : (
                          <span className="text-gray-300 capitalize">{user.subscription}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {new Date(user.registeredAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        {editingUser === user.username ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveEdit(user.username)}
                              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300"
                            >
                              <Save className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={() => setEditingUser(null)}
                              className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-300"
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditUser(user.username, user.subscription)}
                            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-300"
                          >
                            <Edit3 className="w-4 h-4 text-white" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No users registered yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 animate-pulse" />
    </div>
  );
};

export default AdminPanel;