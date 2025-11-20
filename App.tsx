
import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShieldCheck, ShieldAlert, Filter, GraduationCap, LogIn, LogOut, Heart, X, Database, Lock } from 'lucide-react';
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
    // 1. Check for existing session
    const checkSession = async () => {
      if (!isSupabaseConfigured()) {
        // Fallback for demo purposes if no keys provided
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

    // 2. Listen for auth changes (Login/Logout)
    // Only subscribe if configured to avoid errors
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

  // Fetch Profile Data from DB
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

      // If no profile exists yet, we create a temporary user object
      // In a real app, we would insert a row into 'profiles' on signup trigger
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
        // Init profile row if missing (simplified for demo)
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
      setUser(null);
      setSelectedCategory(Category.ALL);
    } else {
      // Fallback demo logout
      setUser(null);
      localStorage.removeItem('sbd_user');
      setSelectedCategory(Category.ALL);
    }
  };

  const handleVerificationSuccess = async () => {
    // Refresh profile to get updated verified status
    if (user && isSupabaseConfigured()) {
      await fetchProfile(user.id, user.email);
    } else if (user) {
       // Fallback demo update
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

    // Optimistic UI update
    setUser({ ...user, favorites: newFavorites });

    // DB Update
    if (isSupabaseConfigured()) {
      await supabase
        .from('profiles')
        .update({ favorites: newFavorites })
        .eq('id', user.id);
    } else {
       // Fallback
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

  // Filter Logic
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

  // Popular Benefits Logic
  const popularBenefits = useMemo(() => {
    return BENEFITS_DATA.filter(b => b.popular);
  }, []);

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-300 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      
      {/* DEVELOPMENT MODE BANNER */}
      {!isSupabaseConfigured() && (
        <div className="bg-indigo-900/30 border-b border-indigo-500/20 px-4 py-2 flex items-center justify-center gap-3 text-xs text-indigo-200 font-medium">
            <Database size={14} className="text-indigo-400 animate-pulse" />
            <span>
                <strong className="text-white">Demo Mode Active:</strong> Database is not connected. Data is stored locally in your browser.
            </span>
            <span className="hidden sm:inline opacity-50">|</span>
            <button 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="underline hover:text-white transition-colors"
            >
                See Privacy & Security Protocols
            </button>
        </div>
      )}

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
                      <div className="text-sm font-medium text-zinc-200 max-w-[100px] truncate">{user.email.split('@')[0]}</div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                      title="Log Out"
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
          <div className="text-center mb-12 relative">
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
          </div>

          {/* SEARCH & FILTER SECTION */}
          <div className="max-w-4xl mx-auto mb-16 sticky top-20 z-30">
            
            {/* 1. Standalone Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 animate-slide-up relative" style={{ animationDelay: '0.2s' }}>
                <div className="relative group">
                  {/* Magnifying Glass */}
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className="text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={22} />
                  </div>
                  
                  {/* Input Field */}
                  <input
                    type="text"
                    className="block w-full pl-14 pr-12 py-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent shadow-xl shadow-black/20 transition-all text-base"
                    placeholder="Search for Perplexity, Cursor, GitHub, Spotify..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  {/* Clear Button (Only visible when typing) */}
                  {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center animate-fade-in"
                    >
                        <div className="bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-full p-1 transition-colors">
                            <X size={14} />
                        </div>
                    </button>
                  )}
                </div>
            </div>

            {/* 2. Category Pills */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex gap-3 overflow-x-auto justify-start md:justify-center pb-2 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-linear-fade">
                  <button
                      onClick={() => setSelectedCategory(Category.ALL)}
                      className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all shrink-0 border
                        ${selectedCategory === Category.ALL
                          ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                          : 'bg-slate-800/50 border-slate-700/50 text-zinc-400 hover:bg-slate-800 hover:text-zinc-200'
                        }`}
                    >
                      All
                  </button>

                  {user && (
                    <button
                      onClick={() => setSelectedCategory(Category.FAVORITES)}
                      className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 shrink-0 border
                        ${selectedCategory === Category.FAVORITES
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 shadow-lg shadow-rose-900/20'
                          : 'bg-slate-800/50 border-slate-700/50 text-zinc-400 hover:bg-slate-800 hover:text-zinc-200'
                        }`}
                    >
                      <Heart size={14} className={selectedCategory === Category.FAVORITES ? 'fill-rose-400' : ''} />
                      <span>Favorites</span>
                    </button>
                  )}
                  
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all shrink-0 border
                        ${selectedCategory === category
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50'
                          : 'bg-slate-800/50 border-slate-700/50 text-zinc-400 hover:bg-slate-800 hover:text-zinc-200'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
            </div>

          </div>
          
          {/* POPULAR / HOT CAROUSEL */}
          {/* Only show when on 'All' category and not searching, to avoid clutter */}
          {selectedCategory === Category.ALL && !searchQuery && (
            <PopularCarousel 
              benefits={popularBenefits} 
              user={user}
              onUnlockRequest={handleUnlockRequest}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {/* Content Grid */}
          <div className="mb-6 flex items-center justify-between">
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
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <button 
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
                >
                    <Lock size={12} />
                    Privacy Policy
                </button>
                <p className="text-zinc-600 text-xs">
                © {new Date().getFullYear()}. Not affiliated with any listed brands.
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
