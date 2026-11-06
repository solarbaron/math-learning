# Neurčitý integrál

Integrování je **opak derivování**. Neurčitý integrál $\int f(x)\,dx$ je funkce $F$, jejíž [derivace](derivace.md) je $f$ —
tzv. **primitivní funkce**.
{ .lead }

!!! definice "Definice"
    $F$ je primitivní funkce k $f$, když $F'(x) = f(x)$. Píšeme

    $$\int f(x)\,dx = F(x) + C$$

    $C$ je libovolná konstanta: derivace konstanty je nula, takže primitivních funkcí je nekonečně mnoho.

!!! example "Příklad"
    $\int 2x\,dx = x^2 + C$, protože $(x^2 + C)' = 2x$.

!!! tip "Zkouška je vždy snadná"
    Výsledek zderivuj — musí vyjít funkce pod integrálem.

## Tabulka integrálů { #tabulka-integralu }

Je to [tabulka derivací](pravidla-derivovani.md#tabulka-derivaci) čtená pozpátku.

| $\int f(x)\,dx$ | $= F(x) + C$ | Poznámka |
|---|---|---|
| $\int 0\,dx$ | $C$ | |
| $\int 1\,dx$ | $x$ | |
| $\int x^n\,dx$ | $\dfrac{x^{n+1}}{n+1}$ | $n \neq -1$ |
| $\int \sqrt{x}\,dx$ | $\dfrac{2}{3}x^{3/2} = \dfrac23 x\sqrt{x}$ | $x^{1/2}$ |
| $\int \dfrac{1}{x^2}\,dx$ | $-\dfrac{1}{x}$ | $x^{-2}$ |
| $\int \dfrac{1}{x}\,dx$ | $\ln \lvert x \rvert$ | výjimka pro $n = -1$ — [proč](prirozeny-logaritmus.md#proc-prirozeny-ln-x-jako-plocha) |
| $\int e^x\,dx$ | $e^x$ | |
| $\int a^x\,dx$ | $\dfrac{a^x}{\ln a}$ | |
| $\int \sin x\,dx$ | $-\cos x$ | |
| $\int \cos x\,dx$ | $\sin x$ | |
| $\int \dfrac{1}{\cos^2 x}\,dx$ | $\operatorname{tg} x$ | |
| $\int \dfrac{1}{\sin^2 x}\,dx$ | $-\operatorname{cotg} x$ | |
| $\int \dfrac{1}{1 + x^2}\,dx$ | $\operatorname{arctg} x$ | |
| $\int \dfrac{1}{\sqrt{1 - x^2}}\,dx$ | $\arcsin x$ | |
| $\int \dfrac{f'(x)}{f(x)}\,dx$ | $\ln \lvert f(x) \rvert$ | „derivace jmenovatele v čitateli" |
| $\int f(ax + b)\,dx$ | $\dfrac{1}{a} F(ax + b)$ | lineární vnitřek |

Vše pohromadě: [Tabulka derivací a integrálů](tabulky.md).

## Pravidla

$$\int (f \pm g)\,dx = \int f\,dx \pm \int g\,dx, \qquad \int c \cdot f\,dx = c \int f\,dx$$

!!! warning "Pro součin a podíl jednoduché pravidlo není"
    $\int f \cdot g\,dx \neq \int f\,dx \cdot \int g\,dx$. Na součiny jsou [metody integrace](metody-integrace.md):
    substituce a per partes.

## Řešené příklady

!!! example "Polynomy a mocniny"
    $$\int (3x^2 + 2x - 5)\,dx = x^3 + x^2 - 5x + C$$

    $$\int \left(\sqrt{x} + \frac{1}{x^2}\right)dx = \frac23 x^{3/2} - \frac1x + C$$

    $$\int \frac{x^2 + 1}{x}\,dx = \int \left(x + \frac1x\right)dx = \frac{x^2}{2} + \ln|x| + C$$

!!! example "Exponenciály a logaritmus"
    $$\int \left(\frac1x + e^x\right)dx = \ln|x| + e^x + C$$

    $$\int 2^x\,dx = \frac{2^x}{\ln 2} + C$$

!!! example "Lineární vnitřek $\int f(ax + b)\,dx = \frac1a F(ax + b)$"
    $$\int e^{3x}\,dx = \frac13 e^{3x} + C, \qquad \int \cos(2x)\,dx = \frac12 \sin(2x) + C$$

    $$\int \frac{1}{2x + 1}\,dx = \frac12 \ln|2x + 1| + C, \qquad \int (2x + 3)^5\,dx = \frac{(2x + 3)^6}{12} + C$$

!!! example "Derivace jmenovatele v čitateli"
    $$\int \frac{2x}{x^2 + 1}\,dx = \ln(x^2 + 1) + C, \qquad \int \frac{x}{x^2 + 1}\,dx = \frac12 \ln(x^2 + 1) + C$$

    $$\int \operatorname{tg} x\,dx = \int \frac{\sin x}{\cos x}\,dx = -\ln|\cos x| + C$$

## Cvičení

??? question "$\int (4x^3 - 6x + 1)\,dx$"
    $x^4 - 3x^2 + x + C$

??? question "$\int \dfrac{3}{x}\,dx$"
    $3\ln|x| + C$

??? question "$\int (e^{-x} + \sin x)\,dx$"
    $-e^{-x} - \cos x + C$

??? question "$\int \dfrac{1}{x^3}\,dx$"
    $\int x^{-3}\,dx = \dfrac{x^{-2}}{-2} = -\dfrac{1}{2x^2} + C$

??? question "$\int \dfrac{3x^2}{x^3 + 5}\,dx$"
    Derivace jmenovatele v čitateli: $\ln|x^3 + 5| + C$
