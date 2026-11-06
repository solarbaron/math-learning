# Největší společný dělitel

**Největší společný dělitel** čísel $a$, $b$ je největší číslo, které dělí obě beze zbytku.
Značí se $D(a, b)$, $\operatorname{NSD}(a, b)$ nebo anglicky $\gcd(a, b)$.
{ .lead }

!!! definice "Definice"
    $$D(a, b) = \max\,(\mathcal{D}_a \cap \mathcal{D}_b)$$

    Tedy největší prvek [průniku](../mnoziny/prunik.md) množin [dělitelů](delitel-a-nasobek.md#delitele-a-nasobky-jako-mnoziny).

!!! example "Příklad"
    $D(12, 18) = 6$, protože $6 \mid 12$, $6 \mid 18$ a žádné větší číslo obě nedělí.

## Tři způsoby výpočtu

### 1. Výpis dělitelů

Vypiš dělitele obou čísel, najdi společné a vyber největší. Dobré pro malá čísla.

!!! example "Příklad: $D(12, 18)$"
    $\mathcal{D}_{12} = \{1, 2, 3, 4, 6, 12\}$<br>
    $\mathcal{D}_{18} = \{1, 2, 3, 6, 9, 18\}$<br>
    společní: $\{1, 2, 3, 6\}$ → $D(12, 18) = 6$

<div class="numvenn" data-mode="divisors" data-a="12" data-b="18"></div>

Všimni si: všichni společní dělitelé ($1, 2, 3, 6$) jsou zároveň dělitelé NSD ($6$). To platí vždy.

### 2. Prvočíselný rozklad

[Rozlož](prvocisla.md#prvociselny-rozklad) obě čísla na prvočinitele a vezmi ty **společné** —
každé prvočíslo v **nejmenší** mocnině, ve které se vyskytuje.

!!! example "Příklad: $D(60, 72)$"
    $$
    \begin{aligned}
    60 &= 2^2 \cdot 3 \cdot 5 \\
    72 &= 2^3 \cdot 3^2 \\
    D(60, 72) &= 2^2 \cdot 3 = 12
    \end{aligned}
    $$

    Dvojka: $\min(2, 3) = 2$. Trojka: $\min(1, 2) = 1$. Pětka v $72$ není → nebereme.

Ve Vennově diagramu prvočinitelů je NSD součin toho, co je **uprostřed** (v průniku):

<div class="numvenn" data-mode="factors" data-a="60" data-b="72"></div>

### 3. Eukleidův algoritmus

Pro velká čísla je rozklad pracný. [Eukleidův algoritmus](eukleiduv-algoritmus.md) opakovaně nahrazuje větší číslo zbytkem po dělení:

!!! example "Příklad: $D(252, 198)$"
    $$
    \begin{aligned}
    252 &= 1 \cdot 198 + 54 \\
    198 &= 3 \cdot 54 + 36 \\
    54 &= 1 \cdot 36 + \mathbf{18} \\
    36 &= 2 \cdot 18 + 0
    \end{aligned}
    $$

    Poslední nenulový zbytek: $D(252, 198) = 18$.

## Nesoudělná čísla

Když $D(a, b) = 1$, jsou čísla **nesoudělná** — nemají společného prvočinitele.

!!! example "Příklady"
    - $D(8, 15) = 1$, protože $8 = 2^3$ a $15 = 3 \cdot 5$ nemají nic společného. Přitom ani jedno není prvočíslo!
    - $D(14, 21) = 7$, tedy soudělná
    - dvě různá prvočísla jsou vždy nesoudělná
    - dvě po sobě jdoucí čísla ($n$, $n + 1$) jsou vždy nesoudělná

## Krácení zlomků

Zlomek je v **základním tvaru**, když jsou čitatel a jmenovatel nesoudělné. Dostaneš ho vydělením obou NSD:

!!! example "Příklad"
    $$\frac{48}{60} = \frac{48 : 12}{60 : 12} = \frac{4}{5} \qquad \text{protože } D(48, 60) = 12$$

    Postupné krácení ($\frac{48}{60} = \frac{24}{30} = \frac{12}{15} = \frac{4}{5}$) dá totéž, jen na víc kroků.

## Vlastnosti

| | |
|---|---|
| $D(a, b) = D(b, a)$ | nezáleží na pořadí |
| $D(a, a) = a$, $D(a, 1) = 1$ | |
| $a \mid b \Rightarrow D(a, b) = a$ | např. $D(6, 24) = 6$ |
| $D(a, b) = D(a, b - a)$ | základ [Eukleidova algoritmu](eukleiduv-algoritmus.md) |
| $D(ka, kb) = k \cdot D(a, b)$ | $D(60, 90) = 30 \cdot D(2, 3) = 30$ |
| $D(a, b) \cdot n(a, b) = a \cdot b$ | souvislost s [nsn](nsn.md#3-vzorec-pres-nsd) |

## Více čísel

$D(a, b, c) = D(D(a, b), c)$ — počítá se postupně, nebo rozkladem všech najednou.

!!! example "Příklad: $D(24, 36, 60)$"
    $24 = 2^3 \cdot 3$, $36 = 2^2 \cdot 3^2$, $60 = 2^2 \cdot 3 \cdot 5$ → $D = 2^2 \cdot 3 = 12$.

    Postupně: $D(24, 36) = 12$, $D(12, 60) = 12$ ✓

Typické použití ve slovních úlohách: *„rozdělit na co největší stejné části"* — viz [Slovní úlohy](slovni-ulohy.md).

## Cvičení

??? question "$D(16, 24)$"
    $16 = 2^4$, $24 = 2^3 \cdot 3$ → $D = 2^3 = 8$

??? question "$D(45, 75)$"
    $45 = 3^2 \cdot 5$, $75 = 3 \cdot 5^2$ → $D = 3 \cdot 5 = 15$

??? question "$D(35, 64)$"
    $35 = 5 \cdot 7$, $64 = 2^6$ → nemají nic společného, $D = 1$ (nesoudělná)

??? question "$D(84, 126, 210)$"
    $84 = 2^2 \cdot 3 \cdot 7$, $126 = 2 \cdot 3^2 \cdot 7$, $210 = 2 \cdot 3 \cdot 5 \cdot 7$ → $D = 2 \cdot 3 \cdot 7 = 42$

??? question "Zkrať na základní tvar $\frac{126}{168}$"
    $D(126, 168) = 42$ → $\frac{126}{168} = \frac{3}{4}$

??? question "$D(1071, 462)$ Eukleidovým algoritmem"
    $1071 = 2 \cdot 462 + 147$, $462 = 3 \cdot 147 + 21$, $147 = 7 \cdot 21 + 0$ → $D = 21$
