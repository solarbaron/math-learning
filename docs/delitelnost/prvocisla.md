# Prvočísla a rozklad

**Prvočíslo** je přirozené číslo, které má právě dva dělitele: $1$ a sebe. Každé jiné číslo větší než 1 se dá
**jednoznačně** rozložit na součin prvočísel — prvočísla jsou „atomy" násobení.
{ .lead }

!!! definice "Definice"
    Přirozené číslo $p > 1$ je **prvočíslo**, jestliže jeho jediní [dělitelé](delitel-a-nasobek.md) jsou $1$ a $p$.
    Číslo $n > 1$, které prvočíslem není, je **složené**.

$$2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, \dots$$

!!! warning "Číslo 1"
    $1$ **není** prvočíslo ani složené číslo — má jen jednoho dělitele. (Kdyby bylo prvočíslo, rozklad by nebyl jednoznačný: $6 = 2 \cdot 3 = 1 \cdot 2 \cdot 3 = 1 \cdot 1 \cdot 2 \cdot 3 \dots$)

$2$ je jediné sudé prvočíslo — každé jiné sudé číslo je dělitelné dvěma.

## Eratosthenovo síto

Jak najít všechna prvočísla do 100: vezmi nejmenší neškrtnuté číslo — je to prvočíslo — a škrtni všechny jeho násobky. Opakuj.

<div class="sieve" data-n="100"></div>

Stačí škrtat násobky prvočísel do $\sqrt{100} = 10$, tj. $2, 3, 5, 7$. Každé složené číslo $\le 100$ totiž má prvočinitele $\le 10$.

## Prvočíselný rozklad

!!! veta "Základní věta aritmetiky"
    Každé přirozené číslo $n > 1$ lze zapsat jako součin prvočísel, a to **jediným způsobem** (až na pořadí činitelů).

Rozklad se hledá postupným dělením — nejčastěji od nejmenšího prvočísla:

!!! example "Příklad: rozklad 360"
    | | |
    |---:|:---|
    | $360$ | $: 2$ |
    | $180$ | $: 2$ |
    | $90$ | $: 2$ |
    | $45$ | $: 3$ |
    | $15$ | $: 3$ |
    | $5$ | $: 5$ |
    | $1$ | |

    $$360 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3 \cdot 5 = 2^3 \cdot 3^2 \cdot 5$$

Nebo jako **strom**: číslo rozdělíme na libovolné dva činitele a pokračujeme, dokud nezůstanou samá prvočísla.
Zkus *Rozlož jinak* — strom vypadá pokaždé jinak, ale prvočísla v listech jsou vždy stejná. To je ta jednoznačnost.

<div class="factor-tree" data-n="360"></div>

## K čemu je rozklad

- [NSD](nsd.md#2-prvociselny-rozklad): společní prvočinitelé v **nejmenší** mocnině
- [nsn](nsn.md#2-prvociselny-rozklad): všichni prvočinitelé v **největší** mocnině
- počet dělitelů: je-li $n = p_1^{a_1} \cdot p_2^{a_2} \cdots$, má $n$ celkem $(a_1 + 1)(a_2 + 1)\cdots$ dělitelů.
  Pro $360 = 2^3 \cdot 3^2 \cdot 5$ je to $4 \cdot 3 \cdot 2 = 24$ dělitelů.

!!! veta "Věta (Eukleides)"
    Prvočísel je nekonečně mnoho.

??? note "Důkaz"
    Kdyby jich bylo konečně mnoho, $p_1, p_2, \dots, p_k$, vezmeme $N = p_1 p_2 \cdots p_k + 1$.
    Dělením $N$ kterýmkoli $p_i$ dostaneme zbytek $1$, takže žádné $p_i$ nedělí $N$.
    Ale $N > 1$ má nějaký prvočíselný dělitel — a ten v seznamu není. Spor.

??? question "Cvičení: rozlož 84, 150 a 1001"
    - $84 = 2^2 \cdot 3 \cdot 7$
    - $150 = 2 \cdot 3 \cdot 5^2$
    - $1001 = 7 \cdot 11 \cdot 13$

??? question "Cvičení: je 91 prvočíslo?"
    Ne: $91 = 7 \cdot 13$. (Stačí zkoušet prvočísla do $\sqrt{91} \approx 9{,}5$, tj. $2, 3, 5, 7$.)

??? question "Cvičení: kolik dělitelů má 72?"
    $72 = 2^3 \cdot 3^2$, počet dělitelů $(3 + 1)(2 + 1) = 12$.
