# Determinant

**Determinant** je číslo přiřazené každé čtvercové matici. Říká, kolikrát matice zvětší plochu (objem) a jestli
ji „převrátí" — a hlavně: **matice má inverzi právě tehdy, když $\det A \neq 0$**.
{ .lead }

Značí se $\det A$ nebo svislými čarami:
$\begin{vmatrix} a & b \\ c & d \end{vmatrix}$.

## Determinant 2 × 2

!!! definice "Vzorec"
    $$\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$$

    Součin na hlavní diagonále minus součin na vedlejší.

!!! example "Příklad"
    $$\begin{vmatrix} 3 & 1 \\ 1 & 2 \end{vmatrix} = 3 \cdot 2 - 1 \cdot 1 = 5 \qquad
    \begin{vmatrix} 2 & -3 \\ 4 & 1 \end{vmatrix} = 2 \cdot 1 - (-3) \cdot 4 = 14$$

## Co determinant znamená

Sloupce matice $2 \times 2$ jsou dva vektory $u$ a $v$. Determinant je **plocha rovnoběžníku**, který napínají,
se znaménkem podle orientace. Táhni za konce šipek:

<div class="det2d" data-m="3 1; 1 2"></div>

- $|\det A|$ = kolikrát se zvětší plocha (jednotkový čtverec → rovnoběžník)
- $\det A < 0$ = rovina se „převrátí" (jako zrcadlení)
- $\det A = 0$ = vektory leží na přímce, rovina se zplácne → nejde vrátit zpět → **inverze neexistuje**

U matic $3 \times 3$ je to stejné s **objemem** rovnoběžnostěnu.

## Jak spočítat větší determinant

| Velikost | Metoda |
|---|---|
| $3 \times 3$ | [Sarrusovo pravidlo](sarrusovo-pravidlo.md) |
| $n \times n$ | [Laplaceův rozvoj](laplaceuv-rozvoj.md) — rozklad na menší determinanty |
| $n \times n$ | [Úpravy na trojúhelníkový tvar](determinant-upravami.md) — nejrychlejší |

## Vlastnosti

| Vlastnost | |
|---|---|
| $\det A^T = \det A$ | co platí pro řádky, platí i pro sloupce |
| $\det(AB) = \det A \cdot \det B$ | |
| $\det A^{-1} = \dfrac{1}{\det A}$ | |
| $\det(cA) = c^n \det A$ | pro matici $n \times n$ — každý řádek se násobí $c$ |
| nulový řádek (sloupec) ⇒ $\det A = 0$ | |
| dva stejné (úměrné) řádky ⇒ $\det A = 0$ | |
| trojúhelníková matice: $\det A = a_{11} a_{22} \cdots a_{nn}$ | součin diagonály |
| prohození dvou řádků mění znaménko | viz [Determinant úpravami](determinant-upravami.md) |
| přičtení násobku jiného řádku det nemění | |

!!! veta "Věta"
    Pro čtvercovou matici $A$ jsou ekvivalentní:

    - $\det A \neq 0$
    - $A$ má [inverzní matici](inverzni-matice.md) (je **regulární**)
    - [hodnost](schodovity-tvar.md#hodnost) $A$ je $n$
    - soustava $A\mathbf{x} = \mathbf{b}$ má právě jedno řešení

!!! warning "Pozor"
    $\det(A + B) \neq \det A + \det B$ — determinant se se sčítáním nekamarádí.

??? question "Cvičení: $\begin{vmatrix} 5 & 2 \\ 7 & 3 \end{vmatrix}$"
    $15 - 14 = 1$

??? question "Cvičení: pro jaké $t$ je $\begin{pmatrix} t & 2 \\ 8 & t \end{pmatrix}$ singulární?"
    $t^2 - 16 = 0 \Rightarrow t = \pm 4$

??? question "Cvičení: $\det A = 3$ pro matici $3 \times 3$. Kolik je $\det(2A)$ a $\det A^{-1}$?"
    $\det(2A) = 2^3 \cdot 3 = 24$, $\det A^{-1} = \frac{1}{3}$.
