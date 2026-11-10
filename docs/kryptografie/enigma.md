# Enigma

Elektromechanický šifrovací stroj, který používalo Německo za 2. světové války.
Je to **polyalfabetická** substituce: po každém stisku klávesy se rotory pootočí,
takže stejné písmeno se pokaždé zašifruje jinak.
{ .lead }

```mermaid
flowchart LR
    K["klávesa"] --> P["plugboard"] --> R1["rotor 1"] --> R2["rotor 2"] --> R3["rotor 3"] --> RF["reflektor"]
    RF --> R3b["rotor 3"] --> R2b["rotor 2"] --> R1b["rotor 1"] --> Pb["plugboard"] --> L["žárovka"]
```

| Část | Funkce |
|---|---|
| **3 rotory** | permutace abecedy; po každém písmenu se otočí, takže se mění šifra |
| **Reflektor** | jako rotor, ale neotáčí se; pošle signál zpět. Díky tomu **stejné nastavení šifruje i dešifruje** |
| **Plugboard** | počáteční záměna dvojic písmen, během šifrování se nemění |
| **Klíč** | tři písmena = počáteční natočení rotorů |

Důsledek reflektoru: **žádné písmeno se nezašifruje samo na sebe**. Právě to (a opakující se fráze ve zprávách)
pomohlo Enigmu prolomit polským a britským kryptologům.

Princip „každé písmeno jiným posunem" má i [Vigenèrova šifra](vigenerova-sifra.md), jen tam se posuny opakují s periodou klíče.
