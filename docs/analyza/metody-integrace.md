# Metody integrace

Na součiny a složené funkce nestačí [tabulka](neurcity-integral.md#tabulka-integralu). Dvě hlavní metody:
**substituce** (opak [řetízkového pravidla](pravidla-derivovani.md#slozena-funkce-retizkove-pravidlo)) a
**per partes** (opak derivace součinu).
{ .lead }

## Substituce

Když je pod integrálem funkce **a zároveň (zhruba) její derivace**, zaveď novou proměnnou $t$ za „vnitřek".

!!! definice "Postup"
    1. Zvol $t = g(x)$ (vnitřek, jehož derivace se v integrálu vyskytuje).
    2. Spočítej $dt = g'(x)\,dx$.
    3. Přepiš celý integrál na $t$ — žádné $x$ nesmí zbýt.
    4. Zintegruj podle $t$ a dosaď zpět $t = g(x)$.

!!! example "Příklady"
    **$\int 2x \cos(x^2)\,dx$** — vnitřek $x^2$, jeho derivace $2x$ je u integrálu:

    $$t = x^2,\ dt = 2x\,dx: \quad \int \cos t\,dt = \sin t + C = \sin(x^2) + C$$

    **$\int x\,e^{x^2}\,dx$** — chybí jen konstanta:

    $$t = x^2,\ dt = 2x\,dx \Rightarrow x\,dx = \tfrac12 dt: \quad \frac12 \int e^t\,dt = \frac12 e^{x^2} + C$$

    **$\int \dfrac{\ln x}{x}\,dx$** — $(\ln x)' = \frac1x$:

    $$t = \ln x,\ dt = \tfrac1x dx: \quad \int t\,dt = \frac{t^2}{2} = \frac{(\ln x)^2}{2} + C$$

    **$\int \sin x \cos^3 x\,dx$**:

    $$t = \cos x,\ dt = -\sin x\,dx: \quad -\int t^3\,dt = -\frac{t^4}{4} = -\frac{\cos^4 x}{4} + C$$

!!! tip "Jak poznat substituci"
    Hledej „funkci uvnitř" ($x^2$ v $\cos(x^2)$, $\ln x$, $\cos x$ v $\cos^3 x$), jejíž derivace stojí vedle jako činitel.

## Per partes

!!! veta "Vzorec"
    $$\int u\,v'\,dx = u\,v - \int u'\,v\,dx$$

    Plyne z derivace součinu $(uv)' = u'v + uv'$.

Integrál součinu převedeš na jiný, snad jednodušší. Rozhoduje, co zvolíš za $u$ (budeš derivovat)
a co za $v'$ (budeš integrovat).

!!! tip "Co zvolit za $u$ (derivovat)"
    Za $u$ dej to, co se derivováním **zjednoduší**: polynom ($x$, $x^2$), $\ln x$, $\operatorname{arctg} x$.
    Za $v'$ to, co jde snadno integrovat: $e^x$, $\sin x$, $\cos x$.

!!! example "Příklady"
    **$\int x\,e^x\,dx$**: $\ u = x,\ v' = e^x \Rightarrow u' = 1,\ v = e^x$

    $$\int x e^x\,dx = x e^x - \int e^x\,dx = x e^x - e^x + C = (x - 1)e^x + C$$

    **$\int x \cos x\,dx$**: $\ u = x,\ v' = \cos x \Rightarrow u' = 1,\ v = \sin x$

    $$\int x \cos x\,dx = x \sin x - \int \sin x\,dx = x \sin x + \cos x + C$$

    **$\int \ln x\,dx$** — trik: $\ln x = 1 \cdot \ln x$, $\ u = \ln x,\ v' = 1 \Rightarrow u' = \frac1x,\ v = x$

    $$\int \ln x\,dx = x \ln x - \int x \cdot \frac1x\,dx = x \ln x - x + C$$

!!! example "Per partes dvakrát: $\int x^2 e^x\,dx$"
    $u = x^2$, $v' = e^x$: $\quad \int x^2 e^x\,dx = x^2 e^x - \int 2x\,e^x\,dx$

    Zbylý integrál znovu per partes (viz výše $\int x e^x\,dx = (x - 1)e^x$):

    $$= x^2 e^x - 2(x - 1)e^x + C = (x^2 - 2x + 2)e^x + C$$

!!! example "Trik „integrál se vrátí": $\int e^x \sin x\,dx$"
    Dvakrát per partes ($u$ vždy goniometrická funkce) dá $I = e^x \sin x - e^x \cos x - I$, odkud

    $$\int e^x \sin x\,dx = \frac{e^x(\sin x - \cos x)}{2} + C$$

## Cvičení

??? question "$\int \cos(3x + 1)\,dx$"
    $\frac13 \sin(3x + 1) + C$ (substituce $t = 3x + 1$, nebo pravidlo pro lineární vnitřek)

??? question "$\int x \sqrt{x^2 + 1}\,dx$"
    $t = x^2 + 1$, $x\,dx = \frac12 dt$: $\frac12 \int \sqrt{t}\,dt = \frac13 (x^2 + 1)^{3/2} + C$

??? question "$\int x \sin x\,dx$"
    Per partes $u = x$: $-x\cos x + \int \cos x\,dx = -x\cos x + \sin x + C$

??? question "$\int x \ln x\,dx$"
    $u = \ln x$, $v' = x$: $\frac{x^2}{2}\ln x - \int \frac{x^2}{2} \cdot \frac1x\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4} + C$

??? question "$\int \dfrac{e^x}{1 + e^x}\,dx$"
    Derivace jmenovatele v čitateli (nebo $t = 1 + e^x$): $\ln(1 + e^x) + C$
