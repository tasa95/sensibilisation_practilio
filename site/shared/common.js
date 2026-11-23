/* Practilio Cyber Repères : code commun à toutes les pages (menu, BD du mode tutoriel, stockage local).
   Chaque page déclare son identifiant dans <body data-page="…"> et charge ensuite son propre script. */
(function(){
  var PAGE=document.body.getAttribute("data-page")||"";

  /* ---------- Lien actif du menu ---------- */
  var NAVID=document.body.getAttribute("data-nav")||PAGE; /* les fiches outils activent le lien « Outils » */
  document.querySelectorAll("#nav a").forEach(function(a){
    if(a.getAttribute("href").indexOf("/"+NAVID+"/")>=0) a.setAttribute("aria-current","page");
  });

  /* ---------- Menu sandwich (panneau latéral) ---------- */
  var menuBtn=document.getElementById("menu-btn"), drawer=document.getElementById("drawer");
  function setMenu(open){
    document.documentElement.classList.toggle("drawer-open",open);
    menuBtn.setAttribute("aria-expanded",open?"true":"false");
    menuBtn.setAttribute("aria-label",open?"Fermer le menu":"Ouvrir le menu");
    if(open){ var cur=drawer.querySelector('a[aria-current="page"]')||drawer.querySelector("a"); cur.focus(); } else if(drawer.contains(document.activeElement)) menuBtn.focus();
  }
  menuBtn.addEventListener("click",function(){setMenu(!document.documentElement.classList.contains("drawer-open"));});
  document.getElementById("menu-close").addEventListener("click",function(){setMenu(false);});
  document.getElementById("drawer-backdrop").addEventListener("click",function(){setMenu(false);});
  drawer.addEventListener("click",function(e){ if(e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape" && document.documentElement.classList.contains("drawer-open")) setMenu(false); });

  function esc(s){return s;}
  function store(k,v){try{ if(v===undefined) return JSON.parse(localStorage.getItem(k)||"null"); localStorage.setItem(k,JSON.stringify(v)); }catch(e){return null;}}
  window.PCR={store:store,page:PAGE};

  /* ---------- Outils préconisés par l'équipe Practilio (EDR, XDR, SIEM) ----------
     Source unique : chaque <div class="reco" data-reco="edr"> (ou "edr xdr", "siem"…) est rempli ici. */
  var L=function(u,t){return '<a href="'+u+'" target="_blank" rel="noopener">'+t+'</a>';};
  var RECO={
    edr:{t:"EDR",d:"détection et réponse sur les postes et serveurs",items:[
      [L("https://harfanglab.io","HarfangLab EDR"),"éditeur français"],
      [L("https://www.microsoft.com/fr-fr/security/business/endpoint-security/microsoft-defender-endpoint","Microsoft Defender for Endpoint"),"parc sous Microsoft 365"],
      [L("https://www.crowdstrike.com/fr-fr/platform/endpoint-security/","CrowdStrike Falcon"),""],
      [L("https://www.sentinelone.com/fr/platform/singularity-endpoint/","SentinelOne Singularity Endpoint"),""]],
      note:"En cabinet, l'EDR est en général installé et surveillé par votre prestataire informatique : demandez-lui lequel il utilise et qui reçoit les alertes."},
    xdr:{t:"XDR",d:"détection étendue aux postes, à la messagerie, au réseau et au cloud",items:[
      [L("https://www.microsoft.com/fr-fr/security/business/siem-and-xdr/microsoft-defender-xdr","Microsoft Defender XDR"),"parc sous Microsoft 365"],
      [L("https://www.sekoia.com/","Sekoia Defend"),"éditeur français, XDR et SIEM"],
      [L("https://www.paloaltonetworks.com/cortex/cortex-xdr","Palo Alto Networks Cortex XDR"),""],
      [L("https://wazuh.com","Wazuh"),"open source, demande des compétences internes"]],
      note:"Un XDR n'a d'intérêt que si quelqu'un traite ses alertes : équipe IT interne ou SOC externalisé."},
    siem:{t:"SIEM",d:"collecte et corrélation des journaux pour détecter les incidents",items:[
      [L("https://www.microsoft.com/fr-fr/security/business/siem-and-xdr/microsoft-sentinel","Microsoft Sentinel"),"cloud Microsoft"],
      [L("https://www.sekoia.com/","Sekoia Defend"),"éditeur français, SIEM et XDR"],
      [L("https://www.splunk.com/en_us/products/enterprise-security.html","Splunk Enterprise Security"),"Cisco"],
      [L("https://www.elastic.co/security","Elastic Security"),""],
      [L("https://wazuh.com","Wazuh"),"open source, demande des compétences internes"]],
      note:"Réservé aux cliniques et groupes : un SIEM s'exploite 24 h/24, le plus souvent via un SOC externalisé. Privilégiez un prestataire qualifié PDIS par l'ANSSI."}
  };
  document.querySelectorAll("[data-reco]").forEach(function(box){
    box.classList.add("reco");
    box.innerHTML=box.getAttribute("data-reco").split(/[\s,]+/).filter(function(k){return RECO[k];}).map(function(k){
      var r=RECO[k];
      return '<details class="acc acc-ok"><summary><strong>Outils '+r.t+' préconisés par l\'équipe Practilio</strong><span>'+r.d+'</span></summary>'+
        '<div class="acc-body"><ul>'+r.items.map(function(it){return '<li>'+it[0]+(it[1]?' <span class="muted">('+it[1]+')</span>':'')+'</li>';}).join("")+'</ul>'+
        '<p class="muted">'+r.note+''+(PAGE!=="outils-"+k?' <a href="../outils-'+k+'/index.html">Fiche complète : '+r.t+'</a>':'')+'</p></div></details>';
    }).join("");
  });

  /* ---------- Mode tutoriel : dialogue Professeur Cyber / Camille ---------- */
  /* Leçons et répliques : générées depuis docs/dialogues.md (site/dialogues.js) */
  var LESSONS=(window.TUTO&&window.TUTO.lessons)||[];
  var DIALOGUES=(window.TUTO&&window.TUTO.dialogues)||{};
  /* Personnages BD originaux (SVG) : contours épais, aplats de couleur */
  var INK='stroke="#16181a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
  var TOON={
    p:'<svg viewBox="0 0 120 160" role="img" aria-label="Professeur Cyber"><g '+INK+'>'+
      '<path d="M18 160 C20 122 38 104 60 104 C82 104 100 122 102 160 Z" fill="#ffffff"/>'+
      '<path d="M47 105 L60 130 L73 105 Z" fill="#cfe3e8"/>'+
      '<path d="M46 105 L57 150 M74 105 L63 150" fill="none"/>'+
      '<path d="M49 110 L60 115 L49 121 Z M71 110 L60 115 L71 121 Z" fill="#d6452f"/>'+
      '<path d="M79 127 l8 -3 l8 3 v6 c0 5 -4 8 -8 10 c-4 -2 -8 -5 -8 -10 z" fill="#0b5d6b"/>'+
      '<rect x="53" y="90" width="14" height="16" fill="#f2c9a0"/>'+
      '<path d="M22 54 C10 42 18 22 32 27 C34 11 52 9 59 20 C67 8 86 12 86 27 C100 22 110 42 98 54 Z" fill="#ececec"/>'+
      '<ellipse cx="29" cy="62" rx="6" ry="9" fill="#f2c9a0"/><ellipse cx="91" cy="62" rx="6" ry="9" fill="#f2c9a0"/>'+
      '<ellipse cx="60" cy="58" rx="30" ry="35" fill="#f2c9a0"/>'+
      '<path d="M39 42 q8 -6 15 -1 M66 41 q8 -5 15 1" fill="none" stroke="#8c8c8c" stroke-width="5"/>'+
      '<circle cx="48" cy="56" r="9.5" fill="#ffffff" fill-opacity=".55"/><circle cx="72" cy="56" r="9.5" fill="#ffffff" fill-opacity=".55"/>'+
      '<path d="M57.5 56 h5 M38.5 55 l-8 -2 M81.5 55 l8 -2" fill="none"/>'+
      '<circle cx="49" cy="57" r="2.6" fill="#16181a" stroke="none"/><circle cx="71" cy="57" r="2.6" fill="#16181a" stroke="none"/>'+
      '<path d="M60 60 q6 8 -1 11" fill="none"/>'+
      '<path d="M45 76 q8 -7 15 -1 q7 -6 15 1 q-8 6 -15 1 q-7 5 -15 -1z" fill="#ececec"/>'+
      '<path class="mouth-closed" d="M54 84 q6 3 12 0" fill="none"/>'+
      '<ellipse class="mouth-open" cx="60" cy="85" rx="6" ry="5" fill="#7a2a1e"/>'+
    '</g></svg>',
    e:'<svg viewBox="0 0 120 160" role="img" aria-label="Camille"><g '+INK+'>'+
      '<path d="M20 160 C22 122 40 106 60 106 C80 106 98 122 100 160 Z" fill="#f08a3c"/>'+
      '<path d="M38 109 q22 16 44 0" fill="#e2762a"/>'+
      '<path d="M54 116 v13 M66 116 v13" fill="none" stroke-width="2"/>'+
      '<path d="M33 121 l6 39 M87 121 l-6 39" fill="none" stroke="#2f4858" stroke-width="7"/>'+
      '<g transform="rotate(-7 60 145)"><rect x="40" y="132" width="40" height="27" rx="2" fill="#5cc2d1"/><path d="M46 140 h28 M46 147 h22" fill="none" stroke-width="2"/></g>'+
      '<rect x="53" y="92" width="14" height="16" fill="#e8b48c"/>'+
      '<path d="M27 66 C20 26 100 26 93 66 C94 76 86 80 84 76 L36 76 C34 80 26 76 27 66Z" fill="#3b2a20"/>'+
      '<ellipse cx="32" cy="66" rx="5" ry="8" fill="#e8b48c"/><ellipse cx="88" cy="66" rx="5" ry="8" fill="#e8b48c"/>'+
      '<ellipse cx="60" cy="62" rx="28" ry="32" fill="#e8b48c"/>'+
      '<path d="M31 60 C26 14 94 14 89 58 C80 46 70 50 62 40 C56 50 44 48 31 60Z" fill="#3b2a20"/>'+
      '<ellipse cx="49" cy="64" rx="6" ry="7.5" fill="#ffffff"/><ellipse cx="71" cy="64" rx="6" ry="7.5" fill="#ffffff"/>'+
      '<circle cx="50" cy="65" r="3.6" fill="#16181a" stroke="none"/><circle cx="70" cy="65" r="3.6" fill="#16181a" stroke="none"/>'+
      '<circle cx="51.3" cy="63.5" r="1.2" fill="#ffffff" stroke="none"/><circle cx="71.3" cy="63.5" r="1.2" fill="#ffffff" stroke="none"/>'+
      '<path d="M43 53 q6 -3 11 0 M66 53 q6 -3 11 0" fill="none"/>'+
      '<circle cx="41" cy="76" r="4" fill="#f29b9b" fill-opacity=".7" stroke="none"/><circle cx="79" cy="76" r="4" fill="#f29b9b" fill-opacity=".7" stroke="none"/>'+
      '<path class="mouth-closed" d="M53 80 q7 5 14 0" fill="none"/>'+
      '<ellipse class="mouth-open" cx="60" cy="82" rx="5.5" ry="5" fill="#7a2a1e"/>'+
    '</g></svg>'
  };
  var NAME={p:"Professeur Cyber",e:"Camille"};
  function buildComic(d,i,l,subTitle,uid){
    var box=document.createElement("aside"); box.className="tuto comic"; box.setAttribute("aria-label","Dialogue tutoriel, leçon "+(i+1));
    box.innerHTML='<p class="comic-title">Leçon '+(i+1)+' / '+LESSONS.length+' · '+l[1]+(subTitle?' · '+subTitle:'')+'</p>'+
      '<div class="stage" title="Cliquez pour la suite"><figure class="char p">'+TOON.p+'<figcaption>'+NAME.p+'</figcaption></figure>'+
      '<div class="bubbles" aria-live="polite">'+d.map(function(m,k){return '<div class="bubble '+m[0]+'"'+(k?' hidden':'')+'><span class="who">'+NAME[m[0]]+'</span><p>'+m[1]+'</p></div>';}).join("")+'</div>'+
      '<figure class="char e">'+TOON.e+'<figcaption>'+NAME.e+'</figcaption></figure></div>'+
      '<div class="comic-ctrl"><button type="button" class="c-next" id="c-next-'+uid+'">Suite ▸</button><button type="button" class="ghost c-all" id="c-all-'+uid+'">Tout afficher</button><span class="c-count mono"></span></div>';
    var bubbles=box.querySelectorAll(".bubble"), chars={p:box.querySelector(".char.p"),e:box.querySelector(".char.e")};
    var next=box.querySelector(".c-next"), cnt=box.querySelector(".c-count"), n=1, timer;
    function speak(who){
      clearTimeout(timer); chars.p.classList.remove("talking"); chars.e.classList.remove("talking");
      void chars[who].offsetWidth; chars[who].classList.add("talking");
      timer=setTimeout(function(){chars[who].classList.remove("talking");},1600);
    }
    function update(){ cnt.textContent=n+" / "+d.length; next.textContent=n<d.length?"Suite ▸":"Rejouer ↺"; box.classList.toggle("done",n>=d.length); }
    function reveal(){
      if(n>=d.length){ bubbles.forEach(function(b,k){b.hidden=k>0; b.classList.remove("show");}); n=1; pop(bubbles[0]); speak(d[0][0]); update(); return; }
      pop(bubbles[n]); speak(d[n][0]); n++; update();
    }
    function pop(b){ b.hidden=false; b.classList.remove("show"); void b.offsetWidth; b.classList.add("show"); }
    next.addEventListener("click",reveal);
    box.querySelector(".stage").addEventListener("click",function(ev){ if(!ev.target.closest("a") && n<d.length) reveal(); });
    box.querySelector(".c-all").addEventListener("click",function(){ bubbles.forEach(function(b){b.hidden=false;}); n=d.length; update(); });
    update();
    return box;
  }
  LESSONS.forEach(function(l,i){
    if(l[0]!==PAGE) return; var sec=document.querySelector("main section.view"); if(!sec || sec.hasAttribute("data-no-tuto")) return;
    /* Répliques par étape : {"1":[…], "3":[…]} (format généré par docs/build_dialogues.py) */
    var byStep=DIALOGUES[l[0]]||{}, titles=(window.TUTO&&window.TUTO.stepTitles&&window.TUTO.stepTitles[l[0]])||{};
    var steps=[].slice.call(sec.children).filter(function(el){return el.classList.contains("step");});
    Object.keys(byStep).forEach(function(k){
      var box=buildComic(byStep[k],i,l,steps.length>1?titles[k]:"",l[0]+"-"+k);
      var host=steps.length?steps[parseInt(k,10)-1]:sec;
      if(!host) return;
      var anchor=host.querySelector("[data-tuto-anchor]")||host.querySelector(".lead")||host.querySelector("h2")||host.querySelector("h1");
      if(anchor) anchor.insertAdjacentElement("afterend",box); else host.insertBefore(box,host.firstChild);
    });
    var nav=document.createElement("nav"); nav.className="lesson-nav tuto"; nav.setAttribute("aria-label","Navigation entre leçons");
    var prev=LESSONS[i-1], next=LESSONS[i+1];
    nav.innerHTML=(prev?'<a href="../'+prev[0]+'/index.html">← Leçon '+i+' : '+prev[1]+'</a>':'<span></span>')+(next?'<a class="next" href="../'+next[0]+'/index.html">Leçon '+(i+2)+' : '+next[1]+' →</a>':'<a class="next" href="../accueil/index.html">Revenir à l\'accueil</a>');
    sec.appendChild(nav);
  });
  var tb=document.getElementById("tuto-toggle");
  function setTuto(on){
    document.documentElement.classList.toggle("tuto-off",!on);
    tb.setAttribute("aria-pressed",on?"true":"false");
    tb.textContent=on?"Mode tutoriel : activé":"Mode tutoriel : désactivé";
    store("pcr-tuto",on);
  }
  var saved=store("pcr-tuto"); setTuto(saved===null?true:!!saved);
  tb.addEventListener("click",function(){setTuto(tb.getAttribute("aria-pressed")!=="true");});

  /* ---------- Pages découpées en étapes (boutons Précédent / Suivant) ----------
     Toute page dont la section contient des blocs <div class="step" data-title="…"> n'en affiche qu'un à la fois.
     L'étape courante est reprise dans l'adresse (#etape-2) ; la navigation entre leçons n'apparaît qu'à la dernière étape. */
  (function(){
    var sec=document.querySelector("main section.view"); if(!sec) return;
    var steps=[].slice.call(sec.children).filter(function(el){return el.classList.contains("step");});
    if(steps.length<2) return;
    var lnav=sec.querySelector(".lesson-nav");
    var pager=document.createElement("nav"); pager.className="step-pager"; pager.setAttribute("aria-label","Étapes de la page");
    pager.innerHTML='<button type="button" class="ghost step-prev">← Précédent</button><span class="step-count"></span><button type="button" class="step-next">Suivant →</button>';
    steps[steps.length-1].insertAdjacentElement("afterend",pager);
    var prev=pager.querySelector(".step-prev"), next=pager.querySelector(".step-next"), cnt=pager.querySelector(".step-count"), cur=0;
    function go(i,scroll){
      cur=Math.max(0,Math.min(steps.length-1,i));
      steps.forEach(function(st,k){st.hidden=(k!==cur);});
      prev.classList.toggle("is-off",cur===0); prev.disabled=(cur===0);
      next.classList.toggle("is-off",cur===steps.length-1); next.disabled=(cur===steps.length-1);
      var t=steps[cur].getAttribute("data-title");
      cnt.innerHTML='<span class="mono">Étape '+(cur+1)+' / '+steps.length+'</span>'+(t?'<strong>'+t+'</strong>':'');
      if(lnav) lnav.classList.toggle("is-hidden",cur!==steps.length-1);
      try{ history.replaceState(null,"","#etape-"+(cur+1)); }catch(e){}
      if(scroll) window.scrollTo(0,0);
    }
    prev.addEventListener("click",function(){go(cur-1,true);});
    next.addEventListener("click",function(){go(cur+1,true);});
    var m=/^#etape-(\d+)$/.exec(location.hash);
    go(m?parseInt(m[1],10)-1:0,false);
    window.addEventListener("hashchange",function(){ var h=/^#etape-(\d+)$/.exec(location.hash); if(h) go(parseInt(h[1],10)-1,true); });
  })();
})();
