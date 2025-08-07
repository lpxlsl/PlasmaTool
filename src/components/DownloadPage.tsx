import React, { useState } from 'react';
import { ArrowLeft, Download, ExternalLink, Check, Loader2 } from 'lucide-react';

interface DownloadPageProps {
  onBack: () => void;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ onBack }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const handleSubscribeClick = () => {
    window.open('https://www.youtube.com/@yonyonsyoner', '_blank');
  };

  const handleCheckSubscription = async () => {
    setIsChecking(true);
    
    // Simulate checking subscription status
    setTimeout(() => {
      setIsChecking(false);
      setHasSubscribed(true);
      
      // Redirect to download after a brief delay
      setTimeout(() => {
        window.open('https://github.com/lpxlsl/plasmadownload/releases/tag/tool', '_blank');
      }, 1000);
    }, 2000);
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
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Download Card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-12 text-center animate-fade-in-up">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Download className="w-16 h-16 text-purple-400 animate-pulse" />
                <div className="absolute inset-0 w-16 h-16 bg-purple-400 blur-lg opacity-30 animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-6 animate-float">
              Get PlasmaTools
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg mb-8">
              Subscribe to our YouTube channel to access the download
            </p>

            {/* Description */}
            <p className="text-gray-500 mb-12 leading-relaxed">
              To download PlasmaTools, please subscribe to our YouTube channel first.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Subscribe Button */}
              <button
                onClick={handleSubscribeClick}
                className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 group border border-gray-600/50"
              >
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Subscribe to @yonyonsyoner</span>
              </button>

              {/* Check Subscription Button */}
              <button
                onClick={handleCheckSubscription}
                disabled={isChecking || hasSubscribed}
                className={`w-full flex items-center justify-center space-x-3 py-4 px-6 font-semibold rounded-xl transition-all duration-300 ${
                  hasSubscribed
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                    : isChecking
                    ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 hover:scale-105 animate-pulse-glow'
                }`}
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Checking Subscription...</span>
                  </>
                ) : hasSubscribed ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Redirecting to Download...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>I've Subscribed - Check Now</span>
                  </>
                )}
              </button>
            </div>

            {/* Additional Info */}
            {hasSubscribed && (
              <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg animate-fade-in-up">
                <p className="text-green-400 text-sm">
                  ✅ Subscription verified! Redirecting to download page...
                </p>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Having trouble? Join our Discord for support.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-pulse" />
    </div>
  );
};

export default DownloadPage;