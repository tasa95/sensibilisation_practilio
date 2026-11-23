# Dialogues du mode tutoriel : Professeur Cyber et Camille

Ce fichier est la **source unique** des dialogues BD affichés en tête de chaque page du site.
Après modification, régénérer le fichier du site puis republier :

```bash
python3 docs/build_dialogues.py      # depuis le dossier « jour 1 » : écrit site/shared/dialogues.js
```

## Règles d'écriture

- Une section par leçon, dans l'ordre du parcours : `## <numéro>. <identifiant de page> | <titre de la leçon>`.
  L'identifiant doit correspondre à une page du site (`accueil`, `pourquoi`, `notions`, `menaces`, `contextes`, `practilio`, `sensibilisation`, `ia`, `reglementation`, `attaque_ransomware`, `incident`, `assurance`, `acteurs`, `prestataires`, `outils`, `sources`).
  Changer l'ordre des sections change l'ordre des leçons et la navigation « leçon suivante ».
- Une réplique par ligne : `- **Professeur** : texte` ou `- **Camille** : texte`.
- **Une BD par étape** (pages découpées en `<div class="step">`) : sous-section `### <numéro d'étape> | <titre>` dans la leçon. Les répliques placées avant toute sous-section vont à l'étape 1. Les étapes sans sous-section n'ont pas de BD.
- 3 à 6 répliques par leçon ; la première bulle est visible d'emblée, les suivantes apparaissent au clic.
- Tutoiement entre les personnages. Phrases courtes. Une image concrète par leçon.
- **Uniquement des faits déjà vérifiés et présents sur la page** (le sujet sanctionne les références inventées).
- Le texte est inséré tel quel dans le HTML : pas de balises sauf `<strong>` ou `<em>` si nécessaire.

---

## 1. pourquoi | Pourquoi Practilio vous sensibilise

- **Camille** : Professeur, pourquoi un éditeur de logiciel comme Practilio s'occupe-t-il de la sécurité de ses clients ? Ses serveurs sont certifiés HDS, non ?
- **Professeur** : Les serveurs sont protégés, oui. Mais imagine un cabinet dont le mot de passe est « Cabinet2024 », partagé par toute l'équipe. L'attaquant n'a pas besoin de forcer le centre de données : il entre par la porte du cabinet.
- **Camille** : Donc le maillon faible, c'est l'utilisateur ?
- **Professeur** : Je préfère dire « le maillon humain » : erreurs, ingénierie sociale, manque d'information. Ce n'est pas une faute, c'est un sujet de formation.
- **Camille** : Alors qui protège quoi ?
- **Professeur** : Practilio protège son hébergement certifié HDS et surveille les failles de ses logiciels : il les corrige, les déclare et te prévient. Toi, tu protèges tes ordinateurs, tes comptes, tes équipes et les données que tu sors de la plateforme.
- **Camille** : Donc c'est un travail d'équipe.
- **Professeur** : Exactement. Une sécurité partagée. On commence le parcours ?

## 2. notions | Les notions clés

### 1 | Qu'est-ce qu'un actif ?

- **Camille** : Professeur, on parle tout le temps de « protéger les actifs ». C'est quoi, un actif ?
- **Professeur** : Tout ce qui a de la valeur pour ta structure et mérite d'être protégé. Les dossiers des patients, bien sûr, mais aussi l'agenda, les ordinateurs, les logiciels, et même les personnes qui font tourner tout ça.
- **Camille** : Tout n'a pas la même valeur, quand même ?
- **Professeur** : Non. Certains actifs sont essentiels : si on les perd, l'activité s'arrête ou la confiance des patients est trahie. On commence toujours par eux.
- **Camille** : Et un ordinateur, c'est un actif essentiel ?
- **Professeur** : Pas en lui-même. C'est un support : il porte l'actif précieux, les données. On le protège pour ce qu'il contient.

### 2 | Les actifs selon votre contexte

- **Camille** : Un cabinet et une clinique protègent-ils les mêmes choses ?
- **Professeur** : L'actif est le même : les données des patients. Sa mission principale est d'assurer la continuité des soins. Ce sont les supports qui changent.
- **Camille** : Et à la clinique ?
- **Professeur** : S'ajoutent les équipements qui soignent : pousse-seringues, imagerie, centrale de fluides médicaux. Là, l'actif touché peut être le patient lui-même.

