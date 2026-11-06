/*
 * Interaktivní ukázky k analýze (limity, derivace, integrály).
 *
 *   <div class="plot" data-fns="exp(x); ln(x); x" data-labels="eˣ; ln x; y = x"
 *        data-x="-3,5" data-y="-3,5" data-points="0,1,(0; 1) | 1,0"></div>  grafy funkcí (body oddělené |)
 *   <div class="limit" data-f="(x^2-1)/(x-1)" data-a="1"></div>             x → a zleva i zprava
 *   <div class="tangent" data-f="x^2" data-x0="1"></div>                    sečna → tečna
 *   <div class="riemann" data-f="x^2" data-a="0" data-b="2" data-n="6"></div>   obdélníky → integrál
 *        data-bslider="0.2,8"  přidá posuvník pro horní mez, data-compare="ln(b)" porovná s výrazem v b
 *   <div class="sequence" data-a="(1+1/n)^n" data-limit="e"></div>          posloupnost a její limita
 *   <div class="func-quiz"></div>                                            poznávačka typů funkcí
 *   <div class="unit-circle" data-deg="30"></div>                            jednotková kružnice
 *
 * Výrazy: + - * / ^, závorky, x (n), čísla, pi, e, funkce sin cos tan cot arcsin arccos arctan
 * exp ln log (desítkový) sqrt abs. Násobení lze vynechat: 2x, 3sin(x), x(x+1).
 */
