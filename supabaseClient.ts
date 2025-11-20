
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// 🔐 SECURITY & DATABASE SETUP
// ------------------------------------------------------------------
// To enable the secure database:
// 1. Go to https://supabase.com and create a new project.
// 2. Go to Project Settings -> API.
// 3. Copy the "Project URL" and "anon public" key.
// 4. Paste them below.
// ------------------------------------------------------------------

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co'; 
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

// Checks if the user has replaced the placeholder text with real keys
const hasValidKeys = 
  SUPABASE_URL.includes('YOUR_PROJECT_ID') === false && 
  SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY_HERE') === false;

// Create the client only if keys are present to avoid console errors in demo mode
export const supabase = createClient(
  hasValidKeys ? SUPABASE_URL : 'https://placeholder.supabase.co', 
  hasValidKeys ? SUPABASE_ANON_KEY : 'placeholder'
);

export const isSupabaseConfigured = () => {
    return hasValidKeys;
};
