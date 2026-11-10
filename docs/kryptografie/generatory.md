# Generátory multiplikativní grupy

**Generátor** $g$ grupy $\mathbb{Z}_n^*$ je prvek, jehož mocniny $g, g^2, g^3, \dots$ (modulo $n$) projdou
**všechny** prvky grupy, než se vrátí na 1. Generátory potřebuje [Diffie-Hellman](diffie-hellman.md) a [DSA](dsa.md).
{ .lead }

Šipky ukazují $g \to g^2 \to g^3 \to \dots$ Generátor obejde celý kruh, ostatní prvky se zacyklí dřív:

<div class="generator" data-n="23" data-g="5"></div>

!!! definice "Řád prvku"
    Nejmenší $k \ge 1$ s $g^k \equiv 1 \pmod n$. Podle [Eulerovy věty](fermatova-a-eulerova-veta.md) vždy platí
    $g^{\varphi(n)} \equiv 1$ a řád **dělí** $\varphi(n)$.

    $g$ je generátor $\iff$ řád $g$ je přesně $\varphi(n)$.

## Test generátoru

Vypisovat všechny mocniny je zdlouhavé. Stačí ověřit **dělitele** $\varphi(n)$:

!!! veta "Test"
    Rozlož $\varphi(n) = p_1^{k_1} \cdots p_r^{k_r}$. Číslo $g$ je generátor, právě když pro **každé** prvočíslo $p_i$

    $$g^{\varphi(n) / p_i} \not\equiv 1 \pmod n$$

    Jakmile u některého $p_i$ vyjde 1, $g$ **není** generátor.

**Počet generátorů** (pokud nějaký existuje) je $\varphi(\varphi(n))$.

!!! example "Příklad: $\mathbb{Z}_{23}^*$"
    $\varphi(23) = 22 = 2 \cdot 11$. Generátorů je $\varphi(22) = \varphi(2) \cdot \varphi(11) = 1 \cdot 10 = 10$.

    Testuje se $g^{22/2} = g^{11}$ a $g^{22/11} = g^{2}$:

    | $g$ | $g^{11} \bmod 23$ | $g^{2} \bmod 23$ | |
    |---|---|---|---|
    | 2 | **1** | 4 | není generátor |
    | 5 | 22 | 2 | **je** generátor |

    Generátory $\mathbb{Z}_{23}^*$: 5, 7, 10, 11, 14, 15, 17, 19, 20, 21.

!!! note "Ne každá grupa má generátor"
    $\mathbb{Z}_n^*$ má generátor jen pro $n = 2, 4, p^k, 2p^k$ ($p$ liché prvočíslo). Například $\mathbb{Z}_8^* = \{1, 3, 5, 7\}$
    nemá: každý prvek na druhou dá 1. Pro kryptografii se proto používá $\mathbb{Z}_p^*$ s prvočíslem $p$.

??? question "Cvičení: počet a hodnoty generátorů $\mathbb{Z}_7^*$"
    $\varphi(7) = 6 = 2 \cdot 3$, generátorů je $\varphi(6) = 2$. Test: $g^{3}$ a $g^{2}$ modulo 7.

    | $g$ | $g^3$ | $g^2$ | |
    |---|---|---|---|
    | 2 | **1** | 4 | ✗ |
    | 3 | 6 | 2 | ✓ |
    | 4 | **1** | 2 | ✗ |
    | 5 | 6 | 4 | ✓ |
    | 6 | 6 | **1** | ✗ |

    Generátory: **3 a 5**. Například $3^1, \dots, 3^6 = 3, 2, 6, 4, 5, 1$.
