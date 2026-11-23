/* Sensibilisation & quiz : script propre à la page (le menu et la BD sont dans ../shared/common.js). */
(function(){
  var store=window.PCR.store;
  /* ---------- Quiz ---------- */
  var QUIZ={
    employe:[
      {q:"Vous recevez sur votre téléphone une demande de validation de connexion Practilio alors que vous ne vous connectez pas. Que faites-vous ?",o:["Je valide pour que ça s'arrête","Je refuse et je signale à Practilio et au titulaire","J'ignore, ça doit être un bug"],a:1,e:"Une demande non sollicitée signifie que quelqu'un connaît déjà votre mot de passe. Refuser bloque l'attaque ; signaler permet de changer le mot de passe et de vérifier le compte (attaque par « fatigue MFA »)."},
      {q:"Un mail d'un confrère que vous connaissez vous envoie « le compte rendu urgent de Mme D. » en pièce jointe .zip. Il ne vous écrit jamais d'habitude.",o:["J'ouvre, c'est un confrère connu","Je transfère au titulaire pour qu'il ouvre","Je vérifie en appelant le confrère au numéro que je connais"],a:2,e:"C'est un schéma typique de spear phishing : nom réel trouvé en ligne, urgence, pièce jointe compressée. La vérification par un autre canal est le bon réflexe ; transférer propage le risque."},
      {q:"Quel mot de passe est le plus robuste ?",o:["Cabinet2024!","Chat-bleu!mange+3-croissants","P@ssw0rd"],a:1,e:"La longueur prime. Une phrase de passe longue et personnelle résiste mieux que des substitutions connues des attaquants (@ pour a, 0 pour o)."},
      {q:"Un patient vous tend une clé USB « avec mes résultats de laboratoire » à l'accueil.",o:["Je la branche sur le poste de l'accueil","J'applique la procédure prévue (poste dédié ou station de décontamination), ou je demande l'envoi par messagerie sécurisée","Je la branche sur l'ordinateur du médecin"],a:1,e:"Une clé peut contenir un programme malveillant qui s'exécute au branchement. Le poste qui ouvre Practilio ne doit jamais servir à lire un support inconnu."},
      {q:"Votre écran affiche « Vos fichiers ont été chiffrés, payez en bitcoins ». Premier geste ?",o:["J'éteins l'ordinateur","Je débranche le câble réseau sans éteindre et j'alerte immédiatement","Je cherche sur internet comment déchiffrer"],a:1,e:"Débrancher le réseau limite la propagation ; ne pas éteindre préserve des traces en mémoire utiles à l'enquête. Ensuite, on alerte titulaire et prestataire."},
      {q:"Pour gagner du temps, puis-je coller un compte rendu de consultation dans un assistant d'IA grand public pour le résumer ?",o:["Oui si j'enlève le nom","Non, sauf outil validé par la structure et hébergé de façon conforme","Oui, tout le monde le fait"],a:1,e:"Les données partent chez l'éditeur, hors environnement HDS, sans contrat de sous-traitance. Retirer le nom ne suffit pas : âge, pathologie, dates permettent souvent de réidentifier."},
      {q:"Une patiente appelle : elle a reçu un SMS « Rendez-vous annulé, réglez 2 € pour le reprogrammer » avec un lien. Que lui répondez-vous ?",o:["De payer, c'est une petite somme","Que c'est une escroquerie : un rappel Practilio ne demande jamais de paiement ; ne pas cliquer, et vous signalez le message à Practilio","Que vous ne savez pas"],a:1,e:"Les escrocs imitent les rappels automatiques (smishing). Rassurer la patiente, lui donner la règle simple, et signaler à Practilio permet d'alerter tous les utilisateurs."}
    ],
    it:[
      {q:"Quel facteur MFA résiste le mieux à l'hameçonnage ?",o:["Code par SMS","Clé FIDO2 ou carte CPS / e-CPS","Question secrète"],a:1,e:"Les facteurs FIDO2 et l'authentification par carte sont liés au site légitime et ne peuvent pas être rejoués sur un faux site, contrairement au code SMS qui peut être intercepté ou saisi sur une page piégée."},
      {q:"Quelle stratégie de sauvegarde protège d'un rançongiciel ?",o:["Une copie sur un NAS en réseau","3-2-1 avec une copie hors ligne ou immuable, et des restaurations testées","La synchronisation cloud du dossier Documents"],a:1,e:"Les rançongiciels chiffrent aussi les sauvegardes accessibles en réseau et les dossiers synchronisés. Seule une copie déconnectée ou immuable, régulièrement testée, garantit la reprise."},
      {q:"Vous découvrez un VPN de télémaintenance ouvert vers la centrale de fluides médicaux, sans contrat actif. Priorité ?",o:["Le laisser, le fabricant en a peut-être besoin","Le couper ou le restreindre, puis le rouvrir à la demande, tracé et avec MFA, après accord du service biomédical","Changer seulement le mot de passe"],a:1,e:"Un accès distant non maîtrisé à un équipement OT critique est un risque direct pour les patients. La coupure doit être coordonnée avec le biomédical pour ne pas interrompre la supervision."},
      {q:"Comment traiter un équipement biomédical sous un système d'exploitation obsolète ?",o:["Installer soi-même les mises à jour Windows","Le segmenter dans un réseau isolé, surveiller ses flux et voir avec le fabricant","L'exposer sur internet pour la télémaintenance"],a:1,e:"Modifier un dispositif médical sans le fabricant peut annuler son marquage CE. La protection passe par l'isolement réseau, la supervision (outils OT) et le dialogue avec le fabricant."},
      {q:"Une alerte du CERT-FR signale une vulnérabilité activement exploitée sur votre modèle de VPN. Que faites-vous ?",o:["J'attends la prochaine maintenance trimestrielle","J'applique le correctif en urgence et je recherche des traces de compromission","Rien, notre VPN a un mot de passe"],a:1,e:"Les vulnérabilités d'équipements exposés sont exploitées en quelques jours, parfois en quelques heures. Il faut corriger vite et vérifier qu'aucun attaquant n'est déjà entré."},
      {q:"Une utilisatrice a installé une application « hors store » avec ses droits administrateur. Quelle mesure évite que cela se reproduise ?",o:["Une note de service","Retirer les droits administrateur aux utilisateurs et définir une liste de logiciels autorisés","Interdire internet"],a:1,e:"Le principe du moindre privilège empêche l'installation silencieuse. Une liste d'applications autorisées, appliquée via le MDM ou l'EDR, rend la règle effective."}
    ],
    dirigeant:[
      {q:"Vos données patients sont hébergées par Practilio, certifié HDS. Qui est responsable de traitement ?",o:["Practilio","Vous, le praticien ou l'établissement","L'hébergeur"],a:1,e:"Vous déterminez pourquoi et comment les données de vos patients sont traitées : vous êtes responsable de traitement. Practilio est sous-traitant et l'hébergeur certifié HDS intervient pour son compte."},
      {q:"Une violation de données patients présente un risque pour les personnes. Délai de notification à la CNIL ?",o:["72 heures après en avoir pris connaissance","1 mois","Aucun si Practilio est hébergé HDS"],a:0,e:"Article 33 du RGPD : 72 h au plus tard, même si l'enquête n'est pas finie (on complète ensuite). Si le risque est élevé, les patients doivent aussi être informés (art. 34)."},
      {q:"Un rançongiciel bloque votre structure et l'attaquant propose un « petit prix ». Recommandation officielle ?",o:["Payer vite pour reprendre les soins","Ne pas payer, porter plainte, activer le PCA et se faire accompagner","Négocier seul"],a:1,e:"L'ANSSI et Cybermalveillance.gouv.fr recommandent de ne pas payer : aucune garantie de récupération ni de non-publication, et risque d'être de nouveau ciblé."},
      {q:"Votre comptable reçoit un mail de vous demandant un virement urgent vers un nouveau fournisseur. Quelle règle fixer ?",o:["Les demandes du dirigeant s'exécutent sans délai","Toute demande de virement ou de changement de RIB inhabituelle est vérifiée par rappel à un numéro connu","Seuls les montants > 10 000 € sont vérifiés"],a:1,e:"La fraude au président et la fraude au faux fournisseur reposent sur l'urgence et l'autorité. Une règle de double vérification, connue de tous, la neutralise."},
      {q:"Quelle décision a le meilleur rapport efficacité / coût pour un cabinet ?",o:["Acheter un SOC 24/7","Imposer la MFA et des sauvegardes hors ligne testées","Changer d'antivirus tous les ans"],a:1,e:"La MFA bloque la majorité des compromissions de comptes, et des sauvegardes hors ligne permettent de redémarrer après un rançongiciel. C'est le socle avant tout outil avancé."},
      {q:"Pour une clinique, quand faut-il identifier le prestataire de réponse à incident ?",o:["Le jour de l'attaque","Avant tout incident, avec un contrat ou une convention prête","Après la notification à la CNIL"],a:1,e:"Le jour de la crise, les prestataires qualifiés (PRIS) sont sollicités de toutes parts. Un contrat préalable et des contacts à jour font gagner des heures décisives."}
    ]
  };
  var cur="employe";
  function renderQuiz(){
    var qs=QUIZ[cur], box=document.getElementById("quiz"), html="";
    qs.forEach(function(it,i){
      html+='<fieldset class="q" id="q-'+cur+'-'+i+'"><legend>Question '+(i+1)+'</legend><p>'+it.q+'</p>';
      it.o.forEach(function(o,j){html+='<label class="opt"><input type="radio" name="q'+i+'" value="'+j+'" id="q-'+cur+'-'+i+'-'+j+'"> '+o+'</label>';});
      html+='<div class="fb" hidden></div></fieldset>';
    });
    html+='<div><button type="button" id="quiz-check">Corriger mon quiz</button></div><p class="score" id="quiz-score" aria-live="polite"></p>';
    box.innerHTML=html;
    document.getElementById("quiz-check").addEventListener("click",function(){
      var ok=0;
      qs.forEach(function(it,i){
        var fs=document.getElementById("q-"+cur+"-"+i), sel=fs.querySelector("input:checked"), fb=fs.querySelector(".fb");
        var good=sel && +sel.value===it.a; if(good) ok++;
        fb.hidden=false; fb.className="fb "+(good?"good":"bad");
        fb.innerHTML=(good?"<strong>Correct.</strong> ":"<strong>"+(sel?"Pas tout à fait.":"Sans réponse.")+"</strong> Bonne réponse : « "+it.o[it.a]+" ». ")+it.e;
      });
      var pct=Math.round(ok/qs.length*100);
      document.getElementById("quiz-score").textContent="Score : "+ok+"/"+qs.length+" ("+pct+" %) — "+(pct>=80?"objectif atteint.":"objectif : 80 %. Relisez les fiches ci-dessus et recommencez.");
      var h=store("pcr-hist")||[]; h.push({p:cur,s:pct,d:new Date().toISOString().slice(0,10)}); store("pcr-hist",h.slice(-20)); hist();
    });
  }
  function hist(){
    var h=store("pcr-hist")||[], el=document.getElementById("quiz-hist");
    if(!h.length){el.textContent="Démonstration du suivi : vos résultats de quiz s'afficheront ici (stockés uniquement dans votre navigateur). Dans une version réelle, Practilio agrégerait ces résultats de façon anonyme par structure.";return;}
    var lab={employe:"Accueil",it:"IT",dirigeant:"Direction"};
    el.innerHTML="<strong>Vos derniers résultats (dans ce navigateur) :</strong> "+h.slice(-6).map(function(x){return lab[x.p]+" "+x.s+" % ("+x.d+")";}).join(" · ");
  }
  document.querySelectorAll(".tabs button").forEach(function(b){
    b.addEventListener("click",function(){
      cur=b.dataset.prof;
      document.querySelectorAll(".tabs button").forEach(function(x){x.setAttribute("aria-selected",x===b?"true":"false");});
      document.querySelectorAll(".prof").forEach(function(p){p.hidden=(p.id!=="prof-"+cur);});
      renderQuiz();
    });
  });
  renderQuiz(); hist();
  /* Ouvrir directement un onglet depuis un lien : #profil-employe, #profil-it, #profil-dirigeant */
  var m=/^#profil-(employe|it|dirigeant)$/.exec(location.hash);
  if(m){ var t=document.getElementById("tab-"+m[1]); if(t) t.click(); }
})();
