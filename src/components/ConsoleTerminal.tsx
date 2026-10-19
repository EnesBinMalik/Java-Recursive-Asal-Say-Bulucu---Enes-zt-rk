import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, ArrowRight, CornerDownLeft, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { runRecursivePrimeSimulation } from '../utils/primeSimulator';

interface TerminalEntry {
  id: string;
  type: 'prompt' | 'result' | 'system';
  number?: number;
  text: string;
  isPrime?: boolean;
  timeMs?: number;
}

interface ConsoleTerminalProps {
  onSelectNumberForVisualizer: (num: number) => void;
}

export const ConsoleTerminal: React.FC<ConsoleTerminalProps> = ({ onSelectNumberForVisualizer }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [method, setMethod] = useState<'sqrt' | 'half'>('sqrt');
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Java Development Kit (JDK 21) - Asal Sayı Bulucu Başlatıldı'
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Geliştirici: Enes Öztürk · Recursive Metot: isPrime(int sayi, int bolen)'
    },
    {
      id: 'init-3',
      type: 'system',
      text: 'Hazır Senaryolar: 22, 2, 39, 17 test edilmeye hazır.'
    }
  ]);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeNumber = (n: number) => {
    const sim = runRecursivePrimeSimulation(n, method);
    const resultText = sim.isPrime 
      ? `${n} sayısı ASALDIR !`
      : `${n} sayısı ASAL değildir !`;

    const newEntries: TerminalEntry[] = [
      {
        id: `p-${Date.now()}-1`,
        type: 'prompt',
        number: n,
        text: `Sayı Giriniz : ${n}`
      },
      {
        id: `r-${Date.now()}-2`,
        type: 'result',
        number: n,
        text: resultText,
        isPrime: sim.isPrime,
        timeMs: sim.executionTimeMs
      }
    ];

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(inputVal.trim(), 10);
    if (isNaN(parsed)) {
      setHistory((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: 'system',
          text: 'Hata: Lütfen geçerli bir tamsayı giriniz!'
        }
      ]);
      setInputVal('');
      return;
    }

    executeNumber(parsed);
    setInputVal('');
  };

  const runAllPromptScenarios = async () => {
    if (isRunningAll) return;
    setIsRunningAll(true);

    const scenarios = [22, 2, 39, 17];
    
    setHistory((prev) => [
      ...prev,
      {
        id: `batch-${Date.now()}`,
        type: 'system',
        text: '--- Senaryolar Sırayla Çalıştırılıyor (22, 2, 39, 17) ---'
      }
    ]);

    for (let i = 0; i < scenarios.length; i++) {
      const num = scenarios[i];
      await new Promise((resolve) => setTimeout(resolve, 450));
      executeNumber(num);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    setHistory((prev) => [
      ...prev,
      {
        id: `sig-${Date.now()}`,
        type: 'system',
        text: '--- Program Sonu | Enes Öztürk İmzalı ---'
      }
    ]);

    setIsRunningAll(false);
  };

  const handleClear = () => {
    setHistory([
      {
        id: `reset-${Date.now()}`,
        type: 'system',
        text: 'Konsol temizlendi. Sayı girmeye devam edebilirsiniz.'
      }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Scenario Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>İstenen Senaryo Testleri</span>
              <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                Enes Öztürk
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Kullanıcının talep ettiği 4 temel senaryoyu tek tıkla konsolda çalıştırabilir veya özel sayı girebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={runAllPromptScenarios}
              disabled={isRunningAll}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunningAll ? 'Çalıştırılıyor...' : 'Tüm Senaryoları Çalıştır (22, 2, 39, 17)'}</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Temizle</span>
            </button>
          </div>
        </div>

        {/* Quick Scenario Buttons */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400 mr-1">Hızlı Sayı Girişi:</span>
          {[
            { n: 22, label: '22 (Asal Değildir)' },
            { n: 2, label: '2 (ASALDIR)' },
            { n: 39, label: '39 (Asal Değildir)' },
            { n: 17, label: '17 (ASALDIR)' },
            { n: 1, label: '1 (Asal Değil)' },
            { n: 97, label: '97 (ASALDIR)' }
          ].map(({ n, label }) => (
            <button
              key={n}
              onClick={() => executeNumber(n)}
              className="px-3 py-1.5 text-xs font-mono rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400">
              Terminal: java AsalSayiBulucu.java (Geliştirici: Enes Öztürk)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Algoritma:</span>
            <button
              onClick={() => setMethod('sqrt')}
              className={`px-2 py-0.5 rounded font-mono text-[11px] transition-colors ${
                method === 'sqrt'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="bolen * bolen > sayi (O(√N) - Önerilen)"
            >
              O(√N) Optimizasyonlu
            </button>
            <button
              onClick={() => setMethod('half')}
              className={`px-2 py-0.5 rounded font-mono text-[11px] transition-colors ${
                method === 'half'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="bolen > sayi / 2 (Klasik Doğrusal)"
            >
              O(N/2) Klasik
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 font-mono text-sm min-h-[380px] max-h-[500px] overflow-y-auto space-y-3">
          {history.map((entry) => {
            if (entry.type === 'system') {
              return (
                <div key={entry.id} className="text-slate-500 text-xs italic border-b border-slate-900/60 pb-1">
                  {entry.text}
                </div>
              );
            }

            if (entry.type === 'prompt') {
              return (
                <div key={entry.id} className="text-emerald-400 font-semibold flex items-center gap-2 pt-2">
                  <span className="text-slate-500 select-none">$</span>
                  <span>{entry.text}</span>
                </div>
              );
            }

            if (entry.type === 'result') {
              return (
                <div
                  key={entry.id}
                  className={`p-3 rounded-lg border flex items-center justify-between gap-4 transition-all ${
                    entry.isPrime
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-900/60 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {entry.isPrime ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                    <span className="font-bold text-base tracking-wide">
                      {entry.text}
                    </span>
                  </div>

                  {entry.number !== undefined && (
                    <button
                      onClick={() => onSelectNumberForVisualizer(entry.number!)}
                      className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>Yığında Gör</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            }

            return null;
          })}

          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
          <label htmlFor="num-input" className="font-mono text-sm text-emerald-400 font-bold whitespace-nowrap pl-2">
            Sayı Giriniz :
          </label>
          <input
            id="num-input"
            ref={inputRef}
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Örn: 17, 22, 2, 39..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Gönder</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Signature & Senaryo Özeti */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
        <div>
          <span className="text-slate-300 font-medium">Program İmzası:</span> Java Recursive Asal Sayı Bulucu - Enes Öztürk
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            ASALDIR (Örn: 2, 17)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            ASAL değildir ! (Örn: 22, 39)
          </span>
        </div>
      </div>
    </div>
  );
};
