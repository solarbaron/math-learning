# Určitý integrál

$\int_a^b f(x)\,dx$ je **plocha pod grafem** funkce $f$ mezi $x = a$ a $x = b$ (plocha pod osou $x$ se počítá záporně).
Spočítá se pomocí [primitivní funkce](neurcity-integral.md): $F(b) - F(a)$.
{ .lead }

## Plocha jako limita součtu obdélníků

Rozděl interval $\langle a; b \rangle$ na $n$ proužků, každý nahraď obdélníkem a sečti plochy.
Čím víc proužků, tím přesněji. V limitě $n \to \infty$ dostaneš přesnou plochu:

<div class="riemann" data-f="x^2" data-a="0" data-b="2" data-n="6" data-x="-0.5,2.5" data-y="-0.5,4.5"></div>

!!! definice "Definice (Riemannův integrál)"
    $$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{k=1}^{n} f(\xi_k)\,\Delta x, \qquad \Delta x = \frac{b - a}{n}$$

    kde $\xi_k$ je libovolný bod $k$-tého proužku. Znak $\int$ je protažené S jako *suma*, $dx$ je „nekonečně tenká šířka".

## Newtonova–Leibnizova formule

!!! veta "Základní věta analýzy"
    Je-li $F$ primitivní funkce k $f$, pak

    $$\int_a^b f(x)\,dx = \Big[F(x)\Big]_a^b = F(b) - F(a)$$

Tohle je zázrak: místo nekonečného sčítání stačí najít [primitivní funkci](neurcity-integral.md) a dosadit dvě čísla.
Konstanta $C$ se odečte, proto ji tu nepíšeme.

!!! example "Příklady"
    $$\int_0^2 x^2\,dx = \left[\frac{x^3}{3}\right]_0^2 = \frac83 - 0 = \frac83 \approx 2{,}667$$

    (Ověř ve widgetu výše — přepni na *přesná plocha*.)

    $$\int_1^e \frac{1}{x}\,dx = \Big[\ln x\Big]_1^e = \ln e - \ln 1 = 1 - 0 = 1$$

    $$\int_0^\pi \sin x\,dx = \Big[-\cos x\Big]_0^\pi = -\cos\pi + \cos 0 = 1 + 1 = 2$$

    $$\int_1^3 (3x^2 - 2x)\,dx = \Big[x^3 - x^2\Big]_1^3 = (27 - 9) - (1 - 1) = 18$$

    $$\int_0^1 \frac{1}{1 + x^2}\,dx = \Big[\operatorname{arctg} x\Big]_0^1 = \frac{\pi}{4}$$

!!! example "S metodou integrace: $\int_0^1 x e^x\,dx$"
    [Per partes](metody-integrace.md#per-partes): primitivní funkce je $(x - 1)e^x$.

    $$\int_0^1 x e^x\,dx = \Big[(x - 1)e^x\Big]_0^1 = 0 - (-1) = 1$$

## Plocha pod osou je záporná

<div class="riemann" data-f="sin(x)" data-a="0" data-b="6.2832" data-n="12" data-x="-0.5,7" data-y="-1.5,1.5"></div>

$\int_0^{2\pi} \sin x\,dx = 0$ — kladná plocha nad osou a záporná pod osou se vyruší.
Když chceš **geometrickou plochu**, rozděl interval podle nulových bodů a sečti absolutní hodnoty: $2 + 2 = 4$.

## Plocha mezi křivkami

$$S = \int_a^b \big(f(x) - g(x)\big)\,dx \qquad \text{(kde } f \ge g \text{ na } \langle a; b \rangle\text{)}$$

!!! example "Plocha mezi $y = x$ a $y = x^2$"
    Průsečíky: $x = x^2 \Rightarrow x = 0, x = 1$. Na $\langle 0; 1 \rangle$ je $x \ge x^2$:

    $$S = \int_0^1 (x - x^2)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac12 - \frac13 = \frac16$$

<div class="plot" data-fns="x; x^2" data-labels="y = x; y = x²" data-x="-0.5,1.5" data-y="-0.5,1.5" data-points="0,0,(0; 0) | 1,1,(1; 1)"></div>

## Vlastnosti

| | |
|---|---|
| $\int_a^a f\,dx = 0$ | |
| $\int_b^a f\,dx = -\int_a^b f\,dx$ | prohození mezí mění znaménko |
| $\int_a^b f\,dx + \int_b^c f\,dx = \int_a^c f\,dx$ | sčítání intervalů |
| $\int_a^b (cf + g)\,dx = c\int_a^b f\,dx + \int_a^b g\,dx$ | linearita |

## Cvičení

??? question "$\int_0^4 \sqrt{x}\,dx$"
    $\left[\frac23 x^{3/2}\right]_0^4 = \frac23 \cdot 8 = \frac{16}{3}$

??? question "$\int_{-1}^{2} x^3\,dx$"
    $\left[\frac{x^4}{4}\right]_{-1}^{2} = 4 - \frac14 = \frac{15}{4}$

??? question "$\int_0^{\ln 2} e^x\,dx$"
    $e^{\ln 2} - e^0 = 2 - 1 = 1$

??? question "$\int_0^{\pi/2} \cos x\,dx$"
    $\sin\frac{\pi}{2} - \sin 0 = 1$

??? question "Plocha pod $y = \frac1x$ od $1$ do $10$"
    $\ln 10 - \ln 1 = \ln 10 \approx 2{,}303$ — viz [přirozený logaritmus jako plocha](prirozeny-logaritmus.md#proc-prirozeny-ln-x-jako-plocha).
