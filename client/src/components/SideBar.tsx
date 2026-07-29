import React from "react";
import { typeIcons } from "./Constants";
import { Layers } from "lucide-react";

interface SideBarProps {
  selectedFilter?: string;
  onSelectFilter?: (filter: string) => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  selectedFilter = "All",
  onSelectFilter,
}) => {
  const filters = [
    { label: "All", value: "All", icon: <Layers className="w-5 h-5 text-purple-400" /> },
    { label: "Notes", value: "Notes", icon: typeIcons["Notes"] },
    { label: "YouTube", value: "YouTube", icon: typeIcons["YouTube"] },
    { label: "Tweets", value: "Tweets", icon: typeIcons["Tweets"] },
    { label: "URL", value: "Link", icon: typeIcons["Link"] },
  ];

  return (
    <nav className="h-16 sm:h-20 w-screen px-2 sm:px-4 md:px-6 lg:px-10 bg-[#0F1629]/70 border-t border-white/10 p-2 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl text-gray-300 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm md:text-base lg:text-lg overflow-x-auto">
      {filters.map((item) => {
        const isActive = selectedFilter === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onSelectFilter && onSelectFilter(item.value)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl whitespace-nowrap cursor-pointer transition-all duration-200 ${
              isActive
                ? "bg-blue-600/30 border border-blue-500/50 text-white font-semibold shadow-md"
                : "hover:bg-slate-800/80 border border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

