# Vennovy diagramy

**Vennův diagram** zobrazuje množiny jako oblasti v rovině: obdélník je univerzum $U$
(„všechno, o čem mluvíme"), kruhy jsou množiny.
{ .lead }

Každá oblast diagramu odpovídá jedné kombinaci *„je / není v $A$"*, *„je / není v $B$"*, …

- 2 množiny → $2^2 = 4$ oblasti
- 3 množiny → $2^3 = 8$ oblastí

!!! tip "Vyzkoušej"
    Najeď myší na libovolnou oblast — ukáže se, které podmínce odpovídá (např. $x \in A,\ x \notin B$).
    Do pole napiš libovolný výraz, nebo klikni na předvolby.

## Dvě množiny

<div class="venn-explorer" data-sets="2"></div>

## Tři množiny

<div class="venn-explorer" data-sets="3" data-expr="(A ∪ B) ∩ C"></div>

!!! info "Jak psát výrazy"
    | Operace | Symbol | Na klávesnici |
    |---|---|---|
    | [sjednocení](sjednoceni.md) | $\cup$ | `|` nebo `+` |
    | [průnik](prunik.md) | $\cap$ | `&` nebo `*` |
    | [rozdíl](rozdil.md) | $\setminus$ | `\` nebo `-` |
    | [symetrická diference](symetricka-diference.md) | $\Delta$ | `^` |
    | [doplněk](doplnek.md) | $A'$ | `'` |
    | univerzum, prázdná množina | $U$, $\emptyset$ | `U` |

    Doplněk váže nejsilněji, pak průnik, pak ostatní zleva doprava. Když si nejsi jistý, piš závorky.

## Diagram jako důkaz

Pro nejvýš tři množiny je Vennův diagram **úplný**: obsahuje všechny možné kombinace příslušnosti.
Když dva výrazy vybarví stejné oblasti, jsou si rovny pro *jakékoliv* množiny.
Takhle se dají ověřovat [zákony množinových operací](zakony.md).

Stejnou úvahu jde dělat i tabulkou — každá oblast je jeden řádek pravdivostní tabulky
($1$ = prvek v množině je, $0$ = není).

!!! warning "Pro čtyři a více množin"
    Čtyři kruhy už všech $16$ kombinací vytvořit nedokážou — je potřeba použít elipsy nebo jiné tvary.
