# Radiány

**Radián** měří úhel délkou oblouku na kružnici o poloměru $1$. Plný úhel je obvod $2\pi$, takže $360° = 2\pi$.
V analýze se úhly měří **vždy** v radiánech.
{ .lead }

!!! definice "Převod"
    $$180° = \pi \text{ rad} \qquad\Longrightarrow\qquad x\ \text{rad} = x \cdot \frac{180°}{\pi}, \qquad \alpha° = \alpha \cdot \frac{\pi}{180}$$

    $1\ \text{rad} \approx 57{,}3°$ — úhel, u kterého je oblouk stejně dlouhý jako poloměr.

## Tabulka

| Stupně | $0°$ | $30°$ | $45°$ | $60°$ | $90°$ | $120°$ | $135°$ | $150°$ | $180°$ | $270°$ | $360°$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Radiány | $0$ | $\frac{\pi}{6}$ | $\frac{\pi}{4}$ | $\frac{\pi}{3}$ | $\frac{\pi}{2}$ | $\frac{2\pi}{3}$ | $\frac{3\pi}{4}$ | $\frac{5\pi}{6}$ | $\pi$ | $\frac{3\pi}{2}$ | $2\pi$ |

!!! tip "Jak si to pamatovat"
    $\pi$ = půlkruh. $\frac{\pi}{2}$ = čtvrtkruh (pravý úhel). $\frac{\pi}{6}$ = šestina půlkruhu = $30°$.

!!! example "Příklady"
    - $210° = 210 \cdot \frac{\pi}{180} = \frac{7\pi}{6}$
    - $\frac{5\pi}{4} = \frac54 \cdot 180° = 225°$
    - $2\ \text{rad} = 2 \cdot \frac{180°}{\pi} \approx 114{,}6°$

## Proč radiány

- **délka oblouku** o poloměru $r$ a úhlu $\alpha$ (v rad) je prostě $\ell = r\alpha$, plocha výseče $S = \frac12 r^2 \alpha$
- **derivace**: $(\sin x)' = \cos x$ platí **jen** v radiánech (ve stupních by tam byl činitel $\frac{\pi}{180}$)
- **limita** $\lim_{x \to 0} \frac{\sin x}{x} = 1$ — taky jen v radiánech; pro malé úhly $\sin x \approx x$

!!! warning "Kalkulačka"
    Při počítání s $\pi$ přepni kalkulačku do režimu **RAD**. $\sin(30)$ v režimu RAD je $-0{,}988$, ne $0{,}5$!

## Úhly větší než $2\pi$ a záporné

Úhel se může otočit víckrát nebo opačným směrem (po směru hodinových ručiček je záporný).
$\frac{\pi}{6}$, $\frac{\pi}{6} + 2\pi$, $\frac{\pi}{6} - 2\pi$ míří na stejné místo → mají stejný sinus i kosinus.
Proto jsou goniometrické funkce **periodické**: viz [Grafy](grafy.md).

??? question "Cvičení: převeď $75°$ a $300°$ na radiány"
    $75° = \frac{5\pi}{12}$, $\ 300° = \frac{5\pi}{3}$

??? question "Cvičení: převeď $\frac{3\pi}{5}$ a $\frac{11\pi}{6}$ na stupně"
    $108°$ a $330°$
