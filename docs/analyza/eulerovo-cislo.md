# Eulerovo číslo e

$$e = 2{,}718\,281\,828\,459\ldots$$

Iracionální konstanta, která se objevuje všude, kde něco roste (nebo klesá) **úměrně tomu, kolik toho je** —
úroky, populace, rozpad, ochlazování. Je to základ [přirozeného logaritmu](prirozeny-logaritmus.md).
{ .lead }

## Odkud se bere: úročení

Uložíš $1$ Kč na rok s úrokem $100\,\%$. Kolik budeš mít na konci roku?

| Úročení | Výpočet | Výsledek |
|---|---|---|
| jednou ročně | $(1 + 1)^1$ | $2$ |
| dvakrát (po půl roce $50\,\%$) | $(1 + \frac12)^2$ | $2{,}25$ |
| měsíčně | $(1 + \frac{1}{12})^{12}$ | $2{,}613$ |
| denně | $(1 + \frac{1}{365})^{365}$ | $2{,}7146$ |
| „spojitě" ($n \to \infty$) | $\lim\limits_{n \to \infty} (1 + \frac1n)^n$ | $e = 2{,}71828\ldots$ |

Čím častěji se úročí, tím víc — ale ne nekonečně. Výsledek se zastaví na čísle $e$.

!!! definice "Definice"
    $$e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$$

    (viz [limita posloupnosti](limita-posloupnosti.md)).

<div class="sequence" data-a="(1+1/n)^n" data-limit="e" data-n="40"></div>

## Jiný zápis: nekonečná řada

$$e = 1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \frac{1}{4!} + \dots = 1 + 1 + \frac12 + \frac16 + \frac1{24} + \dots$$

Konverguje velmi rychle: prvních šest členů dá $2{,}7167$.

## Proč je $e^x$ výjimečná

!!! veta "Klíčová vlastnost"
    $$(e^x)' = e^x$$

    Funkce $e^x$ je svou vlastní [derivací](derivace.md): v každém bodě je směrnice tečny rovna hodnotě funkce.
    Jiná exponenciála $a^x$ tohle nemá: $(a^x)' = a^x \ln a$, a $\ln a = 1$ jen pro $a = e$.

<div class="tangent" data-f="exp(x)" data-x0="0.5" data-x="-3,2.5" data-y="-1,7"></div>

Posuň bod $x_0$ — hodnota $f'(x_0)$ je vždy stejná jako $e^{x_0}$ (výška bodu).

Proto se v analýze skoro všechny exponenciály převádí na základ $e$: $a^x = e^{x \ln a}$.

## Kde se $e$ objevuje

- **spojitý růst a rozpad:** $N(t) = N_0 e^{kt}$ (populace, radioaktivita, úroky)
- **přirozený logaritmus** $\ln x = \log_e x$ — viz [Přirozený logaritmus](prirozeny-logaritmus.md)
- **Gaussova křivka** v pravděpodobnosti: $e^{-x^2/2}$
- **Eulerova rovnost:** $e^{i\pi} + 1 = 0$ — spojuje $e$, $\pi$, $i$, $1$ a $0$
