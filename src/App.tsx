import React, { useEffect, useState } from 'react';
import { Zap, Sparkles, HexagonIcon } from 'lucide-react';
import PremiumPage from './components/PremiumPage';
import DownloadPage from './components/DownloadPage';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState<'home' | 'premium' | 'download' | 'admin'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userSubscription, setUserSubscription] = useState<'none' | 'basic' | 'silver' | 'gold'>('none');
  const [websiteViews, setWebsiteViews] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Track website views
    const views = parseInt(localStorage.getItem('websiteViews') || '0') + 1;
    localStorage.setItem('websiteViews', views.toString());
    setWebsiteViews(views);

    // Count total registered users
    const countUsers = () => {
      let userCount = 0;
      const registeredUsers = new Set();
      
      // Check localStorage for user data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === 'plasmaUser') {
          try {
            const userData = JSON.parse(localStorage.getItem(key) || '{}');
            if (userData.username) {
              registeredUsers.add(userData.username.toLowerCase());
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      }
      
      // Add some base users for demonstration
      registeredUsers.add('yon');
      if (user) {
        registeredUsers.add(user.toLowerCase());
      }
      
      return registeredUsers.size;
    };

    const updateStats = () => {
      setTotalUsers(countUsers());
    };

    updateStats();

    // Update stats every 2 minutes
    const interval = setInterval(updateStats, 120000);

    // Check if user is already logged in
    const savedUser = localStorage.getItem('plasmaUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData.username);
      setUserSubscription(userData.subscription || 'none');
    }
    
    // Always show auth modal if no user is logged in
    if (!savedUser) {
      setIsAuthModalOpen(true);
    }
    
    setIsLoading(false);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleLogin = (username: string) => {
    const subscription = username.toLowerCase() === 'yon' ? 'gold' : 'none';
    const userData = {
      username,
      subscription,
      registeredAt: new Date().toISOString()
    };
    localStorage.setItem('plasmaUser', JSON.stringify(userData));
    setUser(username);
    setUserSubscription(subscription);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('plasmaUser');
    setUser(null);
    setUserSubscription('none');
    setShowUserDropdown(false);
    setIsAuthModalOpen(true);
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
  // Don't render anything until we check authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300 text-lg">Loading PlasmaServices...</p>
        </div>
      </div>
    );
  }

  // Don't render main content if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => {}} // Prevent closing without login
          onLogin={handleLogin}
        />
      </div>
    );
  }

  if (currentPage === 'premium') {
    return <PremiumPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'download') {
    return <DownloadPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'admin') {
    return <AdminPanel onBack={() => setCurrentPage('home')} currentUser={user || ''} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particle System */}
        {[...Array(50)].map((_, i) => (
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
        {[...Array(8)].map((_, i) => (
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
              <div className="w-16 h-16 border-2 border-cyan-400 transform rotate-45" />
            ) : (
              <div className="w-12 h-12 border-2 border-pink-400 rounded-full" />
            )}
          </div>
        ))}

        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-purple-400" />
            ))}
          </div>
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-5 blur-3xl transition-all duration-300 pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 py-8">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Zap className="w-8 h-8 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-purple-400 blur-lg opacity-50 animate-pulse" />
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                PlasmaTool
              </h1>
              <div className="relative user-dropdown">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-purple-300 text-sm font-medium">{user}</span>
                  {getBadgeInfo(userSubscription, user || '') && (
                    <div className={`px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${getBadgeInfo(userSubscription, user || '')?.color} ${getBadgeInfo(userSubscription, user || '')?.textColor} shadow-lg ${getBadgeInfo(userSubscription, user || '')?.glow} animate-pulse`}>
                      {getBadgeInfo(userSubscription, user || '')?.text}
                    </div>
                  )}
                </button>

                {/* User Dropdown */}
                {showUserDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 shadow-2xl animate-fade-in-up z-50">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-lg">{user?.charAt(0).toUpperCase()}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg">{user}</h3>
                      <p className="text-gray-400 text-sm">Member since {new Date().getFullYear()}</p>
                    </div>

                    <div className="border-t border-gray-700/50 pt-4 mb-4">
                      <h4 className="text-purple-300 font-semibold mb-2">Subscription Status</h4>
                      {getBadgeInfo(userSubscription, user || '') ? (
                        <div className="flex items-center justify-center">
                          <div className={`px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r ${getBadgeInfo(userSubscription, user || '')?.color} ${getBadgeInfo(userSubscription, user || '')?.textColor} shadow-lg ${getBadgeInfo(userSubscription, user || '')?.glow} animate-pulse`}>
                            {getBadgeInfo(userSubscription, user || '')?.text}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-gray-400 text-sm mb-2">No active subscription</p>
                          <button
                            onClick={() => {
                              setCurrentPage('premium');
                              setShowUserDropdown(false);
                            }}
                            className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300"
                          >
                            Upgrade to Premium
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Admin Panel Access */}
                    {user?.toLowerCase() === 'yon' && getBadgeInfo(userSubscription, user || '')?.text === 'ADMIN+' && (
                      <div className="border-t border-gray-700/50 pt-4 mb-4">
                        <button
                          onClick={() => {
                            setCurrentPage('admin');
                            setShowUserDropdown(false);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-red-600/80 to-orange-600/80 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300"
                        >
                          Admin Panel
                        </button>
                      </div>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full py-2 bg-gradient-to-r from-red-600/80 to-red-700/80 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('download')}
              className="relative px-6 py-2 text-purple-300 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Download</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute inset-0 border border-purple-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </button>
            
            <button 
              onClick={() => setCurrentPage('premium')}
              className="relative px-6 py-2 text-purple-300 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Premium</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute inset-0 border border-purple-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </button>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://discord.gg/g97DXFbcCW" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 animate-pulse"
              >
                <div className="w-4 h-4 bg-white rounded-full" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Title */}
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-float">
              The All-in-One Discord Utility Tool
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              A sleek, terminal-style utility tool designed for advanced Discord management, automation, and integration. 
              Built for server owners, moderators, and tech enthusiasts who want more control and speed.
            </p>
          </div>

          {/* Central Visual Element */}
          <div className="relative my-16">
            <div className="relative w-96 h-96 mx-auto">
              {/* Central Orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full animate-spin-slow opacity-80" />
                  <div className="absolute inset-4 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 rounded-full animate-spin-reverse opacity-60" />
                  <div className="absolute inset-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HexagonIcon className="w-16 h-16 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Orbiting Elements */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={`orbit-${i}`}
                  className="absolute w-full h-full animate-spin-slow"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${8 + i}s`
                  }}
                >
                  <div className="absolute w-4 h-4 bg-purple-400 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-pulse" />
                </div>
              ))}

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-2xl animate-pulse" />
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Zap, title: "Lightning-Fast Commands", desc: "No clutter, just instant actions for Discord management" },
              { icon: Sparkles, title: "Retro Aesthetic", desc: "Nostalgic ASCII-art interface while getting work done" },
              { icon: HexagonIcon, title: "Multi-Purpose Utility Tool", desc: "Perfect for automation, moderation, and secure operations" }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-lg border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-16">
            {/* Key Features Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-white text-center mb-12 animate-pulse">
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {[
                  { title: "IP Lookup", desc: "Check IP information for troubleshooting and security" },
                  { title: "Send Webhook Messages", desc: "Automate announcements to Discord channels" },
                  { title: "Show HWID", desc: "Retrieve Hardware ID for system verification" },
                  { title: "Credits", desc: "View developers and contributors" },
                  { title: "File to Website", desc: "Instant redirect to the website" },
                  { title: "File to Discord Server", desc: "Quick access to support server" },
                  { title: "Reset Nickname/Password", desc: "Manage account credentials (beta)" },
                  { title: "Exit", desc: "Clean tool closure when work is done" }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="group p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-lg border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <h4 className="text-lg font-bold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <a 
              href="https://discord.gg/g97DXFbcCW"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 animate-pulse-glow cursor-pointer"
            >
              <span className="relative z-10">Get PlasmaTool</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            </a>

            {/* Tool Preview Button */}
            <div className="mt-6">
              <button
                disabled
                className="group relative inline-block px-10 py-4 bg-gradient-to-r from-slate-700/50 via-gray-700/50 to-slate-800/50 text-white font-bold text-lg rounded-full transition-all duration-300 border border-slate-500/20 cursor-not-allowed opacity-75"
              >
                <span className="relative z-10 bg-gradient-to-r from-slate-300 to-gray-300 bg-clip-text text-transparent">Tool Preview - Coming Soon</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-600/20 to-gray-600/20 rounded-full blur-lg opacity-20" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Website Analytics Footer */}
      <footer className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                {websiteViews.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                {totalUsers.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Registered Users</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-pulse" />
    </div>
  );
}

export default App;