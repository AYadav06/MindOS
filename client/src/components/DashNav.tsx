
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import api from '../utils/api';
import { Share2, LogOut, Brain, Check, Copy } from 'lucide-react';

export const DashNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const res = await api.post('/api/v1/brain/share', { share: true });
      if (res.data.link) {
        setShareUrl(res.data.link);
        setShowShareModal(true);
      }
    } catch (err) {
      console.error('Error sharing brain:', err);
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 sm:h-20 flex items-center justify-between p-3 sm:p-4 px-4 sm:px-6 lg:px-10 bg-[#0F1629]/70 border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-lg text-gray-300">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
          >
            <Brain className="w-6 h-6 text-blue-500" />
            <span>Mind-OS</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium transition-all shadow-sm rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 hover:text-white"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share Brain</span>
          </button>

          <div className="flex items-center gap-2 border-l border-white/10 pl-2 sm:pl-4">
            <div
              title={user?.email || user?.name}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 font-bold rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-md text-sm sm:text-base"
            >
              {initial}
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </nav>

      {showShareModal && shareUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F1629] border border-white/15 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-400" /> Share Your Brain
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-400">
              Anyone with this link can view your saved brain content:
            </p>

            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl p-2.5">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent flex-1 text-sm text-blue-300 outline-none truncate"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


