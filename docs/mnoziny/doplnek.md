# Doplněk

**Doplněk** $A'$ obsahuje všechno z univerza $U$, co *není* v $A$.
{ .lead }

!!! definice "Definice"
    Je-li $A \subseteq U$, pak

    $$A' = U \setminus A = \{x \in U ;\ x \notin A\}$$

    Značí se také $\overline{A}$, $A^c$ nebo $A^\complement$.

<div class="venn" data-expr="A'"></div>

## Záleží na univerzu

Doplněk má smysl jen vzhledem k nějakému univerzu $U$ — množině všeho, o čem právě mluvíme.

!!! example "Příklad"
    Nechť $S$ je množina sudých čísel.

    - v $U = \mathbb{N}$: $S' = \{1, 3, 5, \dots\}$ (lichá přirozená čísla)
    - v $U = \mathbb{Z}$: $S' = \{\dots, -3, -1, 1, 3, \dots\}$
    - v $U = \mathbb{R}$: $S'$ obsahuje i $\tfrac12$, $\pi$, …

## Vlastnosti

| | |
|---|---|
| $(A')' = A$ | dvojí doplněk |
| $A \cup A' = U$ | |
| $A \cap A' = \emptyset$ | $A$ a $A'$ jsou [disjunktní](prunik.md#disjunktni-mnoziny) |
| $\emptyset' = U$, $U' = \emptyset$ | |
| $A \subseteq B \iff B' \subseteq A'$ | doplněk otáčí inkluzi |
| $(A \cup B)' = A' \cap B'$, $(A \cap B)' = A' \cup B'$ | [De Morganovy zákony](zakony.md#de-morganovy-zakony) |

!!! note "Souvislost s logikou"
    Doplněk odpovídá **negaci** ($\lnot$): $x \in A' \iff \lnot (x \in A)$.

??? question "Cvičení: v $U = \mathbb{R}$ urči doplněk [intervalu](intervaly.md) $\langle 0; 1)$"
    $(-\infty; 0) \cup \langle 1; \infty)$ — kraje se „překlopí": uzavřený konec se stane otevřeným a naopak.