### 3 | Menace, vulnérabilité, risque

- **Camille** : Menace, vulnérabilité, risque… pour moi, c'est la même chose.
- **Professeur** : Prenons une image. Ta porte d'entrée mal fermée : c'est la vulnérabilité. Le cambrioleur du quartier : la menace. Le cambriolage qui se produit : l'attaque. Et ce qu'il y a derrière la porte : l'actif.
- **Camille** : Et le risque ?
- **Professeur** : C'est la combinaison de deux questions : quelle est la probabilité que ça arrive (la vraisemblance), et quels dégâts si ça arrive (l'impact). C'est l'objet de l'étape suivante.
- **Camille** : Et comment on réduit le risque ?
- **Professeur** : En réduisant la surface d'attaque, c'est-à-dire tous les points par lesquels un attaquant peut entrer. Imagine un sas avec digicode devant ta porte mal fermée : beaucoup moins de monde peut l'atteindre.
- **Camille** : Et en informatique, c'est quoi, le sas ?
- **Professeur** : Fermer les accès inutiles, supprimer les comptes qui ne servent plus, activer l'authentification multi-facteur. Moins de portes ouvertes, moins de risque.

### 4 | Les principaux chemins d'attaque

- **Camille** : Un cabinet et une clinique subissent-ils des attaques différentes ?
- **Professeur** : Non. Les chemins d'attaque sont les mêmes partout : hameçonnage, mot de passe volé, appareil compromis, shadow IT, accès jamais retirés. Ce qui change, c'est l'ampleur des dégâts.
- **Camille** : C'est quoi, exactement, un chemin d'attaque ?
- **Professeur** : Le trajet de l'attaquant, de la porte d'entrée jusqu'à l'actif qu'il vise. Si tu coupes une seule étape, il ne passe plus.
- **Camille** : Et le shadow IT, c'est un chemin ?
- **Professeur** : Oui : un logiciel installé sans l'accord ni la supervision d'un référent cyber, c'est une porte que personne ne surveille.

### 6 | Exemples de chemins d'attaque par source d'attaque

- **Camille** : Parmi toutes ces sources d'attaque, lesquelles me concernent vraiment ?
- **Professeur** : Quelle que soit ta structure, surtout quatre : les script kiddies, les insiders, les affiliés et les cybercriminels. Voici un exemple de chemin d'attaque pour chacune.
- **Camille** : Même les script kiddies ? Ils ne me connaissent pas !
- **Professeur** : Justement : leurs outils scannent Internet au hasard. Une box ou un logiciel mal configuré suffit pour qu'ils tombent sur toi.
- **Camille** : Mais ils ne sont pas très compétents, si ?
- **Professeur** : De moins en moins besoin de l'être : ils s'aident de plus en plus de l'intelligence artificielle pour écrire leurs scripts d'attaque ou des e-mails piégés sans fautes. L'IA rend leurs attaques plus faciles et plus crédibles.
- **Camille** : Et les insiders sont-ils forcément compromis ?
- **Professeur** : Non. Le plus souvent, c'est une erreur ou un accès jamais retiré. D'où l'importance de fermer les comptes au départ de chacun.

### 9 | Continuité d'activité

- **Camille** : Je suis référente informatique du centre. On a déjà des sauvegardes : pourquoi faudrait-il en plus un PCA et un PRA ?
- **Professeur** : Parce qu'une sauvegarde ne dit pas quoi faire le jour de la panne. Le PCA, le plan de continuité d'activité, organise la poursuite des soins pendant l'arrêt : agenda papier, liste des patients du jour imprimée la veille, qui fait quoi.
- **Camille** : Et le PRA ?
- **Professeur** : Le plan de reprise d'activité décrit comment remettre le système en route : dans quel ordre restaurer, à partir de quelles sauvegardes saines, et en combien de temps.
- **Camille** : En combien de temps, justement ?
- **Professeur** : Fixe-le avec la direction : la durée d'interruption acceptable et la quantité de données qu'on accepte de perdre. Ces deux objectifs décident de la fréquence des sauvegardes et des moyens à prévoir.
- **Camille** : Et comment savoir si notre plan fonctionne ?
- **Professeur** : En le testant. Restaure une sauvegarde au moins une fois par trimestre et organise un exercice de crise par an. Repère aussi les SPOF (Single Point of Failure) : un seul poste pour la télétransmission, et c'est tout le cabinet qui s'arrête.

