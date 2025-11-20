
import React from 'react';
import { Zap, PenTool, Terminal, Music, ShoppingBag, Layout, Shield, Code2, TrainFront } from 'lucide-react';

interface BrandLogoProps {
  provider: string;
  name: string;
  className?: string;
  color: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ provider, name, className, color }) => {
  const p = provider.toLowerCase();
  const n = name.toLowerCase();

  // --- 1. GitHub (Octocat style) ---
  if (p.includes('github')) {
    return (
      <div className={`${className} flex items-center justify-center bg-slate-950`}>
        <svg viewBox="0 0 24 24" fill="white" className="w-3/4 h-3/4">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </div>
    );
  }

  // --- 2. Notion (N logo) ---
  if (p.includes('notion')) {
    return (
      <div className={`${className} flex items-center justify-center bg-[#FFF]`}>
        <svg viewBox="0 0 24 24" className="w-3/4 h-3/4 fill-black">
           <path d="M4.459 4.208c.746.606 1.026.56 2.67.839l.093 13.146c0 .792-.373 1.026-1.352 1.584l.047.653 6.998.513v-3.403L17.238 22l1.913-.14c.98-.28 1.353-.513 1.353-1.352l-.094-14.685c0-.746.373-1.026 1.026-1.539L21.39 3.51l-6.625-.467v2.797L10.476 2l-1.913.187c-.98.28-1.353.606-1.353 1.306l.093 10.955L5.392 2.297 4.46 4.208z" />
        </svg>
      </div>
    );
  }

  // --- 3. Spotify (Green Circle) ---
  if (p.includes('spotify')) {
    return (
      <div className={`${className} flex items-center justify-center bg-[#1DB954]`}>
        <svg viewBox="0 0 24 24" fill="black" className="w-3/4 h-3/4">
           <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
    );
  }

  // --- 4. Adobe (Colored Grid) ---
  if (p.includes('adobe')) {
    return (
      <div className={`${className} grid grid-cols-2 grid-rows-2 gap-0.5 p-1 bg-[#FF0000]`}>
         <div className="bg-[#31A8FF] w-full h-full rounded-[1px]"></div>
         <div className="bg-[#00005E] w-full h-full rounded-[1px]"></div>
         <div className="bg-[#F60F9D] w-full h-full rounded-[1px]"></div>
         <div className="bg-[#999999] w-full h-full rounded-[1px]"></div>
      </div>
    );
  }

  // --- 5. Angkas (Orange Moto) ---
  if (p.includes('angkas')) {
    return (
      <div className={`${className} flex items-center justify-center bg-[#009AD7]`}>
         {/* Simplified Wing/Helmet shape */}
         <svg viewBox="0 0 24 24" fill="white" className="w-3/4 h-3/4">
            <path d="M12 2L2 22h20L12 2zm0 4l5 13H7l5-13z" />
         </svg>
      </div>
    );
  }

  // --- 6. Apple ---
  if (p.includes('apple')) {
      return (
          <div className={`${className} flex items-center justify-center bg-white`}>
             <svg viewBox="0 0 24 24" fill="black" className="w-3/4 h-3/4">
                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.82 0 2.16-.87 3.61-.74 1.54.05 2.7 1.04 3.39 1.04 3.39 2.05-3.74 2.35-3.74 2.35-7.09 3.34.13 4.66 3.44zm-4.04-3.9c.6-.73 1.01-1.74 0.89-2.75-.87.04-1.92.58-2.54 1.32-.55.65-1.03 1.68-.9 2.67.97.07 1.96-.52 2.55-1.24z"/>
             </svg>
          </div>
      )
  }
  
  // --- 7. Google ---
  if (p.includes('google') || p.includes('youtube')) {
      return (
        <div className={`${className} flex items-center justify-center bg-white`}>
            <svg viewBox="0 0 24 24" className="w-3/4 h-3/4">
                <path fill="#4285F4" d="M23.745 12.27c0-.74-.06-1.44-.18-2.11H12v4.26h6.615c-.325 1.865-1.3 3.41-2.72 4.34v3.575h4.39c2.56-2.365 4.06-5.865 4.06-9.865z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.96-2.91l-4.39-3.575c-1.08.725-2.46 1.16-3.57 1.16-2.74 0-5.06-1.85-5.88-4.33H1.95v4.06C3.96 22.405 7.71 24 12 24z" />
                <path fill="#FBBC05" d="M6.12 14.345c-.21-.64-.32-1.32-.32-2.04s.11-1.4.32-2.04V6.205H1.95C1.14 7.825 .71 9.645 .71 11.7c0 2.055.43 3.875 1.24 5.495l4.17-4.85z" />
                <path fill="#EA4335" d="M12 4.76c1.77 0 3.36.61 4.63 1.82l3.46-3.46C17.95 1.05 15.24 0 12 0 7.71 0 3.96 1.595 1.95 5.3L6.12 9.47c.82-2.48 3.14-4.33 5.88-4.33z" />
            </svg>
        </div>
      )
  }

   // --- 8. Transport (LRT/MRT) ---
   if (p.includes('grab') || p.includes('lrt') || n.includes('transport')) {
    return (
        <div className={`${className} flex items-center justify-center bg-white`}>
           <TrainFront className="text-slate-900 w-3/5 h-3/5" />
        </div>
    )
   }

  // --- Default Fallback with Lucide Icons ---
  let Icon = Zap;
  if (n.includes('design') || p.includes('figma') || p.includes('canva')) Icon = PenTool;
  if (n.includes('dev') || p.includes('jetbrains')) Icon = Terminal;
  if (n.includes('music')) Icon = Music;
  if (n.includes('amazon')) Icon = ShoppingBag;
  if (n.includes('microsoft')) Icon = Layout;
  if (n.includes('1password')) Icon = Shield;
  if (n.includes('cursor') || n.includes('code')) Icon = Code2;

  return (
    <div 
      className={`${className} flex items-center justify-center`}
      style={{ backgroundColor: color }}
    >
      <Icon className="text-white w-3/5 h-3/5 drop-shadow-md" strokeWidth={2.5} />
    </div>
  );
};
