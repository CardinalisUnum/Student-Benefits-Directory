
import React from 'react';
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
      className="group relative w-full bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full hover:-translate-y-1"
      style={{
        // Dynamic variable for the hover glow
        '--brand-color': benefit.brandColor,
      } as React.CSSProperties}
    >
      {/* Hover Glow Effect using CSS var */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 bg-gradient-to-br from-[var(--brand-color)]/20 to-transparent blur-xl" />
      
      {/* Active Border on Hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[var(--brand-color)]/50 transition-colors duration-500 z-20 pointer-events-none" />

      {/* 1. Image Section (Aspect Ratio Video for consistency) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800 z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 z-10"></div>
        
        <img 
          src={benefit.coverImage} 
          alt={benefit.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
          loading="lazy"
        />

        {/* Popular Pill */}
        {benefit.popular && (
          <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-500/20">
             <Zap size={10} className="fill-amber-400" /> POPULAR
          </div>
        )}

        {/* Floating Logo Badge (Overlapping image and body) */}
        <div className="absolute -bottom-5 left-4 z-30">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 p-1 shadow-xl shadow-black/50 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center p-0.5">
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

        <button 
            onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
            }}
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/60 transition-all border border-white/5"
        >
            <Heart 
                size={18} 
                className={`transition-all drop-shadow-md ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} 
            />
        </button>
      </div>

      {/* 2. Content Body */}
      <div className="pt-8 pb-5 px-5 flex flex-col flex-grow relative z-10">
        
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="font-bold text-slate-100 text-lg leading-snug group-hover:text-white transition-colors">
                    {benefit.name}
                </h3>
                <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                    {benefit.provider} 
                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                    <span className="text-slate-600 uppercase tracking-wider text-[10px]">{benefit.category}</span>
                </div>
            </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2 mt-2">
            {benefit.description}
        </p>

        {/* Features Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
            {benefit.features.slice(0, 2).map((feature, idx) => (
                <span key={idx} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-medium">
                    {feature}
                </span>
            ))}
             {benefit.features.length > 2 && (
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-500 font-medium">
                    +{benefit.features.length - 2} more
                </span>
            )}
        </div>

        {/* Footer Area */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/5 pt-4">
            
            {/* Price Tag */}
            <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Student Price</div>
                <div className="flex items-baseline gap-1.5">
                    <span className={`text-lg font-bold ${isFree ? 'text-emerald-400' : 'text-white'}`}>
                        {benefit.studentPrice}
                    </span>
                    <span className="text-xs text-slate-600 line-through decoration-slate-600/50">
                        {benefit.originalPrice}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <button 
                onClick={handleActionClick}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-300 border
                    ${isVerified 
                        ? 'bg-white/10 border-white/10 text-white hover:bg-white hover:text-black hover:border-white' 
                        : 'bg-transparent border-white/10 text-slate-400 hover:border-slate-600 hover:text-slate-200'
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
