
import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShieldCheck, ShieldAlert, Filter, GraduationCap, LogIn, LogOut, Heart, X, Database, Lock, Sparkles } from 'lucide-react';
import { BENEFITS_DATA, CATEGORIES } from './constants';
import { Category, User } from './types';
import { BenefitCard } from './components/BenefitCard';
import { PopularCarousel } from './components/PopularCarousel';
import { VerificationModal } from './components/VerificationModal';
import { AuthModal } from './components/AuthModal';
import { PrivacyModal } from './components/PrivacyModal';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);

  // --- SUPABASE AUTH & DATA FETCHING ---
  useEffect(() => {
    const checkSession = async () => {
      if (!isSupabaseConfigured()) {
        const storedUser = localStorage.getItem('sbd_user');
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoadingUser(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email);
      } else {
        setLoadingUser(false);
      }
    };

    checkSession();

    if (isSupabaseConfigured()) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
            await fetchProfile(session.user.id, session.user.email);
        } else if (event === 'SIGNED_OUT') {
            setUser(null);
            setSelectedCategory(Category.ALL);
        }
        });
        return () => subscription.unsubscribe();
    }
  }, []);

  const fetchProfile = async (userId: string, email?: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.full_name || 'Student',
          email: profile.email || email || '',
          isVerified: profile.is_verified || false,
          university: profile.university,
          favorites: profile.favorites || []
        });
      } else {
        const newProfile = { id: userId, email: email, favorites: [] };
        await supabase.from('profiles').insert([newProfile]);
        setUser({
          id: userId,
          name: 'Student',
          email: email || '',
          isVerified: false,
          favorites: []
        });
      }
    } catch (error) {
      console.error('Profile load error', error);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } 
    setUser(null);
    localStorage.removeItem('sbd_user');
    setSelectedCategory(Category.ALL);
  };

  const handleVerificationSuccess = async () => {
    if (user && isSupabaseConfigured()) {
      await fetchProfile(user.id, user.email);
    } else if (user) {
       const updatedUser = { ...user, isVerified: true };
       setUser(updatedUser);
       localStorage.setItem('sbd_user', JSON.stringify(updatedUser));
    }
  };

  const toggleFavorite = async (benefitId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const isFav = user.favorites.includes(benefitId);
    const newFavorites = isFav 
      ? user.favorites.filter(id => id !== benefitId)
      : [...user.favorites, benefitId];

    setUser({ ...user, favorites: newFavorites });

    if (isSupabaseConfigured()) {
      await supabase
        .from('profiles')
        .update({ favorites: newFavorites })
        .eq('id', user.id);
    } else {
       localStorage.setItem('sbd_user', JSON.stringify({ ...user, favorites: newFavorites }));
    }
  };

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

  const popularBenefits = useMemo(() => {
    return BENEFITS_DATA.filter(b => b.popular);
  }, []);

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
      
      {/* 1. Aesthetic Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Primary Accent Blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[128px] opacity-60 animate-pulse" style={{ animationDuration: '4s' }} />
        {/* Secondary Accent Blob */}
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[128px] opacity-50" />
        {/* Texture Overlay (Optional noise) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* 2. Glassmorphic Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-slate-950/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {
              setSelectedCategory(Category.ALL);
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl bg-white/5 border border-white/10 shadow-inner">
                <GraduationCap className="text-indigo-400 relative z-10" size={20} />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-cyan-500/20" />
              </div>
              <div>
                 <h1 className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                  StudentPerks<span className="text-cyan-400">PH</span>
                 </h1>
                 <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Official Directory</p>
              </div>
            </div>

            {/* User Controls */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div 
                    onClick={() => !user.isVerified && setIsVerificationModalOpen(true)}
                    className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer backdrop-blur-md
                      ${user.isVerified 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-default shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] animate-pulse'
                      }`}
                  >
                    {user.isVerified ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                    <span>{user.isVerified ? 'VERIFIED' : 'UNVERIFIED'}</span>
                  </div>

                  <div className="flex items-center gap-3 pl-4 md:border-l md:border-white/10">
                    <div className="hidden md:block text-right">
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Logged in as</div>
                      <div className="text-sm font-bold text-white max-w-[120px] truncate">{user.email.split('@')[0]}</div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10"
                      title="Log Out"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <LogIn size={16} />
                  <span>Access Vault</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow relative z-10 pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in shadow-xl">
              <Sparkles size={12} className="text-cyan-400" />
              <span>Exclusive Student Access</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-6 animate-slide-up leading-[1.1] drop-shadow-2xl">
              Premium Software.<br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                Zero Cost.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 animate-slide-up font-light leading-relaxed" style={{ animationDelay: '0.1s' }}>
              Your <span className="text-white font-semibold border-b border-white/20">.edu.ph</span> email is a key to thousands of pesos in software value. We've curated the vault for you.
            </p>

            {/* BENTO FILTER BAR (Combined Search & Nav) */}
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                         {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
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
                    <div className="relative flex-shrink-0 md:max-w-[60%] overflow-hidden rounded-2xl bg-white/5">
                         {/* Fade Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-slate-900/80 to-transparent z-10 pointer-events-none md:hidden"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900/80 to-transparent z-10 pointer-events-none"></div>
                        
                        <div className="flex items-center gap-1 overflow-x-auto p-1.5 h-full hide-scrollbar scroll-smooth">
                             <button
                                onClick={() => setSelectedCategory(Category.ALL)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border
                                    ${selectedCategory === Category.ALL
                                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-900/50'
                                    : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
                                    }`}
                                >
                                All
                            </button>

                            {user && (
                                <button
                                onClick={() => setSelectedCategory(Category.FAVORITES)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border
                                    ${selectedCategory === Category.FAVORITES
                                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-900/50'
                                    : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
                                    }`}
                                >
                                <Heart size={12} className={selectedCategory === Category.FAVORITES ? 'fill-white' : ''} />
                                Favorites
                                </button>
                            )}

                            {CATEGORIES.map((category) => (
                                <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border
                                    ${selectedCategory === category
                                    ? 'bg-slate-700 text-white border-slate-600 shadow-lg'
                                    : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
                                    }`}
                                >
                                {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Popular Carousel */}
          {selectedCategory === Category.ALL && !searchQuery && (
            <PopularCarousel 
              benefits={popularBenefits} 
              user={user}
              onUnlockRequest={handleUnlockRequest}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {/* Content Grid */}
          <div className="mb-8 flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {selectedCategory === Category.FAVORITES ? (
                 <><Heart className="fill-rose-500 text-rose-500" /> Your Vault</>
              ) : (
                 <><Database className="text-indigo-400" /> Directory</>
              )}
            </h2>
            <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 font-mono">
               {filteredBenefits.length} RESULTS
            </div>
          </div>

          {filteredBenefits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBenefits.map((benefit, index) => (
                <div 
                  key={benefit.id} 
                  className="animate-slide-up h-full"
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
            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                <Filter className="h-6 w-6 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white">Vault Empty</h3>
              <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm">
                No perks found matching your criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(Category.ALL);
                }}
                className="mt-6 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-indigo-400 text-sm font-bold transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950/80 backdrop-blur-xl border-t border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600/20 border border-indigo-500/30 rounded-lg flex items-center justify-center">
                <GraduationCap size={16} className="text-indigo-400" />
              </div>
              <span className="text-slate-300 font-bold tracking-tight">StudentPerksPH</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
                <button 
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors font-medium uppercase tracking-wider"
                >
                    <Lock size={12} />
                    Privacy Protocol
                </button>
                <p className="text-slate-600 text-xs">
                © {new Date().getFullYear()} Unofficial Directory.
                </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <VerificationModal 
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        currentUser={user}
        onVerificationSuccess={handleVerificationSuccess}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <PrivacyModal 
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default App;
