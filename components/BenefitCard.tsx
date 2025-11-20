import React, { useState, memo } from 'react';
import { Lock, Heart, Zap, ArrowRight } from 'lucide-react';
import { Benefit } from '../types';

interface BenefitCardProps {
  benefit: Benefit;
  isVerified: boolean;
  isFavorite: boolean;
  onUnlockRequest: () => void;
  onToggleFavorite: () => void;
  variant?: 'default' | 'compact';
}

const BenefitCardComponent: React.FC<BenefitCardProps> = ({ 
  benefit, 
  isVerified, 
  isFavorite,
  onUnlockRequest,
  onToggleFavorite,
  variant = 'default'
}) => {
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const isCompact = variant === 'compact';
  
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
      className="group relative h-full flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:z-30 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.25)]"
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
      <div className={`relative w-full ${isCompact ? 'p-2' : 'p-2'}`}>
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
              <div className={`absolute top-2 left-2 z-20 bg-black/60 backdrop-blur-md text-amber-400 font-bold rounded-lg flex items-center gap-1 border border-amber-500/20 shadow-lg
                ${isCompact ? 'text-[8px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1'}
              `}>
                 <Zap size={isCompact ? 8 : 10} className="fill-amber-400" /> POPULAR
              </div>
            )}

            {/* Favorite Button */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
                className={`absolute top-2 right-2 z-30 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/70 transition-all border border-white/10 group-hover:scale-105
                    ${isCompact ? 'p-1.5' : 'p-1.5 sm:p-2'}
                `}
            >
                <Heart 
                    size={isCompact ? 12 : 14} 
                    className={`transition-all drop-shadow-md ${!isCompact && 'sm:w-4 sm:h-4'} ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white/80 hover:text-white'}`} 
                />
            </button>

            {/* Logo Badge - Floating on bottom left of image */}
            <div 
                className={`absolute z-30 rounded-xl shadow-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105
                ${isCompact 
                  ? 'w-10 h-10 p-1.5 bottom-2 left-2 bg-white' 
                  : 'w-16 h-16 p-3 bottom-2 left-2 sm:w-16 sm:h-16 sm:p-3 sm:bottom-3 sm:left-3 bg-white'}
                `}
                style={logoError ? { backgroundColor: benefit.brandColor } : {}}
            >
                {!logoError ? (
                    <img 
                        src={benefit.logoUrl} 
                        alt={benefit.provider} 
                        className="w-full h-full object-contain"
                        onError={() => setLogoError(true)}
                    />
                ) : (
                    // Fallback if logo fails
                    <span className="text-[8px] font-bold text-white opacity-50">IMG</span>
                )}
            </div>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className={`flex flex-col flex-grow relative z-10 ${isCompact ? 'px-3 pb-3 pt-2' : 'px-3 pb-3 sm:px-5 sm:pb-5 pt-2 sm:pt-3'}`}>
        
        <div className={`${isCompact ? 'mb-1' : 'mb-2 sm:mb-3'}`}>
            <div className={`font-bold uppercase tracking-widest text-indigo-300 opacity-80 ${isCompact ? 'text-[8px] mb-0.5' : 'text-[9px] sm:text-[10px] mb-1'}`}>
                {benefit.provider}
            </div>
            <h3 className={`font-bold text-white leading-tight group-hover:text-indigo-200 transition-colors ${isCompact ? 'text-sm' : 'text-sm sm:text-lg'}`}>
                {benefit.name}
            </h3>
        </div>

        <p className={`text-slate-400 leading-relaxed line-clamp-2 ${isCompact ? 'text-[10px] mb-2' : 'text-xs sm:text-sm mb-2 sm:mb-4'}`}>
            {benefit.description}
        </p>

        {/* Features Pills - Hidden on Compact Mode to save space */}
        {!isCompact && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-6 mt-auto">
                {benefit.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md bg-white/5 border border-white/5 text-[9px] sm:text-[10px] text-slate-300 font-medium">
                        {feature}
                    </span>
                ))}
            </div>
        )}

        {/* Footer Area */}
        <div className={`flex items-center justify-between gap-2 sm:gap-3 border-t border-white/5 ${isCompact ? 'pt-2 mt-auto' : 'pt-2 sm:pt-4 mt-auto'}`}>
            
            <div>
                <div className={`uppercase tracking-wider text-slate-500 font-bold ${isCompact ? 'text-[8px]' : 'text-[9px] sm:text-[10px]'}`}>Value</div>
                <div className="flex items-center gap-2">
                    <span className={`font-bold ${isFree ? 'text-emerald-400' : 'text-white'} ${isCompact ? 'text-xs' : 'text-xs sm:text-base'}`}>
                        {benefit.studentPrice}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <button 
                onClick={handleActionClick}
                className={`rounded-xl font-bold flex items-center gap-1.5 transition-all duration-300 shadow-lg
                    ${isVerified 
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 border border-indigo-400/20' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-white/5'
                    }
                    ${isCompact ? 'h-7 px-3 text-[10px]' : 'h-8 sm:h-10 px-3 sm:px-5 text-[10px] sm:text-sm'}
                `}
            >
                {isVerified ? (
                    <>Visit <ArrowRight size={isCompact ? 10 : 12} className={!isCompact ? "sm:w-[14px] sm:h-[14px]" : ""} /></>
                ) : (
                    <>Unlock <Lock size={isCompact ? 10 : 12} className={!isCompact ? "sm:w-[14px] sm:h-[14px]" : ""} /></>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export const BenefitCard = memo(BenefitCardComponent);