#!/usr/bin/env python3
"""Génère une page par type d'outil : site/outils-<type>/index.html + outils-<type>.js.

Usage, depuis le dossier « jour 1 » :  python3 docs/build_outils.py && python3 docs/sync_layout.py
Source unique du contenu des fiches outils : la liste OUTILS ci-dessous.
Fiches EDR, XDR, SIEM : la liste affichée EST la liste « préconisée par l'équipe Practilio » ; elle doit rester identique
à l'objet RECO de site/shared/common.js (encarts data-reco des autres pages). Pas d'encart data-reco sur ces fiches (redite).
Le gabarit (en-tête, menu, pied de page) est repris de site/outils/index.html.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"


def a(url, txt):
    return f'<a href="{url}" target="_blank" rel="noopener">{txt}</a>'


# id, titre court (menu / liens), titre de page, à quoi ça sert, éditeurs [(lien, précision)], pour qui, conseils, reco
OUTILS = [
    ("outils-mots-de-passe", "Gestionnaire de mots de passe", "Le gestionnaire de mots de passe",
     "Un coffre chiffré qui génère et stocke un mot de passe long et unique pour chaque service, et permet de partager un accès sans dévoiler le mot de passe. C'est la parade la plus simple contre la réutilisation d'un mot de passe déjà fuité.",
     [(a("https://keepassxc.org", "KeePassXC"), "<strong>outil préconisé</strong> : logiciel libre et gratuit, coffre chiffré stocké localement, successeur maintenu de KeePassX (arrêté en 2021)"),
      (a("https://bitwarden.com", "Bitwarden"), ""), (a("https://www.dashlane.com", "Dashlane"), ""),
      (a("https://keepass.info", "KeePass"), "logiciel libre, fichier local"), (a("https://www.keepersecurity.com", "Keeper"), "")],
     "Tous les établissements, socle.",
     ["Practilio préconise un gestionnaire de mots de passe de type KeePassXC : gratuit, libre, sans compte en ligne, le coffre reste chiffré sur vos postes.",
      "Choisir une offre « entreprise » : les comptes sont rattachés à la structure et récupérables au départ d'un salarié.",
      "Protéger le coffre lui-même par une phrase de passe longue et la MFA.",
      "Remplacer les fichiers Excel et post-it de mots de passe partagés (secrétariat, comptes génériques)."], None),
    ("outils-mfa-iam-pam", "MFA, IAM et PAM", "MFA, gestion des identités (IAM) et des comptes à privilèges (PAM)",
     "La MFA (authentification multifacteur) demande une deuxième preuve en plus du mot de passe. L'IAM centralise la création, la modification et la suppression des comptes. Le PAM contrôle et trace l'usage des comptes d'administration et les accès des mainteneurs.",
     [(a("https://www.yubico.com", "Yubico"), "clés YubiKey, FIDO2"), (a("https://www.inwebo.com", "inWebo"), "MFA, éditeur français"),
      (a("https://www.microsoft.com/fr-fr/security/business/identity-access/microsoft-entra-id", "Microsoft Entra ID"), "IAM"),
      (a("https://www.okta.com", "Okta"), "IAM"), (a("https://www.sailpoint.com", "SailPoint"), "revue des droits"),
      (a("https://www.cyberark.com", "CyberArk"), "PAM"), (a("https://www.wallix.com", "Wallix"), "PAM, éditeur français")],
     "Tous pour la MFA ; IAM et PAM pour les équipes informatiques, centres de santé et cliniques.",
     ["Activer la MFA en priorité sur la messagerie, les accès distants et les comptes d'administration.",
      "Préférer une clé FIDO2 ou la carte CPS / e-CPS (Pro Santé Connect) au code par SMS.",
      "Faire une revue des comptes et des droits au moins tous les 3 mois ; fermer les comptes le jour du départ."], None),
    ("outils-sauvegarde", "Sauvegarde", "La sauvegarde",
     "Des copies régulières des données et des systèmes, dont au moins une hors ligne ou immuable, pour pouvoir redémarrer après un rançongiciel, une panne ou une erreur.",
     [(a("https://www.veeam.com/fr", "Veeam"), ""), (a("https://www.atempo.com", "Atempo"), "éditeur français"),
      (a("https://www.acronis.com/fr-fr/", "Acronis"), ""), (a("https://www.rubrik.com", "Rubrik"), "")],
     "Tous les établissements, socle.",
     ["Appliquer la règle 3-2-1 : 3 copies, 2 supports différents, 1 copie hors ligne ou immuable.",
      "Tester une restauration au moins une fois par trimestre.",
      "Séparer les comptes d'administration de la sauvegarde des comptes du réseau habituel."], None),
    ("outils-edr", "EDR", "L'EDR (Endpoint Detection and Response)",
     "Un logiciel installé sur les postes et les serveurs qui surveille leur comportement, bloque les actions malveillantes (chiffrement massif de fichiers, connexion vers un serveur de commande) et permet d'isoler un poste à distance.",
     [(a("https://harfanglab.io", "HarfangLab EDR"), "éditeur français"), (a("https://www.microsoft.com/fr-fr/security/business/endpoint-security/microsoft-defender-endpoint", "Microsoft Defender for Endpoint"), "parc sous Microsoft 365"),
      (a("https://www.crowdstrike.com/fr-fr/platform/endpoint-security/", "CrowdStrike Falcon"), ""), (a("https://www.sentinelone.com/fr/platform/singularity-endpoint/", "SentinelOne Singularity Endpoint"), "")],
     "Tous les établissements, socle. En cabinet, il est généralement géré par le prestataire informatique.",
     ["Installer l'EDR sur tous les postes et serveurs, sans exception.",
      "Savoir qui reçoit les alertes et dans quel délai elles sont traitées, y compris le week-end.",
      "Vérifier que l'isolement d'un poste à distance est possible et testé."], "edr"),
    ("outils-xdr", "XDR", "Le XDR (Extended Detection and Response)",
     "Le XDR étend la détection de l'EDR à d'autres sources : messagerie, identités, réseau, cloud. Il relie entre eux des signaux faibles (un e-mail piégé, puis une connexion inhabituelle, puis un poste qui chiffre) pour reconstituer une attaque.",
     [(a("https://www.microsoft.com/fr-fr/security/business/siem-and-xdr/microsoft-defender-xdr", "Microsoft Defender XDR"), ""),
      (a("https://www.sekoia.com/", "Sekoia Defend"), "éditeur français, XDR et SIEM"), (a("https://www.paloaltonetworks.com/cortex/cortex-xdr", "Palo Alto Networks Cortex XDR"), ""),
      (a("https://wazuh.com", "Wazuh"), "open source, demande des compétences internes")],
     "Centres de santé importants, cliniques et groupes, avec une équipe IT ou un SOC externalisé.",
     ["Commencer par un EDR bien déployé : le XDR s'appuie dessus.",
      "Prévoir qui traite les alertes : équipe IT interne ou SOC externalisé."], "xdr"),
    ("outils-mdm", "MDM", "Le MDM (gestion des appareils mobiles)",
     "Gestion centralisée des smartphones, tablettes et ordinateurs portables : chiffrement, code de verrouillage, effacement à distance en cas de perte ou de vol, contrôle des applications et des ports USB.",
     [(a("https://www.microsoft.com/fr-fr/security/business/microsoft-intune", "Microsoft Intune"), ""), (a("https://www.jamf.com", "Jamf"), "appareils Apple"), (a("https://www.ivanti.com", "Ivanti"), "")],
     "Prestataires informatiques (MSP), centres de santé et cliniques.",
     ["Inscrire tous les appareils qui accèdent aux données de santé, y compris les tablettes de consultation.",
      "Tester l'effacement à distance avant d'en avoir besoin."], None),
    ("outils-scan-vulnerabilites", "Scan de vulnérabilités", "Le scan de vulnérabilités",
     "Un outil qui inventorie les failles connues (CVE) sur les postes, les serveurs et les services exposés sur internet, et les classe par gravité pour prioriser les correctifs.",
     [(a("https://www.tenable.com", "Tenable"), "Nessus"), (a("https://www.qualys.com", "Qualys"), ""), (a("https://www.rapid7.com", "Rapid7"), ""), (a("https://www.greenbone.net", "Greenbone"), "OpenVAS, open source")],
     "Équipes informatiques et cliniques.",
     ["Scanner en priorité ce qui est exposé sur internet (VPN, pare-feu, messagerie, portails).",
      "Croiser les résultats avec les alertes du CERT-FR et du CERT Santé."], None),
    ("outils-pare-feu", "Pare-feu et segmentation", "Le pare-feu et la segmentation du réseau",
     "Le pare-feu filtre les flux entre internet et le réseau interne, et entre les zones du réseau. La segmentation sépare ces zones (Wi-Fi patients, postes administratifs, équipements biomédicaux, administration) pour qu'une attaque ne se propage pas partout.",
     [(a("https://www.stormshield.com", "Stormshield"), "éditeur français"), (a("https://www.fortinet.com", "Fortinet"), ""), (a("https://www.paloaltonetworks.com", "Palo Alto Networks"), ""),
      (a("https://www.checkpoint.com", "Check Point"), ""), (a("https://www.cisco.com", "Cisco"), "")],
     "Prestataires informatiques (MSP), centres de santé et cliniques.",
     ["Séparer le Wi-Fi patients du réseau de l'établissement.",
      "Fermer par défaut les accès entrants ; tenir un registre des accès de maintenance (qui, vers quoi, jusqu'à quand).",
      "Mettre à jour en priorité le pare-feu et le VPN : ils sont exposés sur internet."], None),
    ("outils-sase", "SASE / Zero Trust", "SASE et Zero Trust",
     "Un accès distant sécurisé sans VPN classique : chaque accès est authentifié et autorisé (« ne jamais faire confiance, toujours vérifier »), avec une passerelle web et un accès ZTNA fournis depuis le cloud. Utile pour les praticiens hors site et les mainteneurs.",
     [(a("https://www.zscaler.com", "Zscaler"), ""), (a("https://www.netskope.com", "Netskope"), ""), (a("https://www.cloudflare.com", "Cloudflare"), ""), ("Palo Alto Networks", "Prisma Access")],
     "Cliniques et groupes.",
     ["Commencer par les accès des prestataires et mainteneurs, souvent les moins contrôlés."], None),
    ("outils-siem", "SIEM / SOAR / SOC", "SIEM, SOAR et SOC",
     "Le SIEM collecte et corrèle les journaux (postes, serveurs, pare-feu, comptes) pour détecter les incidents. Le SOAR automatise une partie de la réponse. Le SOC est l'équipe qui exploite ces outils 24 h/24, en interne ou chez un prestataire.",
     [(a("https://www.microsoft.com/fr-fr/security/business/siem-and-xdr/microsoft-sentinel", "Microsoft Sentinel"), "cloud Microsoft"), (a("https://www.sekoia.com/", "Sekoia Defend"), "éditeur français, SIEM et XDR"),
      (a("https://www.splunk.com/en_us/products/enterprise-security.html", "Splunk Enterprise Security"), "Cisco"), (a("https://www.elastic.co/security", "Elastic Security"), ""),
      (a("https://wazuh.com", "Wazuh"), "open source, demande des compétences internes")],
     "Cliniques et groupes, le plus souvent via un prestataire de SOC (MSSP).",
     ["Un SIEM sans équipe pour traiter les alertes ne protège pas : prévoir le SOC avant l'outil.",
      "Privilégier un prestataire qualifié PDIS (détection des incidents) par l'ANSSI."], "siem"),
    ("outils-donnees", "Sécurité de la donnée", "La sécurité de la donnée",
     "Classification des données, chiffrement, prévention des fuites (DLP) et détection des accès anormaux aux fichiers, par exemple un compte qui ouvre en une heure des milliers de dossiers.",
     [(a("https://www.varonis.com", "Varonis"), ""), (a("https://www.thalesgroup.com/fr/marches/securite-numerique-et-cybersecurite", "Thales"), "chiffrement"), ("Microsoft Purview", "")],
     "Cliniques et groupes.",
     ["Savoir d'abord où sont les données de santé (serveurs de fichiers, exports, messageries)."], None),
    ("outils-grc", "GRC", "La GRC (gouvernance, risque, conformité)",
     "Des outils de pilotage de la sécurité : analyse de risques (méthode EBIOS Risk Manager de l'ANSSI), suivi de la conformité (RGPD, NIS 2, ReCyF, ISO 27001), gestion des prestataires et fournisseurs.",
     [(a("https://www.egerie.eu", "EGERIE"), "éditeur français"), (a("https://www.onetrust.com", "OneTrust"), "aussi registre RGPD"), (a("https://www.servicenow.com", "ServiceNow"), "")],
     "Cliniques et groupes.",
     ["Pour une petite structure, un tableur tenu à jour suffit souvent au début."], None),
    ("outils-ot-sante", "Sécurité OT santé", "La sécurité OT santé (biomédical et GTB)",
     "Découverte passive des équipements biomédicaux et de la gestion technique des bâtiments (GTB), détection des comportements anormaux sur les protocoles industriels et médicaux (DICOM, HL7, BACnet, Modbus), aide à la segmentation. Ces outils écoutent le réseau sans perturber les équipements.",
     [(a("https://claroty.com", "Claroty"), "ex-Medigate"), (a("https://www.armis.com", "Armis"), ""), (a("https://www.nozominetworks.com", "Nozomi Networks"), ""),
      (a("https://www.forescout.com", "Forescout"), ""), (a("https://asimily.com", "Asimily"), "")],
     "Cliniques.",
     ["Commencer par l'inventaire : quels équipements, quel système, qui les maintient et comment ils sont reliés."], None),
    ("outils-cti", "CTI", "La CTI (renseignement sur la menace)",
     "Des flux d'informations sur les attaques en cours : indicateurs de compromission, suivi des groupes de rançongiciels et des fuites de données.",
     [(a("https://www.sekoia.com/", "Sekoia"), ""), (a("https://www.recordedfuture.com", "Recorded Future"), ""), (a("https://filigran.io", "Filigran"), "OpenCTI, open source"),
      (a("https://cloud.google.com/security/products/threat-intelligence", "Google Threat Intelligence"), "Mandiant")],
     "Cliniques et prestataires.",
     ["Gratuit et suffisant pour la plupart des structures : les alertes du CERT-FR et du " + a("https://cyberveille.esante.gouv.fr/", "CERT Santé") + "."], None),
    ("outils-messagerie-sante", "Messagerie sécurisée de santé", "La messagerie sécurisée de santé",
     "Un espace de confiance pour échanger des données de santé entre professionnels, au lieu d'une messagerie grand public.",
     [(a("https://mssante.fr", "MSSanté"), "espace de confiance national, plusieurs opérateurs de messagerie")],
     "Tous les établissements, socle.",
     ["Échanger avec les patients par l'Espace Patient Practilio plutôt que par e-mail."], None),
    ("outils-cloud", "CSPM / CNAPP", "La sécurité du cloud (CSPM et CNAPP)",
     "Pour les services hébergés dans le cloud. Le CSPM (Cloud Security Posture Management) détecte les erreurs de configuration, par exemple un espace de stockage ouvert à tous. Le CNAPP (Cloud-Native Application Protection Platform) regroupe le CSPM et la protection des applications et des serveurs cloud.",
     [(a("https://www.microsoft.com/fr-fr/security/business/cloud-security/microsoft-defender-cloud", "Microsoft Defender for Cloud"), ""),
      (a("https://www.wiz.io", "Wiz"), ""), (a("https://orca.security/", "Orca Security"), ""),
      (a("https://www.paloaltonetworks.com/cortex/cloud", "Palo Alto Networks Cortex Cloud"), ""), (a("https://www.checkpoint.com/cloudguard/", "Check Point CloudGuard"), "")],
     "Groupes et établissements qui hébergent eux-mêmes des services dans le cloud. Les données hébergées par Practilio sont couvertes par son hébergeur certifié HDS.",
     ["Toute donnée de santé hébergée dans le cloud doit l'être chez un hébergeur certifié HDS.",
      "Faire vérifier régulièrement qu'aucun espace de stockage n'est ouvert sur internet."], None),
]

tpl = (SITE / "outils" / "index.html").read_text(encoding="utf-8")
head_end = tpl.index("<main")
foot_start = tpl.index("</main>") + len("</main>")
scripts = tpl.index('<script src="outils.js">')

for i, (pid, court, titre, quoi, editeurs, pourqui, conseils, reco) in enumerate(OUTILS):
    prev = OUTILS[i - 1] if i > 0 else None
    nxt = OUTILS[i + 1] if i < len(OUTILS) - 1 else None
    eds = "".join(f"<li>{e}" + (f' <span class="muted">({p})</span>' if p else "") + "</li>" for e, p in editeurs)
    cons = "".join(f"<li>{c}</li>" for c in conseils)
    body = f"""<main class="wrap gutter">