(function () {
  "use strict";
  const { svgEl, h } = window.WidgetKit;

  /* ---------- parser výrazů ---------- */

  const FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: x => 1 / Math.tan(x), tg: Math.tan, cotg: x => 1 / Math.tan(x),
    arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan, arctg: Math.atan,
    exp: Math.exp, ln: Math.log, log: Math.log10, sqrt: Math.sqrt, abs: Math.abs, sgn: Math.sign,
  };
  const CONSTS = { pi: Math.PI, "π": Math.PI, e: Math.E };

  function tokenize(src) {
    const s = src.replace(/[−–]/g, "-").replace(/[·×]/g, "*").replace(/,/g, ".");
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      let m;
      if ((m = s.slice(i).match(/^\d+(\.\d+)?|^\.\d+/))) { out.push({ t: "num", v: parseFloat(m[0]) }); i += m[0].length; continue; }
      if ((m = s.slice(i).match(/^[a-zA-Zπ]+/))) {
        // Rozdělit slepené identifikátory: "xsin" → x, sin; "pix" → pi, x.
        let w = m[0];
        i += w.length;
        while (w) {
          const fn = Object.keys(FUNCS).concat(Object.keys(CONSTS)).sort((a, b) => b.length - a.length)
            .find(k => w.startsWith(k));
          if (fn) { out.push({ t: fn in FUNCS ? "fn" : "const", v: fn }); w = w.slice(fn.length); }
          else if (w[0] === "x" || w[0] === "n" || w[0] === "t") { out.push({ t: "var" }); w = w.slice(1); }
          else throw new Error(`Neznámý název „${w}“`);
        }
        continue;
      }
      if ("+-*/^()".includes(c)) { out.push({ t: c }); i++; continue; }
      throw new Error(`Neznámý znak „${c}“`);
    }
    return out;
  }

  function compile(src) {
    const t = tokenize(src);
    let i = 0;
    const peek = () => t[i] && t[i].t;
    const startsPrimary = () => ["num", "var", "const", "fn", "("].includes(peek());

    function expr() {
      let f = term();
      while (peek() === "+" || peek() === "-") {
        const op = t[i++].t, a = f, b = term();
        f = op === "+" ? x => a(x) + b(x) : x => a(x) - b(x);
      }
      return f;
    }
    function term() {
      let f = unary();
      for (;;) {
        if (peek() === "*" || peek() === "/") {
          const op = t[i++].t, a = f, b = unary();
          f = op === "*" ? x => a(x) * b(x) : x => a(x) / b(x);
        } else if (startsPrimary()) {
          const a = f, b = power();
          f = x => a(x) * b(x);
        } else return f;
      }
    }
    function unary() {
      if (peek() === "-") { i++; const a = unary(); return x => -a(x); }
      if (peek() === "+") { i++; return unary(); }
      return power();
    }
    function power() {
      const base = primary();
      if (peek() === "^") {
        i++;
        const ex = unary();
        return x => {
          const b = base(x), e = ex(x);
          // Lichá odmocnina záporného čísla: (−8)^(1/3) = −2.
          if (b < 0 && !Number.isInteger(e)) {
            const inv = 1 / e;
            if (Math.abs(inv - Math.round(inv)) < 1e-9 && Math.round(inv) % 2) return -Math.pow(-b, e);
          }
          return Math.pow(b, e);
        };
      }
      return base;
    }
    function primary() {
      const tok = t[i++];
      if (!tok) throw new Error("Neúplný výraz");
      if (tok.t === "num") return () => tok.v;
      if (tok.t === "var") return x => x;
      if (tok.t === "const") { const v = CONSTS[tok.v]; return () => v; }
      if (tok.t === "fn") {
        const fn = FUNCS[tok.v];
        let arg;
        if (peek() === "(") { i++; arg = expr(); if (t[i++]?.t !== ")") throw new Error("Chybí „)“"); }
        else arg = power();
        // sin^2(x) se píše jako sin(x)^2
        return x => fn(arg(x));
      }
      if (tok.t === "(") {
        const f = expr();
        if (t[i++]?.t !== ")") throw new Error("Chybí „)“");
        return f;
      }
      throw new Error(`Nečekané „${tok.t}“`);
    }

    if (!t.length) throw new Error("Prázdný výraz");
    const f = expr();
    if (i < t.length) throw new Error(`Nečekané „${t[i].t === "num" ? t[i].v : t[i].v || t[i].t}“`);
    return x => { const y = f(x); return Number.isFinite(y) ? y : NaN; };
  }

  // Výraz pro zobrazení: x^2 → x², * → ·, sqrt → √
  function pretty(src) {
    const SUPS = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", x: "ˣ", n: "ⁿ", "-": "⁻" };
    return src
      .replace(/\^(-?[0-9xn])(?![0-9.(])/g, (_, e) => e.split("").map(c => SUPS[c]).join(""))
      .replace(/\*/g, "·").replace(/sqrt/g, "√").replace(/exp\(x\)/g, "eˣ")
      .replace(/abs\(([^()]*)\)/g, "|$1|").replace(/-/g, "−");
  }

  /* ---------- čísla ---------- */

  function fmt(x, digits = 4) {
    if (!Number.isFinite(x)) return Number.isNaN(x) ? "nedef." : (x > 0 ? "∞" : "−∞");
    if (Math.abs(x) < 1e-12) x = 0;
    let s;
    if (Math.abs(x) >= 1e6 || (Math.abs(x) < 1e-4 && x !== 0)) s = x.toExponential(2).replace("e", "·10^");
    else s = String(+x.toFixed(digits));
    return s.replace("-", "−").replace(".", ",");
  }

  const range2 = (s, def) => {
    const p = (s || def).split(",").map(Number);
    return p.length === 2 && p.every(Number.isFinite) && p[0] < p[1] ? p : def.split(",").map(Number);
  };

  function niceStep(span, target = 8) {
    const raw = span / target, mag = 10 ** Math.floor(Math.log10(raw));
    return [1, 2, 5, 10].map(m => m * mag).find(s => s >= raw) || 10 * mag;
  }

  function simpson(f, a, b, n = 2000) {
    if (a === b) return 0;
    const hh = (b - a) / n;
    let s = f(a) + f(b);
    for (let k = 1; k < n; k++) s += f(a + k * hh) * (k % 2 ? 4 : 2);
    return (s * hh) / 3;
  }

  /* ---------- graf ---------- */

  let uid = 0;
  function makePlot(xr, yr, W = 560, H = 360, opts = {}) {
    const pad = { l: 34, r: 12, t: 12, b: 26 };
    const [x0, x1] = xr, [y0, y1] = yr;
    const X = x => pad.l + ((x - x0) / (x1 - x0)) * (W - pad.l - pad.r);
    const Y = y => H - pad.b - ((y - y0) / (y1 - y0)) * (H - pad.t - pad.b);
    const invX = px => x0 + ((px - pad.l) / (W - pad.l - pad.r)) * (x1 - x0);
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "plot-svg" });
    const id = "plotclip" + (++uid);
    const cp = svgEl("clipPath", { id }, svgEl("defs", {}, svg));
    svgEl("rect", { x: pad.l, y: pad.t, width: W - pad.l - pad.r, height: H - pad.t - pad.b }, cp);

    const sx = niceStep(x1 - x0), sy = niceStep(y1 - y0);
    for (let v = Math.ceil(x0 / sx) * sx; v <= x1 + 1e-9; v += sx) {
      svgEl("line", { x1: X(v), y1: pad.t, x2: X(v), y2: H - pad.b, class: "pl-grid" }, svg);
      if (Math.abs(v) > 1e-9 && opts.xTicks !== false) svgEl("text", { x: X(v), y: H - pad.b + 15, class: "pl-tick" }, svg).textContent = fmt(v, 3);
    }
    for (let v = Math.ceil(y0 / sy) * sy; v <= y1 + 1e-9; v += sy) {
      svgEl("line", { x1: pad.l, y1: Y(v), x2: W - pad.r, y2: Y(v), class: "pl-grid" }, svg);
      if (Math.abs(v) > 1e-9) svgEl("text", { x: pad.l - 5, y: Y(v), class: "pl-tick pl-tick-y" }, svg).textContent = fmt(v, 3);
    }
    if (y0 <= 0 && y1 >= 0) svgEl("line", { x1: pad.l, y1: Y(0), x2: W - pad.r, y2: Y(0), class: "pl-axis" }, svg);
    if (x0 <= 0 && x1 >= 0) svgEl("line", { x1: X(0), y1: pad.t, x2: X(0), y2: H - pad.b, class: "pl-axis" }, svg);
    if (x0 <= 0 && x1 >= 0 && y0 <= 0 && y1 >= 0) {
      svgEl("text", { x: X(0) - 5, y: Y(0) + 15, class: "pl-tick pl-tick-y" }, svg).textContent = "0";
    }
    const layer = svgEl("g", { "clip-path": `url(#${id})` }, svg);
    const top = svgEl("g", {}, svg);

    function curve(f, cls, from = x0, to = x1, samples = 600) {
      let d = "", pen = false, prev = null;
      const yspan = y1 - y0;
      for (let k = 0; k <= samples; k++) {
        const x = from + ((to - from) * k) / samples, y = f(x);
        if (!Number.isFinite(y) || y > y1 + 4 * yspan || y < y0 - 4 * yspan ||
            (prev !== null && Math.abs(y - prev) > 2 * yspan)) {
          pen = false; prev = Number.isFinite(y) ? y : null;
          continue;
        }
        d += `${pen ? "L" : "M"}${X(x).toFixed(1)} ${Y(y).toFixed(1)}`;
        pen = true;
        prev = y;
      }
      return svgEl("path", { d, class: cls }, layer);
    }
    return { svg, X, Y, invX, layer, top, curve, W, H, pad, xr, yr };
  }

  const COLORS = ["c0", "c1", "c2", "c3"];

  function errorBox(div, e) {
    div.replaceChildren(h("div", { class: "widget-msg", text: `Chyba: ${e.message}` }));
  }

  function slider(label, min, max, step, value) {
    const input = h("input", { type: "range", min, max, step, value, class: "cal-range" });
    const out = h("span", { class: "cal-range-val" });
    const wrap = h("label", { class: "cal-slider" }, h("span", { text: label }), input, out);
    return { wrap, input, out };
  }

  function button(text, onClick) {
    const b = h("button", { type: "button", text });
    b.addEventListener("click", onClick);
    return b;
  }

  /* ---------- obecný graf ---------- */

  function plot(div) {
    const exprs = div.dataset.fns.split(";").map(s => s.trim()).filter(Boolean);
    const labels = (div.dataset.labels || "").split(";").map(s => s.trim());
    const fns = exprs.map(compile);
    const p = makePlot(range2(div.dataset.x, "-5,5"), range2(div.dataset.y, "-4,4"));
    fns.forEach((f, k) => p.curve(f, `pl-curve ${COLORS[k % 4]}${(div.dataset.dashed || "").split(",").includes(String(k)) ? " dashed" : ""}`));
    (div.dataset.points || "").split("|").map(s => s.trim()).filter(Boolean).forEach(s => {
      const [x, y, ...lab] = s.split(",");
      svgEl("circle", { cx: p.X(+x), cy: p.Y(+y), r: 4.5, class: "pl-point" }, p.top);
      if (lab.length) svgEl("text", { x: p.X(+x) + 8, y: p.Y(+y) - 8, class: "pl-plabel" }, p.top).textContent = lab.join(",");
    });
    const legend = h("div", { class: "pl-legend" }, ...exprs.map((e, k) =>
      h("span", { class: `pl-key ${COLORS[k % 4]}`, text: labels[k] || e })));
    const read = h("div", { class: "widget-msg", text: "Najeď myší na graf." });
    const cross = svgEl("line", { class: "pl-cross", x1: -10, x2: -10, y1: p.pad.t, y2: p.H - p.pad.b }, p.top);
    const dots = fns.map((_, k) => svgEl("circle", { r: 4, cx: -10, cy: -10, class: `pl-dot ${COLORS[k % 4]}` }, p.top));
    p.svg.addEventListener("pointermove", ev => {
      const pt = p.svg.createSVGPoint();
      pt.x = ev.clientX; pt.y = ev.clientY;
      const x = p.invX(pt.matrixTransform(p.svg.getScreenCTM().inverse()).x);
      if (x < p.xr[0] || x > p.xr[1]) return;
      cross.setAttribute("x1", p.X(x)); cross.setAttribute("x2", p.X(x));
      const parts = [`x = ${fmt(x, 2)}`];
      fns.forEach((f, k) => {
        const y = f(x), ok = Number.isFinite(y) && y >= p.yr[0] && y <= p.yr[1];
        dots[k].setAttribute("cx", p.X(x));
        dots[k].setAttribute("cy", ok ? p.Y(y) : -99);
        parts.push(`${labels[k] || exprs[k]}: ${fmt(y, 3)}`);
      });
      read.textContent = parts.join("   ");
    });
    div.append(h("div", { class: "widget-svg" }, p.svg), legend, read);
  }

  /* ---------- limita v bodě ---------- */

  function limit(div) {
    const src = div.dataset.f, a = +div.dataset.a, f = compile(src);
    const xr = range2(div.dataset.x, `${a - 3},${a + 3}`);
    let yr = div.dataset.y ? range2(div.dataset.y, "-5,5") : null;
    if (!yr) {
      const ys = [];
      for (let k = 0; k <= 200; k++) { const y = f(xr[0] + ((xr[1] - xr[0]) * k) / 200); if (Number.isFinite(y)) ys.push(y); }
      ys.sort((p, q) => p - q);
      const lo = ys[Math.floor(ys.length * 0.05)], hi = ys[Math.floor(ys.length * 0.95)];
      const padY = Math.max(1, (hi - lo) * 0.25);
      yr = [lo - padY, hi + padY];
    }
    const p = makePlot(xr, yr);
    p.curve(f, "pl-curve c0");
    const L = (f(a - 1e-7) + f(a + 1e-7)) / 2, Lm = f(a - 1e-7), Lp = f(a + 1e-7);
    const same = Math.abs(Lm - Lp) < 1e-4 * Math.max(1, Math.abs(L));
    if (same && Number.isFinite(L)) {
      svgEl("line", { x1: p.pad.l, x2: p.W - p.pad.r, y1: p.Y(L), y2: p.Y(L), class: "pl-guide" }, p.layer);
    }
    svgEl("line", { x1: p.X(a), x2: p.X(a), y1: p.pad.t, y2: p.H - p.pad.b, class: "pl-guide" }, p.layer);
    const fa = f(a);
    if (Number.isFinite(fa) && (!same || Math.abs(fa - L) > 1e-9)) {
      svgEl("circle", { cx: p.X(a), cy: p.Y(fa), r: 5, class: "pl-point" }, p.top);
    }
    if (same && Number.isFinite(L) && (!Number.isFinite(fa) || Math.abs(fa - L) > 1e-9)) {
      svgEl("circle", { cx: p.X(a), cy: p.Y(L), r: 5, class: "pl-hole" }, p.top);
    }
    const mk = cls => ({
      dot: svgEl("circle", { r: 6, class: `pl-dot ${cls}` }, p.top),
      v: svgEl("line", { class: `pl-drop ${cls}` }, p.layer),
      hz: svgEl("line", { class: `pl-drop ${cls}` }, p.layer),
    });
    const left = mk("c1"), right = mk("c0");

    const sl = slider("vzdálenost od a:", 0, 4, 0.01, 0);
    const table = h("table", { class: "cal-table" });
    const result = h("div", { class: "mx-result" });
    let anim = null;
    const play = button("▶ Přibližovat", () => {
      if (anim) { clearInterval(anim); anim = null; play.textContent = "▶ Přibližovat"; return; }
      if (+sl.input.value >= 4) sl.input.value = 0;
      play.textContent = "⏸ Stop";
      anim = setInterval(() => {
        sl.input.value = Math.min(4, +sl.input.value + 0.03);
        draw();
        if (+sl.input.value >= 4) { clearInterval(anim); anim = null; play.textContent = "▶ Přibližovat"; }
      }, 40);
    });

    function place(o, x) {
      const y = f(x), ok = Number.isFinite(y);
      o.dot.setAttribute("cx", p.X(x)); o.dot.setAttribute("cy", ok ? p.Y(y) : -99);
      o.v.setAttribute("x1", p.X(x)); o.v.setAttribute("x2", p.X(x));
      o.v.setAttribute("y1", p.Y(Math.max(p.yr[0], Math.min(p.yr[1], 0)))); o.v.setAttribute("y2", ok ? p.Y(y) : 0);
      o.hz.setAttribute("x1", p.pad.l); o.hz.setAttribute("x2", p.X(x));
      o.hz.setAttribute("y1", ok ? p.Y(y) : -99); o.hz.setAttribute("y2", ok ? p.Y(y) : -99);
      return y;
    }

    function draw() {
      const k = +sl.input.value, d = 10 ** -k;
      sl.out.textContent = `h = ${fmt(d, 5)}`;
      const yl = place(left, a - d), yp = place(right, a + d);
      table.replaceChildren(
        h("tr", {}, h("th", { text: "" }), h("th", { text: "x" }), h("th", { text: "f(x)" })),
        h("tr", { class: "c1" }, h("td", { text: "zleva" }), h("td", { text: fmt(a - d, 6) }), h("td", { text: fmt(yl, 6) })),
        h("tr", { class: "c0" }, h("td", { text: "zprava" }), h("td", { text: fmt(a + d, 6) }), h("td", { text: fmt(yp, 6) })),
        h("tr", {}, h("td", { text: "v bodě" }), h("td", { text: fmt(a, 6) }), h("td", { text: Number.isFinite(fa) ? fmt(fa, 6) : "nedefinováno" })));
      result.textContent = !same
        ? `Zleva se hodnoty blíží k ${fmt(Lm, 3)}, zprava k ${fmt(Lp, 3)} → limita v bodě ${fmt(a)} neexistuje.`
        : `Z obou stran se hodnoty blíží k ${div.dataset.limit || fmt(L, 4)} → lim f(x) pro x → ${fmt(a)} = ${div.dataset.limit || fmt(L, 4)}` +
          (Number.isFinite(fa) ? (Math.abs(fa - L) < 1e-9 ? "" : `, ale f(${fmt(a)}) = ${fmt(fa)}.`) : `, i když f(${fmt(a)}) není definováno.`);
    }
    sl.input.addEventListener("input", draw);
    div.append(h("div", { class: "cal-caption", text: `f(x) = ${pretty(src)},  x → ${fmt(a)}` }),
      h("div", { class: "widget-svg" }, p.svg),
      h("div", { class: "cal-controls" }, sl.wrap, play), table, result);
    draw();
  }

  /* ---------- sečna a tečna ---------- */

  function tangent(div) {
    const src = div.dataset.f, f = compile(src);
    const xr = range2(div.dataset.x, "-3,3"), yr = range2(div.dataset.y, "-2,6");
    const p = makePlot(xr, yr);
    const df = x => (f(x + 1e-5) - f(x - 1e-5)) / 2e-5;
    const dpath = p.curve(df, "pl-curve c2 dashed");
    dpath.style.display = "none";
    p.curve(f, "pl-curve c0");
    const sec = svgEl("line", { class: "pl-secant" }, p.layer);
    const tan = svgEl("line", { class: "pl-tangent" }, p.layer);
    const P0 = svgEl("circle", { r: 7, class: "pl-handle" }, p.top);
    const P1 = svgEl("circle", { r: 5, class: "pl-dot c1" }, p.top);
    const tri = svgEl("path", { class: "pl-tri" }, p.layer);
    let x0 = +(div.dataset.x0 || 1);

    const sl = slider("h =", 0.01, 2, 0.01, 1.5);
    const info = h("div", { class: "cal-info" });
    const showD = button("Ukázat graf f′", () => {
      const on = dpath.style.display === "none";
      dpath.style.display = on ? "" : "none";
      showD.textContent = on ? "Skrýt graf f′" : "Ukázat graf f′";
    });

    const line = (el, x, y, k) => {
      const [a, b] = p.xr;
      el.setAttribute("x1", p.X(a)); el.setAttribute("y1", p.Y(y + k * (a - x)));
      el.setAttribute("x2", p.X(b)); el.setAttribute("y2", p.Y(y + k * (b - x)));
    };

    function draw() {
      const hh = +sl.input.value, y0 = f(x0), x1 = x0 + hh, y1 = f(x1);
      const ks = (y1 - y0) / hh, kt = df(x0);
      sl.out.textContent = "";
      P0.setAttribute("cx", p.X(x0)); P0.setAttribute("cy", p.Y(y0));
      P1.setAttribute("cx", p.X(x1)); P1.setAttribute("cy", p.Y(y1));
      line(sec, x0, y0, ks);
      line(tan, x0, y0, kt);
      tri.setAttribute("d", `M${p.X(x0)} ${p.Y(y0)}H${p.X(x1)}V${p.Y(y1)}`);
      info.replaceChildren(
        h("div", { class: "c1", text: `sečna: (f(x₀ + h) − f(x₀)) / h = (${fmt(y1, 3)} − ${fmt(y0, 3)}) / ${fmt(hh, 2)} = ${fmt(ks, 4)}` }),
        h("div", { class: "c0 strong", text: `tečna: f′(${fmt(x0, 2)}) = ${fmt(kt, 4)}` }),
        h("div", { class: "widget-msg", text: "Zmenšuj h: sečna se přimkne k tečně. Bod x₀ můžeš táhnout myší." }));
    }

    P0.addEventListener("pointerdown", e => {
      P0.setPointerCapture(e.pointerId);
      const move = ev => {
        const pt = p.svg.createSVGPoint();
        pt.x = ev.clientX; pt.y = ev.clientY;
        const x = p.invX(pt.matrixTransform(p.svg.getScreenCTM().inverse()).x);
        x0 = Math.round(Math.max(p.xr[0], Math.min(p.xr[1], x)) * 20) / 20;
        draw();
      };
      const up = () => { P0.removeEventListener("pointermove", move); P0.removeEventListener("pointerup", up); };
      P0.addEventListener("pointermove", move);
      P0.addEventListener("pointerup", up);
    });
    sl.input.addEventListener("input", draw);
    div.append(h("div", { class: "cal-caption", text: `f(x) = ${pretty(src)}` }),
      h("div", { class: "widget-svg" }, p.svg),
      h("div", { class: "cal-controls" }, sl.wrap, showD), info);
    draw();
  }

  /* ---------- Riemannovy součty ---------- */

  function riemann(div) {
    const src = div.dataset.f, f = compile(src);
    const a = +div.dataset.a;
    let b = +div.dataset.b;
    const bs = div.dataset.bslider ? range2(div.dataset.bslider, "1,5") : null;
    const xr = range2(div.dataset.x, `${Math.min(a, bs ? bs[0] : b) - 0.5},${Math.max(b, bs ? bs[1] : b) + 0.5}`);
    const yr = range2(div.dataset.y, "-1,5");
    const cmp = div.dataset.compare ? compile(div.dataset.compare.replace(/\bb\b/g, "x")) : null;
    const p = makePlot(xr, yr);
    const rects = svgEl("g", {}, p.layer);
    const area = svgEl("path", { class: "pl-area" }, p.layer);
    p.curve(f, "pl-curve c0");
    const bline = svgEl("line", { class: "pl-guide" }, p.layer);

    let mode = "mid";
    const sn = slider("n =", 1, 100, 1, div.dataset.n || 6);
    const sb = bs ? slider("b =", bs[0], bs[1], 0.05, b) : null;
    const modes = h("div", { class: "widget-buttons" });
    const info = h("div", { class: "cal-info" });
    [["left", "levé"], ["mid", "střední"], ["right", "pravé"], ["exact", "přesná plocha"]].forEach(([m, t]) => {
      const btn = button(t, () => { mode = m; draw(); });
      btn.dataset.m = m;
      modes.appendChild(btn);
    });

    function draw() {
      const n = +sn.input.value;
      if (sb) b = +sb.input.value;
      sn.out.textContent = String(n);
      if (sb) sb.out.textContent = fmt(b, 2);
      modes.querySelectorAll("button").forEach(btn => btn.classList.toggle("on", btn.dataset.m === mode));
      rects.replaceChildren();
      const hh = (b - a) / n;
      let sum = 0;
      if (mode !== "exact") {
        for (let k = 0; k < n; k++) {
          const xl = a + k * hh, xs = mode === "left" ? xl : mode === "right" ? xl + hh : xl + hh / 2;
          const y = f(xs);
          if (!Number.isFinite(y)) continue;
          sum += y * hh;
          const top = Math.max(y, 0), bot = Math.min(y, 0);
          svgEl("rect", { x: p.X(Math.min(xl, xl + hh)), y: p.Y(top), width: Math.abs(p.X(xl + hh) - p.X(xl)),
            height: Math.max(0.5, p.Y(bot) - p.Y(top)), class: "pl-rect" + (y < 0 ? " neg" : "") }, rects);
        }
        area.setAttribute("d", "");
      } else {
        let d = `M${p.X(a)} ${p.Y(0)}`;
        for (let k = 0; k <= 200; k++) {
          const x = a + ((b - a) * k) / 200, y = f(x);
          if (Number.isFinite(y)) d += `L${p.X(x)} ${p.Y(Math.max(p.yr[0], Math.min(p.yr[1], y)))}`;
        }
        area.setAttribute("d", d + `L${p.X(b)} ${p.Y(0)}Z`);
      }
      bline.setAttribute("x1", p.X(b)); bline.setAttribute("x2", p.X(b));
      bline.setAttribute("y1", p.pad.t); bline.setAttribute("y2", p.H - p.pad.b);
      const exact = simpson(f, a, b);
      const rows = [];
      if (mode !== "exact") {
        rows.push(h("div", { class: "c1", text: `součet ${n} obdélníků (šířka ${fmt(hh, 4)}) = ${fmt(sum, 5)}` }));
      }
      rows.push(h("div", { class: "c0 strong", text: `∫ od ${fmt(a)} do ${fmt(b, 2)} z ${pretty(src)} dx = ${fmt(exact, 5)}` }));
      if (mode !== "exact") rows.push(h("div", { class: "widget-msg", text: `rozdíl: ${fmt(Math.abs(sum - exact), 5)} — zvětšuj n` }));
      if (cmp) rows.push(h("div", { class: "strong", text: `${div.dataset.compare.replace(/\bb\b/g, fmt(b, 2))} = ${fmt(cmp(b), 5)}` }));
      info.replaceChildren(...rows);
    }
    sn.input.addEventListener("input", draw);
    if (sb) sb.input.addEventListener("input", draw);
    div.append(h("div", { class: "cal-caption", text: `f(x) = ${pretty(src)}` }),
      h("div", { class: "widget-svg" }, p.svg),
      h("div", { class: "cal-controls" }, sn.wrap, ...(sb ? [sb.wrap] : []), modes), info);
    draw();
  }

  /* ---------- posloupnost ---------- */

  function sequence(div) {
    const src = div.dataset.a, f = compile(src);
    const Lsrc = div.dataset.limit, L = Lsrc ? compile(Lsrc)(0) : null;
    const sl = slider("počet členů:", 5, 200, 1, div.dataset.n || 30);
    const holder = h("div", { class: "widget-svg" });
    const info = h("div", { class: "cal-info" });
    function draw() {
      const N = +sl.input.value;
      sl.out.textContent = String(N);
      const vals = Array.from({ length: N }, (_, k) => f(k + 1));
      const fin = vals.filter(Number.isFinite).concat(L !== null ? [L] : []);
      let lo = Math.min(...fin), hi = Math.max(...fin);
      const padY = Math.max((hi - lo) * 0.12, 0.1);
      const p = makePlot([0, N + 1], [lo - padY, hi + padY]);
      if (L !== null) svgEl("line", { x1: p.pad.l, x2: p.W - p.pad.r, y1: p.Y(L), y2: p.Y(L), class: "pl-guide strong" }, p.layer);
      vals.forEach((v, k) => {
        if (Number.isFinite(v)) svgEl("circle", { cx: p.X(k + 1), cy: p.Y(v), r: N > 80 ? 2 : 3.5, class: "pl-seq" }, p.layer);
      });
      if (L !== null) svgEl("text", { x: p.W - p.pad.r - 4, y: p.Y(L) - 6, class: "pl-plabel end" }, p.top).textContent = `${Lsrc} ≈ ${fmt(L, 5)}`;
      holder.replaceChildren(p.svg);
      const show = [1, 2, 3, 5, 10, 100, 1000, 1e6].filter(n => n <= Math.max(N, 1e6));
      info.replaceChildren(h("table", { class: "cal-table" },
        h("tr", {}, h("th", { text: "n" }), ...show.map(n => h("td", { text: n >= 1e6 ? "10⁶" : String(n) }))),
        h("tr", {}, h("th", { text: "aₙ" }), ...show.map(n => h("td", { text: fmt(f(n), 5) })))));
    }
    sl.input.addEventListener("input", draw);
    div.append(h("div", { class: "cal-caption", text: `aₙ = ${pretty(src)}` }), holder,
      h("div", { class: "cal-controls" }, sl.wrap), info);
    draw();
  }

  /* ---------- jednotková kružnice ---------- */

  const igcd = (a, b) => (b ? igcd(b, a % b) : a);

  function radText(deg) {
    if (deg === 0) return "0";
    if (deg % 15) return fmt((deg * Math.PI) / 180, 3);
    const g = igcd(deg, 180), num = deg / g, den = 180 / g;
    return `${num === 1 ? "" : num}π${den === 1 ? "" : "/" + den}`;
  }

  // Přesné hodnoty pro násobky 30° a 45°.
  function exactTrig(deg) {
    const d = ((deg % 360) + 360) % 360;
    const ref = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
    const S = { 0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1" };
    if (!(ref in S)) return null;
    const C = { 0: "1", 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0" };
    const T = { 0: "0", 30: "√3/3", 45: "1", 60: "√3", 90: null };
    const Ct = { 0: null, 30: "√3", 45: "1", 60: "√3/3", 90: "0" };
    const ss = d > 180 ? -1 : 1, cs = d > 90 && d < 270 ? -1 : 1;
    const sg = (v, s) => (v === null ? "nedefinováno" : v === "0" ? "0" : (s < 0 ? "−" : "") + v);
    return { sin: sg(S[ref], ss), cos: sg(C[ref], cs), tg: sg(T[ref], ss * cs), cotg: sg(Ct[ref], ss * cs) };
  }

  function unitCircle(div) {
    let deg = +(div.dataset.deg || 30);
    const R = 120, cx = 150, cy = 150, size = 300;
    const svg = svgEl("svg", { viewBox: `0 0 ${size} ${size}`, class: "uc-svg" });
    const P = (x, y) => [cx + x * R, cy - y * R];
    [-1, -0.5, 0.5, 1].forEach(t => {
      svgEl("line", { x1: P(t, -1.2)[0], y1: 0, x2: P(t, -1.2)[0], y2: size, class: "pl-grid" }, svg);
      svgEl("line", { x1: 0, y1: P(0, t)[1], x2: size, y2: P(0, t)[1], class: "pl-grid" }, svg);
    });
    svgEl("line", { x1: 0, y1: cy, x2: size, y2: cy, class: "pl-axis" }, svg);
    svgEl("line", { x1: cx, y1: 0, x2: cx, y2: size, class: "pl-axis" }, svg);
    svgEl("circle", { cx, cy, r: R, class: "uc-circle" }, svg);
    svgEl("line", { x1: P(1, 0)[0], y1: 0, x2: P(1, 0)[0], y2: size, class: "uc-tanline" }, svg);
    [[1, 0, "1"], [0, 1, "1"], [-1, 0, "−1"], [0, -1, "−1"]].forEach(([x, y, t]) => {
      const [px, py] = P(x, y);
      svgEl("text", { x: px + (x ? (x > 0 ? 8 : -14) : 6), y: py + (y ? (y > 0 ? -6 : 14) : 14), class: "pl-tick" }, svg).textContent = t;
    });
    const arc = svgEl("path", { class: "uc-arc" }, svg);
    const tanExt = svgEl("line", { class: "uc-ext" }, svg);
    const tanSeg = svgEl("line", { class: "uc-tan" }, svg);
    const radius = svgEl("line", { class: "uc-radius" }, svg);
    const cosSeg = svgEl("line", { class: "uc-cos" }, svg);
    const sinSeg = svgEl("line", { class: "uc-sin" }, svg);
    const pt = svgEl("circle", { r: 8, class: "pl-handle uc-handle" }, svg);
    const angleLabel = svgEl("text", { class: "uc-angle" }, svg);

    const p = makePlot([0, 2 * Math.PI], [-1.6, 1.6], 420, 300, { xTicks: false });
    p.curve(Math.sin, "pl-curve c0");
    p.curve(Math.cos, "pl-curve c1");
    [1, 2, 3, 4].forEach(k => {
      const x = (k * Math.PI) / 2;
      svgEl("text", { x: p.X(x), y: p.H - p.pad.b + 15, class: "pl-tick" }, p.top).textContent = ["π/2", "π", "3π/2", "2π"][k - 1];
    });
    const vline = svgEl("line", { class: "pl-cross" }, p.top);
    const ms = svgEl("circle", { r: 5, class: "pl-dot c0" }, p.top);
    const mc = svgEl("circle", { r: 5, class: "pl-dot c1" }, p.top);

    const sl = slider("úhel:", 0, 360, 1, deg);
    const info = h("table", { class: "cal-table uc-table" });

    function draw() {
      const t = (deg * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t);
      const [px, py] = P(c, s), [ox, oy] = P(0, 0);
      radius.setAttribute("x1", ox); radius.setAttribute("y1", oy); radius.setAttribute("x2", px); radius.setAttribute("y2", py);
      cosSeg.setAttribute("x1", ox); cosSeg.setAttribute("y1", oy); cosSeg.setAttribute("x2", px); cosSeg.setAttribute("y2", oy);
      sinSeg.setAttribute("x1", px); sinSeg.setAttribute("y1", oy); sinSeg.setAttribute("x2", px); sinSeg.setAttribute("y2", py);
      pt.setAttribute("cx", px); pt.setAttribute("cy", py);
      const r = 26, large = deg > 180 ? 1 : 0;
      arc.setAttribute("d", deg % 360 === 0 ? "" :
        `M${ox + r} ${oy}A${r} ${r} 0 ${large} 0 ${ox + r * c} ${oy - r * s}`);
      angleLabel.setAttribute("x", ox + 38 * Math.cos(t / 2));
      angleLabel.setAttribute("y", oy - 38 * Math.sin(t / 2) + 4);
      angleLabel.textContent = "α";
      const tg = s / c, okT = Math.abs(c) > 1e-9 && Math.abs(tg) < 1.25;
      const [tx, ty] = P(1, okT ? tg : 0);
      tanSeg.setAttribute("x1", tx); tanSeg.setAttribute("y1", oy); tanSeg.setAttribute("x2", tx); tanSeg.setAttribute("y2", okT ? ty : oy);
      tanExt.setAttribute("x1", ox); tanExt.setAttribute("y1", oy); tanExt.setAttribute("x2", okT ? tx : ox); tanExt.setAttribute("y2", okT ? ty : oy);

      vline.setAttribute("x1", p.X(t)); vline.setAttribute("x2", p.X(t));
      vline.setAttribute("y1", p.pad.t); vline.setAttribute("y2", p.H - p.pad.b);
      ms.setAttribute("cx", p.X(t)); ms.setAttribute("cy", p.Y(s));
      mc.setAttribute("cx", p.X(t)); mc.setAttribute("cy", p.Y(c));

      sl.input.value = deg;
      sl.out.textContent = `${deg}° = ${radText(deg)}`;
      const ex = exactTrig(deg);
      const val = (name, num) => (ex ? `${ex[name]}${ex[name] !== "nedefinováno" && !/^−?[01]$/.test(ex[name]) ? `  ≈ ${fmt(num, 4)}` : ""}` : fmt(num, 4));
      info.replaceChildren(
        h("tr", { class: "c0" }, h("th", { text: "sin α" }), h("td", { text: val("sin", s) }), h("td", { class: "uc-note", text: "výška bodu (y)" })),
        h("tr", { class: "c1" }, h("th", { text: "cos α" }), h("td", { text: val("cos", c) }), h("td", { class: "uc-note", text: "vodorovná poloha (x)" })),
        h("tr", { class: "c2" }, h("th", { text: "tg α" }), h("td", { text: Math.abs(c) < 1e-9 ? "nedefinováno" : val("tg", tg) }), h("td", { class: "uc-note", text: "sin/cos, úsečka na tečně x = 1" })),
        h("tr", {}, h("th", { text: "cotg α" }), h("td", { text: Math.abs(s) < 1e-9 ? "nedefinováno" : val("cotg", c / s) }), h("td", { class: "uc-note", text: "cos/sin" })));
    }

    const setFromPointer = ev => {
      const q = svg.createSVGPoint();
      q.x = ev.clientX; q.y = ev.clientY;
      const m = q.matrixTransform(svg.getScreenCTM().inverse());
      let d = Math.round((Math.atan2(cy - m.y, m.x - cx) * 180) / Math.PI);
      if (d < 0) d += 360;
      // Přichytit k význačným úhlům.
      const snap = Math.round(d / 15) * 15;
      deg = Math.abs(snap - d) <= 3 ? snap % 360 : d;
      draw();
    };
    pt.addEventListener("pointerdown", e => {
      pt.setPointerCapture(e.pointerId);
      const up = () => { pt.removeEventListener("pointermove", setFromPointer); pt.removeEventListener("pointerup", up); };
      pt.addEventListener("pointermove", setFromPointer);
      pt.addEventListener("pointerup", up);
    });
    svg.addEventListener("click", setFromPointer);
    sl.input.addEventListener("input", () => { deg = +sl.input.value; draw(); });
    const quick = h("div", { class: "widget-buttons" },
      ...[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 270, 300, 330].map(d => button(`${d}°`, () => { deg = d; draw(); })));
    div.append(h("div", { class: "mx-split uc-split" }, h("div", { class: "uc-left" }, svg), h("div", { class: "uc-right widget-svg" }, p.svg)),
      h("div", { class: "cal-controls" }, sl.wrap), quick, info,
      h("div", { class: "widget-msg", text: "Táhni bod po kružnici (nebo klikni kamkoliv). U význačných úhlů se ukáže přesná hodnota." }));
    draw();
  }

  /* ---------- poznávačka typů funkcí ---------- */

  const TYPES = {
    konst: "konstantní", lin: "lineární", kvad: "kvadratická", mocn: "mocninná / polynom",
    lom: "lomená (racionální)", odm: "odmocninová", exp: "exponenciální", log: "logaritmická",
    gon: "goniometrická", abs: "absolutní hodnota",
  };
  const QUIZ = [
    ["f(x) = 5", "5", "konst", "Žádné x – hodnota je pořád stejná. Graf je vodorovná přímka."],
    ["f(x) = 2³", "2^3", "konst", "Chyták: 2³ = 8 je jen číslo, x tam není. Konstantní funkce."],
    ["f(x) = e²", "e^2", "konst", "Chyták: e² ≈ 7,39 je číslo. Žádné x → konstantní."],
    ["f(x) = 3x − 1", "3x-1", "lin", "x jen v první mocnině → přímka se směrnicí 3."],
    ["f(x) = x/2 + 4", "x/2+4", "lin", "x/2 = ½·x, tedy x v první mocnině → lineární."],
    ["f(x) = πx", "pi x", "lin", "π je jen číslo (koeficient). x v první mocnině → lineární."],
    ["f(x) = x² − 4x + 3", "x^2-4x+3", "kvad", "Nejvyšší mocnina x² → parabola."],
    ["f(x) = −2x² + 1", "-2x^2+1", "kvad", "x², záporný koeficient → parabola otevřená dolů."],
    ["f(x) = x³", "x^3", "mocn", "x je v ZÁKLADU, číslo v exponentu → mocninná funkce."],
    ["f(x) = x⁴ − x", "x^4-x", "mocn", "Součet mocnin x s přirozenými exponenty → polynom (4. stupně)."],
    ["f(x) = 2ˣ", "2^x", "exp", "x je v EXPONENTU, číslo v základu → exponenciální. Srovnej s x²!"],
    ["f(x) = (½)ˣ", "(1/2)^x", "exp", "x v exponentu, základ ½ < 1 → klesající exponenciála."],
    ["f(x) = 3·eˣ", "3exp(x)", "exp", "x v exponentu čísla e → exponenciální."],
    ["f(x) = e⁻ˣ", "exp(-x)", "exp", "x v exponentu → exponenciální (klesající)."],
    ["f(x) = ln x", "ln(x)", "log", "x uvnitř logaritmu → logaritmická. Definovaná jen pro x > 0."],
    ["f(x) = log₂ x", "ln(x)/ln(2)", "log", "x uvnitř logaritmu → logaritmická."],
    ["f(x) = 1/x", "1/x", "lom", "x ve jmenovateli → lomená funkce, graf je hyperbola."],
    ["f(x) = (x + 1)/(x − 2)", "(x+1)/(x-2)", "lom", "x ve jmenovateli → lineární lomená funkce s asymptotou x = 2."],
    ["f(x) = √x", "sqrt(x)", "odm", "x pod odmocninou → odmocninová funkce, jen pro x ≥ 0."],
    ["f(x) = √(x + 4)", "sqrt(x+4)", "odm", "x pod odmocninou → odmocninová, posunutá o 4 doleva."],
    ["f(x) = sin x", "sin(x)", "gon", "sin → goniometrická, periodická vlna."],
    ["f(x) = 2cos(3x)", "2cos(3x)", "gon", "cos → goniometrická. 2 = amplituda, 3 zkracuje periodu."],
    ["f(x) = |x − 1|", "abs(x-1)", "abs", "Absolutní hodnota → graf tvaru V s vrcholem v x = 1."],
    ["f(x) = x^½", "x^(1/2)", "odm", "x^½ = √x → odmocninová (je to taky mocninná funkce s exponentem ½)."],
  ];

  function funcQuiz(div) {
    let order = [], k = 0, score = 0, total = 0, answered = false;
    const shuffle = () => { order = QUIZ.map((_, i) => i).sort(() => Math.random() - 0.5); k = 0; };
    const formula = h("div", { class: "fq-formula" });
    const buttons = h("div", { class: "widget-buttons fq-buttons" });
    const feedback = h("div", { class: "fq-feedback" });
    const holder = h("div", { class: "widget-svg" });
    const stat = h("div", { class: "widget-msg" });
    const next = button("Další funkce ▶", () => { k++; if (k >= order.length) shuffle(); show(); });

    function show() {
      const [label] = QUIZ[order[k]];
      answered = false;
      formula.textContent = label;
      feedback.replaceChildren();
      holder.replaceChildren();
      buttons.querySelectorAll("button").forEach(b => { b.className = ""; b.disabled = false; });
      next.style.visibility = "hidden";
    }

    function answer(type, btn) {
      if (answered) return;
      answered = true;
      total++;
      const [, expr, correct, why] = QUIZ[order[k]];
      const ok = type === correct;
      if (ok) score++;
      buttons.querySelectorAll("button").forEach(b => {
        if (b.dataset.t === correct) b.className = "on";
        b.disabled = true;
      });
      if (!ok) btn.className = "wrong";
      feedback.replaceChildren(
        h("div", { class: ok ? "fq-ok" : "fq-bad", text: ok ? "✓ Správně" : `✗ Je to ${TYPES[correct]}` }),
        h("div", { text: why }));
      const p = makePlot([-4, 6], [-4, 6], 560, 300);
      p.curve(compile(expr), "pl-curve c0");
      holder.replaceChildren(p.svg);
      stat.textContent = `Skóre: ${score} / ${total}`;
      next.style.visibility = "";
    }

    Object.entries(TYPES).forEach(([t, name]) => {
      const b = h("button", { type: "button", text: name });
      b.dataset.t = t;
      b.addEventListener("click", () => answer(t, b));
      buttons.appendChild(b);
    });
    div.append(h("div", { class: "cal-caption", text: "Jaký je to typ funkce?" }), formula, buttons, feedback, holder,
      h("div", { class: "cal-controls" }, next, stat));
    shuffle();
    show();
  }

  /* ---------- init ---------- */

  function init(root) {
    const once = (sel, fn) => root.querySelectorAll(sel).forEach(d => {
      if (d.dataset.ready) return;
      d.dataset.ready = "1";
      try { fn(d); } catch (e) { errorBox(d, e); }
    });
    once(".plot", plot);
    once(".limit", limit);
    once(".tangent", tangent);
    once(".riemann", riemann);
    once(".sequence", sequence);
    once(".func-quiz", funcQuiz);
    once(".unit-circle", unitCircle);
  }

  window.Calc = { compile };
  if (window.document$) document$.subscribe(() => init(document));
  else document.addEventListener("DOMContentLoaded", () => init(document));
})();
