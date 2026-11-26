// ── v45.48: RAL / FS / RLM oznake za sve AK boje (3Gen, Real Colors, RC Markers) ──
// – na kartici proizvoda u Inventaru prikazuje oznaku (npr. „RAL 7021”)
// – u Uredi proizvod → Boja nudi oznaku i nijansu te boje jednim klikom
// – u pretrazi RAL/naziv dodaje i Real Colors i RC Markers
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const N=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const MAP={};   // šifra → [{sys,num,name,sw,src}]
  const add=(code,sys,num,name,sw,src)=>{const k=N(code);if(!k||!num)return;const L=MAP[k]=MAP[k]||[];if(!L.some(x=>x.sys===sys&&x.num===num))L.push({sys,num,name,sw,src});};
  const scan=(code,txt,name,sw,src)=>{
    String(txt||"").replace(/RAL\s*(\d{4})/gi,(m,n)=>add(code,"RAL",n,name,sw,src));
    String(txt||"").replace(/\bFS\s*(\d{5})/gi,(m,n)=>add(code,"FS",n,name,sw,src));
    String(txt||"").replace(/\bRLM\s*(\d{2,3})/gi,(m,n)=>add(code,"RLM",n,name,sw,src));
  };
  function build(){
    const EQ=typeof EQUIV_DATA!=="undefined"?EQUIV_DATA:[];
    EQ.forEach(e=>{
      String(e.ral||"").split(/[\/,;]| ili /).forEach(r=>{const m=(r.match(/\d{4}/)||[])[0];if(m)add(e.code,"RAL",m,e.name,e.swatch,"AK 3Gen");});
      const f=(String(e.fs||"").match(/\d{5}/)||[])[0];if(f)add(e.code,"FS",f,e.name,e.swatch,"AK 3Gen");
      const rl=(String(e.rlm||"").match(/\d{2,3}/)||[])[0];if(rl)add(e.code,"RLM",rl,e.name,e.swatch,"AK 3Gen");
      scan(e.code,e.name,e.name,e.swatch,"AK 3Gen");
      // Real Colors ekvivalent iz iste tablice dobiva iste oznake
      if(e.realcolors&&/^RC\d+/.test(e.realcolors))(MAP[N(e.code)]||[]).forEach(x=>add(e.realcolors,x.sys,x.num,x.name,x.sw,"Real Colors"));
    });
    const RC=typeof REALCOLORS_DATA!=="undefined"?REALCOLORS_DATA:[];
    RC.forEach(r=>{const sw=(typeof RC_SWATCH_MAP!=="undefined"&&RC_SWATCH_MAP[r.code])||"";scan(r.code,(r.bsfsral||"")+" "+r.name,r.name,sw,"Real Colors");});
    const RCM=typeof RCM_DATA!=="undefined"?RCM_DATA:[];
    RCM.forEach(r=>scan(r.code,(r.ref||"")+" "+r.name,r.name,r.swatch,"RC Marker"));
  }
  build();
  window.RAL60=MAP;
  // oznake za stavku inventara: iz tablica po šifri, a ako ih nema – iz naziva/opisa (npr. Vallejo „117 – Braun RAL 8020”)
  function refsFor(it){
    const L=[...(MAP[N(it.code)]||[])];
    if(!L.length){const t=(it.name||"")+" "+String(it.desc||"").slice(0,80);
      t.replace(/RAL\s*(\d{4})/gi,(m,n)=>{if(!L.some(x=>x.num===n))L.push({sys:"RAL",num:n});});
      t.replace(/\bFS\s*(\d{5})/gi,(m,n)=>{if(!L.some(x=>x.num===n))L.push({sys:"FS",num:n});});}
    return L;
  }
  window.ralRefs60=refsFor;

  // ── kartica proizvoda ──
  const _bc=window.buildCard;
  if(_bc)window.buildCard=function(cat,item){
    const d=_bc.apply(this,arguments);
    try{
      if(item&&!item.isSetHeader){const L=refsFor(item);
        if(L.length){const row=d.querySelector(".product-name-row")||d.querySelector(".product-name");
          if(row&&!d.querySelector(".ral60")){const s=document.createElement("div");s.className="ral60";
            s.innerHTML=L.slice(0,3).map(x=>`<span class="ral60-p" title="${esc(x.sys+" "+x.num+(x.src?" · "+x.src:""))}">${x.sys} ${x.num}</span>`).join("");
            row.after(s);}}}
    }catch(e){}
    return d;
  };

  // ── pretraga boja: dodaj Real Colors i RC Markers ──
  function extras(){
    if(typeof COLOR_SEARCH_MAP==="undefined")return;
    const RC=typeof REALCOLORS_DATA!=="undefined"?REALCOLORS_DATA:[],RCM=typeof RCM_DATA!=="undefined"?RCM_DATA:[];
    const put=(sys,num,name,code,sw)=>{if(!sw)return;const l=`${sys} ${num} – ${name} (${code})`;if(!COLOR_SEARCH_MAP[l])COLOR_SEARCH_MAP[l]=sw;};
    RC.forEach(r=>{(MAP[N(r.code)]||[]).forEach(x=>put(x.sys,x.num,r.name,r.code,x.sw||(typeof RC_SWATCH_MAP!=="undefined"&&RC_SWATCH_MAP[r.code])));});
    RCM.forEach(r=>{(MAP[N(r.code)]||[]).forEach(x=>put(x.sys,x.num,r.name,r.code,r.swatch));});
  }
  const _bci=window.buildColorSearchIndex;
  if(_bci)window.buildColorSearchIndex=function(){const r=_bci.apply(this,arguments);try{extras();}catch(e){}return r;};
  try{extras();}catch(e){}

  // ── Uredi proizvod: ponudi oznaku ove boje — unutar taba "RAL / naziv", odmah iznad pretrage ──
  // Tako je jasno da su to DVIJE različite stvari: gumbi gore = već poznate oznake OVOG proizvoda
  // (jedan klik = dodano), polje ispod = ručna pretraga bilo koje druge RAL/FS/RLM/nazvane boje.
  let curItem=null;
  const _oe=window.openEditProd;
  if(_oe)window.openEditProd=function(cat,id){
    const r=_oe.apply(this,arguments);
    try{
      curItem=((S.inventar[cat]||{}).items||[]).find(i=>i.id===id)||null;
      hint();
      // ako proizvod ima poznatu oznaku, odmah otvori tab "RAL / naziv" da se gumbi vide bez dodatnog klika
      const L=curItem?refsFor(curItem).filter(x=>x.sw):[];
      if(L.length){const tabs=document.querySelectorAll("#pmSwatchTabsWrap .img-tab");if(tabs[1]&&typeof setSwatchInputMode==="function")setSwatchInputMode("ral",tabs[1]);}
    }catch(e){}
    return r;
  };
  const _op=window.openProdModal;
  if(_op)window.openProdModal=function(){const r=_op.apply(this,arguments);curItem=null;hint();return r;};
  function hint(){
    const ralBox=$("swatchModeRal"),input=$("pmColorSearch");if(!ralBox||!input)return;
    let h=$("ral60Hint");if(!h){h=document.createElement("div");h.id="ral60Hint";h.className="ral60-hint";ralBox.insertBefore(h,input);}
    let lbl=$("ral60SearchLbl");if(!lbl){lbl=document.createElement("div");lbl.id="ral60SearchLbl";lbl.className="ral60-searchlbl";lbl.textContent="Ili pretraži/dodaj drugu oznaku:";ralBox.insertBefore(lbl,input);}
    const it=curItem;
    const L=it?refsFor(it):[];
    if(!L.length){h.innerHTML="";lbl.style.display="none";return;}
    lbl.style.display="";
    h.innerHTML=`<div class="ral60-hint-t">🎨 Poznate oznake ovog proizvoda (klik = odmah dodano):</div><div class="ral60-hint-row">${L.map((x,i)=>`<button type="button" class="ral60-p${x.sw?" b":""}" onclick="ral60Add(${i})" title="${x.sw?"Dodaj nijansu ove oznake":"Nijansa nije poznata – samo oznaka"}">${x.sw?`<span class="color-swatch" style="background:${esc(x.sw)}"></span>`:""}${x.sys} ${x.num}${x.sw?" +":""}</button>`).join(" ")}</div>`;
  }
  window.ral60Add=i=>{const it=curItem;if(!it)return;const x=refsFor(it)[i];if(!x||!x.sw){showToast("Za ovu oznaku nijansa nije poznata – odaberi je na kotaču ili u RAL pretrazi");return;}
    if(typeof pmSwatches!=="undefined"){if(!pmSwatches.includes(x.sw))pmSwatches.push(x.sw);renderSwatchEditor(pmSwatches);showToast(`✓ Dodana nijansa ${x.sys} ${x.num}`);}};
  // ponovno iscrtaj Inventar da se pojave oznake
  try{if(typeof page!=="undefined"&&page==="inventar"&&typeof render==="function")render();}catch(e){}
})();
