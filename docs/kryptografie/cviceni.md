# Cvičení

Všechny samostatné úlohy ze cvičení na jednom místě. Řešení je schované, klikni na úlohu.
Podrobný postup je vždy na odkázané stránce, kde si výpočet můžeš ověřit i ve widgetu.
{ .lead }

## Jednoduché šifry

??? question "Atbash: zašifruj KOMUNIKACE, dešifruj PIBKGLTIZURV"
    **PLNFMRPZXV**, **KRYPTOGRAFIE**. Viz [Atbash](atbash.md).

??? question "Caesar: zašifruj KRYPTOGRAFIE s posunem 5 (a 21)"
    $k = 5$: **PWDUYTLWFKNJ**, $k = 21$: **FMTKOJBMVADZ**. Viz [Caesarova šifra](caesarova-sifra.md).

??? question "Vigenère: zašifruj HESLO s posuny 2, 5, 3, 4, 1 (a KRYPTOGRAFIE s 5, 3, 1)"
    **JJVPP**, **PUZUWPLUBKLF**. Viz [Vigenèrova šifra](vigenerova-sifra.md).

??? question "Vernam: zašifruj LES heslem CBA"
    L ⊕ C = `01001100` ⊕ `01000011` = `00001111` (15), E ⊕ B = `00000111` (7), S ⊕ A = `00010010` (18).
    Kryptogram **15, 7, 18**. Viz [Vernamova šifra](vernamova-sifra.md).

??? question "Frekvenční analýza: urči posun a dešifruj IPIQIRXC IBXVIQRI …"
    Nejčastější je I (22×) ⇒ I = E ⇒ posun **4**.
    ELEMENTY EXTREMNE BEZPECNE SIFRY MUSEJI BYT SKVELE NAVRZENY. K DESIFROVANI JE POTREBA TAJNY KLIC.
    DALE BY MELY BYT ODOLNE VUCI FREKVENCNI ANALYZE. Viz [Frekvenční analýza](frekvencni-analyza.md).

## Úvod do teorie čísel

??? question "Kanonický rozklad čísla 5864"
    $5864 = 2 \cdot 2932 = 2^2 \cdot 1466 = 2^3 \cdot 733$, a 733 je prvočíslo ⇒ $\mathbf{5864 = 2^3 \cdot 733}$.
    Viz [Prvočísla](../delitelnost/prvocisla.md).

??? question "GCD(72, 48, 54)"
    $72 = 2^3 \cdot 3^2$, $48 = 2^4 \cdot 3$, $54 = 2 \cdot 3^3$. Společná prvočísla s nejmenší mocninou: $2^1 \cdot 3^1 = \mathbf{6}$.
    Viz [NSD](../delitelnost/nsd.md).

??? question "GCD a LCM pro (300, 18)"
    $300 = 2^2 \cdot 3 \cdot 5^2$, $18 = 2 \cdot 3^2$.

    - GCD: společná, menší mocnina: $2 \cdot 3 = \mathbf{6}$
    - LCM: všechna, větší mocnina: $2^2 \cdot 3^2 \cdot 5^2 = \mathbf{900}$

    Zkouška: $6 \cdot 900 = 5400 = 300 \cdot 18$ ✓. Viz [NSN](../delitelnost/nsn.md).

??? question "φ(66), φ(13), φ(91)"
    **20**, **12**, **72**. Viz [Eulerova funkce](eulerova-funkce.md).

??? question "WolframAlpha: rozklad 23023, prvočíselnost 338327950288419716939, GCD a LCM (2024, 4026), φ(1210)"
    | Dotaz | Výsledek |
    |---|---|
    | `factor 23023` | $7 \cdot 11 \cdot 13 \cdot 23$ |
    | `PrimeQ[338327950288419716939]` | True (je prvočíslo) |
    | `GCD[2024, 4026]` | 22 |
    | `LCM[2024, 4026]` | 370 392 |
    | `EulerPhi[1210]` | 440 |

## Základní algoritmy (modulo)

??? question "$6 \cdot 4 \bmod 5$, $5 \cdot 2 \bmod 7$, $10 + 2 \bmod 3$, $8 + 10 \bmod 7$"
    **4**, **3**, **0**, **4**. Viz [Modulární aritmetika](modularni-aritmetika.md).

