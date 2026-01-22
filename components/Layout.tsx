
import React from 'react';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-24 md:pb-0 md:pl-20">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="font-heading text-2xl tracking-tighter text-blue-500">STEP<span className="text-emerald-400">UP</span></h1>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 shadow-lg shadow-blue-500/20"></div>
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col items-center py-8 gap-10 z-50">
        <div className="font-heading text-xl font-black text-blue-500 mb-4 select-none">SU</div>
        <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<Icons.Steps />} label="Home" />
        <NavButton active={activeTab === 'habits'} onClick={() => setActiveTab('habits')} icon={<Icons.Habits />} label="Tasks" />
        <NavButton active={activeTab === 'coach'} onClick={() => setActiveTab('coach')} icon={<Icons.AI />} label="Coach" />
        <NavButton active={activeTab === 'vision'} onClick={() => setActiveTab('vision')} icon={<Icons.Sparkles />} label="Vision" />
        <div className="mt-auto">
          <Icons.Trophy />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 flex justify-around items-center py-4 z-50 px-2">
        <MobileNavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<Icons.Steps />} />
        <MobileNavButton active={activeTab === 'habits'} onClick={() => setActiveTab('habits')} icon={<Icons.Habits />} />
        <MobileNavButton active={activeTab === 'coach'} onClick={() => setActiveTab('coach')} icon={<Icons.AI />} />
        <MobileNavButton active={activeTab === 'vision'} onClick={() => setActiveTab('vision')} icon={<Icons.Sparkles />} />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`group relative p-3 rounded-xl transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}
  >
    {icon}
    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
      {label}
    </span>
  </button>
);

const MobileNavButton = ({ active, onClick, icon }: any) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-full transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 -translate-y-2' : 'text-slate-400'}`}
  >
    {icon}
  </button>
);

export default Layout;
