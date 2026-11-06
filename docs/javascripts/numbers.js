/*
 * Interaktivní ukázky k dělitelnosti.
 *
 *   <div class="numvenn" data-mode="factors" data-a="60" data-b="72"></div>   prvočinitele ve Vennově diagramu
 *   <div class="numvenn" data-mode="divisors" data-a="12" data-b="18"></div>  dělitelé ve Vennově diagramu
 *   <div class="euclid" data-a="48" data-b="18"></div>                        Eukleidův algoritmus = dláždění čtverci
 *   <div class="multiples" data-a="4" data-b="6" data-c=""></div>             násobky jako skoky po ose
 *   <div class="factor-tree" data-n="360"></div>                              strom prvočíselného rozkladu
 *   <div class="sieve" data-n="100"></div>                                    Eratosthenovo síto
 */
(function () {
  "use strict";
  const { svgEl, h, field } = window.WidgetKit;

  /* ---------- aritmetika ---------- */

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => (a / gcd(a, b)) * b;

  function factorize(n) {
    const out = [];
    for (let p = 2; p * p <= n; p++) while (n % p === 0) { out.push(p); n /= p; }
    if (n > 1) out.push(n);
    return out;
  }

  function divisors(n) {
    const small = [], big = [];
    for (let d = 1; d * d <= n; d++) {
      if (n % d) continue;
      small.push(d);
      if (d * d !== n) big.unshift(n / d);
    }
    return small.concat(big);
  }

  const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const sup = k => String(k).split("").map(d => SUP[d]).join("");

  // [2, 2, 2, 3, 3, 5] -> "2³ · 3² · 5"
  function fmtPowers(fs) {
    if (!fs.length) return "1";
    const counts = new Map();
    fs.forEach(p => counts.set(p, (counts.get(p) || 0) + 1));
    return [...counts].map(([p, k]) => (k > 1 ? `${p}${sup(k)}` : `${p}`)).join(" · ");
  }
  const fmtProduct = fs => (fs.length ? fs.join(" · ") : "1");

  // Průnik a rozdíl multimnožin (seznamy se opakováním).
  function multiInter(A, B) {
    const rest = [...B], out = [];
    A.forEach(x => { const i = rest.indexOf(x); if (i >= 0) { out.push(x); rest.splice(i, 1); } });
    return out;
  }
  function multiDiff(A, B) {
    const rest = [...B], out = [];
    A.forEach(x => { const i = rest.indexOf(x); if (i >= 0) rest.splice(i, 1); else out.push(x); });
    return out;
  }

  function readInt(input, max, name) {
    const s = input.value.trim();
    if (!/^\d+$/.test(s)) throw new Error(`${name} musí být přirozené číslo`);
    const n = Number(s);
    if (n < 1) throw new Error(`${name} musí být aspoň 1`);
    if (n > max) throw new Error(`${name} může být nejvýš ${max.toLocaleString("cs")}`);
    return n;
  }

  function guarded(inputs, msg, fn) {
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

  function button(text, onClick, cls = "") {
    const b = h("button", { type: "button", class: cls, text });
    b.addEventListener("click", onClick);
    return b;
  }

  /* ---------- Vennův diagram prvočinitelů / dělitelů ---------- */

  function numvenn(div) {
    const mode = div.dataset.mode === "divisors" ? "divisors" : "factors";
    const a = field("a =", div.dataset.a || (mode === "factors" ? "60" : "12"));
    const b = field("b =", div.dataset.b || (mode === "factors" ? "72" : "18"));
    const vbox = h("div", { class: "venn" });
    const venn = window.Venn.render(vbox, { layout: 2 });
    const side = h("div", { class: "nv-side" });
    const msg = h("div", { class: "widget-msg" });
    div.append(h("div", { class: "widget-fields" }, a.wrap, b.wrap),
      h("div", { class: "widget-split" }, vbox, side), msg);
    let show = div.dataset.show === "lcm" ? "lcm" : "gcd";

    const line = (text, cls = "") => h("div", { class: `nv-line ${cls}`, text });

    const update = guarded([a.input, b.input], msg, () => {
      const max = mode === "factors" ? 10_000_000 : 2000;
      const A = readInt(a.input, max, "a"), B = readInt(b.input, max, "b");
      venn.setLabels([String(A), String(B)]);

      if (mode === "factors") {
        const fa = factorize(A), fb = factorize(B);
        const common = multiInter(fa, fb);
        const union = [...fa, ...multiDiff(fb, fa)].sort((x, y) => x - y);
        venn.setElems(multiDiff(fa, fb), common, multiDiff(fb, fa));
        venn.setExpr(show === "gcd" ? "A ∩ B" : "A ∪ B");
        const g = common.reduce((x, y) => x * y, 1), l = union.reduce((x, y) => x * y, 1);
        side.replaceChildren(
          line(`${A} = ${fmtProduct(fa)}`), line(`${B} = ${fmtProduct(fb)}`),
          h("div", { class: "widget-buttons" },
            button("NSD = součin průniku", () => { show = "gcd"; update(); }, show === "gcd" ? "on" : ""),
            button("nsn = součin sjednocení", () => { show = "lcm"; update(); }, show === "lcm" ? "on" : "")),
          line(`D(${A}, ${B}) = ${fmtProduct(common)} = ${g}`, show === "gcd" ? "hl" : ""),
          line(`n(${A}, ${B}) = ${fmtProduct(union)} = ${l}`, show === "lcm" ? "hl" : ""),
          line(show === "gcd"
            ? "Prostředek obsahuje prvočinitele, které mají obě čísla společné."
            : "Sjednocení obsahuje každého prvočinitele tolikrát, kolikrát je potřeba pro obě čísla.", "note"));
      } else {
        const da = divisors(A), db = divisors(B);
        const common = da.filter(d => db.includes(d));
        const onlyA = da.filter(d => !db.includes(d)), onlyB = db.filter(d => !da.includes(d));
        venn.setElems(onlyA, common, onlyB);
        venn.setExpr("A ∩ B");
        const g = common[common.length - 1];
        venn.svg.querySelectorAll(".venn-elem").forEach(t => {
          if (t.textContent === String(g) && t.getAttribute("x") > venn.layout.sets[0].cx &&
              t.getAttribute("x") < venn.layout.sets[1].cx) t.classList.add("venn-elem-hl");
        });
        const tooMany = onlyA.length > 12 || onlyB.length > 12 || common.length > 12;
        side.replaceChildren(
          line(`dělitelé ${A}: {${da.join(", ")}}`), line(`dělitelé ${B}: {${db.join(", ")}}`),
          line(`společní: {${common.join(", ")}}`),
          line(`D(${A}, ${B}) = ${g}`, "hl"),
          line(tooMany ? "Dělitelů je víc, než se vejde do diagramu – zkus menší čísla."
            : "Společní dělitelé = průnik. Největší z nich je NSD.", "note"));
      }
    });
    [a, b].forEach(f => f.input.addEventListener("input", update));
    update();
  }

  /* ---------- Eukleidův algoritmus ---------- */

  function euclid(div) {
    const a = field("a =", div.dataset.a || "48");
    const b = field("b =", div.dataset.b || "18");
    const holder = h("div", { class: "widget-svg" });
    const table = h("div", { class: "eu-steps" });
    const msg = h("div", { class: "widget-msg" });
    let steps = [], shown = 0, draw = () => {};
    const ctl = h("div", { class: "widget-buttons" },
      button("◀ Zpět", () => { shown = Math.max(0, shown - 1); draw(); }),
      button("Další krok ▶", () => { shown = Math.min(steps.length, shown + 1); draw(); }),
      button("Vše", () => { shown = steps.length; draw(); }));
    div.append(h("div", { class: "widget-fields" }, a.wrap, b.wrap), ctl, holder, table, msg);

    const update = guarded([a.input, b.input], msg, () => {
      let A = readInt(a.input, 100000, "a"), B = readInt(b.input, 100000, "b");
      if (A < B) [A, B] = [B, A];

      // Obdélník A × B postupně krájíme na co největší čtverce.
      steps = [];
      let x = 0, y = 0, w = A, hh = B;
      while (w > 0 && hh > 0) {
        const horiz = w >= hh, s = Math.min(w, hh), big = Math.max(w, hh);
        const q = Math.floor(big / s), r = big - q * s;
        steps.push({ a: big, b: s, q, r, x, y, s, horiz });
        if (horiz) { x += q * s; w = r; } else { y += q * s; hh = r; }
      }

      const scale = Math.min(560 / A, 320 / B);
      const W = A * scale, H = B * scale;
      draw = () => {
        const svg = svgEl("svg", { viewBox: `-2 -2 ${W + 4} ${H + 4}`, class: "euclid-svg",
          style: `max-width:${W + 4}px` });
        svgEl("rect", { x: 0, y: 0, width: W, height: H, class: "eu-rect" }, svg);
        steps.slice(0, shown).forEach((st, i) => {
          const g = svgEl("g", { class: `eu-step eu-s${i % 2}` }, svg);
          const sp = st.s * scale;
          if (st.q > 60) {
            const len = st.q * sp;
            svgEl("rect", { x: st.x * scale, y: st.y * scale,
              width: st.horiz ? len : sp, height: st.horiz ? sp : len }, g);
            return;
          }
          for (let k = 0; k < st.q; k++) {
            const sx = (st.x + (st.horiz ? k * st.s : 0)) * scale;
            const sy = (st.y + (st.horiz ? 0 : k * st.s)) * scale;
            svgEl("rect", { x: sx, y: sy, width: sp, height: sp }, g);
            if (sp >= 26) {
              svgEl("text", { x: sx + sp / 2, y: sy + sp / 2,
                style: `font-size:${Math.min(16, sp / 3)}px` }, g).textContent = st.s;
            }
          }
        });
        holder.replaceChildren(svg);

        const g = steps[steps.length - 1].b;
        table.replaceChildren(...steps.slice(0, shown).map((st, i) =>
          h("div", { class: "eu-row" + (i === steps.length - 1 ? " last" : "") },
            h("span", { class: "eu-eq", text: `${st.a} = ${st.q} · ${st.b} + ${st.r}` }),
            h("span", { class: "eu-why", text: st.r
              ? `${st.q}× čtverec ${st.b} × ${st.b}, zbývá obdélník ${st.b} × ${st.r}`
              : `${st.q}× čtverec ${st.b} × ${st.b}, nic nezbývá` }))));
        table.appendChild(h("div", { class: "eu-result", text: shown === steps.length
          ? `Zbytek je 0 → D(${A}, ${B}) = ${g}. Čtverec ${g} × ${g} vydláždí celý obdélník ${A} × ${B}.`
          : `Krok ${shown} z ${steps.length}. Obdélník ${A} × ${B} – odřezávej co největší čtverce.` }));
      };
      shown = Math.min(shown, steps.length);
      draw();
    });
    [a, b].forEach(f => f.input.addEventListener("input", () => { shown = 0; update(); }));
    shown = "all" in div.dataset ? Infinity : 0;
    update();
  }

  /* ---------- násobky na ose ---------- */

  function multiples(div) {
    const fields = [field("a =", div.dataset.a || "4"), field("b =", div.dataset.b || "6")];
    if ("c" in div.dataset) fields.push(field("c =", div.dataset.c));
    const holder = h("div", { class: "widget-svg" });
    const result = h("div", { class: "widget-result" });
    const msg = h("div", { class: "widget-msg" });
    div.append(h("div", { class: "widget-fields" }, ...fields.map(f => f.wrap)), holder, result, msg);
    const names = ["a", "b", "c"];

    const update = guarded(fields.map(f => f.input), msg, () => {
      const nums = fields.map((f, i) => (i === 2 && !f.input.value.trim()) ? null : readInt(f.input, 60, names[i]))
        .filter(n => n !== null);
      const L = nums.reduce(lcm);
      if (L > 360) throw new Error(`n = ${L} je na osu moc velké, zkus menší čísla`);
      const limit = 2 * L <= 120 ? 2 * L : L;

      const W = 640, x0 = 70, x1 = W - 20, rowH = 60, top = 46;
      const X = v => x0 + (v / limit) * (x1 - x0);
      const axisY = top + nums.length * rowH - 10;
      const svg = svgEl("svg", { viewBox: `0 0 ${W} ${axisY + 34}`, class: "multiples-svg" });

      for (let m = L; m <= limit; m += L) {
        svgEl("line", { x1: X(m), y1: 14, x2: X(m), y2: axisY, class: "mu-common" }, svg);
        svgEl("text", { x: X(m), y: 10, class: "mu-common-label" }, svg).textContent =
          m === L ? `n = ${L}` : `${m}`;
      }
      nums.forEach((n, r) => {
        const y = top + r * rowH;
        svgEl("text", { x: 8, y, class: "mu-label" }, svg).textContent = `${names[r]} = ${n}`;
        svgEl("line", { x1: x0, y1: y, x2: x1, y2: y, class: "mu-base" }, svg);
        const hop = Math.min(26, (X(n) - X(0)) * 0.6);
        for (let m = 0; m + n <= limit; m += n) {
          svgEl("path", { d: `M${X(m)} ${y}Q${(X(m) + X(m + n)) / 2} ${y - hop * 1.6} ${X(m + n)} ${y}`,
            class: `mu-hop mu-r${r}`, pathLength: 1, style: `animation-delay:${(m / n) * 0.06}s` }, svg);
        }
        for (let m = 0; m <= limit; m += n) {
          svgEl("circle", { cx: X(m), cy: y, r: m && m % L === 0 ? 6 : 4,
            class: `mu-dot mu-r${r}` + (m && m % L === 0 ? " common" : "") }, svg);
        }
      });
      svgEl("line", { x1: x0, y1: axisY, x2: x1, y2: axisY, class: "mu-axis" }, svg);
      const every = [1, 2, 5, 10, 20].find(s => (X(s) - X(0)) >= 16) || 20;
      for (let v = 0; v <= limit; v += every) {
        svgEl("line", { x1: X(v), y1: axisY - 3, x2: X(v), y2: axisY + 3, class: "mu-axis" }, svg);
        svgEl("text", { x: X(v), y: axisY + 17, class: "mu-num" }, svg).textContent = v;
      }
      holder.replaceChildren(svg);

      const common = [];
      for (let m = L; m <= limit; m += L) common.push(m);
      result.textContent = `Společné násobky: ${common.join(", ")}, …   →   n(${nums.join(", ")}) = ${L}`;
    });
    fields.forEach(f => f.input.addEventListener("input", update));
    update();
  }

  /* ---------- strom rozkladu ---------- */

  function factorTree(div) {
    const f = field("n =", div.dataset.n || "360");
    const holder = h("div", { class: "widget-svg" });
    const result = h("div", { class: "widget-result" });
    const msg = h("div", { class: "widget-msg" });
    let random = false;
    const ctl = h("div", { class: "widget-buttons" },
      button("Rozlož jinak 🎲", () => { random = true; update(); }),
      button("Rozlož „napůl\"", () => { random = false; update(); }));
    div.append(h("div", { class: "widget-fields" }, f.wrap, ctl), holder, result, msg);

    function build(n) {
      const ds = divisors(n).filter(d => d > 1 && d < n);
      if (!ds.length) return { n };
      let d;
      if (random) d = ds[Math.floor(Math.random() * ds.length)];
      else d = ds.filter(x => x * x <= n).pop();
      return { n, kids: [build(d), build(n / d)] };
    }

    const update = guarded([f.input], msg, () => {
      const n = readInt(f.input, 10_000_000, "n");
      if (n === 1) {
        holder.replaceChildren();
        result.textContent = "1 nemá žádné prvočinitele (není prvočíslo ani složené číslo).";
        return;
      }
      const root = build(n);
      let leaf = 0, depth = 0;
      (function place(node, d) {
        node.d = d; depth = Math.max(depth, d);
        if (!node.kids) { node.i = leaf++; return; }
        node.kids.forEach(k => place(k, d + 1));
        node.i = (node.kids[0].i + node.kids[1].i) / 2;
      })(root, 0);

      const gap = 56, W = Math.max(leaf, 2) * gap + 20, H = depth * 64 + 50;
      const X = i => 10 + gap / 2 + i * gap + (Math.max(leaf, 2) - leaf) * gap / 2;
      const Y = d => 25 + d * 64;
      const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "ftree-svg", style: `max-width:${W * 1.2}px` });
      (function edges(node) {
        if (!node.kids) return;
        node.kids.forEach(k => {
          svgEl("line", { x1: X(node.i), y1: Y(node.d) + 13, x2: X(k.i), y2: Y(k.d) - 13, class: "ft-edge" }, svg);
          edges(k);
        });
      })(root);
      (function nodes(node) {
        const g = svgEl("g", { class: "ft-node" + (node.kids ? "" : " prime") }, svg);
        const w = String(node.n).length * 9 + 18;
        svgEl("rect", { x: X(node.i) - w / 2, y: Y(node.d) - 13, width: w, height: 26, rx: 13 }, g);
        svgEl("text", { x: X(node.i), y: Y(node.d) }, g).textContent = node.n;
        (node.kids || []).forEach(nodes);
      })(root);
      holder.replaceChildren(svg);

      const fs = factorize(n);
      result.textContent = fs.length === 1
        ? `${n} je prvočíslo.`
        : `${n} = ${fmtProduct(fs)} = ${fmtPowers(fs)}`;
    });
    f.input.addEventListener("input", () => { random = false; update(); });
    update();
  }

  /* ---------- Eratosthenovo síto ---------- */

  function sieve(div) {
    const N = Math.min(Number(div.dataset.n) || 100, 400);
    const grid = h("div", { class: "sieve-grid" });
    const status = h("div", { class: "widget-msg" });
    const cells = [null];
    for (let k = 1; k <= N; k++) {
      const c = h("div", { class: "sieve-cell", text: String(k) });
      cells.push(c);
      grid.appendChild(c);
    }
    let state;
    const reset = () => {
      state = { p: 1, done: false };
      cells.slice(1).forEach(c => { c.className = "sieve-cell"; c.style.transitionDelay = ""; });
      cells[1].classList.add("one");
      status.textContent = "1 není prvočíslo. Klikni na „Další krok\".";
    };
    const step = () => {
      if (state.done) return;
      let p = state.p + 1;
      while (p <= N && cells[p].classList.contains("crossed")) p++;
      if (p * p > N) {
        cells.forEach(c => c && c.classList.remove("just"));
        let count = 0;
        for (let k = 2; k <= N; k++) {
          if (!cells[k].classList.contains("crossed")) { cells[k].classList.add("prime"); count++; }
        }
        state.done = true;
        status.textContent = `Hotovo: do ${N} je ${count} prvočísel. Stačilo škrtat násobky čísel do √${N} ≈ ${Math.floor(Math.sqrt(N))} – ` +
          "všechno nepřeškrtnuté je prvočíslo.";
        return;
      }
      state.p = p;
      cells[p].classList.add("prime", "current");
      cells.forEach(c => c && c.classList.remove("just"));
      let k = 0;
      for (let m = p * p; m <= N; m += p) {
        if (!cells[m].classList.contains("crossed")) {
          cells[m].style.transitionDelay = `${(k++) * 0.02}s`;
          cells[m].classList.add("crossed", "just");
        }
      }
      setTimeout(() => cells[p].classList.remove("current"), 900);
      status.textContent = `${p} je prvočíslo → škrtám jeho násobky od ${p}² = ${p * p}: ${p * p}, ${p * p + p}, ${p * p + 2 * p}, …`;
    };
    const ctl = h("div", { class: "widget-buttons" },
      button("Další krok ▶", step),
      button("Dokončit", () => { while (!state.done) step(); }),
      button("Znovu", reset));
    div.append(ctl, grid, status);
    reset();
  }

  /* ---------- init ---------- */

  function init(root) {
    const once = (sel, fn) => root.querySelectorAll(sel).forEach(d => {
      if (d.dataset.ready) return;
      d.dataset.ready = "1";
      try { fn(d); } catch (e) { d.textContent = `Chyba widgetu: ${e.message}`; }
    });
    once(".numvenn", numvenn);
    once(".euclid", euclid);
    once(".multiples", multiples);
    once(".factor-tree", factorTree);
    once(".sieve", sieve);
  }

  if (window.document$) document$.subscribe(() => init(document));
  else document.addEventListener("DOMContentLoaded", () => init(document));
})();
