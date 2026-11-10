# Malá Fermatova a Eulerova věta

Dvě věty, které drasticky zjednoduší [modulární mocnění](modularni-mocneni.md): obrovský exponent
se dá **zmodulovat** a místo $46^{158673}$ se počítá třeba $2^3$.
{ .lead }

## Malá Fermatova věta

!!! veta "Malá Fermatova věta"
    Pro **prvočíslo** $p$ a celé číslo $a$ nesoudělné s $p$, tedy $\mathrm{GCD}(a, p) = 1$:

    $$a^{p-1} \equiv 1 \pmod p$$

    Obecněji pro každé $a$: $a^p \equiv a \pmod p$.

Důsledek: mocniny $a$ se modulo $p$ opakují s periodou $p - 1$. Exponent se proto smí zmenšit modulo $p - 1$:

$$a^r \equiv a^{\,r \bmod (p-1)} \pmod p$$

!!! definice "Postup pro $a^e \bmod p$, $p$ prvočíslo"
    1. Ověř $\mathrm{GCD}(a, p) = 1$.
    2. **Základ** nahraď $a \bmod p$.
    3. **Exponent** nahraď $e \bmod (p - 1)$.
    4. Spočítej, co zbylo.

!!! example "Příklad: $46^{51} \bmod 11$"
    11 je prvočíslo, $\mathrm{GCD}(46, 11) = 1$.

    - základ: $46 \bmod 11 = 2$
    - exponent: $51 \bmod 10 = 1$
    - $2^1 \bmod 11 = \mathbf{2}$

## Eulerova věta

Zobecnění pro **libovolný** modul $n$. Místo $p - 1$ je tam [Eulerova funkce](eulerova-funkce.md) $\varphi(n)$
(pro prvočíslo je $\varphi(p) = p - 1$, takže Fermatova věta je speciální případ).

!!! veta "Eulerova věta"
    Pro $\mathrm{GCD}(a, n) = 1$:

    $$a^{\varphi(n)} \equiv 1 \pmod n$$

    Exponent se smí zmenšit modulo $\varphi(n)$: $\quad a^e \equiv (a \bmod n)^{\,e \bmod \varphi(n)} \pmod n$

!!! example "Příklad: $46^{51} \bmod 15$"
    - $\mathrm{GCD}(46, 15) = 1$ ($46 = 2 \cdot 23$, $15 = 3 \cdot 5$) ✓
    - základ: $46 \bmod 15 = 1$
    - $\varphi(15) = 15 \cdot (1 - \frac13)(1 - \frac15) = 8$, exponent: $51 \bmod 8 = 3$
    - $1^3 \bmod 15 = \mathbf{1}$

<div class="reduce" data-a="46" data-e="158673" data-n="11"></div>

!!! warning "Podmínka nesoudělnosti"
    Když $\mathrm{GCD}(a, n) \ne 1$, věta **neplatí** a exponent se zmenšit nesmí. Například $2^{\varphi(4)} = 2^2 = 4 \equiv 0 \pmod 4$, ne 1.

## Inverzní prvek přes Eulerovu větu

Z $a^{\varphi(n)} = a \cdot a^{\varphi(n) - 1} \equiv 1$ plyne:

!!! veta "Inverze"
    $$a^{-1} \equiv a^{\varphi(n) - 1} \pmod n \qquad (\mathrm{GCD}(a, n) = 1)$$

!!! example "Příklad: $7^{-1} \bmod 10$"
    $\mathrm{GCD}(7, 10) = 1$, $\varphi(10) = \varphi(2) \cdot \varphi(5) = 1 \cdot 4 = 4$

    $$7^{-1} = 7^{4 - 1} \bmod 10 = 343 \bmod 10 = 3$$

    Zkouška: $7 \cdot 3 = 21 \equiv 1 \pmod{10}$ ✓

Další způsoby: hrubou silou a [rozšířeným Eukleidovým algoritmem](rozsireny-eukleiduv-algoritmus.md), viz [Inverzní prvek](inverzni-prvek.md).

Malá Fermatova věta je také základ [Fermatova testu prvočíselnosti](fermatuv-test.md).

??? question "Cvičení (Fermat): $3^{201} \bmod 11$, $46^{158673} \bmod 11$"
    - $201 \bmod 10 = 1$ ⇒ $3^1 = \mathbf{3}$
    - $46 \bmod 11 = 2$, $158673 \bmod 10 = 3$ ⇒ $2^3 = \mathbf{8}$

??? question "Cvičení (Euler): $52^{158670} \bmod 5$, $28^{1202} \bmod 13$"
    - $52 \bmod 5 = 2$, $\varphi(5) = 4$, $158670 \bmod 4 = 2$ ⇒ $2^2 = \mathbf{4}$
    - $28 \bmod 13 = 2$, $\varphi(13) = 12$, $1202 \bmod 12 = 2$ ⇒ $2^2 = \mathbf{4}$

??? question "Cvičení: $4^{-1} \bmod 11$ pomocí Eulerovy věty"
    $\varphi(11) = 10$, $4^{-1} = 4^9 \bmod 11$. $4^2 = 16 \equiv 5$, $4^4 \equiv 25 \equiv 3$, $4^8 \equiv 9$, $4^9 \equiv 9 \cdot 4 = 36 \equiv \mathbf{3}$.

    Zkouška: $4 \cdot 3 = 12 \equiv 1$ ✓
