# Operace s maticemi

Matice stejného typu se sčítají po prvcích. **Násobení matic** je ale jiné: prvek výsledku je
„řádek krát sloupec".
{ .lead }

## Sčítání a násobení číslem

Jen pro matice **stejného typu**, po prvcích:

$$
\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} + \begin{pmatrix} 5 & 0 \\ -1 & 2 \end{pmatrix} = \begin{pmatrix} 6 & 2 \\ 2 & 6 \end{pmatrix}
\qquad
3 \cdot \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} = \begin{pmatrix} 3 & 6 \\ 9 & 12 \end{pmatrix}
$$

## Násobení matic

!!! definice "Definice"
    Je-li $A$ typu $m \times n$ a $B$ typu $n \times p$, je $C = A \cdot B$ typu $m \times p$ a

    $$c_{ij} = a_{i1} b_{1j} + a_{i2} b_{2j} + \dots + a_{in} b_{nj}$$

    tedy **$i$-tý řádek $A$ krát $j$-tý sloupec $B$** (součet součinů po dvojicích).

Násobit jde jen tehdy, když **počet sloupců $A$ = počet řádků $B$** (vnitřní rozměry se shodují):
$(m \times \underline{n}) \cdot (\underline{n} \times p) = (m \times p)$.

<div class="matmul" data-a="1 2 0; -1 3 2" data-b="2 1; 0 -1; 4 3"></div>

!!! example "Příklad"
    $$
    \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \cdot \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}
    = \begin{pmatrix} 1 \cdot 5 + 2 \cdot 7 & 1 \cdot 6 + 2 \cdot 8 \\ 3 \cdot 5 + 4 \cdot 7 & 3 \cdot 6 + 4 \cdot 8 \end{pmatrix}
    = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}
    $$

## Pozor: není komutativní

$$
\begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix} \cdot \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} = \begin{pmatrix} 23 & 34 \\ 31 & 46 \end{pmatrix}
\neq \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}
$$

Obecně $AB \neq BA$ — a často jeden ze součinů ani nejde spočítat.

## Vlastnosti

| | |
|---|---|
| $(AB)C = A(BC)$ | asociativita — závorky lze vynechat |
| $A(B + C) = AB + AC$ | distributivita |
| $AE = EA = A$ | [jednotková matice](matice.md#typy-matic) je „jednička" |
| $AB \neq BA$ | obecně **ne**komutativní |
| $AB = O$ neznamená $A = O$ nebo $B = O$ | např. $\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} = O$ |

Matice $B$, pro kterou $AB = BA = E$, je [inverzní matice](inverzni-matice.md) — „převrácená hodnota" matice.

??? question "Cvičení: spočítej $\begin{pmatrix} 2 & 0 & 1 \\ 1 & 3 & -1 \end{pmatrix} \cdot \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$"
    Typ $(2 \times 3)(3 \times 1) = 2 \times 1$:
    $\begin{pmatrix} 2 + 0 + 3 \\ 1 + 6 - 3 \end{pmatrix} = \begin{pmatrix} 5 \\ 4 \end{pmatrix}$

??? question "Cvičení: jde spočítat $\begin{pmatrix} 1 & 2 \end{pmatrix} \cdot \begin{pmatrix} 3 & 4 \end{pmatrix}$?"
    Ne: $(1 \times 2) \cdot (1 \times 2)$ — vnitřní rozměry $2 \neq 1$.
    Jde ale $\begin{pmatrix} 1 & 2 \end{pmatrix} \cdot \begin{pmatrix} 3 & 4 \end{pmatrix}^T = 1 \cdot 3 + 2 \cdot 4 = 11$.
