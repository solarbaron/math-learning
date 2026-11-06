# Užití derivace

Derivace najde tečnu, místa, kde funkce roste a klesá, její **maxima a minima** — a pomůže spočítat
těžké [limity](vypocet-limit.md) (L'Hospitalovo pravidlo).
{ .lead }

## Tečna

Tečna ke grafu $f$ v bodě $x_0$ má směrnici $f'(x_0)$ a prochází bodem $[x_0; f(x_0)]$:

$$y = f(x_0) + f'(x_0)\,(x - x_0)$$

!!! example "Příklad: tečna k $y = x^2$ v bodě $x_0 = 1$"
    $f(1) = 1$, $f'(x) = 2x$, $f'(1) = 2$:

    $$y = 1 + 2(x - 1) = 2x - 1$$

## Monotonie a extrémy { #extremy }

- $f' > 0$ na intervalu ⇒ $f$ tam **roste**
- $f' < 0$ na intervalu ⇒ $f$ tam **klesá**
- **lokální extrém** může být jen tam, kde $f'(x) = 0$ (stacionární bod) nebo kde $f'$ neexistuje

Jestli je stacionární bod maximum, nebo minimum, pozná:

- **znaménko $f'$** kolem bodu: $+ \to -$ je maximum, $- \to +$ je minimum
- nebo **druhá derivace**: $f''(x_0) < 0$ maximum (∩), $f''(x_0) > 0$ minimum (∪)

!!! example "Příklad: $f(x) = x^3 - 3x$"
    1. $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$
    2. $f'(x) = 0 \Rightarrow x = -1$ nebo $x = 1$
    3. $f''(x) = 6x$:
        - $f''(-1) = -6 < 0$ → **lokální maximum** $f(-1) = 2$
        - $f''(1) = 6 > 0$ → **lokální minimum** $f(1) = -2$
    4. Monotonie: $f' > 0$ na $(-\infty; -1)$ a $(1; \infty)$ → roste; na $(-1; 1)$ klesá.

<div class="plot" data-fns="x^3-3x; 3x^2-3" data-labels="f(x) = x³ − 3x; f′(x) = 3x² − 3" data-x="-3,3" data-y="-4,5"
     data-points="-1,2,max (−1; 2) | 1,-2,min (1; −2)"></div>

Všimni si: kde graf $f'$ protíná osu $x$, má $f$ vrchol nebo dolík.

!!! example "Slovní úloha: největší plocha"
    Z plotu dlouhého $40$ m chceš ohradit obdélník u zdi (zeď tvoří jednu stranu). Jaké rozměry dají největší plochu?

    Strany: $x$ (dvě kolmé ke zdi) a $40 - 2x$. Plocha $S(x) = x(40 - 2x) = 40x - 2x^2$.

    $S'(x) = 40 - 4x = 0 \Rightarrow x = 10$, $\ S''(x) = -4 < 0$ → maximum.

    Rozměry $10 \times 20$ m, plocha $200\ \text{m}^2$.

## L'Hospitalovo pravidlo { #lhospitalovo-pravidlo }

!!! veta "Věta"
    Je-li $\lim \dfrac{f(x)}{g(x)}$ typu $\dfrac00$ nebo $\dfrac{\infty}{\infty}$, pak

    $$\lim \frac{f(x)}{g(x)} = \lim \frac{f'(x)}{g'(x)}$$

    (pokud limita vpravo existuje). Čitatel a jmenovatel se derivují **zvlášť** — nejde o derivaci podílu!

!!! example "Příklady"
    $$\lim_{x \to 0} \frac{e^x - 1}{x} \overset{\frac00}{=} \lim_{x \to 0} \frac{e^x}{1} = 1$$

    $$\lim_{x \to 0} \frac{e^x - 1 - x}{x^2} \overset{\frac00}{=} \lim_{x \to 0} \frac{e^x - 1}{2x} \overset{\frac00}{=} \lim_{x \to 0} \frac{e^x}{2} = \frac12$$

    $$\lim_{x \to \infty} \frac{\ln x}{x} \overset{\frac\infty\infty}{=} \lim_{x \to \infty} \frac{1/x}{1} = 0$$

    $$\lim_{x \to 0} \frac{x - \sin x}{x^3} \overset{\frac00}{=} \lim \frac{1 - \cos x}{3x^2} \overset{\frac00}{=} \lim \frac{\sin x}{6x} = \frac16$$

!!! example "Typ $0 \cdot \infty$: převést na zlomek"
    $$\lim_{x \to 0^+} x \ln x = \lim_{x \to 0^+} \frac{\ln x}{1/x} \overset{\frac\infty\infty}{=} \lim_{x \to 0^+} \frac{1/x}{-1/x^2} = \lim_{x \to 0^+} (-x) = 0$$

!!! warning "Nejdřív ověř typ"
    L'Hospital funguje **jen** pro $\frac00$ a $\frac\infty\infty$. Např. $\lim_{x \to 0} \frac{x + 1}{x + 2} = \frac12$ dosazením,
    L'Hospital by dal nesmysl $\frac11 = 1$.

## Cvičení

??? question "Tečna k $y = \ln x$ v bodě $x_0 = 1$"
    $f(1) = 0$, $f'(1) = 1$ → $y = x - 1$

??? question "Extrémy $f(x) = x^2 e^{x}$"
    $f' = x(x + 2)e^x = 0 \Rightarrow x = 0, x = -2$. Znaménka: $+$ na $(-\infty; -2)$, $-$ na $(-2; 0)$, $+$ na $(0; \infty)$.
    Maximum $f(-2) = 4e^{-2} \approx 0{,}54$, minimum $f(0) = 0$.

??? question "$\lim\limits_{x \to 0} \dfrac{\ln(1 + x)}{x}$ L'Hospitalem"
    $\lim \dfrac{\frac{1}{1 + x}}{1} = 1$

??? question "$\lim\limits_{x \to \infty} \dfrac{x^2}{e^x}$"
    Dvakrát L'Hospital: $\frac{2x}{e^x} \to \frac{2}{e^x} \to 0$ (exponenciála přeroste každou mocninu).
