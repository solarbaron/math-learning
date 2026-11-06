# Množina

**Množina** je souhrn navzájem různých objektů, kterým říkáme **prvky**.
Na množině záleží jen na tom, *co v ní je* — ne na pořadí ani na počtu opakování.
{ .lead }

!!! definice "Definice"
    Je-li $x$ prvkem množiny $A$, píšeme

    $$x \in A \quad \text{(„x náleží do A")}.$$

    Pokud prvkem není, píšeme $x \notin A$.

<div class="figure" markdown>
<svg viewBox="0 0 360 170" role="img" aria-label="Prvek x leží v množině A, prvek y mimo">
  <rect x="6" y="6" width="348" height="158" rx="10" class="f-soft"/>
  <ellipse cx="140" cy="88" rx="95" ry="62" class="f-fill"/>
  <text x="58" y="40" class="f-name">A</text>
  <circle cx="125" cy="92" r="6" class="f-dot"/>
  <text x="137" y="97" class="f-text">x</text>
  <circle cx="300" cy="70" r="6" class="f-dot-2"/>
  <text x="312" y="75" class="f-text">y</text>
  <text x="105" y="132" class="f-small">x ∈ A</text>
  <text x="282" y="100" class="f-small">y ∉ A</text>
</svg>
</div>

## Tři pravidla

1. **Pořadí nehraje roli:** $\{1, 2, 3\} = \{3, 1, 2\}$
2. **Opakování nehraje roli:** $\{1, 1, 2\} = \{1, 2\}$ — prvek v množině buď je, nebo není.
3. **Prvkem může být cokoliv** — i jiná množina. $\{1, \{2, 3\}\}$ má **dva** prvky: číslo $1$ a množinu $\{2, 3\}$.

Množina je tedy určená jen tím, které prvky obsahuje — přesně to říká
[rovnost množin](podmnozina.md#rovnost-mnozin).

!!! info "Konvence"
    Množiny značíme velkými písmeny $A, B, C, \dots$, prvky malými $a, b, x, y, \dots$
    Pro často používané množiny čísel jsou vyhrazená písmena $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ —
    viz [Číselné množiny](ciselne-mnoziny.md).

!!! example "Příklad"
    $A = \{2, 3, 5, 7\}$ (prvočísla menší než 10).
    Pak $5 \in A$, ale $4 \notin A$ a $\{2\} \notin A$ — prvkem je číslo $2$, ne množina $\{2\}$.

Jak množinu zapsat, popisuje [Zápis množin](zapis-mnozin.md); kolik má prvků, řeší
[Mohutnost](mohutnost.md). Množinu bez prvků potkáš na stránce [Prázdná množina](prazdna-mnozina.md).

??? question "Cvičení: kolik prvků má $\{1, \{1\}, \{1, 1\}\}$?"
    Protože $\{1, 1\} = \{1\}$, je to vlastně $\{1, \{1\}, \{1\}\} = \{1, \{1\}\}$.
    Množina má **2 prvky**: číslo $1$ a množinu $\{1\}$.

??? note "Proč „souhrn objektů" není úplně přesná definice (Russellův paradox)"
    Kdyby šlo z *libovolné* vlastnosti udělat množinu, mohli bychom vzít
    $R = \{x ;\ x \notin x\}$ — množinu všech množin, které nejsou samy sebe prvkem.
    Je $R \in R$? Pokud ano, pak podle definice $R \notin R$. Pokud ne, pak splňuje podmínku, takže $R \in R$.
    Spor.

    Proto moderní matematika staví na **axiomatické teorii množin** (ZFC), která přesně říká,
    které konstrukce množin jsou povolené. Pro běžnou práci ale intuitivní představa stačí.
