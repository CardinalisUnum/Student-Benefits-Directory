import React, { memo } from 'react';
import { GraduationCap, ShieldCheck, ShieldAlert, LogOut, LogIn } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  onOpenVerification: () => void;
  onLogoClick: () => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({ 
  user, 
  onLogout, 
  onOpenAuth, 
  onOpenVerification,
  onLogoClick
}) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogoClick}>
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl bg-white/5 border border-white/10 shadow-inner">
              <GraduationCap className="text-indigo-400 relative z-10" size={20} />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-cyan-500/20" />
            </div>
            <div>
               <h1 className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                StudentPerks<span className="text-cyan-400">PH</span>
               </h1>
               <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Official Directory</p>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div 
                  onClick={() => !user.isVerified && onOpenVerification()}
                  className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer backdrop-blur-md
                    ${user.isVerified 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-default shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] animate-pulse'
                    }`}
                >
                  {user.isVerified ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                  <span>{user.isVerified ? 'VERIFIED' : 'UNVERIFIED'}</span>
                </div>

                <div className="flex items-center gap-3 pl-4 md:border-l md:border-white/10">
                  <div className="hidden md:block text-right">
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Logged in as</div>
                    <div className="text-sm font-bold text-white max-w-[120px] truncate">{user.email.split('@')[0]}</div>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10"
                    title="Log Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <LogIn size={16} />
                <span>Access Vault</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Navbar = memo(NavbarComponent);