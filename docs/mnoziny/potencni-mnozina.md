# Potenční množina

**Potenční množina** $\mathcal{P}(A)$ je množina *všech* [podmnožin](podmnozina.md) množiny $A$.
Má $2^{|A|}$ prvků.
{ .lead }

!!! definice "Definice"

    $$\mathcal{P}(A) = \{X ;\ X \subseteq A\}$$

    Někdy se značí také $2^A$.

!!! example "Příklad"

    $$\mathcal{P}(\{a, b\}) = \{\emptyset,\ \{a\},\ \{b\},\ \{a, b\}\}$$

    Nezapomeň na $\emptyset$ a na celou množinu — obě jsou podmnožinami.

## Hasseův diagram

Podmnožiny lze uspořádat podle velikosti a spojit čarou ty, které se liší o jeden prvek.
Vznikne **Hasseův diagram** — pro tři prvky vypadá jako krychle. Zkus změnit prvky:

<div class="powerset" data-set="a, b, c"></div>

## Proč $2^n$?

!!! veta "Věta"
    Má-li $A$ celkem $n$ prvků, má $\mathcal{P}(A)$ celkem $2^n$ prvků.

U každého prvku se rozhodujeme **„beru / neberu"** — $n$ nezávislých rozhodnutí po dvou možnostech
dá $2 \cdot 2 \cdots 2 = 2^n$ podmnožin. Každá podmnožina tak odpovídá jednomu binárnímu číslu:

| $a$ | $b$ | $c$ | podmnožina |
|:-:|:-:|:-:|---|
| 0 | 0 | 0 | $\emptyset$ |
| 1 | 0 | 0 | $\{a\}$ |
| 0 | 1 | 0 | $\{b\}$ |
| 1 | 1 | 0 | $\{a, b\}$ |
| 0 | 0 | 1 | $\{c\}$ |
| 1 | 0 | 1 | $\{a, c\}$ |
| 0 | 1 | 1 | $\{b, c\}$ |
| 1 | 1 | 1 | $\{a, b, c\}$ |

Počet podmnožin s právě $k$ prvky je kombinační číslo $\binom{n}{k}$ — to jsou řádky v Hasseově diagramu
($1, 3, 3, 1$ pro $n = 3$).

??? question "Cvičení: kolik prvků má $\mathcal{P}(\emptyset)$? A $\mathcal{P}(\mathcal{P}(\emptyset))$?"
    $\mathcal{P}(\emptyset) = \{\emptyset\}$ — jeden prvek ($2^0 = 1$), viz [Prázdná množina](prazdna-mnozina.md).

    $\mathcal{P}(\{\emptyset\}) = \{\emptyset, \{\emptyset\}\}$ — dva prvky ($2^1 = 2$).

??? question "Cvičení: kolik podmnožin má množina s 10 prvky?"
    $2^{10} = 1024$.

!!! note "Souvislost s nekonečnem"
    Cantorova věta říká, že $\mathcal{P}(A)$ je vždy *větší* než $A$ — i pro nekonečné množiny.
    Viz [Mohutnost](mohutnost.md#nespocetne-mnoziny).