## 3. menaces | Les attaques

### 1 | Le rançongiciel

- **Camille** : Quelle est l'attaque la plus grave pour un hôpital aujourd'hui ?
- **Professeur** : Le rançongiciel. Corbeil-Essonnes en 2022, Armentières et Cannes en 2024 : déprogrammations, retour au papier, données publiées.
- **Camille** : Et comment entre-t-il ?
- **Professeur** : Très souvent par un e-mail. Un spear phishing bien préparé : le nom d'un vrai confrère, une vraie patiente, une pièce jointe « urgente ».
- **Camille** : Et les SMS de rappel de rendez-vous ? Les patients leur font confiance.
- **Professeur** : Justement, les escrocs les imitent : « Rendez-vous annulé, payez 2 € pour le reprogrammer ». Les clés USB apportées par des patients sont un autre point d'entrée fréquent.

### 2 | Hameçonnage et ingénierie sociale

- **Camille** : L'ingénierie sociale, c'est quoi exactement ?
- **Professeur** : L'art de manipuler une personne plutôt qu'une machine. L'attaquant se fait passer pour quelqu'un de confiance, un confrère, l'Assurance Maladie, le support d'un logiciel, pour obtenir un code, un mot de passe ou un virement.
- **Camille** : Et comment je fais la différence avec un vrai message ?
- **Professeur** : Deux signaux trahissent souvent l'attaque : l'urgence et la demande inhabituelle. On verra au chapitre suivant comment réagir.
- **Camille** : Même si l'e-mail cite mon nom et celui d'un vrai patient ?
- **Professeur** : Surtout dans ce cas. C'est le spear phishing : l'attaquant a fait ses recherches avant d'écrire. Plus le message est personnalisé, plus il paraît crédible.

### 3 | Compromission de comptes

- **Camille** : Comment savoir si mon compte a été piraté ?
- **Professeur** : Quelques signes : une alerte de connexion inhabituelle, une demande de validation MFA que tu n'as pas lancée, des rendez-vous modifiés sans toi.
- **Camille** : Et s'il n'y a aucun signe ?
- **Professeur** : C'est le cas le plus courant : l'attaquant se connecte avec ton vrai mot de passe et passe inaperçu. Un mot de passe réutilisé sur un autre site qui a fuité suffit.
- **Camille** : Et comment je m'en protège ?
- **Professeur** : C'est l'objet du chapitre suivant. Retiens pour l'instant qu'un compte compromis ne se voit pas : c'est justement ce qui le rend dangereux.

### 4 | Revue des accès manquante

- **Camille** : Notre remplaçante est partie il y a six mois, mais son compte existe encore. C'est grave ?
- **Professeur** : Oui : un compte oublié est une porte ouverte. Elle pourrait encore se connecter, tout comme un attaquant qui aurait récupéré son mot de passe.
- **Camille** : Et les droits trop larges, c'est aussi un problème ?
- **Professeur** : Oui : une secrétaire qui a des droits d'administration, c'est un compte bien plus précieux pour un attaquant. Comment éviter tout ça ? Ce sera le chapitre suivant.

## 4. contextes | Contexte probable de votre établissement

- **Camille** : Un cabinet et une clinique ont-ils vraiment les mêmes risques ?
- **Professeur** : Les mêmes menaces, pas les mêmes enjeux. Le cabinet n'a souvent pas d'informaticien. La clinique a une DSI, mais aussi des équipements qui soignent : pousse-seringues, IRM, centrale de fluides médicaux.
- **Camille** : C'est ça, l'OT ?
- **Professeur** : Oui, les technologies opérationnelles. Un PC piraté, tu perds des données. Un équipement OT piraté, tu peux toucher au patient lui-même. C'est pour ça qu'on les isole et qu'on surveille leurs accès distants. Repère ton contexte ci-dessous.

