
import React, { useState } from 'react';
import { Lock, Heart, Zap, ExternalLink, ArrowRight } from 'lucide-react';
import { Benefit } from '../types';

interface BenefitCardProps {
  benefit: Benefit;
  isVerified: boolean;
  isFavorite: boolean;
  onUnlockRequest: () => void;
  onToggleFavorite: () => void;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ 
  benefit, 
  isVerified, 
  isFavorite,
  onUnlockRequest,
  onToggleFavorite
}) => {
  const [imgError, setImgError] = useState(false);
  
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVerified) {
      window.open(benefit.link, '_blank', 'noopener,noreferrer');
    } else {
      onUnlockRequest();
    }
  };

  const isFree = benefit.studentPrice.toLowerCase().includes('free');

  return (
    <div 
      className="group relative h-full flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
      style={{
        '--brand-color': benefit.brandColor,
      } as React.CSSProperties}
    >
      {/* Dynamic Brand Gradient Overlay - Subtle Top Tint */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 opacity-30 pointer-events-none transition-opacity group-hover:opacity-50"
        style={{
            background: `linear-gradient(to bottom, ${benefit.brandColor}40, transparent)`
        }}
      />

      {/* 1. Image Section */}
      <div className="relative w-full p-3">
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-slate-900/50 shadow-inner border border-white/5">
            
            {!imgError ? (
                <img 
                    src={benefit.coverImage} 
                    alt={benefit.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <span className="text-xs text-slate-600 font-mono uppercase tracking-widest">{benefit.provider}</span>
                </div>
            )}

            {/* Overlay Gradient on Image for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>

            {/* Popular Badge */}
            {benefit.popular && (
              <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-amber-500/20 shadow-lg">
                 <Zap size={10} className="fill-amber-400" /> POPULAR
              </div>
            )}

            {/* Favorite Button */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
                className="absolute top-3 right-3 z-30 p-2 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/70 transition-all border border-white/10 group-hover:scale-105"
            >
                <Heart 
                    size={16} 
                    className={`transition-all drop-shadow-md ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white/80 hover:text-white'}`} 
                />
            </button>

            {/* Logo Badge - Floating on bottom left of image */}
            <div className="absolute bottom-3 left-3 z-30 w-10 h-10 rounded-lg bg-white p-1 shadow-lg overflow-hidden">
                <img 
                    src={benefit.logoUrl} 
                    alt={benefit.provider} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.style.backgroundColor = benefit.brandColor;
                    }}
                />
            </div>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="px-5 pt-2 pb-5 flex flex-col flex-grow relative z-10">
        
        <div className="mb-3">
            <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-1 opacity-80">{benefit.provider}</div>
            <h3 className="font-bold text-white text-lg leading-tight group-hover:text-indigo-200 transition-colors">
                {benefit.name}
            </h3>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {benefit.description}
        </p>

        {/* Features Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
            {benefit.features.slice(0, 2).map((feature, idx) => (
                <span key={idx} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-medium">
                    {feature}
                </span>
            ))}
        </div>

        {/* Footer Area */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/5">
            
            <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Value</div>
                <div className="flex items-center gap-2">
                    <span className={`text-base font-bold ${isFree ? 'text-emerald-400' : 'text-white'}`}>
                        {benefit.studentPrice}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <button 
                onClick={handleActionClick}
                className={`h-10 px-5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-lg
                    ${isVerified 
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 border border-indigo-400/20' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-white/5'
                    }`}
            >
                {isVerified ? (
                    <>Visit <ArrowRight size={14} /></>
                ) : (
                    <>Unlock <Lock size={14} /></>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};
