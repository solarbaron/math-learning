# Jednotková kružnice

Na kružnici o poloměru $1$ se středem v počátku otoč bod o úhel $\alpha$ (od kladné osy $x$, proti směru hodinových ručiček).
Jeho **$x$-ová souřadnice je $\cos\alpha$**, **$y$-ová je $\sin\alpha$**.
{ .lead }

!!! definice "Definice"
    Bod jednotkové kružnice otočený o úhel $\alpha$ má souřadnice $[\cos\alpha;\ \sin\alpha]$. Dále

    $$\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}, \qquad \operatorname{cotg}\alpha = \frac{\cos\alpha}{\sin\alpha}$$

    (tangens není definován, kde $\cos\alpha = 0$; kotangens, kde $\sin\alpha = 0$).

<div class="unit-circle" data-deg="30"></div>

Vpravo vzniká graf: když bod obíhá, jeho výška kreslí **sinusoidu** a vodorovná poloha **kosinusoidu**.

## V pravoúhlém trojúhelníku

Pro ostré úhly je to totéž co školní definice (přepona = poloměr = 1):

| | Poměr | Zkratka |
|---|---|---|
| $\sin\alpha$ | $\dfrac{\text{protilehlá}}{\text{přepona}}$ | |
| $\cos\alpha$ | $\dfrac{\text{přilehlá}}{\text{přepona}}$ | |
| $\operatorname{tg}\alpha$ | $\dfrac{\text{protilehlá}}{\text{přilehlá}}$ | |
| $\operatorname{cotg}\alpha$ | $\dfrac{\text{přilehlá}}{\text{protilehlá}}$ | |

Kružnice ale funguje pro **jakýkoliv** úhel — i tupý, větší než $360°$ nebo záporný.

## Tabulka hodnot

| $\alpha$ | $0$ | $\frac{\pi}{6}$ ($30°$) | $\frac{\pi}{4}$ ($45°$) | $\frac{\pi}{3}$ ($60°$) | $\frac{\pi}{2}$ ($90°$) |
|---|---|---|---|---|---|
| $\sin\alpha$ | $0$ | $\frac12$ | $\frac{\sqrt2}{2}$ | $\frac{\sqrt3}{2}$ | $1$ |
| $\cos\alpha$ | $1$ | $\frac{\sqrt3}{2}$ | $\frac{\sqrt2}{2}$ | $\frac12$ | $0$ |
| $\operatorname{tg}\alpha$ | $0$ | $\frac{\sqrt3}{3}$ | $1$ | $\sqrt3$ | — |
| $\operatorname{cotg}\alpha$ | — | $\sqrt3$ | $1$ | $\frac{\sqrt3}{3}$ | $0$ |

!!! tip "Trik na zapamatování"
    Sinus pro $0°, 30°, 45°, 60°, 90°$ je $\dfrac{\sqrt0}{2}, \dfrac{\sqrt1}{2}, \dfrac{\sqrt2}{2}, \dfrac{\sqrt3}{2}, \dfrac{\sqrt4}{2}$.
    Kosinus je totéž pozpátku.

## Znaménka v kvadrantech

| Kvadrant | Úhel | $\sin$ | $\cos$ | $\operatorname{tg}$, $\operatorname{cotg}$ |
|---|---|---|---|---|
| I. | $0$ až $\frac{\pi}{2}$ | $+$ | $+$ | $+$ |
| II. | $\frac{\pi}{2}$ až $\pi$ | $+$ | $-$ | $-$ |
| III. | $\pi$ až $\frac{3\pi}{2}$ | $-$ | $-$ | $+$ |
| IV. | $\frac{3\pi}{2}$ až $2\pi$ | $-$ | $+$ | $-$ |

Hodnoty pro úhly mimo první kvadrant se převedou přes **základní (ostrý) úhel** k ose $x$ a znaménko:

!!! example "Příklady"
    - $\sin 150° = \sin(180° - 30°) = +\sin 30° = \frac12$ (II. kvadrant, sinus kladný)
    - $\cos 120° = -\cos 60° = -\frac12$ (II. kvadrant, kosinus záporný)
    - $\sin \frac{7\pi}{6} = -\sin\frac{\pi}{6} = -\frac12$ ($210°$, III. kvadrant)
    - $\operatorname{tg} 135° = -\operatorname{tg} 45° = -1$
    - $\cos \frac{5\pi}{3} = \cos 300° = +\cos 60° = \frac12$ (IV. kvadrant)

Ověř si je v kružnici výše.

## Základní vztah

Bod $[\cos\alpha; \sin\alpha]$ leží na kružnici o poloměru $1$, tedy podle Pythagorovy věty:

$$\sin^2\alpha + \cos^2\alpha = 1$$

Další vzorce: [Vzorce](vzorce.md).

??? question "Cvičení: $\sin 240°$, $\cos 135°$, $\operatorname{tg} 330°$"
    - $240°$: III. kvadrant, základní úhel $60°$ → $\sin 240° = -\frac{\sqrt3}{2}$
    - $135°$: II. kvadrant, $45°$ → $\cos 135° = -\frac{\sqrt2}{2}$
    - $330°$: IV. kvadrant, $30°$ → $\operatorname{tg} 330° = -\frac{\sqrt3}{3}$

??? question "Cvičení: $\sin\alpha = \frac35$, $\alpha$ je ostrý. Kolik je $\cos\alpha$ a $\operatorname{tg}\alpha$?"
    $\cos\alpha = \sqrt{1 - \frac{9}{25}} = \frac45$, $\ \operatorname{tg}\alpha = \frac{3/5}{4/5} = \frac34$
