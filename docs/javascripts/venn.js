/*
 * Vennovy diagramy.
 *
 *   <div class="venn" data-expr="A ∪ B"></div>             statický diagram
 *   <div class="venn" data-expr="A" data-layout="subset">   rozložení: 2 | 3 | subset | disjoint
 *   <div class="venn-law" data-left="(A ∪ B)'" data-right="A' ∩ B'"></div>
 *   <div class="venn-explorer" data-sets="3"></div>          interaktivní
 *
 * Výrazy: ∪ (| +), ∩ (& *), \ (-), Δ (^), doplněk ' , závorky, U = univerzum, ∅.
 */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  let uid = 0;

  const LAYOUTS = {
    2: { w: 320, h: 200, sets: [
      { name: "A", cx: 122, cy: 100, r: 66, lx: 62, ly: 40 },
      { name: "B", cx: 198, cy: 100, r: 66, lx: 258, ly: 40 } ] },
    3: { w: 320, h: 262, sets: [
      { name: "A", cx: 126, cy: 100, r: 62, lx: 66, ly: 42 },
      { name: "B", cx: 194, cy: 100, r: 62, lx: 254, ly: 42 },
      { name: "C", cx: 160, cy: 160, r: 62, lx: 160, ly: 242 } ] },
    subset: { w: 320, h: 200, sets: [
      { name: "A", cx: 140, cy: 112, r: 40, lx: 140, ly: 112 },
      { name: "B", cx: 160, cy: 100, r: 84, lx: 82, ly: 34 } ] },
    disjoint: { w: 320, h: 200, sets: [
      { name: "A", cx: 95, cy: 100, r: 58, lx: 45, ly: 40 },
      { name: "B", cx: 225, cy: 100, r: 58, lx: 275, ly: 40 } ] },
  };

  /* ---------- parser množinových výrazů ---------- */

  const ALIASES = { "|": "∪", "+": "∪", "&": "∩", "*": "∩", "-": "\\", "−": "\\",
    "^": "Δ", "△": "Δ", "∆": "Δ", "’": "'", "′": "'" };

  function tokenize(src) {
    const out = [];
    for (const ch of src) {
      if (/\s/.test(ch)) continue;
      const c = ALIASES[ch] || ch;
      if ("∪∩\\Δ'()∅".includes(c) || /[A-Z]/.test(c)) out.push(c);
      else throw new Error(`Neznámý symbol „${ch}“`);
    }
    return out;
  }

  // Priorita: doplněk > ∩ > (∪, \, Δ) zleva. Při pochybnostech piš závorky.
  function parse(src, names) {
    const t = tokenize(src);
    let i = 0;
    const peek = () => t[i];

    function expr() {
      let left = term();
      while (["∪", "\\", "Δ"].includes(peek())) {
        const op = t[i++], l = left, r = term();
        left = op === "∪" ? e => l(e) || r(e)
             : op === "\\" ? e => l(e) && !r(e)
             : e => l(e) !== r(e);
      }
      return left;
    }
    function term() {
      let left = factor();
      while (peek() === "∩") {
        i++;
        const l = left, r = factor();
        left = e => l(e) && r(e);
      }
      return left;
    }
    function factor() {
      const c = t[i++];
      let f;
      if (c === "(") {
        f = expr();
        if (t[i++] !== ")") throw new Error("Chybí „)“");
      } else if (c === "U") f = () => true;
      else if (c === "∅") f = () => false;
      else if (c && /[A-Z]/.test(c)) {
        if (names && !names.includes(c)) throw new Error(`Množina ${c} v diagramu není`);
        f = e => e[c];
      } else throw new Error(c ? `Nečekaný symbol „${c}“` : "Neúplný výraz");
      while (peek() === "'") {
        i++;
        const g = f;
        f = e => !g(e);
      }
      return f;
    }

    if (!t.length) throw new Error("Prázdný výraz");
    const f = expr();
    if (i < t.length) throw new Error(`Nečekaný symbol „${t[i]}“`);
    return f;
  }

  /* ---------- vykreslení ---------- */

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function render(container, opts = {}) {
    const L = LAYOUTS[opts.layout] || LAYOUTS[2];
    const names = L.sets.map(s => s.name);
    const id = "venn" + (++uid);
    const svg = el("svg", { viewBox: `0 0 ${L.w} ${L.h}`, class: "venn-svg", role: "img" });
    const defs = el("defs", {}, svg);
    const U = { x: 8, y: 8, width: L.w - 16, height: L.h - 16, rx: 10 };

    L.sets.forEach((s, k) => {
      const cp = el("clipPath", { id: `${id}-c${k}` }, defs);
      el("circle", { cx: s.cx, cy: s.cy, r: s.r }, cp);
    });
    el("rect", { ...U, class: "venn-u" }, svg);

    // Každá oblast = kombinace „je / není v množině“. Oblast s více
    // množinami se kreslí později, takže je nahoře i pro hover.
    const regions = [];
    for (let bits = 0; bits < 1 << L.sets.length; bits++) {
      const env = {};
      L.sets.forEach((s, k) => (env[s.name] = !!(bits & (1 << k))));
      let parent = svg;
      L.sets.forEach((s, k) => {
        if (env[s.name]) parent = el("g", { "clip-path": `url(#${id}-c${k})` }, parent);
      });
      const rect = el("rect", { ...U, class: "venn-region" }, parent);
      const outside = L.sets.filter(s => !env[s.name]);
      if (outside.length) {
        const m = el("mask", { id: `${id}-m${bits}`, maskUnits: "userSpaceOnUse",
          x: 0, y: 0, width: L.w, height: L.h }, defs);
        el("rect", { x: 0, y: 0, width: L.w, height: L.h, fill: "white" }, m);
        outside.forEach(s => el("circle", { cx: s.cx, cy: s.cy, r: s.r, fill: "black" }, m));
        rect.setAttribute("mask", `url(#${id}-m${bits})`);
      }
      el("title", {}, rect).textContent =
        L.sets.map(s => `x ${env[s.name] ? "∈" : "∉"} ${s.name}`).join(", ");
      regions.push({ env, rect });
    }

    L.sets.forEach(s => el("circle", { cx: s.cx, cy: s.cy, r: s.r, class: "venn-outline" }, svg));
    const labels = L.sets.map((s, k) =>
      el("text", { x: s.lx, y: s.ly, class: "venn-label" }, svg));
    el("text", { x: 22, y: 27, class: "venn-label venn-label-u" }, svg).textContent = "U";
    const elems = el("g", { class: "venn-elems" }, svg);
    container.appendChild(svg);

    function setExpr(src) {
      const f = parse(src, names);
      regions.forEach(r => r.rect.classList.toggle("on", !!f(r.env)));
    }

    function setLabels(texts) {
      labels.forEach((t, k) => (t.textContent = texts[k] ?? L.sets[k].name));
    }

    // Vepíše prvky do oblastí „jen A", „A i B", „jen B" (rozložení se 2 množinami).
    function setElems(onlyA, both, onlyB) {
      elems.replaceChildren();
      const [SA, SB] = L.sets;
      const groups = [
        { items: onlyA, x: SA.cx - SA.r * 0.45, cols: 2 },
        { items: both, x: (SA.cx + SB.cx) / 2, cols: 0 },
        { items: onlyB, x: SB.cx + SB.r * 0.45, cols: 2 },
      ];
      groups.forEach(g => {
        const items = g.items.map(x => String(x)).map(x => (x.length > 5 ? x.slice(0, 4) + "…" : x));
        const cols = g.cols || (items.length > 5 ? 2 : 1);
        const max = cols * 6;
        if (items.length > max) items.splice(max - 1, items.length, "…");
        const rows = Math.ceil(items.length / cols);
        const dx = cols === 2 ? (g.cols ? 17 : 13) : 0;
        items.forEach((x, k) => {
          const col = k % cols, row = Math.floor(k / cols);
          el("text", {
            x: g.x + (cols === 2 ? (col ? dx : -dx) : 0),
            y: SA.cy + (row - (rows - 1) / 2) * 17,
            class: "venn-elem",
          }, elems).textContent = x;
        });
      });
    }

    setLabels(opts.labels || []);
    if (opts.expr) setExpr(opts.expr);
    return { svg, layout: L, names, setExpr, setLabels, setElems };
  }

  function caption(text) {
    const c = document.createElement("div");
    c.className = "venn-caption";
    c.textContent = text;
    return c;
  }

  /* ---------- komponenty ---------- */

  function guessLayout(...exprs) {
    return exprs.some(e => /C/.test(e || "")) ? 3 : 2;
  }

  function initVenn(div) {
    const expr = div.dataset.expr || "";
    render(div, { layout: div.dataset.layout || guessLayout(expr), expr });
    const cap = div.dataset.caption ?? expr;
    if (cap) div.appendChild(caption(cap));
  }

  function initLaw(div) {
    const { left, right } = div.dataset;
    const layout = div.dataset.layout || guessLayout(left, right);
    [left, "=", right].forEach((part, k) => {
      const box = document.createElement("div");
      if (k === 1) {
        box.className = "venn-law-eq";
        box.textContent = "=";
      } else {
        box.className = "venn";
        render(box, { layout, expr: part });
        box.appendChild(caption(part));
      }
      div.appendChild(box);
    });
  }

  const PRESETS = {
    2: ["A ∪ B", "A ∩ B", "A \\ B", "B \\ A", "A Δ B", "A'", "(A ∪ B)'", "A' ∪ B'"],
    3: ["A ∪ B ∪ C", "A ∩ B ∩ C", "(A ∪ B) ∩ C", "A ∩ (B ∪ C)", "A \\ (B ∪ C)",
        "A Δ B Δ C", "(A ∩ B) ∪ (B ∩ C) ∪ (A ∩ C)", "(A ∪ B ∪ C)'"],
  };
  const SYMBOLS = ["∪", "∩", "\\", "Δ", "'", "(", ")"];

  function initExplorer(div) {
    const n = div.dataset.sets === "3" ? 3 : 2;
    const box = document.createElement("div");
    box.className = "venn";
    const venn = render(box, { layout: n });

    const ctl = document.createElement("div");
    ctl.className = "venn-controls";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "widget-input";
    input.value = div.dataset.expr || PRESETS[n][0];
    input.setAttribute("aria-label", "Množinový výraz");
    const msg = document.createElement("div");
    msg.className = "widget-msg";

    const symRow = document.createElement("div");
    symRow.className = "widget-buttons widget-symbols";
    SYMBOLS.forEach(s => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = s;
      b.title = `Vložit ${s}`;
      b.addEventListener("click", () => {
        const p = input.selectionStart ?? input.value.length;
        const ins = s.length === 1 && "∪∩\\Δ".includes(s) ? ` ${s} ` : s;
        input.value = input.value.slice(0, p) + ins + input.value.slice(input.selectionEnd ?? p);
        input.focus();
        input.selectionStart = input.selectionEnd = p + ins.length;
        update();
      });
      symRow.appendChild(b);
    });

    const presetRow = document.createElement("div");
    presetRow.className = "widget-buttons";
    PRESETS[n].forEach(p => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = p;
      b.addEventListener("click", () => { input.value = p; update(); });
      presetRow.appendChild(b);
    });

    function update() {
      try {
        venn.setExpr(input.value);
        msg.textContent = "";
        input.classList.remove("invalid");
      } catch (e) {
        msg.textContent = e.message;
        input.classList.add("invalid");
      }
    }
    input.addEventListener("input", update);

    ctl.append(input, symRow, msg, presetRow);
    div.append(box, ctl);
    update();
  }

  function init(root) {
    const once = (sel, fn) => root.querySelectorAll(sel).forEach(d => {
      if (d.dataset.ready) return;
      d.dataset.ready = "1";
      fn(d);
    });
    once(".venn[data-expr]", initVenn);
    once(".venn-law", initLaw);
    once(".venn-explorer", initExplorer);
  }

  window.Venn = { render, parse, LAYOUTS };
  if (window.document$) document$.subscribe(() => init(document));
  else document.addEventListener("DOMContentLoaded", () => init(document));
})();
