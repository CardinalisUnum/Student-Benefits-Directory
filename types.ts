
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
  DEV_TOOLS = 'Dev Tools',
  DESIGN = 'Design',
  ENTERTAINMENT = 'Entertainment',
  PRODUCTIVITY = 'Productivity',
  EDUCATION = 'Education',
  FAVORITES = 'My Favorites'
}

export interface User {
  name: string;
  email: string;
  isVerified: boolean;
  verifiedEmail?: string;
  favorites: string[];
}

export interface VerificationState {
  isVerified: boolean;
  email: string;
}
