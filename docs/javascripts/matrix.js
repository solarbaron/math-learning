/*
 * Interaktivní ukázky k maticím. Počítá se přesně ve zlomcích.
 *
 *   <div class="gauss" data-mode="echelon" data-m="1 2 3; 4 5 6"></div>   krokování úprav
 *        data-mode: echelon (schodovitý tvar) | rref (redukovaný) | det (determinant) | inverse (Gauss–Jordan)
 *   <div class="sarrus" data-m="2 1 3; 1 -1 2; 3 2 1"></div>               Sarrusovo pravidlo
 *   <div class="laplace" data-m="..."></div>                               Laplaceův rozvoj (3×3, 4×4)
 *   <div class="det2d" data-m="3 1; 1 2"></div>                            determinant jako plocha
 *   <div class="matmul" data-a="1 2; 3 4" data-b="5 6; 7 8"></div>         násobení matic
 *   <div class="adjugate" data-m="1 2 3; 0 1 4; 5 6 0"></div>              inverze přes adjungovanou matici
 *
 * Matice se zapisuje po řádcích oddělených středníkem (nebo novým řádkem),
 * čísla mezerou. Povolené jsou zlomky 2/3 a desetinná čísla s tečkou.
 */
(function () {
  "use strict";
  const { svgEl, h } = window.WidgetKit;

  /* ---------- zlomky ---------- */

  const igcd = (a, b) => {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  };

  class Q {
    constructor(n, d = 1) {
      if (d === 0) throw new Error("Dělení nulou");
      if (d < 0) { n = -n; d = -d; }
      const g = igcd(n, d) || 1;
      this.n = n / g;
      this.d = d / g;
      if (!Number.isSafeInteger(this.n) || !Number.isSafeInteger(this.d)) {
        throw new Error("Čísla jsou na přesný výpočet moc velká");
      }
    }
    add(o) { return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { return new Q(this.n * o.n, this.d * o.d); }
    div(o) { return new Q(this.n * o.d, this.d * o.n); }
    abs() { return new Q(Math.abs(this.n), this.d); }
    get zero() { return this.n === 0; }
    get unit() { return this.d === 1 && Math.abs(this.n) === 1; }
    eq(o) { return this.n === o.n && this.d === o.d; }
    toString() {
      const s = this.n < 0 ? "−" : "", a = Math.abs(this.n);
      return this.d === 1 ? s + a : `${s}${a}/${this.d}`;
    }
    // Ve výrazu: záporné číslo v závorce.
    paren() { return this.n < 0 ? `(${this})` : `${this}`; }
  }
  const ZERO = new Q(0), ONE = new Q(1);

  function parseQ(s) {
    s = s.replace(/−/g, "-");
    let m;
    if ((m = s.match(/^(-?\d+)\/(\d+)$/))) return new Q(+m[1], +m[2]);
    if ((m = s.match(/^(-?)(\d*)\.(\d+)$/))) {
      const d = 10 ** m[3].length;
      return new Q((m[1] ? -1 : 1) * (+(m[2] || 0) * d + +m[3]), d);
    }
    if (/^-?\d+$/.test(s)) return new Q(+s);
    throw new Error(`Nerozumím číslu „${s}“`);
  }

  function parseMatrix(src) {
    const rows = src.split(/[;\n]/).map(r => r.trim()).filter(Boolean)
      .map(r => r.split(/[\s,]+/).filter(Boolean).map(parseQ));
    if (!rows.length) throw new Error("Prázdná matice");
    if (rows.some(r => r.length !== rows[0].length)) throw new Error("Všechny řádky musí mít stejný počet čísel");
    return rows;
  }

  const range = n => [...Array(n).keys()];
  const clone = M => M.map(r => r.slice());
  const minor = (M, i, j) => M.filter((_, r) => r !== i).map(row => row.filter((_, c) => c !== j));
  const identity = n => range(n).map(i => range(n).map(j => (i === j ? ONE : ZERO)));

  function det(M) {
    const n = M.length;
    if (n === 1) return M[0][0];
    if (n === 2) return M[0][0].mul(M[1][1]).sub(M[0][1].mul(M[1][0]));
    let s = ZERO;
    M[0].forEach((a, j) => {
      if (a.zero) return;
      const t = a.mul(det(minor(M, 0, j)));
      s = j % 2 ? s.sub(t) : s.add(t);
    });
    return s;
  }

  function matmul(A, B) {
    return A.map(row => range(B[0].length).map(j =>
      row.reduce((s, a, k) => s.add(a.mul(B[k][j])), ZERO)));
  }

  /* ---------- vykreslení ---------- */

  function qNode(q) {
    if (q.d === 1) return document.createTextNode(String(q));
    return h("span", { class: "q-frac" },
      h("span", { text: (q.n < 0 ? "−" : "") + Math.abs(q.n) }), h("span", { text: String(q.d) }));
  }

  // Vrací { el, td[i][j], tr[i] }; o.aug = index sloupce za svislou čarou.
  function matTable(M, o = {}) {
    const table = h("table", { class: "mx" + (o.small ? " mx-small" : "") });
    const td = [], tr = [];
    M.forEach((row, i) => {
      const r = h("tr");
      tr.push(r);
      td.push(row.map((q, j) => {
        const c = h("td", { class: o.aug && j === o.aug ? "aug" : "" }, qNode(q));
        r.appendChild(c);
        return c;
      }));
      table.appendChild(r);
    });
    return { el: h("span", { class: "mx-wrap" }, table), td, tr };
  }

  const SUB = "₀₁₂₃₄₅₆₇₈₉";
  const R = i => "R" + String(i + 1).split("").map(d => SUB[d]).join("");
  const coef = q => (q.eq(ONE) ? "" : (q.d === 1 ? `${q}·` : `(${q})·`));

  function button(text, onClick) {
    const b = h("button", { type: "button", text });
    b.addEventListener("click", onClick);
    return b;
  }

  function guard(msg, inputs, fn) {
    return () => {
      try {
        fn();
        msg.textContent = "";
        inputs.forEach(i => i.classList.remove("invalid"));
      } catch (e) {
        msg.textContent = e.message;
        inputs.forEach(i => i.classList.add("invalid"));
      }
    };
  }

  // Mřížka políček pro zadání čtvercové matice.
  function gridInput(M, onChange) {
    const table = h("table", { class: "mx mx-grid" });
    const cells = M.map(row => {
      const tr = h("tr");
      const ins = row.map(q => {
        const inp = h("input", { type: "text", class: "mx-cell", value: String(q).replace("−", "-"),
          inputmode: "decimal", "aria-label": "prvek matice" });
        inp.addEventListener("input", onChange);
        inp.addEventListener("focus", () => inp.select());
        tr.appendChild(h("td", {}, inp));
        return inp;
      });
      table.appendChild(tr);
      return ins;
    });
    const read = () => cells.map(row => row.map(inp => parseQ(inp.value.trim() || "0")));
    return { el: h("span", { class: "mx-wrap" }, table), read, inputs: cells.flat() };
  }

  /* ---------- Gaussova eliminace ---------- */

  function gaussSteps(M0, mode, ncols) {
    const A = clone(M0), n = A.length, full = mode === "rref" || mode === "inverse";
    ncols = ncols ?? A[0].length;
    let r = 0, sign = 1;
    const pivots = [];
    const steps = [{ A: clone(A), op: "Výchozí matice", rows: [], pivot: null, sign }];
    const push = (op, rows, pivot, why) => steps.push({ A: clone(A), op, rows, pivot, sign, why });

    for (let c = 0; c < ncols && r < n; c++) {
      const cand = range(n).filter(i => i >= r && !A[i][c].zero);
      if (!cand.length) continue;
      // Pivot: první nenulový; když je pod ním ±1, vezmeme radši ten (hezčí čísla).
      let p = cand[0];
      if (!A[r][c].unit) {
        const one = cand.find(i => A[i][c].unit);
        if (one !== undefined) p = one;
      }
      if (p !== r) {
        [A[r], A[p]] = [A[p], A[r]];
        sign = -sign;
        push(`${R(r)} ↔ ${R(p)}`, [r, p], [r, c],
          A[p][c].zero ? "Na místě pivotu je nula – prohodíme řádky." : "Prohodíme řádky, ať je pivot ±1 (hezčí čísla).");
      }
      if (full && !A[r][c].eq(ONE)) {
        const k = A[r][c];
        A[r] = A[r].map(x => x.div(k));
        push(`${R(r)} ← ${R(r)} : ${k.paren()}`, [r], [r, c], "Vydělíme řádek pivotem, ať je na jeho místě 1.");
      }
      const targets = range(n).filter(i => (full ? i !== r : i > r));
      for (const i of targets) {
        if (A[i][c].zero) continue;
        const f = A[i][c].div(A[r][c]);
        A[i] = A[i].map((x, j) => x.sub(f.mul(A[r][j])));
        push(`${R(i)} ← ${R(i)} ${f.n < 0 ? "+" : "−"} ${coef(f.abs())}${R(r)}`, [i], [r, c],
          `Vynulujeme prvek ${i < r ? "nad" : "pod"} pivotem.`);
      }
      pivots.push([r, c]);
      r++;
    }
    return { steps, rank: r, sign, pivots };
  }

  function gauss(div) {
    const mode = ["echelon", "rref", "det", "inverse"].includes(div.dataset.mode) ? div.dataset.mode : "echelon";
    const ta = h("textarea", { class: "widget-input mx-input", rows: 4, spellcheck: "false",
      "aria-label": "Matice po řádcích" });
    ta.value = (div.dataset.m || "2 1 -1; -3 -1 2; -2 1 2").split(";").map(s => s.trim()).join("\n");
    const opEl = h("div", { class: "mx-op" });
    const view = h("div", { class: "mx-view" });
    const note = h("div", { class: "mx-note" });
    const hist = h("ol", { class: "mx-hist" });
    const msg = h("div", { class: "widget-msg" });
    let res = null, k = 0, aug = null, n = 0;

    const ctl = h("div", { class: "widget-buttons" },
      button("◀ Zpět", () => { k = Math.max(0, k - 1); draw(); }),
      button("Další krok ▶", () => { k = Math.min(res.steps.length - 1, k + 1); draw(); }),
      button("Vše", () => { k = res.steps.length - 1; draw(); }),
      button("Znovu", () => { k = 0; draw(); }));
    div.append(
      h("div", { class: "mx-input-row" },
        h("label", { class: "mx-input-label", text: "Matice – každý řádek na nový řádek, čísla oddělená mezerou:" }), ta),
      ctl, opEl, view, note, hist, msg);

    function draw() {
      if (!res) return;
      const last = res.steps.length - 1, st = res.steps[k];
      opEl.replaceChildren(
        h("span", { class: "mx-step", text: k ? `Krok ${k} / ${last}` : `0 / ${last}` }),
        h("span", { class: "mx-opname", text: k ? st.op : "Výchozí matice" }),
        h("span", { class: "mx-why", text: st.why || "" }));

      const t = matTable(st.A, { aug });
      st.rows.forEach(i => t.tr[i].classList.add("hl"));
      if (st.pivot) t.td[st.pivot[0]][st.pivot[1]].classList.add("pivot");
      if (k === last) {
        // Schody: pivoty zvýraznit, nuly pod schody ztlumit.
        st.A.forEach((row, i) => {
          const lead = res.pivots[i] ? res.pivots[i][1] : Infinity;
          row.forEach((_, j) => {
            if (aug !== null && j >= aug) return;
            if (j < lead) t.td[i][j].classList.add("below");
            if (j === lead) t.td[i][j].classList.add("lead");
          });
        });
      }
      view.replaceChildren(t.el);

      note.replaceChildren(...noteFor(st, k === last));
      hist.replaceChildren(...res.steps.slice(1).map((s, i) => {
        const li = h("li", { class: (i + 1 === k ? "cur" : "") + (i + 1 > k ? " todo" : ""), text: s.op });
        li.addEventListener("click", () => { k = i + 1; draw(); });
        return li;
      }));
    }

    function noteFor(st, final) {
      const out = [];
      if (mode === "det") {
        const prefix = st.sign < 0 ? "−" : "";
        out.push(h("div", { text: `det A = ${prefix}det(aktuální matice)` +
          (st.sign < 0 ? "   (lichý počet prohození řádků → opačné znaménko)" : "") }));
        if (final) {
          const diag = range(n).map(i => st.A[i][i]);
          const prod = diag.reduce((a, b) => a.mul(b), ONE);
          const value = st.sign < 0 ? new Q(-prod.n, prod.d) : prod;
          out.push(h("div", { class: "mx-result",
            text: res.rank < n
              ? "Na diagonále schodovitého tvaru je nula → det A = 0 (matice je singulární)."
              : `Trojúhelníková matice: det = součin diagonály. det A = ${prefix}${diag.map(q => q.paren()).join(" · ")} = ${value}` }));
        }
      } else if (mode === "inverse") {
        if (final && res.rank < n) {
          out.push(h("div", { class: "mx-result",
            text: "Vlevo nejde vyrobit jednotkovou matici (hodnost < n) → A je singulární a A⁻¹ neexistuje." }));
        } else if (final) {
          const inv = st.A.map(row => row.slice(n));
          out.push(h("div", { class: "mx-result", text: "Vlevo je jednotková matice E, vpravo zůstala inverzní matice:" }),
            h("div", { class: "mx-inline" }, h("span", { text: "A⁻¹ = " }), matTable(inv).el));
        } else {
          out.push(h("div", { text: "Cíl: úpravami řádků změnit levou polovinu na E. Pravá polovina se upravuje stejně." }));
        }
      } else if (final) {
        out.push(h("div", { class: "mx-result",
          text: `${mode === "rref" ? "Redukovaný schodovitý tvar" : "Schodovitý tvar"}. ` +
            `Nenulových řádků (schodů) je ${res.rank} → hodnost h(A) = ${res.rank}.` }));
      }
      return out;
    }

    const compute = guard(msg, [ta], () => {
      let M = parseMatrix(ta.value);
      n = M.length;
      aug = null;
      let ncols;
      if (mode === "det" || mode === "inverse") {
        if (M[0].length !== n) throw new Error("Matice musí být čtvercová");
      }
      if (mode === "inverse") {
        const E = identity(n);
        M = M.map((row, i) => row.concat(E[i]));
        aug = n;
        ncols = n;
      }
      res = gaussSteps(M, mode, ncols);
      k = Math.min(k, res.steps.length - 1);
      draw();
    });
    ta.addEventListener("input", () => { k = 0; compute(); });
    compute();
  }

  /* ---------- Sarrusovo pravidlo ---------- */

  function sarrus(div) {
    const holder = h("div", { class: "widget-svg sar-holder" });
    const terms = h("div", { class: "sar-terms" });
    const result = h("div", { class: "mx-result" });
    const msg = h("div", { class: "widget-msg" });
    const grid = gridInput(parseMatrix(div.dataset.m || "2 1 3; 1 -1 2; 3 2 1"), () => update());
    div.append(h("div", { class: "mx-split" },
      h("div", {}, h("div", { class: "mx-caption", text: "A =" }), grid.el), holder), terms, result, msg);

    const update = guard(msg, grid.inputs, () => {
      const M = grid.read();
      const cw = 62, ch = 44, x0 = 14, y0 = 14;
      const W = x0 * 2 + 5 * cw, H = y0 * 2 + 3 * ch;
      const cx = j => x0 + cw * (j + 0.5), cy = i => y0 + ch * (i + 0.5);
      const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "sar-svg", style: `max-width:${W * 1.25}px` });
      svgEl("line", { x1: x0 + 3 * cw, y1: 4, x2: x0 + 3 * cw, y2: H - 4, class: "sar-sep" }, svg);

      const diags = [];
      for (let k = 0; k < 3; k++) {
        diags.push({ plus: true, cells: [[0, k], [1, k + 1], [2, k + 2]] });
      }
      for (let k = 0; k < 3; k++) {
        diags.push({ plus: false, cells: [[0, k + 2], [1, k + 1], [2, k]] });
      }
      const bands = diags.map((d, idx) => {
        const [a, , c] = d.cells;
        const dx = (cx(c[1]) - cx(a[1])) * 0.12, dy = (cy(c[0]) - cy(a[0])) * 0.12;
        const off = (d.plus ? -1 : 1) * 3;
        return svgEl("line", { x1: cx(a[1]) - dx, y1: cy(a[0]) - dy + off, x2: cx(c[1]) + dx, y2: cy(c[0]) + dy + off,
          class: `sar-band ${d.plus ? "plus" : "minus"}`, "data-i": idx }, svg);
      });
      const texts = [];
      for (let i = 0; i < 3; i++) {
        texts.push(range(5).map(j => {
          const t = svgEl("text", { x: cx(j), y: cy(i), class: "sar-num" + (j > 2 ? " copy" : "") }, svg);
          t.textContent = String(M[i][j % 3]);
          return t;
        }));
      }
      holder.replaceChildren(svg);

      const vals = diags.map(d => d.cells.reduce((p, [i, j]) => p.mul(M[i][j % 3]), ONE));
      const rows = diags.map((d, idx) => {
        const el = h("div", { class: `sar-term ${d.plus ? "plus" : "minus"}` },
          h("span", { class: "sar-sign", text: d.plus ? "+" : "−" }),
          h("span", { text: d.cells.map(([i, j]) => M[i][j % 3].paren()).join(" · ") + ` = ${vals[idx]}` }));
        const on = flag => {
          bands[idx].classList.toggle("on", flag);
          el.classList.toggle("on", flag);
          d.cells.forEach(([i, j]) => texts[i][j].classList.toggle("on", flag));
        };
        el.addEventListener("pointerenter", () => on(true));
        el.addEventListener("pointerleave", () => on(false));
        bands[idx].addEventListener("pointerenter", () => on(true));
        bands[idx].addEventListener("pointerleave", () => on(false));
        return el;
      });
      terms.replaceChildren(
        h("div", { class: "sar-col" }, h("div", { class: "sar-head", text: "hlavní diagonály (+)" }), ...rows.slice(0, 3)),
        h("div", { class: "sar-col" }, h("div", { class: "sar-head", text: "vedlejší diagonály (−)" }), ...rows.slice(3)));
      const P = vals.slice(0, 3).reduce((a, b) => a.add(b), ZERO);
      const Mi = vals.slice(3).reduce((a, b) => a.add(b), ZERO);
      result.textContent = `det A = (${vals.slice(0, 3).map(v => v.paren()).join(" + ")}) − (${vals.slice(3).map(v => v.paren()).join(" + ")})` +
        ` = ${P} − ${Mi.paren()} = ${P.sub(Mi)}`;
    });
    update();
  }

  /* ---------- Laplaceův rozvoj ---------- */

  function laplace(div) {
    const M0 = parseMatrix(div.dataset.m || "2 0 1 0; 1 3 2 1; 0 1 -1 2; 3 2 0 1");
    const n = M0.length;
    const mainBox = h("div", { class: "lp-main" });
    const lineBtns = h("div", { class: "widget-buttons lp-lines" });
    const terms = h("div", { class: "lp-terms" });
    const result = h("div", { class: "mx-result" });
    const msg = h("div", { class: "widget-msg" });
    const grid = gridInput(M0, () => { auto = true; update(); });
    let sel = null, auto = true;

    const signs = matTable(range(n).map(i => range(n).map(j => new Q((i + j) % 2 ? -1 : 1))), { small: true });
    signs.td.flat().forEach(c => { c.textContent = c.textContent === "1" ? "+" : "−"; });
    div.append(
      h("div", { class: "mx-split" },
        h("div", {}, h("div", { class: "mx-caption", text: "A =" }), grid.el),
        h("div", {}, h("div", { class: "mx-caption", text: "znaménka (−1)ⁱ⁺ʲ" }), signs.el)),
      h("div", { class: "mx-caption", text: "Rozvoj podle:" }), lineBtns, mainBox, terms, result, msg);

    const update = guard(msg, grid.inputs, () => {
      const M = grid.read();
      const zeros = (row, idx) => range(n).filter(k => (row ? M[idx][k] : M[k][idx]).zero).length;
      if (auto || !sel) {
        let best = { row: true, idx: 0, z: -1 };
        [true, false].forEach(row => range(n).forEach(idx => {
          const z = zeros(row, idx);
          if (z > best.z) best = { row, idx, z };
        }));
        sel = best;
      }
      lineBtns.replaceChildren(...[true, false].flatMap(row => range(n).map(idx => {
        const z = zeros(row, idx);
        const b = button(`${idx + 1}. ${row ? "řádek" : "sloupec"}${z ? ` (${z}× 0)` : ""}`, () => {
          sel = { row, idx }; auto = false; update();
        });
        if (sel.row === row && sel.idx === idx) b.classList.add("on");
        return b;
      })));

      const main = matTable(M);
      range(n).forEach(k => {
        const [i, j] = sel.row ? [sel.idx, k] : [k, sel.idx];
        main.td[i][j].classList.add("lp-sel");
      });
      mainBox.replaceChildren(main.el);

      let sum = ZERO;
      const parts = [];
      terms.replaceChildren(...range(n).map(k => {
        const [i, j] = sel.row ? [sel.idx, k] : [k, sel.idx];
        const a = M[i][j], plus = (i + j) % 2 === 0;
        const mi = minor(M, i, j), dm = det(mi);
        const val = plus ? a.mul(dm) : new Q(0).sub(a.mul(dm));
        sum = sum.add(val);
        parts.push(val.paren());
        const el = h("div", { class: "lp-term" + (a.zero ? " zero" : "") },
          h("span", { class: "lp-sign", text: plus ? "+" : "−" }),
          h("span", { class: "lp-a", text: a.paren() }),
          h("span", { text: "·" }),
          h("span", { class: "lp-det", text: "det" }), matTable(mi, { small: true }).el,
          h("span", { class: "lp-val", text: a.zero
            ? "= 0   (prvek je 0, minor nepočítáme)"
            : `= ${plus ? "" : "−"}${a.paren()} · ${dm.paren()} = ${val}` }));
        const on = flag => {
          range(n).forEach(t => {
            main.td[i][t].classList.toggle("lp-cross", flag);
            main.td[t][j].classList.toggle("lp-cross", flag);
          });
          main.td[i][j].classList.toggle("lp-pick", flag);
          el.classList.toggle("on", flag);
        };
        el.addEventListener("pointerenter", () => on(true));
        el.addEventListener("pointerleave", () => on(false));
        return el;
      }));
      result.textContent = `det A = ${parts.join(" + ")} = ${sum}`;
    });
    update();
  }

  /* ---------- inverze přes adjungovanou matici ---------- */

  function adjugate(div) {
    const M0 = parseMatrix(div.dataset.m || "1 2 3; 0 1 4; 5 6 0");
    const n = M0.length;
    const grid = gridInput(M0, () => update());
    const out = h("div", { class: "adj-steps" });
    const msg = h("div", { class: "widget-msg" });
    div.append(h("div", { class: "mx-split" },
      h("div", {}, h("div", { class: "mx-caption", text: "A =" }), grid.el)), out, msg);

    const sub = (i, j) => `${String(i + 1).split("").map(d => SUB[d]).join("")}${String(j + 1).split("").map(d => SUB[d]).join("")}`;
    const step = (num, title, ...body) =>
      h("div", { class: "adj-step" }, h("div", { class: "adj-title" },
        h("span", { class: "adj-num", text: num }), h("span", { text: title })), ...body);

    const update = guard(msg, grid.inputs, () => {
      const M = grid.read();
      if (M.length !== M[0].length) throw new Error("Matice musí být čtvercová");
      const d = det(M);
      const s1 = step("1", "Determinant",
        h("div", { class: "mx-result", text: `det A = ${d}` }),
        h("div", { class: "mx-why", text: d.zero
          ? "det A = 0 → matice je singulární, inverzní matice neexistuje. Dál nepokračujeme."
          : "det A ≠ 0 → inverzní matice existuje." }));
      if (d.zero) { out.replaceChildren(s1); return; }

      // Algebraické doplňky A_ij = (−1)^(i+j) · det M_ij
      const cof = range(n).map(i => range(n).map(j => {
        const m = n === 1 ? ONE : det(minor(M, i, j));
        return (i + j) % 2 ? new Q(0).sub(m) : m;
      }));
      const main = matTable(M), ct = matTable(cof);
      const detail = h("div", { class: "adj-detail" });
      const show = (i, j) => {
        main.td.forEach((row, r) => row.forEach((c, k) => {
          c.classList.toggle("lp-cross", r === i || k === j);
          c.classList.toggle("lp-pick", r === i && k === j);
        }));
        ct.td.forEach((row, r) => row.forEach((c, k) => c.classList.toggle("pivot", r === i && k === j)));
        const plus = (i + j) % 2 === 0;
        detail.replaceChildren(
          h("span", { text: `A${sub(i, j)} = (−1)${String(i + j + 2).split("").map(c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]).join("")} · det` }),
          n > 1 ? matTable(minor(M, i, j), { small: true }).el : h("span", { text: "(1)" }),
          h("span", { text: `= ${plus ? "+" : "−"}${(plus ? cof[i][j] : new Q(0).sub(cof[i][j])).paren()} = ${cof[i][j]}` }));
      };
      ct.td.forEach((row, i) => row.forEach((c, j) => {
        c.classList.add("mm-cell");
        c.addEventListener("pointerenter", () => show(i, j));
        c.addEventListener("click", () => show(i, j));
      }));
      show(0, 0);
      const s2 = step("2", "Algebraické doplňky – každý prvek nahradíme (±) determinantem minoru",
        h("div", { class: "mx-inline" }, main.el, h("span", { text: "→" }), ct.el),
        detail,
        h("div", { class: "mx-why", text: "Najeď na prvek vpravo: škrtne se jeho řádek a sloupec, zbytek je minor. Znaménko podle šachovnice + − + …" }));

      const adj = range(n).map(i => range(n).map(j => cof[j][i]));
      const s3 = step("3", "Adjungovaná matice = transponovaná matice doplňků",
        h("div", { class: "mx-inline" }, h("span", { text: "adj A = " }), matTable(adj).el));

      const inv = adj.map(row => row.map(x => x.div(d)));
      const check = matmul(M, inv).every((row, i) => row.every((x, j) => x.eq(i === j ? ONE : ZERO)));
      const s4 = step("4", "Vydělit determinantem",
        h("div", { class: "mx-inline" },
          h("span", { text: `A⁻¹ = 1/${d.paren()} · adj A = ` }), matTable(inv).el),
        h("div", { class: "mx-why", text: check ? "Zkouška: A · A⁻¹ = E ✓" : "" }));
      out.replaceChildren(s1, s2, s3, s4);
    });
    update();
  }

  /* ---------- determinant 2×2 jako plocha ---------- */

  function det2d(div) {
    const M0 = parseMatrix(div.dataset.m || "3 1; 1 2");
    // Sloupce matice jsou vektory u = (a, c), v = (b, d).
    let u = [M0[0][0], M0[1][0]].map(q => q.n / q.d), v = [M0[0][1], M0[1][1]].map(q => q.n / q.d);
    const S = 34, L = 5, size = 2 * L * S;
    const svg = svgEl("svg", { viewBox: `${-L * S} ${-L * S} ${size} ${size}`, class: "det2d-svg" });
    const info = h("div", { class: "det2d-info" });
    div.append(h("div", { class: "mx-split" }, h("div", { class: "widget-svg" }, svg), info),
      h("div", { class: "widget-msg", text: "Táhni za konce šipek. Sloupce matice jsou vektory u a v." }));

    for (let t = -L; t <= L; t++) {
      svgEl("line", { x1: t * S, y1: -L * S, x2: t * S, y2: L * S, class: t ? "d2-grid" : "d2-axis" }, svg);
      svgEl("line", { x1: -L * S, y1: t * S, x2: L * S, y2: t * S, class: t ? "d2-grid" : "d2-axis" }, svg);
    }
    svgEl("rect", { x: 0, y: -S, width: S, height: S, class: "d2-unit" }, svg);
    const poly = svgEl("polygon", { class: "d2-par" }, svg);
    const area = svgEl("text", { class: "d2-area" }, svg);
    const mk = cls => ({
      line: svgEl("line", { x1: 0, y1: 0, class: `d2-vec ${cls}` }, svg),
      head: svgEl("polygon", { class: `d2-head ${cls}` }, svg),
      label: svgEl("text", { class: `d2-label ${cls}` }, svg),
      handle: svgEl("circle", { r: 11, class: `d2-handle ${cls}` }, svg),
    });
    const U = mk("u"), V = mk("v");
    U.label.textContent = "u";
    V.label.textContent = "v";

    const P = ([x, y]) => [x * S, -y * S];
    const fmt = x => String(x).replace("-", "−").replace(".", ",");

    function drawVec(o, w) {
      const [x, y] = P(w), len = Math.hypot(x, y) || 1, ux = x / len, uy = y / len;
      o.line.setAttribute("x2", x - ux * 8);
      o.line.setAttribute("y2", y - uy * 8);
      o.head.setAttribute("points", `${x},${y} ${x - ux * 12 - uy * 6},${y - uy * 12 + ux * 6} ${x - ux * 12 + uy * 6},${y - uy * 12 - ux * 6}`);
      o.handle.setAttribute("cx", x);
      o.handle.setAttribute("cy", y);
      o.label.setAttribute("x", x + ux * 16 + 4);
      o.label.setAttribute("y", y + uy * 16 + 4);
    }

    function draw() {
      const d = u[0] * v[1] - v[0] * u[1];
      const pts = [[0, 0], u, [u[0] + v[0], u[1] + v[1]], v].map(P);
      poly.setAttribute("points", pts.map(p => p.join(",")).join(" "));
      poly.setAttribute("class", "d2-par " + (d > 0 ? "pos" : d < 0 ? "neg" : "flat"));
      const [mx, my] = P([(u[0] + v[0]) / 2, (u[1] + v[1]) / 2]);
      area.setAttribute("x", mx);
      area.setAttribute("y", my);
      area.textContent = d ? fmt(Math.abs(d)) : "";
      drawVec(U, u);
      drawVec(V, v);
      const M = [[u[0], v[0]], [u[1], v[1]]].map(r => r.map(x => {
        const q = new Q(Math.round(x * 2), 2);
        return q;
      }));
      info.replaceChildren(
        h("div", { class: "mx-inline" }, h("span", { text: "A = " }), matTable(M).el),
        h("div", { class: "mx-result", text: `det A = ${fmt(u[0])} · ${fmt(v[1])} − ${fmt(v[0])} · ${fmt(u[1])} = ${fmt(d)}` }),
        h("div", { text: `plocha rovnoběžníku = |det A| = ${fmt(Math.abs(d))}` }),
        h("div", { class: "d2-orient", text: d > 0
          ? "det > 0: od u k v se točí proti směru hodinových ručiček – orientace zachována."
          : d < 0
            ? "det < 0: od u k v se točí po směru hodinových ručiček – rovnoběžník je „převrácený“."
            : "det = 0: vektory leží na jedné přímce, rovnoběžník se zplácl na úsečku. Matice je singulární." }));
    }

    function drag(o, set) {
      o.handle.addEventListener("pointerdown", e => {
        o.handle.setPointerCapture(e.pointerId);
        const move = ev => {
          const pt = svg.createSVGPoint();
          pt.x = ev.clientX; pt.y = ev.clientY;
          const p = pt.matrixTransform(svg.getScreenCTM().inverse());
          const snap = x => Math.max(-L + 0.5, Math.min(L - 0.5, Math.round((x / S) * 2) / 2));
          set([snap(p.x), snap(-p.y)]);
          draw();
        };
        const up = () => {
          o.handle.removeEventListener("pointermove", move);
          o.handle.removeEventListener("pointerup", up);
        };
        o.handle.addEventListener("pointermove", move);
        o.handle.addEventListener("pointerup", up);
      });
    }
    drag(U, w => (u = w));
    drag(V, w => (v = w));
    draw();
  }

  /* ---------- násobení matic ---------- */

  function matmulWidget(div) {
    const A = parseMatrix(div.dataset.a || "1 2; 3 4"), B = parseMatrix(div.dataset.b || "5 6; 7 8");
    if (A[0].length !== B.length) throw new Error("Počet sloupců A musí být roven počtu řádků B");
    const C = matmul(A, B);
    const ta = matTable(A), tb = matTable(B), tc = matTable(C);
    const formula = h("div", { class: "mx-result" });
    div.append(h("div", { class: "mx-inline mm-row" },
      h("span", { class: "mx-caption", text: "A" }), ta.el, h("span", { text: "·" }),
      h("span", { class: "mx-caption", text: "B" }), tb.el, h("span", { text: "=" }), tc.el), formula,
      h("div", { class: "widget-msg", text: "Najeď na prvek výsledku: řádek A krát sloupec B." }));

    function select(i, j) {
      ta.tr.forEach((r, k) => r.classList.toggle("hl", k === i));
      tb.td.forEach(row => row.forEach((c, k) => c.classList.toggle("hl-col", k === j)));
      tc.td.forEach((row, r) => row.forEach((c, k) => c.classList.toggle("pivot", r === i && k === j)));
      const terms = A[i].map((a, k) => `${a.paren()}·${B[k][j].paren()}`);
      formula.textContent = `c${i + 1}${j + 1} = ${terms.join(" + ")} = ${C[i][j]}`;
    }
    tc.td.forEach((row, i) => row.forEach((c, j) => {
      c.classList.add("mm-cell");
      c.addEventListener("pointerenter", () => select(i, j));
      c.addEventListener("click", () => select(i, j));
    }));
    select(0, 0);
  }

  /* ---------- init ---------- */

  function init(root) {
    const once = (sel, fn) => root.querySelectorAll(sel).forEach(d => {
      if (d.dataset.ready) return;
      d.dataset.ready = "1";
      try { fn(d); } catch (e) { d.textContent = `Chyba widgetu: ${e.message}`; }
    });
    once(".gauss", gauss);
    once(".sarrus", sarrus);
    once(".laplace", laplace);
    once(".det2d", det2d);
    once(".matmul", matmulWidget);
    once(".adjugate", adjugate);
  }

  if (window.document$) document$.subscribe(() => init(document));
  else document.addEventListener("DOMContentLoaded", () => init(document));
})();
