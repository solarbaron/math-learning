# Diffie-Hellman

Protokol, kterým se dvě strany **dohodnou na společném tajném klíči přes veřejný kanál**. Kdo celou
komunikaci odposlouchává, klíč nezjistí. Ustanovený klíč se pak použije pro rychlou symetrickou šifru.
Bezpečnost stojí na **problému diskrétního logaritmu**.
{ .lead }

## Parametry

Veřejně se zvolí tři čísla:

- **modul** $n$: velké prvočíslo (aspoň 3072 bitů),
- **řád podgrupy** $q$: prvočíslo, které dělí $n - 1$ (aspoň 256 bitů),
- **generátor podgrupy** $g \in \langle 2;\ n-2 \rangle$ s $g^q \bmod n = 1$. Prvek $g$ má řád $q$.
  Nemusí to být [generátor celé grupy](generatory.md).

## Postup

1. Zvol modul $n$ (prvočíslo).
2. Zvol prvočíslo $q$, které dělí $n - 1$.
3. Najdi $g$ z rozsahu $\langle 2;\ n-2 \rangle$, pro které $g^q \bmod n = 1$.
4. Každá strana si vygeneruje **tajné** náhodné číslo z $\langle 1;\ q-1 \rangle$: strana A číslo $a$, strana B číslo $b$.
5. Každá spočítá svůj mezivýsledek: $\ A = g^a \bmod n$, $\ B = g^b \bmod n$.
6. Strany si **vymění** $A$ a $B$ veřejným kanálem.
7. Každá spočítá klíč: $\ K = B^a \bmod n$, $\ K' = A^b \bmod n$. Platí $K = K'$.

$$K' = A^b = (g^a)^b = g^{ab} = (g^b)^a = B^a = K \pmod n$$

<div class="dh" data-n="23" data-g="6" data-q="11" data-a="7" data-b="8"></div>

!!! example "Příklad ze cvičení"
    1. $n = 23$
    2. $n - 1 = 22 = 2 \cdot 11$ ⇒ $q = 11$
    3. $g = 6$: $\ 6^{11} \bmod 23 = 1$ ✓ (6 má řád 11, celou grupu negeneruje)
    4. $a = 7$, $b = 8$
    5. $A = 6^7 \bmod 23 = 3$, $\ B = 6^8 \bmod 23 = 18$
    6. výměna $A$ a $B$
    7. $K = 18^7 \bmod 23 = 6$, $\ K' = 3^8 \bmod 23 = 6$ ✓

!!! example "Příklad: $n = 47$"
    $n - 1 = 46 = 2 \cdot 23$ ⇒ $q = 23$. Zvolíme $g = 21$: $21^{23} \bmod 47 = 1$ ✓.

    | Strana A | Strana B |
    |---|---|
    | $a = 11$ | $b = 10$ |
    | $A = 21^{11} \bmod 47 = 3$ | $B = 21^{10} \bmod 47 = 27$ |
    | $K = 27^{11} \bmod 47 = 17$ | $K' = 3^{10} \bmod 47 = 17$ |

## Diskrétní logaritmus

Útočník zachytí $A = 3$ a $B = 27$ a zná $n = 47$, $g = 21$. Aby zjistil $a$, musí vyřešit

$$21^a \equiv 3 \pmod{47}, \qquad a \in \{1, \dots, 22\}$$

Obyčejný logaritmus nepomůže ($\log_{21} 3 \approx 0{,}36$), pracuje se jen s celými čísly modulo $n$.
Pro malé $n$ stačí zkusit všechna $a$. Pro $n$ s 2048 bity a $q$ s 224 bity to v polynomiálním čase spočítat nejde.

!!! warning "Slabina: chybí autentizace"
    Diffie-Hellman neověřuje, **s kým** se klíč ustanovuje. Útočník uprostřed se může vydávat za obě strany,
    viz [Útok muž uprostřed](utok-muz-uprostred.md). Tlačítkem *Útočník uprostřed* ve widgetu to uvidíš.

??? question "Cvičení: $n = 23$, $g = 2$, $a = 5$, $b = 9$"
    Řád: $2^{11} \bmod 23 = 1$ ✓, $g$ má prvočíselný řád $q = 11$.

    $A = 2^5 \bmod 23 = 32 \bmod 23 = \mathbf{9}$, $\ B = 2^9 \bmod 23 = 512 \bmod 23 = \mathbf{6}$

    $K = 6^5 \bmod 23 = \mathbf{2}$, $\ K' = 9^9 \bmod 23 = \mathbf{2}$ ✓
