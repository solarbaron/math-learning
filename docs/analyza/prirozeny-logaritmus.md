# Přirozený logaritmus

**Přirozený logaritmus** $\ln x$ je logaritmus o základu [$e$](eulerovo-cislo.md). Odpovídá na otázku:
*„na kolikátou musím umocnit $e$, abych dostal $x$?"* Je to opačná (inverzní) funkce k $e^x$.
{ .lead }

!!! definice "Definice"
    $$\ln x = y \iff e^y = x \qquad (x > 0)$$

    Tedy $\ln x = \log_e x$. Platí $e^{\ln x} = x$ a $\ln(e^y) = y$.

!!! example "Příklady"
    - $\ln 1 = 0$, protože $e^0 = 1$
    - $\ln e = 1$, protože $e^1 = e$
    - $\ln e^3 = 3$, $\ \ln \frac1e = -1$, $\ \ln \sqrt{e} = \frac12$
    - $\ln 2 \approx 0{,}693$, $\ \ln 10 \approx 2{,}303$
    - $\ln 0$ ani $\ln(-1)$ **neexistuje** — $e^y$ je vždy kladné

!!! warning "Značení"
    $\ln x$ = přirozený (základ $e$). V české škole $\log x$ = **desítkový** (základ 10).
    V angličtině a v programování (`Math.log`, `numpy.log`) ale `log` často znamená **přirozený** logaritmus!

## Graf

Graf $\ln x$ je graf $e^x$ překlopený podle přímky $y = x$ (tak to u inverzních funkcí chodí):

<div class="plot" data-fns="exp(x); ln(x); x" data-labels="y = eˣ; y = ln x; y = x" data-dashed="2"
     data-x="-3,6" data-y="-3,6" data-points="0,1,(0; 1) | 1,0,(1; 0) | 1,2.71828,(1; e) | 2.71828,1,(e; 1)"></div>

| | $e^x$ | $\ln x$ |
|---|---|---|
| definiční obor | $\mathbb{R}$ | $(0; \infty)$ |
| obor hodnot | $(0; \infty)$ | $\mathbb{R}$ |
| význačný bod | $(0; 1)$ | $(1; 0)$ |
| roste | velmi rychle | velmi pomalu ($\ln 1\,000\,000 \approx 13{,}8$) |
| [limita](limita-funkce.md) | $\lim_{x \to -\infty} e^x = 0$ | $\lim_{x \to 0^+} \ln x = -\infty$ |

## Pravidla

| Pravidlo | Příklad |
|---|---|
| $\ln(a \cdot b) = \ln a + \ln b$ | $\ln 6 = \ln 2 + \ln 3$ |
| $\ln \dfrac{a}{b} = \ln a - \ln b$ | $\ln 12 - \ln 3 = \ln 4$ |
| $\ln a^k = k \ln a$ | $\ln 8 = 3 \ln 2$, $\ \ln \sqrt{x} = \frac12 \ln x$ |
| $\ln 1 = 0$, $\ln e = 1$ | |
| $\log_a x = \dfrac{\ln x}{\ln a}$ | $\log_2 10 = \frac{\ln 10}{\ln 2} \approx 3{,}32$ |
| $a^x = e^{x \ln a}$ | $2^x = e^{x \ln 2}$ |

!!! warning "Co neplatí"
    $\ln(a + b) \neq \ln a + \ln b$ a $\ (\ln x)^2 \neq \ln x^2 = 2\ln x$.

!!! example "Úpravy"
    - $2 \ln 3 + \ln 2 = \ln 9 + \ln 2 = \ln 18$
    - $\ln \dfrac{x^2 \sqrt{y}}{z} = 2 \ln x + \frac12 \ln y - \ln z$

## Rovnice

Logaritmus „stáhne" neznámou z exponentu, exponenciála ji vytáhne z logaritmu:

!!! example "Řešené rovnice"
    1. $e^x = 5 \;\Rightarrow\; x = \ln 5 \approx 1{,}609$
    2. $e^{2x} = 7 \;\Rightarrow\; 2x = \ln 7 \;\Rightarrow\; x = \frac{\ln 7}{2} \approx 0{,}973$
    3. $\ln x = 2 \;\Rightarrow\; x = e^2 \approx 7{,}389$
    4. $3^x = 10 \;\Rightarrow\; x \ln 3 = \ln 10 \;\Rightarrow\; x = \frac{\ln 10}{\ln 3} \approx 2{,}096$
    5. $\ln(x - 1) + \ln(x + 1) = \ln 3 \;\Rightarrow\; \ln(x^2 - 1) = \ln 3 \;\Rightarrow\; x^2 = 4 \;\Rightarrow\; x = 2$
       ($x = -2$ nevyhovuje, $\ln(-3)$ neexistuje — vždy dělej zkoušku!)

!!! example "Z praxe: doba zdvojnásobení"
    Populace roste podle $N(t) = N_0 e^{0{,}03 t}$ ($3\,\%$ ročně, spojitě). Kdy se zdvojnásobí?

    $$e^{0{,}03 t} = 2 \;\Rightarrow\; 0{,}03\,t = \ln 2 \;\Rightarrow\; t = \frac{\ln 2}{0{,}03} \approx 23{,}1 \text{ let}$$

## Proč „přirozený": $\ln x$ jako plocha

Plocha pod hyperbolou $y = \frac1t$ od $1$ do $x$ je přesně $\ln x$. Posuň horní mez $b$:

<div class="riemann" data-f="1/x" data-a="1" data-b="2.71828" data-n="8" data-bslider="0.25,6" data-compare="ln(b)" data-x="0,6.5" data-y="-0.5,3"></div>

Pro $b = e$ je plocha přesně $1$. Pro $b < 1$ vyjde záporná (integrujeme „pozpátku").
Proto $\ln$ vyskakuje v analýze všude:

- [derivace](pravidla-derivovani.md): $(\ln x)' = \dfrac1x$
- [integrál](neurcity-integral.md): $\displaystyle\int \frac{1}{x}\,dx = \ln|x| + C$ — jediná mocnina $x^{-1}$, na kterou nefunguje vzorec $\frac{x^{n+1}}{n+1}$
- [limity](vypocet-limit.md): $\lim\limits_{x \to 0} \dfrac{\ln(1 + x)}{x} = 1$
- [derivace](pravidla-derivovani.md#exponencialni-a-logaritmicke-funkce) obecné mocniny: $(a^x)' = a^x \ln a$

## Cvičení

??? question "Zjednoduš $\ln e^5 - \ln 1 + e^{\ln 3}$"
    $5 - 0 + 3 = 8$

??? question "Vyřeš $e^{x+1} = 20$"
    $x + 1 = \ln 20 \Rightarrow x = \ln 20 - 1 \approx 2{,}0$

??? question "Vyřeš $\ln(2x) = 3$"
    $2x = e^3 \Rightarrow x = \frac{e^3}{2} \approx 10{,}04$

??? question "Zapiš jako jeden logaritmus: $3\ln 2 - \ln 4 + \ln 5$"
    $\ln 8 - \ln 4 + \ln 5 = \ln \frac{8 \cdot 5}{4} = \ln 10$

??? question "Radioaktivní látka se rozpadá podle $N = N_0 e^{-0{,}1 t}$. Za jak dlouho zbude polovina?"
    $e^{-0{,}1 t} = \frac12 \Rightarrow -0{,}1 t = -\ln 2 \Rightarrow t = 10 \ln 2 \approx 6{,}93$ (poločas rozpadu).
