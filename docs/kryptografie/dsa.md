# DSA

*Digital Signature Algorithm*: asymetrický algoritmus pro **podepisování** a ověřování dat. Podpis dokazuje,
že zprávu vytvořil majitel soukromého klíče (**autenticita**) a že nebyla změněna (**integrita**).
Bezpečnost stojí na [diskrétním logaritmu](diffie-hellman.md#diskretni-logaritmus). Používá se v SSH, TLS, PGP a u certifikátů.
Varianta na eliptických křivkách je ECDSA.
{ .lead }

Nepodepisuje se celá zpráva, ale její **otisk** $H(m)$ z hashovací funkce (krátké číslo, které se při
jakékoli změně zprávy změní).

## Parametry a klíče

- $n$: velké prvočíslo, modul (2048 nebo 3072 bitů)
- $q$: prvočíslo dělící $n - 1$ (224 nebo 256 bitů)
- $g$: generátor podgrupy řádu $q$, tedy $g^q \bmod n = 1$ (jako u [Diffie-Hellmana](diffie-hellman.md))
- **soukromý klíč** $S_k \in \{1, \dots, q - 1\}$
- **veřejný klíč** $V_k = g^{S_k} \bmod n$. Z $V_k$ nejde $S_k$ získat (diskrétní logaritmus).

## Podpis

1. Zvol náhodné $k$, $1 < k < q$, **pro každou zprávu jiné**.
2. $r = (g^k \bmod n) \bmod q$
3. $s = k^{-1} \cdot (H(m) + S_k \cdot r) \bmod q$ ($k^{-1}$ je [inverze](inverzni-prvek.md) modulo $q$)
4. Podpis je dvojice $(r, s)$.

## Ověření

Ověřovatel zná $n, q, g, V_k$, zprávu $m$ a podpis $(r, s)$:

1. $w = s^{-1} \bmod q$
2. $u_1 = H(m) \cdot w \bmod q$
3. $u_2 = r \cdot w \bmod q$
4. $v = (g^{u_1} \cdot V_k^{u_2} \bmod n) \bmod q$
5. Podpis platí $\iff v = r$.

<div class="dsa" data-n="23" data-q="11" data-g="4" data-sk="9" data-k="4" data-h="4"></div>

??? question "Cvičení: $n = 23$, $q = 11$, $g = 4$, $S_k = 9$, $k = 4$, $H(m) = 4$"
    Kontrola: $11 \mid 22$ ✓, $4^{11} \bmod 23 = 1$ ✓

    **Podpis**

    - $V_k = 4^9 \bmod 23 = \mathbf{13}$
    - $g^k = 4^4 \bmod 23 = 3$, $\ r = 3 \bmod 11 = \mathbf{3}$
    - $k^{-1} = 4^{-1} \bmod 11 = 3$ (protože $4 \cdot 3 = 12 \equiv 1$)
    - $s = 3 \cdot (4 + 9 \cdot 3) \bmod 11 = 3 \cdot 31 \bmod 11 = 93 \bmod 11 = \mathbf{5}$

    **Ověření**

    - $w = 5^{-1} \bmod 11 = \mathbf{9}$ ($5 \cdot 9 = 45 \equiv 1$)
    - $u_1 = 4 \cdot 9 \bmod 11 = \mathbf{3}$
    - $u_2 = 3 \cdot 9 \bmod 11 = \mathbf{5}$
    - $v = (4^3 \cdot 13^5 \bmod 23) \bmod 11 = (18 \cdot 4 \bmod 23) \bmod 11 = 3 \bmod 11 = \mathbf{3}$

    $v = r = 3$ ⇒ podpis je **platný**.

!!! warning "Proč nové $k$ pro každou zprávu"
    Když se stejné $k$ použije pro dvě zprávy, dá se ze dvou podpisů dopočítat $k$ a z něj soukromý klíč $S_k$.
    Přesně takhle byl v roce 2010 prolomen podpisový klíč konzole PlayStation 3: Sony v ECDSA používala pořád stejné $k$.
