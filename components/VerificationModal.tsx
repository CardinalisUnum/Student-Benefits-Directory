
import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Check, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { User } from '../types';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onVerificationSuccess: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, currentUser, onVerificationSuccess }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail(currentUser?.email?.endsWith('.edu.ph') ? currentUser.email : '');
      setError('');
      setIsSuccess(false);
      setIsLoading(false);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const eduPhRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.ph$/;

    if (!eduPhRegex.test(email)) {
      setError('Invalid format. Must be a valid school email ending in .edu.ph');
      setIsLoading(false);
      return;
    }

    try {
      if (isSupabaseConfigured() && currentUser) {
         const { error: updateError } = await supabase
           .from('profiles')
           .update({ 
             is_verified: true,
             university: email.split('@')[1], 
             email: email
           })
           .eq('id', currentUser.id);

         if (updateError) throw updateError;
      } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setIsSuccess(true);
      setTimeout(() => {
        onVerificationSuccess();
        onClose();
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl shadow-2xl transform transition-all animate-slide-up overflow-hidden">
        {/* Ambient glow inside modal */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/20 blur-[50px] pointer-events-none"></div>

        {/* Header */}
        <div className="p-6 border-b border-white/5 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <GraduationCap className="text-indigo-400" size={24} />
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Student Verification</h2>
          <p className="text-slate-400 text-sm mt-1">
            Access the vault. Verify your student status.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 relative z-10">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Check className="text-emerald-400 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Verified</h3>
              <p className="text-slate-400 text-sm">Vault unlocked. Enjoy your perks.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  University Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan@university.edu.ph"
                    className={`w-full bg-slate-950/50 border ${error ? 'border-rose-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner`}
                    autoFocus
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 mt-3 text-rose-400 text-xs animate-fade-in bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Status'
                  )}
                </button>
              </div>

              {/* Security & Privacy Disclaimer */}
              <div className="flex gap-3 items-start mt-4 px-1">
                 <ShieldCheck size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                 <p className="text-[10px] text-slate-500 leading-relaxed">
                    <strong>Privacy Protocol:</strong> We only verify domain validity. No personal data or grades are accessed. Data is encrypted.
                 </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
