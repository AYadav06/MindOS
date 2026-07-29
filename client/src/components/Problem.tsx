import { Bookmark, FileText, Brain, Layers } from 'lucide-react';

export const Problem = () => {
  const problems = [
    {
      icon: Bookmark,
      title: "Endless Bookmarks",
      description: "A graveyard of links you saved with good intentions but will never find again.",
      color: "text-red-400"
    },
    {
      icon: FileText,
      title: "Scattered Knowledge", 
      description: "Your insights are split between videos, articles, tweets, and notes. Impossible to connect.",
      color: "text-blue-400"
    },
    {
      icon: Brain,
      title: "Fuzzy Memory",
      description: "You remember reading something brilliant... but you can't remember where or when.",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-14 lg:mt-20 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-4 sm:mb-6">
            Sound Familiar?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-2">
            Lost in a sea of open tabs? Your digital world is scattered.
          </p>
        </div>

        {/* Visual Element - Tangled Lines */}
        <div className="relative mb-10 sm:mb-12 md:mb-16">
          <div className="flex justify-center items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-16 opacity-20">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-red-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Bookmark className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-red-400" />
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-blue-400" />
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-yellow-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-yellow-400" />
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-full h-20 lg:h-24" viewBox="0 0 400 100" fill="none">
              <path 
                d="M 50 50 Q 150 20 200 50 Q 250 80 350 50" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                className="animate-pulse"
              />
              <path 
                d="M 50 50 Q 150 80 200 50 Q 250 20 350 50" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                className="animate-pulse"
                style={{ animationDelay: '1s' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <div
                key={index}
                className="group relative p-5 sm:p-6 md:p-8 bg-[#0F1629]/30 border border-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm hover:bg-[#0F1629]/50 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Icon */}
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#0F1629]/50 rounded-lg sm:rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${problem.color}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-3 sm:mb-4 group-hover:text-white transition-colors duration-300">
                  {problem.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {problem.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-slate-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#0F1629]/50 border border-white/10 rounded-lg sm:rounded-xl text-gray-300 hover:bg-[#0F1629]/70 hover:border-white/20 transition-all duration-300">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span className="text-base sm:text-lg font-medium">There's a better way</span>
          </div>
        </div>
      </div>
    </section>
  );
}; 