# Slovní úlohy na NSD a nsn

Nejtěžší na slovních úlohách není výpočet, ale poznat, **jestli hledám NSD, nebo nsn**.
{ .lead }

## Jak to poznat

| | [NSD](nsd.md) — **dělím** | [nsn](nsn.md) — **skládám / čekám** |
|---|---|---|
| otázka | největší díl, největší počet skupin | nejmenší společné množství, nejbližší společný okamžik |
| typické slovo | *rozdělit, rozstříhat, co nejvíce, co největší* | *znovu, současně, opět spolu, nejdříve, nejméně* |
| výsledek je | **menší** než zadaná čísla (nebo rovný) | **větší** než zadaná čísla (nebo rovný) |
| obrázek | krájím celek na stejné kusy | skládám kusy, dokud se nesrovnají |

!!! tip "Kontrolní otázka"
    Má být výsledek **menší** než zadaná čísla? → NSD. **Větší**? → nsn.

---

## Úlohy na NSD

!!! example "1. Stuhy"
    Máme stuhy dlouhé $84\ \text{cm}$ a $126\ \text{cm}$. Chceme je rozstříhat na **stejně dlouhé kusy co největší délky** bez odpadu.
    Jak dlouhé budou kusy a kolik jich bude?

    **Řešení.** Délka kusu musí dělit $84$ i $126$ a má být co největší → $D(84, 126)$.

    $84 = 2^2 \cdot 3 \cdot 7$, $126 = 2 \cdot 3^2 \cdot 7$ → $D = 2 \cdot 3 \cdot 7 = 42$.

    Kusy budou dlouhé **42 cm**, celkem $84 : 42 + 126 : 42 = 2 + 3 = $ **5 kusů**.

!!! example "2. Balíčky ovoce"
    Máme $48$ jablek a $36$ hrušek. Chceme připravit **co nejvíce stejných balíčků** (každý se stejným počtem jablek i hrušek) a nic nesmí zbýt.

    **Řešení.** Počet balíčků dělí $48$ i $36$ a má být největší → $D(48, 36) = 12$.

    **12 balíčků**, v každém $48 : 12 = 4$ jablka a $36 : 12 = 3$ hrušky.

!!! example "3. Dlaždice na podlahu"
    Podlahu $360\ \text{cm} \times 270\ \text{cm}$ chceme pokrýt **co největšími čtvercovými dlaždicemi**, bez řezání.

    **Řešení.** Strana dlaždice dělí obě strany podlahy → $D(360, 270) = 90$.

    Dlaždice $90 \times 90\ \text{cm}$, potřebujeme $4 \cdot 3 =$ **12 dlaždic**. Přesně tohle ukazuje
    [geometrický Eukleidův algoritmus](eukleiduv-algoritmus.md#geometricky-dlazdeni-ctverci).

!!! example "4. Skupiny ve třídě"
    Ve třídě je $24$ chlapců a $32$ dívek. Učitel je chce rozdělit do **co největšího počtu skupin** se stejným složením.

    **Řešení.** $D(24, 32) = 8$ → **8 skupin**, v každé $3$ chlapci a $4$ dívky.

---

## Úlohy na nsn

!!! example "5. Autobusy"
    Z nádraží jede linka A každých $12$ minut a linka B každých $18$ minut. V $8{:}00$ odjely obě současně.
    **Kdy nejdříve** zase odjedou současně?

    **Řešení.** Hledáme nejmenší čas, který je násobkem $12$ i $18$ → $n(12, 18)$.

    $12 = 2^2 \cdot 3$, $18 = 2 \cdot 3^2$ → $n = 2^2 \cdot 3^2 = 36$.

    Znovu spolu odjedou v **8:36**.

<div class="multiples" data-a="12" data-b="18"></div>

!!! example "6. Ozubená kola"
    Dvě zabraná ozubená kola mají $24$ a $36$ zubů. Označíme zuby, které se právě dotýkají.
    Po kolika otočkách se označené zuby **znovu potkají**?

    **Řešení.** Musí projít počet zubů, který je násobkem $24$ i $36$ → $n(24, 36) = 72$.

    Malé kolo se otočí $72 : 24 =$ **3krát**, velké $72 : 36 =$ **2krát**.

!!! example "7. Čtverec z dlaždic"
    Máme obdélníkové dlaždice $12\ \text{cm} \times 18\ \text{cm}$ (nesmí se otáčet). Jaký je **nejmenší čtverec**, který z nich složíme?

    **Řešení.** Strana čtverce musí být násobkem $12$ (na šířku) i $18$ (na výšku) → $n(12, 18) = 36$.

    Čtverec $36 \times 36\ \text{cm}$ z $3 \cdot 2 =$ **6 dlaždic**.

    Porovnej s úlohou 3: tam jsme velký obdélník **dělili** na čtverce (NSD), tady malé obdélníky **skládáme** do čtverce (nsn).

!!! example "8. Tři majáky"
    Majáky blikají každých $6$, $8$ a $10$ sekund. Teď bliknuly všechny najednou. Za jak dlouho zase?

    **Řešení.** $n(6, 8, 10)$: $6 = 2 \cdot 3$, $8 = 2^3$, $10 = 2 \cdot 5$ → $n = 2^3 \cdot 3 \cdot 5 = 120$.

    Za **120 s = 2 minuty**.

!!! example "9. Kuličky do sáčků"
    Kuliček je méně než $100$. Když je rozdělím po $4$, po $6$ i po $9$, vždy zbude **právě jedna**. Kolik jich je?

    **Řešení.** Počet bez jedné kuličky je společný násobek $4$, $6$ a $9$. $n(4, 6, 9) = 36$, takže počet je $36k + 1$:
    $37$ nebo $73$ (další, $109$, je už přes $100$). Zadání má **dvě řešení: 37 nebo 73** — dobré si všimnout.

---

## Na procvičení

??? question "Truhlář má prkna 150 cm a 210 cm. Chce je nařezat na co nejdelší stejné kusy. Jak dlouhé a kolik?"
    **NSD.** $D(150, 210) = 30$ → kusy po $30\ \text{cm}$, celkem $5 + 7 = 12$ kusů.

??? question "Petr chodí do knihovny každý 4. den, Jana každý 6. den. Dnes tam byli oba. Za kolik dní se tam znovu potkají?"
    **nsn.** $n(4, 6) = 12$ → za 12 dní.

??? question "Kolik nejvíce stejných kytic svážeme z 60 růží, 84 tulipánů a 108 narcisů, aby nic nezbylo?"
    **NSD.** $D(60, 84, 108) = 12$ → 12 kytic, v každé 5 růží, 7 tulipánů, 9 narcisů.

??? question "Nejmenší počet žáků, kteří se dají seřadit do řad po 5, po 6 i po 8 (beze zbytku)?"
    **nsn.** $n(5, 6, 8) = 120$ žáků.

??? question "Dva běžci startují spolu na okruhu. Jeden zaběhne kolo za 72 s, druhý za 90 s. Kdy se poprvé znovu potkají na startu a kolik kol každý uběhne?"
    **nsn.** $n(72, 90) = 360\ \text{s} = 6$ minut. První uběhne $5$ kol, druhý $4$ kola.

??? question "Obdélníkový pozemek 132 m × 84 m chceme oplotit sloupky ve stejných, co největších vzdálenostech, sloupek je v každém rohu. Kolik sloupků?"
    **NSD.** $D(132, 84) = 12$ → vzdálenost $12\ \text{m}$. Obvod $432\ \text{m}$, sloupků $432 : 12 = 36$.
