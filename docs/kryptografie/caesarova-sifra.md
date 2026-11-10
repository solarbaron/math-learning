# Caesarova šifra

Každé písmeno se **posune o pevný počet míst** $k$ v abecedě. Caesar používal posun $k = 3$: A→D, B→E, …, Z→C.
Klíč je jediné číslo $k$.
{ .lead }

!!! definice "Pravidlo"
    S indexy $A = 0, \dots, Z = 25$:

    $$\text{šifrování: } c = (p + k) \bmod 26 \qquad \text{dešifrování: } p = (c - k) \bmod 26$$

    „$\bmod 26$" znamená, že za Z se pokračuje znovu od A. Viz [modulární aritmetika](modularni-aritmetika.md).

## Šifrovací kolo

Vnější kruh je otevřená abeceda, vnitřní je šifrová, pootočená o $k$. Pod každým písmenem je to, na co se zašifruje.

<div class="caesar" data-text="HESLO" data-k="3"></div>

| | | | | | | | | | | | | | | | | | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
| D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z | A | B | C |

!!! example "Příklad: HESLO, $k = 3$"
    H→K, E→H, S→V, L→O, O→R ⇒ **KHVOR**

## Výhody a slabiny

- ✓ Velmi jednoduchá, nepotřebuje žádné nástroje.
- ✗ Všechna písmena se šifrují **stejně** (A je vždy D). Zachovávají se tedy četnosti písmen a pomůže
  [frekvenční analýza](frekvencni-analyza.md). V češtině jsou nejčastější písmena E, O, A.
- ✗ Existuje jen **25 klíčů**. Stačí je všechny vyzkoušet, tomu se říká útok **hrubou silou**:

<div class="caesar-brute" data-text="KHVOR MH VFKRYDQH SRG NODYHVQLFL"></div>

Posun o $k$ a posun o $26 - k$ se navzájem ruší. Šifrování s $k = 21$ je totéž jako dešifrování s $k = 5$.

??? question "Cvičení: zašifruj KRYPTOGRAFIE s posunem 5 a s posunem 21"
    - $k = 5$: **PWDUYTLWFKNJ**
    - $k = 21$: **FMTKOJBMVADZ** (stejné, jako když posuneš o 5 *zpět*)

Vylepšení s různými posuny pro různá písmena: [Vigenèrova šifra](vigenerova-sifra.md). Zrcadlová varianta bez klíče: [Atbash](atbash.md).
