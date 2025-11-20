
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Benefit } from '../types';
import { BenefitCard } from './BenefitCard';

interface PopularCarouselProps {
  benefits: Benefit[];
  user: any;
  onUnlockRequest: () => void;
  onToggleFavorite: (id: string) => void;
}

export const PopularCarousel: React.FC<PopularCarouselProps> = ({
  benefits,
  user,
  onUnlockRequest,
  onToggleFavorite
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth < 600 ? 320 : container.clientWidth * 0.5;
      const currentScroll = container.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
        
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (benefits.length === 0) return null;

  return (
    <div className="w-full mb-12 animate-slide-up relative group/carousel mt-8" style={{ animationDelay: '0.4s' }}>
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-orange-500/10 rounded-xl border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
             <Flame className="text-orange-500" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Hot with Students</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Trending This Week</p>
          </div>
        </div>
        
        {/* Scroll Controls */}
        <div className="hidden md:flex gap-2 opacity-50 group-hover/carousel:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 backdrop-blur-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 backdrop-blur-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-5 px-4 sm:px-6 lg:px-8 pb-8 snap-x snap-mandatory hide-scrollbar items-stretch"
      >
        {benefits.map((benefit) => (
          <div 
            key={benefit.id} 
            className="min-w-[85vw] sm:min-w-[380px] md:min-w-[360px] snap-center h-auto flex-shrink-0"
          >
             <BenefitCard 
                benefit={benefit} 
                isVerified={user?.isVerified || false}
                isFavorite={user?.favorites.includes(benefit.id) || false}
                onUnlockRequest={onUnlockRequest}
                onToggleFavorite={() => onToggleFavorite(benefit.id)}
             />
          </div>
        ))}
        <div className="w-4 flex-shrink-0" /> 
      </div>
      
      {/* Fade Overlay for Right Edge on Desktop */}
      <div className="absolute top-20 bottom-10 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10 hidden lg:block" />
    </div>
  );
};
