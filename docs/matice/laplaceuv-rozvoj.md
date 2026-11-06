# Laplaceův rozvoj

Determinant $n \times n$ převede na součet determinantů $(n-1) \times (n-1)$. Tak se dá spočítat determinant
jakékoliv velikosti — typicky $4 \times 4 \to$ čtyři (nebo méně) determinanty $3 \times 3$.
{ .lead }

## Minor a algebraický doplněk

!!! definice "Definice"
    - **Minor** $M_{ij}$ je matice, která vznikne z $A$ škrtnutím $i$-tého řádku a $j$-tého sloupce.
    - **Algebraický doplněk** prvku $a_{ij}$ je $A_{ij} = (-1)^{i+j} \det M_{ij}$.

Znaménko $(-1)^{i+j}$ tvoří šachovnici — vlevo nahoře je vždy $+$:

$$
\begin{pmatrix} + & - & + & - \\ - & + & - & + \\ + & - & + & - \\ - & + & - & + \end{pmatrix}
$$

## Vzorec

!!! veta "Laplaceův rozvoj podle $i$-tého řádku"
    $$\det A = \sum_{j=1}^{n} (-1)^{i+j}\, a_{ij} \det M_{ij} = a_{i1}A_{i1} + a_{i2}A_{i2} + \dots + a_{in}A_{in}$$

    Stejně to jde podle libovolného **sloupce**.

Každý prvek vybraného řádku: znaménko ze šachovnice × prvek × determinant toho, co zbude po škrtnutí jeho řádku a sloupce.

!!! tip "Vyber řádek (sloupec) s nejvíc nulami"
    Když je $a_{ij} = 0$, celý člen je nula a jeho minor vůbec nepočítáš. Ještě lepší je nuly nejdřív
    [vyrobit úpravami](determinant-upravami.md#kombinace-upravy-laplace).

## Příklad 3 × 3

!!! example "Rozvoj podle 1. řádku"
    $$
    \begin{vmatrix} 2 & 1 & 3 \\ 1 & -1 & 2 \\ 3 & 2 & 1 \end{vmatrix}
    = +2 \begin{vmatrix} -1 & 2 \\ 2 & 1 \end{vmatrix}
      - 1 \begin{vmatrix} 1 & 2 \\ 3 & 1 \end{vmatrix}
      + 3 \begin{vmatrix} 1 & -1 \\ 3 & 2 \end{vmatrix}
    $$

    $$= 2 \cdot (-5) - 1 \cdot (-5) + 3 \cdot 5 = -10 + 5 + 15 = 10$$

    Stejně jako [Sarrusovým pravidlem](sarrusovo-pravidlo.md#reseny-priklad).

## Příklad 4 × 4

!!! example "Rozvoj podle 1. řádku (má dvě nuly)"
    $$
    A = \begin{pmatrix} 2 & 0 & 1 & 0 \\ 1 & 3 & 2 & 1 \\ 0 & 1 & -1 & 2 \\ 3 & 2 & 0 & 1 \end{pmatrix}
    $$

    Členy s $a_{12} = 0$ a $a_{14} = 0$ odpadnou. Zbude:

    $$
    \det A = +2 \begin{vmatrix} 3 & 2 & 1 \\ 1 & -1 & 2 \\ 2 & 0 & 1 \end{vmatrix}
           + 1 \begin{vmatrix} 1 & 3 & 1 \\ 0 & 1 & 2 \\ 3 & 2 & 1 \end{vmatrix}
    $$

    (znaménko u $a_{13}$: $(-1)^{1+3} = +$). Oba $3 \times 3$ determinanty Sarrusem:

    - $\begin{vmatrix} 3 & 2 & 1 \\ 1 & -1 & 2 \\ 2 & 0 & 1 \end{vmatrix} = (-3 + 8 + 0) - (-2 + 0 + 2) = 5 - 0 = 5$
    - $\begin{vmatrix} 1 & 3 & 1 \\ 0 & 1 & 2 \\ 3 & 2 & 1 \end{vmatrix} = (1 + 18 + 0) - (3 + 4 + 0) = 19 - 7 = 12$

    $$\det A = 2 \cdot 5 + 1 \cdot 12 = 22$$

Vyber si řádek nebo sloupec, podle kterého rozvíjet. Najetím na člen se v matici škrtne jeho řádek a sloupec:

<div class="laplace" data-m="2 0 1 0; 1 3 2 1; 0 1 -1 2; 3 2 0 1"></div>

Zkus rozvoj podle jiného řádku — výsledek je vždy stejný, liší se jen množství práce.

??? question "Cvičení: $\begin{vmatrix} 1 & 0 & 2 & 0 \\ 3 & 1 & 0 & 2 \\ 0 & 0 & 1 & 0 \\ 2 & 1 & 1 & 1 \end{vmatrix}$"
    Rozvoj podle 3. řádku (jediný nenulový prvek $a_{33} = 1$, znaménko $+$):
    $\begin{vmatrix} 1 & 0 & 0 \\ 3 & 1 & 2 \\ 2 & 1 & 1 \end{vmatrix}$, a ten podle 1. řádku: $1 \cdot (1 - 2) = -1$. Celkem $\det = -1$.

??? question "Cvičení: $\begin{vmatrix} 0 & 2 & 0 & 0 \\ 1 & 4 & 3 & 5 \\ 0 & 1 & 2 & 0 \\ 0 & 3 & 1 & 1 \end{vmatrix}$"
    Podle 1. sloupce (jen $a_{21} = 1$, znaménko $(-1)^{2+1} = -$):
    $-\begin{vmatrix} 2 & 0 & 0 \\ 1 & 2 & 0 \\ 3 & 1 & 1 \end{vmatrix} = -(2 \cdot 2 \cdot 1) = -4$ (trojúhelníková matice).
