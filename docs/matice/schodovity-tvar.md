# Schodovitý tvar

Matice je ve **schodovitém tvaru**, když každý další řádek začíná víc nulami než ten nad ním — první nenulová čísla
tvoří schody. Do tohoto tvaru převede každou matici **Gaussova eliminace**.
{ .lead }

!!! definice "Definice"
    Matice je ve schodovitém tvaru, jestliže

    1. nulové řádky jsou až dole,
    2. první nenulový prvek (**pivot**) každého řádku je víc vpravo než pivot řádku nad ním.

$$
\begin{pmatrix}
\color{#ff7043}{\mathbf 1} & 2 & -1 & 3 \\
0 & \color{#ff7043}{\mathbf 1} & 3 & 2 \\
0 & 0 & \color{#ff7043}{\mathbf{-6}} & 0
\end{pmatrix}
\qquad
\begin{pmatrix}
\color{#ff7043}{\mathbf 2} & 1 & 4 & 0 \\
0 & 0 & \color{#ff7043}{\mathbf 3} & 1 \\
0 & 0 & 0 & 0
\end{pmatrix}
$$

Obě matice jsou ve schodovitém tvaru (schod smí být i „širší" než jeden sloupec, jako vpravo).

## Elementární řádkové úpravy

Tyto tři úpravy nemění řešení soustavy (ani [hodnost](#hodnost)). Píše se mezi maticemi $\sim$.

| Úprava | Zápis | Vliv na [determinant](determinant-upravami.md) |
|---|---|---|
| prohození dvou řádků | $R_1 \leftrightarrow R_2$ | změní znaménko |
| vynásobení řádku nenulovým číslem | $R_2 \leftarrow 3 R_2$ | vynásobí det tím číslem |
| přičtení násobku jiného řádku | $R_3 \leftarrow R_3 - 2 R_1$ | **nezmění** |

!!! warning "Častá chyba"
    Řádek nesmíš vynásobit nulou, a při přičítání se mění jen **jeden** řádek — ten, ke kterému přičítáš.
    $R_2 \leftarrow R_2 - 2R_1$ mění $R_2$, $R_1$ zůstává.

## Gaussova eliminace

1. Najdi první sloupec, který není celý nulový. Nahoru dej řádek s nenulovým číslem v tomto sloupci — **pivot**
   (nejlépe $\pm 1$, ušetříš zlomky).
2. Odečti vhodné násobky řádku s pivotem od řádků **pod ním**, aby pod pivotem byly nuly.
3. Řádek s pivotem „zamkni" a opakuj s maticí pod ním a vpravo.

!!! example "Příklad"
    $$
    \begin{pmatrix} 1 & 2 & -1 & 3 \\ 2 & 5 & 1 & 8 \\ -1 & 1 & 4 & 3 \end{pmatrix}
    \overset{R_2 - 2R_1}{\underset{R_3 + R_1}{\sim}}
    \begin{pmatrix} 1 & 2 & -1 & 3 \\ 0 & 1 & 3 & 2 \\ 0 & 3 & 3 & 6 \end{pmatrix}
    \overset{R_3 - 3R_2}{\sim}
    \begin{pmatrix} 1 & 2 & -1 & 3 \\ 0 & 1 & 3 & 2 \\ 0 & 0 & -6 & 0 \end{pmatrix}
    $$

    Pivot $1$ v prvním sloupci vynuluje vše pod sebou, pak pivot $1$ ve druhém sloupci.

Vyzkoušej vlastní matici — každý krok ukáže použitou úpravu, zvýrazněný řádek a pivot:

<div class="gauss" data-mode="echelon" data-m="1 2 -1 3; 2 5 1 8; -1 1 4 3"></div>

## Řešení soustavy

Matice z příkladu je [rozšířená matice](matice.md#matice-a-soustava-rovnic) soustavy
$x + 2y - z = 3$, $2x + 5y + z = 8$, $-x + y + 4z = 3$. Ze schodovitého tvaru se řeší **odspodu**:

$$
-6z = 0 \Rightarrow z = 0, \qquad
y + 3z = 2 \Rightarrow y = 2, \qquad
x + 2y - z = 3 \Rightarrow x = -1
$$

## Hodnost

!!! definice "Definice"
    **Hodnost** $h(A)$ (také $\operatorname{rank} A$) je počet nenulových řádků ve schodovitém tvaru matice $A$ — tedy počet schodů.

!!! example "Příklad: matice s hodností 2"
    $$
    \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 1 & 1 \end{pmatrix}
    \overset{R_2 - 2R_1}{\underset{R_3 - R_1}{\sim}}
    \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & -1 & -2 \end{pmatrix}
    \overset{R_2 \leftrightarrow R_3}{\sim}
    \begin{pmatrix} 1 & 2 & 3 \\ 0 & -1 & -2 \\ 0 & 0 & 0 \end{pmatrix}
    $$

    Druhý řádek byl dvojnásobek prvního — „nenesl novou informaci" a zmizel. $h(A) = 2$.

Čtvercová matice $n \times n$ s hodností $n$ je **regulární**: má nenulový [determinant](determinant.md) a [inverzi](inverzni-matice.md).
S hodností menší než $n$ je **singulární**.

## Redukovaný schodovitý tvar

Když pokračuješ dál — pivoty vydělíš na $1$ a vynuluješ i **nad** nimi — dostaneš **redukovaný** schodovitý tvar
(Gaussova–Jordanova eliminace). Z něj se řešení čte přímo. Na tom stojí výpočet [inverzní matice](inverzni-matice.md#metoda-2-gaussova-jordanova-eliminace).

<div class="gauss" data-mode="rref" data-m="1 2 -1 3; 2 5 1 8; -1 1 4 3"></div>

??? question "Cvičení: převeď na schodovitý tvar a urči hodnost $\begin{pmatrix} 1 & 3 & 2 \\ 2 & 7 & 3 \\ 3 & 10 & 5 \end{pmatrix}$"
    $R_2 - 2R_1$, $R_3 - 3R_1$: $\begin{pmatrix} 1 & 3 & 2 \\ 0 & 1 & -1 \\ 0 & 1 & -1 \end{pmatrix}$,
    $R_3 - R_2$: $\begin{pmatrix} 1 & 3 & 2 \\ 0 & 1 & -1 \\ 0 & 0 & 0 \end{pmatrix}$ → $h = 2$.
    (Třetí řádek původní matice je součet prvních dvou.)

??? question "Cvičení: vyřeš soustavu $x + y + z = 6$, $x + 2y + 3z = 14$, $2x + y + z = 7$"
    $\begin{pmatrix} 1 & 1 & 1 & 6 \\ 1 & 2 & 3 & 14 \\ 2 & 1 & 1 & 7 \end{pmatrix}
    \sim \begin{pmatrix} 1 & 1 & 1 & 6 \\ 0 & 1 & 2 & 8 \\ 0 & -1 & -1 & -5 \end{pmatrix}
    \sim \begin{pmatrix} 1 & 1 & 1 & 6 \\ 0 & 1 & 2 & 8 \\ 0 & 0 & 1 & 3 \end{pmatrix}$
    → $z = 3$, $y = 8 - 6 = 2$, $x = 6 - 2 - 3 = 1$.