??? question "$-10 \bmod 3$, $-9 \bmod 2$, $-13 \bmod 8$, $-17 \bmod 11$"
    **2**, **1**, **3**, **5**. Viz [Záporné číslo](modularni-aritmetika.md#zaporne-cislo).

??? question "Platí $5 \equiv 15$ (mod 5), $17 \equiv 1$ (mod 16), $50 \equiv 11$ (mod 10), $15 \equiv 13$ (mod 20)?"
    ano, ano, ne, ne. Viz [Kongruence](kongruence.md).

??? question "Rozkladem: $22^9 \bmod 135$, $66^8 \bmod 92$"
    **82**, **52**. Viz [Modulární mocnění](modularni-mocneni.md).

??? question "Square and Multiply: $5^6 \bmod 13$, $5^{20} \bmod 7$, $5^{21} \bmod 7$"
    **12**, **4**, **6**. Viz [Square and Multiply](modularni-mocneni.md#metoda-2-square-and-multiply).

??? question "Inverze: $5^{-1} \bmod 6$, $3^{-1} \bmod 9$, $6^{-1} \bmod 7$"
    **5**, **neexistuje** (GCD = 3), **6**. Viz [Inverzní prvek](inverzni-prvek.md).

## Prvočísla

??? question "Fermatův test: je 127 prvočíslo?"
    $2^{126} \bmod 127 = 1$, $3^{126} \bmod 127 = 1$ ⇒ pravděpodobně ano. Viz [Fermatův test](fermatuv-test.md).

??? question "Miller-Rabinův test: jsou 21 a 127 prvočísla?"
    21: $a = 2$, $2^5 \equiv 11$, $11^2 \equiv 16$, ani jednou 20 ⇒ **složené**.
    127: $2^{63} \equiv 1$ ⇒ projde, **pravděpodobně prvočíslo**. Viz [Miller-Rabinův test](miller-rabinuv-test.md).

??? question "Lucas-Lehmerův test: jsou 127 a 2047 Mersennova prvočísla?"
    127: $u_5 = 0$ ⇒ **ano**. 2047: $u_9 = 1736$ ⇒ **ne** ($23 \cdot 89$). Viz [Lucas-Lehmerův test](lucas-lehmeruv-test.md).

??? question "WolframAlpha: náhodná čísla a test"
    `RandomInteger[{a, b}]` náhodné celé číslo z $\langle a; b \rangle$, `RandomPrime[{a, b}]` náhodné prvočíslo, `PrimeQ[n]` test prvočíselnosti.

## Modulární aritmetika

??? question "Fermat: $3^{201} \bmod 11$, $46^{158673} \bmod 11$"
    **3**, **8**. Viz [Malá Fermatova věta](fermatova-a-eulerova-veta.md).

??? question "Euler: $52^{158670} \bmod 5$, $28^{1202} \bmod 13$"
    **4**, **4**. Viz [Eulerova věta](fermatova-a-eulerova-veta.md#eulerova-veta).

??? question "Euler: $4^{-1} \bmod 11$"
    $4^{\varphi(11) - 1} = 4^9 \bmod 11 = \mathbf{3}$. Viz [Inverze přes Eulerovu větu](fermatova-a-eulerova-veta.md#inverzni-prvek-pres-eulerovu-vetu).

??? question "Čínská věta: $x \equiv 2$ (mod 4), $x \equiv 3$ (mod 8)"
    Moduly nejsou nesoudělné, věta nejde použít, a soustava **nemá řešení** (liché vs. sudé). Viz [Čínská věta o zbytcích](cinska-veta-o-zbytcich.md).

??? question "Čínská věta: $x \equiv 2$ (mod 3), $x \equiv 3$ (mod 5), $x \equiv 2$ (mod 7)"
    $x = \mathbf{23}$ (mod 105). Viz [Čínská věta o zbytcích](cinska-veta-o-zbytcich.md).

## Eukleides, generátory, RSA

??? question "GCD(71, 19), GCD(864, 126)"
    **1**, **18**. Viz [Rozšířený Eukleidův algoritmus](rozsireny-eukleiduv-algoritmus.md).

??? question "Rozšířeným Eukleidem: $13^{-1} \bmod 120$, $5^{-1} \bmod 11$"
    **37**, **9**. Viz [Rozšířený Eukleidův algoritmus](rozsireny-eukleiduv-algoritmus.md).

??? question "Počet a hodnoty generátorů $\mathbb{Z}_7^*$"
    $\varphi(\varphi(7)) = \varphi(6) = 2$ generátory: **3 a 5**. Viz [Generátory](generatory.md).

??? question "RSA: zašifruj 59 a dešifruj 256 ($S_k = 7$, $V_k = 103$, $n = 143$)"
    $59^{103} \bmod 143 = \mathbf{97}$, $256^7 \bmod 143 = \mathbf{9}$ (pozor, $256 > n$). Viz [RSA](rsa.md).

## Diffie-Hellman, MitM, DSA

??? question "DH: $n = 23$, $g = 2$, $a = 5$, $b = 9$"
    $2^{11} \bmod 23 = 1$ ✓; $A = 9$, $B = 6$, $K = \mathbf{2}$. Viz [Diffie-Hellman](diffie-hellman.md).

??? question "MitM: $n = 23$, $g = 6$, $a = 6$, $b = 9$, $c = 7$"
    $A = 12$, $B = 16$, $C = 3$; $K_1 = \mathbf{16}$, $K_2 = \mathbf{18}$. Viz [Útok muž uprostřed](utok-muz-uprostred.md).

??? question "DSA: $n = 23$, $q = 11$, $g = 4$, $S_k = 9$, $k = 4$, $H(m) = 4$"
    $V_k = 13$, $r = 3$, $s = 5$, $w = 9$, $u_1 = 3$, $u_2 = 5$, $v = 3$ ⇒ $r = v$, podpis platí. Viz [DSA](dsa.md).
