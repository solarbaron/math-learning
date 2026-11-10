# Miller-Rabinův test

Pravděpodobnostní [test prvočíselnosti](testy-prvociselnosti.md), který se používá v praxi.
Je to zesílený [Fermatův test](fermatuv-test.md): kontroluje nejen $a^{n-1} \equiv 1$, ale i to, **jak** se k té jedničce
dojde. Díky tomu nepropustí Carmichaelova čísla.
{ .lead }

!!! definice "Postup pro liché $n$"
    1. Vyjádři $n - 1 = 2^s \cdot r$, kde $r$ je **liché** (dělej $n - 1$ dvojkou, dokud jde).
    2. Zvol náhodně $a$, $1 \le a \le n - 1$.
    3. Pokud $a^r \equiv 1 \pmod n$ → **projde**, jdi na bod 5.
    4. Jinak testuj pro $i = 0, 1, \dots, s - 1$, jestli
       $$a^{2^i r} \equiv n - 1 \pmod n$$
        - Platí pro nějaké $i$ → **projde**.
        - Neplatí pro žádné $i$ → $n$ je **určitě složené**, konec.
    5. Pokud prošlo, zvol další $a$ a opakuj od bodu 2, dokud nevyčerpáš iterace.
       Když projdou všechny iterace, je $n$ **pravděpodobně prvočíslo**.

Hodnoty $a^{2^i r}$ se počítají postupně: každá je **druhá mocnina** předchozí.

<div class="primetest" data-test="mr" data-n="29" data-a="10"></div>

!!! example "Příklad: je 29 prvočíslo? ($a = 10$)"
    1. $29 - 1 = 28 = 2^2 \cdot 7$ ⇒ $s = 2$, $r = 7$
    2. $a = 10$
    3. $10^7 \bmod 29 = 17 \ne 1$ → testuj dál
    4. - $i = 0$: $10^{1 \cdot 7} \bmod 29 = 17 \ne 28$
       - $i = 1$: $10^{2 \cdot 7} = 10^{14} \bmod 29 = 28 = n - 1$ ✓

    Prošlo, takže se zvolí další $a$ a test se opakuje. 29 opravdu je prvočíslo.

## Proč to funguje

Pro prvočíslo $n$ má rovnice $x^2 \equiv 1$ jen řešení $x \equiv \pm 1$. Posloupnost
$a^r, a^{2r}, a^{4r}, \dots, a^{2^s r} = a^{n-1}$ (každý člen je druhá mocnina předchozího) musí skončit
jedničkou (Fermat). Těsně před první jedničkou proto musí být $-1 \equiv n - 1$, nebo už začíná jedničkou.
Když tam je jiné číslo, našli jsme „odmocninu z 1", která není $\pm 1$, a $n$ nemůže být prvočíslo.

Tlačítko *Vyzkoušet všechna a* ukáže, že lhářů je mnohem méně než u Fermatova testu. I pro 561 (zkus).

??? question "Cvičení: je 21 prvočíslo? Je 127 prvočíslo?"
    **21**, $a = 2$: $20 = 2^2 \cdot 5$, $s = 2$, $r = 5$.
    $2^5 \bmod 21 = 11 \ne 1$; $i = 0$: $11 \ne 20$; $i = 1$: $11^2 \bmod 21 = 16 \ne 20$.
    ⇒ **21 je složené**.

    **127**, $a = 2$: $126 = 2^1 \cdot 63$, $s = 1$, $r = 63$. $2^{63} \bmod 127 = 1$ → projde.
    $a = 3$: $3^{63} \bmod 127 = 126 = n - 1$ ($i = 0$) → projde. ⇒ **pravděpodobně prvočíslo**.
