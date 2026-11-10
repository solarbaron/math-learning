# Vigenèrova šifra

Vylepšená [Caesarova šifra](caesarova-sifra.md): každé písmeno se posune o **jiný** počet míst.
Posuny určuje **klíč** (slovo nebo řada čísel), který se **periodicky opakuje**.
{ .lead }

!!! definice "Pravidlo"
    Klíč $k_0, k_1, \dots, k_{m-1}$ (posuny). Písmeno na pozici $i$:

    $$c_i = (p_i + k_{i \bmod m}) \bmod 26$$

    Klíč jako slovo: písmeno = posun (A = 0, B = 1, …, Z = 25). Klíč „CFDEB" je totéž co 2, 5, 3, 4, 1.

<div class="vigenere" data-text="HESLO" data-key="2,5,3,4,1"></div>

!!! example "Příklad: HESLO, posuny 2, 5, 3, 4, 1"
    | otevřený text | H | E | S | L | O |
    |---|---|---|---|---|---|
    | posun | +2 | +5 | +3 | +4 | +1 |
    | šifrový text | **J** | **J** | **V** | **P** | **P** |

    Výsledek **JJVPP**. Dvakrát vyšlo J a dvakrát P, pokaždé z jiného písmene.
    To je přesně to, co ztěžuje [frekvenční analýzu](frekvencni-analyza.md).

## Tabula recta

Ruční pomůcka: tabulka 26 × 26, v řádku $k$ je abeceda posunutá o $k$. Šifrové písmeno je v průsečíku řádku klíče
a sloupce otevřeného písmene. Ve widgetu nahoře najeď myší na sloupec.

## Bezpečnost

- Až 26 šifrových abeced místo jedné. Stejné písmeno se šifruje různě, takže prostá frekvenční analýza nestačí.
- **Slabina:** klíč se opakuje. Kdo uhodne délku klíče $m$, rozdělí text na $m$ Caesarových šifer a každou prolomí zvlášť.
  Dnes se Vigenère prolomí snadno.
- Pokud by klíč byl náhodný a **stejně dlouhý jako zpráva**, vznikne nerozluštitelná [Vernamova šifra](vernamova-sifra.md).

??? question "Cvičení: zašifruj KRYPTOGRAFIE s posuny 5, 3, 1"
    | K | R | Y | P | T | O | G | R | A | F | I | E |
    |---|---|---|---|---|---|---|---|---|---|---|---|
    | +5 | +3 | +1 | +5 | +3 | +1 | +5 | +3 | +1 | +5 | +3 | +1 |
    | P | U | Z | U | W | P | L | U | B | K | L | F |

    **PUZUWPLUBKLF**