## 5. ia | IA et données patients

- **Camille** : J'utilise un chatbot pour résumer mes comptes rendus. C'est grave ?
- **Professeur** : Pose-toi une seule question : où partent les données ? Sur un outil grand public, elles quittent l'environnement HDS, souvent l'Europe, et peuvent servir à entraîner le modèle.
- **Camille** : Et si j'enlève le nom du patient ?
- **Professeur** : Ce n'est pas suffisant. Âge, pathologie, date, ville : on réidentifie vite une personne. N'utilise que les outils validés par ta structure, sous contrat.

## 6. practilio | Réduire sa surface d'attaque

### 1 | La surface d'attaque

- **Camille** : On a vu toutes ces attaques. Comment on ferme les portes ?
- **Professeur** : En réduisant la surface d'attaque : moins de portes ouvertes, et des portes mieux surveillées. Practilio s'en charge sur ses logiciels, et toi dans ton établissement.
- **Camille** : Si Practilio est certifié HDS, je n'ai plus rien à faire, si ?
- **Professeur** : C'est l'erreur la plus fréquente. L'HDS protège l'hébergement, pas ton poste, ta box, ton mot de passe ou le PDF que tu as téléchargé.

### 2 | Ce que fait Practilio

- **Camille** : Concrètement, que fait Practilio pour moi ?
- **Professeur** : La double authentification, des alertes en cas de connexion inhabituelle, des applications diffusées seulement par les magasins officiels, des correctifs de sécurité réguliers.
### 3 | Qui a accès à quoi ?

- **Camille** : Et l'administrateur technique de la clinique, il voit tous les dossiers ?
- **Professeur** : Non. Il crée et ferme les comptes, mais n'a pas accès aux données médicales. Même les administrateurs système de Practilio ne peuvent pas les lire. Chacun n'a que les droits nécessaires à sa mission : c'est le moindre privilège.

### 5 | Les mesures de l'ANSSI

- **Camille** : Quarante-deux mesures ? C'est énorme pour un cabinet !
- **Professeur** : Le guide est rangé en dix thèmes : avance thème par thème. Et commence par l'essentiel : l'authentification multi-facteur, des mots de passe uniques, les mises à jour, des sauvegardes testées et les comptes fermés au départ de chacun.
- **Camille** : Et les thèmes plus techniques ?
- **Professeur** : Ils concernent surtout les établissements qui ont un service informatique. Pour un cabinet, ton prestataire peut t'aider à les appliquer.

## 7. reglementation | Les obligations

- **Camille** : RGPD, NIS 2, HDS, CRA… je m'y perds.
- **Professeur** : Range-les dans deux tiroirs. Le droit commun s'applique à tous : le RGPD pour les données personnelles, NIS 2 pour la sécurité des réseaux des entités importantes. Le droit de la santé ajoute ses propres règles : secret médical, HDS, déclaration des incidents.
- **Camille** : NIS 2 s'applique déjà en France ?
- **Professeur** : Au 23 novembre 2026, la loi de transposition n'est pas encore promulguée. On le dit, avec la date : en conformité, une information datée vaut mieux qu'une certitude fausse. Fais le questionnaire ci-dessous pour ta structure.

## 8. attaque_ransomware | Attaque par rançongiciel

- **Camille** : L'écran affiche une demande de rançon. Je fais quoi ?
- **Professeur** : D'abord, tu coupes Internet : au cabinet, tu débranches la box. Puis tu isoles les postes touchés et tu débranches le disque de sauvegarde, sinon il sera chiffré lui aussi.
- **Camille** : J'éteins les ordinateurs ?
- **Professeur** : Surtout pas. La mémoire vive contient des traces utiles à l'enquête. Et on ne rallume pas ceux qui étaient éteints. Note tout dans une main courante : l'heure, ce que tu vois, ce que tu fais.
- **Camille** : Et si je paie pour aller plus vite ?
- **Professeur** : Non. Aucune garantie de récupérer les données, et tu finances les criminels. Tu préviens le CERT Santé, tu portes plainte dans les 72 heures, sinon l'assurance ne paiera pas. Tout est dans le guide de l'ANSSI « Attaques par rançongiciels, tous concernés ».
- **Camille** : Et Practilio, de son côté ?
- **Professeur** : Si la faille est dans son logiciel, le Cyber Resilience Act l'oblige à la déclarer : alerte précoce sous 24 h, notification sous 72 h. Ces délais sont les siens, pas les tiens.

