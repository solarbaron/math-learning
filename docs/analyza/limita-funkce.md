# Limita funkce

$\lim\limits_{x \to a} f(x) = L$ znamená: když se $x$ blíží k $a$, hodnoty $f(x)$ se blíží k $L$.
Co se děje **přímo v bodě** $a$, je jedno — funkce tam dokonce nemusí být definovaná.
{ .lead }

!!! example "Motivace"
    $f(x) = \dfrac{x^2 - 1}{x - 1}$ není v $x = 1$ definovaná (dělení nulou). Ale pro $x \neq 1$ je
    $f(x) = \dfrac{(x-1)(x+1)}{x-1} = x + 1$, takže blízko jedničky jsou hodnoty blízko $2$:

    $$\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2$$

Klikni na *Přibližovat* — body zleva i zprava se blíží k $x = 1$ a jejich hodnoty k $2$. V grafu je v bodě $(1; 2)$ „díra":

<div class="limit" data-f="(x^2-1)/(x-1)" data-a="1" data-x="-1,3" data-y="-0.5,4" data-limit="2"></div>

!!! definice "Definice (Cauchy)"
    $\lim\limits_{x \to a} f(x) = L$, jestliže ke každému $\varepsilon > 0$ existuje $\delta > 0$ takové, že
    $$0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon.$$

    Slovy: hodnoty dostaneš libovolně blízko $L$ ($\varepsilon$), když vezmeš $x$ dost blízko $a$ ($\delta$).
    Podmínka $0 < |x - a|$ říká, že bod $a$ samotný se nepočítá.

## Jednostranné limity

Někdy se funkce zleva a zprava blíží k různým hodnotám:

- **limita zleva** $\lim\limits_{x \to a^-} f(x)$ — jen $x < a$
- **limita zprava** $\lim\limits_{x \to a^+} f(x)$ — jen $x > a$

!!! veta "Věta"
    Limita $\lim\limits_{x \to a} f(x)$ existuje, právě když existují obě jednostranné a jsou si rovny.

!!! example "Příklad: $\dfrac{|x|}{x}$"
    Pro $x > 0$ je to $1$, pro $x < 0$ je to $-1$. Takže $\lim\limits_{x \to 0^+} = 1$, $\lim\limits_{x \to 0^-} = -1$
    a $\lim\limits_{x \to 0} \frac{|x|}{x}$ **neexistuje**.

<div class="limit" data-f="abs(x)/x" data-a="0" data-x="-3,3" data-y="-2,2"></div>

## Nekonečné limity a limity v nekonečnu

| Zápis | Význam | Příklad |
|---|---|---|
| $\lim\limits_{x \to a} f(x) = \infty$ | hodnoty rostou nade všechny meze | $\lim\limits_{x \to 0} \frac{1}{x^2} = \infty$ |
| $\lim\limits_{x \to \infty} f(x) = L$ | pro velká $x$ se blíží k $L$ (vodorovná asymptota) | $\lim\limits_{x \to \infty} \frac{1}{x} = 0$ |
| $\lim\limits_{x \to \infty} f(x) = \infty$ | roste do nekonečna | $\lim\limits_{x \to \infty} \ln x = \infty$ |

!!! example "Příklad: $\frac1x$ v nule"
    $\lim\limits_{x \to 0^+} \frac{1}{x} = +\infty$, $\ \lim\limits_{x \to 0^-} \frac{1}{x} = -\infty$ → oboustranná limita neexistuje.
    Přímka $x = 0$ je **svislá asymptota**.

<div class="plot" data-fns="1/x; 1/x^2" data-labels="1/x; 1/x²" data-x="-4,4" data-y="-5,5"></div>

## Spojitost

Funkce je **spojitá** v bodě $a$, když $\lim\limits_{x \to a} f(x) = f(a)$ — limita existuje a rovná se hodnotě.
Graf se dá nakreslit „bez zvednutí tužky".

Všechny elementární funkce (polynomy, $\sin$, $\cos$, $e^x$, $\ln x$, $\sqrt{x}$, …) jsou spojité všude, kde jsou definované.
Proto se limita v „hezkém" bodě spočítá prostým **dosazením** — viz [Výpočet limit](vypocet-limit.md).

## Pravidla

Pokud $\lim f = A$ a $\lim g = B$ (konečné), pak:

$$\lim (f \pm g) = A \pm B, \qquad \lim (f \cdot g) = A \cdot B, \qquad \lim \frac{f}{g} = \frac{A}{B} \ (B \neq 0)$$

Problém nastává u **neurčitých výrazů**:
$\frac{0}{0}$, $\frac{\infty}{\infty}$, $\infty - \infty$, $0 \cdot \infty$, $1^\infty$, $0^0$, $\infty^0$.
Ty se musí upravit — jak, ukazuje [Výpočet limit](vypocet-limit.md).
