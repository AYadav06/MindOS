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
    <section className="py-16 lg:py-24 px-4 bg-gradient-to-l from-blue-950 via-black to-blue-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300 mb-6">
            Sound Familiar?
          </h2>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto">
            Lost in a sea of open tabs? Your digital world is scattered.
          </p>
        </div>

        {/* Visual Element - Tangled Lines */}
        <div className="relative mb-16">
          <div className="flex justify-center items-center space-x-8 lg:space-x-16 opacity-20">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-500/20 rounded-xl flex items-center justify-center">
              <Bookmark className="w-8 h-8 lg:w-10 lg:h-10 text-red-400" />
            </div>
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400" />
            </div>
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400" />
            </div>
          </div>
          
          {/* Animated connecting lines */}
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <div
                key={index}
                className="group relative p-8 bg-[#0F1629]/30 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-[#0F1629]/50 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#0F1629]/50 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <IconComponent className={`w-8 h-8 ${problem.color}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">
                  {problem.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {problem.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#0F1629]/50 border border-white/10 rounded-xl text-gray-300 hover:bg-[#0F1629]/70 hover:border-white/20 transition-all duration-300">
            <Layers className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-medium">There's a better way</span>
          </div>
        </div>
      </div>
    </section>
  );
}; 