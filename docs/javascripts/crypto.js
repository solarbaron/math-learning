/*
 * Interaktivní ukázky ke kryptografii.
 *
 * Klasické šifry
 *   <div class="atbash" data-text="TAJNA"></div>                    zrcadlení abecedy
 *   <div class="caesar" data-text="HESLO" data-k="3"></div>         šifrovací kolo
 *   <div class="caesar-brute" data-text="KHVOR"></div>              všech 25 posunů
 *   <div class="vigenere" data-text="HESLO" data-key="2,5,3,4,1"></div>  tabula recta
 *   <div class="skytale" data-text="KRYPTOGRAFIE" data-k="4"></div>
 *   <div class="vernam" data-text="LES" data-key="CBA"></div>       XOR po bitech
 *   <div class="freq" data-text="…"></div>                          frekvenční analýza
 *
 * Teorie čísel
 *   <div class="modclock" data-a="-12" data-n="5" data-b=""></div>   a mod n na hodinách
 *   <div class="phi-grid" data-n="20"></div>                        Eulerova funkce
 *   <div class="sqmul" data-a="3" data-e="33" data-n="17"></div>     Square and Multiply
 *   <div class="mod-table" data-n="7" data-a="3"></div>             násobilka mod n, inverze
 *   <div class="ext-euclid" data-x="3" data-n="20"></div>           rozšířený Eukleidův algoritmus
 *   <div class="reduce" data-a="46" data-e="51" data-n="15"></div>   Fermat / Euler
 *   <div class="crt" data-sys="3 mod 6; 2 mod 7"></div>             čínská věta o zbytcích
 *   <div class="generator" data-n="23" data-g="5"></div>            generátory grupy Z_n^*
 *   <div class="primetest" data-test="fermat|mr|ll" data-n="21" data-a="2"></div>
 *
 * Asymetrická kryptografie
 *   <div class="rsa" data-r="11" data-s="13" data-sk="7" data-m="28"></div>
 *   <div class="dh" data-n="23" data-g="6" data-q="11" data-a="7" data-b="8" data-mitm></div>
 *   <div class="dsa" data-n="23" data-q="11" data-g="4" data-sk="9" data-k="4" data-h="4"></div>
 */
