
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
      // Scroll by roughly one card width or a percentage of the view
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
    <div className="w-full mb-12 animate-slide-up relative group/carousel" style={{ animationDelay: '0.4s' }}>
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 blur-lg opacity-20 animate-pulse"></div>
            <div className="relative p-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
               <Flame className="text-orange-500 fill-orange-500/20" size={24} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Hot with Students</h2>
            <p className="text-sm text-zinc-500 font-medium">Trending perks claimed this week</p>
          </div>
        </div>
        
        {/* Scroll Controls */}
        <div className="hidden md:flex gap-2 opacity-50 group-hover/carousel:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-white/20 transition-all active:scale-95 backdrop-blur-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-white/20 transition-all active:scale-95 backdrop-blur-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-5 px-4 sm:px-6 lg:px-8 pb-10 pt-2 snap-x snap-mandatory hide-scrollbar items-stretch"
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
        {/* Padding div to ensure last item is fully viewable with right padding */}
        <div className="w-1 flex-shrink-0" /> 
      </div>
      
      {/* Fade Overlay for Right Edge on Desktop */}
      <div className="absolute top-24 bottom-10 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10 hidden lg:block" />
    </div>
  );
};
