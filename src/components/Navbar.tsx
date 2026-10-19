import React from 'react';
import { Terminal, Download, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'terminal' | 'visualizer' | 'code' | 'algorithm';
  setActiveTab: (tab: 'terminal' | 'visualizer' | 'code' | 'algorithm') => void;
  onDownloadCode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onDownloadCode }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title with Signature */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white whitespace-nowrap">
                Java Recursive Asal Sayı Bulucu
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Geliştirici: <strong className="text-emerald-400 font-medium">Enes Öztürk</strong></span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Java SE</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Konsol Simülatörü
          </button>
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'visualizer'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Adım Adım Yığın (Stack) İzleyici
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'code'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Java Kaynak Kodu
          </button>
          <button
            onClick={() => setActiveTab('algorithm')}
            className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'algorithm'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Algoritma & İspat
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownloadCode}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            title="AsalSayiBulucu.java dosyasını indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>AsalSayiBulucu.java İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
