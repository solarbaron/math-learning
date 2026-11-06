# Limita posloupnosti

**Posloupnost** je nekonečný seznam čísel $a_1, a_2, a_3, \dots$ Její **limita** je číslo, ke kterému se členy
s rostoucím $n$ blíží libovolně blízko — a už se od něj nevzdálí.
{ .lead }

!!! example "Příklady posloupností"
    - $a_n = \frac{1}{n}$: $\ 1, \frac12, \frac13, \frac14, \dots \to 0$
    - $a_n = \frac{n}{n+1}$: $\ \frac12, \frac23, \frac34, \frac45, \dots \to 1$
    - $a_n = (-1)^n$: $\ -1, 1, -1, 1, \dots$ — skáče, limitu **nemá**
    - $a_n = n^2$: $\ 1, 4, 9, 16, \dots \to \infty$

<div class="sequence" data-a="n/(n+1)" data-limit="1" data-n="30"></div>

!!! definice "Definice"
    $\lim\limits_{n \to \infty} a_n = L$, jestliže pro každé (libovolně malé) $\varepsilon > 0$ existuje index $n_0$ takový,
    že pro všechna $n > n_0$ je $|a_n - L| < \varepsilon$.

    Slovy: ať zvolíš jakkoli úzký pruh kolem $L$, od nějakého členu dál už v něm leží **všechny** členy.

Posloupnost s vlastní (konečnou) limitou je **konvergentní**, jinak **divergentní**
(limita $\pm\infty$, nebo žádná).

## Jak počítat

Stejně jako [limity funkcí v nekonečnu](vypocet-limit.md#limity-v-nekonecnu) — $n$ si představ jako $x \to \infty$.

!!! example "Řešené příklady"
    $$\lim_{n \to \infty} \frac{3n^2 + 2n}{5n^2 - 1} = \lim_{n \to \infty} \frac{3 + \frac2n}{5 - \frac1{n^2}} = \frac{3}{5}$$

    (vydělit nejvyšší mocninou $n^2$; členy $\frac{2}{n}$, $\frac{1}{n^2}$ jdou k nule)

    $$\lim_{n \to \infty} \frac{2n + 1}{n^2 + 3} = 0 \qquad \text{(jmenovatel roste rychleji)}$$

    $$\lim_{n \to \infty} \left(1 + \frac1n\right)^n = e \qquad \text{(definice čísla } e\text{)}$$

## Důležité limity

| Limita | Hodnota |
|---|---|
| $\lim \frac{1}{n^k}$, $k > 0$ | $0$ |
| $\lim q^n$, $\lvert q \rvert < 1$ | $0$ |
| $\lim \sqrt[n]{n}$ | $1$ |
| $\lim \left(1 + \frac1n\right)^n$ | [$e$](eulerovo-cislo.md) |
| $\lim \left(1 + \frac{a}{n}\right)^n$ | $e^a$ |
| $\lim \frac{n^k}{a^n}$, $a > 1$ | $0$ (exponenciála přeroste mocninu) |
| $\lim \frac{\ln n}{n}$ | $0$ (mocnina přeroste logaritmus) |

!!! tip "Kdo roste rychleji"
    Pro $n \to \infty$: $\quad \ln n \ll n^k \ll a^n \ll n! \ll n^n$

Spojitá obdoba je [limita funkce](limita-funkce.md).

??? question "Cvičení: $\lim\limits_{n \to \infty} \dfrac{n^2 + 1}{2n^2 - n}$"
    $\frac{1}{2}$ — poměr koeficientů u nejvyšší mocniny.

??? question "Cvičení: $\lim\limits_{n \to \infty} \left(1 + \dfrac{1}{n}\right)^{2n}$"
    $\left[\left(1 + \frac1n\right)^n\right]^2 \to e^2$
