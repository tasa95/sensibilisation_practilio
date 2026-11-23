#!/usr/bin/env python3
"""Convertit docs/dialogues.md en site/shared/dialogues.js (window.TUTO).

Usage, depuis le dossier « jour 1 » :  python3 docs/build_dialogues.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "dialogues.md"
OUT = ROOT / "site" / "shared" / "dialogues.js"
PAGES = {"accueil", "pourquoi", "notions", "menaces", "contextes", "practilio", "sensibilisation", "ia",
         "reglementation", "attaque_ransomware", "assurance", "acteurs", "prestataires", "outils", "sources"}

HEAD = re.compile(r"^##\s+\d+\.\s+([a-z_-]+)\s*\|\s*(.+?)\s*$")
STEP = re.compile(r"^###\s+(\d+)\s*\|\s*(.+?)\s*$")
LINE = re.compile(r"^-\s+\*\*(Professeur|Camille)\*\*\s*:\s*(.+?)\s*$")
WHO = {"Professeur": "p", "Camille": "e"}

lessons, dialogues, titles, current, step, errors = [], {}, {}, None, "1", []
for n, raw in enumerate(SRC.read_text(encoding="utf-8").splitlines(), 1):
    if m := HEAD.match(raw):
        page, title = m.groups()
        if page not in PAGES:
            errors.append(f"ligne {n} : page inconnue « {page} »")
        if page in dialogues:
            errors.append(f"ligne {n} : page « {page} » en double")
        lessons.append([page, title])
        dialogues[page] = {}
        titles[page] = {}
        current, step = page, "1"
    elif (m := STEP.match(raw)) and current:
        step = m.group(1)
        titles[current][step] = m.group(2)
    elif (m := LINE.match(raw)) and current:
        dialogues[current].setdefault(step, []).append([WHO[m.group(1)], m.group(2)])
    elif raw.startswith("- **") and current:
        errors.append(f"ligne {n} : réplique mal formée (attendu « - **Professeur** : … » ou « - **Camille** : … »)")

for page, lines in dialogues.items():
    if not lines:
        errors.append(f"leçon « {page} » sans réplique")

if errors:
    print("Erreurs dans dialogues.md :\n  " + "\n  ".join(errors), file=sys.stderr)
    sys.exit(1)

OUT.write_text(
    "/* Fichier généré par docs/build_dialogues.py à partir de docs/dialogues.md : ne pas modifier à la main. */\n"
    "window.TUTO = " + json.dumps({"lessons": lessons, "dialogues": dialogues, "stepTitles": titles}, ensure_ascii=False, indent=1) + ";\n",
    encoding="utf-8")
print(f"{OUT.relative_to(ROOT)} : {len(lessons)} leçons, {sum(len(l) for d in dialogues.values() for l in d.values())} répliques.")
