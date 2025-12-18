import { ExternalLink, Youtube, FileText, Twitter } from "lucide-react";

const cards = [
  { title: "Capture Ideas", desc: "Save tweets, notes, and links instantly.", icon: ExternalLink, iconBg: "bg-green-500/20", iconColor: "text-green-400" },
  { title: "Semantic Search", desc: "Find anything in seconds with AI.", icon: Youtube, iconBg: "bg-red-500/20", iconColor: "text-red-400" },
  { title: "Organize Knowledge", desc: "Turn scattered data into structured insights.", icon: FileText, iconBg: "bg-blue-500/20", iconColor: "text-blue-400" },
  { title: "AI Summaries", desc: "Get instant summaries of videos & articles.", icon: Twitter, iconBg: "bg-sky-500/20", iconColor: "text-sky-400" },
];

export default function Card() {
  return (
    <div className="w-full mt-8 sm:mt-12 px-2 sm:px-4">

      <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-10 justify-center lg:justify-start h-auto lg:h-40">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="group relative w-full sm:w-[calc(50%-0.5rem)] md:w-[280px] lg:w-[280px] bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 transform hover:-translate-y-1"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-105`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.iconColor}`} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-1.5 sm:mb-2">{card.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{card.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 to-blue-800 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
