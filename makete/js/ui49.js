// ── v45.19: zatvori/otvori sve rubrike u Inventaru · teme boja ──
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const cats=()=>(typeof orderedCats==="function"?orderedCats():Object.keys(S.inventar||{}));

  // ═════ Zatvori / otvori sve rubrike ═════
  const KEY="__cats49";   // "closed" = rubrike se otvaraju zatvorene i nakon ponovnog pokretanja
  function applyDefault(){
    if(AppStore.getItem(KEY)!=="closed")return;
    cats().forEach(c=>{if(safeSessionGet("o_"+c)===null)safeSessionSet("o_"+c,"0");});
  }
  window.collapseAll49=function(open){
    cats().forEach(c=>{
      safeSessionSet("o_"+c,open?"1":"0");
      const cd=S.inventar[c];
      if(cd)(cd.items||[]).forEach(it=>{if(it.subgroup)safeSessionSet("sg_"+c+"::"+it.subgroup,open?"1":"0");});
    });
    AppStore.setItem(KEY,open?"open":"closed");
    if(typeof renderInv==="function")renderInv();
    showToast(open?"⊞ Sve rubrike otvorene":"⊟ Sve rubrike zatvorene");
  };
  (function bar(){
    const pg=$("page-inventar"),mc=$("mainContent");if(!pg||!mc||$("inv49Bar"))return;
    const b=document.createElement("div");b.className="main inv49-bar";b.id="inv49Bar";
    b.innerHTML=`<small id="inv49Info"></small>
      <button class="btn-sm" onclick="collapseAll49(false)" title="Zatvori sve rubrike i komplete">⊟ Zatvori sve</button>
      <button class="btn-sm" onclick="collapseAll49(true)" title="Otvori sve rubrike">⊞ Otvori sve</button>`;
    pg.insertBefore(b,mc);
  })();
  function info(){
    const el=$("inv49Info");if(!el)return;
    const C=cats().filter(c=>S.inventar[c]);const open=C.filter(c=>safeSessionGet("o_"+c)!=="0").length;
    el.textContent=`${C.length} rubrika · otvoreno ${open}`;
  }
  const _ri=window.renderInv;window.renderInv=function(){applyDefault();const r=_ri.apply(this,arguments);info();return r;};
  const _tc=window.toggleCat;window.toggleCat=function(){const r=_tc.apply(this,arguments);info();return r;};
  applyDefault();try{if(page==="inventar")renderInv();}catch(e){}

  // ═════ Teme boja ═════
  const THEMES=[
    {id:"",name:"Grafit",desc:"izvorna tamna",sw:["#0d0f12","#20252c","#7d9bb5","#c2a04a"],meta:"#0b0d12"},
    {id:"feldgrau",name:"Feldgrau",desc:"tamna sivo-zelena",sw:["#121410","#272c22","#9aab86","#c8a95a"],meta:"#141711"},
    {id:"pustinja",name:"Pustinja (DAK)",desc:"topla pješčana",sw:["#16120c","#2e261b","#d4b27a","#e2b85c"],meta:"#1a150e"},
    {id:"dak",name:"DAK",desc:"tamna pješčana, izraženija",sw:["#231d12","#433722","#e0b867","#a9c77f"],meta:"#261f13"},
    {id:"dak-svijetla",name:"DAK svijetla",desc:"Sandgelb, svijetla",sw:["#d9c9a4","#efe5cc","#7a5a26","#3f6b2f"],meta:"#d9c9a4"},
    {id:"mornarica",name:"Mornarica",desc:"tamno plava",sw:["#0a101b","#1a2a3e","#6fa8dc","#d4b25a"],meta:"#0c1320"},
    {id:"dnevna",name:"Dnevna",desc:"svijetla, za dan",sw:["#f2efe8","#ffffff","#3f6f99","#9a7a22"],meta:"#f2efe8"},
  ];
  const TKEY="__theme49";
  function applyTheme(id){
    const t=THEMES.find(x=>x.id===id)||THEMES[0];
    if(t.id)document.documentElement.dataset.theme=t.id;else delete document.documentElement.dataset.theme;
    const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t.meta;
  }
  applyTheme(AppStore.getItem(TKEY)||"");
  window.setTheme49=function(id){AppStore.setItem(TKEY,id);applyTheme(id);renderThemes();};
  function renderThemes(){
    const g=$("theme49Grid");if(!g)return;const cur=AppStore.getItem(TKEY)||"";
    g.innerHTML=THEMES.map(t=>`<button class="theme49-opt${t.id===cur?" on":""}" onclick="setTheme49('${t.id}')">
      <div class="theme49-sw">${t.sw.map(c=>`<span style="background:${c}"></span>`).join("")}</div>${t.name}<br><small style="font-weight:400;color:var(--muted)">${t.desc}</small></button>`).join("");
  }
  (function themeSection(){
    const inv=$("d46Inv");if(!inv||$("theme49Grid"))return;
    const sec=document.createElement("div");sec.className="data46-sec";
    sec.innerHTML=`<div class="oz-sub">🎨 Izgled (tema boja)</div><div class="theme49-grid" id="theme49Grid"></div>
      <div class="ekv-hint">Tema se pamti na ovom uređaju.</div>`;
    const first=inv.closest(".data46-sec");first.parentElement.insertBefore(sec,first.parentElement.querySelector(".data46-sec"));
    renderThemes();
  })();
})();
