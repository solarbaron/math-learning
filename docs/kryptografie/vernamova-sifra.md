# Vernamova šifra

Též **one-time pad** (jednorázová tabulková šifra). Zpráva se spojí s **náhodným klíčem stejné délky**
operací **XOR**. Jediná šifra, u které je dokázané, že je **nerozluštitelná**, pokud se dodrží pravidla pro klíč.
{ .lead }

## XOR

XOR (značka $\oplus$, „exkluzivní nebo") porovná dva bity: **stejné → 0, různé → 1**.

| $A$ | $B$ | $A \oplus B$ |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

!!! veta "Klíčová vlastnost"
    $$(P \oplus K) \oplus K = P$$

    XOR se stejným klíčem dvakrát se vyruší. Proto je **dešifrování stejná operace** jako šifrování.

## Postup

- **Šifrování:** zprávu i klíč převeď z ASCII na bity, udělej XOR → kryptogram.
- **Dešifrování:** kryptogram XOR klíč → bity zprávy → převeď zpět na ASCII.

<div class="vernam" data-text="LES" data-key="CBA"></div>

!!! example "Příklad: zpráva LES, klíč CBA"
    | | L | E | S |
    |---|---|---|---|
    | zpráva (ASCII) | 76 = `01001100` | 69 = `01000101` | 83 = `01010011` |
    | klíč (ASCII) | C = 67 = `01000011` | B = 66 = `01000010` | A = 65 = `01000001` |
    | XOR | `00001111` = 15 | `00000111` = 7 | `00010010` = 18 |

    Kryptogram je **15, 7, 18**, binárně `00001111 00000111 00010010`. Jsou to netisknutelné znaky, proto se zapisuje čísly nebo bity.

## Požadavky na klíč

1. **Zcela náhodný** (z generátoru náhodných čísel).
2. **Stejně dlouhý** jako zpráva.
3. **Jen jednou**: pro každou zprávu nový.

Pak útočník, který zkusí všechny klíče, dostane **všechny možné zprávy** stejné délky a neví, která byla poslána.
Nevýhoda: klíčů je stejně jako zpráv, takže je to velmi nepraktické.

!!! warning "Klíč dvakrát = katastrofa"
    $C_1 \oplus C_2 = (P_1 \oplus K) \oplus (P_2 \oplus K) = P_1 \oplus P_2$. Klíč zmizí a z XORu dvou textů se dají oba texty uhodnout.

Zkus ve widgetu i úlohu z CrypToolu: zpráva `Algoritmus`, klíč `Heslo12345`.
