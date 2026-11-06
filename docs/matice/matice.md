# Matice

**Matice typu $m \times n$** je tabulka čísel s $m$ řádky a $n$ sloupci. Prvek v $i$-tém řádku a $j$-tém sloupci se značí $a_{ij}$.
{ .lead }

$$
A = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$

!!! example "Příklad"
    $$A = \begin{pmatrix} 2 & -1 & 0 \\ 4 & 3 & 5 \end{pmatrix}$$

    je typu $2 \times 3$ (2 řádky, 3 sloupce). $a_{12} = -1$, $a_{23} = 5$.

!!! tip "Pořadí indexů"
    Vždy **nejdřív řádek, potom sloupec** — stejně jako „řádky × sloupce" u typu matice.

## Typy matic

| Název | Popis | Příklad |
|---|---|---|
| čtvercová | $m = n$; jen ta má [determinant](determinant.md) a [inverzi](inverzni-matice.md) | $\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ |
| nulová $O$ | samé nuly | $\begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$ |
| jednotková $E$ (také $I$) | jedničky na diagonále, jinde nuly | $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ |
| diagonální | nenulové prvky jen na diagonále | $\begin{pmatrix} 3 & 0 \\ 0 & -2 \end{pmatrix}$ |
| horní trojúhelníková | pod diagonálou nuly | $\begin{pmatrix} 1 & 4 & 2 \\ 0 & 3 & 5 \\ 0 & 0 & 6 \end{pmatrix}$ |
| řádkový / sloupcový vektor | typ $1 \times n$ / $n \times 1$ | $(1\ 2\ 3)$, $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$ |

**Hlavní diagonála** čtvercové matice jsou prvky $a_{11}, a_{22}, \dots, a_{nn}$ (zleva nahoře doprava dolů).

## Transpozice

**Transponovaná matice** $A^T$ vznikne „překlopením podle diagonály" — řádky se stanou sloupci:

$$(A^T)_{ij} = a_{ji}$$

!!! example "Příklad"
    $$\begin{pmatrix} 2 & -1 & 0 \\ 4 & 3 & 5 \end{pmatrix}^T = \begin{pmatrix} 2 & 4 \\ -1 & 3 \\ 0 & 5 \end{pmatrix}$$

    Typ $2 \times 3$ se změní na $3 \times 2$.

Vlastnosti: $(A^T)^T = A$, $(A + B)^T = A^T + B^T$, $(AB)^T = B^T A^T$ (pořadí se otočí!).
Matice, pro kterou $A^T = A$, je **symetrická**.

## Matice a soustava rovnic

Hlavní použití: soustavu lineárních rovnic zapíšeme jen čísly, bez neznámých.

$$
\begin{aligned}
x + 2y - z &= 3 \\
2x + 5y + z &= 8 \\
-x + y + 4z &= 3
\end{aligned}
\quad\longrightarrow\quad
\left(\begin{array}{ccc|c} 1 & 2 & -1 & 3 \\ 2 & 5 & 1 & 8 \\ -1 & 1 & 4 & 3 \end{array}\right)
$$

Té vpravo se říká **rozšířená matice soustavy**. Řeší se převodem na [schodovitý tvar](schodovity-tvar.md).

Dál: [Operace s maticemi](operace.md).

??? question "Cvičení: jakého typu je $\begin{pmatrix} 1 & 0 & 2 & 7 \\ 3 & 1 & 1 & 0 \\ 0 & 5 & 2 & 1 \end{pmatrix}$ a kolik je $a_{32}$?"
    Typ $3 \times 4$, $a_{32} = 5$ (3. řádek, 2. sloupec).

??? question "Cvičení: transponuj $\begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{pmatrix}$"
    $\begin{pmatrix} 1 & 3 & 5 \\ 2 & 4 & 6 \end{pmatrix}$
