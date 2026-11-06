# Výpočet limit

Postup: **dosaď**. Když vyjde číslo, je hotovo. Když vyjde neurčitý výraz ($\frac00$, $\frac\infty\infty$, …),
uprav výraz jedním z triků níže — nebo použij [L'Hospitalovo pravidlo](uziti-derivace.md#lhospitalovo-pravidlo).
{ .lead }

## 1. Dosazení

Pro spojité funkce ([skoro všechny „školní"](limita-funkce.md#spojitost)) stačí dosadit:

!!! example "Příklad"
    $$\lim_{x \to 2} (x^2 + 3x) = 4 + 6 = 10$$

Co vyjde po dosazení:

| Vyjde | Závěr |
|---|---|
| číslo | to je limita |
| $\frac{c}{0}$, $c \neq 0$ | limita je $\pm\infty$ (zjisti znaménko zleva/zprava) nebo neexistuje |
| $\frac00$, $\frac\infty\infty$, … | **neurčitý výraz** → upravit |

## 2. Typ $\frac00$: vytknout a zkrátit

Když je čitatel i jmenovatel v bodě $a$ nulový, oba mají kořen $a$ — rozlož je a zkrať $(x - a)$.

!!! example "Příklady"
    $$\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = \lim_{x \to 1} \frac{(x - 1)(x + 1)}{x - 1} = \lim_{x \to 1} (x + 1) = 2$$

    $$\lim_{x \to 3} \frac{x^2 - 9}{x^2 - x - 6} = \lim_{x \to 3} \frac{(x - 3)(x + 3)}{(x - 3)(x + 2)} = \frac{6}{5}$$

    $$\lim_{x \to 2} \frac{x^3 - 8}{x - 2} = \lim_{x \to 2} \frac{(x - 2)(x^2 + 2x + 4)}{x - 2} = 4 + 4 + 4 = 12$$

## 3. Typ $\frac00$ s odmocninou: rozšířit

Rozšiř výrazem se **opačným znaménkem** u odmocniny a použij $(a - b)(a + b) = a^2 - b^2$:

!!! example "Příklady"
    $$
    \lim_{x \to 0} \frac{\sqrt{x + 4} - 2}{x}
    = \lim_{x \to 0} \frac{(\sqrt{x + 4} - 2)(\sqrt{x + 4} + 2)}{x(\sqrt{x + 4} + 2)}
    = \lim_{x \to 0} \frac{x}{x(\sqrt{x + 4} + 2)} = \frac{1}{4}
    $$

    $$\lim_{x \to 9} \frac{\sqrt{x} - 3}{x - 9} = \lim_{x \to 9} \frac{\sqrt{x} - 3}{(\sqrt{x} - 3)(\sqrt{x} + 3)} = \frac{1}{6}$$

## 4. Limity v nekonečnu: vydělit nejvyšší mocninou { #limity-v-nekonecnu }

U podílu polynomů vyděl čitatele i jmenovatele **nejvyšší mocninou ze jmenovatele**. Členy $\frac{c}{x^k}$ jdou k nule.

!!! example "Příklady"
    $$\lim_{x \to \infty} \frac{3x^2 + 2x}{5x^2 - 1} = \lim_{x \to \infty} \frac{3 + \frac{2}{x}}{5 - \frac{1}{x^2}} = \frac{3}{5}$$

    $$\lim_{x \to \infty} \frac{2x + 1}{x^2 + 3} = \lim_{x \to \infty} \frac{\frac{2}{x} + \frac{1}{x^2}}{1 + \frac{3}{x^2}} = \frac{0}{1} = 0$$

!!! tip "Rychlé pravidlo pro podíl polynomů ($x \to \infty$)"
    | Stupeň čitatele vs. jmenovatele | Limita |
    |---|---|
    | menší | $0$ |
    | stejný | podíl vedoucích koeficientů |
    | větší | $\pm\infty$ |

## 5. Známé limity

Tyto se pamatují (nebo se odvodí [L'Hospitalem](uziti-derivace.md#lhospitalovo-pravidlo)) a ostatní se na ně převádějí:

| Limita | Hodnota |
|---|---|
| $\lim\limits_{x \to 0} \dfrac{\sin x}{x}$ | $1$ |
| $\lim\limits_{x \to 0} \dfrac{1 - \cos x}{x^2}$ | $\frac12$ |
| $\lim\limits_{x \to 0} \dfrac{e^x - 1}{x}$ | $1$ |
| $\lim\limits_{x \to 0} \dfrac{\ln(1 + x)}{x}$ | $1$ — viz [přirozený logaritmus](prirozeny-logaritmus.md) |
| $\lim\limits_{x \to \infty} \left(1 + \dfrac{1}{x}\right)^x$ | [$e$](eulerovo-cislo.md) |
| $\lim\limits_{x \to \infty} \left(1 + \dfrac{a}{x}\right)^x$ | $e^a$ |

<div class="limit" data-f="sin(x)/x" data-a="0" data-x="-8,8" data-y="-0.5,1.5" data-limit="1"></div>

!!! example "Převod na známou limitu"
    $$\lim_{x \to 0} \frac{\sin 3x}{x} = \lim_{x \to 0} 3 \cdot \frac{\sin 3x}{3x} = 3 \cdot 1 = 3$$

    $$\lim_{x \to 0} \frac{\sin 5x}{\sin 2x} = \lim_{x \to 0} \frac{\frac{\sin 5x}{5x} \cdot 5x}{\frac{\sin 2x}{2x} \cdot 2x} = \frac{5}{2}$$

    $$\lim_{x \to \infty} \left(1 + \frac{3}{x}\right)^x = e^3, \qquad \lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^{2x} = \left[\lim_{x \to \infty} \left(1 + \frac1x\right)^x\right]^2 = e^2$$

## 6. L'Hospitalovo pravidlo

Pro $\frac00$ a $\frac\infty\infty$: $\lim \frac{f}{g} = \lim \frac{f'}{g'}$ — viz [Užití derivace](uziti-derivace.md#lhospitalovo-pravidlo).
Potřebuje [derivace](pravidla-derivovani.md).

## Cvičení

??? question "$\lim\limits_{x \to -1} \dfrac{x^2 + 3x + 2}{x + 1}$"
    $\frac{(x + 1)(x + 2)}{x + 1} = x + 2 \to 1$

??? question "$\lim\limits_{x \to \infty} \dfrac{x^2 + 1}{2x^2 - x}$"
    Stejné stupně → $\frac{1}{2}$

??? question "$\lim\limits_{x \to \infty} \dfrac{x^3}{x^2 + 1}$"
    Čitatel má vyšší stupeň → $\infty$

??? question "$\lim\limits_{x \to 0} \dfrac{\sqrt{1 + x} - 1}{x}$"
    Rozšířit $\sqrt{1 + x} + 1$: $\frac{x}{x(\sqrt{1 + x} + 1)} \to \frac12$

??? question "$\lim\limits_{x \to 0} \dfrac{e^{2x} - 1}{x}$"
    $2 \cdot \frac{e^{2x} - 1}{2x} \to 2 \cdot 1 = 2$

??? question "$\lim\limits_{x \to 0} \dfrac{1 - \cos x}{x^2}$"
    $\frac{1}{2}$. Rozšiř $1 + \cos x$: $\dfrac{1 - \cos^2 x}{x^2 (1 + \cos x)} = \left(\dfrac{\sin x}{x}\right)^2 \cdot \dfrac{1}{1 + \cos x} \to 1 \cdot \dfrac12$.
    Nebo [L'Hospitalem](uziti-derivace.md#lhospitalovo-pravidlo): $\dfrac{\sin x}{2x} \to \dfrac12$.
