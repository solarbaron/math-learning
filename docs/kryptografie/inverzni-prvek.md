# Inverzní prvek

V [modulární aritmetice](modularni-aritmetika.md) se nedělí. Místo dělení číslem $a$ se násobí jeho
**multiplikativní inverzí** $a^{-1}$, tedy číslem, které s $a$ dá součin 1.
{ .lead }

!!! definice "Definice"
    $a^{-1} \bmod n$ je číslo $x \in \{1, \dots, n-1\}$, pro které

    $$a \cdot x \bmod n = 1$$

    (1 je neutrální prvek násobení).

!!! veta "Kdy existuje"
    Inverze k $a$ modulo $n$ existuje, **právě když** $\mathrm{GCD}(a, n) = 1$, tedy $a$ a $n$ jsou nesoudělná.

Proč: kdyby $a$ a $n$ měla společného dělitele $d > 1$, je $a \cdot x$ i každý jeho zbytek po dělení $n$ násobkem $d$,
a 1 násobkem $d$ není.

## Násobilka modulo $n$

V řádku $a$ hledej jedničku. Její sloupec je $a^{-1}$. Řádky bez jedničky jsou čísla soudělná s $n$:

<div class="mod-table" data-n="10" data-a="3"></div>

Pro prvočíslo $n$ (zkus $n = 7$) má inverzi každé číslo kromě nuly.

## Tři způsoby výpočtu

| Metoda | Kdy | Stránka |
|---|---|---|
| **Hrubá síla**: zkoušej $a \cdot 1, a \cdot 2, \dots$ | malé $n$ | níže |
| **Eulerova věta**: $a^{-1} = a^{\varphi(n) - 1} \bmod n$ | známe $\varphi(n)$ | [Fermatova a Eulerova věta](fermatova-a-eulerova-veta.md#inverzni-prvek-pres-eulerovu-vetu) |
| **Rozšířený Eukleidův algoritmus** | vždy, nejrychlejší | [Rozšířený Eukleidův algoritmus](rozsireny-eukleiduv-algoritmus.md) |

## Hrubou silou

!!! example "Příklad: $2^{-1} \bmod 5$"
    $\mathrm{GCD}(2, 5) = 1$, inverze existuje.

    $$2 \cdot 1 \bmod 5 = 2,\quad 2 \cdot 2 \bmod 5 = 4,\quad 2 \cdot \mathbf{3} \bmod 5 = \mathbf{1}$$

    $2^{-1} \bmod 5 = 3$, a naopak $3^{-1} \bmod 5 = 2$.

!!! example "Příklad: $4^{-1} \bmod 5$"
    $4 \cdot 1 = 4,\ 4 \cdot 2 = 8 \equiv 3,\ 4 \cdot 3 = 12 \equiv 2,\ 4 \cdot 4 = 16 \equiv 1$ ⇒ $4^{-1} \bmod 5 = 4$ (je sám sobě inverzí).

!!! example "Příklad: $7^{-1} \bmod 21$"
    $\mathrm{GCD}(7, 21) = 7 \ne 1$ ⇒ inverze **neexistuje**.

??? question "Cvičení: $5^{-1} \bmod 6$, $3^{-1} \bmod 9$, $6^{-1} \bmod 7$"
    - $5 \cdot 5 = 25 = 4 \cdot 6 + 1$ ⇒ $5^{-1} \bmod 6 = \mathbf{5}$
    - $\mathrm{GCD}(3, 9) = 3$ ⇒ **neexistuje**
    - $6 \cdot 6 = 36 = 5 \cdot 7 + 1$ ⇒ $6^{-1} \bmod 7 = \mathbf{6}$

    Platí obecně: $(n-1)^{-1} \bmod n = n - 1$, protože $(n-1)^2 = n^2 - 2n + 1 \equiv 1$.
