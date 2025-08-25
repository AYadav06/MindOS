
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../icons/Logo';

 export const Navbar: React.FC = () => {
  const navigate=useNavigate();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-4 px-6  bg-bg backdrop-blur-md text-light-text shadow-sm">
      <div className="flex items-center gap-3">
        <Logo/>
        <span className="text-2xl font-bold">Mind-OS</span>
      </div>
      <div className="hidden gap-8 font-medium md:flex">
        <a href="#features" className="hover:text-light-primary transition-colors">Features</a>
        <a href="#pricing" className="hover:text-light-primary transition-colors">Pricing</a>
        <a href="#blog" className="hover:text-light-primary transition-colors">Blog</a>
      </div>
      <div className="flex items-center gap-4">
        <button   onClick={()=>navigate("/signin")}
        className="px-4 py-2 font-medium transition-colors shadow-sm rounded-lg  hover:bg-light-secondary">
          Login
        </button>
        <button  onClick={()=>navigate("/signup")}
        className=" px-4 py-2 font-medium transition-colors rounded-lg sm:block shadow-sm hover:bg-light-secondary">
          Sign Up 
        </button>
      </div>
    </nav>
  );
};
