
const cards = [
  { title: "Capture Ideas", desc: "Save tweets, notes, and links instantly." },
  { title: "Semantic Search", desc: "Find anything in seconds with AI." },
  { title: "Organize Knowledge", desc: "Turn scattered data into structured insights." },
  { title: "AI Summaries", desc: "Get instant summaries of videos & articles." },
];

export default function Card() {
  return (
    <div className="w-full mt-10">

      <div className="flex gap-8 h-40 ml-16">
        {[...cards].map((card, index) => (
          <div
            key={index}
            className="min-w-[280px] max-w-[280px] bg-[#0F1629]/70 border border-white/10 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg"
          >
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
