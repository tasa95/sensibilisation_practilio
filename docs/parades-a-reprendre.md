# Parades retirées de la page « Les attaques »

> **Reprises le 23/11/2026** dans la leçon 05 « Réduire sa surface d'attaque » (`site/practilio/`), étape « Les mesures de l'ANSSI », rangées par thème du Guide d'hygiène informatique.

Le 23/11/2026, à la demande de l'utilisateur, la page « Les attaques » (`site/menaces/`) décrit les attaques **sans leurs solutions**. Les parades ci-dessous ont été retirées et doivent être exposées dans le chapitre suivant (page à créer ou à choisir).

## Rançongiciel
- Sauvegardes **3-2-1** : 3 copies, sur 2 supports différents, dont 1 hors ligne (déconnectée), testées régulièrement.
- Mises à jour automatiques, MFA sur tous les accès distants.
- En cas d'attaque : couper Internet, isoler les machines touchées et les sauvegardes, ne pas éteindre, conserver les preuves, alerter, déposer plainte (détail : page « Premières actions en cas d'attaque de ransomware »).
- Ne pas payer la rançon : rien ne garantit la restitution des données, et cela finance l'attaquant (recommandation constante de l'ANSSI et de Cybermalveillance.gouv.fr).

## Hameçonnage et ingénierie sociale
- Vérifier toute demande urgente ou inhabituelle par un autre canal : rappeler le confrère au numéro connu, jamais à celui du message.
- Un rappel Practilio ne demande jamais de paiement, de code ou de mot de passe.

## Compromission de comptes
- Authentification multi-facteur sur chaque compte.
- Une phrase de passe unique par service, rangée dans un gestionnaire de mots de passe.
- Refuser toute demande de validation MFA que l'on n'a pas lancée (fatigue MFA).
- En cas de doute : changer le mot de passe depuis un autre appareil, consulter le journal des connexions, prévenir Practilio, qui coupe les sessions ouvertes.

## Revue des accès manquante
- Revue trimestrielle en 4 questions : qui a un compte aujourd'hui ? chaque personne travaille-t-elle encore dans la structure ? ses droits correspondent-ils à son métier (praticien, secrétaire, administrateur) ? reste-t-il des comptes partagés ou des accès de prestataires à fermer ?
- Qui s'en charge : l'administrateur technique de l'établissement, ou le titulaire du cabinet, à chaque départ et lors de la revue trimestrielle.
- Moindre privilège : chacun ne garde que les droits nécessaires à son travail.

## Clés USB et supports amovibles
- Ne jamais brancher une clé d'origine inconnue.
- Supports de patients (CD d'imagerie, clé de résultats) : passer par un poste dédié ou une station de décontamination définie avec l'informaticien.

## Fuite de données
- Limiter les exports, utiliser la messagerie sécurisée MSSanté (https://mssante.fr).

## Perte de matériel
- Chiffrement du disque, code de verrouillage, effacement à distance (MDM), signalement immédiat à Practilio pour couper les sessions.

## Indisponibilité (DoS, DDoS)
- Le PCA prévoit le fonctionnement sans le service.
