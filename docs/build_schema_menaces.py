#!/usr/bin/env python3
"""Génère le schéma « Qui vise quoi, et comment ? » (sources d'attaque → objectif/méthode → actifs)
et l'insère dans site/notions/index.html entre <!-- SCHEMA:MENACES --> et <!-- /SCHEMA:MENACES -->.

Usage, depuis le dossier « jour 1 » :  python3 docs/build_schema_menaces.py
Modifier SOURCES, ACTIFS et FLECHES ci-dessous. Dans les noms, « \\n » force un retour à la ligne.
Ordre des flèches : les ranger de façon que les sources et les actifs se suivent de haut en bas (pas de croisement).
"""
import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / "site" / "notions" / "index.html"

# Sources d'attaque : identifiant -> (nom affiché, description du « ? »)
SOURCES = {
    "sk": ("Script kiddies", "Utilisent des outils ou scripts d'attaque déjà développés par d'autres, sans nécessairement en comprendre le fonctionnement. Faible niveau de compétence propre, mais dégâts réels du fait des outils prêts à l'emploi."),
    "hack": ("Hacktivistes", "Agissent pour défendre une cause ou faire passer un message. Exemple : le collectif Anonymous."),
    "ins": ("Insiders", "Personnes présentes au sein même de la structure : salariés, prestataires, remplaçants."),
    "cyber": ("Cybercriminels", "Agissent seuls ou en groupes organisés à des fins lucratives : rançongiciels, vol et revente de données, fraude, extorsion."),
    "aff": ("Affiliés", "Utilisent des outils de « cybercriminalité as a service » développés par des tiers (par exemple un Ransomware-as-a-Service), en échange d'une commission."),
    "apt": ("APT", "Advanced Persistent Threat : groupes de menace structurés et soutenus par des États, qui mènent des campagnes d'attaque prolongées et discrètes."),
    "conc": ("Entreprises\nconcurrentes", "Entreprises qui cherchent à obtenir les informations commerciales ou stratégiques d'un concurrent."),
}
# Actifs visés : identifiant -> nom affiché
ACTIFS = {
    "site": "Site web et\nservices exposés",
    "donnees": "Données des patients",
    "soins": "Continuité des soins",
    "systemes": "Systèmes et\néquipements critiques",
    "strat": "Informations\nstratégiques",
}
# Flèches : (source, actif, objectif / motivation, méthode)
FLECHES = [
    ("sk", "site", "curiosité et/ou recherche de notoriété", "outils d'attaque prêts à l'emploi, failles connues"),
    ("hack", "site", "défense d'une cause, indépendance, propagande", "déni de service (DDoS), défiguration du site"),
    ("ins", "donnees", "vengeance, appât du gain, idéologie", "abus de leurs accès légitimes, copie de données"),
    ("cyber", "donnees", "gain financier", "vol et revente de données, extorsion"),
    ("cyber", "soins", "gain financier", "rançongiciel, hameçonnage"),
    ("aff", "soins", "gain financier", "rançongiciel loué « as a service » (RaaS)"),
    ("apt", "systemes", "indépendance stratégique, propagande, espionnage", "intrusion discrète et prolongée, hameçonnage ciblé"),
    ("conc", "strat", "espionnage industriel ou économique", "complicité interne, hameçonnage ciblé"),
]

TOP, LANE = 70, 88
W = 1000
LX0, LX1 = 10, 240      # colonne des sources
CX0, CX1 = 300, 720     # colonne objectif / méthode
RX0, RX1 = 780, 990     # colonne des actifs
lane_y = [TOP + 40 + i * LANE for i in range(len(FLECHES))]
H = lane_y[-1] + 60


def mid(key, idx):
    ys = [lane_y[i] for i, f in enumerate(FLECHES) if f[idx] == key]
    return sum(ys) / len(ys)


def label(x, y, text, cls):
    lines = text.split("\n")
    y0 = y + 5 - (len(lines) - 1) * 9
    spans = "".join(f'<tspan x="{x}" y="{y0 + k * 18}">{html.escape(t)}</tspan>' for k, t in enumerate(lines))
    return f'<text class="{cls}">{spans}</text>'


