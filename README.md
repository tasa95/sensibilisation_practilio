# sensibilisation_practilio

**Practilio Cyber Repères** : plateforme de sensibilisation et d'orientation cyber pour les utilisateurs de Practilio, éditeur **fictif** de logiciel de santé.

> Projet pédagogique EPITA (ECSI3-Evaluation-01). Practilio est une entreprise fictive : ce site n'est pas un service réel et ne s'adresse à aucun professionnel de santé réel. Les organismes, textes, prestataires et éditeurs cités existent et ont été vérifiés le 23/11/2026.

Site publié : https://tasa95.github.io/sensibilisation_practilio/

## Contenu

- `site/` : le site statique, un dossier par page (`<page>/index.html` + `<page>.js`), ressources communes dans `site/shared/`.
- `docs/` : sources et scripts de génération.
  - `dialogues.md` → `python3 docs/build_dialogues.py` : dialogues BD du mode tutoriel.
  - `layout.html` → `python3 docs/sync_layout.py` : en-tête, menu et pied de page de toutes les pages.
  - `build_outils.py` : fiches outils `site/outils-*/`.
  - `build_schema_menaces.py` : schéma des sources d'attaque.
  - `parcours-utilisateur.md`, `carte-du-site.puml` / `.png` : parcours et carte du site.
- `.github/workflows/pages.yml` : publication automatique de `site/` sur GitHub Pages à chaque push sur `main`.

## Consulter en local

Ouvrir `site/accueil/index.html` dans un navigateur.
