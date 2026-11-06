# Intervaly

**Interval** je souvislá část [reálné osy](ciselne-mnoziny.md) — všechna čísla mezi dvěma hranicemi.
U každé hranice je potřeba říct, jestli do intervalu patří.
{ .lead }

!!! definice "Definice"
    Pro $a < b$:

    $$\langle a; b \rangle = \{x \in \mathbb{R} ;\ a \le x \le b\} \qquad (a; b) = \{x \in \mathbb{R} ;\ a < x < b\}$$

- **úhlová / hranatá závorka** $\langle\ \rangle$ — krajní bod do intervalu **patří** (plné kolečko ●)
- **kulatá závorka** $(\ )$ — krajní bod **nepatří** (prázdné kolečko ○)

## Druhy intervalů

| Zápis | Podmínka | Název |
|---|---|---|
| $\langle a; b \rangle$ | $a \le x \le b$ | uzavřený |
| $(a; b)$ | $a < x < b$ | otevřený |
| $\langle a; b)$, $(a; b \rangle$ | $a \le x < b$, $a < x \le b$ | polouzavřený |
| $\langle a; \infty)$, $(-\infty; b)$, … | $x \ge a$, $x < b$, … | neomezený |
| $(-\infty; \infty)$ | — | celé $\mathbb{R}$ |

<div class="numline" data-rows="⟨-2; 3⟩ | (-2; 3) | ⟨-2; 3) | ⟨1; ∞)"></div>

!!! warning "Nekonečno je vždy s kulatou závorkou"
    $\infty$ není číslo, nedá se „dosáhnout", takže ho interval nikdy neobsahuje: $\langle 1; \infty)$, nikdy $\langle 1; \infty \rangle$.

!!! info "Jiná značení"
    Mezinárodně se používají hranaté závorky a čárka: $[a, b]$, $[a, b)$. Ve starší literatuře
    otevřený konec i obrácenou závorkou: $]a, b[$. Česky se kvůli desetinné čárce píše středník.

## Operace s intervaly

Intervaly jsou [množiny](mnozina.md), takže se s nimi dají dělat stejné operace — nejlépe se to dělá na ose:

<div class="numline" data-rows="A: ⟨-2; 3) | B: (1; 5⟩ | A ∩ B: (1; 3) | A ∪ B: ⟨-2; 5⟩"></div>

Výsledek nemusí být interval — třeba [doplněk](doplnek.md) $\langle 0; 1)' = (-\infty; 0) \cup \langle 1; \infty)$.

## Vyzkoušej

<div class="numline" data-interactive data-a="⟨-2; 3)" data-b="(1; 5⟩"></div>

??? question "Cvičení: $(-\infty; 2\rangle \cap (0; \infty) = ?$"
    $(0; 2\rangle$ — čísla větší než $0$ a zároveň nejvýš $2$.

??? question "Cvičení: zapiš $\{x \in \mathbb{R} ;\ |x| < 3\}$ jako interval"
    $(-3; 3)$

??? question "Cvičení: zapiš $\{x \in \mathbb{R} ;\ |x| \ge 3\}$"
    $(-\infty; -3\rangle \cup \langle 3; \infty)$ — doplněk předchozího.
