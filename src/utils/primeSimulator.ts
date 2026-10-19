import { CallStep, SimulationResult } from '../types';

/**
 * Recursive Asal Sayı Bulma Simülatörü
 * Geliştirici: Enes Öztürk
 */

export function runRecursivePrimeSimulation(sayi: number, method: 'sqrt' | 'half' = 'sqrt'): SimulationResult {
  const startTime = performance.now();
  const steps: CallStep[] = [];
  let stepCounter = 0;

  // Taban Koşul 1: 1 ve daha küçük sayılar asal değildir
  if (sayi <= 1) {
    steps.push({
      stepIndex: ++stepCounter,
      type: 'check',
      sayi,
      bolen: 2,
      depth: 1,
      conditionDescription: `${sayi} <= 1 taban koşulu sağlandı. 1 ve daha küçük sayılar asal sayı tanımına girmez.`,
      result: false,
      status: 'failure',
      codeLine: 11
    });

    return {
      input: sayi,
      isPrime: false,
      steps,
      executionTimeMs: Number((performance.now() - startTime).toFixed(3)),
      totalCalls: 1,
      finalDivisor: 2,
      reason: `${sayi} sayısı 1'den küçük veya eşittir. Asal sayılar 1'den büyük pozitif tam sayılardır.`
    };
  }

  // Taban Koşul 2: 2 ve 3 doğrudan asaldır
  if (sayi === 2 || sayi === 3) {
    steps.push({
      stepIndex: ++stepCounter,
      type: 'check',
      sayi,
      bolen: 2,
      depth: 1,
      conditionDescription: `${sayi} sayısı en temel asal sayılardandır (sayi == 2 || sayi == 3). Doğrudan true döner.`,
      result: true,
      status: 'success',
      codeLine: 15
    });

    return {
      input: sayi,
      isPrime: true,
      steps,
      executionTimeMs: Number((performance.now() - startTime).toFixed(3)),
      totalCalls: 1,
      finalDivisor: 2,
      reason: `${sayi} sayısı yalnızca 1'e ve kendisine bölünebilir.`
    };
  }

  let totalCalls = 0;
  let finalDivisor = 2;
  let isPrimeFinal = false;

  function recursiveWorker(n: number, d: number, depth: number): boolean {
    totalCalls++;
    finalDivisor = d;

    // 1. Çağrı başlangıcı
    steps.push({
      stepIndex: ++stepCounter,
      type: 'call',
      sayi: n,
      bolen: d,
      depth,
      conditionDescription: `isPrime(sayi = ${n}, bolen = ${d}) çağrıldı. Yığın derinliği: ${depth}`,
      status: 'waiting',
      codeLine: 18
    });

    // 2. Sınır kontrolü (Taban durum: bölen aşımı)
    const limitReached = method === 'sqrt' ? (d * d > n) : (d > Math.floor(n / 2));
    const limitText = method === 'sqrt' 
      ? `bolen * bolen > sayi (${d} * ${d} = ${d * d} > ${n})`
      : `bolen > sayi / 2 (${d} > ${Math.floor(n / 2)})`;

    if (limitReached) {
      steps.push({
        stepIndex: ++stepCounter,
        type: 'return',
        sayi: n,
        bolen: d,
        depth,
        conditionDescription: `Taban Koşul: ${limitText} sağlandı! Başka bölen aranmasına gerek kalmadı. Sayı ASALDIR.`,
        result: true,
        status: 'success',
        codeLine: method === 'sqrt' ? 20 : 21
      });
      return true;
    }

    // 3. Bölünebilirlik kontrolü
    const isDivisible = n % d === 0;
    if (isDivisible) {
      steps.push({
        stepIndex: ++stepCounter,
        type: 'return',
        sayi: n,
        bolen: d,
        depth,
        conditionDescription: `${n} % ${d} == 0 (kalan 0). ${n} sayısı ${d} ile tam bölünüyor! Sayı ASAL DEĞİLDİR.`,
        result: false,
        status: 'failure',
        codeLine: 24
      });
      return false;
    } else {
      steps.push({
        stepIndex: ++stepCounter,
        type: 'check',
        sayi: n,
        bolen: d,
        depth,
        conditionDescription: `${n} % ${d} = ${n % d} != 0 (kalan var). Tam bölünmedi, bir sonraki bölen test edilecek: isPrime(${n}, ${d + 1})`,
        status: 'active',
        codeLine: 28
      });
    }

    // 4. Recursive Adım: bölen + 1
    const subResult = recursiveWorker(n, d + 1, depth + 1);

    steps.push({
      stepIndex: ++stepCounter,
      type: 'return',
      sayi: n,
      bolen: d,
      depth,
      conditionDescription: `isPrime(${n}, ${d}) çağrısı alt çağrıdan gelen sonucu (${subResult ? 'true' : 'false'}) geri döndürdü.`,
      result: subResult,
      status: subResult ? 'success' : 'failure',
      codeLine: 28
    });

    return subResult;
  }

  isPrimeFinal = recursiveWorker(sayi, 2, 1);
  const endTime = performance.now();

  let reason = '';
  if (isPrimeFinal) {
    reason = `${sayi} sayısı 2'den başlayarak ${finalDivisor}'a kadar hiçbir sayıya tam bölünmedi. Sayı ASALDIR !`;
  } else {
    reason = `${sayi} sayısı ${finalDivisor} sayısına tam bölündüğü için (${sayi} = ${finalDivisor} * ${sayi / finalDivisor}) ASAL değildir !`;
  }

  return {
    input: sayi,
    isPrime: isPrimeFinal,
    steps,
    executionTimeMs: Number((endTime - startTime).toFixed(3)),
    totalCalls,
    finalDivisor,
    reason
  };
}

