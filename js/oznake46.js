// ── v45.8: NOVA RUBRIKA OZNAKE ───────────────────────────────────────────
// Filteri po vozilu / postrojbi / vrsti oznake / bojištu, "Za tvoje makete",
// prikvačivanje na maketu, favoriti, vlastite oznake i preglednik sa zumom.
(function(){
  "use strict";
  const FAC=OZNAKE_FACETS;
  const FAC_NAMES={veh:"Vozilo",unit:"Postrojba",type:"Vrsta oznake",front:"Bojište"};
  const sel={veh:new Set(),unit:new Set(),type:new Set(),front:new Set()};
  let q="",only="all",focusId=null,facetsOpen=false;

  // ── podaci ──
  function ensure(){ if(!Array.isArray(S.oznakeFav))S.oznakeFav=[]; if(!Array.isArray(S.oznakeUser))S.oznakeUser=[]; }
  function all(){ ensure(); return [...S.oznakeUser.map(o=>({...o,mine:true})),...OZNAKE_DATA]; }
  const byId=id=>all().find(o=>o.id===id);
  const isFav=id=>S.oznakeFav.includes(id);
  const pinsOf=m=>Array.isArray(m.oznake)?m.oznake:[];
  const pinnedAnywhere=id=>S.makete.some(m=>pinsOf(m).includes(id));
  const label=(f,k)=>{const x=(FAC[f]||[]).find(t=>t.id===k);return x?x.label:k;};

  // ── prijedlog oznaka za maketu (iz naziva, šifre i komentara) ──
  function maketaHints(m){
    const t=[m.name,m.code,m.mfr,m.comment].join(" ").toLowerCase();
    const veh=[],unit=[],front=[];
    const r=(re,arr,v)=>{if(re.test(t)&&!arr.includes(v))arr.push(v);};
    r(/k[öo]e?nigs?tiger|tiger\s*(ii|2|b)\b|jagdtiger/,veh,"tiger2");
    r(/tiger\s*(i\b|1\b|ausf\.?\s*e)|tiger(?!\s*(ii|2|b)\b)/,veh,"tiger");
    r(/panther|jagdpanther/,veh,"panther");
    r(/pz\.?\s*(kpfw\.?\s*)?iv\b|panzer\s*iv|pz4|jagdpanzer\s*iv/,veh,"pz4");
    r(/pz\.?\s*(kpfw\.?\s*)?iii\b|panzer\s*iii|stug\s*iii/,veh,"pz3");
    r(/stug|jagdpanzer|hetzer|marder|nashorn|elefant|ferdinand/,veh,"stug");
    r(/sd\.?\s*kfz\.?\s*25[01]|halftrack|polugus/,veh,"polug");
    r(/sd\.?\s*kfz\.?\s*(22\d|23\d)|puma|oklopni auto/,veh,"auto");
    r(/hummel|wespe|grille|nashorn/,veh,"sp");
    r(/t-?34|\bis-?\d|kv-?\d|su-?\d/,veh,"sovj");
    r(/sherman|\bm4a?\d?\b.*(ww2|wwii)/,veh,"us");
    r(/dak|afrika|africa|tunis|desert/,unit,"dak"); r(/dak|afrika|africa|tunis/,front,"afrika");
    r(/hitlerjugend|12\.?\s*ss/,unit,"hj"); r(/wiking/,unit,"wiking"); r(/das reich/,unit,"dasreich");
    r(/lssah|leibstandarte/,unit,"lssah"); r(/totenkopf/,unit,"totenkopf"); r(/grossdeutschland|gro[ßs]deutschland/,unit,"gd");
    r(/normand/,front,"zapad"); r(/kursk|harkov|ostfront|east/,front,"istok");
    return {veh,unit,front};
  }
  function suggestFor(m){
    const h=maketaHints(m);
    if(!h.veh.length&&!h.unit.length)return [];
    return all().filter(o=>(h.veh.some(v=>o.tags.veh.includes(v)))||(h.unit.some(u=>o.tags.unit.includes(u))));
  }

  // ── filtriranje ──
  function passes(o,skipFacet){
    for(const f of Object.keys(sel)){
      if(f===skipFacet||!sel[f].size)continue;
      if(!o.tags[f].some(t=>sel[f].has(t)))return false;
    }
    if(q){
      const hay=(o.caption+" "+(o.source||"")+" "+Object.entries(o.tags).flatMap(([f,ts])=>ts.map(t=>label(f,t))).join(" ")).toLowerCase();
      if(!q.split(/\s+/).every(w=>hay.includes(w)))return false;
    }
    if(only==="fav"&&!isFav(o.id))return false;
    if(only==="pin"&&!pinnedAnywhere(o.id))return false;
    if(only==="mine"&&!o.mine)return false;
    if(focusId){
      const m=S.makete.find(x=>x.id===focusId);
      if(m&&only==="focus"&&!pinsOf(m).includes(o.id))return false;
    }
    return true;
  }
  function filtered(){
    const list=all().filter(o=>passes(o));
    if(focusId){const m=S.makete.find(x=>x.id===focusId);const p=m?pinsOf(m):[];list.sort((a,b)=>(p.includes(b.id)?1:0)-(p.includes(a.id)?1:0));}
    return list;
  }

  // ── stranica ──
  function shell(){
    const main=document.querySelector("#page-oznake .main");
    if(!main||main.dataset.oz46)return;
    main.dataset.oz46="1";
    main.innerHTML=`
      <div class="section-hdr oz-hdr">
        <h2 style="color:var(--oznake)">🎖️ Oznake</h2>
        <button class="btn-sm" onclick="ozAddOpen()">+ Dodaj vlastitu</button>
        <input class="nav-search oz-search" id="ozSearch" placeholder="Traži: 503, Wiking, palma, Normandija…" oninput="ozSetQ(this.value)">
      </div>
      <div class="ekv-hint" style="margin-bottom:.6rem">Referentne taktičke oznake, amblemi, kamuflaže i uniforme iz tvoje biblioteke (WWII, ${OZNAKE_DATA.length} slika). Kombiniraj filtere, ★ spremi omiljene, a 📌 prikvači oznake na maketu na kojoj radiš.</div>
      <div id="ozForMe" class="oz-forme"></div>
      <div id="ozFocus"></div>
      <button class="btn-sm oz-facets-toggle" id="ozFacetsToggle" onclick="ozToggleFacets()">⚑ Filteri</button>
      <div id="ozFacets" class="oz-facets"></div>
      <div class="oz-bar">
        <div class="oz-only" id="ozOnly"></div>
        <span class="oz-count" id="ozCount"></span>
        <button class="btn-sm" id="ozClear" onclick="ozClear()">✕ Očisti filtere</button>
      </div>
      <div id="ozGrid" class="oz-grid"></div>`;
  }

  function renderForMe(){
    const el=document.getElementById("ozForMe");if(!el)return;
    const ms=S.makete||[];
    if(!ms.length){el.innerHTML="";return;}
    el.innerHTML=`<div class="oz-sub">Za tvoje makete</div><div class="oz-forme-row">`+ms.map(m=>{
      const p=pinsOf(m).length,s=suggestFor(m).length;
      const img=m.imgs&&m.imgs[0]?m.imgs[0].url:(m.img||"");
      const info=p?`📌 ${p} prikvačeno`:(s?`${s} prijedloga`:`nema u katalogu`);
      return `<button class="oz-mk${focusId===m.id?" on":""}${!p&&!s?" none":""}" onclick="ozFocus('${m.id}')" title="${esc(m.name)}">
        ${img?`<img src="${esc(img)}" alt="" loading="lazy">`:`<span class="oz-mk-ph">⬡</span>`}
        <span class="oz-mk-t"><b>${esc(m.name)}</b><small>${info}</small></span></button>`;
    }).join("")+`</div>`;
  }
  function renderFocus(){
    const el=document.getElementById("ozFocus");if(!el)return;
    const m=focusId&&S.makete.find(x=>x.id===focusId);
    if(!m){el.innerHTML="";return;}
    const h=maketaHints(m),p=pinsOf(m).length;
    const hint=[...h.veh.map(v=>label("veh",v)),...h.unit.map(u=>label("unit",u))].join(", ");
    el.innerHTML=`<div class="oz-focus">
      <div><b>📌 Odabir oznaka za: ${esc(m.name)}</b>
      <small>${p?`${p} prikvačeno (prikazane prve) · `:""}${hint?`prijedlog po: ${esc(hint)}`:`za ovo vozilo nema oznaka u katalogu — dodaj vlastite (+ Dodaj vlastitu)`}. Klik na 📌 na slici prikvači/otkvači je na ovu maketu.</small></div>
      <div class="oz-focus-btns">${p?`<button class="btn-sm" onclick="ozOnlyFocus()">Samo prikvačene</button>`:""}<button class="btn-sm" onclick="ozFocus(null)">✕ Zatvori</button></div></div>`;
  }
  function renderFacets(){
    const el=document.getElementById("ozFacets");if(!el)return;
    el.classList.toggle("open",facetsOpen);
    const base=all();
    el.innerHTML=Object.keys(sel).map(f=>{
      const chips=(FAC[f]||[]).map(t=>{
        const n=base.filter(o=>o.tags[f].includes(t.id)&&passes(o,f)).length;
        const on=sel[f].has(t.id);
        if(!n&&!on)return "";
        return `<button class="oz-chip${on?" on":""}" onclick="ozToggle('${f}','${t.id}')">${esc(t.label)} <i>${n}</i></button>`;
      }).join("");
      return `<div class="oz-facet"><span class="oz-flabel">${FAC_NAMES[f]}</span><div class="oz-chips">${chips||'<span class="oz-none">—</span>'}</div></div>`;
    }).join("");
    const n=Object.values(sel).reduce((a,s)=>a+s.size,0);
    const t=document.getElementById("ozFacetsToggle");if(t)t.textContent=`⚑ Filteri${n?` (${n})`:""} ${facetsOpen?"▴":"▾"}`;
  }
  function renderOnly(){
    const el=document.getElementById("ozOnly");if(!el)return;
    ensure();
    const nPin=all().filter(o=>pinnedAnywhere(o.id)).length;
    const opts=[["all","Sve"],["fav",`★ Favoriti (${S.oznakeFav.length})`],["pin",`📌 Prikvačene (${nPin})`],["mine",`🖼 Moje (${S.oznakeUser.length})`]];
    el.innerHTML=opts.map(([k,l])=>`<button class="oz-tab${only===k?" on":""}" onclick="ozOnly('${k}')">${l}</button>`).join("");
  }
  function card(o){
    const m=focusId&&S.makete.find(x=>x.id===focusId);
    const pinnedHere=m&&pinsOf(m).includes(o.id);
    const pinCount=S.makete.filter(x=>pinsOf(x).includes(o.id)).length;
    const pills=Object.entries(o.tags).flatMap(([f,ts])=>ts.slice(0,f==="type"?1:2).map(t=>`<span class="oz-pill oz-p-${f}">${esc(label(f,t))}</span>`)).slice(0,4).join("");
    return `<div class="oz-card${pinnedHere?" pinned":""}" data-id="${o.id}">
      <div class="oz-img" onclick="ozView('${o.id}')"><img src="${esc(o.src)}" alt="${esc(o.caption)}" loading="lazy">${o.mine?'<span class="oz-mine">moja</span>':""}</div>
      <div class="oz-acts">
        <button class="oz-act${isFav(o.id)?" on":""}" title="Favorit" onclick="ozFav('${o.id}',event)">★</button>
        <button class="oz-act${pinnedHere||(!m&&pinCount)?" on":""}" title="${m?"Prikvači na "+esc(m.name):"Prikvači na maketu"}" onclick="ozPin('${o.id}',event)">📌${pinCount&&!m?`<i>${pinCount}</i>`:""}</button>
      </div>
      <div class="oz-body" onclick="ozView('${o.id}')">
        <div class="oz-cap">${esc(o.caption)}</div>
        ${o.source?`<div class="oz-src">📖 ${esc(o.source)}</div>`:""}
        <div class="oz-pills">${pills}</div>
      </div></div>`;
  }
  let shownIds=[];
  function render(){
    shell();renderForMe();renderFocus();renderFacets();renderOnly();
    const list=filtered();shownIds=list.map(o=>o.id);
    const total=all().length;
    const c=document.getElementById("ozCount");if(c)c.textContent=`${list.length} od ${total}`;
    const clr=document.getElementById("ozClear");if(clr)clr.style.display=(Object.values(sel).some(s=>s.size)||q||only!=="all")?"":"none";
    const g=document.getElementById("ozGrid");if(!g)return;
    g.innerHTML=list.length?list.map(card).join(""):`<div class="no-results">Nema oznaka za odabrane filtere.${only==="mine"?" Dodaj vlastitu gumbom „+ Dodaj vlastitu”.":""}</div>`;
  }

  // ── akcije ──
  window.ozSetQ=v=>{q=String(v||"").trim().toLowerCase();render();};
  window.ozToggle=(f,k)=>{sel[f].has(k)?sel[f].delete(k):sel[f].add(k);render();};
  window.ozOnly=k=>{only=k;render();};
  window.ozOnlyFocus=()=>{only="focus";render();};
  window.ozToggleFacets=()=>{facetsOpen=!facetsOpen;renderFacets();};
  window.ozClear=()=>{Object.values(sel).forEach(s=>s.clear());q="";only="all";const s=document.getElementById("ozSearch");if(s)s.value="";render();};
  window.ozFocus=id=>{
    focusId=id;Object.values(sel).forEach(s=>s.clear());only="all";
    if(id){const m=S.makete.find(x=>x.id===id);if(m){const h=maketaHints(m);
      if(pinsOf(m).length&&!h.veh.length&&!h.unit.length)only="focus";
      h.veh.forEach(v=>sel.veh.add(v));if(!h.veh.length)h.unit.forEach(u=>sel.unit.add(u));}}
    render();
    const g=document.getElementById("ozFocus");if(g&&id)g.scrollIntoView({behavior:"smooth",block:"start"});
  };
  window.ozFav=(id,e)=>{if(e)e.stopPropagation();ensure();const i=S.oznakeFav.indexOf(id);i>=0?S.oznakeFav.splice(i,1):S.oznakeFav.push(id);save();render();vRender();};
  window.ozPin=(id,e)=>{
    if(e)e.stopPropagation();
    const m=focusId&&S.makete.find(x=>x.id===focusId);
    if(m){togglePin(m,id);return;}
    pinMenu(id,e&&e.currentTarget);
  };
  function togglePin(m,id){
    if(!Array.isArray(m.oznake))m.oznake=[];
    const i=m.oznake.indexOf(id);
    if(i>=0){m.oznake.splice(i,1);showToast("Otkvačeno s: "+m.name);}else{m.oznake.push(id);showToast("📌 Prikvačeno na: "+m.name);}
    save();render();vRender();
  }
  function pinMenu(id,anchor){
    closePinMenu();
    const ms=S.makete||[];
    if(!ms.length){showToast("Nemaš maketa — dodaj maketu u rubrici Makete");return;}
    const box=document.createElement("div");box.className="oz-pinmenu";box.id="ozPinMenu";
    box.innerHTML=`<div class="oz-sub" style="margin:0 0 6px">Prikvači na maketu</div>`+ms.map(m=>`<label><input type="checkbox" ${pinsOf(m).includes(id)?"checked":""} onchange="ozPinToggle('${m.id}','${id}')"> ${esc(m.name)}</label>`).join("")+`<button class="btn-sm" style="margin-top:6px;width:100%" onclick="ozClosePin()">Gotovo</button>`;
    document.body.appendChild(box);
    const r=anchor?anchor.getBoundingClientRect():{left:innerWidth/2,bottom:innerHeight/2};
    const w=240;box.style.left=Math.max(8,Math.min(innerWidth-w-8,r.left-w+40))+"px";
    box.style.top=Math.min(innerHeight-box.offsetHeight-8,r.bottom+6)+"px";
    setTimeout(()=>document.addEventListener("click",outside,true),0);
  }
  function outside(e){const b=document.getElementById("ozPinMenu");if(b&&!b.contains(e.target))closePinMenu();}
  function closePinMenu(){const b=document.getElementById("ozPinMenu");if(b)b.remove();document.removeEventListener("click",outside,true);}
  window.ozClosePin=closePinMenu;
  window.ozPinToggle=(mid,id)=>{const m=S.makete.find(x=>x.id===mid);if(!m)return;
    if(!Array.isArray(m.oznake))m.oznake=[];const i=m.oznake.indexOf(id);i>=0?m.oznake.splice(i,1):m.oznake.push(id);save();render();vRender();};

  // ── preglednik sa zumom ──
  let vIdx=0,vList=[],z=1,tx=0,ty=0;
  function vEl(){
    let v=document.getElementById("ozViewer");if(v)return v;
    v=document.createElement("div");v.id="ozViewer";v.className="oz-viewer";
    v.innerHTML=`<div class="oz-v-stage" id="ozVStage"><img id="ozVImg" alt="" draggable="false"></div>
      <button class="oz-v-btn oz-v-close" onclick="ozViewClose()" title="Zatvori (Esc)">✕</button>
      <button class="oz-v-btn oz-v-prev" onclick="ozViewNav(-1)" title="Prethodna (←)">‹</button>
      <button class="oz-v-btn oz-v-next" onclick="ozViewNav(1)" title="Sljedeća (→)">›</button>
      <div class="oz-v-zoom"><button class="oz-v-btn" onclick="ozZoom(1.4)">+</button><button class="oz-v-btn" onclick="ozZoom(1/1.4)">−</button><button class="oz-v-btn" onclick="ozZoomReset()">1:1</button></div>
      <div class="oz-v-info" id="ozVInfo"></div>`;
    document.body.appendChild(v);
    const st=v.querySelector("#ozVStage");
    st.addEventListener("wheel",e=>{e.preventDefault();zoomAt(e.deltaY<0?1.2:1/1.2,e.clientX,e.clientY);},{passive:false});
    const pts=new Map();let last=null,pinch=null;
    st.addEventListener("pointerdown",e=>{st.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});last={x:e.clientX,y:e.clientY};
      if(pts.size===2){const [a,b]=[...pts.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),z};}});
    st.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pts.size===2&&pinch){const [a,b]=[...pts.values()];const d=Math.hypot(a.x-b.x,a.y-b.y);setZ(pinch.z*d/pinch.d);return;}
      if(z>1&&last){tx+=e.clientX-last.x;ty+=e.clientY-last.y;apply();}last={x:e.clientX,y:e.clientY};});
    const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size)last=null;};
    st.addEventListener("pointerup",up);st.addEventListener("pointercancel",up);
    st.addEventListener("dblclick",e=>{z>1?resetZ():zoomAt(2.5,e.clientX,e.clientY);});
    let sx=null;st.addEventListener("touchstart",e=>{if(e.touches.length===1&&z<=1)sx=e.touches[0].clientX;},{passive:true});
    st.addEventListener("touchend",e=>{if(sx!=null&&z<=1){const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>60)ozViewNav(dx<0?1:-1);}sx=null;});
    return v;
  }
  function apply(){const i=document.getElementById("ozVImg");if(i)i.style.transform=`translate(${tx}px,${ty}px) scale(${z})`;}
  function setZ(n){z=Math.max(1,Math.min(8,n));if(z===1){tx=0;ty=0;}apply();}
  function zoomAt(f,cx,cy){const st=document.getElementById("ozVStage").getBoundingClientRect();const ox=cx-st.left-st.width/2,oy=cy-st.top-st.height/2;const nz=Math.max(1,Math.min(8,z*f));tx=ox-(ox-tx)*(nz/z);ty=oy-(oy-ty)*(nz/z);z=nz;if(z===1){tx=0;ty=0;}apply();}
  function resetZ(){z=1;tx=0;ty=0;apply();}
  window.ozZoom=f=>{const st=document.getElementById("ozVStage").getBoundingClientRect();zoomAt(f,st.left+st.width/2,st.top+st.height/2);};
  window.ozZoomReset=resetZ;
  function vRender(){
    const v=document.getElementById("ozViewer");if(!v||!v.classList.contains("show"))return;
    const o=byId(vList[vIdx]);if(!o)return;
    const img=document.getElementById("ozVImg");
    if(img.dataset.id!==o.id){img.dataset.id=o.id;img.src=o.src;resetZ();
      if(o.hi){const hi=new Image();hi.onload=()=>{if(img.dataset.id===o.id){img.src=o.hi;const b=document.getElementById("ozVHd");if(b)b.classList.add("on");}};hi.src=o.hi;}}
    const m=focusId&&S.makete.find(x=>x.id===focusId);
    const tags=Object.entries(o.tags).flatMap(([f,ts])=>ts.map(t=>`<span class="oz-pill oz-p-${f}">${esc(label(f,t))}</span>`)).join("");
    document.getElementById("ozVInfo").innerHTML=`<div class="oz-v-cap">${esc(o.caption)}</div>
      ${o.source?`<div class="oz-v-src">📖 ${esc(o.source)}</div>`:""}<div class="oz-pills">${tags}</div>
      <div class="oz-v-acts"><span class="oz-v-n">${vIdx+1} / ${vList.length}</span>
        <button class="btn-sm${isFav(o.id)?" on":""}" onclick="ozFav('${o.id}')">★ ${isFav(o.id)?"Favorit":"Dodaj u favorite"}</button>
        <button class="btn-sm" onclick="ozPin('${o.id}',event)">📌 ${m?(pinsOf(m).includes(o.id)?"Otkvači s "+esc(m.name):"Prikvači na "+esc(m.name)):"Prikvači na maketu"}</button>
        ${o.mine?`<button class="btn-sm" style="color:var(--nemam-txt)" onclick="ozDelMine('${o.id}')">🗑 Obriši</button>`:""}
        ${o.hi?`<span class="oz-v-hd${document.getElementById("ozVImg").getAttribute("src")===o.hi?" on":""}" id="ozVHd" title="Slika u visokoj rezoluciji iz knjige">HD</span>`:""}<span class="oz-v-hint">kotačić / dvoklik / dva prsta = zum · povuci = pomak</span></div>`;
  }
  window.ozView=id=>{vList=shownIds.length?shownIds:[id];vIdx=Math.max(0,vList.indexOf(id));const v=vEl();v.classList.add("show");resetZ();vRender();document.addEventListener("keydown",vKey);};
  window.ozViewNav=d=>{vIdx=(vIdx+d+vList.length)%vList.length;vRender();};
  window.ozViewClose=()=>{const v=document.getElementById("ozViewer");if(v)v.classList.remove("show");document.removeEventListener("keydown",vKey);closePinMenu();};
  function vKey(e){if(e.key==="Escape")ozViewClose();if(e.key==="ArrowLeft")ozViewNav(-1);if(e.key==="ArrowRight")ozViewNav(1);if(e.key==="+")ozZoom(1.4);if(e.key==="-")ozZoom(1/1.4);}

  // ── vlastite oznake ──
  let addFiles=[],addTags={veh:new Set(),unit:new Set(),type:new Set(),front:new Set()};
  window.ozAddOpen=()=>{
    addFiles=[];Object.values(addTags).forEach(s=>s.clear());
    let ov=document.getElementById("ozAddModal");if(ov)ov.remove();
    ov=document.createElement("div");ov.id="ozAddModal";ov.className="modal-overlay";
    ov.innerHTML=`<div class="modal" style="max-width:560px;width:94%">
      <h3>+ Dodaj vlastitu oznaku</h3>
      <div class="ekv-hint" style="margin:4px 0 10px">Fotografija arka dekala, stranica iz knjige ili slika s interneta (npr. oznake za M60A1, Bradley, Grizzly). Može više slika odjednom.</div>
      <label>Slike</label><input type="file" id="ozAddFile" accept="image/*" multiple onchange="ozAddFiles(this.files)">
      <div id="ozAddPrev" class="oz-add-prev"></div>
      <label>Opis</label><input type="text" id="ozAddCap" placeholder="npr. US Marines M60A1 – taktički brojevi, Desert Storm">
      <label>Izvor (opcionalno)</label><input type="text" id="ozAddSrc" placeholder="npr. Tamiya 35157 – arak dekala">
      <label>Oznake za filtere</label><div id="ozAddTags"></div>
      <label>Prikvači na maketu</label><select id="ozAddMk"><option value="">— ne —</option>${(S.makete||[]).map(m=>`<option value="${m.id}"${focusId===m.id?" selected":""}>${esc(m.name)}</option>`).join("")}</select>
      <div class="modal-btns" style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button class="btn-sm" onclick="document.getElementById('ozAddModal').remove()">Odustani</button><button class="btn-export" onclick="ozAddSave()">Spremi</button></div></div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click",e=>{if(e.target===ov)ov.remove();});
    renderAddTags();
  };
  function renderAddTags(){
    const el=document.getElementById("ozAddTags");if(!el)return;
    el.innerHTML=Object.keys(addTags).map(f=>`<div class="oz-facet"><span class="oz-flabel">${FAC_NAMES[f]}</span><div class="oz-chips">${(FAC[f]||[]).map(t=>`<button type="button" class="oz-chip${addTags[f].has(t.id)?" on":""}" onclick="ozAddTag('${f}','${t.id}')">${esc(t.label)}</button>`).join("")}</div></div>`).join("");
  }
  window.ozAddTag=(f,k)=>{addTags[f].has(k)?addTags[f].delete(k):addTags[f].add(k);renderAddTags();};
  window.ozAddFiles=async files=>{
    addFiles=[];const pv=document.getElementById("ozAddPrev");pv.innerHTML="⏳";
    for(const f of [...files]){try{addFiles.push(await compressImage(f,1800,0.85));}catch(e){}}
    pv.innerHTML=addFiles.map(s=>`<img src="${s}">`).join("");
  };
  window.ozAddSave=()=>{
    if(!addFiles.length){showToast("Odaberi barem jednu sliku");return;}
    ensure();
    const cap=document.getElementById("ozAddCap").value.trim()||"Vlastita oznaka";
    const src=document.getElementById("ozAddSrc").value.trim();
    const mk=document.getElementById("ozAddMk").value;
    const tags={};Object.keys(addTags).forEach(f=>tags[f]=[...addTags[f]]);
    if(!tags.type.length)tags.type=["amblem"];
    const ids=[];
    addFiles.forEach((data,i)=>{const id="ozu_"+Date.now()+"_"+i;ids.push(id);
      S.oznakeUser.unshift({id,src:data,caption:addFiles.length>1?`${cap} (${i+1})`:cap,source:src,tags:JSON.parse(JSON.stringify(tags)),createdAt:Date.now()});});
    if(mk){const m=S.makete.find(x=>x.id===mk);if(m){if(!Array.isArray(m.oznake))m.oznake=[];m.oznake.push(...ids);}}
    save();document.getElementById("ozAddModal").remove();
    showToast(`✓ Dodano ${ids.length} ${ids.length===1?"oznaka":"oznaka"}`);
    only="mine";render();
  };
  window.ozDelMine=async id=>{
    const ok=await customConfirm("Obrisati ovu vlastitu oznaku?","Obriši oznaku");if(!ok)return;
    ensure();S.oznakeUser=S.oznakeUser.filter(o=>o.id!==id);
    S.makete.forEach(m=>{if(Array.isArray(m.oznake))m.oznake=m.oznake.filter(x=>x!==id);});
    S.oznakeFav=S.oznakeFav.filter(x=>x!==id);save();ozViewClose();render();
  };

  // ── spajanje s ostatkom aplikacije ──
  window.renderOznake=render;
  window.openOznakeForModel=function(maketaId){
    search="";const si=document.getElementById("searchInput");if(si)si.value="";
    showPage("oznake",document.querySelector(".nav-tab.t-oznake"));
    ozFocus(maketaId);
  };
  window.ozPinnedCount=m=>pinsOf(m).length;
  if(typeof page!=="undefined"&&page==="oznake")render();
})();
