#!/usr/bin/env python3
"""Recopie l'en-tête (bandeau fictif, menu) et le pied de page de docs/layout.html dans toutes les pages du site.

Usage, depuis le dossier « jour 1 » :  python3 docs/sync_layout.py
Les pages contiennent des marqueurs <!-- LAYOUT:HEADER … --> … <!-- /LAYOUT:HEADER --> (idem FOOTER) :
seul le contenu entre ces marqueurs est remplacé.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
layout = (ROOT / "docs" / "layout.html").read_text(encoding="utf-8")

def block(name, text):
    m = re.search(rf"<!-- {name}[^>]*-->\n(.*?)\n<!-- /{name} -->", text, re.S)
    if not m:
        sys.exit(f"Marqueur {name} introuvable")
    return m

pages = sorted(ROOT.glob("site/*/index.html"))
for page in pages:
    html = page.read_text(encoding="utf-8")
    for name in ("LAYOUT:HEADER", "LAYOUT:FOOTER"):
        m = block(name, html)
        html = html[:m.start(1)] + block(name, layout).group(1) + html[m.end(1):]
    page.write_text(html, encoding="utf-8")
print(f"{len(pages)} pages synchronisées.")