out = [f'<svg class="threat-map" viewBox="0 0 {W} {H}" role="img" aria-labelledby="tm-title tm-desc">',
       '<title id="tm-title">Des sources d\'attaque aux actifs visés</title>',
       '<desc id="tm-desc">Schéma : à gauche les menaces (sources d\'attaque), à droite les actifs visés ; chaque flèche indique au centre l\'objectif et la méthode. Le même contenu est disponible sous forme de tableau sous le schéma.</desc>',
       '<defs><marker id="tm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="tm-head"/></marker></defs>',
       f'<text x="{(LX0 + LX1) / 2}" y="30" class="tm-col">MENACES (SOURCES D\'ATTAQUE)</text>',
       f'<text x="{(CX0 + CX1) / 2}" y="30" class="tm-col">OBJECTIF ET MÉTHODE</text>',
       f'<text x="{(RX0 + RX1) / 2}" y="30" class="tm-col">ACTIFS VISÉS</text>']
for i, (s, a, obj, met) in enumerate(FLECHES):
    y, ys, ya = lane_y[i], mid(s, 0), mid(a, 1)
    out.append(f'<path d="M{LX1} {ys} C{LX1 + 40} {ys} {CX0 - 40} {y} {CX0} {y}" class="tm-line"/>')
    out.append(f'<path d="M{CX1} {y} C{CX1 + 40} {y} {RX0 - 40} {ya} {RX0 - 2} {ya}" class="tm-line" marker-end="url(#tm-arrow)"/>')
    out.append(f'<rect x="{CX0}" y="{y - 32}" width="{CX1 - CX0}" height="64" rx="8" class="tm-label"/>')
    out.append(f'<text x="{CX0 + 14}" y="{y - 6}" class="tm-txt"><tspan class="tm-k">Objectif :</tspan> {html.escape(obj)}</text>')
    out.append(f'<text x="{CX0 + 14}" y="{y + 17}" class="tm-txt"><tspan class="tm-k">Méthode :</tspan> {html.escape(met)}</text>')
for key, (name, desc) in SOURCES.items():
    y = mid(key, 0)
    out.append(f'<rect x="{LX0}" y="{y - 28}" width="{LX1 - LX0}" height="56" rx="10" class="tm-threat"/>')
    out.append(label((LX0 + LX1) / 2 - 12, y, name, "tm-name"))
    plain = name.replace("\n", " ")
    out.append(f'<g class="tm-help" tabindex="0" role="button" aria-label="Description : {html.escape(plain)}" data-desc="{html.escape(desc)}">'
               f'<circle cx="{LX1 - 22}" cy="{y}" r="11"/><text x="{LX1 - 22}" y="{y + 5}">?</text></g>')
for key, name in ACTIFS.items():
    out.append(f'<rect x="{RX0}" y="{mid(key, 1) - 28}" width="{RX1 - RX0}" height="56" rx="10" class="tm-asset"/>')
    out.append(label((RX0 + RX1) / 2, mid(key, 1), name, "tm-name"))
out.append("</svg>")

rows = "".join(
    f'<tr><td><strong>{html.escape(SOURCES[s][0].replace(chr(10), " "))}</strong></td><td>{html.escape(SOURCES[s][1])}</td>'
    f'<td>{html.escape(o[0].upper() + o[1:])}</td><td>{html.escape(m[0].upper() + m[1:])}</td><td>{html.escape(ACTIFS[a].replace(chr(10), " "))}</td></tr>'
    for s, a, o, m in FLECHES)

block = f'''<!-- SCHEMA:MENACES (généré par docs/build_schema_menaces.py, ne pas modifier ici) -->
  <figure class="diagram">
    <div class="diagram-scroll">
{chr(10).join(out)}
    </div>
    <figcaption>Lecture : une menace, ou source d'attaque (à gauche), poursuit un objectif par une méthode (au centre) pour atteindre un actif (à droite). Survolez ou touchez « ? » pour la description de chaque menace.</figcaption>
  </figure>
  <details class="diagram-table"><summary>Afficher le schéma sous forme de tableau</summary>
  <div class="tablebox"><table><thead><tr><th>Menace (source d'attaque)</th><th>Description</th><th>Objectif / motivation</th><th>Méthode</th><th>Actif visé</th></tr></thead><tbody>{rows}</tbody></table></div>
  </details>
  <!-- /SCHEMA:MENACES -->'''

page = PAGE.read_text(encoding="utf-8")
new, n = re.subn(r"<!-- SCHEMA:MENACES.*?<!-- /SCHEMA:MENACES -->", lambda m: block, page, flags=re.S)
if n != 1:
    raise SystemExit("Marqueurs SCHEMA:MENACES introuvables dans site/notions/index.html")
PAGE.write_text(new, encoding="utf-8")
print(f"Schéma généré : {len(SOURCES)} sources d'attaque, {len(ACTIFS)} actifs, {len(FLECHES)} flèches.")
