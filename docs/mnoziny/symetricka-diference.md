# Symetrická diference

**Symetrická diference** $A \mathbin{\Delta} B$ obsahuje prvky, které jsou *právě v jedné* z množin.
{ .lead }

!!! definice "Definice"

    $$A \mathbin{\Delta} B = (A \setminus B) \cup (B \setminus A)$$

<div class="venn" data-expr="A Δ B"></div>

Ekvivalentně: sjednocení bez průniku,

$$A \mathbin{\Delta} B = (A \cup B) \setminus (A \cap B).$$

!!! example "Příklad"
    $\{1, 2, 3\} \mathbin{\Delta} \{2, 3, 4\} = \{1, 4\}$

## Vlastnosti

| | |
|---|---|
| $A \mathbin{\Delta} B = B \mathbin{\Delta} A$ | komutativita (na rozdíl od [rozdílu](rozdil.md)) |
| $(A \mathbin{\Delta} B) \mathbin{\Delta} C = A \mathbin{\Delta} (B \mathbin{\Delta} C)$ | asociativita |
| $A \mathbin{\Delta} \emptyset = A$ | |
| $A \mathbin{\Delta} A = \emptyset$ | každá množina je „sama sobě opačná" |
| $A \mathbin{\Delta} B = \emptyset \iff A = B$ | |

## Tři množiny: lichý počet

$A \mathbin{\Delta} B \mathbin{\Delta} C$ obsahuje prvky, které leží v **lichém počtu** množin (v jedné nebo ve všech třech):

<div class="venn" data-expr="A Δ B Δ C"></div>

!!! note "Souvislost s logikou a informatikou"
    $\Delta$ odpovídá **vylučovacímu nebo** („buď, anebo"), v programování operátor XOR (`^`).
    Bitová operace `a ^ b` je přesně symetrická diference množin jedničkových bitů.

??? question "Cvičení: najdi $X$, pro které $\{1, 2\} \mathbin{\Delta} X = \{2, 3\}$"
    „Přičti" $\{1, 2\}$ k oběma stranám: $X = \{1, 2\} \mathbin{\Delta} \{2, 3\} = \{1, 3\}$.
    Kontrola: $\{1, 2\} \mathbin{\Delta} \{1, 3\} = \{2, 3\}$ ✓
