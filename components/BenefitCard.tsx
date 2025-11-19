
import React from 'react';
import { Lock, Heart, Zap, ArrowRight, Check, ExternalLink } from 'lucide-react';
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
    <div className="group relative h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-900/20 flex flex-col">
      
      {/* 1. Cover Image Area */}
      <div className="relative h-40 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
        <img 
          src={benefit.coverImage} 
          alt={benefit.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        
        {/* Badge: Popular */}
        {benefit.popular && (
          <div className="absolute top-3 left-3 z-20 bg-amber-500/90 text-black text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg backdrop-blur-sm">
             <Zap size={10} className="fill-black" /> POPULAR
          </div>
        )}

        {/* Badge: Price (Floating on Image) */}
        <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end">
            <div className={`px-3 py-1.5 rounded-lg backdrop-blur-md border shadow-lg flex flex-col items-end
                ${isFree 
                    ? 'bg-emerald-900/60 border-emerald-500/30 text-emerald-300' 
                    : 'bg-slate-900/60 border-white/20 text-white'
                }`}
            >
                <span className="font-bold text-sm leading-none">{benefit.studentPrice}</span>
                <span className="text-[10px] opacity-70 line-through decoration-white/50 leading-none mt-0.5">
                    {benefit.originalPrice}
                </span>
            </div>
        </div>
      </div>

      {/* 2. Card Body */}
      <div className="p-5 flex flex-col flex-grow relative z-20 -mt-2">
        
        {/* Header: Logo & Title */}
        <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shrink-0 p-0.5 overflow-hidden shadow-sm">
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
                <div>
                    <h3 className="font-bold text-zinc-100 text-lg leading-tight group-hover:text-indigo-400 transition-colors">
                        {benefit.name}
                    </h3>
                    <p className="text-xs text-zinc-500 uppercase font-medium tracking-wider mt-0.5">
                        {benefit.provider}
                    </p>
                </div>
            </div>

            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
                className="text-zinc-600 hover:text-rose-500 transition-colors -mr-1 p-1"
            >
                <Heart 
                    size={18} 
                    className={`transition-all ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} 
                />
            </button>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
            {benefit.description}
        </p>

        {/* Features List (Explicitly Visible) */}
        <ul className="space-y-2 mb-6">
            {benefit.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <Check size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        {/* Footer: Unlock Button */}
        <div className="mt-auto pt-4 border-t border-white/5">
            <button 
                onClick={handleActionClick}
                className={`w-full relative overflow-hidden rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300
                    ${isVerified 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/20' 
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                    }`}
            >
                {isVerified ? (
                    <>
                        Visit Website <ExternalLink size={14}