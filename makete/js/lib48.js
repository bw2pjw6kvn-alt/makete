// ── v45.16: 📖 Priručnici · 📚 Knjižnica · 🖼 Reference uz maketu · vremena čekanja ──
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const FOLD={"01 Tiger":"🐯 Tiger","02 Panther":"🐆 Panther","03 StuG i Jagdpanzer":"🛡️ StuG i Jagdpanzer","04 Fortifikacije":"🏰 Fortifikacije",
    "05 Poluguseničari i vozila":"🚛 Poluguseničari i vozila","06 Kamuflaza i oznake":"🎨 Kamuflaža i oznake","07 Panzer divizije":"⚔️ Panzer divizije",
    "08 Opce enciklopedije":"📘 Opće enciklopedije","09 Ostalo":"📦 Ostalo","knjige":"📝 Moji dokumenti","Makete":"📝 Moji dokumenti","10 Upute":"🔗 Upute i tehnike (online)","11 Upute vozila":"🔗 Tutorijali – vozila, avioni, brodovi (online)","12 AK efekti":"🔗 AK efekti – tehnički listovi (online)","13 Upute makete":"📄 Upute za sklapanje tvojih maketa (online)"};
  const VLBL={tiger:"Tiger I",tiger2:"Tiger II / Jagdtiger",panther:"Panther",pz4:"Pz.IV",stug:"StuG / lovci tenkova",sdkfz250:"Sd.Kfz.250",
    polug:"Poluguseničari",auto:"Oklopni automobili",fort:"Fortifikacije",kamuf:"Kamuflaža i oznake"};

  // vremena čekanja iz „Kratkog savjeta iz maketarstva” (po koraku Redoslijeda izrade 1–15)
  window.WAIT48={1:"5–10 min sušenje na zraku",2:"min. 24 h prije sljedećeg sloja",3:"30–60 min prije osnovne boje",4:"24 h prije kamuflaže",
    5:"24 h prije glossa",6:"min. 12 h prije dekala",7:"24–48 h sušenje prije laka",9:"ovisno o mediju (ulje: 24 h)",10:"min. 12 h nakon glossa/filtera",
    12:"sloj po sloj, sušiti između",13:"sloj po sloj, sušiti između",14:"fiksirati odmah nakon nanošenja"};

  // ── stranice (dodane u index.html) ──
  const _show=window.showPage;
  window.showPage=function(p){const r=_show.apply(this,arguments);if(p==="prirucnici")renderPr();if(p==="knjiznica")renderLib();return r;};

  // ═════ 📖 Priručnici ═════
  let prOpen=null;
  function renderPr(){
    const box=$("prBox48");if(!box)return;
    const P=typeof PRIRUCNICI!=="undefined"?PRIRUCNICI:[];
    if(prOpen){const d=P.find(x=>x.id===prOpen);if(d){
      box.innerHTML=`<button class="btn-sm" onclick="pr48(null)">← Svi priručnici</button>
        <article class="pr48-doc"><h2>${d.icon} ${esc(d.title)}</h2>${d.html}</article>
        <button class="btn-sm" onclick="pr48(null)" style="margin-top:14px">← Svi priručnici</button>`;
      box.querySelectorAll(".pr48-doc img").forEach((im,i,all)=>{im.style.cursor="zoom-in";im.onclick=()=>openLightbox([...all].map(x=>({url:x.getAttribute("src"),caption:d.title})),i);});
      return;}}
    box.innerHTML=`<div class="pr48-list">${P.map(d=>`<button class="pr48-card" onclick="pr48('${d.id}')"><span class="pr48-i">${d.icon}</span><b>${esc(d.title)}</b><small>${esc(d.desc)}</small></button>`).join("")}</div>
      <div class="ekv-hint" style="margin-top:12px">Priručnici su iz tvoje mape <b>knjige</b> i rade bez interneta. Vremena čekanja iz „Kratkog savjeta” prikazuju se i u 🧰 Provjeri faze.</div>`;
  }
  window.pr48=id=>{prOpen=id;renderPr();window.scrollTo({top:0});};
  window.pr48Sec=a=>{const P=typeof PRIRUCNICI!=="undefined"?PRIRUCNICI:[];const d=P.find(x=>x.html.includes('id="'+a+'"'));prOpen=d?d.id:"akupute";showPage("prirucnici");setTimeout(()=>{const e=document.getElementById(a);if(e)e.scrollIntoView();},80);};

  // ═════ 📚 Knjižnica ═════
  let libQ="",libV="";
  const allBooks=()=>[...(typeof KNJIGE!=="undefined"?KNJIGE:[]),...(typeof KNJIGE_DOCS!=="undefined"?KNJIGE_DOCS:[]),...(typeof KNJIGE_WEB!=="undefined"?KNJIGE_WEB:[])];
  function vehOfMaketa(m){
    const s=(m.name||"")+" "+(m.code||"");
    if(/k[öo]nigs?tiger|tiger ?ii|jagdtiger/i.test(s))return "tiger2";
    if(/tiger|tigar/i.test(s))return "tiger";if(/panther|panter/i.test(s))return "panther";
    if(/jagdpanzer|stug|hetzer|marder|nashorn/i.test(s))return "stug";
    if(/panzer ?iv|pz\.? ?iv|pz ?kpfw ?iv/i.test(s))return "pz4";
    if(/sd\.? ?kfz\.? ?25[01]/i.test(s))return "sdkfz250";
    if(/sd\.? ?kfz\.? ?(22\d|23\d|26\d)|panzersp/i.test(s))return "auto";
    if(/sd\.? ?kfz/i.test(s))return "polug";
    return "";
  }
  window.vehOfMaketa48=vehOfMaketa;
  const booksFor=v=>v?allBooks().filter(b=>(b.v||[]).includes(v)):[];
  function renderLib(){
    const box=$("libBox48");if(!box)return;
    const B=allBooks(),q=libQ.trim().toLowerCase();
    const L=B.filter(b=>(!libV||(b.v||[]).includes(libV))&&(!q||(b.t+" "+(b.hr||"")+" "+(b.pr||"")).toLowerCase().includes(q)));
    const groups={};L.forEach(b=>{const g=FOLD[b.f]||b.f;(groups[g]=groups[g]||[]).push(b);});
    const nPr=B.filter(b=>b.pr).length;
    box.innerHTML=`<div class="lib48-bar"><input class="nav-search" id="lib48Q" placeholder="Traži knjigu (naslov, hrvatski naziv)…" value="${esc(libQ)}">
      <select id="lib48V"><option value="">Sva vozila / teme</option>${Object.entries(VLBL).map(([k,l])=>`<option value="${k}"${k===libV?" selected":""}>${l} (${booksFor(k).length})</option>`).join("")}</select></div>
      <div class="ekv-hint">${(typeof KNJIGE!=="undefined"?KNJIGE.length:0)} knjiga u 9 mapa · <span class="lib48-pr">🇭🇷 prijevod</span> = ${nPr} knjiga ima tvoj hrvatski prijevod (Word) · prikazano: ${L.length}</div>
      ${Object.entries(groups).map(([g,bs])=>`<div class="oz-sub">${esc(g)} <span style="color:var(--muted)">(${bs.length})</span></div>
        <div class="lib48-list">${bs.map(b=>`<div class="lib48-row">
          <div class="lib48-t">${b.url?"🔗":b.doc?"📝":"📕"} <b>${esc(b.hr||b.t)}</b>${b.hr?`<small>${esc(b.t)}</small>`:""}
            ${b.pr?`<span class="lib48-pr" title="${esc(b.pr)}">🇭🇷 prijevod</span>`:""}
            ${(b.v||[]).map(v=>`<span class="oz-pill" onclick="lib48Veh('${v}')">${VLBL[v]}</span>`).join("")}</div>
          ${b.hrp?`<button class="btn-sm" title="Uputa na hrvatskom" onclick="pr48Sec('${b.hrp}')">🇭🇷 HR</button>`:""}${b.url?`<a class="btn-sm" href="${esc(b.url)}" target="_blank" rel="noopener" title="Otvori uputu (PDF, treba internet)">🌐 Otvori</a>`:`<button class="btn-sm" title="Kopiraj putanju (zalijepi u File Explorer)" onclick="lib48Copy(this)" data-p="${esc("MAKETE\\"+(b.doc?b.f:"knjige\\"+b.f)+"\\"+(b.doc?b.t:b.t+".pdf"))}">📋</button>`}</div>`).join("")}</div>`).join("")||`<div class="ekv-hint">Nema knjiga za taj upit.</div>`}`;
    const qi=$("lib48Q");qi.oninput=()=>{libQ=qi.value;const pos=qi.selectionStart;renderLib();const n=$("lib48Q");n.focus();n.setSelectionRange(pos,pos);};
    $("lib48V").onchange=e=>{libV=e.target.value;renderLib();};
  }
  window.lib48Veh=v=>{libV=v;libQ="";renderLib();window.scrollTo({top:0});};
  window.lib48Copy=async function(btn){const p=btn.dataset.p;try{await navigator.clipboard.writeText(p);showToast("📋 Putanja kopirana: "+p);}catch(e){customPrompt("Putanja do knjige","Kopiraj ručno:",p);}};
  window.openLibFor48=function(id){
    const m=S.makete.find(x=>x.id===id);if(!m)return;
    libV=vehOfMaketa(m);libQ="";showPage("knjiznica",document.querySelector(".nav-tab.t-knjiznica"));window.scrollTo({top:0});
  };

  // ═════ 🖼 Reference uz maketu ═════
  let refM=null;
  window.openRefs48=function(id){
    refM=(S.makete.find(x=>x.id===id)||(S.diorame||[]).find(x=>x.id===id));if(!refM)return;
    let ov=$("refs48");if(ov)ov.remove();
    ov=document.createElement("div");ov.id="refs48";ov.className="modal-overlay";
    ov.innerHTML=`<div class="modal f47" style="max-width:760px;width:95%"><div id="refs48Body"></div>
      <input type="file" id="refs48File" accept="image/*" multiple style="display:none">
      <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn-sm" onclick="document.getElementById('refs48').remove()">Zatvori</button></div></div>`;
    ov.addEventListener("click",e=>{if(e.target===ov)ov.remove();});document.body.appendChild(ov);ov.style.display="flex";
    $("refs48File").onchange=async e=>{const fs=[...e.target.files];e.target.value="";
      for(const f of fs){if(!f.type.startsWith("image/"))continue;const url=await compressImage(f,1600,0.8);
        (refM.refs48=refM.refs48||[]).push({id:"rf_"+Date.now()+"_"+Math.random().toString(36).slice(2,5),url,caption:f.name.replace(/\.[^.]+$/,"")});}
      save();refRender();renderMakete();};
    refRender();
  };
  function refRender(){
    const box=$("refs48Body"),m=refM;if(!box||!m)return;const R=m.refs48||[];
    box.innerHTML=`<h3>🖼 Reference — ${esc(m.name)}</h3>
      <div class="ekv-hint">Fotografije stvarnog vozila, sheme oznaka i dekali koje koristiš za ovu maketu.</div>
      <button class="btn-sm" onclick="document.getElementById('refs48File').click()" style="margin:8px 0">+ Dodaj sliku</button>
      ${R.length?`<div class="prog47-grid">${R.map((r,i)=>`<div class="prog47-ph"><img src="${r.url}" alt="" loading="lazy" onclick="refs48Open(${i})">
        <div class="prog47-meta">${esc(r.caption||"")}</div>
        <div class="prog47-tools"><button title="Opis" onclick="refs48Cap('${r.id}')">✎</button><button title="Obriši" onclick="refs48Del('${r.id}')">✕</button></div></div>`).join("")}</div>`
        :`<div class="ekv-hint">Još nema referentnih slika.</div>`}`;
  }
  window.refs48Open=i=>{const R=(refM&&refM.refs48)||[];openLightbox(R.map(r=>({url:r.url,caption:refM.name+" · "+(r.caption||"referenca")})),i);};
  window.refs48Cap=async id=>{const r=(refM.refs48||[]).find(x=>x.id===id);if(!r)return;const v=await customPrompt("Opis reference","",r.caption||"");if(v===null)return;r.caption=v.trim();save();refRender();};
  window.refs48Del=id=>{const R=refM.refs48||[],i=R.findIndex(x=>x.id===id);if(i<0)return;const [rm]=R.splice(i,1);save();refRender();renderMakete();
    showToastAction("Referenca obrisana","Poništi",()=>{R.splice(i,0,rm);save();refRender();renderMakete();});};


  // v45.36: 📄 Upute za sklapanje (PDF skenovi sa Scalemates)
  const UPUTE56=[
    {re:/13233|panzer ?iv ?h/i,u:"https://www.scalemates.com/products/img/7/0/9/998709-80-instructions.pdf",sm:"https://www.scalemates.com/kits/academy-13233-panzer-iv-ausf-h--998709"},
    {re:/35268|sd\.?kfz\.? ?223/i,u:"https://www.scalemates.com/products/img/2/2/5/133225-74-instructions.pdf",sm:"https://www.scalemates.com/kits/tamiya-35268-sdkfz223-leichter-panzerspaehwagen-fu--133225"},
    {re:/01502|grizzly/i,u:"",sm:"https://scalemates.com/kits/trumpeter-01502-avgp-grizzly--102750",note:"PDF je na Scalemates stranici (Instructions → Download)"},
    {re:/3646|tiger 1 ausf/i,u:"https://www.scalemates.com/products/img/4/7/3/1281473-64-instructions.pdf",sm:"https://www.scalemates.com/kits/zvezda-3646-tiger-i-ausf-e--1281473"},
    {re:/35157|m60a1/i,u:"https://www.scalemates.com/products/img/3/4/6/122346-31-instructions.pdf",sm:"https://www.scalemates.com/kits/tamiya-35157-m60a1--122346"},
    {re:/13205|bradley/i,u:"https://www.scalemates.com/products/img/4/8/3/107483-91-instructions.pdf",sm:"https://www.scalemates.com/kits/academy-13205-m2a2-bradley--107483"},
    {re:/2184|sd\.?kfz\.? ?250/i,u:"https://www.scalemates.com/products/img/9/5/8/1541958-68-instructions.pdf",sm:"https://scalemates.com/kits/takom-2184-sdkfz-250-1--1541958"},
    {re:/35336|stug iii/i,u:"https://www.scalemates.com/products/img/4/7/7/1384477-16-instructions.pdf",sm:"https://www.scalemates.com/kits/miniart-35336-stug-iii-ausf-g--1384477"},
    {re:/05824|enterprise/i,u:"https://www.scalemates.com/products/img/8/7/4/1435874-43-instructions.pdf",sm:"https://www.scalemates.com/kits/revell-05824-uss-enterprise-cv-6--1435874"},
    {re:/12264|f-15e/i,u:"",sm:"https://www.scalemates.com/kits/academy-12264-f-15e--1415977",note:"Točne upute za 12264 Scalemates nema – stranica nudi upute sličnog Academy kita"},
    {re:/afv-acc|tank supplies/i,u:"https://www.scalemates.com/products/img/8/2/0/133820-17-instructions.pdf",sm:"https://www.scalemates.com/kits/academy-1382-tank-supplies--133820"}
  ];
  window.UPUTE56=UPUTE56;
  const uputaFor=m=>{const s=(m.code||"")+" "+(m.name||"");return UPUTE56.find(x=>x.re.test(s));};
  window.openUpute56=id=>{
    const m=(S.makete.find(x=>x.id===id)||(S.diorame||[]).find(x=>x.id===id));const x=m&&uputaFor(m);if(!x)return;
    if(x.u)window.open(x.u,"_blank","noopener");else{window.open(x.sm,"_blank","noopener");if(x.note)showToast(x.note);}
  };
  // ── kartica makete: 🖼 Reference i 📚 Knjige ──
  const _bmc=window.buildModelCard;
  window.buildModelCard=function(m){
    const d=_bmc.apply(this,arguments);
    try{
      const anchor=d.querySelector('[onclick^="openSm47"]')||[...d.querySelectorAll("button")].find(b=>/Scalemates/.test(b.textContent));
      const rf=document.createElement("button");rf.className="btn-sm";rf.style.cssText="color:#c9b27a;border-color:rgba(201,178,122,.4)";
      const n=(m.refs48||[]).length;rf.textContent="🖼 Reference"+(n?` (${n})`:"");rf.onclick=()=>openRefs48(m.id);
      const v=vehOfMaketa(m),nb=booksFor(v).length;
      const kb=document.createElement("button");kb.className="btn-sm";kb.style.cssText="color:#a9b8d6;border-color:rgba(169,184,214,.4)";
      kb.textContent="📚 Knjige"+(nb?` (${nb})`:"");kb.title=nb?"Tvoje knjige za "+VLBL[v]:"Za ovo vozilo nemaš knjiga — otvara cijelu knjižnicu";kb.onclick=()=>openLibFor48(m.id);
      const up=uputaFor(m);let ub=null;
      if(up){ub=document.createElement("button");ub.className="btn-sm";ub.style.cssText="color:#9fd0a8;border-color:rgba(159,208,168,.4)";ub.textContent="📄 Upute";ub.title=up.u?"Upute za sklapanje (PDF, treba internet)":(up.note||"Upute na Scalemates");ub.onclick=()=>openUpute56(m.id);}
      if(anchor){anchor.after(rf);rf.after(kb);if(ub)kb.after(ub);}
    }catch(e){console.warn("card48",e);}
    return d;
  };
  if(typeof page!=="undefined"&&page==="makete")try{renderMakete();}catch(e){}
})();
