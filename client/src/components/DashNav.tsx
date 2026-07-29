
import React from 'react';
import { useNavigate } from 'react-router-dom';

 export const DashNavbar: React.FC = () => {
  const navigate=useNavigate();
  return (
    <nav className="sticky top-0 z-50 h-16 sm:h-20 flex items-center justify-between p-3 sm:p-4 px-4 sm:px-6 lg:px-10 bg-[#0F1629]/70 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg text-gray-300">
      <div className="flex items-center gap-2 sm:gap-3">
        <span onClick={()=>navigate("/")} className="text-lg sm:text-xl lg:text-2xl font-bold hover:cursor-pointer">Mind-OS</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={()=>navigate("/share")}
        className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium transition-colors shadow-sm rounded-lg bg-light-secondary hover:bg-light-accent">
          <span className="hidden sm:inline">Share</span>
          <span className="sm:hidden">S</span>
        </button>
        <button onClick={()=>navigate("/profile")}
        className="px-3 py-1.5 sm:px-4 sm:py-2 w-10 h-10 sm:w-12 sm:h-12 font-medium transition-colors rounded-3xl shadow-sm bg-light-secondary hover:bg-light-accent text-sm sm:text-base">
        A
        </button>
      </div>
    </nav>
  );
};

