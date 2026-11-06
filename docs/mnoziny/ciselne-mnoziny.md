# Číselné množiny

Základní číselné obory jsou do sebe vnořené: každý další vznikl, aby šla provést operace, která v předchozím nešla.
{ .lead }

$$\mathbb{N} \subsetneq \mathbb{Z} \subsetneq \mathbb{Q} \subsetneq \mathbb{R} \subsetneq \mathbb{C}$$

<div class="figure">
<svg viewBox="0 0 520 300" role="img" aria-label="Vnořené číselné množiny N, Z, Q, R, C">
  <g><title>ℂ – komplexní čísla</title><rect x="10" y="10" width="500" height="280" rx="14" class="f-fill"/></g>
  <g><title>ℝ – reálná čísla</title><rect x="20" y="50" width="410" height="230" rx="12" class="f-fill"/></g>
  <g><title>ℚ – racionální čísla</title><rect x="30" y="90" width="320" height="180" rx="10" class="f-fill"/></g>
  <g><title>ℤ – celá čísla</title><rect x="40" y="130" width="230" height="130" rx="8" class="f-fill"/></g>
  <g><title>ℕ – přirozená čísla</title><rect x="50" y="170" width="140" height="80" rx="6" class="f-fill"/></g>
  <text x="24" y="38" class="f-big">ℂ</text><text x="52" y="37" class="f-small">komplexní</text>
  <text x="34" y="78" class="f-big">ℝ</text><text x="62" y="77" class="f-small">reálná</text>
  <text x="44" y="118" class="f-big">ℚ</text><text x="72" y="117" class="f-small">racionální</text>
  <text x="54" y="158" class="f-big">ℤ</text><text x="82" y="157" class="f-small">celá</text>
  <text x="64" y="198" class="f-big">ℕ</text><text x="92" y="197" class="f-small">přirozená</text>
  <text x="120" y="230" class="f-num">1, 2, 3, …</text>
  <text x="230" y="200" class="f-num">−1</text><text x="230" y="230" class="f-num">−7</text>
  <text x="310" y="180" class="f-num">½</text><text x="310" y="215" class="f-num">−0,25</text>
  <text x="390" y="170" class="f-num">√2</text><text x="390" y="205" class="f-num">π</text><text x="390" y="240" class="f-num">e</text>
  <text x="470" y="150" class="f-num">i</text><text x="470" y="185" class="f-num">2 + 3i</text>
</svg>
<div class="figure-caption">Najeď myší na obdélník pro název množiny.</div>
</div>

| Množina | Název | Co obsahuje | Co v ní navíc jde |
|---|---|---|---|
| $\mathbb{N}$ | přirozená | $1, 2, 3, \dots$ | sčítání, násobení |
| $\mathbb{Z}$ | celá | $\dots, -2, -1, 0, 1, 2, \dots$ | odčítání |
| $\mathbb{Q}$ | racionální | zlomky $\frac{p}{q}$, $p \in \mathbb{Z}, q \in \mathbb{N}$ | dělení (nenulou) |
| $\mathbb{R}$ | reálná | všechny body číselné osy | odmocniny kladných čísel, limity |
| $\mathbb{C}$ | komplexní | $a + bi$, kde $i^2 = -1$ | odmocniny záporných čísel, každá rovnice $x^n + \dots = 0$ má řešení |

!!! warning "Je nula přirozené číslo?"
    Záleží na autorovi. V české škole se obvykle $0 \notin \mathbb{N}$ a s nulou se píše $\mathbb{N}_0 = \{0, 1, 2, \dots\}$.
    V informatice a teorii množin se často $0 \in \mathbb{N}$. Tady: $\mathbb{N} = \{1, 2, 3, \dots\}$.

## Iracionální čísla

Reálná čísla, která nejsou zlomkem: $\mathbb{R} \setminus \mathbb{Q}$ ([rozdíl](rozdil.md) množin).
Patří sem $\sqrt{2}$, $\pi$, $e$, … Jejich desetinný rozvoj je nekonečný a neperiodický.

## Užitečné podmnožiny

- $\mathbb{Z}^+$, $\mathbb{R}^+$ — kladná čísla; $\mathbb{R}^-$ — záporná; $\mathbb{R}^+_0$ — nezáporná
- souvislé kusy $\mathbb{R}$ jsou [intervaly](intervaly.md)

## Jak velké jsou?

Podle [mohutnosti](mohutnost.md) jsou $\mathbb{N}$, $\mathbb{Z}$ i $\mathbb{Q}$ **stejně velké** (spočetné),
přestože jsou do sebe vnořené. Teprve $\mathbb{R}$ je „větší" — nespočetná.

??? question "Cvičení: do kterých množin patří $-3$, $0{,}\overline{3}$, $\sqrt{9}$, $\sqrt{-9}$?"
    - $-3 \in \mathbb{Z}$ (a tedy i $\mathbb{Q}, \mathbb{R}, \mathbb{C}$), $-3 \notin \mathbb{N}$
    - $0{,}\overline{3} = \frac13 \in \mathbb{Q}$ — periodický rozvoj znamená racionální číslo
    - $\sqrt{9} = 3 \in \mathbb{N}$
    - $\sqrt{-9} = 3i \in \mathbb{C} \setminus \mathbb{R}$
