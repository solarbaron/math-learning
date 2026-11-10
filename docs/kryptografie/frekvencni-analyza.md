# Frekvenční analýza

Útok na **substituční šifry** ([Caesar](caesarova-sifra.md), [Atbash](atbash.md), …).
Každý jazyk má typické četnosti písmen. Monoalfabetická šifra písmena jen přejmenuje,
**četnosti zachová**. Stačí tedy porovnat, která písmena jsou v šifře nejčastější.
{ .lead }

## Postup pro Caesarovu šifru

1. Spočítej, kolikrát se v šifře vyskytuje každé písmeno.
2. Nejčastější písmeno šifry nejspíš odpovídá nejčastějšímu písmenu jazyka (česky **E**, pak O, A).
3. Z toho plyne posun $k$. Dešifruj a zkontroluj, jestli to dává smysl.

Posuvníkem posouvej text zpátky, dokud se oranžové sloupce nekryjí s čárkovanými (čeština):

<div class="freq" data-text="IPIQIRXC IBXVIQRI FIDTIGRI WMJVC QYWINM FCX WOZIPI REZVDIRC. O HIWMJVSZERM NI TSXVIFE XENRC OPMG. HEPI FC QIPC FCX SHSPRI ZYGM JVIOZIRGRM EREPCDI."></div>

!!! example "Příklad z cvičení"
    V šifře je nejčastější **I** (22×), pak R, C. Když I = E, je posun $I - E = 8 - 4 = 4$.
    Posunem o 4 zpět vyjde:

    ELEMENTY EXTREMNE BEZPECNE SIFRY MUSEJI BYT SKVELE NAVRZENY. K DESIFROVANI JE POTREBA TAJNY KLIC.
    DALE BY MELY BYT ODOLNE VUCI FREKVENCNI ANALYZE.

## Kdy nefunguje

- Krátký text: málo písmen, četnosti nejsou spolehlivé.
- **Polyalfabetické** šifry ([Vigenère](vigenerova-sifra.md)): stejné písmeno se šifruje různě. Napřed se musí zjistit délka klíče.
- [Vernamova šifra](vernamova-sifra.md): úplně náhodný klíč, četnosti v šifře jsou rovnoměrné.
- [Transpoziční šifry](skytale.md): četnosti jsou stejné jako v jazyce, ale to jen prozradí, že jde o transpozici.

Četnosti ve widgetu jsou přibližné, s písmeny s diakritikou sloučenými (Č→C, Ě/É→E, …).
