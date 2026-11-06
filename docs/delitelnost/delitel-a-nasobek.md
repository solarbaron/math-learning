# Dělitel a násobek

Číslo $a$ **dělí** číslo $b$, když $b$ jde vydělit $a$ beze zbytku. Pak je $a$ **dělitel** čísla $b$ a $b$ je **násobek** čísla $a$.
{ .lead }

!!! definice "Definice"
    Pro celá čísla $a \neq 0$ a $b$:

    $$a \mid b \iff \text{existuje } k \in \mathbb{Z} \text{ takové, že } b = k \cdot a$$

    Čte se *„a dělí b"*. Když $a$ nedělí $b$, píšeme $a \nmid b$.

!!! example "Příklady"
    - $3 \mid 12$, protože $12 = 4 \cdot 3$ → $3$ je dělitel $12$, $12$ je násobek $3$
    - $5 \nmid 12$, protože $12 : 5 = 2$, zbytek $2$
    - $1 \mid b$ a $b \mid b$ pro každé $b$ — jednička a číslo samo jsou dělitelé vždy
    - $a \mid 0$ pro každé $a \neq 0$, protože $0 = 0 \cdot a$

!!! warning "Pozor na pořadí"
    $3 \mid 12$ je **tvrzení** („3 dělí 12", platí). $12 / 3$ je **číslo** (výsledek dělení, $4$).
    Svislítko není zlomková čára.

## Dělitelé a násobky jako množiny

Dělitelé čísla tvoří konečnou [množinu](../mnoziny/mnozina.md), násobky nekonečnou:

| | Množina | Příklad pro 12 |
|---|---|---|
| dělitelé | $\mathcal{D}_{12}$ | $\{1, 2, 3, 4, 6, 12\}$ |
| násobky | $\mathcal{N}_{12}$ | $\{12, 24, 36, 48, \dots\}$ |

Dělitelé se hledají **po dvojicích**: $12 = 1 \cdot 12 = 2 \cdot 6 = 3 \cdot 4$. Stačí zkoušet čísla do $\sqrt{12} \approx 3{,}46$
a ke každému nalezenému děliteli máš zadarmo i jeho „partnera".

!!! example "Příklad: všichni dělitelé 36"
    $36 = 1 \cdot 36 = 2 \cdot 18 = 3 \cdot 12 = 4 \cdot 9 = 6 \cdot 6$ (dál netřeba, $6 = \sqrt{36}$).

    $\mathcal{D}_{36} = \{1, 2, 3, 4, 6, 9, 12, 18, 36\}$ — devět dělitelů. Lichý počet, protože $36$ je čtverec.

## Kritéria dělitelnosti

Jak poznat dělitelnost bez dělení:

| Číslo je dělitelné | když | příklad |
|---|---|---|
| $2$ | poslední číslice je sudá ($0, 2, 4, 6, 8$) | $1\,358$ ✓ |
| $3$ | ciferný součet je dělitelný 3 | $1\,358$: $1+3+5+8 = 17$ ✗ |
| $4$ | poslední dvojčíslí je dělitelné 4 | $1\,316$: $16$ ✓ |
| $5$ | končí na $0$ nebo $5$ | $2\,045$ ✓ |
| $6$ | je dělitelné 2 **i** 3 | $1\,356$: sudé, $1+3+5+6 = 15$ ✓ |
| $8$ | poslední trojčíslí je dělitelné 8 | $7\,120$: $120 = 15 \cdot 8$ ✓ |
| $9$ | ciferný součet je dělitelný 9 | $4\,572$: $4+5+7+2 = 18$ ✓ |
| $10$ | končí nulou | $730$ ✓ |
| $11$ | střídavý součet číslic je dělitelný 11 | $918\,082$: $9-1+8-0+8-2 = 22$ ✓ |

??? note "Proč funguje ciferný součet?"
    $10 = 9 + 1$, $100 = 99 + 1$, $1000 = 999 + 1$, …, takže třeba
    $$4572 = 4 \cdot 999 + 5 \cdot 99 + 7 \cdot 9 + (4 + 5 + 7 + 2).$$
    Všechno kromě závorky je násobek 9 (i 3). O dělitelnosti tedy rozhoduje jen ciferný součet v závorce.

## Vlastnosti

- **tranzitivita:** $a \mid b$ a $b \mid c$ $\Rightarrow$ $a \mid c$ ($2 \mid 6$, $6 \mid 18$ ⇒ $2 \mid 18$)
- **součet a rozdíl:** $a \mid b$ a $a \mid c$ $\Rightarrow$ $a \mid (b + c)$ i $a \mid (b - c)$ — na tom stojí [Eukleidův algoritmus](eukleiduv-algoritmus.md)
- $a \mid b$ a $b \mid a$ (pro kladná čísla) $\Rightarrow$ $a = b$

Čísla, která mají jen dva dělitele, jsou [prvočísla](prvocisla.md).
Společné dělitele a násobky dvou čísel řeší [NSD](nsd.md) a [nsn](nsn.md).

??? question "Cvičení: najdi všechny dělitele čísla 48"
    $48 = 1 \cdot 48 = 2 \cdot 24 = 3 \cdot 16 = 4 \cdot 12 = 6 \cdot 8$, tedy
    $\mathcal{D}_{48} = \{1, 2, 3, 4, 6, 8, 12, 16, 24, 48\}$.

??? question "Cvičení: je $123\,456$ dělitelné 3, 4, 6, 9?"
    Ciferný součet $1+2+3+4+5+6 = 21$: dělitelné **3** ano, **9** ne.
    Poslední dvojčíslí $56 = 14 \cdot 4$: dělitelné **4** ano. Sudé a dělitelné 3: dělitelné **6** ano.

??? question "Cvičení: doplň číslici, aby $52\_4$ bylo dělitelné 9"
    $5 + 2 + x + 4 = 11 + x$ musí být násobek 9, tedy $x = 7$: $5\,274 = 9 \cdot 586$.
