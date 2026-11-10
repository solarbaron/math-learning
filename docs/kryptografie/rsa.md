# RSA

Nejstarší široce používaná **asymetrická** šifra (Rivest, Shamir, Adleman, 1977). Má dva klíče:
**veřejný** $V_k$, kterým kdokoli šifruje, a **soukromý** $S_k$, kterým jen majitel dešifruje.
Stojí na tom, že vynásobit dvě velká prvočísla je snadné, ale **rozložit součin zpět je prakticky nemožné**.
{ .lead }

## Vytvoření klíčů

1. Vygeneruj dvě velká prvočísla $r$ a $s$ (k tomu jsou [testy prvočíselnosti](testy-prvociselnosti.md)).
2. **Modul** $n = r \cdot s$.
3. [Eulerova funkce](eulerova-funkce.md) z modulu: $\varphi(n) = (r - 1)(s - 1)$.
4. Zvol jeden klíč, např. soukromý $S_k$, tak aby $\mathrm{GCD}(S_k, \varphi(n)) = 1$.
5. Druhý klíč je jeho [inverze](inverzni-prvek.md) modulo $\varphi(n)$:
   $$V_k = S_k^{-1} \bmod \varphi(n)$$

## Šifrování a dešifrování

$$\text{šifrování: } c = m^{V_k} \bmod n \qquad\qquad \text{dešifrování: } m = c^{S_k} \bmod n$$

Zpráva $m$ je číslo menší než $n$ (text se nejdřív převede na čísla).

<div class="rsa" data-r="11" data-s="13" data-sk="7" data-m="28"></div>

| Sdílí se (veřejné) | Nesmí se nikde sdílet |
|---|---|
| veřejný klíč $V_k$, modul $n$ | soukromý klíč $S_k$, $\varphi(n)$, prvočísla $r$, $s$ |

!!! example "Příklad ze cvičení"
    1. $r = 11$, $s = 13$
    2. $n = 11 \cdot 13 = 143$
    3. $\varphi(143) = 10 \cdot 12 = 120$
    4. $S_k = 7$, $\mathrm{GCD}(7, 120) = 1$ ✓
    5. $V_k = 7^{-1} \bmod 120 = 103$, dvěma způsoby:
        - [Eulerem](fermatova-a-eulerova-veta.md#inverzni-prvek-pres-eulerovu-vetu): $7^{\varphi(120) - 1} \bmod 120 = 7^{31} \bmod 120 = 103$
        - [Eukleidem](rozsireny-eukleiduv-algoritmus.md): $120 = 17 \cdot 7 + 1$, takže $-17 \cdot 7 + 1 \cdot 120 = 1$ a $-17 \bmod 120 = 103$

    Šifrování zprávy $m = 28$: $\ c = 28^{103} \bmod 143 = 128$

    Dešifrování: $\ m = 128^{7} \bmod 143 = 28$ ✓

## Proč to funguje

$S_k \cdot V_k \equiv 1 \pmod{\varphi(n)}$, tedy $S_k V_k = 1 + t \cdot \varphi(n)$. Podle [Eulerovy věty](fermatova-a-eulerova-veta.md):

$$c^{S_k} = m^{V_k S_k} = m^{1 + t\varphi(n)} = m \cdot \left(m^{\varphi(n)}\right)^t \equiv m \cdot 1^t = m \pmod n$$

## Proč je to bezpečné

Útočník zná $n$ a $V_k$. Aby spočítal $S_k$, potřebuje $\varphi(n) = (r-1)(s-1)$, a na to musí $n$ **rozložit** na $r \cdot s$.
Pro $n$ s 2048 bity (617 číslic) to žádný známý algoritmus nezvládne v rozumném čase. Minimální doporučená délka
modulu je proto **2048 bitů**.

RSA je pomalé, proto se jím v praxi šifrují hlavně **klíče** pro rychlou symetrickou šifru a dělají **podpisy**,
viz [Symetrické a asymetrické šifry](symetricka-a-asymetricka.md). Dešifrování se zrychluje pomocí
[čínské věty o zbytcích](cinska-veta-o-zbytcich.md): počítá se zvlášť modulo $r$ a modulo $s$.

??? question "Cvičení: zašifruj 59 a dešifruj 256 ($S_k = 7$, $V_k = 103$, $n = 143$)"
    - Šifrování: $59^{103} \bmod 143 = \mathbf{97}$ (zkouška: $97^7 \bmod 143 = 59$ ✓)
    - Dešifrování: $256^{7} \bmod 143 = \mathbf{9}$.

      Pozor: $256 > n = 143$, takže to nemůže být platný kryptogram. Výpočet funguje, protože $256 \equiv 113 \pmod{143}$
      a $113^7 \bmod 143 = 9$. Zpětně $9^{103} \bmod 143 = 113$, ne 256.

    Spočítej ve widgetu [Square and Multiply](modularni-mocneni.md#metoda-2-square-and-multiply).
