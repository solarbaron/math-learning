# Matematika a kryptografie — osobní wiki

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

Vložené jako HTML do Markdownu, vykreslí je skripty v `docs/javascripts/` (`venn.js`, `widgets.js`, `numbers.js`, `matrix.js`, `calculus.js`, `crypto.js`).

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
| Gaussova eliminace | `<div class="gauss" data-mode="echelon" data-m="1 2; 3 4"></div>` (`data-mode`: `echelon`, `rref`, `det`, `inverse`) |
| Sarrusovo pravidlo | `<div class="sarrus" data-m="2 1 3; 1 -1 2; 3 2 1"></div>` |
| Laplaceův rozvoj | `<div class="laplace" data-m="2 0 1 0; 1 3 2 1; 0 1 -1 2; 3 2 0 1"></div>` |
| Inverze přes adjungovanou | `<div class="adjugate" data-m="1 2 3; 0 1 4; 5 6 0"></div>` |
| Determinant jako plocha | `<div class="det2d" data-m="3 1; 1 2"></div>` |
| Násobení matic | `<div class="matmul" data-a="1 2; 3 4" data-b="5 6; 7 8"></div>` |
| Graf funkcí | `<div class="plot" data-fns="exp(x); ln(x)" data-labels="eˣ; ln x" data-x="-3,5" data-y="-3,5" data-points="0,1,(0; 1) \| 1,0"></div>` |
| Limita v bodě | `<div class="limit" data-f="(x^2-1)/(x-1)" data-a="1" data-limit="2"></div>` |
| Sečna → tečna | `<div class="tangent" data-f="x^2" data-x0="1"></div>` |
| Riemannovy součty | `<div class="riemann" data-f="x^2" data-a="0" data-b="2"></div>` (`data-bslider="0.2,8"`, `data-compare="ln(b)"`) |
| Posloupnost | `<div class="sequence" data-a="(1+1/n)^n" data-limit="e"></div>` |
| Jednotková kružnice | `<div class="unit-circle" data-deg="30"></div>` |
| Poznávačka funkcí | `<div class="func-quiz"></div>` |
| Atbash | `<div class="atbash" data-text="TAJNA"></div>` |
| Caesarovo kolo | `<div class="caesar" data-text="HESLO" data-k="3"></div>` |
| Caesar hrubou silou | `<div class="caesar-brute" data-text="KHVOR"></div>` |
| Vigenère + tabula recta | `<div class="vigenere" data-text="HESLO" data-key="2,5,3,4,1"></div>` (klíč čísly nebo slovem) |
| Skytale | `<div class="skytale" data-text="KRYPTOGRAFIE" data-k="4"></div>` |
| Vernam (XOR) | `<div class="vernam" data-text="LES" data-key="CBA"></div>` |
| Frekvenční analýza | `<div class="freq" data-text="…"></div>` |
| Modulární hodiny | `<div class="modclock" data-a="-12" data-n="5"></div>` (`data-b` = kongruence) |
| Eulerova funkce | `<div class="phi-grid" data-n="20"></div>` |
| Square and Multiply | `<div class="sqmul" data-a="3" data-e="33" data-n="17"></div>` |
| Násobilka mod n | `<div class="mod-table" data-n="10" data-a="3"></div>` |
| Rozšířený Eukleides | `<div class="ext-euclid" data-x="3" data-n="20"></div>` |
| Fermat / Euler | `<div class="reduce" data-a="46" data-e="51" data-n="15"></div>` |
| Čínská věta | `<div class="crt" data-sys="3 mod 6; 2 mod 7"></div>` |
| Generátory | `<div class="generator" data-n="23" data-g="5"></div>` |
| Testy prvočíselnosti | `<div class="primetest" data-test="fermat" data-n="21" data-a="2"></div>` (`fermat`, `mr`, `ll`) |
| RSA | `<div class="rsa" data-r="11" data-s="13" data-sk="7" data-m="28"></div>` |
| Diffie-Hellman | `<div class="dh" data-n="23" data-g="6" data-q="11" data-a="7" data-b="8"></div>` (`data-mitm`, `data-c`) |
| DSA | `<div class="dsa" data-n="23" data-q="11" data-g="4" data-sk="9" data-k="4" data-h="4"></div>` |

Výrazy ve Vennových diagramech: `∪ ∩ \ Δ '`, závorky, `U` (univerzum), `∅`.

Matice: řádky oddělené `;`, čísla mezerou, zlomky `2/3`. Funkce v grafech: `+ - * / ^`, `sin cos tan cot arcsin arccos arctan exp ln log sqrt abs`, `pi`, `e`; násobení lze vynechat (`2x`, `3sin(x)`).
