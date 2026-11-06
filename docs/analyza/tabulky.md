# Tabulka derivací a integrálů

Všechny základní vzorce na jednom místě. Integrál je derivace čtená pozpátku — proto jsou vedle sebe.
{ .lead }

## Základní funkce

| $f(x)$ | $f'(x)$ (derivace) | $\int f(x)\,dx$ (integrál, $+\,C$) |
|---|---|---|
| $c$ | $0$ | $cx$ |
| $x$ | $1$ | $\dfrac{x^2}{2}$ |
| $x^n$ | $n\,x^{n-1}$ | $\dfrac{x^{n+1}}{n+1}$, $\ n \neq -1$ |
| $x^2$ | $2x$ | $\dfrac{x^3}{3}$ |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ | $\dfrac{2}{3}x\sqrt{x}$ |
| $\dfrac{1}{x}$ | $-\dfrac{1}{x^2}$ | $\ln\lvert x\rvert$ |
| $\dfrac{1}{x^2}$ | $-\dfrac{2}{x^3}$ | $-\dfrac{1}{x}$ |
| $e^x$ | $e^x$ | $e^x$ |
| $e^{kx}$ | $k\,e^{kx}$ | $\dfrac{1}{k}e^{kx}$ |
| $a^x$ | $a^x \ln a$ | $\dfrac{a^x}{\ln a}$ |
| $\ln x$ | $\dfrac{1}{x}$ | $x \ln x - x$ |
| $\log_a x$ | $\dfrac{1}{x \ln a}$ | $\dfrac{x \ln x - x}{\ln a}$ |
| $\sin x$ | $\cos x$ | $-\cos x$ |
| $\cos x$ | $-\sin x$ | $\sin x$ |
| $\operatorname{tg} x$ | $\dfrac{1}{\cos^2 x}$ | $-\ln\lvert\cos x\rvert$ |
| $\operatorname{cotg} x$ | $-\dfrac{1}{\sin^2 x}$ | $\ln\lvert\sin x\rvert$ |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1 - x^2}}$ | |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1 - x^2}}$ | |
| $\operatorname{arctg} x$ | $\dfrac{1}{1 + x^2}$ | |

## Integrály, které se hodí znát „odzadu"

| $\int f(x)\,dx$ | $= F(x) + C$ |
|---|---|
| $\int \dfrac{1}{\cos^2 x}\,dx$ | $\operatorname{tg} x$ |
| $\int \dfrac{1}{\sin^2 x}\,dx$ | $-\operatorname{cotg} x$ |
| $\int \dfrac{1}{1 + x^2}\,dx$ | $\operatorname{arctg} x$ |
| $\int \dfrac{1}{a^2 + x^2}\,dx$ | $\dfrac{1}{a}\operatorname{arctg}\dfrac{x}{a}$ |
| $\int \dfrac{1}{\sqrt{1 - x^2}}\,dx$ | $\arcsin x$ |
| $\int \dfrac{f'(x)}{f(x)}\,dx$ | $\ln\lvert f(x)\rvert$ |
| $\int f(ax + b)\,dx$ | $\dfrac{1}{a}F(ax + b)$ |

## Pravidla derivování

| | |
|---|---|
| $(c f)' = c f'$ | konstanta jde před |
| $(f \pm g)' = f' \pm g'$ | součet |
| $(fg)' = f'g + fg'$ | součin |
| $\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}$ | podíl |
| $\big(f(g(x))\big)' = f'(g(x)) \cdot g'(x)$ | složená funkce |

Podrobně: [Pravidla derivování](pravidla-derivovani.md).

## Pravidla integrování

| | |
|---|---|
| $\int (cf \pm g)\,dx = c\int f\,dx \pm \int g\,dx$ | linearita |
| $\int f(g(x))\,g'(x)\,dx = \int f(t)\,dt$, $\ t = g(x)$ | substituce |
| $\int u v'\,dx = uv - \int u'v\,dx$ | per partes |
| $\int_a^b f(x)\,dx = F(b) - F(a)$ | Newtonova–Leibnizova formule |

Podrobně: [Neurčitý integrál](neurcity-integral.md), [Metody integrace](metody-integrace.md), [Určitý integrál](urcity-integral.md).

## Důležité limity

| | |
|---|---|
| $\lim\limits_{x \to 0} \dfrac{\sin x}{x} = 1$ | $\lim\limits_{x \to 0} \dfrac{1 - \cos x}{x^2} = \dfrac12$ |
| $\lim\limits_{x \to 0} \dfrac{e^x - 1}{x} = 1$ | $\lim\limits_{x \to 0} \dfrac{\ln(1 + x)}{x} = 1$ |
| $\lim\limits_{x \to \infty} \left(1 + \dfrac1x\right)^x = e$ | $\lim\limits_{x \to \infty} \left(1 + \dfrac{a}{x}\right)^x = e^a$ |
| $\lim\limits_{x \to \infty} \dfrac{x^n}{e^x} = 0$ | $\lim\limits_{x \to \infty} \dfrac{\ln x}{x} = 0$ |

Podrobně: [Výpočet limit](vypocet-limit.md).

## Logaritmy a exponenciály

| | |
|---|---|
| $\ln(ab) = \ln a + \ln b$ | $e^{a + b} = e^a e^b$ |
| $\ln\dfrac{a}{b} = \ln a - \ln b$ | $e^{a - b} = \dfrac{e^a}{e^b}$ |
| $\ln a^k = k\ln a$ | $(e^a)^k = e^{ak}$ |
| $\ln 1 = 0$, $\ \ln e = 1$ | $e^0 = 1$, $\ e^{\ln x} = x$ |
| $\log_a x = \dfrac{\ln x}{\ln a}$ | $a^x = e^{x \ln a}$ |

Podrobně: [Přirozený logaritmus](prirozeny-logaritmus.md).
