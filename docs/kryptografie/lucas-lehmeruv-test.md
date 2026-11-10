# Lucas-Lehmerův test

**Jistý** [test prvočíselnosti](testy-prvociselnosti.md), na 100 % rozhodne, ale jen pro **Mersennova čísla**
$n = 2^s - 1$. Je výpočetně náročnější, proto se volí až naposled, po rychlých pravděpodobnostních testech.
Tímhle testem se hledají největší známá prvočísla.
{ .lead }

!!! definice "Mersennovo číslo"
    $M_s = 2^s - 1$. Aby mohlo být prvočíslem, musí být prvočíslem už $s$
    (např. $2^4 - 1 = 15$ není). Ne každé $s$ ale stačí: $2^{11} - 1 = 2047 = 23 \cdot 89$.

!!! veta "Lucas-Lehmerův test"
    Pro liché prvočíslo $s$ a $n = 2^s - 1$ definuj

    $$u_0 = 4, \qquad u_{k+1} = (u_k^2 - 2) \bmod n$$

    $n$ je prvočíslo $\iff u_{s-2} = 0$.

<div class="primetest" data-test="ll" data-n="5"></div>

!!! example "Příklad: je 31 Mersennovo prvočíslo?"
    $31 = 2^5 - 1$ ⇒ $s = 5$, počítá se do $u_{s-2} = u_3$:

    $$
    \begin{aligned}
    u_0 &= 4 \\
    u_1 &= (4^2 - 2) \bmod 31 = 14 \\
    u_2 &= (14^2 - 2) \bmod 31 = 194 \bmod 31 = 8 \\
    u_3 &= (8^2 - 2) \bmod 31 = 62 \bmod 31 = 0
    \end{aligned}
    $$

    $u_3 = 0$ ⇒ **31 je Mersennovo prvočíslo**.

??? question "Cvičení: jsou 127 a 2047 Mersennova prvočísla?"
    **127** $= 2^7 - 1$, $s = 7$, do $u_5$: $\ 4, 14, 67, 42, 111, \mathbf{0}$ ⇒ **je** prvočíslo.

    **2047** $= 2^{11} - 1$, $s = 11$, do $u_9$: $\ 4, 14, 194, 788, 701, 119, 1877, 240, 282, \mathbf{1736}$ ⇒ $u_9 \ne 0$, **není** prvočíslo ($2047 = 23 \cdot 89$).

Ve widgetu zkus $p = 127$: číslo $2^{127} - 1$ má 39 číslic a test proběhne okamžitě.
