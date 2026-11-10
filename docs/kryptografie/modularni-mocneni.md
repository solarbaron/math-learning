# Modulární mocnění

Výpočet $a^b \bmod n$ ($a$ základ, $b$ exponent, $n$ modul). Je v jádru [RSA](rsa.md), [Diffie-Hellmana](diffie-hellman.md)
i [testů prvočíselnosti](testy-prvociselnosti.md). Exponenty tam mají stovky číslic, takže $a^b$ nejde spočítat celé.
Trik: **modulovat průběžně** a mocnit **opakovaným umocňováním na druhou**.
{ .lead }

## Metoda 1: rozklad mocniny

Exponent rozlož na součet menších a mocniny vynásob. Každý mezivýsledek hned zmoduluj
(smí se, viz [modulární aritmetika](modularni-aritmetika.md#scitani-a-nasobeni)).

!!! example "Příklad: $23^6 \bmod 123$"
    $6 = 3 + 2 + 1$, takže $23^6 = 23^3 \cdot 23^2 \cdot 23^1$:

    $$23^3 \bmod 123 = 113, \quad 23^2 \bmod 123 = 37, \quad 23^1 = 23$$

    $$(113 \cdot 37 \cdot 23) \bmod 123 = 100$$

!!! example "Příklad: $88^7 \bmod 187$"
    $7 = 4 + 2 + 1$: $\quad 88^4 \bmod 187 = 132,\ 88^2 \bmod 187 = 77,\ 88^1 = 88$

    $$(132 \cdot 77 \cdot 88) \bmod 187 = 11$$

Nejvýhodnější je rozkládat na **mocniny dvojky** ($88^4 = (88^2)^2$, jen se umocní předchozí výsledek). To je přesně další metoda.

## Metoda 2: Square and Multiply

Exponent zapiš **binárně**. Pak

$$a^b = a^{\sum k_i 2^i} = \prod_{k_i = 1} a^{2^i}$$

Stačí tedy postupně počítat $a, a^2, a^4, a^8, \dots$ (každé je druhá mocnina předchozího) a vynásobit ty,
u kterých je v binárním zápisu jednička.

!!! definice "Postup (tabulka ze cvičení)"
    1. Exponent převeď do dvojkové soustavy. Tabulka jde od **nejnižšího bitu** (vpravo, LSB), řádky $i = 0, 1, 2, \dots$
    2. Sloupec $a$: v prvním řádku **opiš** $a$, v dalších **umocni předchozí na druhou**: $a^2 \bmod n$.
    3. Sloupec $b$ začíná na $b = 1$:
        - $k_i = 0$ → $b$ **opiš**,
        - $k_i = 1$ → $b = a \cdot b \bmod n$ (s $a$ z téhož řádku).
    4. Výsledek je **poslední $b$**.

<div class="sqmul" data-a="3" data-e="33" data-n="17"></div>

!!! example "Příklad: $5^{35} \bmod 17$"
    $35_{10} = 100011_2$

    | $i$ | $k_i$ | $b = 1$ | $a = 5$ |
    |---|---|---|---|
    | 0 | 1 | $5 \cdot 1 \bmod 17 = 5$ | $5$ |
    | 1 | 1 | $8 \cdot 5 \bmod 17 = 6$ | $5^2 \bmod 17 = 8$ |
    | 2 | 0 | $6$ | $8^2 \bmod 17 = 13$ |
    | 3 | 0 | $6$ | $13^2 \bmod 17 = 16$ |
    | 4 | 0 | $6$ | $16^2 \bmod 17 = 1$ |
    | 5 | 1 | $1 \cdot 6 \bmod 17 = 6$ | $1^2 \bmod 17 = 1$ |

    $$5^{35} \bmod 17 = 6$$

Místo 34 násobení jich stačí 7 (5 umocnění na druhou a 2 násobení do $b$). Pro exponent s 2048 bity je to asi 3000 násobení místo $2^{2048}$, čili rozdíl mezi zlomkem sekundy a nekonečnem.

Když je modul prvočíslo, dá se exponent ještě předem zmenšit: [Malá Fermatova věta](fermatova-a-eulerova-veta.md).

??? question "Cvičení (rozkladem): $22^9 \bmod 135$, $66^8 \bmod 92$"
    - $22^9 = 22^8 \cdot 22$: $22^2 \bmod 135 = 79$, $22^4 \bmod 135= 79^2 \bmod 135 = 31$, $22^8 \bmod 135 = 31^2 \bmod 135 = 16$.
      $(16 \cdot 22) \bmod 135 = \mathbf{82}$
    - $66^2 \bmod 92 = 32$, $66^4 \bmod 92 = 32^2 \bmod 92 = 12$, $66^8 \bmod 92 = 12^2 \bmod 92 = \mathbf{52}$

??? question "Cvičení (Square and Multiply): $5^6 \bmod 13$, $5^{20} \bmod 7$, $5^{21} \bmod 7$"
    - $5^6 \bmod 13 = \mathbf{12}$ ($6 = 110_2$)
    - $5^{20} \bmod 7 = \mathbf{4}$ ($20 = 10100_2$)
    - $5^{21} \bmod 7 = \mathbf{6}$ ($21 = 10101_2$, o jedno násobení pětkou víc: $4 \cdot 5 \bmod 7 = 6$)

    Ověř ve widgetu nahoře.
