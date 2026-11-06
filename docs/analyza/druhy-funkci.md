# Druhy funkcí

Typ funkce se dá skoro vždy poznat podle jedné otázky: **kde v předpisu je $x$?**
Je v základu mocniny, v exponentu, ve jmenovateli, pod odmocninou, v logaritmu…?
{ .lead }

## Poznávací tabulka

| Typ | Předpis | Kde je $x$ | Graf |
|---|---|---|---|
| **konstantní** | $f(x) = c$ | nikde | vodorovná přímka |
| **lineární** | $f(x) = ax + b$ | jen $x$ (první mocnina) | přímka |
| **kvadratická** | $f(x) = ax^2 + bx + c$ | nejvýš $x^2$ | parabola |
| **mocninná** | $f(x) = x^n$ | v **základu**, číslo v exponentu | parabola, „S" křivka… |
| **polynom** | $a_n x^n + \dots + a_1 x + a_0$ | součet mocnin $x$ | vlnovka, nejvýš $n-1$ vrcholů |
| **lomená (racionální)** | $f(x) = \dfrac{1}{x}$, $\dfrac{ax + b}{cx + d}$ | ve **jmenovateli** | hyperbola s asymptotami |
| **odmocninová** | $f(x) = \sqrt{x}$ | pod **odmocninou** | půlka paraboly „naležato" |
| **exponenciální** | $f(x) = a^x$, $e^x$ | v **exponentu**, číslo v základu | rychle roste (nebo klesá k 0) |
| **logaritmická** | $f(x) = \log_a x$, $\ln x$ | v **logaritmu** | pomalu roste, jen pro $x > 0$ |
| **goniometrická** | $\sin x$, $\cos x$, $\operatorname{tg} x$ | v $\sin$, $\cos$, … | vlna, opakuje se (periodická) |
| **absolutní hodnota** | $f(x) = \lvert x \rvert$ | v $\lvert\ \rvert$ | tvar „V" |

## Nejčastější záměna: $x^2$ vs. $2^x$

!!! warning "Rozhoduje, kde je $x$"
    - $x^2$ — $x$ **dole** (v základu) → **mocninná** (kvadratická) funkce, parabola
    - $2^x$ — $x$ **nahoře** (v exponentu) → **exponenciální** funkce

Pro malá $x$ vypadají podobně, ale exponenciála pak všechno přeroste:

<div class="plot" data-fns="x^2; 2^x" data-labels="x² (mocninná); 2ˣ (exponenciální)" data-x="-3,6" data-y="-1,30"
     data-points="2,4,(2; 4) | 4,16,(4; 16)"></div>

| $x$ | 1 | 2 | 3 | 4 | 5 | 10 | 20 |
|---|---|---|---|---|---|---|---|
| $x^2$ | 1 | 4 | 9 | 16 | 25 | 100 | 400 |
| $2^x$ | 2 | 4 | 8 | 16 | 32 | 1024 | 1 048 576 |

## Chytáky

- $f(x) = 2^3$ nebo $e^2$ nebo $\pi$ — žádné $x$ → **konstantní** (je to jen číslo)
- $f(x) = \pi x$ nebo $\frac{x}{3}$ — $\pi$ a $\frac13$ jsou jen koeficienty → **lineární**
- $f(x) = x^{1/2} = \sqrt{x}$ — mocninná i odmocninová zároveň
- $f(x) = \frac{x^2 + 1}{2}$ — dělí se číslem, ne $x$ → **kvadratická**, ne lomená
- $f(x) = e^{-x}$ — $x$ v exponentu → **exponenciální** (klesající)
- $f(x) = \ln(e^x) = x$ — po úpravě **lineární**. Vždy se vyplatí předpis nejdřív zjednodušit.

## Poznávání podle tabulky hodnot

Když máš jen hodnoty (třeba z měření), podívej se, jak se mění při kroku $x \to x + 1$:

| Jestliže… | je funkce | Příklad |
|---|---|---|
| hodnoty se nemění | konstantní | $5, 5, 5, 5$ |
| se **přičítá** pořád stejné číslo | lineární | $1, 4, 7, 10$ ($+3$) |
| rozdíly rostou o stejné číslo | kvadratická | $1, 4, 9, 16$ (rozdíly $3, 5, 7$) |
| se **násobí** pořád stejným číslem | exponenciální | $3, 6, 12, 24$ ($\cdot 2$) |
| hodnoty se opakují | periodická (goniometrická) | $0, 1, 0, -1, 0, 1$ |

!!! example "Příklad"
    $x$: $0, 1, 2, 3$ a $y$: $5, 15, 45, 135$. Podíly $\frac{15}{5} = \frac{45}{15} = \frac{135}{45} = 3$ → exponenciální:
    $y = 5 \cdot 3^x$.

## Poznávání podle grafu

<div class="plot" data-fns="2; 0.5x+1; x^2-2; 2^x; ln(x)" data-labels="konstantní; lineární; kvadratická; exponenciální; logaritmická"
     data-x="-4,6" data-y="-3,6"></div>

<div class="plot" data-fns="1/x; sqrt(x); sin(x); abs(x)-2" data-labels="lomená 1/x; odmocninová √x; goniometrická sin x; absolutní hodnota |x| − 2"
     data-x="-6,6" data-y="-3,4"></div>

| Graf | Typ |
|---|---|
| přímka vodorovná | konstantní |
| přímka šikmá | lineární |
| parabola (U nebo ∩) | kvadratická |
| dvě větve, které se blíží k osám (asymptoty) | lomená |
| prudce roste, vlevo se „přilepí" k ose $x$ (nikdy jí nedotkne) | exponenciální |
| začíná u svislé osy dole a pak pomalu roste | logaritmická |
| začíná v bodě a roste čím dál pomaleji | odmocninová |
| pravidelná vlna | goniometrická |
| ostrý zlom ve tvaru V | absolutní hodnota |

## Procvič si to

<div class="func-quiz"></div>

Podrobněji: [Eulerovo číslo a $e^x$](eulerovo-cislo.md), [přirozený logaritmus](prirozeny-logaritmus.md),
[goniometrické funkce](../goniometrie/index.md).
