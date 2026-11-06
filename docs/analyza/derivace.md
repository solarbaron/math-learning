# Derivace

**Derivace** $f'(x_0)$ je směrnice tečny ke grafu v bodě $x_0$ — jak strmě funkce v tom místě roste nebo klesá.
Fyzikálně okamžitá rychlost změny: derivace polohy podle času je rychlost.
{ .lead }

## Od sečny k tečně

Sečna prochází body $[x_0; f(x_0)]$ a $[x_0 + h; f(x_0 + h)]$. Její směrnice je

$$\frac{f(x_0 + h) - f(x_0)}{h} \qquad \text{(„o kolik se změnilo } y \text{" lomeno „o kolik } x\text{")}$$

Když $h$ zmenšuješ k nule, sečna se otočí do tečny. Zkus posuvník $h$ a táhni bod $x_0$:

<div class="tangent" data-f="x^2" data-x0="1" data-x="-3,3" data-y="-2,7"></div>

!!! definice "Definice"
    $$f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}$$

    pokud tato [limita](limita-funkce.md) existuje (a je konečná).

Značení: $f'(x)$, $\dfrac{df}{dx}$, $\dfrac{dy}{dx}$, $y'$. Ve fyzice pro čas tečkou: $\dot{x}$.

## Derivace z definice

!!! example "Příklad: $(x^2)' = 2x$"
    $$
    \lim_{h \to 0} \frac{(x + h)^2 - x^2}{h}
    = \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h}
    = \lim_{h \to 0} \frac{h(2x + h)}{h}
    = \lim_{h \to 0} (2x + h) = 2x
    $$

    Takže v bodě $x_0 = 1$ má parabola směrnici tečny $2$, v bodě $x_0 = 3$ už $6$.

Z definice se odvodí [tabulka derivací](pravidla-derivovani.md#tabulka-derivaci), kterou se pak počítá — z definice už se derivovat nemusí.

## Derivace jako funkce

Když spočítáš derivaci v každém bodě, dostaneš novou funkci $f'(x)$. Ve widgetu výše klikni na *Ukázat graf $f'$*:
graf derivace paraboly $x^2$ je přímka $2x$.

| Když $f'(x) \ldots$ | pak $f$ v okolí $x$ |
|---|---|
| $> 0$ | roste |
| $< 0$ | klesá |
| $= 0$ | má vodorovnou tečnu — možný [extrém](uziti-derivace.md#extremy) |

## Kdy derivace neexistuje

Funkce $|x|$ má v nule „špičku": zleva směrnice $-1$, zprava $+1$ → $f'(0)$ neexistuje.
Funkce, která má derivaci, musí být [spojitá](limita-funkce.md#spojitost) — opačně to neplatí.

<div class="tangent" data-f="abs(x)" data-x0="0.5" data-x="-3,3" data-y="-1,3"></div>

## Druhá derivace

Derivace derivace: $f''(x) = (f'(x))'$. Říká, jak se mění směrnice — **zakřivení**:

- $f'' > 0$: funkce je **konvexní** (prohnutá nahoru, ∪)
- $f'' < 0$: funkce je **konkávní** (prohnutá dolů, ∩)

Fyzikálně: druhá derivace polohy je zrychlení.

Dál: [Pravidla derivování](pravidla-derivovani.md) a [Užití derivace](uziti-derivace.md).

??? question "Cvičení: spočítej z definice derivaci $f(x) = 3x + 1$"
    $\frac{3(x + h) + 1 - 3x - 1}{h} = \frac{3h}{h} = 3$. Přímka má všude stejnou směrnici.

??? question "Cvičení: spočítej z definice derivaci $f(x) = \frac1x$"
    $\dfrac{\frac{1}{x+h} - \frac1x}{h} = \dfrac{x - (x + h)}{h\,x(x + h)} = \dfrac{-1}{x(x + h)} \to -\dfrac{1}{x^2}$