(function () {
  "use strict";
  const { svgEl, h, field } = window.WidgetKit;
  const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const R = String.raw;

  /* ---------- pomocné ---------- */

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const K = s => (window.katex ? katex.renderToString(String(s), { throwOnError: false }) : esc(s));
  const KD = s => (window.katex ? katex.renderToString(String(s), { throwOnError: false, displayMode: true }) : esc(s));
  const clean = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
  const lettersOnly = s => clean(s).replace(/[^A-Z]/g, "");
  const idx = c => ABC.indexOf(c);

  function numField(label, value) {
    const f = field(label, String(value));
    f.input.classList.add("num");
    f.input.setAttribute("inputmode", "numeric");
    return f;
  }

  function readBig(input, name, { min = null, max = null } = {}) {
    const s = input.value.trim().replace(/\s+/g, "");
    if (!/^-?\d+$/.test(s)) throw new Error(`${name} musí být celé číslo`);
    const v = BigInt(s);
    if (min !== null && v < BigInt(min)) throw new Error(`${name} musí být aspoň ${min}`);
    if (max !== null && v > BigInt(max)) throw new Error(`${name} může být nejvýš ${max}`);
    return v;
  }
  const readInt = (input, name, opts) => Number(readBig(input, name, opts));

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

  function button(text, onClick) {
    const b = h("button", { type: "button", text });
    b.addEventListener("click", onClick);
    return b;
  }

  function stepList(rows) {
    return `<ol class="cr-steps">${rows.map(r => `<li>${r}</li>`).join("")}</ol>`;
  }

  // malá čísla (Number)
  const mod = (a, n) => ((a % n) + n) % n;
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  function factor(n) {
    const out = new Map();
    for (let p = 2; p * p <= n; p++) while (n % p === 0) { out.set(p, (out.get(p) || 0) + 1); n /= p; }
    if (n > 1) out.set(n, (out.get(n) || 0) + 1);
    return out;
  }
  function isPrime(n) {
    if (n < 2) return false;
    for (let p = 2; p * p <= n; p++) if (n % p === 0) return false;
    return true;
  }
  function phi(n) {
    let r = n;
    for (const p of factor(n).keys()) r = (r / p) * (p - 1);
    return r;
  }
  const texFactors = fs => [...fs].map(([p, k]) => (k > 1 ? `${p}^{${k}}` : `${p}`)).join(R` \cdot `) || "1";

  // velká čísla (BigInt)
  const bmod = (a, n) => ((a % n) + n) % n;
  function powmod(a, e, n) {
    if (n === 1n) return 0n;
    let r = 1n;
    a = bmod(a, n);
    while (e > 0n) {
      if (e & 1n) r = (r * a) % n;
      a = (a * a) % n;
      e >>= 1n;
    }
    return r;
  }
  function bgcd(a, b) {
    a = a < 0n ? -a : a; b = b < 0n ? -b : b;
    while (b) [a, b] = [b, a % b];
    return a;
  }
  function binv(a, n) {
    let r0 = bmod(a, n), r1 = n, s0 = 1n, s1 = 0n;
    while (r1) {
      const q = r0 / r1;
      [r0, r1] = [r1, r0 - q * r1];
      [s0, s1] = [s1, s0 - q * s1];
    }
    return r0 === 1n ? bmod(s0, n) : null;
  }
  const short = (v, max = 40) => {
    const s = v.toString();
    return s.length > max ? `${s.slice(0, 18)}…${s.slice(-12)} (${s.length} číslic)` : s;
  };

  // přibližné četnosti písmen v češtině (%), diakritika sloučena (č→C, ě/é→E, …)
  const CZ = [8.7, 1.8, 2.9, 3.6, 10.6, 0.3, 0.3, 1.3, 7.6, 2.1, 3.7, 3.8, 3.2,
    6.6, 8.7, 3.4, 0.05, 4.8, 5.8, 5.7, 3.9, 4.4, 0.1, 0.1, 2.8, 3.2];
  const shiftText = (s, k) => s.replace(/[A-Z]/g, c => ABC[mod(idx(c) + k, 26)]);
  function counts(s) {
    const c = new Array(26).fill(0);
    for (const ch of s) { const i = idx(ch); if (i >= 0) c[i]++; }
    return c;
  }
  function chi2(cnt) {
    const total = cnt.reduce((a, b) => a + b, 0) || 1;
    return cnt.reduce((acc, o, i) => { const e = (total * CZ[i]) / 100; return acc + ((o - e) ** 2) / e; }, 0);
  }
  // posun k, o který byl text zašifrován (dešifruje se posunem −k)
  function bestShift(s) {
    let best = 0, bestV = Infinity;
    for (let k = 0; k < 26; k++) {
      const v = chi2(counts(shiftText(s, -k)));
      if (v < bestV) { bestV = v; best = k; }
    }
    return best;
  }

  function chips(pairs, onFocus) {
    const wrap = h("div", { class: "cr-chips" });
    pairs.forEach((p, i) => {
      const c = h("span", { class: "cr-chip", tabindex: "0" });
      c.innerHTML = `${esc(p[0])}<span class="cr-arrow">→</span>${esc(p[1])}`;
      const on = () => { wrap.querySelectorAll(".cr-chip").forEach(x => x.classList.remove("focus")); c.classList.add("focus"); onFocus(i); };
      c.addEventListener("mouseenter", on);
      c.addEventListener("focus", on);
      c.addEventListener("click", on);
      wrap.append(c);
    });
    wrap.addEventListener("mouseleave", () => { wrap.querySelectorAll(".cr-chip").forEach(x => x.classList.remove("focus")); onFocus(-1); });
    return wrap;
  }

  /* ================= KLASICKÉ ŠIFRY ================= */

  /* ---------- Atbash ---------- */

  function atbash(div) {
    const t = field("Text", div.dataset.text || "TAJNA");
    const x0 = 20, step = 20;
    const svg = svgEl("svg", { viewBox: "0 0 540 128", class: "ab-svg" });
    const lines = [], tops = [], bots = [];
    for (let i = 0; i < 26; i++)
      lines.push(svgEl("line", { x1: x0 + i * step, y1: 30, x2: x0 + (25 - i) * step, y2: 96, class: "ab-line" }, svg));
    for (let i = 0; i < 26; i++) {
      tops.push(svgEl("text", { x: x0 + i * step, y: 22, class: "ab-letter" }, svg));
      bots.push(svgEl("text", { x: x0 + i * step, y: 114, class: "ab-letter" }, svg));
      tops[i].textContent = bots[i].textContent = ABC[i];
    }
    const out = h("div", { class: "cr-out" });
    const chipBox = h("div");
    div.append(h("div", { class: "widget-fields" }, t.wrap),
      h("div", { class: "widget-svg cr-scroll" }, svg), out, chipBox,
      h("div", { class: "widget-msg widget-hint", text: "Najeď na dvojici písmen. Atbash je sám sobě inverzí — šifrování i dešifrování je totéž." }));

    let used = [];
    function paint(focus) {
      const set = new Set(used);
      lines.forEach((l, i) => { l.classList.toggle("on", set.has(i)); l.classList.toggle("focus", i === focus); });
      tops.forEach((e, i) => e.classList.toggle("on", set.has(i) || i === focus));
      bots.forEach((e, i) => e.classList.toggle("on", set.has(25 - i) || 25 - i === focus));
    }
    function update() {
      const s = clean(t.input.value);
      const res = s.replace(/[A-Z]/g, c => ABC[25 - idx(c)]);
      out.innerHTML = `${esc(s)} <span class="cr-arrow">→</span> <b>${esc(res)}</b>`;
      const letters = [...s].filter(c => idx(c) >= 0).slice(0, 40);
      used = letters.map(idx);
      chipBox.replaceChildren(chips(letters.map(c => [c, ABC[25 - idx(c)]]), i => paint(i < 0 ? -1 : used[i])));
      paint(-1);
    }
    t.input.addEventListener("input", update);
    update();
  }

  /* ---------- Caesarovo kolo ---------- */

  function annulus(c, r1, r2, a0, a1) {
    const p = (r, a) => [c + r * Math.sin((a * Math.PI) / 180), c - r * Math.cos((a * Math.PI) / 180)];
    const [x1, y1] = p(r2, a0), [x2, y2] = p(r2, a1), [x3, y3] = p(r1, a1), [x4, y4] = p(r1, a0);
    return `M${x1} ${y1}A${r2} ${r2} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r1} ${r1} 0 0 0 ${x4} ${y4}Z`;
  }

  function wheelRing(g, c, r1, r2, cls) {
    const th = 360 / 26, wedges = [];
    for (let i = 0; i < 26; i++) {
      const a = i * th;
      wedges.push(svgEl("path", { d: annulus(c, r1, r2, a - th / 2, a + th / 2), class: `cw-wedge ${cls}` }, g));
      const rr = (r1 + r2) / 2;
      const x = c + rr * Math.sin((a * Math.PI) / 180), y = c - rr * Math.cos((a * Math.PI) / 180);
      const t = svgEl("text", { x, y, class: "cw-letter", transform: `rotate(${a} ${x} ${y})` }, g);
      t.textContent = ABC[i];
    }
    return wedges;
  }

  function caesar(div) {
    let k = Number(div.dataset.k ?? 3), dec = false;
    const t = field("Text", div.dataset.text || "HESLO");
    const slider = h("input", { type: "range", min: "0", max: "25", value: String(k), class: "cr-range", "aria-label": "posun k" });
    const kOut = h("span", { class: "cr-k" });
    const bEnc = button("Šifrovat", () => { dec = false; update(); });
    const bDec = button("Dešifrovat", () => { dec = true; update(); });
    const c = 150, th = 360 / 26;
    const svg = svgEl("svg", { viewBox: "0 0 300 300", class: "cw-svg" });
    const outer = svgEl("g", {}, svg);
    const ow = wheelRing(outer, c, 108, 146, "cw-outer");
    const inner = svgEl("g", { class: "cw-inner" }, svg);
    const iw = wheelRing(inner, c, 68, 106, "cw-in");
    svgEl("circle", { cx: c, cy: c, r: 66, class: "cw-hub" }, svg);
    const hub1 = svgEl("text", { x: c, y: c - 8, class: "cw-hub-k" }, svg);
    const hub2 = svgEl("text", { x: c, y: c + 18, class: "cw-hub-s" }, svg);
    svgEl("path", { d: `M${c - 7} 2 L${c + 7} 2 L${c} 14 Z`, class: "cw-pointer" }, svg);

    const out = h("div", { class: "cr-out" });
    const chipBox = h("div");
    div.append(
      h("div", { class: "widget-fields" }, t.wrap,
        h("label", { class: "widget-field" }, h("span", { text: "posun k =" }), slider, kOut),
        h("div", { class: "widget-buttons" }, bEnc, bDec)),
      h("div", { class: "widget-split" }, h("div", { class: "cw-wrap" }, svg),
        h("div", {}, out, chipBox,
          h("div", { class: "widget-msg widget-hint", text: "Vnější kruh = otevřený text, vnitřní = šifrový text. Posuvníkem otáčíš vnitřním kolem." }))));

    let pairs = [];
    function paint(focus) {
      const used = new Set(pairs.map(p => p[0])), usedIn = new Set(pairs.map(p => p[1]));
      ow.forEach((w, i) => { w.classList.toggle("on", used.has(i)); w.classList.toggle("focus", focus >= 0 && pairs[focus][0] === i); });
      iw.forEach((w, i) => { w.classList.toggle("on", usedIn.has(i)); w.classList.toggle("focus", focus >= 0 && pairs[focus][1] === i); });
    }
    function update() {
      k = Number(slider.value);
      kOut.textContent = k;
      inner.style.transform = `rotate(${-k * th}deg)`;
      hub1.textContent = `k = ${k}`;
      hub2.textContent = `A → ${ABC[k]}`;
      bEnc.classList.toggle("active", !dec);
      bDec.classList.toggle("active", dec);
      const s = clean(t.input.value);
      const res = shiftText(s, dec ? -k : k);
      out.innerHTML = `${esc(s)} <span class="cr-arrow">→</span> <b>${esc(res)}</b>`;
      const letters = [...s].filter(ch => idx(ch) >= 0).slice(0, 40);
      // pár = [index na vnějším kruhu (otevřený), index na vnitřním (šifrový)]
      pairs = letters.map(ch => (dec ? [mod(idx(ch) - k, 26), idx(ch)] : [idx(ch), mod(idx(ch) + k, 26)]));
      chipBox.replaceChildren(chips(letters.map(ch => [ch, shiftText(ch, dec ? -k : k)]), paint));
      paint(-1);
    }
    slider.addEventListener("input", update);
    t.input.addEventListener("input", update);
    update();
  }

  /* ---------- Caesar hrubou silou ---------- */

  function caesarBrute(div) {
    const ta = h("textarea", { class: "widget-input cr-textarea", rows: "3", spellcheck: "false" });
    ta.value = div.dataset.text || "KHVOR";
    const table = h("table", { class: "widget-table cr-brute" });
    div.append(ta, h("div", { class: "cr-scroll" }, table),
      h("div", { class: "widget-msg widget-hint", text: "Zvýrazněný řádek nejlépe odpovídá četnostem písmen v češtině. U krátkého textu se může splést, tam rozhodne, co dává smysl." }));
    function update() {
      const s = clean(ta.value);
      const best = bestShift(s);
      table.innerHTML = "<tr><th>klíč k</th><th>dešifrováno posunem −k</th></tr>" +
        Array.from({ length: 25 }, (_, i) => i + 1).map(k => {
          const txt = shiftText(s, -k);
          return `<tr class="${k === best ? "active" : ""}"><td>${k}</td><td class="mono">${esc(txt.length > 70 ? txt.slice(0, 70) + "…" : txt)}</td></tr>`;
        }).join("");
    }
    ta.addEventListener("input", update);
    update();
  }

  /* ---------- Vigenère + tabula recta ---------- */

  function parseKey(src) {
    const s = src.trim();
    if (/^[\d\s,;]+$/.test(s)) {
      const ks = s.split(/[\s,;]+/).filter(Boolean).map(Number);
      if (!ks.length) throw new Error("Klíč je prázdný");
      return ks.map(k => mod(k, 26));
    }
    const l = lettersOnly(s);
    if (!l) throw new Error("Klíč: slovo (KLIC) nebo posuny (2,5,3)");
    return [...l].map(idx);
  }

  function vigenere(div) {
    let dec = false;
    const t = field("Text", div.dataset.text || "HESLO");
    const k = field("Klíč", div.dataset.key || "2,5,3,4,1");
    const bEnc = button("Šifrovat", () => { dec = false; update(); });
    const bDec = button("Dešifrovat", () => { dec = true; update(); });
    const msg = h("div", { class: "widget-msg" });
    const table = h("table", { class: "vg-table" });
    const out = h("div", { class: "cr-out" });

    const cs = 14, off = 18;
    const svg = svgEl("svg", { viewBox: `0 0 ${off + 26 * cs + 2} ${off + 26 * cs + 2}`, class: "tr-svg" });
    const rowBand = svgEl("rect", { x: 0, width: off + 26 * cs, height: cs, class: "tr-band" }, svg);
    const colBand = svgEl("rect", { y: 0, width: cs, height: off + 26 * cs, class: "tr-band" }, svg);
    const cell = svgEl("rect", { width: cs, height: cs, class: "tr-cell" }, svg);
    for (let i = 0; i < 26; i++) {
      const a = svgEl("text", { x: off + i * cs + cs / 2, y: off / 2 + 1, class: "tr-head" }, svg); a.textContent = ABC[i];
      const b = svgEl("text", { x: off / 2, y: off + i * cs + cs / 2 + 1, class: "tr-head" }, svg); b.textContent = ABC[i];
      for (let j = 0; j < 26; j++) {
        const e = svgEl("text", { x: off + j * cs + cs / 2, y: off + i * cs + cs / 2 + 1, class: "tr-l" }, svg);
        e.textContent = ABC[(i + j) % 26];
      }
    }
    const trNote = h("div", { class: "widget-msg" });

    div.append(h("div", { class: "widget-fields" }, t.wrap, k.wrap, h("div", { class: "widget-buttons" }, bEnc, bDec)), msg,
      h("div", { class: "cr-scroll" }, table), out,
      h("div", { class: "widget-split" }, h("div", { class: "tr-wrap" }, svg),
        h("div", {}, trNote, h("div", { class: "widget-msg widget-hint",
          text: "Najeď na sloupec tabulky nahoře. Řádek tabula recta = posun klíče, sloupec = písmeno otevřeného textu, průsečík = šifrové písmeno." }))));

    let cols = [];
    function focus(i) {
      table.querySelectorAll("td[data-i]").forEach(td => td.classList.toggle("focus", Number(td.dataset.i) === i));
      if (i < 0 || !cols[i]) return;
      const { p, sh, c } = cols[i];
      rowBand.setAttribute("y", off + sh * cs);
      colBand.setAttribute("x", off + p * cs);
      cell.setAttribute("x", off + p * cs);
      cell.setAttribute("y", off + sh * cs);
      trNote.innerHTML = `Řádek <b>${ABC[sh]}</b> (posun ${sh}) × sloupec <b>${ABC[p]}</b> → <b>${ABC[c]}</b>` +
        (dec ? ` — při dešifrování hledáš v řádku ${ABC[sh]} písmeno ${ABC[c]} a čteš záhlaví sloupce: ${ABC[p]}.` : "");
    }
    const run = guarded([k.input], msg, () => {
      bEnc.classList.toggle("active", !dec);
      bDec.classList.toggle("active", dec);
      const s = lettersOnly(t.input.value).slice(0, 40);
      const ks = parseKey(k.input.value);
      cols = [...s].map((ch, i) => {
        const sh = ks[i % ks.length], x = idx(ch);
        return dec ? { p: mod(x - sh, 26), sh, c: x } : { p: x, sh, c: mod(x + sh, 26) };
      });
      const row = (label, f) => `<tr><th>${label}</th>${cols.map((c, i) => `<td data-i="${i}">${f(c, i)}</td>`).join("")}</tr>`;
      table.innerHTML = dec
        ? row("šifrový text", c => ABC[c.c]) + row("klíč", c => ABC[c.sh]) + row("posun", c => `−${c.sh}`) + row("otevřený text", c => `<b>${ABC[c.p]}</b>`)
        : row("otevřený text", c => ABC[c.p]) + row("klíč", c => ABC[c.sh]) + row("posun", c => `+${c.sh}`) + row("šifrový text", c => `<b>${ABC[c.c]}</b>`);
      table.querySelectorAll("td[data-i]").forEach(td => {
        td.addEventListener("mouseenter", () => focus(Number(td.dataset.i)));
        td.addEventListener("click", () => focus(Number(td.dataset.i)));
      });
      const res = cols.map(c => ABC[dec ? c.p : c.c]).join("");
      out.innerHTML = `${esc(s)} <span class="cr-arrow">→</span> <b>${res}</b>`;
      focus(0);
    });
    t.input.addEventListener("input", run);
    k.input.addEventListener("input", run);
    var update = run;
    run();
  }

  /* ---------- Skytale ---------- */

  function skytale(div) {
    const t = field("Text", div.dataset.text || "KRYPTOGRAFIE");
    const k = numField("písmen na otočku", div.dataset.k || "4");
    const msg = h("div", { class: "widget-msg" });
    const grid = h("table", { class: "sk-grid" });
    const strip = h("div", { class: "sk-strip" });
    const out = h("div", { class: "cr-out" });
    const play = button("Odmotat pásek ▶", () => animate());
    div.append(h("div", { class: "widget-fields" }, t.wrap, k.wrap), msg,
      h("div", { class: "widget-split" },
        h("div", {}, h("div", { class: "sk-cap", text: "Na tyčce (píše se po řádcích):" }), grid),
        h("div", {}, h("div", { class: "sk-cap", text: "Odmotaný pásek (čte se po sloupcích):" }), strip, out,
          h("div", { class: "widget-buttons" }, play))),
      h("div", { class: "widget-msg widget-hint", text: "Barva = řádek na tyčce. Na pásku se řádky prolínají, proto je text nečitelný." }));
    let order = [], timer = null;
    function animate() {
      clearInterval(timer);
      const cells = grid.querySelectorAll("td"), bits = strip.querySelectorAll(".sk-ch");
      bits.forEach(b => b.classList.add("hidden"));
      let i = 0;
      timer = setInterval(() => {
        cells.forEach(c => c.classList.remove("focus"));
        if (i >= order.length) { clearInterval(timer); return; }
        cells[order[i]].classList.add("focus");
        bits[i].classList.remove("hidden");
        i++;
      }, 260);
    }
    const run = guarded([k.input], msg, () => {
      clearInterval(timer);
      let s = lettersOnly(t.input.value).slice(0, 60);
      const c = readInt(k.input, "Počet písmen", { min: 2, max: 12 });
      const rows = Math.ceil(s.length / c) || 1;
      const padded = s.padEnd(rows * c, "X");
      grid.innerHTML = Array.from({ length: rows }, (_, r) =>
        `<tr>${Array.from({ length: c }, (_, j) => {
          const ch = padded[r * c + j];
          return `<td class="sk-r${r % 6}${r * c + j >= s.length ? " pad" : ""}">${ch}</td>`;
        }).join("")}</tr>`).join("");
      order = [];
      for (let j = 0; j < c; j++) for (let r = 0; r < rows; r++) order.push(r * c + j);
      strip.innerHTML = order.map(p => `<span class="sk-ch sk-r${Math.floor(p / c) % 6}">${padded[p]}</span>`).join("");
      out.innerHTML = `<b>${order.map(p => padded[p]).join("")}</b>` +
        (padded.length > s.length ? ` <span class="widget-msg">(doplněno X)</span>` : "");
    });
    t.input.addEventListener("input", run);
    k.input.addEventListener("input", run);
    run();
  }

  /* ---------- Vernam (XOR) ---------- */

  const showChar = code => (code >= 33 && code <= 126 ? esc(String.fromCharCode(code))
    : code === 32 ? "␣" : code < 32 ? String.fromCharCode(0x2400 + code) : "?");

  function vernam(div) {
    const t = field("Zpráva", div.dataset.text || "LES");
    const k = field("Klíč", div.dataset.key || "CBA");
    const msg = h("div", { class: "widget-msg" });
    const table = h("table", { class: "vn-table" });
    const out = h("div", { class: "vn-out" });
    div.append(h("div", { class: "widget-fields" }, t.wrap, k.wrap), msg, h("div", { class: "cr-scroll" }, table), out,
      h("div", { class: "widget-msg widget-hint", text: "XOR: stejné bity → 0, různé → 1. Zvýrazněné jsou jedničky výsledku. Znovu XOR s klíčem vrátí zprávu." }));
    const bits = (v, hl) => [...v.toString(2).padStart(8, "0")].map(b => `<span class="vn-bit${hl && b === "1" ? " one" : ""}">${b}</span>`).join("");
    const run = guarded([t.input, k.input], msg, () => {
      const s = t.input.value.slice(0, 12), key = k.input.value;
      if (!s) throw new Error("Zpráva je prázdná");
      if ([...s + key].some(ch => ch.charCodeAt(0) > 127)) throw new Error("Jen znaky ASCII (bez diakritiky)");
      if (key.length < s.length) throw new Error(`Klíč musí být aspoň tak dlouhý jako zpráva (${s.length} znaků)`);
      const kk = key.slice(0, s.length);
      const P = [...s].map(c => c.charCodeAt(0)), Kc = [...kk].map(c => c.charCodeAt(0)), C = P.map((p, i) => p ^ Kc[i]);
      const row = (label, f) => `<tr><th>${label}</th>${P.map((_, i) => `<td>${f(i)}</td>`).join("")}</tr>`;
      table.innerHTML =
        row("zpráva", i => `<div class="vn-ch">${showChar(P[i])} <small>${P[i]}</small></div>${bits(P[i])}`) +
        row("klíč ⊕", i => `<div class="vn-ch">${showChar(Kc[i])} <small>${Kc[i]}</small></div>${bits(Kc[i])}`) +
        `<tr class="vn-sep"><td colspan="${P.length + 1}"></td></tr>` +
        row("šifra", i => `${bits(C[i], true)}<div class="vn-ch">${C[i]} <small>0x${C[i].toString(16).padStart(2, "0").toUpperCase()}</small> ${showChar(C[i])}</div>`) +
        row("šifra ⊕ klíč", i => `<div class="vn-ch back">${showChar(C[i] ^ Kc[i])}</div>`);
      out.innerHTML = `kryptogram (dekadicky): <b>${C.join(", ")}</b><br>binárně: <span class="mono">${C.map(c => c.toString(2).padStart(8, "0")).join(" ")}</span>` +
        (key.length > s.length ? `<br><span class="widget-msg">použito prvních ${s.length} znaků klíče</span>` : "");
    });
    t.input.addEventListener("input", run);
    k.input.addEventListener("input", run);
    run();
  }

  /* ---------- frekvenční analýza ---------- */

  function freq(div) {
    const ta = h("textarea", { class: "widget-input cr-textarea", rows: "4", spellcheck: "false" });
    ta.value = div.dataset.text || "";
    const slider = h("input", { type: "range", min: "0", max: "25", value: "0", class: "cr-range", "aria-label": "posun" });
    const kOut = h("span", { class: "cr-k" });
    const auto = button("Najít posun automaticky", () => { slider.value = bestShift(clean(ta.value)); update(); });
    const W = 540, H = 190, x0 = 14, bw = 20, y0 = 160, scale = 7;
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "fq-svg" });
    const refs = [], bars = [], labels = [];
    for (let i = 0; i < 26; i++) {
      const x = x0 + i * bw;
      refs.push(svgEl("rect", { x: x + 2, width: bw - 4, y: y0 - CZ[i] * scale, height: CZ[i] * scale, class: "fq-ref" }, svg));
      bars.push(svgEl("rect", { x: x + 5, width: bw - 10, y: y0, height: 0, class: "fq-bar" }, svg));
      labels.push(svgEl("text", { x: x + bw / 2, y: y0 + 16, class: "fq-label" }, svg));
      labels[i].textContent = ABC[i];
    }
    svgEl("line", { x1: x0, x2: x0 + 26 * bw, y1: y0, y2: y0, class: "fq-axis" }, svg);
    const top = h("div", { class: "widget-msg" });
    const out = h("div", { class: "cr-out fq-out" });
    div.append(ta,
      h("div", { class: "widget-fields" }, h("label", { class: "widget-field" }, h("span", { text: "posun zpět k =" }), slider, kOut),
        h("div", { class: "widget-buttons" }, auto)),
      h("div", { class: "widget-svg cr-scroll" }, svg),
      h("div", { class: "fq-legend" }, h("span", { class: "fq-key ref", text: "čeština" }), h("span", { class: "fq-key bar", text: "dešifrovaný text" })),
      top, out);
    function update() {
      const s = clean(ta.value), k = Number(slider.value);
      kOut.textContent = k;
      const d = shiftText(s, -k), cnt = counts(d), total = cnt.reduce((a, b) => a + b, 0) || 1;
      cnt.forEach((c, i) => {
        const v = (100 * c) / total, hh = Math.min(v, 21) * scale;
        bars[i].setAttribute("y", y0 - hh);
        bars[i].setAttribute("height", hh);
      });
      const cc = counts(s), order = cc.map((c, i) => [c, i]).sort((a, b) => b[0] - a[0]).filter(x => x[0] > 0).slice(0, 3);
      top.innerHTML = order.length
        ? `Nejčastější v šifře: ${order.map(([c, i]) => `<b>${ABC[i]}</b> (${c}×)`).join(", ")}. V češtině je nejčastější E, O, A. ` +
          `Kdyby ${ABC[order[0][1]]} bylo E, byl by posun ${mod(order[0][1] - 4, 26)}.`
        : "";
      out.textContent = d;
    }
    slider.addEventListener("input", update);
    ta.addEventListener("input", update);
    update();
  }

  /* ================= TEORIE ČÍSEL ================= */

  /* ---------- modulární hodiny ---------- */

  function modclock(div) {
    const hasB = "b" in div.dataset;
    const a = numField("a =", div.dataset.a ?? "17");
    const n = numField("n =", div.dataset.n ?? "5");
    const b = numField("b =", div.dataset.b || "2");
    const msg = h("div", { class: "widget-msg" });
    const S = 300, c = S / 2, Rr = 120;
    const svg = svgEl("svg", { viewBox: `0 0 ${S} ${S}`, class: "mc-svg" });
    const info = h("div", { class: "mc-info" });
    div.append(h("div", { class: "widget-fields" }, a.wrap, ...(hasB ? [b.wrap] : []), n.wrap), msg,
      h("div", { class: "widget-split" }, h("div", { class: "mc-wrap" }, svg), info));

    const pt = (k, nn, r) => {
      const ang = (2 * Math.PI * k) / nn;
      return [c + r * Math.sin(ang), c - r * Math.cos(ang)];
    };
    function spiral(g, val, nn, cls, rStart) {
      const turns = Math.abs(val) / nn, dr = Math.min(9, 60 / Math.max(turns, 1));
      const N = Math.min(1600, Math.max(30, Math.ceil(Math.abs(val) * 12)));
      let d = "";
      for (let i = 0; i <= N; i++) {
        const tt = (val * i) / N, r = rStart - dr * (Math.abs(tt) / nn);
        const [x, y] = pt(tt, nn, r);
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      const tEnd = val, rEnd = rStart - dr * (Math.abs(tEnd) / nn);
      const [ex, ey] = pt(tEnd, nn, rEnd), [dx, dy] = pt(tEnd, nn, Rr);
      svgEl("line", { x1: ex, y1: ey, x2: dx, y2: dy, class: `mc-link ${cls}` }, g);
      const p = svgEl("path", { d, class: `mc-spiral ${cls}` }, g);
      const len = p.getTotalLength ? p.getTotalLength() : 0;
      if (len) {
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        requestAnimationFrame(() => requestAnimationFrame(() => { p.style.strokeDashoffset = 0; }));
      }
    }
    const run = guarded([a.input, n.input, b.input], msg, () => {
      const nn = readInt(n.input, "n", { min: 2, max: 60 });
      const av = readInt(a.input, "a", { min: -999, max: 999 });
      const bv = hasB ? readInt(b.input, "b", { min: -999, max: 999 }) : null;
      svg.replaceChildren();
      svgEl("circle", { cx: c, cy: c, r: Rr, class: "mc-ring" }, svg);
      const ra = mod(av, nn), rb = hasB ? mod(bv, nn) : null;
      const every = nn > 30 ? 5 : nn > 20 ? 2 : 1;
      for (let k = 0; k < nn; k++) {
        const [x, y] = pt(k, nn, Rr), [tx, ty] = pt(k, nn, Rr + 16);
        const on = k === ra || k === rb;
        svgEl("circle", { cx: x, cy: y, r: on ? 7 : 3.5, class: `mc-dot${k === ra ? " a" : ""}${k === rb ? " b" : ""}` }, svg);
        if (k % every === 0 || on) {
          const t = svgEl("text", { x: tx, y: ty, class: `mc-num${on ? " on" : ""}` }, svg);
          t.textContent = k;
        }
      }
      const g = svgEl("g", {}, svg);
      spiral(g, av, nn, "a", Rr - 14);
      if (hasB) spiral(g, bv, nn, "b", Rr - 20);
      svgEl("circle", { cx: c, cy: c, r: 3, class: "mc-center" }, svg);
      const line = (v, r) => {
        const q = Math.floor(v / nn);
        return K(R`${v} = ${q < 0 ? `(${q})` : q} \cdot ${nn} + ${r}`);
      };
      let html = `<div class="mc-row a">${line(av, ra)}</div><div class="mc-big">${K(R`${av} \bmod ${nn} = ${ra}`)}</div>`;
      if (av < 0) html += `<div class="widget-msg">Záporné číslo: jdi proti směru hodinových ručiček. Nejbližší násobek ${nn} menší nebo rovný ${av} je ${Math.floor(av / nn) * nn}, a ${av} − (${Math.floor(av / nn) * nn}) = ${ra}.</div>`;
      else html += `<div class="widget-msg">${Math.floor(av / nn)}× celé kolo a ještě ${ra} kroků.</div>`;
      if (hasB) {
        const same = ra === rb;
        html += `<div class="mc-row b">${line(bv, rb)}</div>` +
          `<div class="mc-big ${same ? "ok" : "bad"}">${K(R`${av} ${same ? R`\equiv` : R`\not\equiv`} ${bv} \pmod{${nn}}`)}</div>` +
          `<div class="widget-msg">${same ? "Skončí na stejném místě" : "Skončí na různých místech"} — rozdíl ${av} − (${bv}) = ${av - bv} ${same ? "je" : "není"} dělitelný ${nn}.</div>`;
      }
      info.innerHTML = html;
    });
    [a, b, n].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ---------- Eulerova funkce ---------- */

  function phiGrid(div) {
    const n = numField("n =", div.dataset.n || "20");
    const msg = h("div", { class: "widget-msg" });
    const btns = h("div", { class: "widget-buttons" });
    const grid = h("div", { class: "phi-grid-cells" });
    const info = h("div", { class: "phi-info" });
    div.append(h("div", { class: "widget-fields" }, n.wrap), msg, btns, grid, info);
    let struck = new Set();
    const run = guarded([n.input], msg, () => {
      const nn = readInt(n.input, "n", { min: 1, max: 400 });
      const fs = factor(nn), primes = [...fs.keys()];
      struck = new Set([...struck].filter(p => primes.includes(p)));
      btns.replaceChildren(...primes.map((p, i) => {
        const bt = button(`škrtni násobky ${p}`, () => { struck.has(p) ? struck.delete(p) : struck.add(p); paint(); });
        bt.dataset.p = p;
        bt.classList.add(`phi-p${i % 4}`);
        return bt;
      }));
      grid.innerHTML = Array.from({ length: nn }, (_, i) => `<span class="phi-cell" data-v="${i + 1}">${i + 1}</span>`).join("");
      const ph = phi(nn);
      let formula;
      if (nn === 1) formula = R`\varphi(1) = 1`;
      else if (isPrime(nn)) formula = R`\varphi(${nn}) = ${nn} - 1 = ${ph} \quad\text{(prvočíslo)}`;
      else if (primes.length === 1) {
        const [p, kk] = [...fs][0];
        formula = R`\varphi(${p}^{${kk}}) = (${p}-1)\cdot ${p}^{${kk - 1}} = ${ph}`;
      } else {
        const prod = primes.map(p => R`\left(1 - \tfrac{1}{${p}}\right)`).join(R` \cdot `);
        formula = R`\varphi(${nn}) = ${nn} \cdot ${prod} = ${ph}`;
        if ([...fs.values()].every(v => v === 1) && primes.length === 2)
          formula += R`\quad\text{nebo}\quad \varphi(${primes[0]})\cdot\varphi(${primes[1]}) = ${primes[0] - 1}\cdot${primes[1] - 1} = ${ph}`;
      }
      info.innerHTML = `<div>${K(R`${nn} = ${texFactors(fs)}`)}</div>${KD(formula)}` +
        `<div class="widget-msg">Oranžová čísla jsou nesoudělná s ${nn} — je jich <b>${ph}</b>. Každé prvočíslo p z rozkladu vyškrtne přesně 1/p čísel, proto ten součin.</div>`;
      paint();
    });
    function paint() {
      const nn = Number(n.input.value);
      const primes = [...btns.children].map(b => Number(b.dataset.p));
      btns.querySelectorAll("button").forEach(b => b.classList.toggle("active", struck.has(Number(b.dataset.p))));
      grid.querySelectorAll(".phi-cell").forEach(c => {
        const v = Number(c.dataset.v);
        c.classList.toggle("co", gcd(v, nn) === 1);
        primes.forEach((p, i) => c.classList.toggle(`x${i % 4}`, struck.has(p) && v % p === 0));
      });
    }
    n.input.addEventListener("input", run);
    run();
  }

  /* ---------- Square and Multiply ---------- */

  function sqmul(div) {
    const a = numField("a =", div.dataset.a || "3");
    const e = numField("exponent =", div.dataset.e || "33");
    const n = numField("n =", div.dataset.n || "17");
    const msg = h("div", { class: "widget-msg" });
    const head = h("div", { class: "sm-head" });
    const table = h("table", { class: "sm-table" });
    const res = h("div", { class: "sm-res" });
    let shown = 0, rows = [];
    const next = button("Další krok ▶", () => { shown = Math.min(rows.length, shown + 1); paint(); });
    const all = button("Vše", () => { shown = rows.length; paint(); });
    const again = button("Znovu", () => { shown = 0; paint(); });
    div.append(h("div", { class: "widget-fields" }, a.wrap, e.wrap, n.wrap), msg, head,
      h("div", { class: "widget-buttons" }, next, all, again), h("div", { class: "cr-scroll" }, table), res);
    let final = "";
    function paint() {
      table.innerHTML = `<tr><th>i</th><th>k<sub>i</sub></th><th>b (začíná 1)</th><th>a</th></tr>` +
        rows.map((r, i) => `<tr class="${i >= shown ? "hidden" : ""}${i === shown - 1 ? " cur" : ""}${r.k ? " one" : ""}">` +
          `<td>${i}</td><td>${r.k}</td><td>${r.b}</td><td>${r.a}</td></tr>`).join("");
      res.innerHTML = shown === rows.length ? final : "";
    }
    const run = guarded([a.input, e.input, n.input], msg, () => {
      const A = readBig(a.input, "a", { min: 0 }), E = readBig(e.input, "Exponent", { min: 0 }), N = readBig(n.input, "n", { min: 2 });
      const bin = E.toString(2);
      if (bin.length > 64) throw new Error("Exponent nejvýš 64 bitů");
      const L = bin.length;
      head.innerHTML = `${K(R`${E}_{10} = `)} <span class="sm-bin">${[...bin].map((b, j) =>
        `<span class="${b === "1" ? "one" : ""}" title="i = ${L - 1 - j}">${b}</span>`).join("")}</span>${K("_2")}` +
        `<div class="widget-msg">${K(R`${E} = ${[...bin].map((b, j) => (b === "1" ? `2^{${L - 1 - j}}` : null)).filter(Boolean).join(" + ") || "0"}`)} — tabulka jde od nejnižšího bitu (vpravo).</div>`;
      rows = [];
      let ai = bmod(A, N), b = 1n;
      for (let i = 0; i < L; i++) {
        const k = bin[L - 1 - i] === "1" ? 1 : 0;
        let aCell;
        if (i === 0) aCell = `${ai}`;
        else { const prev = ai; ai = (ai * ai) % N; aCell = `${prev}² mod ${N} = <b>${ai}</b>`; }
        let bCell;
        if (k) { const prev = b; b = (ai * b) % N; bCell = `${ai}·${prev} mod ${N} = <b>${b}</b>`; }
        else bCell = `<span class="sm-copy">${b}</span>`;
        rows.push({ k, a: aCell, b: bCell });
      }
      const direct = powmod(A, E, N);
      final = KD(R`${A}^{${E}} \bmod ${N} = ${b}`) +
        `<div class="widget-msg">Výsledek je poslední b. ${direct === b ? "✓ souhlasí s přímým výpočtem." : "✗ nesouhlasí!"} ` +
        `Násobení: ${L - 1 + [...bin].filter(x => x === "1").length - 1} místo ${E > 1n ? short(E - 1n) : 0}.</div>`;
      shown = 0;
      paint();
    });
    [a, e, n].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ---------- násobilka mod n ---------- */

  function modTable(div) {
    const n = numField("n =", div.dataset.n || "7");
    const msg = h("div", { class: "widget-msg" });
    const table = h("table", { class: "mt-table" });
    const info = h("div", { class: "mt-info" });
    div.append(h("div", { class: "widget-fields" }, n.wrap), msg, h("div", { class: "cr-scroll" }, table), info,
      h("div", { class: "widget-msg widget-hint", text: "Klikni na řádek. Inverze k a je číslo, u kterého v řádku vyjde 1. Šedé řádky jedničku nemají — a není nesoudělné s n." }));
    let sel = Number(div.dataset.a || 3);
    function select(a, nn) {
      sel = a;
      table.querySelectorAll("tr[data-a]").forEach(tr => tr.classList.toggle("sel", Number(tr.dataset.a) === a));
      const g = gcd(a, nn);
      if (g === 1) {
        const inv = [...Array(nn).keys()].find(x => (a * x) % nn === 1);
        info.innerHTML = K(R`${a} \cdot ${inv} = ${a * inv} \equiv 1 \pmod{${nn}} \;\Rightarrow\; ${a}^{-1} \bmod ${nn} = ${inv}`);
      } else info.innerHTML = K(R`\mathrm{GCD}(${a}, ${nn}) = ${g} \ne 1`) + " → v řádku nikdy nevyjde 1, inverze neexistuje.";
    }
    const run = guarded([n.input], msg, () => {
      const nn = readInt(n.input, "n", { min: 2, max: 20 });
      const xs = Array.from({ length: nn - 1 }, (_, i) => i + 1);
      table.innerHTML = `<tr><th>·</th>${xs.map(x => `<th>${x}</th>`).join("")}</tr>` +
        xs.map(a => `<tr data-a="${a}" class="${gcd(a, nn) === 1 ? "" : "noinv"}"><th>${a}</th>${xs.map(x => {
          const v = (a * x) % nn;
          return `<td class="${v === 1 ? "one" : v === 0 ? "zero" : ""}">${v}</td>`;
        }).join("")}</tr>`).join("");
      table.querySelectorAll("tr[data-a]").forEach(tr => tr.addEventListener("click", () => select(Number(tr.dataset.a), nn)));
      select(sel >= 1 && sel < nn ? sel : 1, nn);
    });
    n.input.addEventListener("input", run);
    run();
  }

  /* ---------- rozšířený Eukleidův algoritmus (tabulka Vstup | Podíl | Y) ---------- */

  function extEuclid(div) {
    const x = numField("x =", div.dataset.x || "3");
    const n = numField("n =", div.dataset.n || "20");
    const msg = h("div", { class: "widget-msg" });
    const table = h("table", { class: "ee-table" });
    const res = h("div", { class: "ee-res" });
    let shown = 0, total = 0, model = null;
    const next = button("Další krok ▶", () => { shown = Math.min(total, shown + 1); paint(); });
    const all = button("Vše", () => { shown = total; paint(); });
    const again = button("Znovu", () => { shown = 0; paint(); });
    div.append(h("div", { class: "widget-fields" }, x.wrap, n.wrap), msg, (() => { const d = h("div", { class: "ee-goal" }); d.innerHTML = `Hledám ${K(R`x^{-1} \bmod n`)}`; return d; })(),
      h("div", { class: "widget-buttons" }, next, all, again), h("div", { class: "cr-scroll" }, table), res);

    function paint() {
      const { v, q, Y, m, note } = model;
      const rowsDown = v.length;                // kroky 1..rowsDown: řádky shora
      const yCount = m + 1;                     // pak Y odspodu
      const showRow = i => shown > i;
      const showY = i => shown > rowsDown + (m - i);
      table.innerHTML = `<tr><th></th><th>Vstup</th><th>Podíl</th><th>Y</th><th></th></tr>` +
        v.map((val, i) => {
          const tag = i === 0 ? "n" : i === 1 ? "x" : "";
          const qq = i >= 1 && i <= m && showRow(i) ? q[i] : "";
          const yy = i <= m && showY(i) ? Y[i] : "";
          const cur = (shown === i + 1) || (shown === rowsDown + (m - i) + 1 && i <= m);
          return `<tr class="${showRow(i) ? "" : "hidden"}${cur ? " cur" : ""}"><td class="ee-tag">${tag}</td>` +
            `<td>${val}</td><td>${qq}</td><td class="ee-y">${yy}</td><td class="ee-note">${i <= m && showY(i) ? note[i] : ""}</td></tr>`;
        }).join("");
      res.innerHTML = shown >= total ? model.final : "";
    }
    const run = guarded([x.input, n.input], msg, () => {
      const N = readInt(n.input, "n", { min: 2, max: 1e9 });
      let X = readInt(x.input, "x", { min: 1, max: 1e9 });
      let pre = "";
      if (X >= N) { pre = `<div class="widget-msg">${K(R`${X} \bmod ${N} = ${X % N}`)} — počítám s tímto.</div>`; X = X % N; }
      if (X === 0) throw new Error("x je násobek n — inverze neexistuje");
      const v = [N, X];
      while (v[v.length - 1] !== 0) v.push(v[v.length - 2] % v[v.length - 1]);
      const m = v.length - 2;                    // index posledního nenulového
      const q = [];                              // q[i] = v[i-1] div v[i], píše se do řádku i
      for (let i = 1; i <= m; i++) q[i] = Math.floor(v[i - 1] / v[i]);
      const Y = [], note = [];
      Y[m] = 0; note[m] = "vždy 0";
      if (m >= 1) { Y[m - 1] = 1; note[m - 1] = "vždy 1"; }
      for (let i = m - 2; i >= 0; i--) {
        Y[i] = q[i + 1] * Y[i + 1] + Y[i + 2];
        note[i] = `${q[i + 1]}·${Y[i + 1]} + ${Y[i + 2]}`;
      }
      const g = v[m];
      let final;
      if (g !== 1) {
        final = `<div class="ee-bad">${K(R`\mathrm{GCD}(${X}, ${N}) = ${g} \ne 1`)} → inverzní prvek neexistuje.</div>`;
      } else if (m === 1) {
        final = KD(R`1 \cdot 1 - 0 \cdot ${N} = 1 \;\Rightarrow\; 1^{-1} \bmod ${N} = 1`);
      } else {
        const A = Y[0], Bv = Y[1];
        const plus = A * X - Bv * N === 1;
        const coef = plus ? A : -A;
        const inv = mod(coef, N);
        final = KD(plus ? R`+${A}\cdot${X} - ${Bv}\cdot${N} = ${A * X} - ${Bv * N} = 1`
          : R`-${A}\cdot${X} + ${Bv}\cdot${N} = ${-A * X} + ${Bv * N} = 1`) +
          `<div>a = ${A} (Y u n), b = ${Bv} (Y u x). Znaménka zvol tak, aby vyšla 1. Koeficient u x je inverze:</div>` +
          KD(R`${coef} \bmod ${N} = ${inv} = ${X}^{-1} \bmod ${N}`) +
          `<div class="widget-msg">Zkouška: ${K(R`${X} \cdot ${inv} = ${X * inv} = ${Math.floor((X * inv) / N)}\cdot ${N} + ${(X * inv) % N}`)} ✓</div>`;
      }
      model = { v, q, Y, m, note, final: pre + final };
      total = v.length + (g === 1 ? m + 1 : 0);
      if (g !== 1) model.m = -1;
      shown = 0;
      paint();
    });
    [x, n].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ---------- Malá Fermatova / Eulerova věta ---------- */

  function reduce(div) {
    const a = numField("a =", div.dataset.a || "46");
    const e = numField("e =", div.dataset.e || "51");
    const n = numField("n =", div.dataset.n || "11");
    const msg = h("div", { class: "widget-msg" });
    const out = h("div", { class: "rd-out" });
    div.append(h("div", { class: "widget-fields" }, a.wrap, e.wrap, n.wrap), msg, out);
    const run = guarded([a.input, e.input, n.input], msg, () => {
      const A = readBig(a.input, "a", { min: 1 }), E = readBig(e.input, "e", { min: 0 });
      const nn = readInt(n.input, "n", { min: 2, max: 1e12 }), N = BigInt(nn);
      const g = bgcd(A, N), steps = [];
      steps.push(`Cíl: ${K(R`${A}^{${E}} \bmod ${nn}`)}`);
      if (g !== 1n) {
        out.innerHTML = stepList([...steps, `${K(R`\mathrm{GCD}(${A}, ${nn}) = ${g} \ne 1`)} — věta se <b>nedá</b> použít (a, n musí být nesoudělná).`]) +
          KD(R`${A}^{${E}} \bmod ${nn} = ${powmod(A, E, N)}`) + `<div class="widget-msg">(spočítáno přímo)</div>`;
        return;
      }
      steps.push(`${K(R`\mathrm{GCD}(${A}, ${nn}) = 1`)} ✓ nesoudělná`);
      const prime = isPrime(nn), ph = phi(nn);
      if (prime) steps.push(`${nn} je prvočíslo → <b>Malá Fermatova věta</b>: ${K(R`\varphi(${nn}) = ${nn} - 1 = ${ph}`)}`);
      else {
        const fs = factor(nn);
        steps.push(`${nn} není prvočíslo → <b>Eulerova věta</b>: ${K(R`${nn} = ${texFactors(fs)},\; \varphi(${nn}) = ${nn}\cdot${[...fs.keys()].map(p => R`\left(1-\tfrac1{${p}}\right)`).join("")} = ${ph}`)}`);
      }
      const a2 = bmod(A, N), e2 = E % BigInt(ph);
      steps.push(`základ: ${K(R`${A} \bmod ${nn} = ${a2}`)}`);
      steps.push(`exponent: ${K(R`${E} \bmod ${ph} = ${e2}`)}`);
      const r = powmod(a2, e2, N);
      steps.push(`${K(R`${a2}^{${e2}} \bmod ${nn} = ${r}`)}`);
      out.innerHTML = stepList(steps) + KD(R`${A}^{${E}} \bmod ${nn} = ${r}`) +
        `<div class="widget-msg">${powmod(A, E, N) === r ? "✓ souhlasí s přímým výpočtem" : "✗ nesouhlasí"}</div>`;
    });
    [a, e, n].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ---------- čínská věta o zbytcích ---------- */

  function parseSys(src) {
    return src.split(/[;\n]/).map(s => s.trim()).filter(Boolean).map(s => {
      const m = s.replace(/x|≡|\(|\)|=/g, " ").match(/^\s*(-?\d+)\s*(?:mod)?\s+(\d+)\s*$/i);
      if (!m) throw new Error(`Nerozumím „${s}" — piš např. 2 mod 3`);
      return [Number(m[1]), Number(m[2])];
    });
  }

  function crt(div) {
    const f = field("Soustava", div.dataset.sys || "3 mod 6; 2 mod 7");
    f.input.classList.add("wide");
    const msg = h("div", { class: "widget-msg" });
    const sys = h("div", { class: "crt-sys" });
    const table = h("table", { class: "widget-table crt-table" });
    const res = h("div", { class: "crt-res" });
    const vis = h("div", { class: "widget-svg cr-scroll" });
    div.append(h("div", { class: "widget-fields" }, f.wrap), msg, sys, h("div", { class: "cr-scroll" }, table), res, vis);
    const run = guarded([f.input], msg, () => {
      const eq = parseSys(f.input.value);
      if (eq.length < 2 || eq.length > 5) throw new Error("Zadej 2 až 5 kongruencí");
      if (eq.some(([, m]) => m < 2 || m > 1000)) throw new Error("Moduly 2 až 1000");
      sys.innerHTML = KD(R`\begin{aligned}${eq.map(([a, m]) => R`x &\equiv ${a} \pmod{${m}}`).join(R`\\`)}\end{aligned}`);
      const bad = [];
      for (let i = 0; i < eq.length; i++) for (let j = i + 1; j < eq.length; j++)
        if (gcd(eq[i][1], eq[j][1]) !== 1) bad.push([eq[i][1], eq[j][1]]);
      const M = eq.reduce((p, [, m]) => p * m, 1);
      if (bad.length) {
        table.innerHTML = ""; vis.replaceChildren();
        const L = eq.reduce((l, [, m]) => (l * m) / gcd(l, m), 1);
        let sol = null;
        for (let x = 0; x < L && L <= 1e6; x++) if (eq.every(([a, m]) => mod(x - a, m) === 0)) { sol = x; break; }
        res.innerHTML = `<div class="ee-bad">${bad.map(([p, q]) => K(R`\mathrm{GCD}(${p}, ${q}) = ${gcd(p, q)} \ne 1`)).join(", ")} — moduly nejsou nesoudělné, čínskou větu <b>nelze použít</b>.</div>` +
          `<div class="widget-msg">${sol === null ? "Zkouškou všech čísel: soustava nemá řešení." : `Zkouškou všech čísel do ${L}: řešení je ${K(R`x \equiv ${sol} \pmod{${L}}`)}.`}</div>`;
        return;
      }
      const rows = eq.map(([a, m]) => {
        const N = M / m, Li = Number(binv(BigInt(N), BigInt(m)));
        return { a, m, N, L: Li, t: a * N * Li };
      });
      const sum = rows.reduce((s, r) => s + r.t, 0), x = mod(sum, M);
      table.innerHTML = `<tr><th>i</th><th>${K("a_i")}</th><th>${K("m_i")}</th><th>${K(R`N_i = M / m_i`)}</th><th>${K(R`L_i = N_i^{-1} \bmod m_i`)}</th><th>${K(R`a_i N_i L_i`)}</th></tr>` +
        rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r.a}</td><td>${r.m}</td><td>${M} / ${r.m} = ${r.N}</td><td>${K(R`${r.N}^{-1} \bmod ${r.m} = ${r.L}`)}</td><td>${r.a}·${r.N}·${r.L} = ${r.t}</td></tr>`).join("");
      res.innerHTML = K(R`M = ${eq.map(([, m]) => m).join(R`\cdot`)} = ${M}`) +
        KD(R`x = (${rows.map(r => r.t).join(" + ")}) \bmod ${M} = ${sum} \bmod ${M} = ${x}`) +
        `<div class="widget-msg">Zkouška: ${eq.map(([a, m]) => K(R`${x} \bmod ${m} = ${mod(x, m)}`)).join(", ")} ✓. Všechna řešení: ${K(R`x = ${x} + ${M}k`)}.</div>`;
      // vizualizace: řádek = jedna kongruence, tečka = vyhovující číslo
      vis.replaceChildren();
      if (M > 240) { vis.append(h("div", { class: "widget-msg", text: `(M = ${M} je moc velké na obrázek.)` })); return; }
      const cw = Math.max(3, Math.min(14, 560 / M)), lw = 70, rh = 20, Wd = lw + M * cw + 10, Ht = (eq.length + 1) * rh + 30;
      const svg = svgEl("svg", { viewBox: `0 0 ${Wd} ${Ht}`, class: "crt-svg", style: `max-width:${Wd}px` });
      svgEl("rect", { x: lw + x * cw, y: 0, width: cw, height: (eq.length + 1) * rh + 4, class: "crt-col" }, svg);
      eq.forEach(([a, m], r) => {
        const t = svgEl("text", { x: lw - 6, y: r * rh + rh / 2 + 4, class: "crt-lab" }, svg);
        t.textContent = `≡ ${mod(a, m)} (mod ${m})`;
        for (let v = mod(a, m); v < M; v += m)
          svgEl("circle", { cx: lw + v * cw + cw / 2, cy: r * rh + rh / 2 + 2, r: Math.min(5, cw / 2 + 1), class: `crt-dot c${r % 4}` }, svg);
      });
      const yb = eq.length * rh + rh / 2 + 2;
      const t = svgEl("text", { x: lw - 6, y: yb + 4, class: "crt-lab" }, svg);
      t.textContent = "všechny";
      svgEl("circle", { cx: lw + x * cw + cw / 2, cy: yb, r: Math.min(6, cw / 2 + 2), class: "crt-dot sol" }, svg);
      [0, x, M - 1].forEach((v, i) => {
        const tt = svgEl("text", { x: lw + v * cw + cw / 2, y: Ht - 6, class: `crt-tick${i === 1 ? " on" : ""}` }, svg);
        tt.textContent = v;
      });
      vis.append(svg);
    });
    f.input.addEventListener("input", run);
    run();
  }

  /* ---------- generátory Z_n^* ---------- */

  function generator(div) {
    const n = numField("n =", div.dataset.n || "23");
    const g = numField("g =", div.dataset.g || "5");
    const msg = h("div", { class: "widget-msg" });
    const S = 320, c = S / 2, Rr = 125;
    const svg = svgEl("svg", { viewBox: `0 0 ${S} ${S}`, class: "gen-svg" });
    const info = h("div", { class: "gen-info" });
    const all = h("div", { class: "cr-chips" });
    div.append(h("div", { class: "widget-fields" }, n.wrap, g.wrap), msg,
      h("div", { class: "widget-split" }, h("div", { class: "gen-wrap" }, svg), h("div", {}, info, all)));
    let timer = null;
    const run = guarded([n.input, g.input], msg, () => {
      clearInterval(timer);
      const nn = readInt(n.input, "n", { min: 3, max: 60 });
      let gg = readInt(g.input, "g", { min: 1, max: nn - 1 });
      if (gcd(gg, nn) !== 1) throw new Error(`g musí být nesoudělné s ${nn}`);
      const els = [...Array(nn).keys()].filter(x => x >= 1 && gcd(x, nn) === 1);
      const ph = els.length, pos = new Map();
      els.forEach((v, i) => {
        const ang = (2 * Math.PI * i) / ph;
        pos.set(v, [c + Rr * Math.sin(ang), c - Rr * Math.cos(ang)]);
      });
      const powers = [];
      let p = 1;
      do { p = (p * gg) % nn; powers.push(p); } while (p !== 1 && powers.length <= ph);
      const ord = powers.length;
      svg.replaceChildren();
      svgEl("defs", {}, svg).innerHTML = `<marker id="gen-arr-${nn}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="gen-arrowhead"/></marker>`;
      const edges = svgEl("g", {}, svg);
      const nodes = new Map();
      els.forEach(v => {
        const [x, y] = pos.get(v);
        const gN = svgEl("g", { class: "gen-node" }, svg);
        svgEl("circle", { cx: x, cy: y, r: ph > 30 ? 9 : 12 }, gN);
        const t = svgEl("text", { x, y: y + 1 }, gN);
        t.textContent = v;
        nodes.set(v, gN);
      });
      const seq = [gg, ...powers.slice(1)];        // g^1, g^2, …, g^ord = 1
      let i = 0;
      const step = () => {
        if (i >= seq.length) { clearInterval(timer); return; }
        const from = i === 0 ? null : seq[i - 1], to = seq[i];
        nodes.get(to).classList.add("hit");
        if (from !== null) {
          const [x1, y1] = pos.get(from), [x2, y2] = pos.get(to);
          const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, sh = 13 / L;
          svgEl("line", { x1: x1 + dx * sh, y1: y1 + dy * sh, x2: x2 - dx * sh, y2: y2 - dy * sh,
            class: "gen-edge", "marker-end": `url(#gen-arr-${nn})` }, edges);
        }
        i++;
      };
      timer = setInterval(step, Math.max(60, 1600 / seq.length));
      step();
      const fs = factor(ph), tests = [...fs.keys()].map(q => [q, Number(powmod(BigInt(gg), BigInt(ph / q), BigInt(nn)))]);
      const isGen = ord === ph;
      info.innerHTML =
        `<div>${K(R`\mathbb{Z}_{${nn}}^* = \{${els.length > 14 ? R`${els.slice(0, 6).join(", ")}, \dots, ${els.slice(-2).join(", ")}` : els.join(", ")}\}`)}, ${K(R`\varphi(${nn}) = ${ph}`)}</div>` +
        `<div class="gen-pows">${seq.map((v, k) => K(R`${gg}^{${k + 1}} = ${v}`)).join(", ")}</div>` +
        `<div class="mc-big ${isGen ? "ok" : "bad"}">řád ${gg} = ${ord} ${isGen ? "= φ(n) → <b>je generátor</b>" : `< ${ph} → není generátor`}</div>` +
        `<div class="gen-test">Test bez vypisování mocnin (${K(R`\varphi = ${texFactors(fs)}`)}):` +
        stepList(tests.map(([q, r]) => `${K(R`${gg}^{${ph}/${q}} = ${gg}^{${ph / q}} \bmod ${nn} = ${r}`)} ${r === 1 ? "← vyšla 1 → není generátor" : "≠ 1 ✓"}`)) + `</div>`;
      const gens = els.filter(x => {
        let q = 1;
        for (let k = 1; k <= ph; k++) { q = (q * x) % nn; if (q === 1) return k === ph; }
        return false;
      });
      all.replaceChildren(h("div", { class: "widget-msg", text: gens.length
        ? `Všechny generátory (${gens.length}${isPrime(nn) ? ` = φ(φ(${nn})) = φ(${ph})` : ""}):`
        : "Tahle grupa nemá žádný generátor (není cyklická)." }),
        ...gens.map(x => { const ch = h("span", { class: `cr-chip${x === gg ? " focus" : ""}`, tabindex: "0", text: String(x) });
          ch.addEventListener("click", () => { g.input.value = x; run(); }); return ch; }));
    });
    [n, g].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ---------- testy prvočíselnosti ---------- */

  function mrSteps(N, A) {
    let r = N - 1n, s = 0;
    while (r % 2n === 0n) { r /= 2n; s++; }
    const seq = [];
    let x = powmod(A, r, N);
    seq.push(x);
    for (let i = 1; i < s; i++) { x = (x * x) % N; seq.push(x); }
    const pass = seq[0] === 1n || seq.some(v => v === N - 1n);
    return { r, s, seq, pass };
  }

  function primetest(div) {
    const kind = div.dataset.test || "fermat";
    const isLL = kind === "ll";
    const n = numField(isLL ? "p =" : "n =", div.dataset.n || (isLL ? "5" : "21"));
    const a = numField("a =", div.dataset.a || "2");
    const msg = h("div", { class: "widget-msg" });
    const out = h("div", { class: "pt-out" });
    const grid = h("div", { class: "pt-grid" });
    const allBtn = button("Vyzkoušet všechna a", () => showAll());
    div.append(h("div", { class: "widget-fields" }, n.wrap, ...(isLL ? [] : [a.wrap])), msg, out,
      ...(isLL ? [] : [h("div", { class: "widget-buttons" }, allBtn), grid]));

    function showAll() {
      const N = readBig(n.input, "n", { min: 3 });
      if (N > 3000n) { grid.textContent = "Pro přehled všech a zadej n ≤ 3000."; return; }
      const nn = Number(N), cells = [];
      let liars = 0, tested = 0;
      for (let x = 1; x < nn; x++) {
        const X = BigInt(x);
        const ok = kind === "fermat" ? powmod(X, N - 1n, N) === 1n : mrSteps(N, X).pass;
        tested++;
        if (ok) liars++;
        cells.push(`<span class="pt-cell ${ok ? "ok" : "bad"}" title="a = ${x}">${nn <= 400 ? x : ""}</span>`);
      }
      const prime = isPrime(nn);
      grid.innerHTML = `<div class="pt-cells${nn > 400 ? " tiny" : ""}">${cells.join("")}</div>` +
        `<div class="widget-msg">${prime
          ? `${nn} je prvočíslo, takže projdou všechna a.`
          : `${nn} = ${[...factor(nn)].map(([p, k]) => (k > 1 ? `${p}^${k}` : p)).join("·")} je složené, a přesto test projde u <b>${liars}</b> z ${tested} základů (zelené = „lháři").`}</div>`;
    }

    const run = guarded([n.input, a.input], msg, () => {
      grid.replaceChildren();
      if (isLL) {
        const p = readInt(n.input, "p", { min: 2, max: 1279 });
        const N = (1n << BigInt(p)) - 1n;
        const steps = [`${K(R`n = 2^{${p}} - 1 = ${short(N)}`)}, ${K(R`s = ${p}`)}`];
        if (p === 2) { out.innerHTML = stepList([...steps, "Pro s = 2 je n = 3 prvočíslo (test je pro lichá s)."]); return; }
        if (!isPrime(p)) steps.push(`<span class="ee-bad">${p} není prvočíslo, takže ${K(R`2^{${p}}-1`)} nemůže být prvočíslo.</span> Test ho přesto ukáže.`);
        let u = 4n;
        const rows = [`${K("u_0 = 4")}`];
        for (let k = 1; k <= p - 2; k++) {
          const prev = u;
          u = (u * u - 2n) % N;
          if (k <= 12 || k > p - 4) rows.push(K(R`u_{${k}} = (${short(prev, 20)}^2 - 2) \bmod ${short(N, 20)} = ${short(u, 24)}`));
          else if (k === 13) rows.push("…");
        }
        out.innerHTML = stepList([...steps, ...rows]) +
          `<div class="mc-big ${u === 0n ? "ok" : "bad"}">${K(R`u_{s-2} = u_{${p - 2}} = ${short(u, 24)}`)} → ${u === 0n ? "<b>je</b> Mersennovo prvočíslo" : "<b>není</b> prvočíslo"}</div>`;
        return;
      }
      const N = readBig(n.input, "n", { min: 3, max: "1000000000000000000000000" });
      const A = readBig(a.input, "a", { min: 1 });
      if (A >= N) throw new Error("a musí být menší než n");
      if (kind === "fermat") {
        const g = bgcd(A, N), r = powmod(A, N - 1n, N);
        const steps = [`${K(R`\mathrm{GCD}(${A}, ${N}) = ${g}`)}${g !== 1n ? " ≠ 1 → n má dělitele, je složené." : " ✓"}`,
          `${K(R`a^{n-1} \bmod n = ${A}^{${N - 1n}} \bmod ${N} = ${r}`)} (Square and Multiply)`];
        out.innerHTML = stepList(steps) + (r === 1n
          ? `<div class="mc-big ok">${K(R`${r} \equiv 1`)} → ${N} je <b>pravděpodobně</b> prvočíslo (zkus další a)</div>`
          : `<div class="mc-big bad">${K(R`${r} \not\equiv 1`)} → ${N} je <b>určitě složené</b></div>`);
      } else {
        if (N % 2n === 0n) { out.innerHTML = `<div class="mc-big bad">${N} je sudé → složené</div>`; return; }
        const { r, s, seq, pass } = mrSteps(N, A);
        const steps = [`${K(R`n - 1 = ${N - 1n} = 2^{${s}} \cdot ${r}`)} → ${K(R`s = ${s},\ r = ${r}`)}`,
          `${K(R`a^r \bmod n = ${A}^{${r}} \bmod ${N} = ${seq[0]}`)} ${seq[0] === 1n ? "≡ 1 → projde" : "≢ 1 → testuji dál"}`];
        if (seq[0] !== 1n)
          seq.forEach((v, i) => steps.push(`${K(R`i = ${i}:\ ${A}^{2^{${i}}\cdot ${r}} \bmod ${N} = ${v}`)} ${v === N - 1n ? `≡ n − 1 = ${N - 1n} → projde` : `≢ ${N - 1n}`}`));
        out.innerHTML = stepList(steps) + (pass
          ? `<div class="mc-big ok">${N} je <b>pravděpodobně</b> prvočíslo — zvol další a a opakuj</div>`
          : `<div class="mc-big bad">pro žádné i neplatí → ${N} je <b>určitě složené</b></div>`);
      }
    });
    [n, a].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ================= ASYMETRICKÁ KRYPTOGRAFIE ================= */

  /* ---------- RSA ---------- */

  function rsa(div) {
    const r = numField("r =", div.dataset.r || "11");
    const s = numField("s =", div.dataset.s || "13");
    const sk = numField("Sk =", div.dataset.sk || "7");
    const m = numField("zpráva m =", div.dataset.m || "28");
    const msg = h("div", { class: "widget-msg" });
    const flow = h("div", { class: "rsa-flow" });
    const out = h("div", { class: "rsa-out" });
    div.append(h("div", { class: "widget-fields" }, r.wrap, s.wrap, sk.wrap, m.wrap), msg, out, flow);
    const run = guarded([r.input, s.input, sk.input, m.input], msg, () => {
      const rv = readInt(r.input, "r", { min: 2, max: 1e6 }), sv = readInt(s.input, "s", { min: 2, max: 1e6 });
      if (!isPrime(rv)) throw new Error(`r = ${rv} není prvočíslo`);
      if (!isPrime(sv)) throw new Error(`s = ${sv} není prvočíslo`);
      if (rv === sv) throw new Error("r a s musí být různá");
      const n = BigInt(rv) * BigInt(sv), ph = BigInt(rv - 1) * BigInt(sv - 1);
      const Sk = readBig(sk.input, "Sk", { min: 2 });
      if (Sk >= ph) throw new Error(`Sk musí být menší než φ(n) = ${ph}`);
      const g = bgcd(Sk, ph);
      if (g !== 1n) {
        const ok = [];
        for (let x = 3n; x < ph && ok.length < 6; x += 2n) if (bgcd(x, ph) === 1n) ok.push(x);
        throw new Error(`GCD(${Sk}, ${ph}) = ${g} ≠ 1 — zvol jiný Sk, např. ${ok.join(", ")}`);
      }
      const Vk = binv(Sk, ph);
      const M = readBig(m.input, "m", { min: 0 });
      if (M >= n) throw new Error(`zpráva musí být menší než n = ${n}`);
      const C = powmod(M, Vk, n), D = powmod(C, Sk, n);
      out.innerHTML = stepList([
        `prvočísla ${K(R`r = ${rv},\ s = ${sv}`)}`,
        `modul ${K(R`n = r \cdot s = ${rv} \cdot ${sv} = ${n}`)}`,
        `${K(R`\varphi(n) = (r-1)(s-1) = ${rv - 1} \cdot ${sv - 1} = ${ph}`)}`,
        `soukromý klíč ${K(R`S_k = ${Sk}`)}, ${K(R`\mathrm{GCD}(${Sk}, ${ph}) = 1`)} ✓`,
        `veřejný klíč ${K(R`V_k = S_k^{-1} \bmod \varphi(n) = ${Sk}^{-1} \bmod ${ph} = ${Vk}`)} &nbsp;(zkouška ${K(R`${Sk}\cdot${Vk} = ${Sk * Vk} \equiv 1`)})`,
        `šifrování ${K(R`c = m^{V_k} \bmod n = ${M}^{${Vk}} \bmod ${n} = ${C}`)}`,
        `dešifrování ${K(R`m = c^{S_k} \bmod n = ${C}^{${Sk}} \bmod ${n} = ${D}`)} ${D === M ? "✓" : "✗"}`,
      ]);
      flow.innerHTML =
        `<div class="rsa-party"><div class="rsa-who">Odesílatel</div><div>zná veřejný klíč</div>` +
        `<div class="rsa-key pub">${K(R`(V_k, n) = (${Vk}, ${n})`)}</div><div>${K(R`c = ${M}^{${Vk}} \bmod ${n}`)}</div></div>` +
        `<div class="rsa-wire"><div class="rsa-c">${K(R`c = ${C}`)}</div><div class="rsa-line"></div><div class="widget-msg">veřejný kanál</div></div>` +
        `<div class="rsa-party"><div class="rsa-who">Příjemce</div><div>má soukromý klíč</div>` +
        `<div class="rsa-key priv">${K(R`S_k = ${Sk}`)}</div><div>${K(R`${C}^{${Sk}} \bmod ${n} = ${D}`)}</div></div>` +
        `<div class="rsa-secret">Tajné (nikdy nesdílet): ${K(R`S_k = ${Sk},\ \varphi(n) = ${ph},\ r = ${rv},\ s = ${sv}`)}</div>`;
    });
    [r, s, sk, m].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ---------- Diffie-Hellman (+ muž uprostřed) ---------- */

  function dh(div) {
    let mitm = "mitm" in div.dataset;
    const n = numField("n =", div.dataset.n || "23");
    const g = numField("g =", div.dataset.g || "6");
    const q = numField("q =", div.dataset.q ?? "11");
    const a = numField("a =", div.dataset.a || "7");
    const b = numField("b =", div.dataset.b || "8");
    const c = numField("c =", div.dataset.c || "4");
    const toggle = button("Útočník uprostřed", () => { mitm = !mitm; run(); });
    const msg = h("div", { class: "widget-msg" });
    const warn = h("div", { class: "widget-msg" });
    const grid = h("div", { class: "dh-grid" });
    const res = h("div", { class: "dh-res" });
    div.append(h("div", { class: "widget-fields" }, n.wrap, g.wrap, q.wrap, a.wrap, b.wrap, c.wrap, h("div", { class: "widget-buttons" }, toggle)),
      msg, warn, grid, res);
    const cell = (html, cls = "") => `<div class="dh-cell ${cls}">${html}</div>`;
    const run = guarded([n.input, g.input, q.input, a.input, b.input, c.input], msg, () => {
      toggle.classList.toggle("active", mitm);
      c.wrap.style.display = mitm ? "" : "none";
      const N = readBig(n.input, "n", { min: 5 }), G = readBig(g.input, "g", { min: 2 });
      const A_ = readBig(a.input, "a", { min: 1 }), B_ = readBig(b.input, "b", { min: 1 }), C_ = readBig(c.input, "c", { min: 1 });
      if (N > 10n ** 30n) throw new Error("n nejvýš 10³⁰");
      if (G > N - 2n) throw new Error("g musí být z rozsahu 2 … n − 2");
      const notes = [];
      if (!isPrime(Number(N)) && N < 10n ** 12n) notes.push(`${N} není prvočíslo`);
      const qs = q.input.value.trim();
      if (qs) {
        const Q = readBig(q.input, "q", { min: 2 });
        if ((N - 1n) % Q !== 0n) notes.push(`q = ${Q} nedělí n − 1 = ${N - 1n}`);
        const gq = powmod(G, Q, N);
        notes.push(gq === 1n ? `ověření: ${K(R`g^q \bmod n = ${G}^{${Q}} \bmod ${N} = 1`)} ✓ (g má řád q)` : `pozor: ${K(R`${G}^{${Q}} \bmod ${N} = ${gq} \ne 1`)}`);
        if (A_ >= Q || B_ >= Q || (mitm && C_ >= Q)) notes.push("tajná čísla mají být z rozsahu 1 … q − 1");
      }
      warn.innerHTML = notes.join(" · ");
      const A = powmod(G, A_, N), B = powmod(G, B_, N), C = powmod(G, C_, N);
      const pub = `${K(R`n = ${N},\ g = ${G}${qs ? R`,\ q = ${qs}` : ""}`)}`;
      let rows;
      if (!mitm) {
        const K1 = powmod(B, A_, N), K2 = powmod(A, B_, N);
        rows = [
          [cell("<b>Strana A</b>", "head"), cell("veřejný kanál", "head mid"), cell("<b>Strana B</b>", "head")],
          [cell(""), cell(pub, "mid pub"), cell("")],
          [cell(`tajné ${K(R`a = ${A_}`)}`, "secret"), cell("", "mid"), cell(`tajné ${K(R`b = ${B_}`)}`, "secret")],
          [cell(K(R`A = g^a \bmod n = ${G}^{${A_}} \bmod ${N} = ${A}`)), cell(`${K(R`A = ${A}`)} <span class="dh-arr">⟶</span>`, "mid pub"), cell("")],
          [cell(""), cell(`<span class="dh-arr">⟵</span> ${K(R`B = ${B}`)}`, "mid pub"), cell(K(R`B = g^b \bmod n = ${G}^{${B_}} \bmod ${N} = ${B}`))],
          [cell(K(R`K = B^a \bmod n = ${B}^{${A_}} \bmod ${N} = ${K1}`), "key"), cell("", "mid"), cell(K(R`K' = A^b \bmod n = ${A}^{${B_}} \bmod ${N} = ${K2}`), "key")],
        ];
        res.innerHTML = `<div class="mc-big ${K1 === K2 ? "ok" : "bad"}">${K(R`K = K' = ${K1}`)} — oba mají stejný klíč, a ten nikdy neletěl kanálem.</div>` +
          `<div class="widget-msg">Kdo odposlouchává, vidí jen ${K(R`n, g, A = ${A}, B = ${B}`)}. Aby zjistil a, musel by řešit ${K(R`${G}^a \equiv ${A} \pmod{${N}}`)} — diskrétní logaritmus.</div>`;
      } else {
        const K1a = powmod(C, A_, N), K1c = powmod(A, C_, N), K2b = powmod(C, B_, N), K2c = powmod(B, C_, N);
        rows = [
          [cell("<b>Strana A</b>", "head"), cell("<b>Útočník C</b>", "head mid evil"), cell("<b>Strana B</b>", "head")],
          [cell(""), cell(pub, "mid pub"), cell("")],
          [cell(`tajné ${K(R`a = ${A_}`)}`, "secret"), cell(`tajné ${K(R`c = ${C_}`)}`, "secret mid evil"), cell(`tajné ${K(R`b = ${B_}`)}`, "secret")],
          [cell(`${K(R`A = ${G}^{${A_}} \bmod ${N} = ${A}`)} <span class="dh-arr">⟶</span>`), cell(`zachytí ${K(R`A = ${A}`)}`, "mid evil"), cell("")],
          [cell(""), cell(`zachytí ${K(R`B = ${B}`)}`, "mid evil"), cell(`<span class="dh-arr">⟵</span> ${K(R`B = ${G}^{${B_}} \bmod ${N} = ${B}`)}`)],
          [cell(`přijme ${K(R`C = ${C}`)} (myslí si, že je to B)`), cell(`<span class="dh-arr">⟵</span> ${K(R`C = ${G}^{${C_}} \bmod ${N} = ${C}`)} <span class="dh-arr">⟶</span>`, "mid evil"), cell(`přijme ${K(R`C = ${C}`)} (myslí si, že je to A)`)],
          [cell(K(R`K_1 = C^a \bmod n = ${K1a}`), "key"), cell(K(R`K_1 = A^c = ${K1c},\ K_2 = B^c = ${K2c}`), "key mid evil"), cell(K(R`K_2 = C^b \bmod n = ${K2b}`), "key")],
        ];
        res.innerHTML = `<div class="mc-big bad">A má klíč ${K1a}, B má klíč ${K2b} — a útočník zná oba.</div>` +
          `<div class="widget-msg">Zprávu od A dešifruje klíčem ${K1c}, přečte (nebo změní) a zašifruje klíčem ${K2c} pro B. Nikdo nic nepozná. Obrana: podepsat DH parametry (certifikát).</div>`;
      }
      grid.innerHTML = rows.flat().join("");
    });
    [n, g, q, a, b, c].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ---------- DSA ---------- */

  function dsa(div) {
    const n = numField("n =", div.dataset.n || "23");
    const q = numField("q =", div.dataset.q || "11");
    const g = numField("g =", div.dataset.g || "4");
    const sk = numField("Sk =", div.dataset.sk || "9");
    const k = numField("k =", div.dataset.k || "4");
    const hm = numField("H(m) =", div.dataset.h || "4");
    const hv = numField("H(m) u příjemce =", div.dataset.h || "4");
    const msg = h("div", { class: "widget-msg" });
    const warn = h("div", { class: "widget-msg" });
    const out = h("div", { class: "dsa-out" });
    div.append(h("div", { class: "widget-fields" }, n.wrap, q.wrap, g.wrap, sk.wrap, k.wrap, hm.wrap), msg, warn, out,
      h("div", { class: "widget-fields dsa-ver" }, hv.wrap,
        h("span", { class: "widget-msg", text: "Změň hash u příjemce (jako by někdo upravil zprávu) a podívej se, co udělá ověření." })));
    let lastH = hm.input.value;
    const run = guarded([n.input, q.input, g.input, sk.input, k.input, hm.input, hv.input], msg, () => {
      if (hv.input.value === lastH) hv.input.value = hm.input.value;
      lastH = hm.input.value;
      const N = readBig(n.input, "n", { min: 5 }), Q = readBig(q.input, "q", { min: 2 }), G = readBig(g.input, "g", { min: 2 });
      const Sk = readBig(sk.input, "Sk", { min: 1 }), Kk = readBig(k.input, "k", { min: 2 });
      const H = readBig(hm.input, "H(m)", { min: 0 }), H2 = readBig(hv.input, "H(m) u příjemce", { min: 0 });
      const notes = [];
      if ((N - 1n) % Q !== 0n) notes.push(`q nedělí n − 1`);
      if (powmod(G, Q, N) !== 1n) notes.push(`${K(R`g^q \bmod n \ne 1`)} — g nemá řád q`);
      if (Kk >= Q) throw new Error("k musí splňovat 1 < k < q");
      if (Sk >= Q) notes.push("Sk se volí z 1 … q − 1");
      warn.innerHTML = notes.join(" · ");
      const Vk = powmod(G, Sk, N), gk = powmod(G, Kk, N), r = gk % Q;
      const kinv = binv(Kk, Q);
      if (kinv === null) throw new Error("k nemá inverzi mod q");
      const s = (kinv * (H + Sk * r)) % Q;
      const sign = [
        `veřejný klíč ${K(R`V_k = g^{S_k} \bmod n = ${G}^{${Sk}} \bmod ${N} = ${Vk}`)}`,
        `${K(R`r = (g^k \bmod n) \bmod q = (${G}^{${Kk}} \bmod ${N}) \bmod ${Q} = ${gk} \bmod ${Q} = ${r}`)}`,
        `${K(R`k^{-1} \bmod q = ${Kk}^{-1} \bmod ${Q} = ${kinv}`)}`,
        `${K(R`s = k^{-1}(H(m) + S_k r) \bmod q = ${kinv}\cdot(${H} + ${Sk}\cdot${r}) \bmod ${Q} = ${s}`)}`,
      ];
      let verify, ok = false;
      if (r === 0n || s === 0n) {
        verify = [`<span class="ee-bad">${r === 0n ? "r" : "s"} = 0 → podpis je neplatný, zvol jiné k.</span>`];
      } else {
        const w = binv(s, Q), u1 = (H2 * w) % Q, u2 = (r * w) % Q;
        const p1 = powmod(G, u1, N), p2 = powmod(Vk, u2, N), v = ((p1 * p2) % N) % Q;
        ok = v === r;
        verify = [
          `${K(R`w = s^{-1} \bmod q = ${s}^{-1} \bmod ${Q} = ${w}`)}`,
          `${K(R`u_1 = H(m)\cdot w \bmod q = ${H2}\cdot${w} \bmod ${Q} = ${u1}`)}`,
          `${K(R`u_2 = r\cdot w \bmod q = ${r}\cdot${w} \bmod ${Q} = ${u2}`)}`,
          `${K(R`v = (g^{u_1} V_k^{u_2} \bmod n) \bmod q = (${p1}\cdot${p2} \bmod ${N}) \bmod ${Q} = ${v}`)}`,
        ];
      }
      out.innerHTML =
        `<div class="dsa-cols"><div class="dsa-col"><div class="rsa-who">Podepisující (zná ${K("S_k")})</div>${stepList(sign)}` +
        `<div class="rsa-key pub">podpis ${K(R`(r, s) = (${r}, ${s})`)}</div></div>` +
        `<div class="dsa-col"><div class="rsa-who">Ověřovatel (zná ${K(R`n, q, g, V_k, m, (r, s)`)})</div>${stepList(verify)}` +
        `<div class="mc-big ${ok ? "ok" : "bad"}">${ok ? K(R`v = r = ${r}`) + " → podpis je platný" : "v ≠ r → podpis neplatí (zpráva nebo podpis byly změněny)"}</div></div></div>`;
    });
    [n, q, g, sk, k, hm, hv].forEach(f => f.input.addEventListener("input", run));
    run();
  }

  /* ---------- init ---------- */

  function init(root) {
    const once = (sel, fn) => root.querySelectorAll(sel).forEach(d => {
      if (d.dataset.ready) return;
      d.dataset.ready = "1";
      d.classList.add("widget");
      try { fn(d); } catch (e) { d.textContent = `Chyba widgetu: ${e.message}`; console.error(e); }
    });
    once(".atbash", atbash);
    once(".caesar", caesar);
    once(".caesar-brute", caesarBrute);
    once(".vigenere", vigenere);
    once(".skytale", skytale);
    once(".vernam", vernam);
    once(".freq", freq);
    once(".modclock", modclock);
    once(".phi-grid", phiGrid);
    once(".sqmul", sqmul);
    once(".mod-table", modTable);
    once(".ext-euclid", extEuclid);
    once(".reduce", reduce);
    once(".crt", crt);
    once(".generator", generator);
    once(".primetest", primetest);
    once(".rsa", rsa);
    once(".dh", dh);
    once(".dsa", dsa);
  }

  if (window.document$) document$.subscribe(() => init(document));
  else document.addEventListener("DOMContentLoaded", () => init(document));
})();
