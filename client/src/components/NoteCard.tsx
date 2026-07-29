// NoteCard.tsx
import { typeIcons } from "./Constants";

export type NoteCardProps = {
  title: string;
  link?: string;
  type: "YouTube" | "Notes" | "Tweets" | "URL" | "Link";
  tags: string[];
};

export const NoteCard: React.FC<NoteCardProps> = ({ title, link, type, tags }) => {
  return (
    <div className="bg-[#0F1629]/70 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg h-full flex flex-col">
      <h3 className="text-base sm:text-lg font-semibold text-gray-300 flex gap-2 sm:gap-3 items-start sm:items-center break-words">
        <span className="flex-shrink-0 mt-0.5 sm:mt-0">{typeIcons[type]}</span>
        <span className="break-words">{title}</span>
      </h3>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mt-2 hover:underline block break-all text-sm sm:text-base"
        >
          {link}
        </a>
      )}

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-0.5 sm:py-1 rounded-full bg-gray-700/50 text-gray-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
