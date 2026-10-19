import React from 'react';
import { BookOpen, CheckCircle, HelpCircle, Zap, Shield, Hash } from 'lucide-react';

export const AlgorithmGuide: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">
            Recursive (Özyinelemeli) Asal Sayı Algoritması Rehberi
          </h2>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Bu dokümantasyon, Java dilinde döngü (<code className="text-emerald-400">for</code>, <code className="text-emerald-400">while</code>) kullanmadan yalnızca bir fonksiyonun kendi kendini çağırması (recursion) ile asal sayı bulma mantığını ve matematiksel ispatını açıklar.
        </p>
        <div className="mt-3 text-xs text-slate-500 font-mono">
          Yazar / Geliştirici: <strong className="text-emerald-400">Enes Öztürk</strong>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Recursive Nedir? */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>1. Recursive (Özyineleme) Prensibi</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Recursive bir metot, karmaşık bir problemi daha küçük alt problemlere indirgeyerek kendi kendini çağıran yapıdır. Recursive fonksiyonların sağlıklı çalışabilmesi için 2 şart şarttır:
          </p>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-emerald-300">Taban Durumu (Base Case):</strong> Fonksiyonun kendi kendini çağırmayı durdurduğu ve kesin bir değer (<code className="text-sky-300">true</code> veya <code className="text-sky-300">false</code>) döndürdüğü nokta.
            </li>
            <li>
              <strong className="text-emerald-300">Özyineleme Adımı (Recursive Step):</strong> Problemi küçülterek (<code className="text-sky-300">bolen + 1</code>) fonksiyonun tekrar tetiklenmesi.
            </li>
          </ul>
        </div>

        {/* Card 2: Taban Durumları Tablosu */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>2. isPrime Metodunun Taban Durumları</span>
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span>sayi &le; 1</span>
              <span className="text-rose-400 font-bold">return false;</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span>sayi == 2 || sayi == 3</span>
              <span className="text-emerald-400 font-bold">return true;</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span>sayi % bolen == 0</span>
              <span className="text-rose-400 font-bold">return false; (Tam bölündü)</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span>bolen * bolen &gt; sayi</span>
              <span className="text-emerald-400 font-bold">return true; (Bölen kalmadı)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Matematiksel İspat Bölümü */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Hash className="w-4 h-4 text-sky-400" />
          <span>3. Matematiksel İspat: Neden √N Sınırı Yeterlidir?</span>
        </h3>
        
        <p className="text-xs text-slate-300 leading-relaxed">
          Birçok acemi programcı 2'den başlayıp sayının kendisine veya yarısına kadar döngü kurar. Ancak bir sayının asal olup olmadığını anlamak için bölenleri yalnızca <strong>sayının kareköküne (√N)</strong> kadar test etmek matematiksel olarak yeterlidir.
        </p>

        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
          <div className="text-emerald-400 font-bold">Matematiksel Teorem:</div>
          <div>Varsayalım ki N bileşik bir sayıdır (asal değildir). O halde:</div>
          <div className="text-white font-bold pl-3">N = a &times; b (1 &lt; a &le; b &lt; N)</div>
          <div>Eğer her iki çarpan da karekökten büyük olsaydı (a &gt; &radic;N ve b &gt; &radic;N):</div>
          <div className="text-rose-400 font-bold pl-3">a &times; b &gt; &radic;N &times; &radic;N = N (ÇELİŞKİ!)</div>
          <div>Sonuç olarak, en az bir çarpan mutlaka <strong>&radic;N</strong> değerine eşit veya ondan küçük olmak zorundadır.</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-slate-400 mb-1 font-semibold">Klasik Yöntem (O(N)):</div>
            <div className="text-slate-300">1.000.000 sayısı için 500.000 recursive çağrı yapılır. Yığın (Stack) taşabilir!</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-emerald-400 mb-1 font-semibold">Enes Öztürk Optimizasyonu (O(&radic;N)):</div>
            <div className="text-slate-300">1.000.000 sayısı için en fazla 1.000 recursive çağrı yapılır. %99.8 daha hızlı ve güvenlidir!</div>
          </div>
        </div>
      </div>

      {/* Senaryo Analiz Tablosu */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-base font-bold text-white mb-3">
          Talep Edilen Senaryoların Kod Üzerindeki İncelemesi
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Girdi</th>
                <th className="py-2.5 px-3">İlk Çağrı</th>
                <th className="py-2.5 px-3">Adım Sayısı</th>
                <th className="py-2.5 px-3">Durduran Koşul</th>
                <th className="py-2.5 px-3">Konsol Çıktısı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">22</td>
                <td className="py-2.5 px-3">isPrime(22, 2)</td>
                <td className="py-2.5 px-3">1 adım</td>
                <td className="py-2.5 px-3 text-rose-300">22 % 2 == 0 (Tam bölündü)</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">22 sayısı ASAL değildir !</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">2</td>
                <td className="py-2.5 px-3">isPrime(2, 2)</td>
                <td className="py-2.5 px-3">1 adım</td>
                <td className="py-2.5 px-3 text-emerald-300">sayi == 2 taban koşulu</td>
                <td className="py-2.5 px-3 text-emerald-400 font-semibold">2 sayısı ASALDIR !</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">39</td>
                <td className="py-2.5 px-3">isPrime(39, 2)</td>
                <td className="py-2.5 px-3">2 adım</td>
                <td className="py-2.5 px-3 text-rose-300">39 % 3 == 0 (3 ile tam bölündü)</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">39 sayısı ASAL değildir !</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-white">17</td>
                <td className="py-2.5 px-3">isPrime(17, 2)</td>
                <td className="py-2.5 px-3">4 adım</td>
                <td className="py-2.5 px-3 text-emerald-300">bolen=5 iken 5*5 &gt; 17</td>
                <td className="py-2.5 px-3 text-emerald-400 font-semibold">17 sayısı ASALDIR !</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