export const JAVA_SOURCE_CODE_SQRT = `/**
 * ============================================================================
 * Proje: Java Recursive (Özyinelemeli) Asal Sayı Bulucu
 * Geliştirici: Enes Öztürk
 * Sürüm: 1.0.0
 * Lisans: Açık Kaynak / Eğitim Amaçlı
 * ============================================================================
 *
 * Algoritma Açıklaması:
 * Bu program, kullanıcının girdiği bir tamsayının asal olup olmadığını
 * döngü (for / while) kullanmaksızın "Recursive" (özyinelemeli) bir metot ile bulur.
 * 
 * Zaman Karmaşıklığı (Time Complexity): O(√N)
 * Alan Karmaşıklığı (Space Complexity): O(√N) - Çağrı yığını (call stack)
 */

import java.util.Scanner;

public class AsalSayiBulucu {

    /**
     * Recursive olarak sayının asal olup olmadığını kontrol eder.
     *
     * @param sayi  Kontrol edilen pozitif tamsayı
     * @param bolen Test edilen güncel bölen (ilk çağrıda 2 olarak verilir)
     * @return      Sayı asal ise true, asal değilse false döner
     */
    public static boolean isPrime(int sayi, int bolen) {
        // Taban Durum 1: 1 ve daha küçük sayılar asal sayı değildir
        if (sayi <= 1) {
            return false;
        }

        // Taban Durum 2: 2 ve 3 en küçük asal sayılardır
        if (sayi == 2 || sayi == 3) {
            return true;
        }

        // Taban Durum 3: Bölenin karesi sayıyı aşıyorsa,
        // bu aşamaya kadar hiçbir bölen bulunamamış demektir ve sayı asaldır!
        // Matematiksel İspat: n = a * b ise a ve b aynı anda √n'den büyük olamaz.
        if (bolen * bolen > sayi) {
            return true;
        }

        // Taban Durum 4: Eğer sayı mevcut bölene tam bölünüyorsa asal değildir
        if (sayi % bolen == 0) {
            return false;
        }

        // Recursive Adım: Bir sonraki böleni test etmek için kendini çağırır
        return isPrime(sayi, bolen + 1);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Kullanıcıdan giriş alma
        System.out.print("Sayı Giriniz : ");
        
        if (scanner.hasNextInt()) {
            int sayi = scanner.nextInt();

            // Metot başlangıçta bölen = 2 ile tetiklenir
            if (isPrime(sayi, 2)) {
                System.out.println(sayi + " sayısı ASALDIR !");
            } else {
                System.out.println(sayi + " sayısı ASAL değildir !");
            }
        } else {
            System.out.println("Lütfen geçerli bir tamsayı giriniz!");
        }

        System.out.println("\\n--- Program Sonu | Enes Öztürk ---");
        scanner.close();
    }
}
`;

export const JAVA_SOURCE_CODE_LINEAR = `/**
 * ============================================================================
 * Proje: Java Recursive Asal Sayı Bulucu (Doğrusal / Yarısına Kadar Arama)
 * Geliştirici: Enes Öztürk
 * ============================================================================
 * 
 * Bu sürümde bölen kontrolü (sayi / 2) değerine kadar devam eder.
 * Üniversite dersleri ve Patika.dev ödevlerinde sıkça tercih edilen klasik varyasyondur.
 */

import java.util.Scanner;

public class AsalSayiBulucu {

    public static boolean isPrime(int sayi, int bolen) {
        // 1 ve daha küçük sayılar asal değildir
        if (sayi <= 1) {
            return false;
        }

        // 2 sayısı asaldır
        if (sayi == 2) {
            return true;
        }

        // Sayı bölene kalansız bölünüyorsa asal değildir
        if (sayi % bolen == 0) {
            return false;
        }

        // Bölen, sayının yarısını geçtiğinde başka bölen kalmamıştır
        if (bolen > sayi / 2) {
            return true;
        }

        // Özyinelemeli çağrı
        return isPrime(sayi, bolen + 1);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Sayı Giriniz : ");
        int sayi = scanner.nextInt();

        if (isPrime(sayi, 2)) {
            System.out.println(sayi + " sayısı ASALDIR !");
        } else {
            System.out.println(sayi + " sayısı ASAL değildir !");
        }

        System.out.println("\\nProgram Tasarımı: Enes Öztürk");
        scanner.close();
    }
}
`;

export const PRESET_SCENARIOS = [
  { number: 22, expectedResult: false, note: 'Senaryo 1: Çift sayı (2 * 11) - ASAL DEĞİLDİR' },
  { number: 2, expectedResult: true, note: 'Senaryo 2: En küçük ve tek çift asal sayı - ASALDIR' },
  { number: 39, expectedResult: false, note: 'Senaryo 3: 3 ve 13 ile bölünebilir (3 * 13) - ASAL DEĞİLDİR' },
  { number: 17, expectedResult: true, note: 'Senaryo 4: Yalnızca 1 ve 17 böleni vardır - ASALDIR' },
  { number: 1, expectedResult: false, note: 'Ek Test: 1 asal sayı kabul edilmez' },
  { number: 97, expectedResult: true, note: 'Ek Test: İki basamaklı en büyük asal sayı' },
];
