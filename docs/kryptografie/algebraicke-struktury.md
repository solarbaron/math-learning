# Algebraické struktury

Množina plus jedna nebo více operací, které splňují určitá pravidla (axiomy).
V kryptografii se počítá hlavně v **grupách** a **tělesech** čísel modulo $n$.
{ .lead }

| Struktura | Co to je | Příklad |
|---|---|---|
| [Množina](../mnoziny/mnozina.md) | jen prvky, žádná operace | $\{0, 1, 2, 3, 4\}$ |
| **Grupa** | množina s **jednou** operací, splňuje 4 axiomy (níže) | $\mathbb{Z}_n$ se sčítáním mod $n$; $\mathbb{Z}_p^*$ s násobením mod $p$ |
| **Okruh** | **dvě** operace (sčítání, násobení), asociativita, distributivita | celá čísla $\mathbb{Z}$; $\mathbb{Z}_n$ |
| **Těleso** | okruh, kde **každý nenulový prvek má inverzi** pro násobení | $\mathbb{Q}$, $\mathbb{R}$; $\mathbb{Z}_p$ pro prvočíslo $p$ |
| **Vektorový prostor** | vektory se sčítáním a násobením číslem | $\mathbb{R}^n$, viz [matice](../matice/index.md) |

## Axiomy grupy

Pro množinu $G$ s operací $\circ$:

1. **Uzavřenost:** $a \circ b$ je zase v $G$.
2. **Asociativita:** $(a \circ b) \circ c = a \circ (b \circ c)$.
3. **Neutrální prvek** $e$: $a \circ e = a$. Pro sčítání je to 0, pro násobení 1.
4. **Inverzní prvek:** ke každému $a$ existuje $a^{-1}$ s $a \circ a^{-1} = e$.

## Grupy v kryptografii

$$\mathbb{Z}_n = \{0, 1, \dots, n-1\}, \qquad \mathbb{Z}_n^* = \{a \in \mathbb{Z}_n : \mathrm{GCD}(a, n) = 1\}$$

- $\mathbb{Z}_n$ se **sčítáním** mod $n$ je grupa (inverze k $a$ je $n - a$).
- Pro násobení se musí vzít jen čísla nesoudělná s $n$, tedy $\mathbb{Z}_n^*$. Jen ta mají
  [inverzní prvek](inverzni-prvek.md). Počet prvků $\mathbb{Z}_n^*$ je [Eulerova funkce](eulerova-funkce.md) $\varphi(n)$.
- Pro prvočíslo $p$ je $\mathbb{Z}_p^* = \{1, 2, \dots, p-1\}$, tedy všechno kromě nuly, a $\mathbb{Z}_p$ je **těleso**.

!!! definice "Generátor grupy"
    Prvek $g$, jehož mocniny $g^1, g^2, g^3, \dots$ projdou **všechny** prvky grupy.
    Například v $\mathbb{Z}_7^*$ je $3$ generátor: $3, 2, 6, 4, 5, 1$. Viz [Generátory grupy](generatory.md).
