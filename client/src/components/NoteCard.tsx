import React from "react";
import { motion } from "framer-motion";
import { Youtube, FileText, Twitter, Link as LinkIcon } from "lucide-react";

export type NoteCardProps = {
  title: string;
  link?: string;
  type: "YouTube" | "Notes" | "Tweets" | "URL";
  tags: string[];
};

export const typeIcons: Record<NoteCardProps["type"], React.ReactNode> = {
  YouTube: <Youtube className="w-5 h-5 text-red-500" />,
  Notes: <FileText className="w-5 h-5 text-blue-500" />,
  Tweets: <Twitter className="w-5 h-5 text-sky-500" />,
  URL: <LinkIcon className="w-5 h-5 text-green-500" />,
};

export const NoteCard: React.FC<NoteCardProps> = ({ title, link, type, tags }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className=" bg-light-card rounded-xl shadow-md p-4 w-64 flex flex-col gap-3 border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        {typeIcons[type]}
        <span className="font-semibold text-gray-900">{type}</span>
      </div>

      {/* Content */}
      <div>
        <h3 className=" text-gray-800 font-semibold mb-1">{title}</h3>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline break-words"
        >
          { type=='Notes'?"Your notes here":link}
        </a>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
