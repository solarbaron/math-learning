# Pravidla derivování

Derivuje se podle **tabulky** základních funkcí a **pravidel** pro součet, součin, podíl a složenou funkci.
S tím se zderivuje jakákoli „školní" funkce.
{ .lead }

## Tabulka derivací { #tabulka-derivaci }

### Mocniny a odmocniny

| $f(x)$ | $f'(x)$ | Poznámka |
|---|---|---|
| $c$ (konstanta) | $0$ | |
| $x$ | $1$ | |
| $x^n$ | $n\,x^{n-1}$ | pro libovolné reálné $n$ |
| $x^2$ | $2x$ | |
| $x^3$ | $3x^2$ | |
| $\sqrt{x} = x^{1/2}$ | $\dfrac{1}{2\sqrt{x}}$ | |
| $\sqrt[3]{x} = x^{1/3}$ | $\dfrac{1}{3\sqrt[3]{x^2}}$ | |
| $\dfrac{1}{x} = x^{-1}$ | $-\dfrac{1}{x^2}$ | |
| $\dfrac{1}{x^2} = x^{-2}$ | $-\dfrac{2}{x^3}$ | |

### Exponenciální a logaritmické funkce { #exponencialni-a-logaritmicke-funkce }

| $f(x)$ | $f'(x)$ | Poznámka |
|---|---|---|
| $e^x$ | $e^x$ | [sama sobě derivací](eulerovo-cislo.md#proc-je-ex-vyjimecna) |
| $a^x$ | $a^x \ln a$ | |
| $\ln x$ | $\dfrac{1}{x}$ | [přirozený logaritmus](prirozeny-logaritmus.md) |
| $\ln \lvert x \rvert$ | $\dfrac{1}{x}$ | i pro záporná $x$ |
| $\log_a x$ | $\dfrac{1}{x \ln a}$ | |

### Goniometrické a cyklometrické funkce

| $f(x)$ | $f'(x)$ |
|---|---|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\operatorname{tg} x$ | $\dfrac{1}{\cos^2 x}$ |
| $\operatorname{cotg} x$ | $-\dfrac{1}{\sin^2 x}$ |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1 - x^2}}$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1 - x^2}}$ |
| $\operatorname{arctg} x$ | $\dfrac{1}{1 + x^2}$ |
| $\operatorname{arccotg} x$ | $-\dfrac{1}{1 + x^2}$ |

Viz [goniometrické funkce](../goniometrie/index.md). Úhly vždy v **radiánech**.

Vše pohromadě i s integrály: [Tabulka derivací a integrálů](tabulky.md).

## Pravidla

| Pravidlo | Vzorec |
|---|---|
| konstanta před funkcí | $(c \cdot f)' = c \cdot f'$ |
| součet / rozdíl | $(f \pm g)' = f' \pm g'$ |
| **součin** | $(f \cdot g)' = f' g + f g'$ |
| **podíl** | $\left(\dfrac{f}{g}\right)' = \dfrac{f' g - f g'}{g^2}$ |
| **složená funkce** (řetízkové pravidlo) | $\big(f(g(x))\big)' = f'(g(x)) \cdot g'(x)$ |

!!! warning "Častá chyba"
    $(f \cdot g)' \neq f' \cdot g'$. Například $(x \cdot x)' = (x^2)' = 2x$, ale $x' \cdot x' = 1$.

## Řešené příklady

!!! example "Součet a mocniny"
    $$\left(4x^3 - 5x^2 + 7x - 2\right)' = 12x^2 - 10x + 7$$

    $$\left(\sqrt{x} + \frac{3}{x}\right)' = \left(x^{1/2} + 3x^{-1}\right)' = \frac{1}{2\sqrt{x}} - \frac{3}{x^2}$$

!!! example "Součin"
    $$(x^2 \sin x)' = 2x \sin x + x^2 \cos x$$

    $$(x \ln x)' = 1 \cdot \ln x + x \cdot \frac1x = \ln x + 1$$

    $$(x^2 e^x)' = 2x e^x + x^2 e^x = x(x + 2)e^x$$

!!! example "Podíl"
    $$\left(\frac{x}{x^2 + 1}\right)' = \frac{1 \cdot (x^2 + 1) - x \cdot 2x}{(x^2 + 1)^2} = \frac{1 - x^2}{(x^2 + 1)^2}$$

    $$\left(\frac{x + 1}{x - 1}\right)' = \frac{(x - 1) - (x + 1)}{(x - 1)^2} = \frac{-2}{(x - 1)^2}$$

### Složená funkce (řetízkové pravidlo)

Derivuj **vnější** funkci (vnitřek nech být) a vynásob derivací **vnitřku**.

!!! example "Složená funkce"
    | Funkce | Vnější · vnitřní | Derivace |
    |---|---|---|
    | $\sin(3x^2)$ | $\cos(3x^2) \cdot 6x$ | $6x\cos(3x^2)$ |
    | $e^{2x}$ | $e^{2x} \cdot 2$ | $2e^{2x}$ |
    | $e^{-x^2}$ | $e^{-x^2} \cdot (-2x)$ | $-2x\,e^{-x^2}$ |
    | $\ln(x^2 + 1)$ | $\frac{1}{x^2 + 1} \cdot 2x$ | $\frac{2x}{x^2 + 1}$ |
    | $(2x - 1)^4$ | $4(2x - 1)^3 \cdot 2$ | $8(2x - 1)^3$ |
    | $\sqrt{1 + x^3}$ | $\frac{1}{2\sqrt{1 + x^3}} \cdot 3x^2$ | $\frac{3x^2}{2\sqrt{1 + x^3}}$ |
    | $\ln(\sin x)$ | $\frac{1}{\sin x} \cdot \cos x$ | $\operatorname{cotg} x$ |

!!! example "Kombinace: $e^x \cos x$"
    $$(e^x \cos x)' = e^x \cos x + e^x (-\sin x) = e^x(\cos x - \sin x)$$

!!! example "Trik s logaritmem: $x^x$"
    Ani mocnina, ani exponenciála. Přepiš $x^x = e^{x \ln x}$ a derivuj jako složenou funkci:

    $$(x^x)' = e^{x \ln x} \cdot (x \ln x)' = x^x (\ln x + 1)$$

## Cvičení

??? question "$(5x^4 - 2\sqrt{x})'$"
    $20x^3 - \dfrac{1}{\sqrt{x}}$

??? question "$(x^3 \ln x)'$"
    $3x^2 \ln x + x^2 = x^2(3\ln x + 1)$

??? question "$\left(\dfrac{\sin x}{x}\right)'$"
    $\dfrac{x \cos x - \sin x}{x^2}$

??? question "$\left(\cos(5x + 1)\right)'$"
    $-5\sin(5x + 1)$

??? question "$\left(\ln(3x)\right)'$"
    $\frac{1}{3x} \cdot 3 = \frac{1}{x}$ (logicky: $\ln 3x = \ln 3 + \ln x$)

??? question "$\left(e^{\sin x}\right)'$"
    $e^{\sin x} \cos x$

??? question "$(\operatorname{tg} x)'$ pomocí podílu"
    $\left(\dfrac{\sin x}{\cos x}\right)' = \dfrac{\cos^2 x + \sin^2 x}{\cos^2 x} = \dfrac{1}{\cos^2 x}$
