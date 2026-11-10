# Fermatův test

Pravděpodobnostní [test prvočíselnosti](testy-prvociselnosti.md) založený na
[Malé Fermatově větě](fermatova-a-eulerova-veta.md): pro prvočíslo $n$ a nesoudělné $a$ platí $a^{n-1} \equiv 1 \pmod n$.
Když to **neplatí**, $n$ prvočíslo určitě není.
{ .lead }

!!! definice "Postup"
    1. Zvol náhodně $a$ z rozsahu $1 \le a \le n - 1$.
    2. Spočítej $a^{n-1} \bmod n$ ([Square and Multiply](modularni-mocneni.md#metoda-2-square-and-multiply)).
    3. - Výsledek $\ne 1$ ⇒ $n$ je **určitě složené**.
       - Výsledek $= 1$ ⇒ $n$ je **pravděpodobně prvočíslo**. Zkus ještě aspoň dvě další $a$.

<div class="primetest" data-test="fermat" data-n="21" data-a="2"></div>

!!! example "Příklad: je 21 prvočíslo? ($a = 2$)"
    $2^{20} \bmod 21$, $\ 20_{10} = 10100_2$:

    | $i$ | $k_i$ | $b = 1$ | $a = 2$ |
    |---|---|---|---|
    | 0 | 0 | 1 | 2 |
    | 1 | 0 | 1 | $2^2 \bmod 21 = 4$ |
    | 2 | 1 | $16 \cdot 1 \bmod 21 = 16$ | $4^2 \bmod 21 = 16$ |
    | 3 | 0 | 16 | $16^2 \bmod 21 = 4$ |
    | 4 | 1 | $16 \cdot 16 \bmod 21 = 4$ | $4^2 \bmod 21 = 16$ |

    $2^{20} \bmod 21 = 4 \not\equiv 1$ ⇒ **21 není prvočíslo** (21 = 3 · 7).

## Lháři

Kdybychom pro 21 zvolili $a = 20$, vyšlo by $20^{20} \bmod 21 = 1$, protože $20 \equiv -1$ a sudá mocnina dá 1.
Test by „prošel". Takové $a$ se jmenuje **Fermatův lhář**. Tlačítkem *Vyzkoušet všechna a* je vidět, kolik jich je.

!!! warning "Carmichaelova čísla"
    Některá složená čísla projdou Fermatovým testem pro **všechna** nesoudělná $a$. Nejmenší je
    $561 = 3 \cdot 11 \cdot 17$. Zkus ve widgetu $n = 561$. Proto se v praxi používá
    [Miller-Rabinův test](miller-rabinuv-test.md).

??? question "Cvičení: je 127 prvočíslo?"
    $a = 2$: $2^{126} \bmod 127 = 1$ (dokonce $2^7 = 128 \equiv 1$, takže $2^{126} = (2^7)^{18} \equiv 1$).

    $a = 3$: $3^{126} \bmod 127 = 1$. Pravděpodobně prvočíslo, a opravdu je.
