
export interface Benefit {
  id: string;
  name: string;
  provider: string;
  description: string;
  features: string[];
  category: Category;
  tags: string[];
  link: string;
  studentPrice: string;
  originalPrice: string;
  popular: boolean;
  brandColor: string;
  logoUrl: string;
  coverImage: string;
}

export enum Category {
  ALL = 'All',
  AI_ML = 'AI & Machine Learning',
  DEV_TOOLS = 'Dev Tools',
  DESIGN = 'Design',
  PRODUCTIVITY = 'Productivity',
  ENTERTAINMENT = 'Entertainment',
  LIFESTYLE = 'Lifestyle & Travel',
  EDUCATION = 'Education',
  HARDWARE = 'Hardware & Gear',
  FAVORITES = 'My Favorites'
}

export interface User {
  id: string; // Added ID for database reference
  name: string;
  email: string;
  isVerified: boolean;
  verifiedEmail?: string;
  favorites: string[];
  university?: string;
}

export interface VerificationState {
  isVerified: boolean;
  email: string;
}