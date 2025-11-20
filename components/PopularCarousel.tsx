
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
      const scrollAmount = 300; // Increased scroll amount for better desktop navigation
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
    <div className="w-full mb-6 sm:mb-12 animate-slide-up relative group/carousel mt-4 sm:mt-8" style={{ animationDelay: '0.4s' }}>
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-2 sm:mb-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative p-1.5 sm:p-2 bg-orange-500/10 rounded-xl border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
             <Flame className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Hot with Students</h2>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Trending This Week</p>
          </div>
        </div>
        
        {/* Scroll Controls */}
        <div className="hidden md:flex gap-2 opacity-50 group-hover/carousel:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 backdrop-blur-md z-20"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 backdrop-blur-md z-20"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container 
          - Increased py-10 to py-12 to ensure shadows/glows are not cut off vertically.
          - Changed snap-mandatory to snap-proximity for less frustrating, freer scrolling.
          - Added scroll-pl-* classes to ensure the first item aligns correctly with padding when snapping back.
      */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 px-4 sm:px-6 lg:px-8 py-12 snap-x snap-proximity hide-scrollbar items-stretch scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-8"
      >
        {benefits.map((benefit) => (
          <div 
            key={benefit.id} 
            className="w-[220px] sm:w-[280px] lg:w-[320px] snap-start flex-shrink-0"
          >
             <BenefitCard 
                benefit={benefit} 
                isVerified={user?.isVerified || false}
                isFavorite={user?.favorites.includes(benefit.id) || false}
                onUnlockRequest={onUnlockRequest}
                onToggleFavorite={() => onToggleFavorite(benefit.id)}
                variant="compact"
             />
          </div>
        ))}
        {/* Spacer for right padding visual */}
        <div className="w-2 sm:w-4 flex-shrink-0" /> 
      </div>
      
      {/* Fade Overlay for Right Edge on Desktop - reduced opacity to interfere less with glow */}
      <div className="absolute top-20 bottom-20 right-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/50 to-transparent pointer-events-none z-10 hidden lg:block" />
    </div>
  );
};
