
import { Benefit, Category } from './types';

export const CATEGORIES = Object.values(Category);

export const BENEFITS_DATA: Benefit[] = [
  {
    id: '1',
    name: 'Student Developer Pack',
    provider: 'GitHub',
    description: 'The ultimate toolkit for developers. Access to the best dev tools, free.',
    features: [
      'Free GitHub Copilot',
      '$100 Azure credits',
      'Free domains & SSL'
    ],
    category: Category.DEV_TOOLS,
    tags: ['Coding', 'Cloud'],
    link: 'https://education.github.com/pack',
    studentPrice: 'Free',
    originalPrice: '$200k+ Value',
    popular: true,
    brandColor: '#7c3aed', // Violet for GitHub copilot vibe
    logoUrl: 'https://logo.clearbit.com/github.com',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' // Coding Screen
  },
  {
    id: '2',
    name: 'Spotify Premium',
    provider: 'Spotify',
    description: 'Ad-free music listening, offline playback, and curated playlists.',
    features: [
      'Ad-free listening',
      'Offline mode',
      'Group sessions'
    ],
    category: Category.ENTERTAINMENT,
    tags: ['Music', 'Streaming'],
    link: 'https://www.spotify.com/ph-en/student/',
    studentPrice: '₱75/mo',
    originalPrice: '₱149/mo',
    popular: true,
    brandColor: '#1DB954', // Spotify Green
    logoUrl: 'https://logo.clearbit.com/spotify.com',
    coverImage: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?auto=format&fit=crop&q=80&w=800' // Spotify UI/Vibe
  },
  {
    id: '3',
    name: 'Notion Personal Pro',
    provider: 'Notion',
    description: 'The all-in-one workspace for your notes, tasks, and wikis.',
    features: [
      'Unlimited file uploads',
      '30-day history',
      'Guest access'
    ],
    category: Category.PRODUCTIVITY,
    tags: ['Notes', 'Org'],
    link: 'https://www.notion.so/product/notion-for-education',
    studentPrice: 'Free',
    originalPrice: '$48/yr',
    popular: true,
    brandColor: '#ffffff', // Notion White
    logoUrl: 'https://logo.clearbit.com/notion.so',
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800' // Clean Desk
  },
  {
    id: '4',
    name: 'Canva for Education',
    provider: 'Canva',
    description: 'Design presentations, social media posts, and more with premium tools.',
    features: [
      'Premium templates',
      'Background remover',
      'Magic Resize'
    ],
    category: Category.DESIGN,
    tags: ['Design', 'Graphics'],
    link: 'https://www.canva.com/education/',
    studentPrice: 'Free',
    originalPrice: '₱2,490/yr',
    popular: true,
    brandColor: '#00C4CC', // Canva Teal
    logoUrl: 'https://logo.clearbit.com/canva.com',
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b7993125651?auto=format&fit=crop&q=80&w=800' // Colorful Abstract
  },
  {
    id: '5',
    name: 'Figma Professional',
    provider: 'Figma',
    description: 'The collaborative interface design tool. Industry standard for UI/UX.',
    features: [
      'Unlimited files',
      'Team libraries',
      'Dev Mode access'
    ],
    category: Category.DESIGN,
    tags: ['UI/UX', 'Prototyping'],
    link: 'https://www.figma.com/education/',
    studentPrice: 'Free',
    originalPrice: '$144/yr',
    popular: true,
    brandColor: '#F24E1E', // Figma Red/Orange
    logoUrl: 'https://logo.clearbit.com/figma.com',
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' // Design Software UI
  },
  {
    id: '6',
    name: 'Adobe Creative Cloud',
    provider: 'Adobe',
    description: '20+ creative apps including Photoshop, Illustrator, and Premiere Pro.',
    features: [
      'All Desktop Apps',
      '100GB Cloud Storage',
      'Adobe Fonts'
    ],
    category: Category.DESIGN,
    tags: ['Photo', 'Video'],
    link: 'https://www.adobe.com/ph_en/creativecloud/buy/students.html',
    studentPrice: '₱966/mo',
    originalPrice: '₱2,600/mo',
    popular: true,
    brandColor: '#FF0000', // Adobe Red
    logoUrl: 'https://logo.clearbit.com/adobe.com',
    coverImage: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800' // Abstract Colorful Fluid
  },
  {
    id: '7',
    name: 'Microsoft 365',
    provider: 'Microsoft',
    description: 'Word, Excel, PowerPoint, OneNote, and Microsoft Teams.',
    features: [
      'Office Desktop Apps',
      '1TB OneDrive',
      'Teams Access'
    ],
    category: Category.PRODUCTIVITY,
    tags: ['Office', 'Docs'],
    link: 'https://www.microsoft.com/en-ph/education/products/office',
    studentPrice: 'Free',
    originalPrice: '₱3,499/yr',
    popular: false,
    brandColor: '#0078D4', // MS Blue
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800' // Laptop
  },
  {
    id: '8',
    name: 'Apple Music',
    provider: 'Apple',
    description: 'Stream over 100 million songs ad-free. Includes Apple TV+.',
    features: [
      'Lossless Audio',
      'Apple TV+ Included',
      'Dolby Atmos'
    ],
    category: Category.ENTERTAINMENT,
    tags: ['Music', 'TV'],
    link: 'https://www.apple.com/ph/apple-music-student/',
    studentPrice: '₱79/mo',
    originalPrice: '₱139/mo',
    popular: false,
    brandColor: '#FA243C', // Apple Music Red
    logoUrl: 'https://logo.clearbit.com/apple.com',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800' // Microphone/Music
  },
  {
    id: '9',
    name: 'Autodesk Education',
    provider: 'Autodesk',
    description: 'Professional 3D design software for architecture and engineering.',
    features: [
      'AutoCAD',
      'Maya & 3ds Max',
      'Fusion 360'
    ],
    category: Category.DESIGN,
    tags: ['3D', 'Engineering'],
    link: 'https://www.autodesk.com/education/edu-software/overview',
    studentPrice: 'Free',
    originalPrice: '$1,800+/yr',
    popular: false,
    brandColor: '#0696D7', // Autodesk Blue
    logoUrl: 'https://logo.clearbit.com/autodesk.com',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800' // Architecture
  },
  {
    id: '10',
    name: 'JetBrains IDE Pack',
    provider: 'JetBrains',
    description: 'Professional coding tools like IntelliJ IDEA, PyCharm, and WebStorm.',
    features: [
      'All JetBrains IDEs',
      'DotTrace',
      'DataGrip'
    ],
    category: Category.DEV_TOOLS,
    tags: ['Coding', 'IDE'],
    link: 'https://www.jetbrains.com/community/education/#students',
    studentPrice: 'Free',
    originalPrice: '$289/yr',
    popular: true,
    brandColor: '#FF318C', // JetBrains Pink/Gradient
    logoUrl: 'https://logo.clearbit.com/jetbrains.com',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800' // Matrix Code
  },
  {
    id: '11',
    name: 'Amazon Prime',
    provider: 'Amazon',
    description: 'Fast shipping, Prime Video, and exclusive college deals.',
    features: [
      'Prime Video',
      'Free Shipping',
      'Exclusive Deals'
    ],
    category: Category.ENTERTAINMENT,
    tags: ['Shopping', 'Video'],
    link: 'https://www.amazon.com/prime/student',
    studentPrice: 'Free (6mo)',
    originalPrice: '$7.49/mo',
    popular: false,
    brandColor: '#00A8E1', // Amazon Blue
    logoUrl: 'https://logo.clearbit.com/amazon.com',
    coverImage: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800' // Boxes
  },
  {
    id: '12',
    name: 'Headspace',
    provider: 'Headspace',
    description: 'Mindfulness and meditation for stress, focus, and sleep.',
    features: [
      'Guided Meditations',
      'Focus Music',
      'Sleepcasts'
    ],
    category: Category.PRODUCTIVITY,
    tags: ['Health', 'Focus'],
    link: 'https://www.headspace.com/studentplan',
    studentPrice: '$10/yr',
    originalPrice: '$70/yr',
    popular: false,
    brandColor: '#F47D31', // Headspace Orange
    logoUrl: 'https://logo.clearbit.com/headspace.com',
    coverImage: 'https://images.unsplash.com/photo-1515023115689-5824734a8375?auto=format&fit=crop&q=80&w=800' // Calm/Water
  },
  {
    id: '13',
    name: 'Namecheap',
    provider: 'Namecheap',
    description: 'Get a free .me domain name to kickstart your personal brand.',
    features: [
      'Free .me domain',
      'WhoisGuard',
      'SSL Certificate'
    ],
    category: Category.DEV_TOOLS,
    tags: ['Web', 'Domains'],
    link: 'https://nc.me/',
    studentPrice: 'Free',
    originalPrice: '$18/yr',
    popular: false,
    brandColor: '#DE3723', // Namecheap Red
    logoUrl: 'https://logo.clearbit.com/namecheap.com',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' // Data Center
  },
  {
    id: '14',
    name: 'Linear',
    provider: 'Linear',
    description: 'Streamlined issue tracking for software projects.',
    features: [
      'Unlimited issues',
      'Cycles & Roadmaps',
      'Git integration'
    ],
    category: Category.DEV_TOOLS,
    tags: ['Productivity', 'PM'],
    link: 'https://linear.app/method/linear-for-education',
    studentPrice: 'Free',
    originalPrice: '$8/mo',
    popular: false,
    brandColor: '#5E6AD2', // Linear Purple
    logoUrl: 'https://logo.clearbit.com/linear.app',
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800' // Planning
  },
  {
    id: '15',
    name: 'Ableton Live',
    provider: 'Ableton',
    description: 'Software for music creation and performance.',
    features: [
      'Live 11 Standard',
      'Max for Live',
      'Sound Library'
    ],
    category: Category.DESIGN,
    tags: ['Music', 'Audio'],
    link: 'https://www.ableton.com/en/shop/education/',
    studentPrice: '40% OFF',
    originalPrice: '$449',
    popular: false,
    brandColor: '#a0a0a0', // Grey
    logoUrl: 'https://logo.clearbit.com/ableton.com',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800' // Studio
  },
  {
    id: '16',
    name: 'Evernote',
    provider: 'Evernote',
    description: 'Tame your work, organize your life.',
    features: [
      '60MB monthly uploads',
      'Sync 2 devices',
      'Web clipper'
    ],
    category: Category.PRODUCTIVITY,
    tags: ['Notes', 'Org'],
    link: 'https://evernote.com/students',
    studentPrice: '50% OFF',
    originalPrice: '₱130/mo',
    popular: false,
    brandColor: '#00A82D', // Evernote Green
    logoUrl: 'https://logo.clearbit.com/evernote.com',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800' // Writing
  }
];
