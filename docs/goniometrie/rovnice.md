# Goniometrické rovnice

Rovnice jako $\sin x = \frac12$ mají kvůli periodicitě **nekonečně mnoho řešení**. Najdeš řešení v jedné periodě
(na [kružnici](jednotkova-kruznice.md) jsou obvykle dvě) a přičteš násobky periody.
{ .lead }

## Cyklometrické funkce

Inverzní funkce ke goniometrickým — z hodnoty vrátí úhel. Protože $\sin$ není prostá, bere se jen jeden „hlavní" úsek:

| Funkce | Vrací úhel z intervalu | Příklad |
|---|---|---|
| $\arcsin y$ | $\langle -\frac{\pi}{2}; \frac{\pi}{2} \rangle$ | $\arcsin \frac12 = \frac{\pi}{6}$ |
| $\arccos y$ | $\langle 0; \pi \rangle$ | $\arccos\left(-\frac12\right) = \frac{2\pi}{3}$ |
| $\operatorname{arctg} y$ | $\left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$ | $\operatorname{arctg} 1 = \frac{\pi}{4}$ |

Na kalkulačce $\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$ (v režimu RAD).

<div class="plot" data-fns="arcsin(x); arccos(x); arctan(x)" data-labels="arcsin x; arccos x; arctg x" data-x="-3,3" data-y="-2,3.5"></div>

## Základní rovnice

| Rovnice | Řešení ($k \in \mathbb{Z}$) |
|---|---|
| $\sin x = a$, $\ \lvert a \rvert \le 1$ | $x = \arcsin a + 2k\pi$, $\quad x = \pi - \arcsin a + 2k\pi$ |
| $\cos x = a$, $\ \lvert a \rvert \le 1$ | $x = \pm\arccos a + 2k\pi$ |
| $\operatorname{tg} x = a$ | $x = \operatorname{arctg} a + k\pi$ |
| $\sin x = a$ nebo $\cos x = a$, $\ \lvert a \rvert > 1$ | **nemá řešení** |

!!! tip "Na kružnici"
    $\sin x = a$: vodorovná přímka $y = a$ protne kružnici ve **dvou** bodech (symetrických podle osy $y$).
    $\cos x = a$: svislá přímka $x = a$ — dva body symetrické podle osy $x$.

## Řešené příklady

!!! example "1. $\sin x = \frac12$"
    $\arcsin\frac12 = \frac{\pi}{6}$, druhé řešení $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$:

    $$x = \frac{\pi}{6} + 2k\pi, \qquad x = \frac{5\pi}{6} + 2k\pi$$

!!! example "2. $\cos x = -\frac{\sqrt2}{2}$"
    $\arccos\left(-\frac{\sqrt2}{2}\right) = \frac{3\pi}{4}$:

    $$x = \pm\frac{3\pi}{4} + 2k\pi \qquad (\text{tj. } \tfrac{3\pi}{4} \text{ a } \tfrac{5\pi}{4} \text{ v jedné periodě})$$

!!! example "3. $\operatorname{tg} x = \sqrt3$"
    $$x = \frac{\pi}{3} + k\pi$$

!!! example "4. $\cos 2x = 0$ (argument násobkem)"
    Nejdřív řeš pro $2x$: $\ 2x = \frac{\pi}{2} + k\pi$, pak vyděl dvěma:

    $$x = \frac{\pi}{4} + \frac{k\pi}{2}$$

    Pozor — dělí se i perioda!

!!! example "5. $2\sin^2 x - \sin x = 0$ (vytknout)"
    $\sin x\,(2\sin x - 1) = 0$:

    - $\sin x = 0 \Rightarrow x = k\pi$
    - $\sin x = \frac12 \Rightarrow x = \frac{\pi}{6} + 2k\pi$, $\ x = \frac{5\pi}{6} + 2k\pi$

    Nikdy nedělit $\sin x$ — přišel bys o řešení $\sin x = 0$.

!!! example "6. $2\cos^2 x + 3\cos x - 2 = 0$ (substituce)"
    $t = \cos x$: $\ 2t^2 + 3t - 2 = 0 \Rightarrow t = \frac{-3 \pm 5}{4}$, tedy $t = \frac12$ nebo $t = -2$.

    $\cos x = -2$ nemá řešení. $\cos x = \frac12$:

    $$x = \pm\frac{\pi}{3} + 2k\pi$$

!!! example "7. $\sin x = \cos x$"
    $\cos x \neq 0$ (jinak by bylo i $\sin x = 0$, a to současně nejde), vyděl: $\operatorname{tg} x = 1$:

    $$x = \frac{\pi}{4} + k\pi$$

## Cvičení

??? question "$2\cos x = \sqrt3$"
    $\cos x = \frac{\sqrt3}{2} \Rightarrow x = \pm\frac{\pi}{6} + 2k\pi$

??? question "$\sin 3x = 1$"
    $3x = \frac{\pi}{2} + 2k\pi \Rightarrow x = \frac{\pi}{6} + \frac{2k\pi}{3}$

??? question "$\operatorname{tg}^2 x = 1$"
    $\operatorname{tg} x = \pm 1 \Rightarrow x = \pm\frac{\pi}{4} + k\pi$ (souhrnně $x = \frac{\pi}{4} + \frac{k\pi}{2}$)

??? question "$\sin^2 x = \frac34$ na intervalu $\langle 0; 2\pi)$"
    $\sin x = \pm\frac{\sqrt3}{2} \Rightarrow x \in \left\{\frac{\pi}{3}, \frac{2\pi}{3}, \frac{4\pi}{3}, \frac{5\pi}{3}\right\}$
