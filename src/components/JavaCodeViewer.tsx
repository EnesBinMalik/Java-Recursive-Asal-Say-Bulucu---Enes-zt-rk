import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { JAVA_SOURCE_CODE_SQRT, JAVA_SOURCE_CODE_LINEAR } from '../utils/primeSimulator';

interface JavaCodeViewerProps {
  onDownload: (code: string, filename: string) => void;
}

export const JavaCodeViewer: React.FC<JavaCodeViewerProps> = ({ onDownload }) => {
  const [activeVariant, setActiveVariant] = useState<'sqrt' | 'linear'>('sqrt');
  const [copied, setCopied] = useState<boolean>(false);

  const currentCode = activeVariant === 'sqrt' ? JAVA_SOURCE_CODE_SQRT : JAVA_SOURCE_CODE_LINEAR;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    onDownload(currentCode, 'AsalSayiBulucu.java');
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Java Kaynak Kodu: AsalSayiBulucu.java</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Geliştirici: <strong className="text-emerald-400 font-semibold">Enes Öztürk</strong> · Java SE Standartlarına Uygun
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı !' : 'Kodu Kopyala'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.java İndir</span>
            </button>
          </div>
        </div>

        {/* Algorithm Variants Tabs */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Algoritma Varyasyonu:</span>
            <button
              onClick={() => setActiveVariant('sqrt')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                activeVariant === 'sqrt'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              O(√N) - Karekök Optimizasyonu (Önerilen)
            </button>
            <button
              onClick={() => setActiveVariant('linear')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                activeVariant === 'linear'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              O(N/2) - Klasik Yarısına Kadar Arama
            </button>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {activeVariant === 'sqrt' ? 'Zaman: O(√N) | Alan: O(√N)' : 'Zaman: O(N) | Alan: O(N)'}
          </div>
        </div>
      </div>

      {/* Code Editor Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            src/AsalSayiBulucu.java &bull; Enes Öztürk
          </span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            JDK 8, 11, 17, 21+ Uyumlu
          </span>
        </div>

        <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed">
          <pre className="text-slate-300">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>

      {/* Code Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <h3 className="font-semibold text-sm text-white">1. Taban Koşulları (Base Cases)</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sonsuz özyinelemeyi (StackOverflowError) engeller. <code className="text-sky-300">sayi &lt;= 1</code> ise false, <code className="text-sky-300">bolen * bolen &gt; sayi</code> ise true döner.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <h3 className="font-semibold text-sm text-white">2. Bölünebilirlik Kontrolü</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            <code className="text-sky-300">sayi % bolen == 0</code> ifadesi tam bölünme kontrolü yapar. Eğer tam bölünüyorsa sayı asal değildir ve anında false döner.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <h3 className="font-semibold text-sm text-white">3. Özyineleme (Recursive Step)</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Kalan varsa, <code className="text-sky-300">isPrime(sayi, bolen + 1)</code> şeklinde kendini çağırarak bir sonraki böleni test eder.
          </p>
        </div>
      </div>
    </div>
  );
};
