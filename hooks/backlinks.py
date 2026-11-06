"""Wiki-style "Odkazuje sem" (backlinks) appended to every page.

Before the build, scans all Markdown sources for relative links to other
pages and appends a list of linking pages to the bottom of each target.
"""

import posixpath
import re

LINK_RE = re.compile(r"\]\(([^)\s#]+\.md)(?:#[^)\s]*)?(?:\s+\"[^\"]*\")?\)")
HEADING_RE = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)

_backlinks: dict[str, dict[str, str]] = {}


def _title(text: str, fallback: str) -> str:
    m = HEADING_RE.search(text)
    return m.group(1) if m else fallback


def on_files(files, config):
    _backlinks.clear()
    pages = {f.src_uri: f for f in files.documentation_pages()}
    for src, f in pages.items():
        with open(f.abs_src_path, encoding="utf-8") as fh:
            text = fh.read()
        title = _title(text, src)
        for m in LINK_RE.finditer(text):
            target = posixpath.normpath(posixpath.join(posixpath.dirname(src), m.group(1)))
            if target in pages and target != src:
                _backlinks.setdefault(target, {})[src] = title
    return files


def on_page_markdown(markdown, page, config, files):
    refs = _backlinks.get(page.file.src_uri)
    if not refs:
        return markdown
    here = posixpath.dirname(page.file.src_uri)
    links = " · ".join(
        f"[{title}]({posixpath.relpath(src, here or '.')})"
        for src, title in sorted(refs.items(), key=lambda kv: kv[1].casefold())
    )
    return f'{markdown}\n\n<div class="backlinks" markdown>\n**Odkazuje sem:** {links}\n</div>\n'
