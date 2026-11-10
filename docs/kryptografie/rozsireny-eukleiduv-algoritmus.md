# Rozšířený Eukleidův algoritmus

[Eukleidův algoritmus](../delitelnost/eukleiduv-algoritmus.md) najde $\mathrm{GCD}$. **Rozšířený** navíc najde čísla
$a, b$, pro která $\pm a x \pm b n = \mathrm{GCD}(x, n)$. Když je GCD rovno 1, je $\pm a$ přesně
[inverzní prvek](inverzni-prvek.md) $x^{-1} \bmod n$. Je to nejrychlejší způsob, jak inverzi spočítat.
{ .lead }

## Obyčejný Eukleidův algoritmus

$$\mathrm{GCD}(x, y) = \mathrm{GCD}(y,\ x \bmod y), \qquad \text{až } y = 0, \text{ pak } \mathrm{GCD} = x$$

!!! example "Příklad: $\mathrm{GCD}(8, 220)$"
    $\mathrm{GCD}(8, 220) = \mathrm{GCD}(8, 220 \bmod 8) = \mathrm{GCD}(8, 4) = \mathrm{GCD}(4, 8 \bmod 4) = \mathrm{GCD}(4, 0) = 4$

## Proč to dá inverzi

!!! veta "Bézoutova rovnost"
    Pro $\mathrm{GCD}(x, n) = 1$ existují celá čísla $a, b$ s

    $$\pm a\cdot x \pm b\cdot n = 1$$

    Vezmi to modulo $n$: člen $b \cdot n$ zmizí a zbude $\pm a \cdot x \equiv 1$, takže $x^{-1} \equiv \pm a \pmod n$.

## Tabulková metoda (ze cvičení)

Tabulka má sloupce **Vstup**, **Podíl** a **Y**:

1. Do sloupce Vstup napiš **větší číslo** $n$, pod něj $x$.
2. **Dolů:** vyděl předposlední číslo posledním. Zbytek napiš jako další řádek Vstupu, podíl napiš do Podílu **vedle dělitele**. Opakuj až do zbytku 0.
3. **Nahoru:** sloupec Y vyplňuj **odspodu**. U řádku s poslední jedničkou je Y = **0**, o řádek výš **1**.
   Každé další Y = (podíl z řádku pod ním) · (Y pod ním) + (Y o dva řádky níž).
4. Horní dvě Y jsou $a$ (u $n$) a $b$ (u $x$). Zapiš $\pm a x \pm b n = 1$ se znaménky tak, aby to vyšlo.
5. Koeficient u $x$ (i se znaménkem) zmoduluj $n$. To je inverze.

<div class="ext-euclid" data-x="3" data-n="20"></div>

!!! example "Příklad: $3^{-1} \bmod 20$"
    | | Vstup | Podíl | Y | |
    |---|---|---|---|---|
    | $n$ | 20 | | **7** | $6 \cdot 1 + 1$ |
    | $x$ | 3 | 6 | **1** | $1 \cdot 1 + 0$ |
    | | 2 | 1 | 1 | vždy 1 |
    | | 1 | 2 | 0 | vždy 0 |
    | | 0 | | | |

    $a = 7$, $b = 1$: $\quad +7 \cdot 3 - 1 \cdot 20 = 21 - 20 = 1$ ✓ ⇒ $3^{-1} \bmod 20 = 7$

!!! example "Příklad: $11^{-1} \bmod 125$"
    | | Vstup | Podíl | Y | |
    |---|---|---|---|---|
    | $n$ | 125 | | **34** | $11 \cdot 3 + 1$ |
    | $x$ | 11 | 11 | **3** | $2 \cdot 1 + 1$ |
    | | 4 | 2 | 1 | $1 \cdot 1 + 0$ |
    | | 3 | 1 | 1 | vždy 1 |
    | | 1 | 3 | 0 | vždy 0 |
    | | 0 | | | |

    $-34 \cdot 11 + 3 \cdot 125 = -374 + 375 = 1$ ⇒ inverze je $-34 \bmod 125 = \mathbf{91}$

    Zkouška: $11 \cdot 91 = 1001 = 8 \cdot 125 + 1$ ✓

Když na konci zbude jiné číslo než 1, je to $\mathrm{GCD}(x, n) \ne 1$ a inverze neexistuje.

??? question "Cvičení: $\mathrm{GCD}(71, 19)$, $\mathrm{GCD}(864, 126)$"
    - $71 \bmod 19 = 14$, $19 \bmod 14 = 5$, $14 \bmod 5 = 4$, $5 \bmod 4 = 1$, $4 \bmod 1 = 0$ ⇒ $\mathbf{1}$
    - $864 \bmod 126 = 108$, $126 \bmod 108 = 18$, $108 \bmod 18 = 0$ ⇒ $\mathbf{18}$

??? question "Cvičení: $13^{-1} \bmod 120$, $5^{-1} \bmod 11$"
    - $120 = 9 \cdot 13 + 3$, $13 = 4 \cdot 3 + 1$, $3 = 3 \cdot 1$. Y odspodu: 0, 1, $4 \cdot 1 + 0 = 4$, $9 \cdot 4 + 1 = 37$.
      $+37 \cdot 13 - 4 \cdot 120 = 481 - 480 = 1$ ⇒ $13^{-1} \bmod 120 = \mathbf{37}$
    - $11 = 2 \cdot 5 + 1$, $5 = 5 \cdot 1$. Y: 0, 1, $2 \cdot 1 + 0 = 2$.
      $2 \cdot 5 - 1 \cdot 11 = -1$, takže obráceně: $-2 \cdot 5 + 1 \cdot 11 = 1$ ⇒ $-2 \bmod 11 = \mathbf{9}$

    Ověř ve widgetu.
