import React, { memo } from 'react';
import { GraduationCap, Lock } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

const FooterComponent: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-xl border-t border-white/5 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600/20 border border-indigo-500/30 rounded-lg flex items-center justify-center">
              <GraduationCap size={16} className="text-indigo-400" />
            </div>
            <span className="text-slate-300 font-bold tracking-tight">StudentPerksPH</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
              <button 
                  onClick={onOpenPrivacy}
                  className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors font-medium uppercase tracking-wider"
              >
                  <Lock size={12} />
                  Privacy Protocol
              </button>
              <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} Unofficial Directory.
              </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);