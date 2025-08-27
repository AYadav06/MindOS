import { useState, useEffect } from 'react';
import { Bookmark, FileText, Brain, Search, Zap, Sparkles, ArrowRight } from 'lucide-react';

export const Solution = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const beforeItems = [
    { icon: Bookmark, color: "text-red-400", label: "Bookmarks" },
    { icon: FileText, color: "text-blue-400", label: "Notes" },
    { icon: Brain, color: "text-yellow-400", label: "Ideas" },
  ];

  const afterItems = [
    { icon: Search, color: "text-green-400", label: "Smart Search" },
    { icon: Zap, color: "text-purple-400", label: "AI Insights" },
    { icon: Sparkles, color: "text-cyan-400", label: "Connections" },
  ];

  return (
    <section className="py-16 lg:py-24 px-4 bg-gradient-to-l from-blue-950 via-black to-blue-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300 mb-6">
            Introducing MindOS
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-400 mb-8">
            The Operating System for Your Knowledge
          </h3>
          <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            MindOS unifies your scattered digital resources into a single, intelligent space. 
            It's more than a bookmarking tool—it's a second brain that helps you find, connect, 
            and synthesize information effortlessly.
          </p>
        </div>

        {/* Before and After Visual */}
        <div className="relative mb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Before - Chaos */}
            <div className="relative">
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-red-400 mb-2">Before</h4>
                <p className="text-gray-400">Scattered & Chaotic</p>
              </div>
              
              <div className="bg-[#0F1629]/30 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm">
                {/* Chaotic arrangement of items */}
                <div className="relative h-64">
                  {beforeItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const positions = [
                      "top-4 left-4",
                      "top-12 right-8", 
                      "bottom-8 left-12",
                      "bottom-16 right-4",
                      "top-1/2 left-1/3",
                      "top-1/3 right-1/4"
                    ];
                    
                    return (
                      <div
                        key={index}
                        className={`absolute ${positions[index % positions.length]} transform rotate-${(index * 15) % 30 - 15} transition-all duration-1000 ${
                          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 backdrop-blur-sm">
                          <IconComponent className={`w-6 h-6 ${item.color}`} />
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Chaotic connecting lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 250" fill="none">
                    <path 
                      d="M 50 50 Q 100 20 150 80 Q 200 40 250 60" 
                      stroke="rgba(239, 68, 68, 0.3)" 
                      strokeWidth="2" 
                      strokeDasharray="3,3"
                      className="animate-pulse"
                    />
                    <path 
                      d="M 80 120 Q 120 80 180 100 Q 220 140 260 90" 
                      stroke="rgba(239, 68, 68, 0.3)" 
                      strokeWidth="2" 
                      strokeDasharray="3,3"
                      className="animate-pulse"
                      style={{ animationDelay: '1s' }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Transformation Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-gradient-to-r from-red-500/20 to-blue-500/20 border border-white/10 rounded-full p-4 backdrop-blur-sm">
                <ArrowRight className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
            </div>

            {/* After - Organized */}
            <div className="relative">
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-green-400 mb-2">After</h4>
                <p className="text-gray-400">Unified & Intelligent</p>
              </div>
              
              <div className="bg-[#0F1629]/30 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm">
                {/* Organized MindOS interface */}
                <div className="relative h-64">
                  {/* Central hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-6 shadow-2xl shadow-blue-500/20">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Organized items around the hub */}
                  {afterItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const angles = [0, 120, 240]; // 120 degrees apart
                    const radius = 80;
                    const angle = (angles[index] * Math.PI) / 180;
                    const x = Math.cos(angle) * radius + 150;
                    const y = Math.sin(angle) * radius + 125;
                    
                    return (
                      <div
                        key={index}
                        className="absolute transition-all duration-1000 transform"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: `translate(-50%, -50%)`,
                          opacity: isVisible ? 1 : 0,
                          scale: isVisible ? 1 : 0.5,
                          animationDelay: `${(index + 3) * 200}ms`
                        }}
                      >
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 backdrop-blur-sm">
                          <IconComponent className={`w-6 h-6 ${item.color}`} />
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Clean connecting lines to center */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 250" fill="none">
                    {afterItems.map((_, index) => {
                      const angles = [0, 120, 240];
                      const radius = 80;
                      const angle = (angles[index] * Math.PI) / 180;
                      const x = Math.cos(angle) * radius + 150;
                      const y = Math.sin(angle) * radius + 125;
                      
                      return (
                        <line
                          key={index}
                          x1="150"
                          y1="125"
                          x2={x}
                          y2={y}
                          stroke="rgba(34, 197, 94, 0.4)"
                          strokeWidth="2"
                          className="transition-all duration-1000"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            animationDelay: `${(index + 6) * 200}ms`
                          }}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-[#0F1629]/20 border border-white/10 rounded-xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-300 mb-2">Find Anything</h4>
            <p className="text-gray-400 text-sm">AI-powered search that understands context and meaning</p>
          </div>
          
          <div className="text-center p-6 bg-[#0F1629]/20 border border-white/10 rounded-xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-300 mb-2">Connect Ideas</h4>
            <p className="text-gray-400 text-sm">Automatically discover relationships between your knowledge</p>
          </div>
          
          <div className="text-center p-6 bg-[#0F1629]/20 border border-white/10 rounded-xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-300 mb-2">Synthesize Insights</h4>
            <p className="text-gray-400 text-sm">Generate new knowledge from your existing resources</p>
          </div>
        </div>
      </div>
    </section>
  );
}; 