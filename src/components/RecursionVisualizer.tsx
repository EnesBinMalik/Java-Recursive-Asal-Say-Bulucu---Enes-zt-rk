import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Layers, ArrowDown, Check, X, Info } from 'lucide-react';
import { runRecursivePrimeSimulation } from '../utils/primeSimulator';
import { CallStep } from '../types';

interface RecursionVisualizerProps {
  initialNumber?: number;
}

export const RecursionVisualizer: React.FC<RecursionVisualizerProps> = ({ initialNumber = 17 }) => {
  const [targetNumber, setTargetNumber] = useState<number>(initialNumber);
  const [method, setMethod] = useState<'sqrt' | 'half'>('sqrt');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms per step

  // Re-run simulation when targetNumber or method changes
  const simulation = React.useMemo(() => {
    return runRecursivePrimeSimulation(targetNumber, method);
  }, [targetNumber, method]);

  const steps = simulation.steps;
  const currentStep: CallStep | undefined = steps[currentStepIndex];

  // Sync initial number if prop updates
  useEffect(() => {
    if (initialNumber) {
      setTargetNumber(initialNumber);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  }, [initialNumber]);

  // Autoplay timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, playbackSpeed]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Compute active stack frames up to current step
  const activeStack = React.useMemo(() => {
    const stack: { depth: number; sayi: number; bolen: number; status: string; returnValue?: boolean }[] = [];
    for (let i = 0; i <= currentStepIndex; i++) {
      const s = steps[i];
      if (s.type === 'call') {
        stack.push({
          depth: s.depth,
          sayi: s.sayi,
          bolen: s.bolen,
          status: 'running'
        });
      } else if (s.type === 'return') {
        const frameIndex = stack.findIndex((f) => f.depth === s.depth && f.bolen === s.bolen);
        if (frameIndex !== -1) {
          stack[frameIndex].status = s.result ? 'returned-true' : 'returned-false';
          stack[frameIndex].returnValue = s.result;
        }
      }
    }
    return stack;
  }, [currentStepIndex, steps]);

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Adım Adım Recursive Çağrı Yığını İzleyicisi</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Java belleğindeki (Call Stack) özyinelemeli fonksiyon çağrılarını ve taban koşulu çözülüşünü izleyin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Test Sayısı:</span>
            {[22, 2, 39, 17, 7, 29].map((n) => (
              <button
                key={n}
                onClick={() => {
                  setTargetNumber(n);
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors border ${
                  targetNumber === n
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-700'
                }`}
              >
                {n}
              </button>
            ))}
            <input
              type="number"
              value={targetNumber}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) {
                  setTargetNumber(val);
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                }
              }}
              className="w-20 px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white text-center focus:outline-none focus:border-emerald-500"
              placeholder="Sayı"
            />
          </div>
        </div>

        {/* Stepper Controls Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors"
              title="Başa Dön"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-slate-200 transition-colors"
            >
              Geri
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Durdur' : 'Oynat'}</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex >= steps.length - 1}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-slate-200 transition-colors"
            >
              İleri
            </button>
            <button
              onClick={() => {
                setCurrentStepIndex(steps.length - 1);
                setIsPlaying(false);
              }}
              disabled={currentStepIndex >= steps.length - 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors"
              title="Son Adıma Git"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-slate-400">
              Adım: <strong className="text-emerald-400">{currentStepIndex + 1}</strong> / {steps.length}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Hız:</span>
              {[
                { label: '0.5x', ms: 1500 },
                { label: '1x', ms: 900 },
                { label: '2x', ms: 400 }
              ].map(({ label, ms }) => (
                <button
                  key={label}
                  onClick={() => setPlaybackSpeed(ms)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                    playbackSpeed === ms ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Left Call Stack Frames / Right Code & Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Stack Frames (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Java Call Stack (Çağrı Yığını)</span>
                <span className="text-xs text-slate-400 font-mono">
                  Derinlik: {activeStack.length}
                </span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">LIFO (Son Giren İlk Çıkar)</span>
            </div>

            {/* Stack Visualizer Container */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {activeStack.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs font-mono">
                  Yığın henüz başlamadı. "Oynat" veya "İleri" tuşuna basınız.
                </div>
              ) : (
                activeStack.map((frame, idx) => {
                  const isCurrent = currentStep?.depth === frame.depth && currentStep?.bolen === frame.bolen;
                  return (
                    <div
                      key={`${frame.depth}-${frame.bolen}`}
                      className={`p-3 rounded-lg border font-mono transition-all duration-200 ${
                        isCurrent
                          ? 'bg-slate-800 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          Frame #{frame.depth}
                        </span>
                        {frame.returnValue !== undefined ? (
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              frame.returnValue
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            Döndü: {frame.returnValue ? 'true' : 'false'}
                          </span>
                        ) : (
                          <span className="text-amber-400 text-[11px] flex items-center gap-1">
                            Bekliyor...
                          </span>
                        )}
                      </div>

                      <div className="text-sm font-semibold text-white">
                        isPrime(
                        <span className="text-sky-300">{frame.sayi}</span>,{' '}
                        <span className="text-amber-300">{frame.bolen}</span>
                        )
                      </div>

                      <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                        <span>
                          {method === 'sqrt'
                            ? `Bölen²: ${frame.bolen * frame.bolen}`
                            : `Yarısı: ${Math.floor(frame.sayi / 2)}`}
                        </span>
                        <span>
                          Kalan: {frame.sayi % frame.bolen === 0 ? '0 (Tam Bölündü)' : `${frame.sayi % frame.bolen} (Kalan var)`}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Stack summary bottom */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Toplam Çağrı Sayısı: <strong className="text-white">{simulation.totalCalls}</strong></span>
            <span>Sonuç: <strong className={simulation.isPrime ? 'text-emerald-400' : 'text-rose-400'}>{simulation.isPrime ? 'ASALDIR' : 'ASAL DEĞİLDİR'}</strong></span>
          </div>
        </div>

        {/* Right Column: Code Execution & Variable Trace (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Step Explanation Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                Adım Detayı ({currentStep?.type === 'call' ? 'Yeni Çağrı' : currentStep?.type === 'return' ? 'Dönüş (Return)' : 'Kontrol'})
              </span>
              <span className="font-mono text-emerald-400">Enes Öztürk Analiz Motoru</span>
            </div>
            
            <p className="text-sm text-slate-100 font-medium leading-relaxed">
              {currentStep?.conditionDescription || 'Hazır.'}
            </p>

            {/* Variable State Table */}
            {currentStep && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 font-mono text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px]">sayi</div>
                  <div className="text-white font-bold text-sm">{currentStep.sayi}</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px]">bolen</div>
                  <div className="text-amber-400 font-bold text-sm">{currentStep.bolen}</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px]">
                    {method === 'sqrt' ? 'bolen * bolen' : 'sayi / 2'}
                  </div>
                  <div className="text-sky-400 font-bold text-sm">
                    {method === 'sqrt' ? currentStep.bolen * currentStep.bolen : Math.floor(currentStep.sayi / 2)}
                  </div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px]">sayi % bolen</div>
                  <div className={`font-bold text-sm ${currentStep.sayi % currentStep.bolen === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {currentStep.sayi % currentStep.bolen}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Java Code Highlight Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto">
            <div className="text-slate-500 text-[11px] mb-2 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Java Metot Yürütme Hattı</span>
              <span>public static boolean isPrime(int sayi, int bolen)</span>
            </div>
            
            <div className="space-y-1">
              {[
                { line: 11, code: 'if (sayi <= 1) return false;', comment: '// 1 ve küçük sayılar asal değil' },
                { line: 15, code: 'if (sayi == 2 || sayi == 3) return true;', comment: '// 2 ve 3 asaldır' },
                { line: 20, code: 'if (bolen * bolen > sayi) return true;', comment: '// Taban koşul: bölen bulunamadı' },
                { line: 24, code: 'if (sayi % bolen == 0) return false;', comment: '// Tam bölündü, asal değil' },
                { line: 28, code: 'return isPrime(sayi, bolen + 1);', comment: '// Recursive adım' }
              ].map(({ line, code, comment }) => {
                const isHighlight = currentStep?.codeLine === line;
                return (
                  <div
                    key={line}
                    className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                      isHighlight
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border-l-2 border-emerald-400'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="text-slate-600 select-none w-6 text-right">{line}</span>
                    <span className={isHighlight ? 'text-white' : 'text-slate-300'}>{code}</span>
                    <span className="text-slate-600 text-[11px] hidden sm:inline">{comment}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scenario Quick Reference Cards */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <h4 className="font-semibold text-white mb-2">Talep Edilen Senaryoların Recursive Sonuçları:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] font-mono">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong className="text-white">22:</strong> 22 % 2 == 0 &rarr; <span className="text-rose-400 font-bold">ASAL değildir !</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong className="text-white">2:</strong> sayi == 2 taban koşulu &rarr; <span className="text-emerald-400 font-bold">ASALDIR !</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong className="text-white">39:</strong> 39 % 2 != 0, 39 % 3 == 0 &rarr; <span className="text-rose-400 font-bold">ASAL değildir !</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <strong className="text-white">17:</strong> bölen 2,3,4 kontrol edilir, 5*5&gt;17 &rarr; <span className="text-emerald-400 font-bold">ASALDIR !</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
