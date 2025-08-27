
const cards = [
  { title: "Capture Ideas", desc: "Save tweets, notes, and links instantly." },
  { title: "Semantic Search", desc: "Find anything in seconds with AI." },
  { title: "Organize Knowledge", desc: "Turn scattered data into structured insights." },
  { title: "AI Summaries", desc: "Get instant summaries of videos & articles." },
];

export default function Card() {
  return (
    <div className="w-full mt-12 px-4">

      <div className="flex flex-wrap gap-4 justify-center lg:justify-start lg:gap-8 h-auto lg:h-40 ml-12">
        {[...cards].map((card, index) => (
          <div
            key={index}
            className="w-full sm:w-[280px] bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
          >
            <h3 className="text-lg font-semibold text-gray-300 mb-2">{card.title}</h3>
            <p className="text-gray-400 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
