# Zákony množinových operací

Pravidla, podle kterých se dají množinové výrazy upravovat — podobně jako algebraické výrazy s čísly.
{ .lead }

Každý zákon níže si můžeš ověřit [Vennovým diagramem](vennovy-diagramy.md): obě strany musí vybarvit stejné oblasti.

## Přehled

| Zákon | pro $\cup$ | pro $\cap$ |
|---|---|---|
| komutativní | $A \cup B = B \cup A$ | $A \cap B = B \cap A$ |
| asociativní | $(A \cup B) \cup C = A \cup (B \cup C)$ | $(A \cap B) \cap C = A \cap (B \cap C)$ |
| distributivní | $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ | $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ |
| idempotence | $A \cup A = A$ | $A \cap A = A$ |
| absorpce | $A \cup (A \cap B) = A$ | $A \cap (A \cup B) = A$ |
| neutrální prvek | $A \cup \emptyset = A$ | $A \cap U = A$ |
| agresivní prvek | $A \cup U = U$ | $A \cap \emptyset = \emptyset$ |
| doplněk | $A \cup A' = U$ | $A \cap A' = \emptyset$ |
| De Morgan | $(A \cup B)' = A' \cap B'$ | $(A \cap B)' = A' \cup B'$ |

Všimni si **duality**: když v libovolném zákoně prohodíš $\cup \leftrightarrow \cap$ a $\emptyset \leftrightarrow U$,
dostaneš zase platný zákon.

## De Morganovy zákony

!!! veta "Věta (De Morgan)"

    $$(A \cup B)' = A' \cap B' \qquad (A \cap B)' = A' \cup B'$$

Slovy: *doplněk sjednocení je průnik doplňků* a naopak — závorka se „rozbalí" a operace se otočí.

<div class="venn-law" data-left="(A ∪ B)'" data-right="A' ∩ B'"></div>
<div class="venn-law" data-left="(A ∩ B)'" data-right="A' ∪ B'"></div>

!!! example "Příklad z řeči"
    „Není pravda, že prší **nebo** sněží" = „neprší **a** nesněží."

### Důkaz De Morganova zákona

Ukážeme $(A \cup B)' = A' \cap B'$ metodou dvojí inkluze (viz [Rovnost množin](podmnozina.md#rovnost-mnozin)).
Ve skutečnosti všechny kroky jsou ekvivalence, takže to jde najednou:

$$
\begin{aligned}
x \in (A \cup B)'
  &\iff \lnot (x \in A \cup B) \\
  &\iff \lnot (x \in A \lor x \in B) \\
  &\iff x \notin A \land x \notin B \\
  &\iff x \in A' \land x \in B' \\
  &\iff x \in A' \cap B'
\end{aligned}
$$

Klíčový je třetí řádek — to je De Morganův zákon **logiky**: $\lnot(p \lor q) \iff \lnot p \land \lnot q$.
Množinové zákony jsou jen přeložené logické zákony.

## Distributivní zákony

Na rozdíl od čísel (kde $a \cdot (b + c) = ab + ac$, ale $a + bc \neq (a+b)(a+c)$) jsou u množin
distributivní **oba směry**:

<div class="venn-law" data-left="A ∩ (B ∪ C)" data-right="(A ∩ B) ∪ (A ∩ C)"></div>
<div class="venn-law" data-left="A ∪ (B ∩ C)" data-right="(A ∪ B) ∩ (A ∪ C)"></div>

## Užitečné odvozené vztahy

- $A \setminus B = A \cap B'$ — [rozdíl](rozdil.md) pomocí [doplňku](doplnek.md)
- $A \setminus (B \cup C) = (A \setminus B) \cap (A \setminus C)$
- $A \setminus (B \cap C) = (A \setminus B) \cup (A \setminus C)$
- $A \mathbin{\Delta} B = (A \cup B) \setminus (A \cap B)$ — [symetrická diference](symetricka-diference.md)

??? question "Cvičení: zjednoduš $(A \cap B) \cup (A \cap B')$"
    Distributivita: $A \cap (B \cup B') = A \cap U = A$.

??? question "Cvičení: zjednoduš $(A' \cup B)'$"
    De Morgan: $(A')' \cap B' = A \cap B' = A \setminus B$.
