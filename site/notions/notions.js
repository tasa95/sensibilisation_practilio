/* Notions clés : script propre à la page (le menu et la BD sont dans ../shared/common.js).
   Info-bulles des « ? » du schéma « Qui vise quoi, et comment ? » : survol, focus clavier ou toucher. */
(function(){
  var helps=document.querySelectorAll(".tm-help"); if(!helps.length) return;
  var tip=document.createElement("div"); tip.className="tm-tip"; tip.id="tm-tip"; tip.setAttribute("role","tooltip"); tip.hidden=true;
  document.body.appendChild(tip);
  var current=null;
  function show(el){
    current=el; tip.textContent=el.getAttribute("data-desc"); tip.hidden=false;
    el.setAttribute("aria-describedby","tm-tip");
    var r=el.getBoundingClientRect(), w=tip.offsetWidth, h=tip.offsetHeight;
    var x=r.right+10, y=r.top+r.height/2-h/2;
    if(x+w>window.innerWidth-8) x=Math.max(8,r.left-w-10);
    y=Math.max(8,Math.min(y,window.innerHeight-h-8));
    tip.style.left=(x+window.scrollX)+"px"; tip.style.top=(y+window.scrollY)+"px";
  }
  function hide(){ tip.hidden=true; if(current) current.removeAttribute("aria-describedby"); current=null; }
  helps.forEach(function(h){
    h.addEventListener("mouseenter",function(){show(h);});
    h.addEventListener("mouseleave",hide);
    h.addEventListener("focus",function(){show(h);});
    h.addEventListener("blur",hide);
    h.addEventListener("click",function(e){ e.stopPropagation(); if(current===h) hide(); else show(h); });
    h.addEventListener("keydown",function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); if(current===h) hide(); else show(h); } });
  });
  document.addEventListener("click",hide);
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") hide(); });
  window.addEventListener("scroll",function(){ if(current) show(current); },{passive:true});
})();
