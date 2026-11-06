# Prázdná množina

**Prázdná množina** $\emptyset$ je množina, která nemá žádný prvek.
{ .lead }

!!! definice "Definice"

    $$\emptyset = \{\}, \qquad x \notin \emptyset \text{ pro každé } x.$$

    Její [mohutnost](mohutnost.md) je $|\emptyset| = 0$.

## Vlastnosti

- **Je jen jedna.** Dvě množiny bez prvků mají stejné prvky (žádné), takže [se rovnají](podmnozina.md#rovnost-mnozin).
  Proto *„ta"* prázdná množina, ne *„nějaká"*.
- **Je podmnožinou každé množiny:** $\emptyset \subseteq A$.
  Aby $\emptyset \subseteq A$ neplatilo, musel by existovat prvek $\emptyset$, který v $A$ není — a žádný takový není.
  (Tomu se říká *pravda „naprázdno"*.)
- Vzniká při operacích: $A \cap B = \emptyset$ pro [disjunktní](prunik.md#disjunktni-mnoziny) množiny, $A \setminus A = \emptyset$.

## Pozor: $\emptyset \neq \{\emptyset\}$

Představ si množinu jako krabici:

<div class="figure">
<svg viewBox="0 0 420 150" role="img" aria-label="Prázdná krabice a krabice s prázdnou krabicí">
  <rect x="40" y="30" width="120" height="85" rx="6" class="f-line"/>
  <text x="100" y="142" class="f-num">∅ — 0 prvků</text>
  <rect x="250" y="30" width="120" height="85" rx="6" class="f-line"/>
  <rect x="285" y="58" width="50" height="38" rx="4" class="f-fill"/>
  <text x="310" y="142" class="f-num">{∅} — 1 prvek</text>
</svg>
</div>

- $\emptyset$ je **prázdná krabice**.
- $\{\emptyset\}$ je **krabice, ve které je prázdná krabice** — má tedy jeden prvek.

??? question "Cvičení: platí $\emptyset \in \{\emptyset\}$? A $\emptyset \subseteq \{\emptyset\}$?"
    Obojí platí. $\emptyset$ je prvkem $\{\emptyset\}$ (je to ta krabice uvnitř)
    a zároveň je podmnožinou každé množiny.

??? question "Cvičení: kolik prvků má $\{\emptyset, \{\emptyset\}\}$?"
    Dva: prázdnou množinu a množinu obsahující prázdnou množinu.
