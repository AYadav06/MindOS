import React from "react";
import { typeIcons } from "./Constants";
import { Trash2, Sparkles, ExternalLink } from "lucide-react";

export type NoteCardProps = {
  contentId?: string;
  _id?: string;
  title: string;
  link?: string;
  type: "YouTube" | "Notes" | "Tweets" | "URL" | "Link";
  tags: string[];
  onDelete?: (id: string) => void;
  onAnalyze?: (note: NoteCardProps) => void;
};

export const NoteCard: React.FC<NoteCardProps> = ({
  contentId,
  _id,
  title,
  link,
  type,
  tags,
  onDelete,
  onAnalyze,
}) => {
  const targetId = _id || contentId;

  return (
    <div className="group relative bg-[#0F1629]/70 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg h-full flex flex-col justify-between hover:border-white/20 transition-all duration-300">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-gray-300 font-medium">
            <span className="p-1.5 bg-white/5 rounded-lg border border-white/10 flex-shrink-0">
              {typeIcons[type] || typeIcons["Notes"]}
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{type}</span>
          </div>

          <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onAnalyze && (
              <button
                onClick={() => onAnalyze({ contentId, _id, title, link, type, tags })}
                title="AI Analyze"
                className="p-1.5 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}
            {onDelete && targetId && (
              <button
                onClick={() => onDelete(targetId)}
                title="Delete item"
                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-gray-200 leading-snug break-words mb-2">
          {title}
        </h3>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm flex items-center gap-1.5 break-all line-clamp-2 hover:underline mb-3"
          >
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{link}</span>
          </a>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

