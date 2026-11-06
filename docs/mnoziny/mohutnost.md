# Mohutnost

**Mohutnost** $|A|$ říká, *kolik prvků* množina má. U konečných množin je to počet,
u nekonečných se množiny porovnávají **párováním prvků**.
{ .lead }

## Konečné množiny

Má-li $A$ právě $n$ prvků, píšeme $|A| = n$. Například $|\{a, b, c\}| = 3$, $|\emptyset| = 0$.

!!! warning "Pozor"
    $|\{1, \{2, 3\}\}| = 2$ — prvky uvnitř vnořené množiny se nepočítají (viz [Množina](mnozina.md#tri-pravidla)).

### Princip inkluze a exkluze

$$|A \cup B| = |A| + |B| - |A \cap B|$$

$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

Ve [Vennově diagramu](vennovy-diagramy.md) je dobře vidět proč: střed $A \cap B \cap C$ se nejdřív třikrát přičte,
pak třikrát odečte, takže ho musíme jednou přičíst zpátky.

<div class="venn" data-expr="A ∩ B ∩ C"></div>

??? question "Cvičení: Ve třídě 30 žáků, 18 hraje fotbal, 12 hokej, 5 obojí. Kolik nehraje nic?"
    $|F \cup H| = 18 + 12 - 5 = 25$, tedy nehraje nic $30 - 25 = 5$ žáků.

## Stejná mohutnost = párování

Dvě množiny mají **stejnou mohutnost**, když se jejich prvky dají spárovat jedna k jedné (**bijekce**) —
nic nezbyde a nic se nepoužije dvakrát. Nemusíme přitom umět počítat!

<div class="bijection" data-left="a, b, c, d" data-right="1, 2, 3, 4" data-left-name="A" data-right-name="B"></div>

Když spárovat nejdou, jedna strana přebývá:

<div class="bijection" data-left="a, b, c" data-right="1, 2, 3, 4, 5" data-left-name="A" data-right-name="B"></div>

## Nekonečné množiny

U nekonečna se dějí divné věci. Sudých čísel je **stejně** jako přirozených — stačí spárovat $n \leftrightarrow 2n$:

<div class="bijection" data-left="1, 2, 3, 4, 5, 6, 7, …" data-right="2, 4, 6, 8, 10, 12, 14, …" data-left-name="ℕ" data-right-name="S"></div>

Část tu má stejně prvků jako celek. To se u konečných množin stát nemůže — a dokonce se tím nekonečné množiny dají definovat.

!!! example "Hilbertův hotel"
    Hotel s nekonečně mnoha pokoji $1, 2, 3, \dots$ je plný. Přijede nový host.
    Recepční přestěhuje hosta z pokoje $n$ do pokoje $n + 1$ — pokoj $1$ se uvolní. Nikdo nemusel odejít.

### Spočetné množiny

Množina je **spočetná**, má-li stejnou mohutnost jako $\mathbb{N}$ — prvky jde seřadit do posloupnosti $a_1, a_2, a_3, \dots$
Mohutnost $\mathbb{N}$ se značí $\aleph_0$ (alef nula).

Spočetné jsou překvapivě i:

- $\mathbb{Z}$: $\ 0, 1, -1, 2, -2, 3, -3, \dots$
- $\mathbb{Q}$: zlomky jde projít „po úhlopříčkách" tabulky čitatel × jmenovatel
- $\mathbb{N} \times \mathbb{N}$ ([kartézský součin](kartezsky-soucin.md)) — stejný trik

### Nespočetné množiny

!!! veta "Věta (Cantor)"
    $\mathbb{R}$ **není** spočetná — reálných čísel je „víc" než přirozených.

**Diagonální argument (náčrt):** Kdyby šla všechna čísla z $(0; 1)$ seřadit do seznamu, vyrobíme číslo,
které se od $n$-tého čísla v seznamu liší na $n$-tém desetinném místě. To v seznamu není — spor.

Obecně platí: $|A| < |\mathcal{P}(A)|$ pro každou množinu $A$ ([potenční množina](potencni-mnozina.md) je vždy větší).
Nekonečen je tedy nekonečně mnoho různých velikostí.

Kde v tom leží jednotlivé číselné obory, shrnuje [Číselné množiny](ciselne-mnoziny.md).
