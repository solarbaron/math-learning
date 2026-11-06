# Eukleidův algoritmus

Nejstarší dodnes používaný algoritmus (asi 300 let př. n. l.). Najde [NSD](nsd.md) dvou čísel bez rozkladu na prvočísla —
jen opakovaným dělením se zbytkem.
{ .lead }

## Postup

1. Vyděl větší číslo menším se zbytkem: $a = q \cdot b + r$.
2. Nahraď dvojici $(a, b)$ dvojicí $(b, r)$.
3. Opakuj, dokud zbytek není $0$. **Poslední nenulový zbytek** je $D(a, b)$.

!!! example "Příklad: $D(48, 18)$"
    $$
    \begin{aligned}
    48 &= 2 \cdot 18 + 12 \\
    18 &= 1 \cdot 12 + \mathbf{6} \\
    12 &= 2 \cdot 6 + 0
    \end{aligned}
    $$

    $D(48, 18) = 6$

## Proč to funguje

!!! veta "Klíčová věta"
    $$D(a, b) = D(b, r), \qquad \text{kde } r \text{ je zbytek po dělení } a : b$$

Každý společný dělitel $a$ a $b$ dělí i $r = a - q \cdot b$ (rozdíl násobků, viz [vlastnosti dělitelnosti](delitel-a-nasobek.md#vlastnosti)).
A naopak každý společný dělitel $b$ a $r$ dělí i $a = q \cdot b + r$.
Dvojice $(a, b)$ a $(b, r)$ mají tedy **stejné** společné dělitele — a tím i stejný největší.
Čísla se přitom pořád zmenšují, takže algoritmus jednou skončí, a to s $D(g, 0) = g$.

## Geometricky: dláždění čtverci

Obdélník $a \times b$ krájej na **co největší čtverce**. Ze zbytku zase odřízni co největší čtverce, a tak dál.
Počet čtverců v kroku je podíl $q$, zbývající obdélník má stranu $r$.
Nejmenší čtverec, kterým to skončí, vydláždí **celý** původní obdélník — jeho strana je $D(a, b)$.

<div class="euclid" data-a="48" data-b="18"></div>

Zkus třeba $21 \times 13$ (Fibonacciho čísla — nejvíc kroků na tak malá čísla) nebo $100 \times 35$.

## Je to rychlé

Zbytek se nejméně každé dva kroky zmenší na polovinu. I pro čísla s desítkami cifer stačí pár desítek kroků —
zatímco rozložit velké číslo na prvočísla je extrémně pomalé (na tom stojí šifrování RSA).

!!! example "Příklad: $D(1071, 462)$"
    $$
    \begin{aligned}
    1071 &= 2 \cdot 462 + 147 \\
    462 &= 3 \cdot 147 + \mathbf{21} \\
    147 &= 7 \cdot 21 + 0
    \end{aligned}
    $$

    $D(1071, 462) = 21$ — tři kroky.

??? note "V programu"
    ```python
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a
    ```
    V Pythonu je hotová funkce `math.gcd` (a `math.lcm` pro [nsn](nsn.md)).

## Odčítací verze

Původní Eukleidova verze místo dělení **odčítá** menší číslo od většího: $D(a, b) = D(a - b, b)$.
Dělení se zbytkem je jen zrychlené opakované odčítání.

!!! example "Příklad: $D(48, 18)$ odčítáním"
    $(48, 18) \to (30, 18) \to (12, 18) \to (12, 6) \to (6, 6)$ → $D = 6$

## Cvičení

??? question "$D(84, 36)$"
    $84 = 2 \cdot 36 + 12$, $36 = 3 \cdot 12 + 0$ → $D = 12$

??? question "$D(270, 192)$"
    $270 = 1 \cdot 192 + 78$, $192 = 2 \cdot 78 + 36$, $78 = 2 \cdot 36 + 6$, $36 = 6 \cdot 6 + 0$ → $D = 6$

??? question "$D(377, 233)$ (Fibonacciho čísla)"
    $377 = 1 \cdot 233 + 144$, $233 = 1 \cdot 144 + 89$, $144 = 1 \cdot 89 + 55$, $89 = 1 \cdot 55 + 34$, …
    až $2 = 2 \cdot 1 + 0$ → $D = 1$. Sousední Fibonacciho čísla jsou vždy nesoudělná a vyžadují nejvíc kroků.

??? question "Spočítej $n(1071, 462)$"
    $n = \dfrac{1071 \cdot 462}{D(1071, 462)} = \dfrac{1071}{21} \cdot 462 = 51 \cdot 462 = 23\,562$
