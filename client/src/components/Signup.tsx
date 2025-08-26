import React from 'react';
import { Eye, Mail, Lock, User} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const Signup: React.FC = () => {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="bg-white/0 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-gray-300 text-2xl font-bold">Create Account</h2>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-gray-500 focus:bg-white/15 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-gray-500 focus:bg-white/15 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-gray-500 focus:bg-white/15 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <button className="w-full mt-2 py-4 bg-gradient-to-l from-blue-950 via-black to-blue-950 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span>Create Account</span>
            </button>
            {/* Switch to Sign In */}
            <div className="text-center mt-2">
              <p className="text-white/60 text-sm">
                Already have an account?{' '}
                <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 underline"
                onClick={()=>navigate('/signin')}>
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SIGNIN COMPONENT - UI ONLY