## 9. assurance | Assurance et transfert du risque

- **Camille** : Avec une assurance cyber, le risque disparaît ?
- **Professeur** : Non, il change de poche. Face à un risque, on peut le réduire, l'éviter, l'accepter ou le transférer. L'assurance transfère une partie du coût financier.
- **Camille** : Mais l'arrêt des soins, lui…
- **Professeur** : …reste entier, comme ta responsabilité envers les patients. Et attention : depuis 2023, sans plainte déposée dans les 72 heures, l'assureur n'indemnise pas les pertes liées à l'attaque.

## 10. acteurs | Les acteurs publics

- **Camille** : Il y a tellement d'organismes. Lequel appeler ?
- **Professeur** : Pour une structure de santé, le réflexe, c'est le CERT Santé, opéré par l'Agence du numérique en santé. Pour une petite structure sans informaticien : Cybermalveillance.gouv.fr et 17Cyber. La CNIL pour les données personnelles, l'ANSSI pour le cadre national.
- **Camille** : Et pour comprendre qui nous attaque, et pourquoi ?
- **Professeur** : Les centres de recherche : IFRI, IRSEM, EuRepoC. C'est surtout utile pour une direction qui doit anticiper.

## 11. sensibilisation | Les bons gestes et le quiz

- **Camille** : Si je ne devais retenir qu'une chose ?
- **Professeur** : La MFA. Même si ton mot de passe est volé, l'attaquant reste dehors. Et si ton téléphone te demande de valider une connexion que tu n'as pas lancée : tu refuses et tu signales.
- **Camille** : Les mots de passe compliqués, c'est vraiment utile ?
- **Professeur** : La longueur compte plus que les symboles. Une phrase de passe comme « Chat-bleu!mange+3-croissants » est solide et facile à retenir. Un mot de passe par service, rangé dans un gestionnaire de mots de passe. On préférera un gestionnaire de type KeePassXC : gratuit, et ton coffre reste chiffré sur ton poste.
- **Camille** : Comment je sais si j'ai compris ?
- **Professeur** : Choisis ton profil, lis les fiches, puis passe le quiz en bas de page. Chaque réponse est expliquée. Vise 80 %.

## 12. prestataires | Les prestataires

- **Camille** : Comment choisir un prestataire sérieux ?
- **Professeur** : Regarde les qualifications de l'ANSSI : PRIS pour la réponse à incident, PASSI pour l'audit. Pour un cabinet, un prestataire de proximité labellisé ExpertCyber suffit souvent.
- **Camille** : Et quand faut-il le choisir ?
- **Professeur** : Avant l'incident. Le jour de la crise, tout le monde appelle les mêmes équipes.

## 13. outils | Les outils

- **Camille** : Quel outil acheter en premier ?
- **Professeur** : Aucun outil ne remplace les bonnes pratiques. Commence par le socle : gestionnaire de mots de passe, MFA, sauvegardes hors ligne, EDR. Les SIEM ou le SASE viendront si tu es une clinique.
- **Camille** : Et pour les équipements biomédicaux ?
- **Professeur** : Il existe des outils spécialisés OT : ils écoutent le réseau sans perturber les équipements et repèrent ce qui sort de l'ordinaire.

## 14. sources | Sources et glossaire

- **Camille** : Pourquoi y a-t-il des dates partout ?
- **Professeur** : Parce que le droit et la menace évoluent vite. Une source sans date ne se vérifie pas. Et quand un mot te bloque, le glossaire donne sa définition complète.
- **Camille** : C'est la fin du cours ?
- **Professeur** : La fin du parcours, pas de l'apprentissage. Repasse les quiz dans trois mois, et note ce qui a changé.
