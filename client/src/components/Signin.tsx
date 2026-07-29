import React, { useRef, useState } from "react";
import { Check, Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export const Signin: React.FC = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value;

      if (!email || !password) {
        setError("Please enter both email and password");
        return;
      }

      setIsLoading(true);
      try {
        await signin(email, password);
        navigate("/dashboard");
      } catch (err: any) {
        console.error("Signin error:", err);
        setError(
          err.response?.data?.message || "Failed to sign in. Check your credentials."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className=" backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="text-center mb-8">
            <h2 className="text-gray-300 text-2xl font-bold mb-2">Sign In</h2>
          </div>
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-gray-500 focus:bg-white/15 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-gray-500 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
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
                type="button"
                onClick={() => navigate("/signup")}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium underline"
              >
                Need an account?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-l from-blue-950 via-black to-blue-950 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
