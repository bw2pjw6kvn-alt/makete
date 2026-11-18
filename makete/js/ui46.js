// ── v45.8: preglednost i nove mogućnosti ────────────────────────────────
// 1) grupirana navigacija  2) "⋯" izbornik na karticama  3) Želje: sažetak i traženje
// 4) Makete: "Što mi treba"  5) Računi: potrošnja  6) automatski backup u mapu
(function(){
  "use strict";
  const fmt=v=>(v||0).toLocaleString("hr-HR",{minimumFractionDigits:2,maximumFractionDigits:2})+" €";
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");

  // ── 1) navigacija: Kolekcija | Radionica | Znanje ▾ ──
  const KNOW=[["redoslijed","🧭 Izrada"],["upute","📋 Upute"],["ekvivalencije","🎨 Usporedba boja"],["oznake","🎖️ Oznake"],["izvori","🔗 Izvori"],["prirucnici","📖 Priručnici"],["knjiznica","📚 Knjižnica"]];
  (function navGroups(){
    const tabs=document.querySelector(".nav-tabs");if(!tabs||tabs.dataset.g46)return;tabs.dataset.g46="1";
    const tab=p=>tabs.querySelector(".nav-tab.t-"+(p==="inventar"?"inv":p==="ekvivalencije"?"ekv":p));
    const sep=()=>{const s=document.createElement("span");s.className="nav-sep46";return s;};
    const zel=tab("zelje"),rac=tab("narudzba"),mak=tab("makete");
    if(rac&&mak)rac.after(sep());
    const dio=tabs.querySelector(".nav-tab.t-diorame");if(mak)(dio||mak).after(sep());
    const inv=tab("inventar");if(inv)inv.textContent="🧰 Inventar";
    if(zel)zel.textContent="✦ Želje";if(rac)rac.textContent="🧾 Računi";if(mak)mak.textContent="⬡ Makete";
    KNOW.forEach(([p])=>{const t=tab(p);if(t)t.classList.add("know46");});
    const wrap=document.createElement("div");wrap.className="nav-know46";
    wrap.innerHTML=`<button class="nav-tab know-btn46" id="knowBtn46">📚 Znanje ▾</button><div class="know-menu46" id="knowMenu46">${KNOW.map(([p,l])=>`<button data-p="${p}">${l}</button>`).join("")}</div>`;
    tabs.appendChild(wrap);
    const btn=wrap.querySelector("#knowBtn46"),menu=wrap.querySelector("#knowMenu46");
    // izbornik ide izravno u <body> (traka s karticama ima overflow pa bi ga odrezala)
    document.body.appendChild(menu);
    const place=()=>{const r=btn.getBoundingClientRect();menu.style.top=(r.bottom+6)+"px";menu.style.left=Math.max(8,Math.min(innerWidth-220,r.left))+"px";};
    btn.onclick=e=>{e.stopPropagation();place();menu.classList.toggle("open");};
    window.addEventListener("resize",()=>menu.classList.remove("open"));
    window.addEventListener("scroll",()=>menu.classList.remove("open"),{passive:true});
    menu.onclick=e=>{const b=e.target.closest("button");if(!b)return;menu.classList.remove("open");showPage(b.dataset.p,tab(b.dataset.p));};
    document.addEventListener("click",()=>menu.classList.remove("open"));
    const _show=window.showPage;
    window.showPage=function(p){const r=_show.apply(this,arguments);
      const k=KNOW.find(x=>x[0]===p);btn.classList.toggle("active",!!k);btn.textContent=k?`📚 ${k[1].replace(/^\S+\s/,"")} ▾`:"📚 Znanje ▾";
      if(p==="narudzba")spendPanel();if(p==="zelje")wishSummary();return r;};
  })();

  // ── 2) "⋯" izbornik na karticama proizvoda: zatvori klikom izvan ──
  document.addEventListener("click",e=>{
    if(e.target.closest(".pa-more-btn")||e.target.closest(".pa-more"))return;
    document.querySelectorAll(".product.pa-open").forEach(p=>p.classList.remove("pa-open"));
  });

  // ── 3) Želje: sažetak ──
  function wishSummary(){
    const page=document.querySelector("#page-zelje .main");if(!page)return;
    let el=document.getElementById("wishSum46");
    if(!el){el=document.createElement("div");el.id="wishSum46";el.className="sum46";const t=page.querySelector("table.wish-table");page.insertBefore(el,t);}
    const W=S.zelje||[];
    const priced=W.filter(w=>parsePrice(w.price)>0);
    const total=priced.reduce((a,w)=>a+parsePrice(w.price),0);
    const byP=[1,2,3].map(p=>W.filter(w=>Number(w.prio)===p).length);
    const forM=W.filter(w=>w.forMaketa).length;
    el.innerHTML=`<div class="sum46-box"><b>${W.length}</b><span>želja</span></div>
      <div class="sum46-box"><b>${priced.length?fmt(total):"–"}</b><span>procjena${priced.length<W.length?` (${W.length-priced.length} bez cijene)`:""}</span></div>
      ${forM?`<div class="sum46-box"><b>${forM}</b><span>za makete u izradi</span></div>`:""}
      <div class="sum46-hint">🔎 traži na makete.eu · želje dodane iz „🧰 Što mi treba” imaju oznaku makete</div>`;
  }
  const _rz=window.renderZelje;window.renderZelje=function(){const r=_rz.apply(this,arguments);try{wishSummary();}catch(e){}return r;};

  // ── 4) Makete: "Što mi treba" za sljedeći korak ──
  const STEP_TASKS={1:[],2:["primer","airbrush"],3:["airbrush","osnovna"],4:["osnovna","airbrush"],5:["osnovna","airbrush"],6:["lak"],7:["dekali"],8:["lak"],
    9:["modulacija"],10:["wash"],11:["lak"],12:["chipping"],13:["hrdja","prasina"],14:["prasina","blato"],15:["lak"]};
  const STEP_EXTRA={1:"Mlaka voda, deterdžent za posuđe, stara četkica za zube — ništa iz inventara nije potrebno."};
  let needM=null,needStep=1;
  function invByCode(code){const k=nk(code);for(const [cat,cd] of Object.entries(S.inventar))for(const it of cd.items||[])if(nk(it.code)===k)return {cat,it};return null;}
  window.openNeed46=function(id){
    const m=S.makete.find(x=>x.id===id);if(!m)return;
    needM=m;needStep=Math.min(REDOSLIJED_STEPS.length,(m.stage||0)+1);
    let ov=document.getElementById("needModal46");if(ov)ov.remove();
    ov=document.createElement("div");ov.id="needModal46";ov.className="modal-overlay";
    ov.innerHTML=`<div class="modal need46" style="max-width:640px;width:95%"><div id="need46Body"></div>
      <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn-sm" onclick="document.getElementById('needModal46').remove()">Zatvori</button></div></div>`;
    ov.addEventListener("click",e=>{if(e.target===ov)ov.remove();});
    document.body.appendChild(ov);needRender();
  };
  window.need46Step=n=>{needStep=Number(n);needRender();};
  function needRender(){
    const m=needM,box=document.getElementById("need46Body");if(!m||!box)return;
    const step=REDOSLIJED_STEPS[needStep-1]||{};
    const tasks=(STEP_TASKS[needStep]||[]).map(k=>PLAN_TASKS.find(t=>t.key===k)).filter(Boolean);
    const planned=new Set(tasks.flatMap(t=>(m.plan&&m.plan.products&&m.plan.products[t.key])||[]));
    let rows=[];const seen=new Set();
    const taskOk=tasks.map(t=>{const sug=planSuggest(t).filter(x=>!x.it.isSetHeader);sug.forEach(x=>{if(!seen.has(x.it.id)){seen.add(x.it.id);rows.push({...x,planned:planned.has(x.it.id)});}});return {t,n:sug.length};});
    rows.sort((a,b)=>Number(b.planned)-Number(a.planned));
    const shown=rows.slice(0,14);
    // boje makete (za korake s bojom)
    const colorSteps=[3,4,5,9];
    const colors=(m.colors||[]).map(c=>({code:c,hit:(window.findInv47?findInv47(c):null)||invByCode(c)}));
    const missing=colors.filter(c=>!c.hit||c.hit.it.status!=="imam");
    const wishHas=c=>(S.zelje||[]).some(w=>nk(w.code)===nk(c));
    // provjera prije faze: stol (kvačice), spremnost, recepti za korak
    const bench=(m.bench46&&m.bench46.step===needStep)?m.bench46.ids:[];
    const lacks=taskOk.filter(x=>!x.n).map(x=>x.t.name);
    const colMiss=colorSteps.includes(needStep)?missing.length:0;
    const ready=!lacks.length&&!colMiss;
    const recs=(m.recepti||[]).filter(r=>Number(r.faza)===needStep);
    const isNext=needStep===(m.stage||0)+1;
    box.innerHTML=`<h3>🧰 Provjera prije faze — ${esc(m.name)}</h3>
      <div class="need46-step"><label>Korak</label><select onchange="need46Step(this.value)">${REDOSLIJED_STEPS.map(s=>`<option value="${s.n}"${s.n===needStep?" selected":""}>${s.n}. ${s.icon} ${esc(s.name)}${s.n===(m.stage||0)+1?" (sljedeći)":""}${s.n<=(m.stage||0)?" ✓":""}</option>`).join("")}</select></div>
      ${tasks.length||colorSteps.includes(needStep)?`<div class="bench46 ${ready?"ok":"warn"}">${ready?`✅ <b>Spreman si za „${esc(step.name||"")}”</b>`:`⚠ <b>Nedostaje:</b> ${[...lacks.map(esc),colMiss?`${colMiss} boj${colMiss===1?"a":"e"} makete`:""].filter(Boolean).join(", ")}`}
        ${tasks.length?`<div class="bench46-tasks">${taskOk.map(x=>`<span class="${x.n?"ok":"no"}">${x.n?"✓":"✗"} ${x.t.icon} ${esc(x.t.name)}${x.n?` (${x.n})`:""}</span>`).join("")}</div>`:""}</div>`:""}
      ${STEP_EXTRA[needStep]?`<div class="ekv-hint">${STEP_EXTRA[needStep]}</div>`:""}
      ${window.WAIT48&&WAIT48[needStep]?`<div class="ekv-hint wait48">⏱ Nakon ovog koraka: <b>${WAIT48[needStep]}</b> <span style="color:var(--muted)">(Kratki savjet)</span></div>`:""}
      ${tasks.length?`<div class="oz-sub">Pripremi na stol${planned.size?" (📌 = odabrano u Planu radova)":""} <span style="color:var(--muted)">${bench.length?`· ${bench.filter(id=>shown.some(x=>x.it.id===id)).length}/${shown.length} spremno`:"· označi kvačicom što si pripremio"}</span></div>
      ${shown.length?`<div class="need46-list">${shown.map(x=>`<div class="need46-item bench46-row${bench.includes(x.it.id)?" done":""}">
        <input type="checkbox" ${bench.includes(x.it.id)?"checked":""} onchange="need46Bench('${x.it.id}',this.checked)">
        ${(x.it.swatches&&x.it.swatches[0])?`<span class="color-swatch" style="background:${x.it.swatches[0]}"></span>`:""}
        <span class="need46-c">${esc(x.it.code||"")}</span><span class="need46-n">${x.planned?"📌 ":""}${esc(x.it.name)}</span><small>${esc(x.cat)}</small>
        <button class="btn-sm" onclick="goToItems46(['${x.it.id}'])" title="Otvori u Inventaru">→</button></div>`).join("")}</div>
        ${rows.length>shown.length?`<div class="ekv-hint">…i još ${rows.length-shown.length} u Inventaru (Plan radova ih prikazuje sve).</div>`:""}`
        :`<div class="ekv-hint" style="color:var(--nemam-txt)">Za ovaj korak nemaš ništa u Inventaru.</div>`}`:""}
      ${colorSteps.includes(needStep)&&colors.length?`<div class="oz-sub">Boje odabrane za maketu</div><div class="need46-list">${colors.map(c=>{
        const own=c.hit&&c.hit.it.status==="imam";
        return `<div class="need46-item ${own?"":"miss"}">${own?"✓":"✗"} <span class="need46-c">${esc(c.code)}</span><span class="need46-n">${own?esc(c.hit.it.name):"nemaš"}</span>
          ${own?`<button class="btn-sm" onclick="goToItems46(['${c.hit.it.id}'])">→</button>`:(wishHas(c.code)?`<small>već u Željama</small>`:`<button class="btn-sm" onclick="need46Wish('${esc(c.code)}')">✦ u Želje</button>`)}</div>`;}).join("")}</div>
        ${missing.length?`<div class="ekv-hint">${missing.length} boja nedostaje.${missing.filter(c=>!wishHas(c.code)).length>1?` <button class="btn-sm" onclick="need46WishAll()">✦ Sve u Želje</button>`:""}</div>`:`<div class="ekv-hint" style="color:var(--imam-txt)">✓ Sve boje makete imaš.</div>`}`:""}
      ${recs.length?`<div class="oz-sub">🧪 Tvoji recepti za ovaj korak</div><div class="need46-list">${recs.map(r=>`<div class="need46-item rec46"><span class="need46-n"><b>${esc(r.name)}</b><br><small>${esc((r.sastojci||"").split("\n").join(" · "))}${r.ab?" · 💨 "+esc(r.ab):""}</small></span></div>`).join("")}</div>`:""}
      <div class="bench46-foot">
        ${isNext?`<button class="btn-sm" onclick="need46Done()" style="color:var(--materijal);border-color:rgba(122,184,154,.4)">✓ Korak ${needStep} gotov</button>`:""}
        ${typeof openProg47==="function"?`<button class="btn-sm" onclick="document.getElementById('needModal46').remove();openProg47('${m.id}',${needStep})">📸 Fotka ovog koraka</button>`:""}
        <button class="btn-sm" onclick="openReceptiModal('${m.id}')">🧪 Recepti</button>
      </div>
      <div class="ekv-hint" style="margin-top:8px">Savjet: u „🛠️ Plan radova” odaberi konkretne proizvode po koraku — ovdje se onda prikazuju prvi (📌).</div>`;
  }
  window.need46Bench=function(id,on){
    const m=needM;if(!m)return;
    if(!m.bench46||m.bench46.step!==needStep)m.bench46={step:needStep,ids:[]};
    const L=m.bench46.ids,i=L.indexOf(id);if(on&&i<0)L.push(id);if(!on&&i>=0)L.splice(i,1);
    save();needRender();
  };
  window.need46Done=function(){
    const m=needM;if(!m)return;document.getElementById("needModal46").remove();
    delete m.bench46;advanceModelStage(m.id);
  };
  window.need46WishAll=function(){
    const m=needM;if(!m)return;let n=0;
    (m.colors||[]).forEach(c=>{const h=(window.findInv47?findInv47(c):null)||invByCode(c);if((!h||h.it.status!=="imam")&&!(S.zelje||[]).some(w=>nk(w.code)===nk(c))){
      S.zelje.push({id:"w_"+Date.now()+"_"+n,cat:typeof schWishCat==="function"?schWishCat(c):"",code:c,name:c+" (za "+m.name+")",desc:"",price:"–",prio:2,note:"Za maketu "+m.name,forMaketa:m.id});n++;}});
    save();showToast(`✦ ${n} boja dodano u Želje`);needRender();
  };
  window.need46Wish=function(code){
    const m=needM;if(!m)return;
    S.zelje.push({id:"w_"+Date.now(),cat:typeof schWishCat==="function"?schWishCat(code):"",code,name:code+" (za "+m.name+")",desc:"",price:"–",prio:2,note:"Za maketu "+m.name,forMaketa:m.id});
    save();showToast("✦ "+code+" dodano u Želje");needRender();
  };

  // ── 5) Računi: potrošnja ──
  function spendPanel(){
    const page=document.querySelector("#page-narudzba .main");if(!page)return;
    let el=document.getElementById("spend46");
    if(!el){el=document.createElement("div");el.id="spend46";el.className="sum46 spend46";page.insertBefore(el,document.getElementById("narudzbaList"));}
    const O=(S.narudzbe||[]).filter(o=>orderPaidOrSum(o)>0);
    if(!O.length){el.innerHTML="";return;}
    const total=O.reduce((a,o)=>a+orderPaidOrSum(o),0);
    const byY={};O.forEach(o=>{const y=new Date(o.date||0).getFullYear();byY[y]=(byY[y]||0)+orderPaidOrSum(o);});
    const yNow=new Date().getFullYear();
    const months=[];for(let i=11;i>=0;i--){const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-i);months.push({y:d.getFullYear(),m:d.getMonth(),v:0});}
    O.forEach(o=>{const d=new Date(o.date||0);const b=months.find(x=>x.y===d.getFullYear()&&x.m===d.getMonth());if(b)b.v+=orderPaidOrSum(o);});
    const max=Math.max(...months.map(x=>x.v),1);
    const MN=["sij","velj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro"];
    const byShop={};O.forEach(o=>{const s=o.shop||"ostalo";byShop[s]=(byShop[s]||0)+orderPaidOrSum(o);});
    el.innerHTML=`<div class="sum46-box"><b>${fmt(total)}</b><span>ukupno (${O.length} računa)</span></div>
      ${Object.keys(byY).sort().reverse().map(y=>`<div class="sum46-box"><b>${fmt(byY[y])}</b><span>${y}.${Number(y)===yNow?" (ova godina)":""}</span></div>`).join("")}
      <div class="spend46-chart" title="Potrošnja zadnjih 12 mjeseci">${months.map(x=>`<div class="spend46-col" title="${MN[x.m]} ${x.y}: ${fmt(x.v)}"><div class="spend46-bar" style="height:${Math.round(x.v/max*100)}%"></div><span>${MN[x.m]}</span></div>`).join("")}</div>
      <div class="sum46-hint">Trgovine: ${Object.entries(byShop).sort((a,b)=>b[1]-a[1]).map(([s,v])=>`${esc(s)} ${fmt(v)}`).join(" · ")}</div>`;
  }
  const _rn=window.renderNarudzba;window.renderNarudzba=function(){const r=_rn.apply(this,arguments);try{spendPanel();}catch(e){}return r;};

  // ── 6) automatski backup u odabranu mapu (npr. Google Drive) ──
  const AB_KEY="__autobackup46";
  const abOn=()=>AppStore.getItem(AB_KEY)!=="0";
  let abTimer=null,abLast=0;
  async function autoBackup(force){
    if(!abOn()||!("showDirectoryPicker" in window))return;
    let h=null;try{h=await fsIdbGet(FS_KEY);}catch(e){}
    if(!h)return;
    try{if((await h.queryPermission({mode:"readwrite"}))!=="granted"){abBadge("dozvola");return;}}catch(e){return;}
    try{
      const json=JSON.stringify(S);
      const write=async name=>{const fh=await h.getFileHandle(name,{create:true});const w=await fh.createWritable();await w.write(json);await w.close();};
      await write("makete_alati_AUTO_backup.json");
      const day="makete_alati_backup_"+new Date().toISOString().slice(0,10)+".json";
      await write(day);
      abLast=Date.now();hasUnexportedChanges=false;updateBackupBadge();abBadge("ok");
      if(force)showToast(`✓ Auto-backup spremljen u "${h.name}"`);
    }catch(e){console.warn("autoBackup",e);abBadge("greška");}
  }
  function abBadge(state){
    const b=document.getElementById("abBtn46");if(!b)return;
    b.dataset.state=state;
    b.textContent=!abOn()?"🔄 Auto-backup: isključen":state==="dozvola"?"🔄 Auto-backup: klikni za nastavak":state==="ok"?"🔄 Auto-backup ✓ "+new Date(abLast).toLocaleTimeString("hr-HR",{hour:"2-digit",minute:"2-digit"}):"🔄 Auto-backup";
  }
  (function abButton(){
    const bar=document.getElementById("bottomBar");if(!bar||document.getElementById("abBtn46"))return;
    const b=document.createElement("button");b.className="btn-sm";b.id="abBtn46";
    b.title="Nakon izmjena aplikacija sama sprema backup u mapu odabranu gumbom 📁 Mapa (preporuka: mapa Google Drive za računalo, pa je backup automatski i u oblaku). Radi u Chrome/Edge.";
    b.onclick=async()=>{
      if(!("showDirectoryPicker" in window)){showToast("Auto-backup radi u Chrome/Edge na računalu");return;}
      let h=null;try{h=await fsIdbGet(FS_KEY);}catch(e){}
      if(!h){const ok=await customConfirm("Odaberi mapu u koju će se backup automatski spremati. Preporuka: mapa Google Drive (ili OneDrive) na računalu — tako je backup odmah i u oblaku.","Auto-backup");if(!ok)return;await chooseBackupFolder();h=await fsIdbGet(FS_KEY);if(!h)return;}
      try{if((await h.queryPermission({mode:"readwrite"}))!=="granted"){if((await h.requestPermission({mode:"readwrite"}))!=="granted")return;}}catch(e){}
      if(!abOn()){AppStore.setItem(AB_KEY,"1");}
      await autoBackup(true);
    };
    b.oncontextmenu=e=>{e.preventDefault();AppStore.setItem(AB_KEY,abOn()?"0":"1");abBadge();showToast(abOn()?"Auto-backup uključen":"Auto-backup isključen");};
    const anchor=document.getElementById("backupFolderBtn");if(anchor)anchor.after(b);else bar.appendChild(b);
    abBadge();
  })();
  const _save=window.save;
  window.save=function(){const r=_save.apply(this,arguments);clearTimeout(abTimer);abTimer=setTimeout(()=>autoBackup(false),Date.now()-abLast>30*60*1000?20*1000:5*60*1000);return r;};
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"&&hasUnexportedChanges)autoBackup(false);});
  setTimeout(()=>autoBackup(false),4000);
})();