<section class="view" id="v-{pid}" data-no-tuto>
  <p class="eyebrow"><a href="../outils/index.html">Outils</a> · fiche {i + 1} / {len(OUTILS)}</p>
  <h1>{titre}</h1>
  <p class="lead">{quoi}</p>
  <div class="grid">
    <div class="card"><h3>Pour qui</h3><p>{pourqui}</p></div>
    <div class="card"><h3>Par où commencer</h3><ul>{cons}</ul></div>
  </div>
  <h2>{"Outils préconisés par l'équipe Practilio" if reco else "Exemples d'éditeurs et de produits"}</h2>
  <ul>{eds}</ul>
  <nav class="lesson-nav" aria-label="Fiches outils">{f'<a href="../{prev[0]}/index.html">← {prev[1]}</a>' if prev else '<a href="../outils/index.html">← Tous les outils</a>'}{f'<a class="next" href="../{nxt[0]}/index.html">{nxt[1]} →</a>' if nxt else '<a class="next" href="../outils/index.html">Tous les outils →</a>'}</nav>
</section>
</main>"""
    html = tpl[:head_end] + body + tpl[foot_start:scripts] + f'<script src="{pid}.js"></script>' + tpl[scripts + len('<script src="outils.js"></script>'):]
    html = re.sub(r"<title>.*?</title>", f"<title>{court} · Practilio Cyber Repères</title>", html)
    html = html.replace('<body data-page="outils">', f'<body data-page="{pid}" data-nav="outils">')
    d = SITE / pid
    d.mkdir(exist_ok=True)
    (d / "index.html").write_text(html, encoding="utf-8")
    (d / f"{pid}.js").write_text(f"/* {court} : page générée par docs/build_outils.py ; pas de logique propre. */\n", encoding="utf-8")
print(f"{len(OUTILS)} fiches outils générées.")
