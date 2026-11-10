# Eulerova funkce

$\varphi(n)$ (ve cvičeních *Phi(n)*) udává, **kolik čísel od 1 do $n$ je s $n$ nesoudělných**,
tedy nemá s $n$ žádného společného dělitele kromě 1.
Je potřeba u [Eulerovy věty](fermatova-a-eulerova-veta.md), [inverzí](inverzni-prvek.md) a [RSA](rsa.md).
{ .lead }

!!! definice "Definice"
    $$\varphi(n) = \text{počet čísel } k \in \{1, \dots, n\} \text{ s } \mathrm{GCD}(k, n) = 1$$

!!! example "Příklad: $\varphi(8)$"
    Z čísel 1 … 8 jsou s 8 nesoudělná **1, 3, 5, 7** (lichá), takže $\varphi(8) = 4$.

Oranžová políčka jsou nesoudělná s $n$. Tlačítky vyškrtej násobky jednotlivých prvočísel z rozkladu:

<div class="phi-grid" data-n="20"></div>

## Vzorce

Pro větší čísla se nepočítá ručně, ale z [rozkladu na prvočísla](../delitelnost/prvocisla.md):

| Případ | Vzorec | Příklad |
|---|---|---|
| $p$ prvočíslo | $\varphi(p) = p - 1$ | $\varphi(7) = 6$ (prvočíslo je nesoudělné se vším menším) |
| součin dvou prvočísel | $\varphi(p \cdot q) = \varphi(p) \cdot \varphi(q) = (p-1)(q-1)$ | $\varphi(15) = \varphi(3) \cdot \varphi(5) = 2 \cdot 4 = 8$ |
| mocnina prvočísla | $\varphi(p^k) = (p - 1) \cdot p^{k-1}$ | $\varphi(2^3) = 1 \cdot 2^2 = 4$ |
| obecně, $n = p_1^{k_1} p_2^{k_2} \cdots$ | $\varphi(n) = (p_1 - 1)p_1^{k_1-1} \cdot (p_2 - 1)p_2^{k_2-1} \cdots$ | |

Obecný vzorec se dá přepsat do tvaru, ve kterém stačí znát **jen prvočísla** z rozkladu (bez mocnin):

!!! veta "Obecný vzorec"
    $$\varphi(n) = n \cdot \left(1 - \frac{1}{p_1}\right) \cdot \left(1 - \frac{1}{p_2}\right) \cdots \left(1 - \frac{1}{p_k}\right)$$

    kde $p_1, \dots, p_k$ jsou **různá** prvočísla dělící $n$.

Proč: násobky $p$ tvoří přesně $\frac{1}{p}$ všech čísel, takže po jejich vyškrtnutí zbude $(1 - \frac1p)$.
Ve widgetu to je vidět: vyškrtej násobky 2, pak 5, a zbude $20 \cdot \frac12 \cdot \frac45 = 8$ čísel.

!!! example "Příklad: $\varphi(20)$"
    $20 = 2^2 \cdot 5$, prvočísla 2 a 5:

    $$\varphi(20) = 20 \cdot \left(1 - \tfrac12\right) \cdot \left(1 - \tfrac15\right) = 20 \cdot \tfrac12 \cdot \tfrac45 = 8$$

!!! example "Příklad: $\varphi(40)$"
    $40 = 2^3 \cdot 5$: $\quad \varphi(40) = 40 \cdot \frac12 \cdot \frac45 = 16$

??? question "Cvičení: $\varphi(66)$, $\varphi(13)$, $\varphi(91)$"
    - $66 = 2 \cdot 3 \cdot 11$: $\varphi = 1 \cdot 2 \cdot 10 = \mathbf{20}$
    - $13$ je prvočíslo: $\varphi = \mathbf{12}$
    - $91 = 7 \cdot 13$: $\varphi = 6 \cdot 12 = \mathbf{72}$

??? question "Cvičení: $\varphi(1210)$"
    $1210 = 2 \cdot 5 \cdot 11^2$: $\varphi = 1 \cdot 4 \cdot (10 \cdot 11) = \mathbf{440}$
