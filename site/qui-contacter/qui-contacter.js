/* Qui contacter : script propre à la page (le menu et la BD sont dans ../shared/common.js). */
(function(){
  var store=window.PCR.store;
  /* ---------- Qui contacter ---------- */
  var C={
    practilio:'Prévenir <strong>l\'entreprise Practilio</strong> à l\'adresse <span class="mono">securite@practilio.example</span> ou au numéro d\'urgence <span class="mono">01 00 00 00 00</span>.',
    cyberm:'Contacter <strong>17Cyber</strong> ou <strong>Cybermalveillance.gouv.fr</strong> : <a href="https://www.17cyber.gouv.fr" target="_blank" rel="noopener">17cyber.gouv.fr</a> · <a href="https://www.cybermalveillance.gouv.fr" target="_blank" rel="noopener">cybermalveillance.gouv.fr</a>.',
    presta:'Prévenir <strong>votre référent informatique ou votre prestataire de sécurité</strong> : prestataire de détection des incidents de sécurité (PDIS) ou prestataire de réponse aux incidents de sécurité (PRIS). <a href="https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/services-de-securite-evalue/solutions-en-cours-de-qualification/pdis/" target="_blank" rel="noopener">Voir les prestataires PDIS</a>.' + ' <a href="https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/services-de-securite-evalue/solutions-en-cours-de-qualification/pris/" target="_blank" rel="noopener">Voir les prestataires PRIS</a>.',
    cert:'Prévenir le <strong>CERT Santé</strong> : <a href="https://cyberveille.esante.gouv.fr/" target="_blank" rel="noopener">cyberveille.esante.gouv.fr</a>, astreinte <span class="mono">09 72 43 91 25</span> pour les incidents majeurs.',
    portail:'Déclarer l\'incident sur <a href="https://signalement.social-sante.gouv.fr" target="_blank" rel="noopener">signalement.social-sante.gouv.fr</a> (obligatoire pour les établissements) : l\'ARS et le CERT Santé sont prévenus.',
    cnil:'Effectuer une <strong>notification à la CNIL sous 72 h</strong> si des données personnelles ont été compromises (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>), et prévenir les patients concernés si le risque pour eux est élevé.<small class="hint">Rappel : la CNIL peut sanctionner l\'absence de notification. Le RGPD prévoit des amendes jusqu\'à 10 millions d\'euros ou 2 % du chiffre d\'affaires annuel mondial pour ce manquement (art. 83.4), et jusqu\'à 20 millions d\'euros ou 4 % pour les manquements les plus graves (art. 83.5).</small>',
    plainte:'Déposer <strong>plainte</strong> auprès de la police ou de la gendarmerie <strong>dans les 72 h</strong> : c\'est indispensable pour être indemnisé par l\'assurance.',
    assur:'Prévenir <strong>votre assureur</strong>.',
    ansm:'Prévenir <strong>le fabricant de l\'équipement</strong> et le signaler à l\'<strong>ANSM</strong> (matériovigilance) si un dispositif médical est concerné.',
    biomed:'Prévenir <strong>le service biomédical et les services techniques</strong> : ils mettent l\'équipement en sécurité.'
  };

  var form=document.getElementById("inc-form");
  function render(){
    var c=document.querySelector('input[name="ictx"]:checked').value, s=document.querySelector('input[name="isit"]:checked').value, etab=c==="clinique";
    var lvl, list;
    if(s==="compte"){lvl=["warn","À faire dans l'heure"]; list=["practilio", etab?"cert":"cyberm","presta","cnil"];}
    else if(s==="ransom"){lvl=["crit","À faire immédiatement, 24 h/24"]; list= etab?["presta","cert","portail","practilio","cnil","plainte","assur"]:["presta","cyberm","cert","practilio","cnil","plainte","assur"];}
    else if(s==="fuite"){lvl=["crit","À faire immédiatement"]; list=["presta","practilio","cnil", etab?"portail":"cert","plainte"];}
    else if(s==="phish"){lvl=["ok","À faire dans la journée"]; list=["presta","cyberm"]; }
    else {lvl=["crit","À faire immédiatement"]; list=["biomed","presta","cert"].concat(etab?["portail"]:[]).concat(["ansm"]);}
    var extra = s==="compte" ? '<p class="note">Practilio s\'occupe de ses logiciels et services ; votre prestataire s\'occupe de vos ordinateurs. La notification à la CNIL reste à votre charge : Practilio vous fournit les éléments nécessaires.</p>' : (s==="phish" ? '<p class="note">Si le message se fait passer pour Practilio, prévenez aussi Practilio. Si vous avez cliqué ou saisi un mot de passe, changez-le et choisissez la situation « Incident touchant les logiciels et services Practilio ou mon compte Practilio ».</p>' : '');
    document.getElementById("inc-out").innerHTML='<div class="fiche '+lvl[0]+'"><p><span class="tag '+lvl[0]+'">'+lvl[1]+'</span></p><h3>Dans cet ordre</h3><ol class="steps">'+list.map(function(k){return"<li><div>"+C[k]+"</div></li>";}).join("")+'</ol>'+extra+'</div>';
  }
  form.addEventListener("submit",function(e){e.preventDefault();render();});
  form.addEventListener("change",render);
  render();
})();
