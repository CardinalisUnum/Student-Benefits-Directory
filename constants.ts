
import { Benefit, Category } from './types';

// Filter out 'All' and 'Favorites' from the scrolling list as they are often handled separately or don't need to be in the pill loop if we want a cleaner start
export const CATEGORIES = Object.values(Category).filter(
  c => c !== Category.ALL && c !== Category.FAVORITES
);

export const BENEFITS_DATA: Benefit[] = [
  // --- AI & MACHINE LEARNING ---
  {
    id: '1',
    name: 'GitHub Student Pack',
    provider: 'GitHub',
    description: 'Access to GitHub Copilot, Codespaces, and the best dev tools.',
    features: [
      'Free GitHub Copilot',
      'JetBrains Pack',
      '$100 Azure Credits'
    ],
    category: Category.AI_ML,
    tags: ['Coding', 'AI', 'Cloud'],
    link: 'https://education.github.com/pack',
    studentPrice: 'Free',
    originalPrice: '$200k+ Value',
    popular: true,
    brandColor: '#7c3aed',
    logoUrl: 'https://logo.clearbit.com/github.com',
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b74a5b643375?auto=format&fit=crop&q=80&w=800' 
  },
  {
    id: '2',
    name: 'Perplexity Pro',
    provider: 'Perplexity',
    description: 'An AI-powered answer engine with GPT-4 and Claude 3 support.',
    features: [
      'Pro Search',
      'Unlimited Copilot',
      'Select AI Models'
    ],
    category: Category.AI_ML,
    tags: ['AI', 'Research', 'Search'],
    link: 'https://www.perplexity.ai/',
    studentPrice: 'Discounted',
    originalPrice: '$20/mo',
    popular: true,
    brandColor: '#22B8CD',
    logoUrl: 'https://logo.clearbit.com/perplexity.ai',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Cursor Editor',
    provider: 'Cursor',
    description: 'The AI-first code editor built for pair programming with AI.',
    features: [
      'GPT-4 Integration',
      'Codebase Indexing',
      'Privacy Mode'
    ],
    category: Category.AI_ML,
    tags: ['Coding', 'AI', 'IDE'],
    link: 'https://cursor.sh/',
    studentPrice: 'Free Pro',
    originalPrice: '$20/mo',
    popular: true,
    brandColor: '#000000', // Cursor is very dark themed
    logoUrl: 'https://logo.clearbit.com/cursor.sh',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Wolfram Alpha',
    provider: 'Wolfram',
    description: 'Computational intelligence for math, science, and engineering.',
    features: [
      'Step-by-step solutions',
      'Data Visualization',
      'Expert Knowledge'
    ],
    category: Category.AI_ML,
    tags: ['Math', 'AI', 'Science'],
    link: 'https://www.wolframalpha.com/pro/pricing/students/',
    studentPrice: '$5/mo',
    originalPrice: '$9.50/mo',
    popular: false,
    brandColor: '#DD1100',
    logoUrl: 'https://logo.clearbit.com/wolframalpha.com',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Tabnine',
    provider: 'Tabnine',
    description: 'AI assistant for software developers. Code faster with whole-line completion.',
    features: [
      'Pro features free',
      'Private Code Models',
      'IDE Integration'
    ],
    category: Category.AI_ML,
    tags: ['Coding', 'AI'],
    link: 'https://www.tabnine.com/students',
    studentPrice: 'Free',
    originalPrice: '$12/mo',
    popular: false,
    brandColor: '#1A73E8',
    logoUrl: 'https://logo.clearbit.com/tabnine.com',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '34',
    name: 'Tableau for Students',
    provider: 'Salesforce',
    description: 'Free 1-year license for Tableau Desktop and Tableau Prep. Master data visualization.',
    features: [
      'Tableau Desktop',
      'Tableau Prep',
      'Data Viz'
    ],
    category: Category.AI_ML,
    tags: ['Data Science', 'Analytics', 'BI'],
    link: 'https://www.tableau.com/academic/students',
    studentPrice: 'Free (1yr)',
    originalPrice: '$70/mo',
    popular: true,
    brandColor: '#E97627',
    logoUrl: 'https://logo.clearbit.com/tableau.com',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },

  // --- LIFESTYLE & TRAVEL ---
  {
    id: '32',
    name: 'Grab Student',
    provider: 'Grab PH',
    description: 'Get 20% off on GrabCar, GrabFood, and more. Application hidden in Help Center.',
    features: [
      '20% Off Rides',
      'Food Delivery Deals',
      'No Subscription Fee'
    ],
    category: Category.LIFESTYLE,
    tags: ['Transport', 'Food', 'Daily'],
    link: 'https://help.grab.com/passenger/en-ph/360025588231-Grab-Student-Program',
    studentPrice: '20% OFF',
    originalPrice: 'Regular',
    popular: true,
    brandColor: '#00B14F',
    logoUrl: 'https://logo.clearbit.com/grab.com',
    coverImage: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '38',
    name: 'Angkas Student',
    provider: 'Angkas',
    description: 'Get 20% off on motorcycle taxi rides. Must submit requirements via form.',
    features: [
      '20% Off Rides',
      'Metro Manila',
      'Daily Commute'
    ],
    category: Category.LIFESTYLE,
    tags: ['Transport', 'Commute'],
    link: 'https://angkas.com/',
    studentPrice: '20% OFF',
    originalPrice: 'Regular',
    popular: true,
    brandColor: '#009AD7',
    logoUrl: 'https://logo.clearbit.com/angkas.com',
    coverImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800'
  },

  // --- ENTERTAINMENT ---
  {
    id: '6',
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
    brandColor: '#1DB954',
    logoUrl: 'https://logo.clearbit.com/spotify.com',
    coverImage: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800' 
  },
  {
    id: '7',
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
    brandColor: '#FA243C',
    logoUrl: 'https://logo.clearbit.com/apple.com',
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    name: 'YouTube Premium',
    provider: 'Google',
    description: 'Ad-free YouTube and YouTube Music. Background play included.',
    features: [
      'No Ads',
      'Background Play',
      'YouTube Music'
    ],
    category: Category.ENTERTAINMENT,
    tags: ['Video', 'Music'],
    link: 'https://www.youtube.com/premium/student',
    studentPrice: '₱95/mo',
    originalPrice: '₱159/mo',
    popular: true,
    brandColor: '#FF0000',
    logoUrl: 'https://logo.clearbit.com/youtube.com',
    coverImage: 'https://images.unsplash.com/photo-1543165796-5426273eaab3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '9',
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
    brandColor: '#00A8E1',
    logoUrl: 'https://logo.clearbit.com/amazon.com',
    coverImage: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800'
  },

  // --- HARDWARE & GEAR ---
  {
    id: '10',
    name: 'Apple Education Store',
    provider: 'Apple',
    description: 'Save on Mac and iPad. Plus get Apple Pencil or Gift Cards on promo.',
    features: [
      'MacBook Discounts',
      'iPad Discounts',
      'Pro Apps Bundle'
    ],
    category: Category.HARDWARE,
    tags: ['Laptop', 'Tablet'],
    link: 'https://www.apple.com/ph/shop/education/pricing',
    studentPrice: 'Up to ₱10k Off',
    originalPrice: 'MSRP',
    popular: true,
    brandColor: '#999999',
    logoUrl: 'https://logo.clearbit.com/apple.com',
    coverImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '11',
    name: 'Samsung Education',
    provider: 'Samsung',
    description: 'Exclusive education store. Big discounts on Monitors and Galaxy devices.',
    features: [
      '50% Off Monitors',
      '30% Off Galaxy',
      'Freebies'
    ],
    category: Category.HARDWARE,
    tags: ['Phone', 'Tech', 'Monitor'],
    link: 'https://www.samsung.com/ph/multistore/education/',
    studentPrice: 'Up to 50% Off',
    originalPrice: 'MSRP',
    popular: true,
    brandColor: '#1428A0',
    logoUrl: 'https://logo.clearbit.com/samsung.com',
    coverImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '12',
    name: 'Logitech',
    provider: 'Logitech',
    description: 'Discounts on mice, keyboards, and webcams for your study setup.',
    features: [
      'MX Series',
      'Keyboards',
      'Webcams'
    ],
    category: Category.HARDWARE,
    tags: ['Peripherals', 'Setup'],
    link: 'https://www.logitech.com/en-ph',
    studentPrice: '25% OFF',
    originalPrice: 'MSRP',
    popular: false,
    brandColor: '#00B8FC',
    logoUrl: 'https://logo.clearbit.com/logitech.com',
    coverImage: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=800'
  },

  // --- PRODUCTIVITY ---
  {
    id: '13',
    name: 'Notion Personal Pro',
    provider: 'Notion',
    description: 'The all-in-one workspace for your notes, tasks, and wikis.',
    features: [
      'Unlimited file uploads',
      '30-day history',
      'Guest access'
    ],
    category: Category.PRODUCTIVITY,
    tags: ['Notes', 'Org', 'AI'],
    link: 'https://www.notion.so/product/notion-for-education',
    studentPrice: 'Free',
    originalPrice: '$48/yr',
    popular: true,
    brandColor: '#FFFFFF',
    logoUrl: 'https://logo.clearbit.com/notion.so',
    coverImage: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '14',
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
    brandColor: '#0078D4',
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '15',
    name: '1Password',
    provider: '1Password',
    description: 'The most secure way to store and share passwords.',
    features: [
      'Unlimited passwords',
      '1GB Storage',
      'Watchtower'
    ],
    category: Category.PRODUCTIVITY,
    tags: ['Security', 'Tools'],
    link: 'https://1password.com/student-discount/',
    studentPrice: 'Free (1yr)',
    originalPrice: '$36/yr',
    popular: true,
    brandColor: '#0094F5',
    logoUrl: 'https://logo.clearbit.com/1password.com',
    coverImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800'
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
    brandColor: '#00A82D',
    logoUrl: 'https://logo.clearbit.com/evernote.com',
    coverImage: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '17',
    name: 'Todoist',
    provider: 'Doist',
    description: 'The world\'s favorite task manager and to-do list app.',
    features: [
      'Pro Features',
      'Reminders',
      'Themes'
    ],
    category: Category.PRODUCTIVITY,
    tags: ['Planning', 'Org'],
    link: 'https://todoist.com/education',
    studentPrice: '70% OFF',
    originalPrice: '$4/mo',
    popular: false,
    brandColor: '#E44332',
    logoUrl: 'https://logo.clearbit.com/todoist.com',
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '36',
    name: 'Semrush',
    provider: 'Semrush',
    description: 'Access professional SEO and digital marketing tools for your marketing subjects.',
    features: [
      'SEO Toolkit',
      'Market Research',
      'Content Marketing'
    ],
    category: Category.PRODUCTIVITY,
    tags: ['Marketing', 'SEO', 'Business'],
    link: 'https://www.semrush.com/company/careers/students/',
    studentPrice: 'Free Access',
    originalPrice: '$129/mo',
    popular: false,
    brandColor: '#FF642D',
    logoUrl: 'https://logo.clearbit.com/semrush.com',
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800'
  },

  // --- DESIGN ---
  {
    id: '18',
    name: 'Canva for Education',
    provider: 'Canva',
    description: 'Design presentations, social media posts, and more with premium tools.',
    features: [
      'Premium templates',
      'Background remover',
      'Magic Resize'
    ],
    category: Category.DESIGN,
    tags: ['Design', 'Graphics', 'AI'],
    link: 'https://www.canva.com/education/',
    studentPrice: 'Free',
    originalPrice: '₱2,490/yr',
    popular: true,
    brandColor: '#00C4CC',
    logoUrl: 'https://logo.clearbit.com/canva.com',
    coverImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '19',
    name: 'Figma Professional',
    provider: 'Figma',
    description: 'The industry standard for UI/UX. Professional plan is free for students.',
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
    brandColor: '#F24E1E',
    logoUrl: 'https://logo.clearbit.com/figma.com',
    coverImage: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '20',
    name: 'Adobe Creative Cloud',
    provider: 'Adobe',
    description: '20+ creative apps including Photoshop, Illustrator, and Premiere Pro.',
    features: [
      'All Desktop Apps',
      '100GB Cloud Storage',
      'Adobe Fonts'
    ],
    category: Category.DESIGN,
    tags: ['Photo', 'Video', 'AI'],
    link: 'https://www.adobe.com/ph_en/creativecloud/buy/students.html',
    studentPrice: '₱966/mo',
    originalPrice: '₱2,600/mo',
    popular: true,
    brandColor: '#FF0000',
    logoUrl: 'https://logo.clearbit.com/adobe.com',
    coverImage: 'https://images.unsplash.com/photo-1574717432722-a03306358bec?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '21',
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
    brandColor: '#0696D7',
    logoUrl: 'https://logo.clearbit.com/autodesk.com',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '37',
    name: 'SOLIDWORKS',
    provider: 'Dassault Systèmes',
    description: 'Industry-standard 3D CAD and simulation software for engineering students.',
    features: [
      '3D CAD Design',
      'Simulation',
      'Cloud Connect'
    ],
    category: Category.DESIGN,
    tags: ['Engineering', '3D', 'CAD'],
    link: 'https://www.solidworks.com/product/students',
    studentPrice: 'Discounted',
    originalPrice: '$4,000+',
    popular: false,
    brandColor: '#D82127',
    logoUrl: 'https://logo.clearbit.com/solidworks.com',
    coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '22',
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
    brandColor: '#E2E2E2',
    logoUrl: 'https://logo.clearbit.com/ableton.com',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '23',
    name: 'Cinema 4D',
    provider: 'Maxon',
    description: 'Professional 3D modeling, animation, simulation and rendering software.',
    features: [
      'Redshift',
      'Red Giant',
      'ZBrush'
    ],
    category: Category.DESIGN,
    tags: ['3D', 'VFX'],
    link: 'https://www.maxon.net/en/educational-licenses',
    studentPrice: '$10/6mo',
    originalPrice: '$100+/mo',
    popular: false,
    brandColor: '#2D3289',
    logoUrl: 'https://logo.clearbit.com/maxon.net',
    coverImage: 'https://images.unsplash.com/photo-1617396900799-f4dc2b50d579?auto=format&fit=crop&q=80&w=800'
  },

  // --- DEV TOOLS ---
  {
    id: '33',
    name: 'Azure for Students',
    provider: 'Microsoft',
    description: 'Build in the cloud with free credits. No credit card required.',
    features: [
      '$100 Credits',
      'No Credit Card',
      '25+ Free Services'
    ],
    category: Category.DEV_TOOLS,
    tags: ['Cloud', 'Hosting', 'AI'],
    link: 'https://azure.microsoft.com/en-us/free/students/',
    studentPrice: 'Free $100',
    originalPrice: 'Usage',
    popular: true,
    brandColor: '#0078D4',
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
    coverImage: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '24',
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
    brandColor: '#FF318C',
    logoUrl: 'https://logo.clearbit.com/jetbrains.com',
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '25',
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
    brandColor: '#DE3723',
    logoUrl: 'https://logo.clearbit.com/namecheap.com',
    coverImage: 'https://images.unsplash.com/photo-1558494949-efc0257bb3af?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '26',
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
    brandColor: '#5E6AD2',
    logoUrl: 'https://logo.clearbit.com/linear.app',
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '27',
    name: 'DigitalOcean',
    provider: 'DigitalOcean',
    description: 'Simple, scalable cloud computing solutions.',
    features: [
      '$200 credit (1yr)',
      'Droplets',
      'App Platform'
    ],
    category: Category.DEV_TOOLS,
    tags: ['Cloud', 'Hosting'],
    link: 'https://www.digitalocean.com/github-students',
    studentPrice: 'Free Credits',
    originalPrice: 'Usage',
    popular: false,
    brandColor: '#0080FF',
    logoUrl: 'https://logo.clearbit.com/digitalocean.com',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '28',
    name: 'Unity',
    provider: 'Unity',
    description: 'The world\'s leading platform for creating real-time 3D content.',
    features: [
      'Unity Pro',
      'Learning Premium',
      'Asset Store 20% Off'
    ],
    category: Category.DEV_TOOLS,
    tags: ['Game Dev', '3D'],
    link: 'https://unity.com/products/unity-student',
    studentPrice: 'Free',
    originalPrice: '$1,800/yr',
    popular: false,
    brandColor: '#000000',
    logoUrl: 'https://logo.clearbit.com/unity.com',
    coverImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800'
  },

  // --- EDUCATION ---
  {
    id: '29',
    name: 'Skillshare',
    provider: 'Skillshare',
    description: 'Explore thousands of hands-on creative classes.',
    features: [
      'Unlimited Classes',
      'Offline Viewing',
      'Projects'
    ],
    category: Category.EDUCATION,
    tags: ['Learning', 'Creative'],
    link: 'https://www.skillshare.com/en/school-scholarships',
    studentPrice: '50% OFF',
    originalPrice: '$32/mo',
    popular: false,
    brandColor: '#00FF84',
    logoUrl: 'https://logo.clearbit.com/skillshare.com',
    coverImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '30',
    name: 'Coursera',
    provider: 'Coursera',
    description: 'Build skills with courses, certificates, and degrees from top universities.',
    features: [
      'Guided Projects',
      'Certificates',
      'Financial Aid'
    ],
    category: Category.EDUCATION,
    tags: ['Learning', 'Certificates'],
    link: 'https://www.coursera.org/campus/students',
    studentPrice: 'Free/Aid',
    originalPrice: '$59/mo',
    popular: false,
    brandColor: '#0056D2',
    logoUrl: 'https://logo.clearbit.com/coursera.org',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '31',
    name: 'Headspace',
    provider: 'Headspace',
    description: 'Mindfulness and meditation for stress, focus, and sleep.',
    features: [
      'Guided Meditations',
      'Focus Music',
      'Sleepcasts'
    ],
    category: Category.EDUCATION,
    tags: ['Health', 'Focus'],
    link: 'https://www.headspace.com/studentplan',
    studentPrice: '$10/yr',
    originalPrice: '$70/yr',
    popular: false,
    brandColor: '#F47D31',
    logoUrl: 'https://logo.clearbit.com/headspace.com',
    coverImage: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '35',
    name: 'DataCamp',
    provider: 'DataCamp',
    description: 'Learn Data Science, Python, R, and SQL. Free 3 months with GitHub Pack.',
    features: [
      'Python & R',
      'SQL Courses',
      'Certificates'
    ],
    category: Category.EDUCATION,
    tags: ['Coding', 'Data', 'Learning'],
    link: 'https://www.datacamp.com/groups/education',
    studentPrice: 'Free (3mo)',
    originalPrice: '$25/mo',
    popular: false,
    brandColor: '#03EF62',
    logoUrl: 'https://logo.clearbit.com/datacamp.com',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800'
  }
];
