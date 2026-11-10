# Atbash

Nejjednodušší substituční šifra: abeceda se **obrátí**. A ↔ Z, B ↔ Y, C ↔ X, …, M ↔ N.
Pochází asi z roku 500 př. n. l. a původně se jí šifrovala hebrejština.
{ .lead }

!!! definice "Pravidlo"
    Písmeno s indexem $i$ ($A = 0, B = 1, \dots, Z = 25$) se zašifruje na písmeno s indexem

    $$\text{map}(i) = 25 - i$$

<div class="atbash" data-text="TAJNA"></div>

Šifrování a dešifrování je **stejná operace**: obrátit abecedu dvakrát znamená vrátit se zpět.

!!! example "Příklad: šifrování a dešifrování"
    **TAJNA**: T→G, A→Z, J→Q, N→M, A→Z ⇒ **GZQMZ**

    **AKIZEZ**: A→Z, K→P, I→R, Z→A, E→V, Z→A ⇒ **ZPRAVA**

| | | | | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A→Z | B→Y | C→X | D→W | E→V | F→U | G→T | H→S | I→R | J→Q | K→P | L→O | M→N |
| N→M | O→L | P→K | Q→J | R→I | S→H | T→G | U→F | V→E | W→D | X→C | Y→B | Z→A |

## Slabiny

- **Není tam klíč.** Kdo ví, že jde o Atbash, má zprávu hned.
- Je **monoalfabetická**: každé písmeno se mapuje vždy stejně. Proto zachovává četnosti písmen
  a prolomí ji [frekvenční analýza](frekvencni-analyza.md).

??? question "Cvičení: zašifruj KOMUNIKACE a dešifruj PIBKGLTIZURV"
    - KOMUNIKACE → **PLNFMRPZXV**
    - PIBKGLTIZURV → **KRYPTOGRAFIE**

Podobná, jen s posunem místo zrcadlení: [Caesarova šifra](caesarova-sifra.md).
