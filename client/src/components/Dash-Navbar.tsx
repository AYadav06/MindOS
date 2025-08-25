
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../icons/Logo';

 export const DashNavbar: React.FC = () => {
  const navigate=useNavigate();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-4 px-10  bg-bg backdrop-blur-md text-light-text shadow-sm">
      <div className="flex items-center gap-3 ml-20">
        <Logo/>
        <span className="text-2xl font-bold">Mind-OS</span>
      </div>
      <div className="flex items-center gap-4">
        <button   onClick={()=>navigate("/share")}
        className="px-4 py-2 mr-5 font-medium transition-colors shadow-sm rounded-lg bg-light-secondary hover:bg-light-accent">
          Share
        </button>
        <button  onClick={()=>navigate("/profile")}
        className=" px-4 py-2 mr-20  w-12 h-12 font-medium transition-colors rounded-3xl shadow-sm bg-light-secondary hover:bg-light-accent">
        A
        </button>
      </div>
    </nav>
  );
};

