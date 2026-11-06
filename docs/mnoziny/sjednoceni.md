# Sjednocení

**Sjednocení** $A \cup B$ obsahuje všechno, co je *aspoň v jedné* z množin.
{ .lead }

!!! definice "Definice"

    $$A \cup B = \{x ;\ x \in A \lor x \in B\}$$

<div class="venn" data-expr="A ∪ B"></div>

!!! example "Příklad"
    $\{1, 2, 3\} \cup \{3, 4\} = \{1, 2, 3, 4\}$ — trojka tam je jen jednou, [na opakování nezáleží](mnozina.md#tri-pravidla).

## Vlastnosti

| | |
|---|---|
| $A \cup B = B \cup A$ | komutativita |
| $(A \cup B) \cup C = A \cup (B \cup C)$ | asociativita — závorky lze vynechat |
| $A \cup A = A$ | idempotence |
| $A \cup \emptyset = A$ | $\emptyset$ je neutrální prvek |
| $A \subseteq A \cup B$ | sjednocení je větší než obě části |
| $A \subseteq B \iff A \cup B = B$ | |

Další pravidla (distributivita, De Morgan) jsou na stránce [Zákony](zakony.md).

## Počet prvků

Když sečteš $|A| + |B|$, prvky z [průniku](prunik.md) započítáš dvakrát. Proto:

!!! veta "Princip inkluze a exkluze"

    $$|A \cup B| = |A| + |B| - |A \cap B|$$

Pro tři množiny viz [Mohutnost](mohutnost.md#princip-inkluze-a-exkluze).

!!! note "Souvislost s logikou"
    $\cup$ odpovídá spojce **nebo** ($\lor$), a to *nevylučovacímu* — prvek ležící v obou množinách
    do sjednocení patří. Vylučovací „buď, anebo" odpovídá [symetrické diferenci](symetricka-diference.md).

??? question "Cvičení: $\{x \in \mathbb{N} ;\ x < 4\} \cup \{x \in \mathbb{N} ;\ 2 < x < 6\} = ?$"
    $\{1, 2, 3\} \cup \{3, 4, 5\} = \{1, 2, 3, 4, 5\}$
