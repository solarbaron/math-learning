# Rozdíl

**Rozdíl** $A \setminus B$ („$A$ bez $B$") obsahuje prvky $A$, které *nejsou* v $B$.
{ .lead }

!!! definice "Definice"

    $$A \setminus B = \{x ;\ x \in A \land x \notin B\}$$

    Někdy se píše také $A - B$.

<div class="venn-row">
  <div class="venn" data-expr="A \ B"></div>
  <div class="venn" data-expr="B \ A"></div>
</div>

Rozdíl **není komutativní** — $A \setminus B$ a $B \setminus A$ jsou úplně jiné (dokonce [disjunktní](prunik.md#disjunktni-mnoziny)) množiny.

!!! example "Příklad"
    $\{1, 2, 3, 4\} \setminus \{3, 4, 5\} = \{1, 2\}$, ale $\{3, 4, 5\} \setminus \{1, 2, 3, 4\} = \{5\}$.

## Vlastnosti

| | |
|---|---|
| $A \setminus A = \emptyset$ | |
| $A \setminus \emptyset = A$ | |
| $\emptyset \setminus A = \emptyset$ | |
| $A \setminus B \subseteq A$ | |
| $A \setminus B = A \cap B'$ | rozdíl pomocí [doplňku](doplnek.md) |
| $A \setminus B = \emptyset \iff A \subseteq B$ | |

Rozdíl vůči univerzu je [doplněk](doplnek.md): $U \setminus A = A'$.
Oba rozdíly dohromady dávají [symetrickou diferenci](symetricka-diference.md).

??? question "Cvičení: $\mathbb{R} \setminus \mathbb{Q} = ?$"
    Reálná čísla, která nejsou racionální — **iracionální čísla** ($\sqrt{2}, \pi, e, \dots$).
    Viz [Číselné množiny](ciselne-mnoziny.md).

??? question "Cvičení: platí $(A \setminus B) \setminus C = A \setminus (B \setminus C)$?"
    **Ne.** Protipříklad: $A = B = C = \{1\}$. Vlevo $\emptyset \setminus \{1\} = \emptyset$,
    vpravo $\{1\} \setminus \emptyset = \{1\}$. Ověř si to i v [průzkumníku tří množin](vennovy-diagramy.md#tri-mnoziny).
