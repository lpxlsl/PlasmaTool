import React, { useEffect, useState } from 'react';
import { Zap, Sparkles, HexagonIcon } from 'lucide-react';
import PremiumPage from './components/PremiumPage';
import DownloadPage from './components/DownloadPage';
import AuthModal from './components/AuthModal';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState<'home' | 'premium' | 'download'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('plasmaUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData.username);
    } else {
      // Show auth modal for first-time visitors
      setIsAuthModalOpen(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('plasmaUser');
    setUser(null);
    setIsAuthModalOpen(true);
  };

  if (currentPage === 'premium') {
    return <PremiumPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'download') {
    return <DownloadPage onBack={() => setCurrentPage('home')} />;
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              PlasmaServices
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            {/* User Info */}
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-purple-300">Welcome, {user}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            )}
            
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
            <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-float">
              Experience Plasma
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
              Enter the future of digital innovation with cutting-edge technology and limitless possibilities.
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
              { icon: Zap, title: "Lightning Fast", desc: "Blazing performance with quantum acceleration" },
              { icon: Sparkles, title: "Neural Interface", desc: "Advanced AI-powered user experience" },
              { icon: HexagonIcon, title: "Quantum Core", desc: "Next-generation processing architecture" }
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
            <a 
              href="https://discord.gg/g97DXFbcCW"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 animate-pulse-glow cursor-pointer"
            >
              <span className="relative z-10">Enter the Plasma</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            </a>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-pulse" />
    </div>
  );
}

export default App;