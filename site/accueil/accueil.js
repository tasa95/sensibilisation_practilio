/* Accueil : script propre à la page (le menu et la BD sont dans ../shared/common.js). */
(function(){
  var store=window.PCR.store;
  /* ---------- Parcours d'accueil ---------- */
  var ctxLabel={cabinet:"cabinet libéral",msp:"maison ou centre de santé",clinique:"clinique ou établissement"};
  var roleSteps={
    employe:['<a href="../sensibilisation/index.html">Espace Secrétariat &amp; accueil</a> : MFA, mots de passe, spear phishing, clés USB, puis le quiz','<a href="../menaces/index.html">Menaces</a> : reconnaître un hameçonnage et un rançongiciel','<a href="../ia/index.html">IA et données patients</a> : ce qu\'il ne faut jamais saisir'],
    it:['<a href="../sensibilisation/index.html">Espace Administrateurs &amp; IT</a> : socle technique et scénarios, puis le quiz','<a href="../outils/index.html">Outils</a> : catégories prioritaires pour votre contexte','<a href="../prestataires/index.html">Prestataires</a> : qualifications ANSSI et contrats d\'urgence'],
    dirigeant:['<a href="../practilio/index.html">Practilio et vous</a> : ce qui reste de votre responsabilité','<a href="../reglementation/index.html">Réglementation</a> : vos obligations selon votre structure','<a href="../sensibilisation/index.html">Espace Praticiens &amp; direction</a> : vos 5 décisions prioritaires, puis le quiz']
  };
  var form=document.getElementById("parcours-form");
  if(!form) return; /* formulaire retiré de l'accueil pour l'instant : voir docs/accueil-contenu-retire.html */
  form.addEventListener("submit",function(e){
    e.preventDefault(); var f=new FormData(this); var c=f.get("ctx"), r=f.get("role");
    var steps=[];
    steps.push('<a href="../contextes/index.html">Votre contexte (' + ctxLabel[c] + ')</a> : actifs critiques et menaces dominantes'+(c==="clinique"?", y compris l'OT (biomédical, GTB, fluides médicaux)":""));
    steps=steps.concat(roleSteps[r]);
    steps.push('<a href="../notions/index.html">Notions clés</a> si un terme vous échappe, puis <a href="../acteurs/index.html">les acteurs publics</a> à connaître');
    steps.push('En cas d\'incident, à tout moment : <a href="../qui-contacter/index.html">qui contacter</a> (bouton rouge en haut de chaque page)');
    document.getElementById("parcours-out").innerHTML='<div class="fiche ok"><h3>Votre trajectoire</h3><ol class="steps">'+steps.map(function(s){return "<li><div>"+s+"</div></li>";}).join("")+'</ol></div>';
  });
})();
