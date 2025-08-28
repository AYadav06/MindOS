import { useState } from 'react';
import { Search, Download, Brain, FileText, Lightbulb } from 'lucide-react';

export const Feature = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 1,
      title: "Never Lose a Thought.",
      subtitle: "Capture Everything Seamlessly",
      description: "With our one-click browser extension and integrations, saving content from YouTube, Twitter, Notion, and across the web is frictionless. If you can see it, you can save it.",
      icon: Download,
      color: "from-blue-800 to-slate-500",
      visual: "browser-extension"
    },
    {
      id: 2,
      title: "Search by Concept",
      subtitle: "Find Anything, Instantly", 
      description: "Our AI-powered search understands what you *mean*. Ask natural questions like, 'What were those articles about AI ethics?' and MindOS finds them instantly.",
      icon: Search,
      color: "from-indigo-900 to-neutral-500",
      visual: "ai-search"
    },
    {
      id: 3,
      title: "Turn Information into Insight.",
      subtitle: "Synthesize & Create with AI",
      description: "Select multiple sources and ask MindOS to work with them. Get summaries, draft blog posts, compare arguments, or find hidden connections.",
      icon: Brain,
      color: "from-slate-700 to-cyan-200", 
      visual: "research-view"
    }
  ];

  const BrowserExtensionDemo = ({ isActive }: { isActive: boolean }) => (
    <div className="relative bg-slate-800/50 rounded-xl p-10 w-3xl mx-auto backdrop-blur-sm border border-slate-700/50">
      <div className="flex items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-slate-400">youtube.com/watch?v=...</div>
      </div>
      <div className="space-y-3">
        <div className="h-24 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center">
          {/* <Play className="w-8 h-8 text-red-400" /> */}
        </div>
        <div className="relative">
          <div className={`absolute top-2 right-2 transform transition-all duration-1000 ${
            isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center shadow-lg">
              <Download className="w-4 h-4 mr-2" />
              Save to MindOS
            </div>
          </div>
          <div className="h-16 bg-slate-700/50 rounded p-3">
            <div className="text-sm text-slate-300">AI Ethics in Modern Society</div>
            <div className="text-xs text-slate-500 mt-1">Understanding the implications...</div>
          </div>
        </div>
      </div>
    </div>
  );

  const AISearchDemo = ({ isActive }: { isActive: boolean }) => (
    <div className="bg-slate-800/50 rounded-xl  p-10 w-3xl mx-auto backdrop-blur-sm border border-slate-700/50">
      <div className="relative mb-6">
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-slate-400" />
            <div className={`transition-all duration-2000 ${
              isActive ? 'w-full' : 'w-0'
            } overflow-hidden whitespace-nowrap text-slate-300`}>
              What were those articles about AI ethics?
            </div>
          </div>
        </div>
      </div>
      <div className={`space-y-3 transition-all duration-1000 ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
            <div className="flex items-start space-x-3">
              <FileText className="w-4 h-4 text-purple-400 mt-1" />
              <div>
                <div className="text-sm text-slate-200">Ethics in AI Development</div>
                <div className="text-xs text-slate-400 mt-1">Explores moral considerations in artificial intelligence...</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ResearchViewDemo = ({ isActive }: { isActive: boolean }) => (
    <div className="bg-slate-800/50 rounded-xl p-10 w-3xl mx-auto backdrop-blur-sm border border-slate-700/50">
      <div className="grid grid-cols-2 gap-4 h-48">
        <div className="space-y-2">
          <div className="text-xs text-slate-400 mb-2">Selected Sources</div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-slate-700/30 rounded p-2 text-xs text-slate-300 border border-slate-600/30">
              Article {item}: AI Ethics
            </div>
          ))}
        </div>
        <div className="bg-slate-700/30 rounded border border-slate-600/30 p-3">
          <div className="flex items-center mb-2">
            <Lightbulb className="w-4 h-4 text-yellow-400 mr-2" />
            <div className="text-xs text-slate-400">AI Summary</div>
          </div>
          <div className={`text-xs text-slate-300 transition-all duration-2000 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="space-y-2">
              <div>The three articles converge on key ethical principles...</div>
              <div>Common themes include transparency, accountability, and bias prevention...</div>
              <div>Recommendations: Implement ethical review processes...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-12 mt-20 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            How the Magic Works
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4">
            Transform how you capture, find, and create with your digital knowledge. 
            Every feature designed to amplify your thinking.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12">
          {/* Feature Cards Row */}
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = activeFeature === index;
              
              return (
                <div
                  key={feature.id}
                  className={`relative p-4 lg:p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer group ${
                    isActive 
                      ? 'bg-slate-800/60 border-slate-600/80 shadow-2xl shadow-blue-500/10' 
                      : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="text-xs lg:text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">
                      {feature.subtitle}
                    </h3>
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Active indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-b ${feature.color} rounded-l-2xl transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}></div>

                  {/* Active state bottom line */}
                  
                </div>
              );
            })}
          </div>
          
          {/* Demo Section Below */}
          <div className="mt-8 lg:mt-12">
            <div className="relative">
              {/* Demo Content */}
              <div className="relative min-h-[300px] lg:min-h-[400px]">
                <div className={`absolute inset-0 transition-all duration-700 transform ${
                  activeFeature === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}>
                  <BrowserExtensionDemo isActive={activeFeature === 0} />
                </div>
                
                <div className={`absolute inset-0 transition-all duration-700 transform ${
                  activeFeature === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}>
                  <AISearchDemo isActive={activeFeature === 1} />
                </div>
                
                <div className={`absolute inset-0 transition-all duration-700 transform ${
                  activeFeature === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}>
                  <ResearchViewDemo isActive={activeFeature === 2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
