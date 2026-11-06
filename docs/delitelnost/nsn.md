# Nejmenší společný násobek

**Nejmenší společný násobek** čísel $a$, $b$ je nejmenší kladné číslo, které je násobkem obou.
Značí se $n(a, b)$, $\operatorname{nsn}(a, b)$ nebo anglicky $\operatorname{lcm}(a, b)$.
{ .lead }

!!! definice "Definice"
    $$n(a, b) = \min\,(\mathcal{N}_a \cap \mathcal{N}_b)$$

    Tedy nejmenší prvek [průniku](../mnoziny/prunik.md) množin [násobků](delitel-a-nasobek.md#delitele-a-nasobky-jako-mnoziny).

!!! example "Příklad"
    $n(4, 6) = 12$, protože $4 \mid 12$, $6 \mid 12$ a žádné menší kladné číslo není násobkem obou.

## Tři způsoby výpočtu

### 1. Výpis násobků

Vypisuj násobky obou čísel, dokud nenajdeš první společný.

!!! example "Příklad: $n(4, 6)$"
    $\mathcal{N}_4 = \{4, 8, \mathbf{12}, 16, 20, \mathbf{24}, \dots\}$<br>
    $\mathcal{N}_6 = \{6, \mathbf{12}, 18, \mathbf{24}, 30, \dots\}$<br>
    první společný: $n(4, 6) = 12$

Představ si dvě žáby, které skáčou po číselné ose od nuly — jedna po $4$, druhá po $6$.
Poprvé se potkají v nsn, a pak už pravidelně v jeho násobcích:

<div class="multiples" data-a="4" data-b="6" data-c=""></div>

Zkus vyplnit i $c$ — třetí žába.

Výpis je rychlý, když je jedno číslo malé. Stačí procházet násobky **většího** čísla a zkoušet, jestli je dělí to menší:
$n(6, 8)$: $8$ ✗, $16$ ✗, $24$ ✓ → $24$.

### 2. Prvočíselný rozklad

[Rozlož](prvocisla.md#prvociselny-rozklad) obě čísla a vezmi **všechny** prvočinitele, které se vyskytnou —
každé prvočíslo v **největší** mocnině.

!!! example "Příklad: $n(60, 72)$"
    $$
    \begin{aligned}
    60 &= 2^2 \cdot 3 \cdot 5 \\
    72 &= 2^3 \cdot 3^2 \\
    n(60, 72) &= 2^3 \cdot 3^2 \cdot 5 = 360
    \end{aligned}
    $$

    Dvojka: $\max(2, 3) = 3$. Trojka: $\max(1, 2) = 2$. Pětka: $\max(1, 0) = 1$.

Ve Vennově diagramu prvočinitelů je nsn součin **všeho** (sjednocení) — prostředek se počítá jen jednou:

<div class="numvenn" data-mode="factors" data-a="60" data-b="72" data-show="lcm"></div>

Srovnej s [NSD](nsd.md#2-prvociselny-rozklad), kde se bere jen prostředek.

### 3. Vzorec přes NSD

!!! veta "Věta"
    $$n(a, b) = \frac{a \cdot b}{D(a, b)}$$

Proč: v součinu $a \cdot b$ jsou společní prvočinitelé (prostředek diagramu) **dvakrát**. Vydělením NSD se jich jednou zbavíme.

!!! example "Příklad"
    $n(60, 72) = \dfrac{60 \cdot 72}{12} = \dfrac{4320}{12} = 360$

    Výhodné, když NSD znáš (nebo ho rychle spočítáš [Eukleidovým algoritmem](eukleiduv-algoritmus.md)).
    Šikovnější je dělit dřív než násobit: $\dfrac{60}{12} \cdot 72 = 5 \cdot 72 = 360$.

## Speciální případy

| Situace | nsn | Příklad |
|---|---|---|
| $a \mid b$ | $n(a, b) = b$ | $n(6, 24) = 24$ |
| nesoudělná, $D(a, b) = 1$ | $n(a, b) = a \cdot b$ | $n(8, 15) = 120$ |
| obecně | $\max(a, b) \le n(a, b) \le a \cdot b$ | $n(4, 6) = 12 \le 24$ |

!!! warning "Častá chyba"
    $n(a, b)$ **není** vždy $a \cdot b$. $4 \cdot 6 = 24$ je společný násobek, ale ne nejmenší — tím je $12$.

## Společný jmenovatel

Při sčítání zlomků je nejmenší společný jmenovatel právě nsn jmenovatelů:

!!! example "Příklad"
    $$\frac{5}{12} + \frac{7}{18} = \frac{15}{36} + \frac{14}{36} = \frac{29}{36} \qquad \text{protože } n(12, 18) = 36$$

    Rozšiřujeme: $36 : 12 = 3$, $36 : 18 = 2$. Se jmenovatelem $12 \cdot 18 = 216$ by to šlo taky, jen bychom museli na konci krátit.

## Více čísel

$n(a, b, c) = n(n(a, b), c)$, nebo rozkladem všech najednou (každé prvočíslo v největší mocnině).

!!! example "Příklad: $n(4, 6, 10)$"
    $4 = 2^2$, $6 = 2 \cdot 3$, $10 = 2 \cdot 5$ → $n = 2^2 \cdot 3 \cdot 5 = 60$

    Postupně: $n(4, 6) = 12$, $n(12, 10) = 60$ ✓

!!! warning "Pro tři čísla vzorec neplatí"
    $n(a, b, c) \neq \dfrac{abc}{D(a, b, c)}$. Např. $n(2, 2, 2) = 2$, ale $\frac{8}{2} = 4$. Počítej postupně po dvojicích.

Typické použití ve slovních úlohách: *„kdy se znovu potkají"*, *„nejmenší počet, který jde rozdělit…"* — viz [Slovní úlohy](slovni-ulohy.md).

## Cvičení

??? question "$n(6, 9)$"
    $6 = 2 \cdot 3$, $9 = 3^2$ → $n = 2 \cdot 3^2 = 18$

??? question "$n(12, 16)$"
    $12 = 2^2 \cdot 3$, $16 = 2^4$ → $n = 2^4 \cdot 3 = 48$

??? question "$n(14, 15)$"
    Nesoudělná → $n = 14 \cdot 15 = 210$

??? question "$n(18, 24, 30)$"
    $18 = 2 \cdot 3^2$, $24 = 2^3 \cdot 3$, $30 = 2 \cdot 3 \cdot 5$ → $n = 2^3 \cdot 3^2 \cdot 5 = 360$

??? question "Sečti $\frac{3}{8} + \frac{5}{12} + \frac{1}{6}$"
    $n(8, 12, 6) = 24$: $\frac{9}{24} + \frac{10}{24} + \frac{4}{24} = \frac{23}{24}$

??? question "$D(a, b) = 6$ a $n(a, b) = 90$, $a = 18$. Kolik je $b$?"
    $a \cdot b = D \cdot n = 540$ → $b = 540 : 18 = 30$. Kontrola: $D(18, 30) = 6$, $n(18, 30) = 90$ ✓
