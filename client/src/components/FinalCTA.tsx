
import {ArrowRight} from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-20 px-4 sm:px-6 bg-gradient-to-tr from-slate-800 via-blue-950 to-slate-900 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300 mb-4 sm:mb-6 leading-tight px-2">
            Ready to Install Your
            <span className="block bg-gradient-to-r from-blue-800 to-slate-300 bg-clip-text text-transparent">
              Second Brain?
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
          Stop juggling tabs and start building your personal knowledge engine. 
          Get started for free.
        </p>
        {/* Main CTA Button */}
        <div className="mb-6 sm:mb-8">
          <button className="group relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 bg-gradient-to-r from-blue-900 to-slate-600 text-white text-base sm:text-lg md:text-xl font-bold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
            <span className="flex items-center gap-2 sm:gap-3">
              Get Started for Free
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-600 rounded-xl sm:rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
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
      </div>
    </section>
  );
}; 