# Inverzní matice

**Inverzní matice** $A^{-1}$ je „převrácená hodnota" matice: $A \cdot A^{-1} = E$. Existuje jen pro čtvercové matice
s nenulovým [determinantem](determinant.md). Počítá se dvěma způsoby: přes **adjungovanou matici**, nebo
**Gaussovou–Jordanovou eliminací** $(A \mid E) \sim (E \mid A^{-1})$.
{ .lead }

!!! definice "Definice"
    Matice $A^{-1}$ je inverzní k čtvercové matici $A$, jestliže
    $$A \cdot A^{-1} = A^{-1} \cdot A = E.$$

    $A$ je **regulární** (inverze existuje) $\iff \det A \neq 0$. Jinak je **singulární**.

## Matice 2 × 2: vzorec

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}
$$

Prohodit prvky na hlavní diagonále, změnit znaménka na vedlejší, vydělit determinantem.

!!! example "Příklad"
    $$\begin{pmatrix} 2 & 1 \\ 5 & 3 \end{pmatrix}^{-1} = \frac{1}{6 - 5} \begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix} = \begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix}$$

Tohle je ve skutečnosti metoda 1 (adjungovaná matice) pro velikost $2 \times 2$.

## Dvě metody pro 3 × 3 a větší

| | Metoda 1: adjungovaná matice | Metoda 2: Gaussova–Jordanova eliminace |
|---|---|---|
| princip | $A^{-1} = \frac{1}{\det A} \operatorname{adj} A$ | $(A \mid E) \sim \dots \sim (E \mid A^{-1})$ |
| práce pro $3 \times 3$ | 1 determinant $3 \times 3$ + 9 determinantů $2 \times 2$ | asi 6–9 řádkových úprav |
| práce pro $4 \times 4$ | 1 determinant $4 \times 4$ + 16 determinantů $3 \times 3$ 😩 | asi 12–16 úprav |
| hodí se | $2 \times 2$, $3 \times 3$, matice s parametrem | $3 \times 3$ a větší |
| singularitu pozná | hned na začátku ($\det A = 0$) | vlevo vznikne nulový řádek |

Obě metody na stejné matici dají samozřejmě stejný výsledek:

$$A = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{pmatrix}$$

---

## Metoda 1: adjungovaná matice { #metoda-1-adjungovana-matice }

