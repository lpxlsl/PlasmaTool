import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Crown, Shield, Edit2, Save, X } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
  currentUser: string;
}

interface User {
  username: string;
  email?: string;
  subscription: 'none' | 'basic' | 'silver' | 'gold';
  registeredAt: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editSubscription, setEditSubscription] = useState<'none' | 'basic' | 'silver' | 'gold'>('none');

  // Only allow yon to access admin panel
  if (currentUser.toLowerCase() !== 'yon') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">You don't have permission to access this area.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-lg hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Load all users from localStorage
    const loadUsers = () => {
      const allUsers: User[] = [];
      
      // Get all localStorage keys and find user data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === 'plasmaUser') {
          try {
            const userData = JSON.parse(localStorage.getItem(key) || '{}');
            if (userData.username) {
              allUsers.push({
                username: userData.username,
                email: userData.email || 'N/A',
                subscription: userData.subscription || 'none',
                registeredAt: userData.registeredAt || new Date().toISOString()
              });
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      }

      // Add some demo users if no users exist (for demonstration)
      if (allUsers.length === 0) {
        allUsers.push({
          username: currentUser,
          email: 'admin@plasma.com',
          subscription: 'gold',
          registeredAt: new Date().toISOString()
        });
      }

      setUsers(allUsers);
    };

    loadUsers();
  }, [currentUser]);

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

  const handleEditUser = (username: string, currentSubscription: string) => {
    // Only yon can edit users, and yon can't edit himself
    if (currentUser.toLowerCase() !== 'yon' || username.toLowerCase() === 'yon') return;
    setEditingUser(username);
    setEditSubscription(currentSubscription as 'none' | 'basic' | 'silver' | 'gold');
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;

    // Update user in localStorage if it's the current user
    const currentUserData = localStorage.getItem('plasmaUser');
    if (currentUserData) {
      try {
        const userData = JSON.parse(currentUserData);
        if (userData.username === editingUser) {
          userData.subscription = editSubscription;
          localStorage.setItem('plasmaUser', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }

    // Update local state
    setUsers(users.map(user => 
      user.username === editingUser 
        ? { ...user, subscription: editSubscription }
        : user
    ));

    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditSubscription('none');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        
        {/* Floating Geometric Shapes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className={`absolute opacity-10 ${
              i % 3 === 0 ? 'animate-spin-slow' : 
              i % 3 === 1 ? 'animate-pulse' : 'animate-bounce-slow'
            }`}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {i % 2 === 0 ? (
              <div className="w-12 h-12 border-2 border-cyan-400 transform rotate-45" />
            ) : (
              <div className="w-8 h-8 border-2 border-pink-400 rounded-full" />
            )}
          </div>
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
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="w-12 h-12 text-red-400 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-float">
                Admin Panel
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
              Manage users and their subscription levels across PlasmaServices.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-white">{users.length}</div>
              <div className="text-gray-400 text-sm">Total Users</div>
            </div>
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-lg border border-amber-500/30 rounded-2xl p-6 text-center">
              <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-white">{users.filter(u => u.subscription === 'basic').length}</div>
              <div className="text-gray-400 text-sm">Basic Users</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900/30 to-slate-900/30 backdrop-blur-lg border border-gray-500/30 rounded-2xl p-6 text-center">
              <Crown className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-white">{users.filter(u => u.subscription === 'silver').length}</div>
              <div className="text-gray-400 text-sm">Silver Users</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-6 text-center">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-white">{users.filter(u => u.subscription === 'gold').length}</div>
              <div className="text-gray-400 text-sm">Gold Users</div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <Users className="w-6 h-6 text-purple-400" />
              <span>User Management</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">User</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Email</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Subscription</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Registered</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.username} className="border-b border-gray-800/50 hover:bg-purple-900/10 transition-colors duration-300">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{user.username.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.username}</div>
                            {getBadgeInfo(user.subscription, user.username) && (
                              <div className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${getBadgeInfo(user.subscription, user.username)?.color} ${getBadgeInfo(user.subscription, user.username)?.textColor} shadow-lg ${getBadgeInfo(user.subscription, user.username)?.glow} animate-pulse mt-1`}>
                                {getBadgeInfo(user.subscription, user.username)?.text}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-400">{user.email || 'N/A'}</td>
                      <td className="py-4 px-4">
                        {editingUser === user.username ? (
                          <select
                            value={editSubscription}
                            onChange={(e) => setEditSubscription(e.target.value as 'none' | 'basic' | 'silver' | 'gold')}
                            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm focus:border-purple-400 focus:outline-none"
                          >
                            <option value="none">None</option>
                            <option value="basic">Basic</option>
                            <option value="silver">Silver</option>
                            <option value="gold">Gold</option>
                          </select>
                        ) : (
                          <span className={`capitalize ${user.subscription === 'none' ? 'text-gray-400' : 'text-white'}`}>
                            {user.subscription}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{formatDate(user.registeredAt)}</td>
                      <td className="py-4 px-4">
                        {user.username.toLowerCase() === 'yon' || currentUser.toLowerCase() !== 'yon' ? (
                          <span className="text-red-400 text-sm font-medium">Admin</span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            {editingUser === user.username ? (
                              <>
                                <button
                                  onClick={handleSaveEdit}
                                  className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300"
                                  title="Save Changes"
                                >
                                  <Save className="w-4 h-4 text-white" />
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-300"
                                  title="Cancel"
                                >
                                  <X className="w-4 h-4 text-white" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleEditUser(user.username, user.subscription)}
                                className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-300"
                                title="Edit Subscription"
                              >
                                <Edit2 className="w-4 h-4 text-white" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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