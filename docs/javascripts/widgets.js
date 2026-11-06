/*
 * Interaktivní ukázky k množinám.
 *
 *   <div class="set-playground" data-a="1, 2, 3" data-b="3, 4"></div>   kalkulačka A, B
 *   <div class="powerset" data-set="a, b, c"></div>                       Hasseův diagram P(A)
 *   <div class="cartesian" data-a="1, 2, 3" data-b="x, y"></div>          mřížka A × B
 *   <div class="bijection" data-left="1, 2, 3, …" data-right="2, 4, 6, …"
 *        data-left-name="ℕ" data-right-name="S"></div>                    párování prvků
 *   <div class="numline" data-rows="A: ⟨-2; 3) | B: (1; ∞)"></div>        intervaly na ose
 *   <div class="numline" data-interactive data-a="⟨-2; 3)" data-b="(1; 5⟩"></div>
 */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";

  function svgEl(tag, attrs = {}, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function h(tag, attrs = {}, ...children) {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    e.append(...children);
    return e;
  }

  function field(label, value) {
    const input = h("input", { type: "text", class: "widget-input", value });
    const wrap = h("label", { class: "widget-field" }, h("span", { text: label }), input);
    return { wrap, input };
  }

  /* ---------- konečné množiny ---------- */

  function parseSet(src) {
    const inner = src.trim().replace(/^\{/, "").replace(/\}$/, "").trim();
    if (!inner || inner === "∅") return [];
    const out = [];
    inner.split(/[,;]/).map(s => s.trim()).filter(Boolean)
      .forEach(x => { if (!out.includes(x)) out.push(x); });
    return out;
  }

  const isNum = x => /^-?\d+(\.\d+)?$/.test(x);
  function sorted(arr) {
    return arr.every(isNum) ? [...arr].sort((a, b) => a - b) : arr;
  }
  const fmtSet = arr => (arr.length ? `{${sorted(arr).join(", ")}}` : "∅");

  const ops = {
    union: (A, B) => [...A, ...B.filter(x => !A.includes(x))],
    inter: (A, B) => A.filter(x => B.includes(x)),
    diff: (A, B) => A.filter(x => !B.includes(x)),
    sym: (A, B) => [...A.filter(x => !B.includes(x)), ...B.filter(x => !A.includes(x))],
    subset: (A, B) => A.every(x => B.includes(x)),
  };

  /* ---------- kalkulačka ---------- */

  function playground(div) {
    const a = field("A =", div.dataset.a || "1, 2, 3, 4");
    const b = field("B =", div.dataset.b || "3, 4, 5, 6");
    const vbox = h("div", { class: "venn" });
    const venn = window.Venn.render(vbox, { layout: 2 });
    const table = h("table", { class: "widget-table" });
    const facts = h("div", { class: "widget-facts" });
    const hint = h("div", { class: "widget-msg widget-hint",
      text: "Klikni na řádek a uvidíš ho v diagramu. Prvky odděluj čárkou." });
    div.append(h("div", { class: "widget-fields" }, a.wrap, b.wrap),
      h("div", { class: "widget-split" }, vbox, h("div", {}, table, facts)), hint);

    const ROWS = [
      ["A ∪ B", "sjednocení", (A, B) => ops.union(A, B)],
      ["A ∩ B", "průnik", (A, B) => ops.inter(A, B)],
      ["A \\ B", "rozdíl", (A, B) => ops.diff(A, B)],
      ["B \\ A", "rozdíl", (A, B) => ops.diff(B, A)],
      ["A Δ B", "sym. diference", (A, B) => ops.sym(A, B)],
    ];
    let active = "A ∩ B";

    function update() {
      const A = parseSet(a.input.value), B = parseSet(b.input.value);
      table.replaceChildren(...ROWS.map(([expr, name, f]) => {
        const tr = h("tr", { class: expr === active ? "active" : "" },
          h("td", { class: "expr", text: expr }), h("td", { text: fmtSet(f(A, B)) }),
          h("td", { class: "name", text: name }));
        tr.addEventListener("click", () => { active = expr; update(); });
        return tr;
      }));
      const yes = v => (v ? "ano" : "ne");
      facts.replaceChildren(
        h("span", { text: `|A| = ${A.length}` }), h("span", { text: `|B| = ${B.length}` }),
        h("span", { text: `A ⊆ B: ${yes(ops.subset(A, B))}` }),
        h("span", { text: `B ⊆ A: ${yes(ops.subset(B, A))}` }),
        h("span", { text: `A = B: ${yes(ops.subset(A, B) && ops.subset(B, A))}` }),
        h("span", { text: `disjunktní: ${yes(!ops.inter(A, B).length)}` }));
      venn.setExpr(active);
      venn.setElems(sorted(ops.diff(A, B)), sorted(ops.inter(A, B)), sorted(ops.diff(B, A)));
    }
    [a, b].forEach(f => f.input.addEventListener("input", update));
    update();
  }

  /* ---------- potenční množina (Hasseův diagram) ---------- */

  function powerset(div) {
    const f = field("A =", div.dataset.set || "a, b, c");
    const holder = h("div", { class: "widget-svg" });
    const status = h("div", { class: "widget-msg" });
    const list = h("div", { class: "widget-result" });
    div.append(h("div", { class: "widget-fields" }, f.wrap), holder, status, list);

    const popcount = m => m.toString(2).replace(/0/g, "").length;
    const sup = k => String(k).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("");

    function update() {
      let els = parseSet(f.input.value);
      const cut = els.length > 4;
      els = els.slice(0, 4);
      const n = els.length, N = 1 << n;
      const label = m => {
        const xs = els.filter((_, k) => m & (1 << k));
        return xs.length ? `{${xs.join(", ")}}` : "∅";
      };
      const rows = Array.from({ length: n + 1 }, () => []);
      for (let m = 0; m < N; m++) rows[popcount(m)].push(m);
      const widest = Math.max(...rows.map(r => r.length));
      const W = Math.max(300, widest * 92), rowGap = 66, H = n * rowGap + 50;
      const pos = {};
      rows.forEach((r, k) => r.forEach((m, j) => {
        pos[m] = { x: (W / (r.length + 1)) * (j + 1), y: 25 + (n - k) * rowGap };
      }));

      const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "hasse", style: `max-width:${W * 1.1}px` });
      const edges = [], nodes = [];
      for (let m = 0; m < N; m++) {
        for (let k = 0; k < n; k++) {
          if (m & (1 << k)) continue;
          const t = m | (1 << k);
          const line = svgEl("line", { x1: pos[m].x, y1: pos[m].y, x2: pos[t].x, y2: pos[t].y,
            class: "hasse-edge" }, svg);
          edges.push({ a: m, b: t, line });
        }
      }
      for (let m = 0; m < N; m++) {
        const g = svgEl("g", { class: "hasse-node", tabindex: 0 }, svg);
        const text = label(m), w = text.length * 7.6 + 16;
        svgEl("rect", { x: pos[m].x - w / 2, y: pos[m].y - 13, width: w, height: 26, rx: 13 }, g);
        svgEl("text", { x: pos[m].x, y: pos[m].y }, g).textContent = text;
        nodes.push({ m, g });
        const on = () => {
          const sub = t => (t & m) === t;
          nodes.forEach(o => o.g.classList.toggle("sub", sub(o.m)));
          nodes.forEach(o => o.g.classList.toggle("focus", o.m === m));
          edges.forEach(e => e.line.classList.toggle("sub", sub(e.a) && sub(e.b)));
          const k = popcount(m);
          status.textContent = `${text} má ${1 << k} podmnožin (2${sup(k)}) — zvýrazněny.`;
        };
        g.addEventListener("pointerenter", on);
        g.addEventListener("focus", on);
        g.addEventListener("click", on);
      }
      svg.addEventListener("pointerleave", () => {
        nodes.forEach(o => o.g.classList.remove("sub", "focus"));
        edges.forEach(e => e.line.classList.remove("sub"));
        status.textContent = "Najeď na uzel – zvýrazní se všechny jeho podmnožiny.";
      });
      holder.replaceChildren(svg);
      status.textContent = cut ? "Zobrazuji jen první 4 prvky (jinak by byl diagram nečitelný)."
        : "Najeď na uzel – zvýrazní se všechny jeho podmnožiny.";
      list.textContent = `P(A) = {${[...Array(N).keys()].sort((x, y) => popcount(x) - popcount(y))
        .map(label).join(", ")}},   |P(A)| = 2${sup(n)} = ${N}`;
    }
    f.input.addEventListener("input", update);
    update();
  }

  /* ---------- kartézský součin ---------- */

  function cartesian(div) {
    const a = field("A =", div.dataset.a || "1, 2, 3");
    const b = field("B =", div.dataset.b || "x, y");
    const holder = h("div", { class: "widget-svg" });
    const status = h("div", { class: "widget-msg" });
    const list = h("div", { class: "widget-result" });
    div.append(h("div", { class: "widget-fields" }, a.wrap, b.wrap), holder, status, list);

    function update() {
      const A = parseSet(a.input.value).slice(0, 8), B = parseSet(b.input.value).slice(0, 8);
      const cell = 48, ox = 60, oy = 20;
      const W = ox + Math.max(A.length, 1) * cell + 30, H = oy + Math.max(B.length, 1) * cell + 50;
      const X = i => ox + (i + 0.5) * cell, Y = j => oy + (B.length - j - 0.5) * cell;
      const baseY = oy + B.length * cell;
      const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "cartesian-svg", style: `max-width:${W * 1.3}px` });

      svgEl("line", { x1: ox, y1: baseY, x2: W - 10, y2: baseY, class: "axis" }, svg);
      svgEl("line", { x1: ox, y1: baseY, x2: ox, y2: 6, class: "axis" }, svg);
      svgEl("text", { x: W - 14, y: baseY + 34, class: "axis-name" }, svg).textContent = "A";
      svgEl("text", { x: 18, y: 16, class: "axis-name" }, svg).textContent = "B";
      A.forEach((x, i) => {
        svgEl("line", { x1: X(i), y1: oy, x2: X(i), y2: baseY, class: "grid" }, svg);
        svgEl("text", { x: X(i), y: baseY + 18, class: "tick" }, svg).textContent = x;
      });
      B.forEach((y, j) => {
        svgEl("line", { x1: ox, y1: Y(j), x2: W - 20, y2: Y(j), class: "grid" }, svg);
        svgEl("text", { x: ox - 12, y: Y(j), class: "tick tick-y" }, svg).textContent = y;
      });
      const guide = svgEl("path", { class: "guide" }, svg);
      A.forEach((x, i) => B.forEach((y, j) => {
        const c = svgEl("circle", { cx: X(i), cy: Y(j), r: 7, class: "pt", tabindex: 0 }, svg);
        svgEl("title", {}, c).textContent = `(${x}, ${y})`;
        const on = () => {
          guide.setAttribute("d", `M${X(i)} ${baseY}V${Y(j)}H${ox}`);
          status.textContent = `Dvojice (${x}, ${y}): ${x} ∈ A, ${y} ∈ B`;
        };
        c.addEventListener("pointerenter", on);
        c.addEventListener("focus", on);
      }));
      holder.replaceChildren(svg);
      status.textContent = "Najeď na bod – každý bod mřížky je jedna dvojice.";
      const pairs = A.flatMap(x => B.map(y => `(${x}, ${y})`));
      list.textContent = `A × B = ${pairs.length ? `{${pairs.join(", ")}}` : "∅"}` +
        `,   |A × B| = ${A.length} · ${B.length} = ${pairs.length}`;
    }
    [a, b].forEach(f => f.input.addEventListener("input", update));
    update();
  }

  /* ---------- bijekce ---------- */

  function bijection(div) {
    const L = div.dataset.left.split(",").map(s => s.trim());
    const R = div.dataset.right.split(",").map(s => s.trim());
    const n = Math.max(L.length, R.length), step = 56;
    const W = 70 + n * step, H = 130;
    const X = i => 70 + (i + 0.5) * step;
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "bijection-svg", style: `max-width:${W * 1.1}px` });
    svgEl("text", { x: 22, y: 30, class: "row-name" }, svg).textContent = div.dataset.leftName || "";
    svgEl("text", { x: 22, y: 106, class: "row-name" }, svg).textContent = div.dataset.rightName || "";
    for (let i = 0; i < n; i++) {
      const l = L[i], r = R[i];
      const paired = l && r && l !== "…" && r !== "…";
      if (paired) {
        svgEl("line", { x1: X(i), y1: 42, x2: X(i), y2: 88, class: "pair",
          style: `animation-delay:${i * 0.12}s` }, svg);
      }
      if (l) svgEl("text", { x: X(i), y: 30, class: "item" + (paired || l === "…" ? "" : " unmatched") }, svg).textContent = l;
      if (r) svgEl("text", { x: X(i), y: 106, class: "item" + (paired || r === "…" ? "" : " unmatched") }, svg).textContent = r;
    }
    div.appendChild(svg);
  }

  /* ---------- intervaly ---------- */

  const NUM = String.raw`[+\-−]?\s*(?:∞|inf|\d+(?:[.,]\d+)?)`;
  const IV = new RegExp(String.raw`([\[(⟨<])\s*(${NUM})\s*[,;]\s*(${NUM})\s*([\])⟩>])`, "g");

  function parseNum(s) {
    s = s.replace(/\s/g, "").replace("−", "-").replace(",", ".");
    if (/∞|inf/.test(s)) return s.startsWith("-") ? -Infinity : Infinity;
    return parseFloat(s);
  }

  const isEmptyIv = i => i.lo > i.hi || (i.lo === i.hi && !(i.loC && i.hiC));

  function normalize(list) {
    const s = list.filter(i => !isEmptyIv(i)).map(i => ({ ...i }))
      .sort((a, b) => (a.lo < b.lo ? -1 : a.lo > b.lo ? 1 : b.loC - a.loC));
    const out = [];
    for (const i of s) {
      const last = out[out.length - 1];
      if (last && (i.lo < last.hi || (i.lo === last.hi && (i.loC || last.hiC)))) {
        if (i.hi > last.hi) { last.hi = i.hi; last.hiC = i.hiC; }
        else if (i.hi === last.hi) last.hiC = last.hiC || i.hiC;
      } else out.push(i);
    }
    return out;
  }

  function parseIntervals(src) {
    const s = src.trim();
    if (s === "∅" || s === "") return [];
    const list = [];
    const rest = s.replace(IV, (_, lb, a, b, rb) => {
      const lo = parseNum(a), hi = parseNum(b);
      list.push({ lo, hi, loC: "[⟨<".includes(lb) && isFinite(lo), hiC: "]⟩>".includes(rb) && isFinite(hi) });
      return "";
    });
    if (rest.replace(/[∪Uu\s]/g, "") || !list.length) throw new Error(`Nerozumím zápisu „${src}“`);
    return normalize(list);
  }

  const IVOPS = {
    union: (A, B) => normalize([...A, ...B]),
    inter: (A, B) => {
      const out = [];
      A.forEach(a => B.forEach(b => {
        const lo = Math.max(a.lo, b.lo), hi = Math.min(a.hi, b.hi);
        out.push({
          lo, hi,
          loC: a.lo === b.lo ? a.loC && b.loC : a.lo > b.lo ? a.loC : b.loC,
          hiC: a.hi === b.hi ? a.hiC && b.hiC : a.hi < b.hi ? a.hiC : b.hiC,
        });
      }));
      return normalize(out);
    },
    compl: A => {
      const out = [];
      let lo = -Infinity, loC = false;
      for (const i of A) {
        out.push({ lo, loC, hi: i.lo, hiC: !i.loC && isFinite(i.lo) });
        lo = i.hi; loC = !i.hiC && isFinite(i.hi);
      }
      out.push({ lo, loC, hi: Infinity, hiC: false });
      return normalize(out);
    },
  };
  IVOPS.diff = (A, B) => IVOPS.inter(A, IVOPS.compl(B));

  const fmtNum = x => (x === Infinity ? "∞" : x === -Infinity ? "−∞" :
    String(+x.toFixed(4)).replace("-", "−").replace(".", ","));
  const fmtIv = ivs => (ivs.length ? ivs.map(i =>
    `${i.loC ? "⟨" : "("}${fmtNum(i.lo)}; ${fmtNum(i.hi)}${i.hiC ? "⟩" : ")"}`).join(" ∪ ") : "∅");

  function drawNumline(rows) {
    const finite = rows.flatMap(r => r.ivs.flatMap(i => [i.lo, i.hi])).filter(isFinite);
    let min = finite.length ? Math.min(...finite) : -5, max = finite.length ? Math.max(...finite) : 5;
    if (min === max) { min -= 3; max += 3; }
    const pad = Math.max(1, (max - min) * 0.15);
    const range = max - min + 2 * pad;
    const step = [0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 20, 25, 50, 100, 250, 500, 1000]
      .find(s => range / s <= 12) || 1000;
    const lo = Math.floor((min - pad) / step) * step, hi = Math.ceil((max + pad) / step) * step;

    const W = 560, x0 = 74, x1 = W - 22, rowH = 64, top = 34;
    const X = v => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${top + rows.length * rowH - 6}`, class: "numline-svg" });
    rows.forEach((r, k) => {
      const y = top + k * rowH;
      svgEl("text", { x: 6, y, class: "nl-label" }, svg).textContent = r.label;
      svgEl("text", { x: x1, y: y - 16, class: "nl-note" }, svg).textContent =
        (r.label ? `${r.label} = ` : "") + fmtIv(r.ivs);
      svgEl("line", { x1: x0 - 10, y1: y, x2: x1 + 12, y2: y, class: "nl-axis" }, svg);
      svgEl("path", { d: `M${x1 + 14} ${y}l-7 -4v8z`, class: "nl-arrow" }, svg);
      for (let v = lo; v <= hi + 1e-9; v += step) {
        svgEl("line", { x1: X(v), y1: y - 4, x2: X(v), y2: y + 4, class: "nl-tick" }, svg);
        svgEl("text", { x: X(v), y: y + 16, class: "nl-num" }, svg).textContent = fmtNum(+v.toFixed(4));
      }
      r.ivs.forEach(i => {
        const a = isFinite(i.lo) ? X(i.lo) : x0 - 10, b = isFinite(i.hi) ? X(i.hi) : x1 + 12;
        svgEl("line", { x1: a, y1: y, x2: b, y2: y, class: "nl-iv" }, svg);
        [[i.lo, i.loC], [i.hi, i.hiC]].forEach(([v, c]) => {
          if (isFinite(v)) svgEl("circle", { cx: X(v), cy: y, r: 5, class: c ? "nl-closed" : "nl-open" }, svg);
        });
      });
    });
    return svg;
  }

  function numline(div) {
    if (!("interactive" in div.dataset)) {
      const rows = div.dataset.rows.split("|").map(part => {
        const m = part.match(/^\s*([^:]*):(.*)$/);
        return m ? { label: m[1].trim(), ivs: parseIntervals(m[2]) } : { label: "", ivs: parseIntervals(part) };
      });
      div.appendChild(drawNumline(rows));
      return;
    }
    const a = field("A =", div.dataset.a || "⟨-2; 3)");
    const b = field("B =", div.dataset.b || "(1; 5⟩");
    const holder = h("div", { class: "widget-svg" });
    const msg = h("div", { class: "widget-msg widget-hint",
      text: "Piš třeba ⟨-2; 3) nebo <-2; 3) nebo [-2, 3), nekonečno jako ∞ nebo inf, sjednocení jako ∪ nebo u." });
    div.append(h("div", { class: "widget-fields" }, a.wrap, b.wrap), holder, msg);
    function update() {
      try {
        const A = parseIntervals(a.input.value), B = parseIntervals(b.input.value);
        holder.replaceChildren(drawNumline([
          { label: "A", ivs: A }, { label: "B", ivs: B },
          { label: "A ∪ B", ivs: IVOPS.union(A, B) }, { label: "A ∩ B", ivs: IVOPS.inter(A, B) },
          { label: "A \\ B", ivs: IVOPS.diff(A, B) }, { label: "A'", ivs: IVOPS.compl(A) },
        ]));
        div.classList.remove("invalid");
      } catch (e) {
        div.classList.add("invalid");
      }
    }
    [a, b].forEach(f => f.input.addEventListener("input", update));
    update();
  }

  // Sdílené pomůcky pro další soubory s widgety (numbers.js).
  window.WidgetKit = { svgEl, h, field };

  /* ---------- init ---------- */

  function init(root) {
    const once = (sel, fn) => root.querySelectorAll(sel).forEach(d => {
      if (d.dataset.ready) return;
      d.dataset.ready = "1";
      try { fn(d); } catch (e) { d.textContent = `Chyba widgetu: ${e.message}`; }
    });
    once(".set-playground", playground);
    once(".powerset", powerset);
    once(".cartesian", cartesian);
    once(".bijection", bijection);
    once(".numline", numline);
  }

  if (window.document$) document$.subscribe(() => init(document));
  else document.addEventListener("DOMContentLoaded", () => init(document));
})();
