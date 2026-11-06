# Kartézský součin

**Kartézský součin** $A \times B$ je množina všech **uspořádaných dvojic**, kde první člen je z $A$ a druhý z $B$.
{ .lead }

## Uspořádaná dvojice

U [množin](mnozina.md) nezáleží na pořadí: $\{a, b\} = \{b, a\}$. Uspořádaná dvojice $(a, b)$ si pořadí pamatuje:

$$(a, b) = (c, d) \iff a = c \land b = d$$

Takže $(1, 2) \neq (2, 1)$ a $(1, 1)$ je legitimní dvojice.

!!! definice "Definice"

    $$A \times B = \{(a, b) ;\ a \in A \land b \in B\}$$

Představ si to jako **mřížku**: prvky $A$ na vodorovné ose, prvky $B$ na svislé, každý bod je jedna dvojice.

<div class="cartesian" data-a="1, 2, 3" data-b="x, y"></div>

## Vlastnosti

!!! veta "Věta"

    $$|A \times B| = |A| \cdot |B|$$

    Odtud název *součin*.

- **Není komutativní:** $A \times B \neq B \times A$ (pokud $A \ne B$ a obě jsou neprázdné) — dvojice mají obrácené pořadí.
- $A \times \emptyset = \emptyset$ — není z čeho vzít druhý člen.
- $A \times (B \cup C) = (A \times B) \cup (A \times C)$, totéž pro $\cap$ a $\setminus$.

## Rovina jako součin

$\mathbb{R} \times \mathbb{R} = \mathbb{R}^2$ je **rovina** — každý bod je dvojice souřadnic $(x, y)$.
Obecně $A^n = A \times A \times \dots \times A$ je množina uspořádaných $n$-tic.

Součin dvou [intervalů](intervaly.md) je obdélník: $\langle 0; 2 \rangle \times \langle 0; 1 \rangle$ je obdélník $2 \times 1$.

!!! tip "Kam dál"
    Podmnožina $A \times B$ se jmenuje **relace** — z ní se pak staví funkce, uspořádání, ekvivalence.

??? question "Cvičení: vypiš $\{0, 1\} \times \{a, b, c\}$"
    $\{(0, a), (0, b), (0, c), (1, a), (1, b), (1, c)\}$ — celkem $2 \cdot 3 = 6$ dvojic.

??? question "Cvičení: kolik prvků má $\{1, 2\}^3$?"
    $2^3 = 8$ trojic: $(1,1,1), (1,1,2), \dots, (2,2,2)$.
