
// ------------------------------------------------------------------
// NO DATABASE MODE
// ------------------------------------------------------------------
// The application has been switched to a client-side only demo mode.
// No API keys are required. Data is persisted to localStorage.
// ------------------------------------------------------------------

export const isSupabaseConfigured = () => {
    return false; // Force false to disable DB logic globally
};

// Mock export to prevent build errors in legacy imports if any remain
export const supabase = {
    auth: {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithOtp: async () => ({ error: null }),
        signOut: async () => ({ error: null })
    },
    from: () => ({
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
        insert: async () => ({ error: null }),
        update: () => ({ eq: async () => ({ error: null }) })
    })
};
