import { FileText, LinkIcon, Twitter, Youtube } from "lucide-react";

export type NoteCardProps = {
  title: string;
  link?: string;
  type: "YouTube" | "Notes" | "Tweets" | "URL";
  tags: string[];
};
export const typeIcons: Record<NoteCardProps["type"], React.ReactNode> = {
  YouTube: <Youtube className="w-5 h-5 text-red-500" />,
  Notes: <FileText  className="w-5 h-5 text-blue-500" />,
  Tweets: <Twitter className="w-5 h-5 text-sky-500" />,
  URL: <LinkIcon className="w-5 h-5 text-green-500" />,
};

const cards = [
  { title: "Capture Ideas",typeIcons:[], desc: "Save tweets, notes, and links instantly." },
  { title: "Semantic Search", desc: "Find anything in seconds with AI." },
  { title: "Organize Knowledge", desc: "Turn scattered data into structured insights." },
];

export default function NoteCard() {
  return (
    <div className="w-full mt-10">

      <div className="flex gap-8 h-40 ml-10">
        {[...cards].map((card, index) => (
          <div
            key={index}
            className="min-w-[280px] max-w-[280px] bg-[#0F1629]/70 border border-white/10 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg"
          >
            <h3 className="text-lg font-semibold text-gray-300">{card.title}{}</h3>
            <p className="text-gray-400 mt-2 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

