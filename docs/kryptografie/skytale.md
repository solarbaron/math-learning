# Skytale

Starořecká **transpoziční** šifra. Písmena zůstávají stejná, jen se **přehází jejich pořadí**.
Kolem tyčky se namotá pásek kůže a text se napíše podél tyčky. Po odmotání je nečitelný.
Přečte ho jen ten, kdo má tyčku **stejného průměru**.
{ .lead }

<div class="figure">
<svg viewBox="0 0 420 120" role="img" aria-label="Pásek namotaný na tyčce">
  <defs>
    <linearGradient id="sk-rod" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8d6e63"/><stop offset=".5" stop-color="#d7ccc8"/><stop offset="1" stop-color="#6d4c41"/>
    </linearGradient>
  </defs>
  <rect x="20" y="30" width="380" height="60" rx="30" fill="url(#sk-rod)"/>
  <g fill="#ffcc80" stroke="#e65100" stroke-width="1" opacity=".95">
    <path d="M60 30 l40 0 l-20 60 l-40 0z"/><path d="M130 30 l40 0 l-20 60 l-40 0z"/>
    <path d="M200 30 l40 0 l-20 60 l-40 0z"/><path d="M270 30 l40 0 l-20 60 l-40 0z"/>
  </g>
  <g font-family="monospace" font-weight="700" font-size="16" text-anchor="middle" fill="#3e2723">
    <text x="70" y="55">K</text><text x="140" y="55">R</text><text x="210" y="55">Y</text><text x="280" y="55">P</text>
    <text x="64" y="78">T</text><text x="134" y="78">O</text><text x="204" y="78">G</text><text x="274" y="78">R</text>
  </g>
  <text x="210" y="112" text-anchor="middle" font-size="13" fill="currentColor">na tyčce se čte po řádcích: KRYP / TOGR / AFIE</text>
</svg>
</div>

## Postup

1. Zvol, kolik písmen se vejde na jednu otočku ($k$ = „průměr tyčky").
2. Piš text **po řádcích** do tabulky s $k$ sloupci.
3. Šifrový text čti **po sloupcích**.

<div class="skytale" data-text="KRYPTOGRAFIE" data-k="4"></div>

!!! example "Příklad: KRYPTOGRAFIE, 4 písmena na otočku"
    | K | R | Y | P |
    |---|---|---|---|
    | T | O | G | R |
    | A | F | I | E |

    Po sloupcích: KTA · ROF · YGI · PRE ⇒ **KTAROFYGIPRE**

**Dešifrování:** do tabulky se stejným počtem řádků piš šifru po sloupcích a čti po řádcích.

Na rozdíl od [substitučních šifer](caesarova-sifra.md) zůstávají četnosti písmen i samotná písmena stejné. Mění se jen pořadí.
