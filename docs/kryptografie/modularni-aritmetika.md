# Modulární aritmetika

Počítání „na hodinách": $a \bmod n$ je **zbytek po dělení** $a$ číslem $n$. Výsledek je vždy jedno
z čísel $0, 1, \dots, n-1$, a když se dojde na konec, začíná se znovu od nuly.
Na téhle aritmetice stojí [RSA](rsa.md), [Diffie-Hellman](diffie-hellman.md) i většina moderní kryptografie.
{ .lead }

!!! definice "Definice"
    $$a \bmod n = r, \quad \text{kde } a = q \cdot n + r,\ \ 0 \le r < n$$

    Číslo $n$ je **modul** (modulus), $q$ je podíl (zaokrouhlený dolů), $r$ je zbytek.

!!! example "Příklady"
    $7 \bmod 3 = 1$ ($7 = 2 \cdot 3 + 1$) · $5 \bmod 3 = 2$ · $6 \bmod 5 = 1$ · $10 \bmod 2 = 0$

## Na hodinách

Číslo $a$ = počet kroků po hodinách s $n$ dílky, začíná se na 0. Kde skončíš, to je $a \bmod n$.

<div class="modclock" data-a="17" data-n="5"></div>

Hodiny jsou přesně ten obrázek: v „uzavřené skupině" modulo $n$ existuje jen $n$ různých hodnot a po $n-1$ se
pokračuje nulou. Proto se modulo hodí na všechno, co se opakuje (dny v týdnu, hodiny, [Caesarova šifra](caesarova-sifra.md) s $\bmod 26$).

## Záporné číslo

!!! example "$-12 \bmod 5 = ?$"
    1. Najdi nejbližší násobek 5, který je **menší nebo rovný** $-12$: to je $-15$.
    2. Odečti: $-12 - (-15) = 3$.

    $$-12 \bmod 5 = 3$$

    Na hodinách to znamená jít 12 kroků **proti směru**:

<div class="modclock" data-a="-12" data-n="5"></div>

!!! warning "Pozor na kalkulačky a programy"
    Výsledek modula je vždy **nezáporný** ($0 \le r < n$). Některé programovací jazyky (C, Java, JavaScript)
    vrátí pro `-12 % 5` hodnotu `-2`. Pak stačí přičíst $n$: $-2 + 5 = 3$.

## Sčítání a násobení

Sčítat a násobit se dá normálně, jen se výsledek nakonec zmoduluje. Navíc se smí modulovat **i průběžně**,
čísla tak zůstanou malá:

$$(a + b) \bmod n = \big((a \bmod n) + (b \bmod n)\big) \bmod n$$

$$(a \cdot b) \bmod n = \big((a \bmod n) \cdot (b \bmod n)\big) \bmod n$$

!!! example "Příklady"
    $(11 + 1) \bmod 3 = 12 \bmod 3 = 0$ · $(7 \cdot 2) \bmod 4 = 14 \bmod 4 = 2$

    Průběžně: $(1234 \cdot 5678) \bmod 10 = (4 \cdot 8) \bmod 10 = 2$, poslední cifra součinu.

Zápis ze cvičení „$10 + 2 \bmod 3$" znamená $(10 + 2) \bmod 3$: modulo se aplikuje na celý výraz.

Dělení takhle nefunguje. Místo něj se násobí [inverzním prvkem](inverzni-prvek.md).
Umocňování velkými exponenty řeší [modulární mocnění](modularni-mocneni.md).
Dvě čísla se stejným zbytkem jsou [kongruentní](kongruence.md).

??? question "Cvičení: $6 \cdot 4 \bmod 5$, $5 \cdot 2 \bmod 7$, $10 + 2 \bmod 3$, $8 + 10 \bmod 7$"
    - $24 \bmod 5 = 4$
    - $10 \bmod 7 = 3$
    - $12 \bmod 3 = 0$
    - $18 \bmod 7 = 4$

??? question "Cvičení: $-10 \bmod 3$, $-9 \bmod 2$, $-13 \bmod 8$, $-17 \bmod 11$"
    - $-10 - (-12) = 2$
    - $-9 - (-10) = 1$
    - $-13 - (-16) = 3$
    - $-17 - (-22) = 5$
