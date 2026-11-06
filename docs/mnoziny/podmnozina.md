# Podmnožina a rovnost

$A$ je **podmnožinou** $B$, když každý prvek $A$ je zároveň prvkem $B$ — $A$ „leží celá uvnitř" $B$.
{ .lead }

!!! definice "Definice"

    $$A \subseteq B \iff \forall x:\ (x \in A \Rightarrow x \in B)$$

    Říkáme také, že $B$ je **nadmnožinou** $A$ ($B \supseteq A$), nebo že $A$ je obsažena v $B$ (*inkluze*).

<div class="venn" data-layout="subset" data-expr="A" data-caption="A ⊆ B"></div>

!!! example "Příklady"
    - $\{1, 3\} \subseteq \{1, 2, 3\}$
    - $\{1, 4\} \not\subseteq \{1, 2, 3\}$, protože $4 \notin \{1, 2, 3\}$
    - $\mathbb{N} \subseteq \mathbb{Z} \subseteq \mathbb{Q} \subseteq \mathbb{R}$ — viz [Číselné množiny](ciselne-mnoziny.md)
    - $\emptyset \subseteq A$ a $A \subseteq A$ pro každou množinu $A$ (viz [Prázdná množina](prazdna-mnozina.md))

## Vlastní podmnožina

Je-li $A \subseteq B$ a zároveň $A \neq B$, je $A$ **vlastní podmnožinou**: $A \subsetneq B$.

!!! warning "Pozor na značení"
    Někteří autoři (a české učebnice často) píší $A \subset B$ ve smyslu $\subseteq$, jiní ve smyslu $\subsetneq$.
    Tady používáme jednoznačné $\subseteq$ a $\subsetneq$.

## Rovnost množin

!!! definice "Definice"
    Množiny jsou si rovny, když mají stejné prvky:

    $$A = B \iff (A \subseteq B \ \land\ B \subseteq A)$$

Tohle je i **návod na důkaz**: chceš-li ukázat $A = B$, ukaž zvlášť $A \subseteq B$ a $B \subseteq A$
(„dvojí inkluze"). Ukázku najdeš u [De Morganových zákonů](zakony.md#dukaz-de-morganova-zakona).

## Vlastnosti inkluze

| | | |
|---|---|---|
| reflexivita | $A \subseteq A$ | |
| tranzitivita | $A \subseteq B \land B \subseteq C \Rightarrow A \subseteq C$ | podmnožina podmnožiny |
| antisymetrie | $A \subseteq B \land B \subseteq A \Rightarrow A = B$ | to je rovnost výše |

## $\in$ vs. $\subseteq$

Nejčastější chyba. $\in$ říká *„je prvkem"*, $\subseteq$ říká *„je částí"*:

| Tvrzení | Platí? | Proč |
|---|---|---|
| $1 \in \{1, 2\}$ | ano | $1$ je jeden z prvků |
| $\{1\} \subseteq \{1, 2\}$ | ano | jediný prvek $\{1\}$ je v $\{1, 2\}$ |
| $\{1\} \in \{1, 2\}$ | **ne** | prvky jsou čísla $1$ a $2$, ne množina $\{1\}$ |
| $1 \subseteq \{1, 2\}$ | **nedává smysl** | $1$ není množina |
| $\{1\} \in \{\{1\}, 2\}$ | ano | tady je $\{1\}$ opravdu prvkem |

Všechny podmnožiny dané množiny tvoří [potenční množinu](potencni-mnozina.md).

??? question "Cvičení: rozhodni, co platí: $\emptyset \in \{1\}$, $\emptyset \subseteq \{1\}$, $\{\emptyset\} \subseteq \{1\}$"
    - $\emptyset \in \{1\}$ — **ne**, jediný prvek je $1$.
    - $\emptyset \subseteq \{1\}$ — **ano**, prázdná množina je podmnožinou každé.
    - $\{\emptyset\} \subseteq \{1\}$ — **ne**, $\emptyset \notin \{1\}$.
