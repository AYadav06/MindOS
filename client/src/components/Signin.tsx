import axios from "axios";
import { Check,Eye, Lock, Mail } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Signin: React.FC = () => {
const navigate=useNavigate();
const emailRef=useRef<HTMLInputElement>(null);
const passwordRef=useRef<HTMLInputElement>(null);

const handleSubmit=async()=>{
if(emailRef.current && passwordRef.current){
const email=emailRef.current.value;
const password=passwordRef.current.value;

const res=await axios.post(BACKEND_URL +"/api/v1/signin",{
  email,password
})
const jwt=res.data.token;
console.log(jwt);
localStorage.setItem('Authorization',jwt);
  }
  navigate("/dashboard");
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className=" backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="text-center mb-8">
            <h2 className="text-gray-300 text-2xl font-bold mb-2">Sign In</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-gray-500 focus:bg-white/15 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                <input
                ref={passwordRef}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-gray-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                <button  
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-5 h-5 rounded border-2 border-white/30 group-hover:border-white/50 transition-all duration-200 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white opacity-0" />
                </div>
              </div>
              <span className="text-white/80 text-sm">Remember me</span>
            </label>
            <button 
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-l from-blue-950 via-black to-blue-950 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
