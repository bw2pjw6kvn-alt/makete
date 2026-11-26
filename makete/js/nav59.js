// ── v45.46: ← Natrag (gumb i gesta/tipka „natrag”) · 🎨 bolja pretraga RAL / FS / RLM boja ──
(function(){
  "use strict";
  const $=id=>document.getElementById(id);

  // ═════ ← NATRAG ═════
  // Svaka promjena stranice i svaki otvoreni prozor dodaju korak u povijest preglednika,
  // pa i tipka „natrag” na mobitelu/mišu radi. Gumb ← u zaglavlju radi isto (bitno za iPhone aplikaciju bez trake preglednika).
  let depth=0,silent=false;
  const curPage=()=>{try{return page;}catch(e){return "inventar";}};
  try{history.replaceState({mk59:1,p:curPage()},"");}catch(e){}

  function openModals(){
    const L=[];
    const lb=$("lightbox");if(lb&&lb.classList.contains("show"))L.push({el:lb,close:()=>{try{closeLightbox();}catch(e){lb.classList.remove("show");}}});
    const oz=$("ozViewer");if(oz&&oz.classList.contains("show"))L.push({el:oz,close:()=>{const b=oz.querySelector('[onclick*="lose"],.oz-v-close,.oz-close');if(b)b.click();else oz.classList.remove("show");}});
    document.querySelectorAll(".modal-overlay").forEach(el=>{
      const cs=getComputedStyle(el);if(cs.display==="none"||cs.visibility==="hidden")return;
      if(el.id==="customDialogModal")return; // potvrde ne zatvaramo „natrag” gumbom
      L.push({el,close:()=>{
        const btns=[...el.querySelectorAll("button")];
        const b=btns.find(x=>/^\s*(close[A-Z]\w*\(\s*\)|document\.getElementById\('[^']+'\)\.remove\(\)|close47\('[^']+'\)|closeData46\(\))\s*;?\s*$/.test(x.getAttribute("onclick")||""))
          ||btns.find(x=>/^(zatvori|odustani|close|natrag)\b/i.test(x.textContent.trim()))
          ||btns.slice(0,3).find(x=>/^(✕|×)$/.test(x.textContent.trim()));
        if(b){b.click();return;}
        if(!el.parentNode||el.dataset.static==="1"){el.style.display="none";return;}
        // dinamički prozori (npr. Provjera faze) se uklanjaju, statični se skrivaju
        if(/Modal46$|^qa50|^oi50|^prog47|^have47|^need|^dio52|^scale53|^refs48/i.test(el.id||""))el.remove();else el.style.display="none";
      }});
    });
    // najviši (zadnji u DOM-u / najveći z-index) prvi
    return L.sort((a,b)=>(parseInt(getComputedStyle(b.el).zIndex)||0)-(parseInt(getComputedStyle(a.el).zIndex)||0));
  }
  function closeTop(){const L=openModals();if(!L.length)return false;try{L[0].close();}catch(e){}return true;}

  const _sp=window.showPage;
  window.showPage=function(p,btn){
    const prev=curPage();const r=_sp.apply(this,arguments);
    if(!silent&&p!==prev){try{history.pushState({mk59:1,p},"");depth++;}catch(e){}}
    upd();return r;
  };
  // kad se otvori prozor, dodaj korak u povijest (da „natrag” zatvori prozor umjesto izlaska iz aplikacije)
  let lastOpen=0;
  let raf=0;
  const check=()=>{raf=0;const n=openModals().length;if(n>lastOpen){try{history.pushState({mk59:1,p:curPage(),m:1},"");depth++;}catch(e){}}lastOpen=n;upd();const f=$("back59f");if(f)f.style.display=n?"flex":"none";};
  const mo=new MutationObserver(()=>{if(!raf)raf=requestAnimationFrame(check);});
  mo.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["style","class"]});

  window.addEventListener("popstate",e=>{
    depth=Math.max(0,depth-1);
    if(closeTop()){lastOpen=openModals().length;upd();return;}
    const st=e.state||{};const p=st.p||"inventar";
    if(p!==curPage()){silent=true;try{const t=document.querySelector(".nav-tab.t-"+p.replace("inventar","inv"));showPage(p,t||undefined);}catch(x){console.warn("back59",x);}finally{silent=false;}}
    window.scrollTo({top:0});upd();
  });
  window.goBack59=()=>{if(depth>0){history.back();return;}if(!closeTop()&&curPage()!=="inventar"){silent=true;try{showPage("inventar");}finally{silent=false;}}upd();};

  function upd(){
    const b=$("back59");if(!b)return;
    const show=depth>0||openModals().length>0||curPage()!=="inventar";
    b.style.visibility=show?"visible":"hidden";
  }
  (function button(){
    const logo=document.querySelector(".nav-logo");if(!logo||$("back59"))return;
    const b=document.createElement("button");b.id="back59";b.className="back59";b.type="button";b.title="Natrag";b.setAttribute("aria-label","Natrag");b.textContent="←";
    b.onclick=e=>{e.stopPropagation();goBack59();};
    logo.parentNode.insertBefore(b,logo);upd();
  })();
  // gumb ← plutajući iznad prozora (prozori prekrivaju zaglavlje)
  (function floatBtn(){
    const f=document.createElement("button");f.id="back59f";f.className="back59 back59f";f.type="button";f.textContent="←";f.title="Natrag (zatvori prozor)";
    f.onclick=e=>{e.stopPropagation();goBack59();};document.body.appendChild(f);
    f.style.display="none";
  })();

  // ═════ 🎨 RAL / FS / RLM U PRETRAZI BOJA ═════
  function extras(){
    if(typeof COLOR_SEARCH_MAP==="undefined")return;
    const has=new Set(Object.keys(typeof RAL_COLORS!=="undefined"?RAL_COLORS:{}));
    const EQ=typeof EQUIV_DATA!=="undefined"?EQUIV_DATA:[];
    // povijesni / vojni RAL-ovi iz AK tablice (npr. 7027 Grau, 8020 Braun, 7017 Dunkelbraun) – nijanse po AK 3Gen
    EQ.forEach(e=>{
      if(!e.swatch)return;
      String(e.ral||"").split(/[\/,;]| ili /).map(x=>(x.match(/\d{4}/)||[])[0]).filter(Boolean).forEach(r=>{
        const nm=String(e.name).replace(/^RAL\s*\d{4}\s*/i,"").replace(/\s*\(FS\s*\d+\)/i,"")||e.name;const lbl=`RAL ${r} – ${nm} (AK ${String(e.code).replace(/^AK/,"")})`;
        if(!COLOR_SEARCH_MAP[lbl])COLOR_SEARCH_MAP[lbl]=e.swatch;});
      const f=(String(e.fs||"").match(/\d{5}/)||[])[0];if(f){const l=`FS ${f} – ${String(e.name).replace(/\s*\(FS\s*\d+\)/i,"")} (AK ${String(e.code).replace(/^AK/,"")})`;if(!COLOR_SEARCH_MAP[l])COLOR_SEARCH_MAP[l]=e.swatch;}
      const rl=(String(e.rlm||"").match(/\d{2,3}/)||[])[0];if(rl){const l=`RLM ${rl} – ${e.name} (AK ${String(e.code).replace(/^AK/,"")})`;if(!COLOR_SEARCH_MAP[l])COLOR_SEARCH_MAP[l]=e.swatch;}
    });
    // dopuna vojnih RAL-ova koji nisu u AK tablici (okvirne nijanse)
    const MIL={"7027":["Grau (DAK 1942–43)","#6e6c5b"],"8020":["Braun (DAK 1942–43)","#9b7946"],"7017":["Dunkelbraun (1940)","#4e3e2f"],"1039":["Sandbeige (Bundeswehr)","#ac964f"],"6031":["Bronzegrün (Bundeswehr)","#3e4a39"],"8027":["Lederbraun (Bundeswehr)","#4b3a2f"],"9021":["Teerschwarz","#1c1d1e"],"6014":["Gelboliv","#474135"],"8031":["Sandbraun","#a08a68"],"7050":["Tarngrau","#8f8b75"],"6040":["Hellolive","#7a7349"]};
    Object.entries(MIL).forEach(([r,[n,h]])=>{if(!Object.keys(COLOR_SEARCH_MAP).some(k=>k.startsWith("RAL "+r+" ")))COLOR_SEARCH_MAP[`RAL ${r} – ${n}`]=h;});
    const dl=$("colorDatalistOptions");if(dl)dl.innerHTML=Object.keys(COLOR_SEARCH_MAP).sort().map(l=>`<option value="${esc(l)}"></option>`).join("");
  }
  const _bci=window.buildColorSearchIndex;
  if(_bci)window.buildColorSearchIndex=function(){const r=_bci.apply(this,arguments);try{extras();}catch(e){console.warn(e);}return r;};
  try{if(typeof COLOR_SEARCH_MAP!=="undefined"&&Object.keys(COLOR_SEARCH_MAP).length)extras();}catch(e){}

  const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]/g,"");
  function matches(q){
    const raw=String(q||"").trim();if(!raw)return [];
    const num=(raw.match(/\d{2,5}/)||[])[0],pre=(raw.match(/^(ral|fs|rlm)/i)||[])[1];
    const nq=norm(raw);
    const keys=Object.keys(COLOR_SEARCH_MAP);
    let L=keys.filter(k=>{
      if(num){const kn=(k.match(/^(RAL|FS|RLM) (\d+)/)||[]);if(!kn.length)return false;if(pre&&kn[1].toLowerCase()!==pre.toLowerCase())return false;return kn[2]===num||(num.length>=3&&kn[2].startsWith(num));}
      return norm(k).includes(nq);
    });
    L.sort((a,b)=>{const ea=num&&a.includes(" "+num+" ")?0:1,eb=num&&b.includes(" "+num+" ")?0:1;const ka=/\(AK /.test(a)?1:0,kb=/\(AK /.test(b)?1:0;return ea-eb||ka-kb||a.localeCompare(b);});
    return L.slice(0,10);
  }
  function pick(label){
    const inp=$("pmColorSearch");if(!inp)return;inp.value=label;
    const hex=COLOR_SEARCH_MAP[label],prev=$("colorSearchPreview"),lbl=$("colorSearchHexLbl");
    if(hex&&prev){prev.style.background=hex;prev.dataset.hex=hex;lbl.textContent=hex+" · "+label.replace(/^(RAL|FS|RLM) /,"$1 ");}
    const s=$("pmColorSugg");if(s)s.innerHTML="";
  }
  window.pickColor59=i=>{const s=$("pmColorSugg");const b=s&&s.querySelectorAll("button")[i];if(b)pick(b.dataset.l);};
  window.onColorSearchInput=function(){
    const inp=$("pmColorSearch");if(!inp)return;
    let box=$("pmColorSugg");
    if(!box){box=document.createElement("div");box.id="pmColorSugg";box.className="csugg59";inp.after(box);
      inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();const f=box.querySelector("button");if(f){pick(f.dataset.l);}if($("colorSearchPreview").dataset.hex)addSwatchFromSearch();}});}
    const val=inp.value,prev=$("colorSearchPreview"),lbl=$("colorSearchHexLbl");
    if(COLOR_SEARCH_MAP[val]){pick(val);return;}
    const L=matches(val);
    box.innerHTML=L.map((l,i)=>`<button type="button" data-l="${esc(l)}" onclick="pickColor59(${i})"><span class="color-swatch" style="background:${esc(COLOR_SEARCH_MAP[l])}"></span>${esc(l)}</button>`).join("")
      +(val.trim()&&!L.length?`<div class="csugg59-none">Nema te oznake u popisu – odaberi nijansu na kotaču boja ili upiši RGB.</div>`:"");
    if(L.length===1||(L.length&&/^\s*(ral|fs|rlm)?\s*\d{4,5}\s*$/i.test(val)&&L[0].includes(" "+(val.match(/\d+/)||[""])[0]+" "))){
      const h=COLOR_SEARCH_MAP[L[0]];prev.style.background=h;prev.dataset.hex=h;lbl.textContent=h+" · "+L[0];
    }else{prev.style.background="#888";delete prev.dataset.hex;lbl.textContent="—";}
  };
  const _add=window.addSwatchFromSearch;
  if(_add)window.addSwatchFromSearch=function(){const r=_add.apply(this,arguments);const s=$("pmColorSugg");if(s)s.innerHTML="";return r;};
})();
