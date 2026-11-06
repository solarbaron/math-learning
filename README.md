# Matematika — osobní wiki

Krátké provázané stránky s interaktivními ukázkami. Postaveno na
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/), nasazuje se na GitHub Pages.

## Lokálně

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/mkdocs serve        # http://127.0.0.1:8000/math-learning/
```

## Nasazení

Push do `main` → GitHub Actions (`.github/workflows/deploy.yml`) postaví web a nasadí ho na
<https://solarbaron.github.io/math-learning/>.
Jednorázově je potřeba v repu nastavit **Settings → Pages → Source: GitHub Actions**.

## Psaní stránek

- Jedna stránka = jeden pojem, krátce. Novou stránku přidej do `nav` v `mkdocs.yml`.
- Odkazuj relativně na `.md` soubory: `[průnik](prunik.md)`. Sekce *Odkazuje sem* se generuje sama (`hooks/backlinks.py`).
- Matematika: `$x \in A$`, blokové vzorce `$$…$$` vždy oddělené prázdným řádkem.
- První odstavec s `{ .lead }` je shrnutí stránky.
- Bloky: `!!! definice "Definice"`, `!!! veta "Věta"`, `!!! example "Příklad"`, `??? question "Cvičení: …"` (sbalené řešení).

## Widgety

Vložené jako HTML do Markdownu, vykreslí je `docs/javascripts/venn.js`, `widgets.js` a `numbers.js`.

| Widget | Kód |
|---|---|
| Vennův diagram | `<div class="venn" data-expr="A ∪ B"></div>` (`data-layout`: `2`, `3`, `subset`, `disjoint`; `data-caption`) |
| Rovnost dvou diagramů | `<div class="venn-law" data-left="(A ∪ B)'" data-right="A' ∩ B'"></div>` |
| Průzkumník výrazů | `<div class="venn-explorer" data-sets="3" data-expr="(A ∪ B) ∩ C"></div>` |
| Kalkulačka A, B | `<div class="set-playground" data-a="1, 2, 3" data-b="3, 4"></div>` |
| Hasseův diagram P(A) | `<div class="powerset" data-set="a, b, c"></div>` |
| Kartézský součin | `<div class="cartesian" data-a="1, 2, 3" data-b="x, y"></div>` |
| Párování (bijekce) | `<div class="bijection" data-left="1, 2, …" data-right="2, 4, …" data-left-name="ℕ" data-right-name="S"></div>` |
| Intervaly na ose | `<div class="numline" data-rows="A: ⟨-2; 3) \| B: (1; ∞)"></div>` |
| Intervaly interaktivně | `<div class="numline" data-interactive data-a="⟨-2; 3)" data-b="(1; 5⟩"></div>` |
| Prvočinitele ve Vennovi | `<div class="numvenn" data-mode="factors" data-a="60" data-b="72" data-show="lcm"></div>` |
| Dělitelé ve Vennovi | `<div class="numvenn" data-mode="divisors" data-a="12" data-b="18"></div>` |
| Eukleidův algoritmus | `<div class="euclid" data-a="48" data-b="18"></div>` (`data-all` = rovnou všechny kroky) |
| Násobky (skoky po ose) | `<div class="multiples" data-a="4" data-b="6" data-c=""></div>` (`data-c` přidá třetí pole) |
| Strom rozkladu | `<div class="factor-tree" data-n="360"></div>` |
| Eratosthenovo síto | `<div class="sieve" data-n="100"></div>` |

Výrazy ve Vennových diagramech: `∪ ∩ \ Δ '`, závorky, `U` (univerzum), `∅`.
