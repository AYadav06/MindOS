import { FileText, LinkIcon, Twitter, Youtube } from "lucide-react";
import type { NoteCardProps } from "./NoteCard";

export const typeIcons: Record<NoteCardProps["type"], React.ReactNode> = {
  YouTube: <Youtube  className="w-5 h-5 text-red-500" />,
  Notes: <FileText  className="w-5 h-5 text-blue-500" />,
  Tweets: <Twitter className="w-5 h-5 text-sky-500" />,
  URL: <LinkIcon className="w-5 h-5 text-green-500" />,
  Link: <LinkIcon className="w-5 h-5  text-green-500" />,
};