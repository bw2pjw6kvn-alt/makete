// ── v45.24: 🏞️ Diorame — izrada po fazama, popis proizvoda, makete u diorami, napredak i reference ──
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const canon=s=>nk(s).replace(/^VAL(?=\d)/,"");
  const D=()=>(S.diorame=S.diorame||[]);
  const STEPS=[
    {n:1,icon:"📝",name:"Plan i skica"},
    {n:2,icon:"🪵",name:"Podloga i okvir"},
    {n:3,icon:"⛰️",name:"Reljef (stiropor / XPS)"},
    {n:4,icon:"🏜️",name:"Tekstura terena"},
    {n:5,icon:"🌫️",name:"Temeljni premaz terena"},
    {n:6,icon:"🎨",name:"Bojanje terena"},
    {n:7,icon:"🖌️",name:"Wash i suhi kist"},
    {n:8,icon:"🪨",name:"Kamenje i detalji"},
    {n:9,icon:"🌾",name:"Vegetacija"},
    {n:10,icon:"💧",name:"Voda, blato i efekti"},
    {n:11,icon:"⬡",name:"Postavljanje maketa i figura"},
    {n:12,icon:"🧰",name:"Dodaci (vreće, žica, oprema)"},
    {n:13,icon:"💨",name:"Pigmenti i prašina"},
    {n:14,icon:"🛡️",name:"Završni lak i natpis"},
  ];
  window.DIO_STEPS52=STEPS;
  const THEMES={
    pustinja:{icon:"🏜️",name:"Pustinja (Sjeverna Afrika)",
      codes:["AK8015","AK8020","AK8022","AK8033","AK1581","AK1571","AK1572","AK2073","AKG03","AKG07","71.140","71.028","71.291","AK11325","AK11121","AK11115","AKAD017","AK041","AK048","AK022","AK4061","AK4062","AK11237"],
      needs:["Podloga (drvena pločica ili okvir)","Stiropor / XPS za reljef i dine","Bijelo ljepilo (PVA)","Sitni pijesak i kamenčići","Suhi busenovi trave (dry tufts)"]},
    europa:{icon:"🌳",name:"Europa – ljeto",
      codes:["AK8015","AMIG2102","AMIG2103","AK8027","AK017","AK042","AMIG7408","AKG04","AKG05","AKG08","AK4063","AK8028","AK2073","AK11237"],
      needs:["Podloga (drvena pločica ili okvir)","Statička trava","Busenovi trave i grmlje","Bijelo ljepilo (PVA)"]},
    istok:{icon:"🟤",name:"Istočna fronta – blato",
      codes:["AK8026","AK8027","AMIG2103","AK8015","AK078","AK017","AK042","AK8028","AMIG2204","AKG06","AK4063","AK048","AK11237"],
      needs:["Podloga (drvena pločica ili okvir)","Suha trava / busenovi","Bijelo ljepilo (PVA)"]},
    zima:{icon:"❄️",name:"Zima – snijeg",
      codes:["AK8015","AK078","AK015","AK017","AK8028","AK11237"],
      needs:["Podloga (drvena pločica ili okvir)","Efekt snijega (snow / ice)","Suha trava","Bijelo ljepilo (PVA)"]},
    urbano:{icon:"🏚️",name:"Urbano – ruševine",
      codes:["AK8013","AK1581","AK1571","AK1572","AK8033","AK015","AK042","AK4062","AK11237"],
      needs:["Podloga (drvena pločica ili okvir)","Zidovi / ruševine (gips ili gotove)","Cigle i krhotine","Bijelo ljepilo (PVA)"]},
    voda:{icon:"🌊",name:"Rijeka / obala",
      codes:["AMIG2204","AK8028","AK8015","AK8020","AK8026","AK078","AK1581","AK11237"],
      needs:["Podloga s okvirom (za izlijevanje vode)","Statička trava / trska","Bijelo ljepilo (PVA)"]},
    ostalo:{icon:"🏞️",name:"Ostalo",codes:[],needs:[]},
  };
  const SCALES=["1:35","1:48","1:72","1:16","1:24","1:76","1:100","1:144","1:200","1:350","1:700","1:1200"];
  const allInv=()=>Object.entries(S.inventar||{}).flatMap(([cat,cd])=>(cd.items||[]).map(it=>({cat,it})));
  function findInv(code){if(!code||code==="–")return null;const k=canon(code);const h=allInv().filter(x=>!x.it.isSetHeader&&canon(x.it.code)===k);return h.find(x=>x.it.status==="imam")||h[0]||null;}
  function itemOf(p){const byId=allInv().find(x=>x.it.id===p.iid);return byId||findInv(p.code);}
  const imgOf=d=>(d.imgs&&d.imgs[0]&&d.imgs[0].url)||((d.progress46||[]).slice(-1)[0]||{}).url||((d.refs48||[])[0]||{}).url||"";
  function modal(id,html,w){let ov=$(id);if(ov)ov.remove();ov=document.createElement("div");ov.id=id;ov.className="modal-overlay";
    ov.innerHTML=`<div class="modal f47" style="max-width:${w||620}px;width:95%">${html}</div>`;
    ov.addEventListener("click",e=>{if(e.target===ov)ov.remove();});document.body.appendChild(ov);ov.style.display="flex";return ov;}

  // ═════ stranica ═════
  let q="";
  function render(){
    const box=$("dioBox52");if(!box)return;
    const L=D().filter(d=>!q||(d.name+" "+(d.comment||"")+" "+((THEMES[d.theme]||{}).name||"")).toLowerCase().includes(q));
    const groups={wip:[],plan:[],pauza:[],done:[]};L.forEach(d=>(groups[d.status]||groups.wip).push(d));
    const labels={wip:"🔨 U izradi",plan:"⬜ Planirane",pauza:"⏸ Na pauzi",done:"✅ Završene"};
    box.innerHTML=(D().length?"":`<div class="dio52-empty"><div style="font-size:34px">🏞️</div><b>Još nemaš diorama.</b><br>Napravi novu ili kreni od primjera.
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:10px"><button class="btn-sm" onclick="dio52Edit()">＋ Nova diorama</button>
        <button class="btn-sm qa50-btn" onclick="dio52Example()">🏜️ Primjer: pustinjska diorama (Sd.Kfz.223, Tunis 1943.)</button></div></div>`)+
      Object.entries(groups).filter(([,a])=>a.length).map(([st,a])=>`<div class="model-status-group"><div class="model-status-hdr">${labels[st]} <span style="color:var(--muted);font-weight:400">(${a.length})</span></div>
        <div class="model-grid">${a.map(card).join("")}</div></div>`).join("");
  }
  window.renderDiorame52=render;
  function card(d){
    const t=THEMES[d.theme]||THEMES.ostalo,st=d.stage||0,cur=st?STEPS[st-1]:null,nxt=STEPS[st]||null,img=imgOf(d);
    const prods=(d.products||[]).map(p=>({p,x:itemOf(p)})),have=prods.filter(o=>o.x&&o.x.it.status==="imam").length;
    const needs=(d.needs||[]).filter(n=>!n.done).length;
    const mk=(d.makete||[]).map(id=>S.makete.find(m=>m.id===id)).filter(Boolean);
    const ph=(d.progress46||[]).length,rf=(d.refs48||[]).length;
    return `<div class="model-card dio52-card" data-id="${d.id}">
      ${img?`<img class="model-card-img" src="${esc(img)}" alt="" style="cursor:zoom-in" onclick="openLightbox([{url:'${esc(img)}',caption:'${esc(d.name)}'}],0)">`:`<div class="model-card-img-ph"><span style="font-size:30px">${t.icon}</span><span style="font-size:11px">Nema slike</span></div>`}
      <div class="model-card-body">
        <div class="model-badge ${d.status||"plan"}">${{plan:"⬜ Planirana",wip:"🔨 U izradi",done:"✅ Završena",pauza:"⏸ Na pauzi"}[d.status||"plan"]}</div>
        <div class="model-card-name">${esc(d.name)}</div>
        <div class="model-card-meta">${esc(d.scale||"–")} · ${t.icon} ${esc(t.name)}</div>
        ${d.comment?`<div class="model-card-comment">${esc(d.comment)}</div>`:""}
        <div class="model-stage-box"><div class="model-stage-bar"><div class="model-stage-fill" style="width:${Math.round(st/STEPS.length*100)}%"></div></div>
          <div class="model-stage-row"><span style="color:var(--muted)">${cur?`Faza ${st}/${STEPS.length}: <b style="color:var(--text)">${cur.icon} ${esc(cur.name)}</b>`:"Faza izrade: <b style=\"color:var(--text)\">nije započeto</b>"}</span></div>
          ${nxt?`<div class="model-stage-next">➡ Sljedeće: ${nxt.icon} ${esc(nxt.name)}</div>`:`<div class="model-stage-next done">🎉 Diorama je gotova!</div>`}</div>
        ${mk.length?`<div class="model-colors"><div class="model-colors-lbl">Makete u diorami</div>${mk.map(m=>`<span class="model-color-pill dio52-mk" onclick="dio52GoMaketa('${m.id}')">⬡ ${esc(m.name)}</span>`).join("")}</div>`:""}
        <div class="dio52-sum" onclick="dio52Prod('${d.id}')">🧰 Proizvodi: <b>${prods.length}</b> (✓ ${have} imaš)${needs?` · <span style="color:var(--nemam-txt)">nedostaje ${needs}</span>`:""}</div>
        <div style="display:flex;gap:5px;margin-top:8px;flex-wrap:wrap">
          ${nxt?`<button class="btn-sm" onclick="dio52Next('${d.id}')" style="color:var(--materijal);border-color:rgba(122,184,154,.35)">✓ Sljedeći korak</button>`:""}
          <button class="btn-sm" onclick="dio52Prod('${d.id}')" style="color:#7fc9a8;border-color:rgba(127,201,168,.45)">🧰 Proizvodi</button>
          <button class="btn-sm" onclick="openProg47('${d.id}')" style="color:#9fc3e6;border-color:rgba(159,195,230,.4)">📸 Napredak${ph?` (${ph})`:""}</button>
          <button class="btn-sm" onclick="openRefs48('${d.id}')" style="color:#c9b27a;border-color:rgba(201,178,122,.4)">🖼 Reference${rf?` (${rf})`:""}</button>
          <button class="btn-sm" onclick="dio52Edit('${d.id}')">✎ Uredi</button>
          <button class="btn-sm" onclick="dio52Del('${d.id}')" style="margin-left:auto;color:var(--nemam-txt);border-color:rgba(248,113,113,.25)">✕</button>
        </div></div></div>`;
  }
  window.dio52GoMaketa=function(id){showPage("makete",document.querySelector(".nav-tab.t-makete"));setTimeout(()=>{const c=document.querySelector(`.model-card[data-id="${id}"]`);if(c){c.scrollIntoView({behavior:"smooth",block:"center"});c.classList.add("hl46");setTimeout(()=>c.classList.remove("hl46"),1800);}},150);};
  window.dio52Next=function(id){
    const d=D().find(x=>x.id===id);if(!d)return;if((d.stage||0)>=STEPS.length)return;
    d.stage=(d.stage||0)+1;if(d.status==="plan")d.status="wip";if(d.stage===STEPS.length)d.status="done";
    save();render();
    const s=STEPS[d.stage-1];
    showToastAction(`✓ ${d.stage}. ${s.icon} ${s.name} gotovo`,"📸 Fotka",()=>openProg47(d.id,d.stage));
  };
  window.dio52Del=async function(id){
    const i=D().findIndex(x=>x.id===id);if(i<0)return;
    const ok=await customConfirm(`Ukloniti dioramu „${D()[i].name}”? Makete i proizvodi u Inventaru ostaju netaknuti.`,"Ukloniti dioramu?");if(!ok)return;
    const [rm]=D().splice(i,1);save();render();
    showToastAction("Diorama uklonjena","Poništi",()=>{D().splice(i,0,rm);save();render();});
  };

  // ═════ nova / uredi ═════
  let edImg=null;
  window.dio52Edit=function(id){
    const d=id?D().find(x=>x.id===id):null;edImg=null;
    modal("dio52Ed",`<h3>${d?"✎ Uredi dioramu":"＋ Nova diorama"}</h3>
      <label>Naziv *</label><input id="d52Name" value="${esc(d?d.name:"")}" placeholder="npr. Tunis 1943 – izvidnica u pustinji">
      <div class="dio52-two"><div><label>Mjerilo</label><select id="d52Scale">${SCALES.map(s=>`<option${(d?d.scale:"1:35")===s?" selected":""}>${s}</option>`).join("")}</select></div>
        <div><label>Tema / teren</label><select id="d52Theme">${Object.entries(THEMES).map(([k,t])=>`<option value="${k}"${(d?d.theme:"pustinja")===k?" selected":""}>${t.icon} ${t.name}</option>`).join("")}</select></div></div>
      <div class="dio52-two"><div><label>Status</label><select id="d52Status">${[["plan","⬜ Planirana"],["wip","🔨 U izradi"],["pauza","⏸ Na pauzi"],["done","✅ Završena"]].map(([v,l])=>`<option value="${v}"${(d?d.status:"plan")===v?" selected":""}>${l}</option>`).join("")}</select></div>
        <div><label>Trenutna faza izrade</label><select id="d52Stage"><option value="0">— Nije započeto —</option>${STEPS.map(s=>`<option value="${s.n}"${d&&d.stage===s.n?" selected":""}>${s.n}. ${s.icon} ${s.name}</option>`).join("")}</select></div></div>
      <label>Dimenzije podloge (opcionalno)</label><input id="d52Size" value="${esc(d&&d.size||"")}" placeholder="npr. 30 × 20 cm">
      <label>Opis / ideja</label><textarea id="d52Comment" placeholder="scena, razdoblje, što se događa…">${esc(d?d.comment||"":"")}</textarea>
      <label>Makete u diorami</label><div class="dio52-mklist">${S.makete.map(m=>`<label class="dio52-mk-opt"><input type="checkbox" value="${m.id}"${d&&(d.makete||[]).includes(m.id)?" checked":""}> ${esc(m.name)} <small>${esc(m.scale||"")}</small></label>`).join("")||'<span class="ekv-hint">Nema maketa.</span>'}</div>
      <label>Naslovna slika</label><div style="display:flex;gap:8px;align-items:center"><button class="btn-sm" type="button" onclick="document.getElementById('d52File').click()">🖼 Odaberi sliku</button><span id="d52ImgInfo" class="ekv-hint">${d&&d.imgs&&d.imgs.length?"✓ ima sliku":"(opcionalno — inače se koristi zadnja fotka napretka)"}</span></div>
      <input type="file" id="d52File" accept="image/*" style="display:none">
      ${d?"":`<label class="dio52-mk-opt" style="margin-top:8px"><input type="checkbox" id="d52Preset" checked> Odmah predloži proizvode iz Inventara za odabranu temu</label>`}
      <div class="modal-btns"><button class="btn-secondary" onclick="document.getElementById('dio52Ed').remove()">Odustani</button><button class="btn-primary" onclick="dio52Save('${d?d.id:""}')">Spremi</button></div>`,600);
    $("d52File").onchange=async e=>{const f=e.target.files[0];e.target.value="";if(!f)return;edImg=await compressImage(f,1400,0.8);$("d52ImgInfo").textContent="✓ "+f.name;};
    setTimeout(()=>$("d52Name").focus(),60);
  };
  window.dio52Save=function(id){
    const name=$("d52Name").value.trim();if(!name){$("d52Name").focus();return;}
    let d=id?D().find(x=>x.id===id):null;
    const vals={name,scale:$("d52Scale").value,theme:$("d52Theme").value,status:$("d52Status").value,stage:+$("d52Stage").value||0,size:$("d52Size").value.trim(),comment:$("d52Comment").value.trim(),
      makete:[...document.querySelectorAll("#dio52Ed .dio52-mklist input:checked")].map(i=>i.value)};
    if(d)Object.assign(d,vals);else{d={id:"dio_"+Date.now(),...vals,imgs:[],products:[],needs:[],createdAt:Date.now()};D().push(d);}
    if(edImg)d.imgs=[{url:edImg}];
    const pre=$("d52Preset");let n=0;if(pre&&pre.checked)n=applyPreset(d);
    save();$("dio52Ed").remove();render();
    showToast(`✓ Diorama spremljena${n?` · predloženo ${n} proizvoda`:""}`);
  };
  function applyPreset(d){
    const t=THEMES[d.theme];if(!t)return 0;d.products=d.products||[];d.needs=d.needs||[];let n=0;
    t.codes.forEach(c=>{const x=findInv(c);if(!x||x.it.status!=="imam")return;if(d.products.some(p=>p.iid===x.it.id||canon(p.code)===canon(x.it.code)))return;
      d.products.push({iid:x.it.id,code:x.it.code,name:x.it.name,cat:x.cat});n++;});
    t.needs.forEach(nm=>{if(!d.needs.some(z=>z.name===nm))d.needs.push({id:"nd_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),name:nm,done:false});});
    return n;
  }
  window.dio52Example=function(){
    const sd=S.makete.find(m=>/sd\.?\s*kfz\.?\s*223/i.test(m.name));
    const sets=S.makete.filter(m=>/^Set za dioramu/i.test(m.name)).map(m=>m.id);
    const afv=S.makete.find(m=>/A\.F\.V\./.test(m.name));
    const d={id:"dio_"+Date.now(),name:"Tunis 1943 – izvidnica u pustinji",scale:"1:35",theme:"pustinja",status:"plan",stage:0,size:"30 × 20 cm",
      comment:"Sd.Kfz.223 u shemi Braun/Grau na pješčanoj stazi, uz položaj od vreća s pijeskom i bodljikave žice. Referenca: fotografija iz Tunisa 1943.",
      makete:[...(sd?[sd.id]:[]),...sets,...(afv?[afv.id]:[])],imgs:[],products:[],needs:[],createdAt:Date.now()};
    if(sd&&sd.refs48)d.refs48=sd.refs48.filter(r=>/tunis/i.test(r.caption||"")).map(r=>({...r,id:r.id+"_d"}));
    const n=applyPreset(d);D().push(d);save();render();
    showToast(`🏜️ Primjer napravljen · ${n} proizvoda iz Inventara · ${d.needs.length} stvari nedostaje`);
  };

  // ═════ 🧰 Proizvodi ═════
  let pd=null,pq="";
  window.dio52Prod=function(id){
    pd=D().find(x=>x.id===id);if(!pd)return;pq="";
    modal("dio52P",`<h3>🧰 Proizvodi — ${esc(pd.name)}</h3><div id="d52PBody"></div>
      <div class="modal-btns"><button class="btn-primary" onclick="document.getElementById('dio52P').remove();renderDiorame52()">Gotovo</button></div>`,720);
    prodRender();
  };
  function prodRender(){
    const box=$("d52PBody"),d=pd;if(!box||!d)return;
    const rows=(d.products||[]).map((p,i)=>{const x=itemOf(p),own=x&&x.it.status==="imam";const sw=x&&x.it.swatches&&x.it.swatches[0];
      return `<div class="have47-row ${own?"own":"miss"}"><span class="have47-st">${own?"✓":"✗"}</span>${sw?`<span class="color-swatch" style="background:${esc(sw)}"></span>`:""}
        <span class="have47-c">${esc(p.code||"")}</span><span class="have47-n">${esc(x?x.it.name:p.name)}<small>${esc(x?x.cat:(p.cat||""))}${x?"":" · više nije u Inventaru"}</small></span>
        ${x?`<button class="btn-sm" onclick="document.getElementById('dio52P').remove();goToItems46(['${x.it.id}'])" title="Otvori u Inventaru">→</button>`:""}<button class="btn-sm" onclick="dio52PRm(${i})" title="Makni s popisa">✕</button></div>`;}).join("");
    const ql=pq.trim().toLowerCase();
    const res=ql.length>=2?allInv().filter(x=>!x.it.isSetHeader&&(x.it.code+" "+x.it.name+" "+x.cat).toLowerCase().includes(ql)).slice(0,25):[];
    const inList=x=>(d.products||[]).some(p=>p.iid===x.it.id);
    const t=THEMES[d.theme]||THEMES.ostalo;
    box.innerHTML=`<div class="oz-sub">Odabrani proizvodi (${(d.products||[]).length})</div>
      ${rows?`<div class="have47-list">${rows}</div>`:`<div class="ekv-hint">Popis je prazan — dodaj proizvode iz Inventara ili klikni „Predloži”.</div>`}
      <div class="dio52-add"><input id="d52Q" class="nav-search" placeholder="🔎 Dodaj iz Inventara: šifra ili naziv…" value="${esc(pq)}">
        ${t.codes.length?`<button class="btn-sm qa50-btn" onclick="dio52Preset()">${t.icon} Predloži za temu „${esc(t.name)}”</button>`:""}</div>
      ${res.length?`<div class="have47-list dio52-res">${res.map(x=>`<div class="have47-row ${x.it.status==="imam"?"own":"miss"}"><span class="have47-st">${x.it.status==="imam"?"✓":"✗"}</span>
        <span class="have47-c">${esc(x.it.code||"")}</span><span class="have47-n">${esc(x.it.name)}<small>${esc(x.cat)}</small></span>
        ${inList(x)?`<small>dodano</small>`:`<button class="btn-sm" onclick="dio52PAdd('${x.it.id}')">＋</button>`}</div>`).join("")}</div>`:ql.length>=2?`<div class="ekv-hint">Ništa u Inventaru — upiši ispod u „Nedostaje”.</div>`:""}
      <div class="oz-sub" style="margin-top:12px">Nedostaje (nemaš u Inventaru)</div>
      <div class="have47-list">${(d.needs||[]).map((n,i)=>n.done?"":`<div class="have47-row dio52-need miss"><span class="have47-st">✗</span>
        <span class="have47-n">${esc(n.name)}${n.wish?`<small>✦ na popisu Želja</small>`:""}</span>
        <button class="btn-sm dio52-own" onclick="dio52NOwn(${i})" title="Nabavio sam — dodaj u Inventar kao ✓ imam">✓ Imam</button>
        ${n.wish?"":`<button class="btn-sm" onclick="dio52NWish(${i})" title="Dodaj u Želje">✦ Želje</button>`}<button class="btn-sm" onclick="dio52NRm(${i})" title="Makni s popisa">✕</button></div>`).join("")}</div>
      <div class="dio52-add"><input id="d52N" placeholder="npr. Statička trava 2 mm, PVA ljepilo…"><button class="btn-sm" onclick="dio52NAdd()">＋ Dodaj</button>
        ${(d.needs||[]).some(n=>!n.done&&!n.wish)?`<button class="btn-sm" onclick="dio52NWishAll()">✦ Sve u Želje</button>`:""}</div>`;
    const qi=$("d52Q");qi.oninput=()=>{pq=qi.value;const p=qi.selectionStart;prodRender();const n=$("d52Q");n.focus();n.setSelectionRange(p,p);};
    const ni=$("d52N");ni.onkeydown=e=>{if(e.key==="Enter")dio52NAdd();};
  }
  window.dio52PAdd=function(iid){const x=allInv().find(y=>y.it.id===iid);if(!x||!pd)return;(pd.products=pd.products||[]).push({iid,code:x.it.code,name:x.it.name,cat:x.cat});save();prodRender();};
  window.dio52PRm=function(i){pd.products.splice(i,1);save();prodRender();};
  window.dio52Preset=function(){const n=applyPreset(pd);save();prodRender();showToast(n?`✓ Dodano ${n} proizvoda iz Inventara`:"Sve predloženo već je na popisu");};
  window.dio52NAdd=function(){const v=($("d52N").value||"").trim();if(!v)return;(pd.needs=pd.needs||[]).push({id:"nd_"+Date.now(),name:v,done:false});save();prodRender();setTimeout(()=>$("d52N")&&$("d52N").focus(),30);};
  // ✓ Imam: nabavljena stvar ide u Inventar (✓ imam) i na popis proizvoda diorame
  window.dio52NOwn=function(i){
    const n=pd&&pd.needs[i];if(!n)return;
    const ex=allInv().find(x=>x.it.name.trim().toLowerCase()===n.name.trim().toLowerCase());
    const cats=[...new Set(["Teren i diorama",...(typeof orderedCats==="function"?orderedCats():Object.keys(S.inventar))])];
    let ov=$("dio52Own");if(ov)ov.remove();
    ov=document.createElement("div");ov.id="dio52Own";ov.className="modal-overlay";ov.style.zIndex="1300";
    ov.innerHTML=`<div class="modal f47" style="max-width:460px;width:95%"><h3>✓ Imam — dodaj u Inventar</h3>
      ${ex?`<div class="qa50-warn own">U Inventaru već postoji „${esc(ex.it.name)}” (${esc(ex.cat)}). Spremanjem se samo poveže s dioramom i označi ✓ imam.</div>`:""}
      <label>Naziv *</label><input id="d52oName" value="${esc(ex?ex.it.name:n.name)}">
      <label>Šifra (opcionalno)</label><input id="d52oCode" value="${esc(ex?ex.it.code:"")}" placeholder="npr. AK8020">
      <label>Rubrika</label><select id="d52oCat">${cats.map(c=>`<option${c===(ex?ex.cat:"Teren i diorama")?" selected":""}>${esc(c)}</option>`).join("")}</select>
      <label>Proizvođač (opcionalno)</label><input id="d52oMfr" value="${esc(ex?ex.it.mfr||"":"")}">
      <label>Cijena (opcionalno)</label><input id="d52oPrice" value="${esc(ex?ex.it.price||"":"")}" placeholder="npr. 4,50 €">
      <div class="modal-btns"><button class="btn-secondary" onclick="document.getElementById('dio52Own').remove()">Odustani</button><button class="btn-primary" onclick="dio52NOwnSave(${i})">✓ Spremi kao „imam”</button></div></div>`;
    ov.addEventListener("click",e=>{if(e.target===ov)ov.remove();});document.body.appendChild(ov);ov.style.display="flex";
    setTimeout(()=>$("d52oName").focus(),50);
  };
  window.dio52NOwnSave=function(i){
    const n=pd&&pd.needs[i];if(!n)return;
    const name=$("d52oName").value.trim();if(!name){$("d52oName").focus();return;}
    const code=$("d52oCode").value.trim()||"–",cat=$("d52oCat").value,mfr=$("d52oMfr").value.trim(),pr=$("d52oPrice").value.trim();
    let x=allInv().find(y=>y.it.name.trim().toLowerCase()===name.toLowerCase())||(code!=="–"?findInv(code):null);
    if(x){x.it.status="imam";if(pr&&!x.it.price)x.it.price=pr;if(mfr&&!x.it.mfr)x.it.mfr=mfr;}
    else{
      if(!S.inventar[cat]){S.inventar[cat]={items:[]};if(Array.isArray(S.catOrder)&&!S.catOrder.includes(cat))S.catOrder.push(cat);}
      const it={id:"d_"+Date.now(),mfr,code,name,desc:"Nabavljeno za dioramu: "+pd.name,note:"",price:pr,opened:"",pdfUrl:"",imgs:[],status:"imam",tags:["diorama"],swatches:[],subgroup:null,isSetHeader:false,createdAt:Date.now()};
      S.inventar[cat].items.push(it);x={cat,it};
    }
    pd.products=pd.products||[];
    if(!pd.products.some(p=>p.iid===x.it.id))pd.products.push({iid:x.it.id,code:x.it.code,name:x.it.name,cat:x.cat});
    pd.needs.splice(i,1);
    const before=(S.zelje||[]).length;
    S.zelje=(S.zelje||[]).filter(w=>!(w.name.trim().toLowerCase()===n.name.trim().toLowerCase()&&(w.note||"").includes("Za dioramu")));
    const rmW=before-S.zelje.length;
    save();$("dio52Own").remove();prodRender();render();try{renderStats();}catch(e){}
    showToast(`✓ „${x.it.name}” je u Inventaru (${x.cat})${rmW?" · uklonjeno sa Želja":""}`);
  };
  window.dio52NRm=function(i){pd.needs.splice(i,1);save();prodRender();};
  window.dio52NDone=function(i,v){pd.needs[i].done=v;save();prodRender();};
  function toWish(n){
    if((S.zelje||[]).some(w=>w.name.toLowerCase()===n.name.toLowerCase())){n.wish=true;return 0;}
    S.zelje.push({id:"w_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),cat:"Teren i diorama",code:"–",name:n.name,desc:"",price:"–",prio:3,note:"Za dioramu: "+pd.name});n.wish=true;return 1;
  }
  window.dio52NWish=function(i){const k=toWish(pd.needs[i]);save();prodRender();showToast(k?"✦ Dodano u Želje":"Već je u Željama");};
  window.dio52NWishAll=function(){let k=0;pd.needs.forEach(n=>{if(!n.done&&!n.wish)k+=toWish(n);});save();prodRender();showToast(`✦ ${k} stavki dodano u Želje`);};

  // ═════ navigacija ═════
  const _show=window.showPage;
  window.showPage=function(p){const r=_show.apply(this,arguments);if(p==="diorame"){render();const fs=$("filterTabs");if(fs)fs.style.display="none";}return r;};
  const _rm=window.renderMakete;window.renderMakete=function(){const r=_rm.apply(this,arguments);try{if(page==="diorame")render();}catch(e){}return r;};
  (function search(){const i=$("dio52Q");if(i)i.oninput=()=>{q=i.value.trim().toLowerCase();render();};})();
  // kartica makete: oznaka u kojoj je diorami
  const _bmc=window.buildModelCard;
  window.buildModelCard=function(m){
    const el=_bmc.apply(this,arguments);
    const ds=D().filter(d=>(d.makete||[]).includes(m.id));
    if(ds.length){const b=document.createElement("div");b.className="dio52-in";b.innerHTML=ds.map(d=>`🏞️ <span onclick="showPage('diorame',document.querySelector('.nav-tab.t-diorame'))">${esc(d.name)}</span>`).join(" · ");
      const n=el.querySelector(".model-card-meta");if(n)n.after(b);}
    return el;
  };
})();