!!! veta "Vzorec"
    $$A^{-1} = \frac{1}{\det A} \cdot \operatorname{adj} A, \qquad \operatorname{adj} A = \begin{pmatrix} A_{11} & A_{12} & A_{13} \\ A_{21} & A_{22} & A_{23} \\ A_{31} & A_{32} & A_{33} \end{pmatrix}^T$$

    kde $A_{ij} = (-1)^{i+j} \det M_{ij}$ jsou **algebraické doplňky** (stejné jako u [Laplaceova rozvoje](laplaceuv-rozvoj.md#minor-a-algebraicky-doplnek)).

**Postup:**

1. Spočítej $\det A$. Když je $0$, inverze neexistuje — konec.
2. Ke každému prvku spočítej algebraický doplněk: škrtni jeho řádek a sloupec, spočítej determinant zbytku, přidej znaménko podle šachovnice $\begin{smallmatrix} + & - & + \\ - & + & - \\ + & - & + \end{smallmatrix}$.
3. Matici doplňků **transponuj** → adjungovaná matice $\operatorname{adj} A$.
4. Vyděl determinantem.

!!! example "Příklad"
    **1. Determinant** (Sarrus): $\det A = (0 + 40 + 0) - (15 + 24 + 0) = 1$.

    **2. Algebraické doplňky:**

    $$
    \begin{aligned}
    A_{11} &= +\begin{vmatrix} 1 & 4 \\ 6 & 0 \end{vmatrix} = -24 &
    A_{12} &= -\begin{vmatrix} 0 & 4 \\ 5 & 0 \end{vmatrix} = 20 &
    A_{13} &= +\begin{vmatrix} 0 & 1 \\ 5 & 6 \end{vmatrix} = -5 \\
    A_{21} &= -\begin{vmatrix} 2 & 3 \\ 6 & 0 \end{vmatrix} = 18 &
    A_{22} &= +\begin{vmatrix} 1 & 3 \\ 5 & 0 \end{vmatrix} = -15 &
    A_{23} &= -\begin{vmatrix} 1 & 2 \\ 5 & 6 \end{vmatrix} = 4 \\
    A_{31} &= +\begin{vmatrix} 2 & 3 \\ 1 & 4 \end{vmatrix} = 5 &
    A_{32} &= -\begin{vmatrix} 1 & 3 \\ 0 & 4 \end{vmatrix} = -4 &
    A_{33} &= +\begin{vmatrix} 1 & 2 \\ 0 & 1 \end{vmatrix} = 1
    \end{aligned}
    $$

    **3. Transponovat** (doplňky z řádku se stanou sloupcem):

    $$\operatorname{adj} A = \begin{pmatrix} -24 & 20 & -5 \\ 18 & -15 & 4 \\ 5 & -4 & 1 \end{pmatrix}^T = \begin{pmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{pmatrix}$$

    **4. Vydělit** $\det A = 1$:

    $$A^{-1} = \begin{pmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{pmatrix}$$

!!! warning "Nejčastější chyba"
    Zapomenout **transponovat**. Doplněk $A_{12}$ patří do adjungované matice na pozici $(2, 1)$, ne $(1, 2)$.

Vyzkoušej na vlastní matici — najeď na prvek matice doplňků a uvidíš, ze kterého minoru vznikl:

<div class="adjugate" data-m="1 2 3; 0 1 4; 5 6 0"></div>

---

## Metoda 2: Gaussova–Jordanova eliminace { #metoda-2-gaussova-jordanova-eliminace }

Vedle matice $A$ napiš jednotkovou matici $E$. [Řádkovými úpravami](schodovity-tvar.md#elementarni-radkove-upravy)
změň levou polovinu na $E$ — pravá polovina se přitom upravuje stejně a promění se v $A^{-1}$:

$$(A \mid E) \;\sim\; \cdots \;\sim\; (E \mid A^{-1})$$

**Postup** (jako [Gaussova eliminace](schodovity-tvar.md#gaussova-eliminace), jen se pokračuje dál):

1. Nuly **pod** diagonálou (sloupec po sloupci, jako u schodovitého tvaru).
2. Na diagonále jedničky (vydělit řádek jeho pivotem).
3. Nuly **nad** diagonálou.

Úpravy se vždy dělají s **celými řádky** — včetně pravé poloviny.

!!! example "Příklad"
    $$
    \left(\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\ 0 & 1 & 4 & 0 & 1 & 0 \\ 5 & 6 & 0 & 0 & 0 & 1 \end{array}\right)
    \overset{R_3 - 5R_1}{\sim}
    \left(\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\ 0 & 1 & 4 & 0 & 1 & 0 \\ 0 & -4 & -15 & -5 & 0 & 1 \end{array}\right)
    $$

    $$
    \overset{R_3 + 4R_2}{\sim}
    \left(\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\ 0 & 1 & 4 & 0 & 1 & 0 \\ 0 & 0 & 1 & -5 & 4 & 1 \end{array}\right)
    $$

    Vlevo je trojúhelník s jedničkami na diagonále. Teď nuly nad diagonálou, odspodu:

    $$
    \overset{R_2 - 4R_3}{\underset{R_1 - 3R_3}{\sim}}
    \left(\begin{array}{ccc|ccc} 1 & 2 & 0 & 16 & -12 & -3 \\ 0 & 1 & 0 & 20 & -15 & -4 \\ 0 & 0 & 1 & -5 & 4 & 1 \end{array}\right)
    \overset{R_1 - 2R_2}{\sim}
    \left(\begin{array}{ccc|ccc} 1 & 0 & 0 & -24 & 18 & 5 \\ 0 & 1 & 0 & 20 & -15 & -4 \\ 0 & 0 & 1 & -5 & 4 & 1 \end{array}\right)
    $$

    $$A^{-1} = \begin{pmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{pmatrix}$$

    Stejně jako metodou 1.

Krok po kroku na libovolné matici (zkus i $4 \times 4$, nebo singulární matici `1 2; 2 4`):

<div class="gauss" data-mode="inverse" data-m="1 2 3; 0 1 4; 5 6 0"></div>

!!! tip "Proč to funguje"
    Každá řádková úprava je násobení zleva nějakou maticí. Když posloupnost úprav změní $A$ na $E$, je jejich součin
    právě $A^{-1}$. Stejné úpravy použité na $E$ tedy dají $A^{-1} \cdot E = A^{-1}$.

!!! warning "Singulární matice"
    Když se vlevo objeví nulový řádek, $E$ vyrobit nejde → $\det A = 0$ a inverze neexistuje.

---

## Zkouška

Vždy se vyplatí: $A \cdot A^{-1}$ musí dát $E$.

$$
\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{pmatrix}
\begin{pmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{pmatrix}
= \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}
$$

Stačí ověřit pár prvků: první řádek × první sloupec $= -24 + 40 - 15 = 1$ ✓.

## Vlastnosti

| | |
|---|---|
| $(A^{-1})^{-1} = A$ | |
| $(AB)^{-1} = B^{-1} A^{-1}$ | pořadí se otočí! |
| $(A^T)^{-1} = (A^{-1})^T$ | |
| $\det A^{-1} = \dfrac{1}{\det A}$ | |
| $(cA)^{-1} = \dfrac{1}{c} A^{-1}$ | |

## K čemu je

Soustava $A\mathbf{x} = \mathbf{b}$ s regulární maticí má řešení $\mathbf{x} = A^{-1}\mathbf{b}$.
Maticová rovnice $AX = B$ má řešení $X = A^{-1}B$ (násobí se **zleva** — [násobení není komutativní](operace.md#pozor-neni-komutativni)).

## Cvičení

??? question "Najdi inverzi $\begin{pmatrix} 4 & 7 \\ 2 & 6 \end{pmatrix}$"
    $\det = 24 - 14 = 10$: $\dfrac{1}{10}\begin{pmatrix} 6 & -7 \\ -2 & 4 \end{pmatrix}$

??? question "Má inverzi $\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$?"
    Ne: $\det = 4 - 4 = 0$, druhý řádek je dvojnásobek prvního.

??? question "Najdi inverzi $\begin{pmatrix} 2 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 3 & 1 \end{pmatrix}$ (oběma metodami)"
    $\det = (2 + 0 + 3) - (0 + 0 + 0) = 5$.

    $$A^{-1} = \frac{1}{5}\begin{pmatrix} 1 & 3 & -1 \\ -1 & 2 & 1 \\ 3 & -6 & 2 \end{pmatrix}$$

    Ověř si to ve widgetech výše — přepiš matici a porovnej.

??? question "Najdi inverzi $\begin{pmatrix} 1 & 0 & 2 \\ 2 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix}$"
    $\det = 5$, $A^{-1} = \dfrac{1}{5}\begin{pmatrix} 1 & 2 & -2 \\ -2 & 1 & 4 \\ 2 & -1 & 1 \end{pmatrix}$
