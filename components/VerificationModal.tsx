
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

    // 1. Strict Regex Validation
    const eduPhRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.ph$/;

    if (!eduPhRegex.test(email)) {
      setError('Invalid format. Must be a valid school email ending in .edu.ph');
      setIsLoading(false);
      return;
    }

    try {
      if (isSupabaseConfigured() && currentUser) {
         // 2. Database Update (if Supabase is active)
         const { error: updateError } = await supabase
           .from('profiles')
           .update({ 
             is_verified: true,
             university: email.split('@')[1], // Extract domain as university
             email: email // Update email in profile if different
           })
           .eq('id', currentUser.id);

         if (updateError) throw updateError;
      } else {
          // Fallback simulation delay for demo purposes if Supabase isn't connected
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
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl transform transition-all animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900 p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <GraduationCap className="text-indigo-400" size={24} />
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <h2 className="text-xl font-bold text-white">Student Verification</h2>
          <p className="text-slate-400 text-sm mt-1">
            Unlock exclusive deals by verifying your student status.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <Check className="text-green-400 w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Verified Successfully!</h3>
              <p className="text-slate-400">Unlocking your benefits...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  School Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan@university.edu.ph"
                    className={`w-full bg-slate-950 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                    autoFocus
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-xs animate-fade-in">
                    <AlertCircle size={12} />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              <div className="bg-slate-800/50 rounded-lg p-3 mt-4 border border-slate-700/50">
                <div className="flex gap-2 items-start">
                    <ShieldCheck size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                            <strong className="text-slate-300">Data Privacy Protected:</strong> We verify your .edu.ph email to confirm eligibility. Your data is securely encrypted.
                        </p>
                    </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
