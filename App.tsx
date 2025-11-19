import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShieldCheck, ShieldAlert, Filter, GraduationCap, Sparkles, LogIn, LogOut, Heart, MapPin, ExternalLink } from 'lucide-react';
import { BENEFITS_DATA, CATEGORIES } from './constants';
import { Category, User } from './types';
import { BenefitCard } from './components/BenefitCard';
import { VerificationModal } from './components/VerificationModal';
import { AuthModal } from './components/AuthModal';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);

  // Load User from LocalStorage on Mount
  useEffect(() => {
    const storedUser = localStorage.getItem('sbd_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Persist User Updates
  useEffect(() => {
    if (user) {
      localStorage.setItem('sbd_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sbd_user');
    }
  }, [user]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedCategory(Category.ALL);
  };

  const handleVerify = (email: string) => {
    if (user) {
      setUser({
        ...user,
        isVerified: true,
        verifiedEmail: email
      });
    }
  };

  const toggleFavorite = (benefitId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const isFav = user.favorites.includes(benefitId);
    let newFavorites;
    if (isFav) {
      newFavorites = user.favorites.filter(id => id !== benefitId);
    } else {
      newFavorites = [...user.favorites, benefitId];
    }

    setUser({
      ...user,
      favorites: newFavorites
    });
  };

  // This function is now passed to the card to handle the "Unlock" action
  const handleUnlockRequest = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else if (!user.isVerified) {
      setIsVerificationModalOpen(true);
    }
  };

  const filteredBenefits = useMemo(() => {
    return BENEFITS_DATA.filter((benefit) => {
      const matchesSearch = 
        benefit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        benefit.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        benefit.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      let matchesCategory = true;
      if (selectedCategory === Category.FAVORITES) {
        matchesCategory = user ? user.favorites.includes(benefit.id) : false;
      } else if (selectedCategory !== Category.ALL) {
        matchesCategory = benefit.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, user]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-300 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {
              setSelectedCategory(Category.ALL);
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-500 blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-inner border border-white/10">
                  <GraduationCap className="text-white" size={18} />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Student<span className="text-indigo-400">Perks</span><span className="text-xs text-zinc-500 ml-1 font-normal">PH</span>
              </span>
            </div>

            {/* Desktop User Controls */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div 
                    onClick={() => !user.isVerified && setIsVerificationModalOpen(true)}
                    className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer
                      ${user.isVerified 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-default' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20'
                      }`}
                  >
                    {user.isVerified ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                    <span>{user.isVerified ? 'Verified Student' : 'Unverified'}</span>
                  </div>

                  <div className="flex items-center gap-3 pl-3 md:border-l md:border-white/10">
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-medium text-zinc-200">{user.name}</div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-full text-sm font-bold transition-all"
                >
                  <LogIn size={16} />
                  <span>Log In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 animate-fade-in backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>Made for Filipino Students 🇵🇭</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 animate-slide-up leading-[1.1]">
              Premium software, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
                free for your studies.
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8 animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              Don't pay full price. Use your <span className="text-zinc-200 font-semibold">.edu.ph</span> email from any Philippine university or college to unlock thousands of pesos in software value.
            </p>

            {/* Search & Filter Island */}
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 animate-slide-up shadow-2xl shadow-black/50" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-3 bg-black/20 border border-transparent rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    placeholder="Search for Github, Spotify, Notion..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Categories Row with Scrollbar hidden on mobile, wrapped on desktop */}
                <div className="flex gap-2 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {user && (
                    <button
                      onClick={() => setSelectedCategory(Category.FAVORITES)}
                      className={`whitespace-nowrap px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 shrink-0
                        ${selectedCategory === Category.FAVORITES
                          ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/50'
                          : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
                        }`}
                    >
                      <Heart size={16} className={selectedCategory === Category.FAVORITES ? 'fill-rose-400' : ''} />
                      <span className="hidden md:inline">Favorites</span>
                    </button>
                  )}
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap px-5 py-3 rounded-xl text-sm font-medium transition-all shrink-0
                        ${selectedCategory === category
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                          : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {selectedCategory === Category.FAVORITES ? 'Your Saved Perks' : 'Available Benefits'}
            </h2>
            <span className="text-sm text-zinc-500">{filteredBenefits.length} items</span>
          </div>

          {filteredBenefits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBenefits.map((benefit, index) => (
                <div 
                  key={benefit.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05 + 0.3}s` }}
                >
                  <BenefitCard 
                    benefit={benefit} 
                    isVerified={user?.isVerified || false}
                    isFavorite={user?.favorites.includes(benefit.id) || false}
                    onUnlockRequest={handleUnlockRequest}
                    onToggleFavorite={() => toggleFavorite(benefit.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/5">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-white">No perks found</h3>
              <p className="text-zinc-500 mt-2 max-w-xs mx-auto">
                We couldn't find matches for your search filters. Try clearing them to see all.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(Category.ALL);
                }}
                className="mt-6 text-indigo-400 hover:text-indigo-300 font-medium text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <GraduationCap size={14} className="text-white" />
              </div>
              <span className="text-zinc-200 font-bold">StudentPerksPH</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <span>Manila</span>
              <span>Cebu</span>
              <span>Davao</span>
            </div>
            
            <p className="text-zinc-600 text-sm">
              © {new Date().getFullYear()}. Not affiliated with any listed brands.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <VerificationModal 
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onVerify={handleVerify}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;