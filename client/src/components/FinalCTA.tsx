import React from 'react';
import { Brain, ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-20 lg:py-32 px-4 bg-gradient-to-l from-blue-950 via-black to-blue-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-300 mb-6 leading-tight">
            Ready to Install Your
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Second Brain?
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Stop juggling tabs and start building your personal knowledge engine. 
          Get started for free.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center gap-3 p-4 bg-[#0F1629]/30 border border-white/10 rounded-xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-gray-300 font-medium">Lightning Fast</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-4 bg-[#0F1629]/30 border border-white/10 rounded-xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-gray-300 font-medium">AI Powered</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-4 bg-[#0F1629]/30 border border-white/10 rounded-xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-gray-300 font-medium">Always Free</span>
          </div>
        </div>

        {/* Main CTA Button */}
        <div className="mb-8">
          <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
            <span className="flex items-center gap-3">
              Get Started for Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>

        {/* Secondary CTA */}
        <div className="mb-8">
          <button className="px-8 py-4 bg-[#0F1629]/50 border border-white/20 text-gray-300 rounded-xl hover:bg-[#0F1629]/70 hover:border-white/30 transition-all duration-300 flex items-center gap-3 mx-auto">
            <Rocket className="w-5 h-5 text-blue-400" />
            Join the Private Beta
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Setup in 2 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-bounce">
          <Brain className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-8 h-8 text-purple-400" />
        </div>
        <div className="absolute top-1/2 left-5 opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>
          <Zap className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
    </section>
  );
}; 