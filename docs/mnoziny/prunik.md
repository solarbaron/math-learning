# Průnik

**Průnik** $A \cap B$ obsahuje jen to, co je *v obou* množinách zároveň.
{ .lead }

!!! definice "Definice"

    $$A \cap B = \{x ;\ x \in A \land x \in B\}$$

<div class="venn" data-expr="A ∩ B"></div>

!!! example "Příklad"
    $\{1, 2, 3\} \cap \{2, 3, 4\} = \{2, 3\}$

## Vlastnosti

| | |
|---|---|
| $A \cap B = B \cap A$ | komutativita |
| $(A \cap B) \cap C = A \cap (B \cap C)$ | asociativita |
| $A \cap A = A$ | idempotence |
| $A \cap \emptyset = \emptyset$ | |
| $A \cap U = A$ | $U$ je neutrální prvek (viz [Doplněk](doplnek.md)) |
| $A \cap B \subseteq A$ | průnik je menší než obě části |
| $A \subseteq B \iff A \cap B = A$ | |

## Disjunktní množiny

Množiny, které nemají žádný společný prvek, jsou **disjunktní**: $A \cap B = \emptyset$.

<div class="venn" data-layout="disjoint" data-expr="A ∩ B" data-caption="A ∩ B = ∅"></div>

Pro disjunktní množiny platí jednoduše $|A \cup B| = |A| + |B|$ (srovnej se [sjednocením](sjednoceni.md#pocet-prvku)).

!!! note "Souvislost s logikou"
    $\cap$ odpovídá spojce **a zároveň** ($\land$).

!!! example "Průnik v dělitelnosti"
    Společní dělitelé čísel $12$ a $18$ jsou průnik $\{1, 2, 3, 4, 6, 12\} \cap \{1, 2, 3, 6, 9, 18\} = \{1, 2, 3, 6\}$.
    Největší z nich je [největší společný dělitel](../delitelnost/nsd.md) $D(12, 18) = 6$.
    Podobně společné násobky vedou na [nejmenší společný násobek](../delitelnost/nsn.md).

??? question "Cvičení: najdi $\{x \in \mathbb{Z} ;\ x \text{ je sudé}\} \cap \{x \in \mathbb{Z} ;\ 3 \text{ dělí } x\}$"
    Čísla dělitelná $2$ i $3$, tedy dělitelná $6$: $\{\dots, -6, 0, 6, 12, \dots\}$.

??? question "Cvičení: jsou množiny $\{1, 2\}$ a $\{\{1\}, \{2\}\}$ disjunktní?"
    Ano. Prvky první jsou čísla, prvky druhé jsou jednoprvkové množiny — žádný společný prvek.
