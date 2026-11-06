# Sarrusovo pravidlo

Rychlý způsob, jak spočítat [determinant](determinant.md) matice $3 \times 3$: opíšeš první dva sloupce vedle matice
a sečteš součiny na diagonálách.
{ .lead }

!!! warning "Jen pro 3 × 3"
    Pro matice $4 \times 4$ a větší Sarrusovo pravidlo **neplatí**! Tam použij [Laplaceův rozvoj](laplaceuv-rozvoj.md)
    nebo [úpravy](determinant-upravami.md).

## Postup

1. Za matici opiš znovu její **první dva sloupce**.
2. Vynásob trojice na třech **hlavních** diagonálách (↘) a sečti je.
3. Vynásob trojice na třech **vedlejších** diagonálách (↙) a sečti je.
4. $\det A = (\text{součet hlavních}) - (\text{součet vedlejších})$.

$$
\det\begin{pmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{pmatrix}
= a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}
$$

Najeď myší na součin nebo diagonálu. Čísla v matici můžeš přepsat:

<div class="sarrus" data-m="2 1 3; 1 -1 2; 3 2 1"></div>

## Řešený příklad

!!! example "Příklad"
    $$A = \begin{pmatrix} 2 & 1 & 3 \\ 1 & -1 & 2 \\ 3 & 2 & 1 \end{pmatrix}
    \qquad\longrightarrow\qquad
    \begin{matrix} 2 & 1 & 3 & \color{gray}2 & \color{gray}1 \\ 1 & -1 & 2 & \color{gray}1 & \color{gray}{-1} \\ 3 & 2 & 1 & \color{gray}3 & \color{gray}2 \end{matrix}$$

    Hlavní diagonály: $\ 2 \cdot (-1) \cdot 1 + 1 \cdot 2 \cdot 3 + 3 \cdot 1 \cdot 2 = -2 + 6 + 6 = 10$

    Vedlejší diagonály: $\ 3 \cdot (-1) \cdot 3 + 2 \cdot 2 \cdot 2 + 1 \cdot 1 \cdot 1 = -9 + 8 + 1 = 0$

    $$\det A = 10 - 0 = 10$$

!!! tip "Na co si dát pozor"
    - Záporná čísla piš do závorek, nejvíc chyb vzniká ve znaménkách.
    - Vedlejší diagonály se **odečítají celé** — i když vyjde jejich součet záporný: $5 - (-3) = 8$.
    - Když je v matici hodně nul, bývá rychlejší [Laplaceův rozvoj](laplaceuv-rozvoj.md) podle řádku s nulami.

??? question "Cvičení: $\begin{vmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{vmatrix}$"
    $(45 + 84 + 96) - (105 + 48 + 72) = 225 - 225 = 0$. Matice je singulární — třetí řádek je $2 \cdot R_2 - R_1$.

??? question "Cvičení: $\begin{vmatrix} 3 & 0 & 2 \\ 2 & 0 & -2 \\ 0 & 1 & 1 \end{vmatrix}$"
    Hlavní: $0 + 0 + 4 = 4$. Vedlejší: $0 + (-6) + 0 = -6$. $\det = 4 - (-6) = 10$.

??? question "Cvičení: $\begin{vmatrix} 1 & -2 & 0 \\ 3 & 1 & 4 \\ -1 & 2 & 5 \end{vmatrix}$"
    Hlavní: $5 + 8 + 0 = 13$. Vedlejší: $0 + 8 + (-30) = -22$. $\det = 13 - (-22) = 35$.
