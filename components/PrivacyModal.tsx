
import React from 'react';
import { X, Shield, Lock, Eye, Server } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <Shield className="text-emerald-400" size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white">Data Privacy & Security</h2>
                <p className="text-xs text-slate-400">Compliance with Data Privacy Act of 2012</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar text-slate-300 space-y-8">
            
            <section>
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                    <Server size={18} className="text-indigo-400" />
                    Data Storage & Encryption
                </h3>
                <p className="text-sm leading-relaxed text-slate-400 mb-4">
                    We utilize <strong>Supabase (PostgreSQL)</strong> as our backend infrastructure. All data is encrypted both in transit (via TLS 1.3) and at rest (via AES-256).
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
                    <li>We do <strong className="text-slate-200">not</strong> store passwords. We use passwordless "Magic Link" authentication.</li>
                    <li>Row Level Security (RLS) is enforced: You can only read/write your own data.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                    <Eye size={18} className="text-indigo-400" />
                    Data Collection
                </h3>
                <p className="text-sm leading-relaxed text-slate-400 mb-2">
                    We collect the minimum amount of data required to verify your student status:
                </p>
                <div className="bg-slate-950 rounded-lg border border-slate-800 p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="block text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Stored Data</span>
                            <ul className="space-y-1 text-slate-300">
                                <li>• Email Address</li>
                                <li>• Verification Status</li>
                                <li>• University Domain (e.g., up.edu.ph)</li>
                                <li>• Saved Favorites</li>
                            </ul>
                        </div>
                        <div>
                            <span className="block text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">NOT Collected</span>
                            <ul className="space-y-1 text-emerald-400/80">
                                <li>× Student ID Numbers</li>
                                <li>× Passwords</li>
                                <li>× Physical Address</li>
                                <li>× Grades or Academic Records</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                    <Lock size={18} className="text-indigo-400" />
                    Your Rights
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                    You have the right to request the deletion of your account and all associated data at any time. Contact our Data Privacy Officer at <span className="text-white underline">privacy@studentperks.ph</span> for requests.
                </p>
            </section>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end">
            <button
                onClick={onClose}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-xl transition-all"
            >
                I Understand
            </button>
        </div>
      </div>
    </div>
  );
};
