# Zápis množin

Množinu lze zadat **výčtem prvků**, **charakteristickou vlastností**, nebo nakreslit
[Vennovým diagramem](vennovy-diagramy.md).
{ .lead }

=== "Výčtem"

    Vypíšeme všechny prvky do složených závorek:

    $$A = \{1, 2, 3, 4\}$$

    U nekonečných množin naznačíme vzor třemi tečkami: $\{2, 4, 6, 8, \dots\}$.

=== "Vlastností"

    Popíšeme, jakou podmínku prvky splňují:

    $$A = \{x \in \mathbb{N} ;\ x \le 4\}$$

    Čte se: *„množina všech $x$ z $\mathbb{N}$, pro která platí $x \le 4$."*
    Místo středníku se často píše svislítko: $\{x \in \mathbb{N} \mid x \le 4\}$.

=== "Obrázkem"

    <div class="figure">
    <svg viewBox="0 0 300 140" role="img" aria-label="Množina A s prvky 1, 2, 3, 4">
      <ellipse cx="150" cy="72" rx="120" ry="55" class="f-fill"/>
      <text x="22" y="30" class="f-name">A</text>
      <text x="95" y="78" class="f-num">1</text>
      <text x="130" y="60" class="f-num">2</text>
      <text x="170" y="90" class="f-num">3</text>
      <text x="205" y="66" class="f-num">4</text>
    </svg>
    </div>

Všechny tři zápisy výše popisují **stejnou** množinu.

## Kdy který

| Zápis | Hodí se, když… | Příklad |
|---|---|---|
| výčtem | prvků je málo nebo mají jasný vzor | $\{a, e, i, o, u\}$ |
| vlastností | prvků je moc, nekonečně, nebo je zajímavá podmínka | $\{x \in \mathbb{R} ;\ x^2 < 2\}$ |

## Zápis „obrazem"

Často se píše i $\{f(x) ;\ x \in A\}$ — množina všech hodnot výrazu, když $x$ prochází $A$:

$$\{n^2 ;\ n \in \mathbb{N}\} = \{1, 4, 9, 16, \dots\}$$

!!! example "Příklady"
    - $\{x \in \mathbb{Z} ;\ x^2 = 4\} = \{-2, 2\}$
    - $\{x \in \mathbb{N} ;\ x^2 = 4\} = \{2\}$ — záleží, odkud $x$ bereme!
    - $\{x \in \mathbb{R} ;\ x^2 = -1\} = \emptyset$ — žádné takové reálné číslo není, viz [Prázdná množina](prazdna-mnozina.md).
    - $\{x \in \mathbb{R} ;\ -2 \le x < 3\}$ se zkráceně píše jako [interval](intervaly.md) $\langle -2; 3)$.

??? question "Cvičení: zapiš výčtem $\{x \in \mathbb{N} ;\ x \text{ dělí } 12\}$"
    $\{1, 2, 3, 4, 6, 12\}$

??? question "Cvičení: zapiš vlastností $\{1, 3, 5, 7, \dots\}$"
    Například $\{2k - 1 ;\ k \in \mathbb{N}\}$, nebo $\{x \in \mathbb{N} ;\ x \text{ je liché}\}$.
