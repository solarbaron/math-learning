# Grafy a vlastnosti

Grafy $\sin$ a $\cos$ jsou stejné vlny posunuté o $\frac{\pi}{2}$. Opakují se po $2\pi$ (perioda).
$\operatorname{tg}$ a $\operatorname{cotg}$ se opakují po $\pi$ a mají svislé asymptoty.
{ .lead }

## Sinus a kosinus

<div class="plot" data-fns="sin(x); cos(x)" data-labels="sin x; cos x" data-x="-7,7" data-y="-1.8,1.8"></div>

| | $\sin x$ | $\cos x$ |
|---|---|---|
| definiční obor | $\mathbb{R}$ | $\mathbb{R}$ |
| obor hodnot | $\langle -1; 1 \rangle$ | $\langle -1; 1 \rangle$ |
| perioda | $2\pi$ | $2\pi$ |
| sudá / lichá | **lichá**: $\sin(-x) = -\sin x$ | **sudá**: $\cos(-x) = \cos x$ |
| nulové body | $x = k\pi$ | $x = \frac{\pi}{2} + k\pi$ |
| maximum $1$ | $x = \frac{\pi}{2} + 2k\pi$ | $x = 2k\pi$ |
| minimum $-1$ | $x = \frac{3\pi}{2} + 2k\pi$ | $x = \pi + 2k\pi$ |

($k \in \mathbb{Z}$ — libovolné celé číslo.) Platí $\cos x = \sin\left(x + \frac{\pi}{2}\right)$.

## Tangens a kotangens

<div class="plot" data-fns="tan(x); cot(x)" data-labels="tg x; cotg x" data-x="-5,5" data-y="-4,4"></div>

| | $\operatorname{tg} x$ | $\operatorname{cotg} x$ |
|---|---|---|
| definiční obor | $x \neq \frac{\pi}{2} + k\pi$ | $x \neq k\pi$ |
| obor hodnot | $\mathbb{R}$ | $\mathbb{R}$ |
| perioda | $\pi$ | $\pi$ |
| sudá / lichá | lichá | lichá |
| nulové body | $x = k\pi$ | $x = \frac{\pi}{2} + k\pi$ |
| asymptoty | $x = \frac{\pi}{2} + k\pi$ | $x = k\pi$ |

## Natažení a posuny: $a \sin(bx + c) + d$

| Parametr | Co dělá | Příklad |
|---|---|---|
| $a$ | **amplituda** — vlna je vysoká $\lvert a \rvert$ (záporné $a$ ji překlopí) | $2\sin x$: od $-2$ do $2$ |
| $b$ | mění **periodu** na $\dfrac{2\pi}{\lvert b \rvert}$ | $\sin 3x$: perioda $\frac{2\pi}{3}$ |
| $c$ | posun **doleva** o $\dfrac{c}{b}$ | $\sin(x + \frac{\pi}{2}) = \cos x$ |
| $d$ | posun **nahoru** o $d$ | $\sin x + 1$: od $0$ do $2$ |

<div class="plot" data-fns="sin(x); 2sin(x); sin(3x); sin(x)+1" data-labels="sin x; 2 sin x; sin 3x; sin x + 1" data-x="-1,7" data-y="-2.5,2.5"></div>

!!! example "Příklad: $f(x) = 3\sin(2x) - 1$"
    Amplituda $3$, perioda $\frac{2\pi}{2} = \pi$, posunutá o $1$ dolů → obor hodnot $\langle -4; 2 \rangle$.

## Derivace

$(\sin x)' = \cos x$ — v každém bodě je směrnice sinusoidy rovna hodnotě kosinu.
Zkus ve widgetu tečny s grafem $f'$:

<div class="tangent" data-f="sin(x)" data-x0="0" data-x="-4,7" data-y="-2,2"></div>

Další derivace a integrály: [Tabulka derivací a integrálů](../analyza/tabulky.md).

??? question "Cvičení: perioda a obor hodnot $f(x) = -2\cos\frac{x}{2} + 3$"
    Perioda $\frac{2\pi}{1/2} = 4\pi$, amplituda $2$, posun $+3$ → obor hodnot $\langle 1; 5 \rangle$.

??? question "Cvičení: je $f(x) = x \sin x$ sudá, nebo lichá?"
    $f(-x) = (-x)\sin(-x) = (-x)(-\sin x) = x\sin x = f(x)$ → **sudá**.
