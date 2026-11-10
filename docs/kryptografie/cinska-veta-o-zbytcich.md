# Čínská věta o zbytcích

Hledá číslo $x$, které má **předepsané zbytky** po dělení několika čísly zároveň.
V kryptografii se používá obráceně: jeden výpočet s velkým modulem se rozdělí na několik menších,
což například **zrychlí dešifrování [RSA](rsa.md)**.
{ .lead }

!!! veta "Čínská věta o zbytcích"
    Soustava [kongruencí](kongruence.md)

    $$x \equiv a_1 \pmod{m_1}, \quad x \equiv a_2 \pmod{m_2}, \quad \dots, \quad x \equiv a_k \pmod{m_k}$$

    má pro **navzájem nesoudělné** moduly $m_1, \dots, m_k$ právě jedno řešení modulo $M = m_1 m_2 \cdots m_k$:

    $$x = \sum_{i=1}^{k} a_i N_i L_i \bmod M, \qquad N_i = \frac{M}{m_i}, \quad L_i = N_i^{-1} \bmod m_i$$

## Postup

1. Ověř, že moduly jsou navzájem nesoudělné ($\mathrm{GCD} = 1$ pro každou dvojici).
2. $M = m_1 \cdot m_2 \cdots m_k$
3. $N_i = M / m_i$, součin ostatních modulů.
4. $L_i = N_i^{-1} \bmod m_i$, [inverzní prvek](inverzni-prvek.md) (hrubou silou, [Eulerem](fermatova-a-eulerova-veta.md#inverzni-prvek-pres-eulerovu-vetu) nebo [Eukleidem](rozsireny-eukleiduv-algoritmus.md)).
5. $x = (a_1 N_1 L_1 + \dots + a_k N_k L_k) \bmod M$
6. Zkouška: dosaď $x$ do všech kongruencí.

Proč to funguje: člen $a_i N_i L_i$ dává modulo $m_i$ zbytek $a_i$ (protože $N_i L_i \equiv 1$), a modulo
všech ostatních $m_j$ zbytek 0 (protože $N_i$ je násobek $m_j$). Součet má tedy v každém modulu správný zbytek.

<div class="crt" data-sys="3 mod 6; 2 mod 7"></div>

Každá barevná řada teček jsou čísla, která splňují jednu kongruenci. Řešení je sloupec, kde se potkají všechny.

!!! example "Příklad: $x \equiv 3 \pmod 6$, $x \equiv 2 \pmod 7$"
    1. $\mathrm{GCD}(6, 7) = 1$ ✓
    2. $M = 6 \cdot 7 = 42$
    3. $N_1 = 42 / 6 = 7$, $\ N_2 = 42 / 7 = 6$
    4. $L_1 = 7^{-1} \bmod 6$: Eulerem $7^{\varphi(6) - 1} = 7^{1} \bmod 6 = 1$.
       $\ L_2 = 6^{-1} \bmod 7 = 6^{\varphi(7) - 1} = 6^5 \bmod 7 = 6$
    5. $x = (3 \cdot 7 \cdot 1 + 2 \cdot 6 \cdot 6) \bmod 42 = (21 + 72) \bmod 42 = 93 \bmod 42 = \mathbf{9}$
    6. Zkouška: $9 \bmod 6 = 3$ ✓, $9 \bmod 7 = 2$ ✓

!!! example "Příklad: tři kongruence"
    $x \equiv 5 \pmod 7$, $x \equiv 3 \pmod{11}$, $x \equiv 10 \pmod{13}$

    - $M = 7 \cdot 11 \cdot 13 = 1001$
    - $N_1 = 143$, $N_2 = 91$, $N_3 = 77$
    - $L_1 = 143^{-1} \bmod 7 = 5$, $L_2 = 91^{-1} \bmod 11 = 4$, $L_3 = 77^{-1} \bmod 13 = 12$
    - $x = (5 \cdot 143 \cdot 5 + 3 \cdot 91 \cdot 4 + 10 \cdot 77 \cdot 12) \bmod 1001 = (3575 + 1092 + 9240) \bmod 1001 = \mathbf{894}$
    - Zkouška: $894 \bmod 7 = 5$, $894 \bmod 11 = 3$, $894 \bmod 13 = 10$ ✓

!!! warning "Soudělné moduly"
    Když moduly nejsou nesoudělné, věta se **nedá použít**. Soustava pak buď nemá řešení, nebo jich má víc.
    Zkus ve widgetu `2 mod 4; 3 mod 8`.

??? question "Cvičení 1: $x \equiv 2 \pmod 4$, $x \equiv 3 \pmod 8$"
    $\mathrm{GCD}(4, 8) = 4 \ne 1$, takže čínská věta **nejde použít**.

    A soustava ani **nemá řešení**: z $x \equiv 3 \pmod 8$ plyne, že $x$ je liché, ale z $x \equiv 2 \pmod 4$ plyne, že je sudé.

??? question "Cvičení 2: $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$, $x \equiv 2 \pmod 7$"
    $M = 105$; $N = 35, 21, 15$; $L = 35^{-1} \bmod 3 = 2$, $21^{-1} \bmod 5 = 1$, $15^{-1} \bmod 7 = 1$.

    $x = (2 \cdot 35 \cdot 2 + 3 \cdot 21 \cdot 1 + 2 \cdot 15 \cdot 1) \bmod 105 = (140 + 63 + 30) \bmod 105 = 233 \bmod 105 = \mathbf{23}$

    Zkouška: $23 = 7 \cdot 3 + 2 = 4 \cdot 5 + 3 = 3 \cdot 7 + 2$ ✓
