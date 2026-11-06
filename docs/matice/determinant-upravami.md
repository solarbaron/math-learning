# Determinant úpravami

Determinant [trojúhelníkové matice](matice.md#typy-matic) je součin diagonály. Stačí tedy matici převést
[Gaussovou eliminací](schodovity-tvar.md#gaussova-eliminace) na schodovitý tvar a hlídat, jak úpravy mění determinant.
Pro $4 \times 4$ a větší je to nejrychlejší metoda.
{ .lead }

## Jak úpravy mění determinant

| Úprava | Determinant |
|---|---|
| $R_i \leftrightarrow R_j$ (prohození) | **změní znaménko** |
| $R_i \leftarrow c \cdot R_i$ (vynásobení) | **vynásobí se** $c$ — proto $\det A = \frac{1}{c} \det(\text{nová})$ |
| $R_i \leftarrow R_i + c \cdot R_j$ (přičtení násobku) | **nezmění se** |

!!! tip "Vytýkání"
    Z řádku (i sloupce) lze vytknout společný činitel před determinant:
    $\begin{vmatrix} 6 & 9 \\ 1 & 2 \end{vmatrix} = 3 \begin{vmatrix} 2 & 3 \\ 1 & 2 \end{vmatrix} = 3 \cdot 1 = 3$.

!!! warning "Nejčastější chyba"
    Úprava $R_2 \leftarrow 3R_2 - 2R_1$ **není** jen přičtení násobku — řádek $R_2$ se zároveň násobí třemi, takže se determinant
    ztrojnásobí. Používej tvar $R_i \leftarrow R_i + c \cdot R_j$ (upravovaný řádek s koeficientem 1).

## Příklad 4 × 4: úplná eliminace

!!! example "Příklad"
    $$
    \begin{vmatrix} 1 & 2 & 0 & 3 \\ 2 & 1 & 1 & 0 \\ 0 & 3 & 1 & 2 \\ 1 & 0 & 2 & 1 \end{vmatrix}
    \overset{R_2 - 2R_1}{\underset{R_4 - R_1}{=}}
    \begin{vmatrix} 1 & 2 & 0 & 3 \\ 0 & -3 & 1 & -6 \\ 0 & 3 & 1 & 2 \\ 0 & -2 & 2 & -2 \end{vmatrix}
    \overset{R_3 + R_2}{\underset{R_4 - \frac23 R_2}{=}}
    \begin{vmatrix} 1 & 2 & 0 & 3 \\ 0 & -3 & 1 & -6 \\ 0 & 0 & 2 & -4 \\ 0 & 0 & \frac43 & 2 \end{vmatrix}
    \overset{R_4 - \frac23 R_3}{=}
    \begin{vmatrix} 1 & 2 & 0 & 3 \\ 0 & -3 & 1 & -6 \\ 0 & 0 & 2 & -4 \\ 0 & 0 & 0 & \frac{14}{3} \end{vmatrix}
    $$

    Jen přičítání násobků → determinant se nezměnil. Součin diagonály:

    $$\det A = 1 \cdot (-3) \cdot 2 \cdot \frac{14}{3} = -28$$

Krok po kroku (včetně sledování znaménka při prohazování řádků):

<div class="gauss" data-mode="det" data-m="1 2 0 3; 2 1 1 0; 0 3 1 2; 1 0 2 1"></div>

## Kombinace: úpravy + Laplace { #kombinace-upravy-laplace }

Zlomkům jako $\frac{14}{3}$ se dá vyhnout: úpravami vyrob nuly jen v **jednom sloupci**, pak použij
[Laplaceův rozvoj](laplaceuv-rozvoj.md) podle něj a zbylý $3 \times 3$ spočítej [Sarrusem](sarrusovo-pravidlo.md).
Tohle je v praxi nejpohodlnější postup pro $4 \times 4$ „ručně".

!!! example "Stejná matice, kombinovaně"
    $$
    \begin{vmatrix} 1 & 2 & 0 & 3 \\ 2 & 1 & 1 & 0 \\ 0 & 3 & 1 & 2 \\ 1 & 0 & 2 & 1 \end{vmatrix}
    \overset{R_2 - 2R_1}{\underset{R_4 - R_1}{=}}
    \begin{vmatrix} 1 & 2 & 0 & 3 \\ 0 & -3 & 1 & -6 \\ 0 & 3 & 1 & 2 \\ 0 & -2 & 2 & -2 \end{vmatrix}
    = 1 \cdot \begin{vmatrix} -3 & 1 & -6 \\ 3 & 1 & 2 \\ -2 & 2 & -2 \end{vmatrix}
    $$

    (rozvoj podle 1. sloupce, jediný nenulový prvek $a_{11} = 1$). Sarrus:

    - hlavní: $(-3) \cdot 1 \cdot (-2) + 1 \cdot 2 \cdot (-2) + (-6) \cdot 3 \cdot 2 = 6 - 4 - 36 = -34$
    - vedlejší: $(-6) \cdot 1 \cdot (-2) + (-3) \cdot 2 \cdot 2 + 1 \cdot 3 \cdot (-2) = 12 - 12 - 6 = -6$

    $$\det A = -34 - (-6) = -28$$

??? question "Cvičení: $\begin{vmatrix} 1 & 1 & 1 & 1 \\ 1 & 2 & 2 & 2 \\ 1 & 2 & 3 & 3 \\ 1 & 2 & 3 & 4 \end{vmatrix}$"
    $R_4 - R_3$, $R_3 - R_2$, $R_2 - R_1$ (v tomto pořadí, odspodu) dá horní trojúhelníkovou matici s jedničkami na diagonále:
    $\begin{vmatrix} 1 & 1 & 1 & 1 \\ 0 & 1 & 1 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 1 \end{vmatrix} = 1$.

??? question "Cvičení: $\begin{vmatrix} 0 & 1 & 2 \\ 1 & 0 & 3 \\ 4 & -3 & 8 \end{vmatrix}$ úpravami"
    $R_1 \leftrightarrow R_2$ (znaménko −): $-\begin{vmatrix} 1 & 0 & 3 \\ 0 & 1 & 2 \\ 4 & -3 & 8 \end{vmatrix}$,
    $R_3 - 4R_1$: $-\begin{vmatrix} 1 & 0 & 3 \\ 0 & 1 & 2 \\ 0 & -3 & -4 \end{vmatrix}$,
    $R_3 + 3R_2$: $-\begin{vmatrix} 1 & 0 & 3 \\ 0 & 1 & 2 \\ 0 & 0 & 2 \end{vmatrix} = -(1 \cdot 1 \cdot 2) = -2$.
