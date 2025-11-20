import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ShieldCheck, ShieldAlert, Filter, Database, Heart, Sparkles } from 'lucide-react';
import { BENEFITS_DATA, CATEGORIES } from './constants';
import { Category, User } from './types';
import { BenefitCard } from './components/BenefitCard';
import { PopularCarousel } from './components/PopularCarousel';
import { VerificationModal } from './components/VerificationModal';
import { AuthModal } from './components/AuthModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FilterBar } from './components/FilterBar';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  // Modal States
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);

  // --- MEMOIZED FETCH & HELPERS ---

  const fetchProfile = useCallback(async (userId: string, email?: string) => {
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
  }, []);

  // --- EFFECT: AUTH STATE LISTENER ---
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
  }, [fetchProfile]);

  // --- EVENT HANDLERS (MEMOIZED) ---

  const handleLogout = useCallback(async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } 
    setUser(null);
    localStorage.removeItem('sbd_user');
    setSelectedCategory(Category.ALL);
  }, []);

  const handleVerificationSuccess = useCallback(async () => {
    if (user && isSupabaseConfigured()) {
      await fetchProfile(user.id, user.email);
    } else if (user) {
       const updatedUser = { ...user, isVerified: true };
       setUser(updatedUser);
       localStorage.setItem('sbd_user', JSON.stringify(updatedUser));
    }
  }, [user, fetchProfile]);

  const toggleFavorite = useCallback(async (benefitId: string) => {
    // If no user is logged in, prompt auth
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    // Optimistic update
    const isFav = user.favorites.includes(benefitId);
    const newFavorites = isFav 
      ? user.favorites.filter(id => id !== benefitId)
      : [...user.favorites, benefitId];

    setUser(prev => prev ? ({ ...prev, favorites: newFavorites }) : null);

    if (isSupabaseConfigured()) {
      await supabase
        .from('profiles')
        .update({ favorites: newFavorites })
        .eq('id', user.id);
    } else {
       localStorage.setItem('sbd_user', JSON.stringify({ ...user, favorites: newFavorites }));
    }
  }, [user]);

  const handleUnlockRequest = useCallback(() => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else if (!user.isVerified) {
      setIsVerificationModalOpen(true);
    }
  }, [user]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(Category.ALL);
  }, []);

  const handleLogoClick = useCallback(() => {
    handleResetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [handleResetFilters]);


  // --- DATA DERIVATION ---

  const filteredBenefits = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return BENEFITS_DATA.filter((benefit) => {
      const matchesSearch = 
        !query ||
        benefit.name.toLowerCase().includes(query) ||
        benefit.provider.toLowerCase().includes(query) ||
        benefit.tags.some(tag => tag.toLowerCase().includes(query));
      
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


  // --- RENDER ---

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[128px] opacity-60 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[128px] opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <Navbar 
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenVerification={() => setIsVerificationModalOpen(true)}
        onLogoClick={handleLogoClick}
      />

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

            <FilterBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                showFavorites={!!user}
                categories={CATEGORIES}
            />
          </div>
          
          {/* Popular Carousel (Only shown on ALL tab and no search) */}
          {selectedCategory === Category.ALL && !searchQuery && (
            <PopularCarousel 
              benefits={popularBenefits} 
              user={user}
              onUnlockRequest={handleUnlockRequest}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {/* Content Grid Header */}
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

          {/* Content Grid */}
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
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-indigo-400 text-sm font-bold transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />

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