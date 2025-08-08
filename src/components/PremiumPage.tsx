import React from 'react';
import { Zap, Crown, Gem, ArrowLeft, Check } from 'lucide-react';

interface PremiumPageProps {
  onBack: () => void;
}

const PremiumPage: React.FC<PremiumPageProps> = ({ onBack }) => {
  const tiers = [
    {
      name: 'Basic',
      price: '€5',
      color: 'from-gray-600 to-gray-800',
      borderColor: 'border-gray-500/30',
      hoverBorder: 'hover:border-gray-400/50',
      icon: Zap,
      features: [
        'Faster Discord Response',
        'Basic Tool Access',
        'Community Support'
      ]
    },
    {
      name: 'Silver',
      price: '€10',
      color: 'from-slate-500 to-slate-700',
      borderColor: 'border-slate-400/30',
      hoverBorder: 'hover:border-slate-300/50',
      icon: Crown,
      popular: true,
      features: [
        'Priority Discord Response',
        'Premium Tool Features',
        'Advanced Support',
        'Exclusive Commands'
      ]
    },
    {
      name: 'Gold',
      price: '€20',
      color: 'from-yellow-500 to-yellow-700',
      borderColor: 'border-yellow-400/30',
      hoverBorder: 'hover:border-yellow-300/50',
      icon: Gem,
      features: [
        'Instant Discord Response',
        'Full Premium Access',
        'VIP Support Channel',
        'Beta Feature Access',
        'Custom Tool Configurations'
      ]
    }
  ];


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
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-float">
              Premium Access
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Unlock the full potential of PlasmaServices with premium features, priority support, and exclusive access to advanced tools.
            </p>
          </div>

          {/* Subscription Tiers */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative group p-8 rounded-2xl bg-gradient-to-br ${tier.color} backdrop-blur-lg border ${tier.borderColor} ${tier.hoverBorder} transition-all duration-500 cursor-pointer animate-fade-in-up ${
                  tier.popular ? 'scale-105 ring-2 ring-purple-400/50' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <tier.icon className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300 animate-pulse" />
                  </div>

                  {/* Tier Name */}
                  <h3 className="text-3xl font-bold text-white text-center mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-300 ml-2">/month</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 animate-pulse" />
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-lg cursor-not-allowed opacity-75"
                    disabled
                  >
                    Coming Soon
                  </button>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16">
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-2xl border border-purple-500/30 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4 animate-pulse">
                Ready to Upgrade?
              </h3>
              <p className="text-purple-300 mb-4">
                Join our Discord server to purchase your premium subscription and unlock exclusive features.
              </p>
              <a 
                href="https://discord.gg/g97DXFbcCW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 animate-pulse-glow"
              >
                <span>Join Discord to Buy</span>
              </a>
            </div>
            <p className="text-gray-400 mb-4">
              All subscriptions are billed monthly and can be cancelled anytime.
            </p>
            <p className="text-sm text-gray-500">
              Need help choosing? Join our Discord for personalized recommendations.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-pulse" />
    </div>
  );
};

export default PremiumPage;