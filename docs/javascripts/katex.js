const KATEX_OPTS = {
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true },
  ],
  ignoredClasses: ["katex"],
  throwOnError: false,
};

const renderMath = (el) => renderMathInElement(el, KATEX_OPTS);

document$.subscribe(({ body }) => renderMath(body));

// Obsah vkládaný dodatečně (náhled odkazu po najetí myší, výsledky hledání)
// projde vykreslením také — jinak by v něm zůstal syrový LaTeX.
const mathObserver = new MutationObserver((mutations) => {
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (node.nodeType !== 1 || node.closest(".katex")) continue;
      if (node.closest(".md-tooltip2, .md-search-result")) renderMath(node);
    }
  }
});
mathObserver.observe(document.body, { childList: true, subtree: true });
