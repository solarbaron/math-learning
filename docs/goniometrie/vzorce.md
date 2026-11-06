# Goniometrické vzorce

Vztahy mezi goniometrickými funkcemi. Většina plyne z [jednotkové kružnice](jednotkova-kruznice.md)
a ze součtových vzorců.
{ .lead }

## Základní vztahy

$$\sin^2 x + \cos^2 x = 1$$

$$\operatorname{tg} x = \frac{\sin x}{\cos x}, \qquad \operatorname{cotg} x = \frac{\cos x}{\sin x}, \qquad \operatorname{tg} x \cdot \operatorname{cotg} x = 1$$

$$1 + \operatorname{tg}^2 x = \frac{1}{\cos^2 x}$$

## Symetrie

| | |
|---|---|
| $\sin(-x) = -\sin x$, $\ \cos(-x) = \cos x$ | lichost / sudost |
| $\sin(\pi - x) = \sin x$, $\ \cos(\pi - x) = -\cos x$ | II. kvadrant |
| $\sin(\pi + x) = -\sin x$, $\ \cos(\pi + x) = -\cos x$ | III. kvadrant |
| $\sin\left(\frac{\pi}{2} - x\right) = \cos x$, $\ \cos\left(\frac{\pi}{2} - x\right) = \sin x$ | doplňkový úhel |
| $\sin(x + 2k\pi) = \sin x$, $\ \operatorname{tg}(x + k\pi) = \operatorname{tg} x$ | periodicita |

## Součtové vzorce

$$\sin(x \pm y) = \sin x \cos y \pm \cos x \sin y$$

$$\cos(x \pm y) = \cos x \cos y \mp \sin x \sin y$$

$$\operatorname{tg}(x \pm y) = \frac{\operatorname{tg} x \pm \operatorname{tg} y}{1 \mp \operatorname{tg} x \operatorname{tg} y}$$

!!! example "Příklad: $\sin 75°$"
    $$\sin 75° = \sin(45° + 30°) = \frac{\sqrt2}{2} \cdot \frac{\sqrt3}{2} + \frac{\sqrt2}{2} \cdot \frac12 = \frac{\sqrt6 + \sqrt2}{4} \approx 0{,}966$$

## Dvojnásobný úhel

$$\sin 2x = 2 \sin x \cos x$$

$$\cos 2x = \cos^2 x - \sin^2 x = 1 - 2\sin^2 x = 2\cos^2 x - 1$$

$$\operatorname{tg} 2x = \frac{2\operatorname{tg} x}{1 - \operatorname{tg}^2 x}$$

(Dosaď $y = x$ do součtových vzorců.)

## Poloviční úhel a snížení mocniny

$$\sin^2 x = \frac{1 - \cos 2x}{2}, \qquad \cos^2 x = \frac{1 + \cos 2x}{2}$$

Hodí se hlavně při [integrování](../analyza/metody-integrace.md): $\int \sin^2 x\,dx = \int \frac{1 - \cos 2x}{2}\,dx = \frac{x}{2} - \frac{\sin 2x}{4} + C$.

## Řešené úpravy

!!! example "Zjednoduš $\dfrac{\sin 2x}{1 + \cos 2x}$"
    $$\frac{2\sin x\cos x}{1 + 2\cos^2 x - 1} = \frac{2\sin x\cos x}{2\cos^2 x} = \operatorname{tg} x$$

!!! example "Dokaž $(\sin x + \cos x)^2 = 1 + \sin 2x$"
    $$\sin^2 x + 2\sin x\cos x + \cos^2 x = 1 + 2\sin x \cos x = 1 + \sin 2x$$

??? question "Cvičení: $\cos 15°$ ze součtového vzorce"
    $\cos(45° - 30°) = \frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} + \frac{\sqrt2}{2}\cdot\frac12 = \frac{\sqrt6 + \sqrt2}{4}$ (stejně jako $\sin 75°$ — doplňkové úhly!)

??? question "Cvičení: $\sin x = \frac35$, $x \in (0; \frac{\pi}{2})$. Spočítej $\sin 2x$ a $\cos 2x$."
    $\cos x = \frac45$. $\sin 2x = 2 \cdot \frac35 \cdot \frac45 = \frac{24}{25}$, $\cos 2x = 1 - 2 \cdot \frac{9}{25} = \frac{7}{25}$.
