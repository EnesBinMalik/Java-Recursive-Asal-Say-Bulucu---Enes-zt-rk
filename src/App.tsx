import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ConsoleTerminal } from './components/ConsoleTerminal';
import { RecursionVisualizer } from './components/RecursionVisualizer';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { AlgorithmGuide } from './components/AlgorithmGuide';
import { JAVA_SOURCE_CODE_SQRT } from './utils/primeSimulator';
import { Terminal, Layers, FileCode, BookOpen, CheckCircle, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'visualizer' | 'code' | 'algorithm'>('terminal');
  const [visualizerTarget, setVisualizerTarget] = useState<number>(17);

  const handleDownloadCode = (code = JAVA_SOURCE_CODE_SQRT, filename = 'AsalSayiBulucu.java') => {
    const blob = new Blob([code], { type: 'text/x-java-source;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSelectNumberForVisualizer = (num: number) => {
    setVisualizerTarget(num);
    setActiveTab('visualizer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Bar Contract Compliant Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadCode={() => handleDownloadCode()}
      />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Info Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <span>Java SE Standard Edition</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Recursive (Özyinelemeli) Programlama</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-white font-semibold">Enes Öztürk</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Java Recursive Asal Sayı Bulma Programı
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Kullanıcıdan alınan sayının <strong className="text-slate-200">döngü kullanılmadan</strong>, tamamen recursive metot ile asal olup olmadığını tespit eden Java programı. İstenen senaryoları simüle edebilir, Java kaynak kodunu inceleyebilir ve çağrı yığınını (call stack) adım adım gözlemleyebilirsiniz.
              </p>
            </div>

            {/* Quick Stat / Scenario Reference */}
            <div className="grid grid-cols-2 gap-3 shrink-0 font-mono text-xs">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[11px]">22 ve 39</div>
                <div className="text-rose-400 font-bold mt-0.5">ASAL DEĞİLDİR !</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[11px]">2 ve 17</div>
                <div className="text-emerald-400 font-bold mt-0.5">ASALDIR !</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation on Mobile / Sub-bar */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap gap-2 md:hidden">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium ${
                activeTab === 'terminal' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Konsol
            </button>
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium ${
                activeTab === 'visualizer' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Yığın İzleyici
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium ${
                activeTab === 'code' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Java Kodu
            </button>
            <button
              onClick={() => setActiveTab('algorithm')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium ${
                activeTab === 'algorithm' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Rehber
            </button>
          </div>
        </div>

        {/* Dynamic Tab Views */}
        {activeTab === 'terminal' && (
          <ConsoleTerminal onSelectNumberForVisualizer={handleSelectNumberForVisualizer} />
        )}

        {activeTab === 'visualizer' && (
          <RecursionVisualizer initialNumber={visualizerTarget} />
        )}

        {activeTab === 'code' && (
          <JavaCodeViewer onDownload={handleDownloadCode} />
        )}

        {activeTab === 'algorithm' && (
          <AlgorithmGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 text-slate-500 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Java Recursive Asal Sayı Bulucu · Geliştirici ve Tasarım: <strong className="text-slate-300">Enes Öztürk</strong>
          </div>
          <div className="flex items-center gap-3">
            <span>Scanner Girişi</span>
            <span aria-hidden="true">·</span>
            <span>Özyinelemeli Metot</span>
            <span aria-hidden="true">·</span>
            <span>JDK 8 / 11 / 17 / 21</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
