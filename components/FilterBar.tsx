import React, { memo, useRef, useState } from 'react';
import { Search, X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  showFavorites: boolean;
  categories: string[];
}

const FilterBarComponent: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showFavorites,
  categories
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200;
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    isDragging.current = false;
    if (scrollContainerRef.current) {
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    // isDragging check happens in the onClick of the buttons
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX.current) * 2; // Scroll speed multiplier
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
      
      if (Math.abs(x - startX.current) > 5) {
        isDragging.current = true;
      }
    }
  };

  const handleCategoryClick = (category: Category) => {
    if (isDragging.current) return;
    onCategoryChange(category);
  };

  return (
    <div className="max-w-4xl mx-auto animate-slide-up sticky top-24 z-40" style={{ animationDelay: '0.2s' }}>
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl shadow-black/50 flex flex-col md:flex-row gap-2">
            
            {/* Glass Input */}
            <div className="relative flex-grow group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-10 py-3.5 bg-white/5 border border-transparent rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm font-medium"
                    placeholder="Search vault..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                 {searchQuery && (
                    <button 
                        onClick={() => onSearchChange('')}
                        className="absolute inset-y-0 right-2 flex items-center"
                    >
                        <div className="p-1 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-colors">
                            <X size={16} />
                        </div>
                    </button>
                )}
            </div>

            {/* Divider for Mobile */}
            <div className="h-px w-full bg-white/5 md:hidden"></div>

            {/* Scrollable Pills Container */}
            <div className="relative flex-shrink-0 md:max-w-[60%] overflow-hidden rounded-2xl bg-white/5 group/pills">
                
                {/* Left Arrow Control */}
                <button 
                    onClick={(e) => { e.stopPropagation(); scroll('left'); }}
                    className="absolute left-0 top-0 bottom-0 z-20 w-8 flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent text-slate-400 hover:text-white opacity-0 group-hover/pills:opacity-100 transition-opacity duration-300"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Right Arrow Control */}
                 <button 
                    onClick={(e) => { e.stopPropagation(); scroll('right'); }}
                    className="absolute right-0 top-0 bottom-0 z-20 w-10 flex items-center justify-center bg-gradient-to-l from-slate-900 via-slate-900/90 to-transparent text-slate-400 hover:text-white opacity-0 group-hover/pills:opacity-100 transition-opacity duration-300"
                >
                    <ChevronRight size={16} />
                </button>

                 {/* Fade Masks (Always visible for aesthetics, buttons sit on top) */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-slate-900/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900/80 to-transparent z-10 pointer-events-none"></div>
                
                <div 
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={`flex items-center gap-1 overflow-x-auto p-1.5 h-full hide-scrollbar ${isDown ? 'cursor-grabbing' : 'cursor-grab scroll-smooth'}`}
                >
                     <button
                        onClick={() => handleCategoryClick(Category.ALL)}
                        className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border select-none
                            ${selectedCategory === Category.ALL
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-900/50'
                            : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
                            }`}
                        >
                        All
                    </button>

                    {showFavorites && (
                        <button
                        onClick={() => handleCategoryClick(Category.FAVORITES)}
                        className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border select-none
                            ${selectedCategory === Category.FAVORITES
                            ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-900/50'
                            : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
                            }`}
                        >
                        <Heart size={12} className={selectedCategory === Category.FAVORITES ? 'fill-white' : ''} />
                        Favorites
                        </button>
                    )}

                    {categories.map((category) => (
                        <button
                        key={category}
                        onClick={() => handleCategoryClick(category as Category)}
                        className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border select-none
                            ${selectedCategory === category
                            ? 'bg-slate-700 text-white border-slate-600 shadow-lg'
                            : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
                            }`}
                        >
                        {category}
                        </button>
                    ))}
                    
                    {/* Padding for right scroll */}
                    <div className="w-4 shrink-0 h-1"></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export const FilterBar = memo(FilterBarComponent);