# Kongruence

Dvě čísla jsou **kongruentní modulo $n$**, když dávají při dělení $n$ **stejný zbytek**.
Pro svět „modulo $n$" se pak chovají úplně stejně: na [hodinách](modularni-aritmetika.md) skončí na stejném místě.
{ .lead }

!!! definice "Definice"
    $$a \equiv b \pmod{n} \iff n \text{ dělí } a - b$$

    Čte se „$a$ je kongruentní s $b$ modulo $n$". Jednoduše: $(a - b) \bmod n = 0$.

<div class="modclock" data-a="17" data-b="2" data-n="5"></div>

!!! example "Příklady"
    | kongruence | rozdíl | platí? |
    |---|---|---|
    | $17 \equiv 2 \pmod 5$ | $17 - 2 = 15$, dělitelné 5 | ✓ |
    | $24 \equiv 0 \pmod 4$ | $24$, dělitelné 4 | ✓ |
    | $-3 \equiv 7 \pmod 5$ | $-3 - 7 = -10$, dělitelné 5 | ✓ |
    | $11 \equiv 3 \pmod 2$ | $8$, dělitelné 2 | ✓ obě lichá |
    | $7 \equiv 1 \pmod 6$ | $6$ | ✓ |
    | $5 \equiv 2 \pmod 4$ | $3 \bmod 4 = 3$ | ✗ |
    | $18 \equiv -2 \pmod 7$ | $20 \bmod 7 = 6$ | ✗ |

Zbytky se opakují s periodou $n$. Například pro $n = 6$:

| číslo | 1 | 2 | 3 | 4 | 5 | 6 | **7** | 8 | 9 | 10 | 11 | 12 | **13** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| zbytek mod 6 | **1** | 2 | 3 | 4 | 5 | 0 | **1** | 2 | 3 | 4 | 5 | 0 | **1** |

Čísla 1, 7, 13, … jsou navzájem kongruentní modulo 6.

## Rozdíl oproti $\bmod$

- $a \bmod n$ je **operace**, výsledek je jedno číslo $0 \dots n-1$.
- $a \equiv b \pmod n$ je **vztah** (tvrzení, které platí nebo neplatí), jako rovnost.

Platí: $a \equiv b \pmod n \iff a \bmod n = b \bmod n$.

S kongruencemi se počítá skoro jako s rovnicemi: dá se k oběma stranám přičíst nebo obě strany vynásobit stejným číslem.
Soustavy kongruencí řeší [čínská věta o zbytcích](cinska-veta-o-zbytcich.md).

??? question "Cvičení: platí $5 \equiv 15$ (mod 5), $17 \equiv 1$ (mod 16), $50 \equiv 11$ (mod 10), $15 \equiv 13$ (mod 20)?"
    - $5 - 15 = -10$, dělitelné 5 → **platí**
    - $17 - 1 = 16$, dělitelné 16 → **platí**
    - $50 - 11 = 39$, $39 \bmod 10 = 9$ → **neplatí**
    - $15 - 13 = 2$, $2 \bmod 20 = 2$ → **neplatí**
