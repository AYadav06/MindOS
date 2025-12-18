
import { Search, Zap, Sparkles } from 'lucide-react';

export const Solution = () => {

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 bg-gradient-to-l from-blue-950 via-black to-blue-950">
      <div className="max-w-7xl mx-auto">
    
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-4 sm:mb-5 md:mb-7">
            Introducing MindOS
          </h2>
        
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed px-2">
            MindOS unifies your scattered digital resources into a single, intelligent space. 
            It is  a second brain that helps you find, connect, 
            and synthesize information effortlessly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 lg:mt-18">
          <div className="group relative text-center bg-[#0F1629]/20 border border-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm px-3 sm:px-4 py-6 sm:py-8 md:py-10 transition-all duration-300 hover:bg-[#0F1629]/50 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-105">
              <Search className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-300 mb-1 sm:mb-2">Find Anything</h4>
            <p className="text-gray-400 text-xs sm:text-sm">AI-powered search that understands context and meaning</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-gray-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
          
          <div className="group relative text-center px-3 sm:px-4 py-6 sm:py-8 md:py-10 bg-[#0F1629]/20 border border-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-[#0F1629]/50 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-105">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-300 mb-1 sm:mb-2">Connect Ideas</h4>
            <p className="text-gray-400 text-xs sm:text-sm">Automatically discover relationships between your knowledge</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-gray-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
          
          <div className="group relative text-center px-3 sm:px-4 py-6 sm:py-8 md:py-10 bg-[#0F1629]/20 border border-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-[#0F1629]/50 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-300 mb-1 sm:mb-2">Synthesize Insights</h4>
            <p className="text-gray-400 text-xs sm:text-sm">Generate new knowledge from your existing resources</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-gray-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        </div>
      </div>
    </section>
  );
}; 