// ── v45.9: donja traka uklonjena — gumbi premješteni u "⚙ Podaci", Backup gore desno ──
(function dataPanel(){
  "use strict";
  const bar=document.getElementById("bottomBar"),right=document.querySelector(".nav-right");
  if(!bar||!right||document.getElementById("dataBtn46"))return;
  const $=id=>document.getElementById(id);
  // 1) gore desno: 💾 Backup (s točkom kad ima nespremljenih promjena) + ⚙ Podaci
  const bk=$("backupBtn");
  if(bk){bk.className="btn-sm backup-top46";bk.textContent="💾 Backup";bk.title="Spremi backup (JSON) — točka znači da ima promjena od zadnjeg backupa";right.insertBefore(bk,right.lastElementChild);}
  const db=document.createElement("button");db.className="btn-sm";db.id="dataBtn46";db.textContent="⚙";db.title="Podaci: backup, uvoz, rubrike, uklonjene stavke";
  db.onclick=()=>openData46();right.insertBefore(db,right.lastElementChild);
  // 2) panel s ostalim radnjama (postojeći gumbi se samo premještaju, rade isto kao prije)
  const ov=document.createElement("div");ov.id="dataModal46";ov.className="modal-overlay";ov.style.display="none";
  ov.innerHTML=`<div class="modal data46" style="max-width:560px;width:95%">
    <h3>⚙ Podaci i održavanje</h3>
    <div class="data46-sec"><div class="oz-sub">Backup</div><div class="data46-row" id="d46Backup"></div>
      <div class="ekv-hint">💾 Backup sprema sve podatke u JSON datoteku. 📁 Mapa odabire gdje se sprema (preporuka: mapa Google Drive na računalu), a 🔄 Auto-backup onda sprema sam nakon izmjena.</div></div>
    <div class="data46-sec"><div class="oz-sub">Uvoz</div><div class="data46-row" id="d46Import"></div>
      <div class="ekv-hint">Uvoz JSON-a zamjenjuje sve trenutne podatke (npr. backup s računala na mobitelu).</div></div>
    <div class="data46-sec"><div class="oz-sub">Inventar</div><div class="data46-row" id="d46Inv"></div>
</div>
    <div class="data46-sec danger"><div class="oz-sub">Opasno</div><div class="data46-row" id="d46Danger"></div></div>
    <div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="btn-sm" onclick="closeData46()">Zatvori</button></div></div>`;
  document.body.appendChild(ov);
  ov.addEventListener("click",e=>{if(e.target===ov)closeData46();});
  const move=(sel,to,label,title)=>{const el=typeof sel==="string"?bar.querySelector(sel)||$(sel):sel;if(!el)return;if(label)el.textContent=label;if(title)el.title=title;el.classList.add("btn-sm");el.classList.remove("btn-export");$(to).appendChild(el);};
  move("backupFolderBtn","d46Backup");
  const bk2=document.createElement("button");bk2.className="btn-sm";bk2.textContent="💾 Backup sada";bk2.onclick=()=>exportData();$("d46Backup").prepend(bk2);
  move("abBtn46","d46Backup");
  [...bar.querySelectorAll("label")].forEach(l=>{l.classList.add("btn-sm");l.classList.remove("btn-export");$("d46Import").appendChild(l);});
  move(bar.querySelector('[onclick="openNewCatModal()"]'),"d46Inv","+ Nova rubrika");
  move("rebuildBtn","d46Inv","🧾 Složi iz računa","Dodaj u Inventar i Makete sve što je na Računima, a još nije tamo");
  ["restoreRemovedBtn","purgeRemovedBtn"].forEach(id=>{const b=$(id);if(b)b.remove();});   // sve je vraćeno u v45.10
  move(bar.querySelector('[onclick="resetData()"]'),"d46Danger","⚠ Resetiraj sve podatke");
  // "Sažmi slike" više nije potreban (nema ograničenja memorije), "Lista za kupovinu" ide u Želje
  bar.querySelectorAll('[onclick="recompressAllUploadedImages()"],[onclick="printShoppingList()"]').forEach(b=>b.remove());
  bar.classList.add("gone46");
  window.openData46=()=>{
    ov.style.display="flex";
  };
  window.closeData46=()=>{ov.style.display="none";};
  // ispis popisa želja (umjesto stare "Liste za kupovinu" koja je ispisivala samo "nemam" iz Inventara)
  const hdr=document.querySelector("#page-zelje .section-hdr");
  if(hdr&&!$("wishPrint46")){const b=document.createElement("button");b.className="btn-sm";b.id="wishPrint46";b.textContent="🖨 Lista za kupovinu";b.onclick=()=>printWish46();hdr.insertBefore(b,hdr.children[2]||null);}
  window.printWish46=function(){
    const W=[...(S.zelje||[])].sort((a,b)=>String(a.cat||"").localeCompare(String(b.cat||""),"hr")||String(a.name).localeCompare(String(b.name),"hr"));
    if(!W.length){showToast("Popis želja je prazan");return;}
    const rows=W.map(w=>`<tr><td>${esc(w.code||"–")}</td><td>${esc(w.name)}${w.forMaketa?` <i>(za: ${esc((S.makete.find(m=>m.id===w.forMaketa)||{}).name||"")})</i>`:""}</td><td>${esc(w.cat||"")}</td><td>${parsePrice(w.price)>0?esc(w.price):""}</td><td style="width:22px;border:1px solid #999"></td></tr>`).join("");
    const win=window.open("","_blank");if(!win){alert("Preglednik je blokirao novi prozor za ispis.");return;}
    win.document.write(`<!DOCTYPE html><html lang="hr"><head><meta charset="UTF-8"><title>Lista za kupovinu – Makete &amp; Alati</title><style>body{font-family:Arial,sans-serif;color:#111;padding:1.5rem;max-width:820px;margin:0 auto}h1{font-size:20px;border-bottom:2px solid #111;padding-bottom:.4rem}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border-bottom:1px solid #ddd;padding:5px 6px;text-align:left;vertical-align:top}th{background:#f2f2f2}i{color:#666}@media print{body{padding:0}}</style></head><body><h1>Lista za kupovinu <span style="font-weight:400;font-size:13px;color:#666">(${W.length} stavki, ${new Date().toLocaleDateString("hr-HR")})</span></h1><table><thead><tr><th>Šifra</th><th>Naziv</th><th>Kategorija</th><th>Cijena</th><th>✓</th></tr></thead><tbody>${rows}</tbody></table><script>setTimeout(()=>print(),300)<\/script></body></html>`);
    win.document.close();
  };
})();
