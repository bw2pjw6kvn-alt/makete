// ── v45.14: Imam li ovo? · fotografije napretka · recepti 2.0 · Scalemates ──
(function(){
  "use strict";
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const $=id=>document.getElementById(id);
  const allItems=()=>{const out=[];for(const [cat,cd] of Object.entries(S.inventar||{}))(cd.items||[]).forEach(it=>out.push({cat,it}));return out;};
  const STEPS=()=>{try{return (progM&&(S.diorame||[]).includes(progM)&&window.DIO_STEPS52)||REDOSLIJED_STEPS;}catch(e){return REDOSLIJED_STEPS;}};
  const stepName=n=>{const L=STEPS();return n>0?(L[n-1]?`${n}. ${L[n-1].icon} ${L[n-1].name}`:String(n)):"0 · Prije početka";};
  const modal=(id,html,w)=>{let ov=$(id);if(ov)ov.remove();ov=document.createElement("div");ov.id=id;ov.className="modal-overlay";
    ov.innerHTML=`<div class="modal f47" style="max-width:${w||640}px;width:95%">${html}</div>`;
    ov.addEventListener("click",e=>{if(e.target===ov)close47(id);});document.body.appendChild(ov);ov.style.display="flex";return ov;};
  window.close47=id=>{const ov=$(id);if(ov)ov.remove();if(id==="have47")stopScan();if(id==="prog47"){try{progM=null;}catch(e){}}};

  // Pronalazak stavke po šifri (70.603 = VAL70603 = 70603, 11001 = AK11001)
  function score(code,q){
    const c=nk(code),k=nk(q);if(!c||!k||c==="")return 0;
    if(c===k)return 100;
    if(k.length>=3&&c.endsWith(k)&&/^\d+$/.test(k))return 80;
    if(k.length>=4&&c.includes(k))return 70;
    return 0;
  }
  function findInv(code){
    let best=null,bs=0;
    allItems().forEach(x=>{if(x.it.isSetHeader&&!x.it.code)return;const s=score(x.it.code,code)+(x.it.status==="imam"?1:0);if(s>bs&&s>=80){bs=s;best=x;}});
    return best;
  }
  window.findInv47=findInv;

  // ═════════ 1) IMAM LI OVO? ═════════
  function search(q){
    q=(q||"").trim();if(q.length<2)return null;
    const toks=q.toLowerCase().split(/\s+/).filter(t=>t.length>=2);
    const textScore=(txt)=>toks.length&&toks.every(t=>txt.toLowerCase().includes(t))?50:0;
    const inv=[];
    allItems().forEach(({cat,it})=>{
      let s=Math.max(score(it.code,q),textScore([it.name,it.code,it.desc,it.subgroup,(it.tags||[]).join(" ")].join(" ")));
      if(it.ean&&nk(it.ean)===nk(q))s=110;
      if(s)inv.push({cat,it,s});
    });
    inv.sort((a,b)=>b.s-a.s||(a.it.status==="imam"?-1:1));
    const wish=(S.zelje||[]).map(w=>({w,s:Math.max(score(w.code,q),textScore([w.name,w.code].join(" ")))})).filter(x=>x.s).sort((a,b)=>b.s-a.s);
    const mak=(S.makete||[]).map(m=>({m,s:Math.max(score(m.code,q),textScore([m.name,m.code,m.mfr].join(" ")))})).filter(x=>x.s).sort((a,b)=>b.s-a.s);
    return {q,inv,wish,mak};
  }
  function verdict(r){
    const top=r.inv[0],strong=top&&top.s>=80;
    const own=r.inv.filter(x=>x.it.status==="imam"&&(x.s>=80||!strong));
    if(strong&&top.it.status==="imam")return {cls:"yes",t:"✓ IMAŠ",d:`${esc(top.it.code||"")} ${esc(top.it.name)} · ${esc(top.cat)}${top.it.subgroup?` · u kompletu ${esc(top.it.subgroup)}`:""}`};
    if(r.mak.length&&r.mak[0].s>=80)return {cls:"yes",t:"✓ IMAŠ OVU MAKETU",d:`${esc(r.mak[0].m.name)} (${esc(r.mak[0].m.code||"")})`};
    if(!strong&&own.length)return {cls:"maybe",t:`? ${own.length} slično imaš`,d:"Nema točne šifre — provjeri popis ispod."};
    if(r.wish.length&&r.wish[0].s>=50)return {cls:"wish",t:"✦ NEMAŠ — već je u Željama",d:esc(r.wish[0].w.name)};
    return {cls:"no",t:"✗ NEMAŠ",d:strong?`U Inventaru je označeno kao „nemam”: ${esc(top.it.name)}`:"Nije pronađeno u Inventaru, Željama ni Maketama."};
  }
  let lastQ="",linkEan=null;
  function renderHave(){
    const box=$("have47Res");if(!box)return;
    const q=$("have47In").value;lastQ=q;
    const r=search(q);
    if(!r){box.innerHTML=`<div class="ekv-hint">Upiši šifru ili dio naziva (npr. <b>70.603</b>, <b>11001</b>, <b>RC852</b>, <b>panzer grey</b>). Radi i bez interneta.</div>`;return;}
    const v=verdict(r);
    const isCode=/\d{3,}/.test(q);
    const row=({cat,it})=>`<div class="have47-row ${it.status==="imam"?"own":"miss"}">
        <span class="have47-st">${it.status==="imam"?"✓":"✗"}</span>
        ${(it.swatches&&it.swatches[0])?`<span class="color-swatch" style="background:${esc(it.swatches[0])}"></span>`:""}
        <span class="have47-c">${esc(it.code||"")}</span><span class="have47-n">${esc(it.name)}<small>${esc(cat)}${it.subgroup?" · "+esc(it.subgroup):""}</small></span>
        ${linkEan?`<button class="btn-sm" onclick="have47Link('${it.id}')">🔗 poveži barkod</button>`:`<button class="btn-sm" onclick="close47('have47');goToItems46(['${it.id}'])">→</button>`}</div>`;
    box.innerHTML=`<div class="have47-verdict ${v.cls}"><b>${v.t}</b><span>${v.d}</span></div>
      ${linkEan?`<div class="ekv-hint">Barkod <b>${esc(linkEan)}</b> još nije povezan. Upiši šifru ili naziv proizvoda pa klikni „🔗 poveži barkod” — idući put će ga skener odmah prepoznati.</div>`:""}
      ${r.inv.length?`<div class="oz-sub">Inventar (${r.inv.length})</div><div class="have47-list">${r.inv.slice(0,12).map(row).join("")}</div>`:""}
      ${r.wish.length?`<div class="oz-sub">Želje</div><div class="have47-list">${r.wish.slice(0,5).map(({w})=>`<div class="have47-row wish"><span class="have47-st">✦</span><span class="have47-c">${esc(w.code||"")}</span><span class="have47-n">${esc(w.name)}</span></div>`).join("")}</div>`:""}
      ${r.mak.length?`<div class="oz-sub">Makete</div><div class="have47-list">${r.mak.slice(0,5).map(({m})=>`<div class="have47-row own"><span class="have47-st">⬡</span><span class="have47-c">${esc(m.code||"")}</span><span class="have47-n">${esc(m.name)}</span></div>`).join("")}</div>`:""}
      <div class="have47-act">
        ${v.cls==="no"||v.cls==="maybe"?`<button class="btn-sm" onclick="have47Wish()">✦ Dodaj „${esc(q)}” u Želje</button>`:""}
        ${isCode&&v.cls!=="yes"?`<button class="btn-sm" onclick="close47('have47');findPaintEquivalents('${esc(q.trim())}')">🎨 Imam li zamjenu?</button>`:""}
      </div>`;
  }
  window.openHave47=function(){
    modal("have47",`<h3>🔎 Imam li ovo?</h3>
      <div class="have47-bar"><input id="have47In" type="search" autocomplete="off" placeholder="šifra ili naziv…" enterkeyhint="search">
      ${"BarcodeDetector" in window?`<button class="btn-sm" id="have47Scan" onclick="have47Scan()" title="Skeniraj barkod kamerom">📷</button>`:""}</div>
      <div id="have47Cam" class="have47-cam" style="display:none"><video id="have47Vid" playsinline muted></video><div class="have47-aim"></div></div>
      <div id="have47Res"></div>
      <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn-sm" onclick="close47('have47')">Zatvori</button></div>`,560);
    linkEan=null;
    const inp=$("have47In");inp.value="";inp.addEventListener("input",()=>{renderHave();});
    renderHave();setTimeout(()=>inp.focus(),60);
  };
  window.have47Wish=function(){
    const q=lastQ.trim();if(!q)return;
    const code=/\d{3,}/.test(q)?q.toUpperCase():"";
    S.zelje.push({id:"w_"+Date.now(),cat:code&&typeof schWishCat==="function"?schWishCat(code):"",code,name:q,desc:"",price:"–",prio:2,note:"Dodano iz „Imam li ovo?”"});
    save();showToast("✦ Dodano u Želje");renderHave();
  };
  window.have47Link=function(id){
    const it=allItems().find(x=>x.it.id===id);if(!it||!linkEan)return;
    it.it.ean=linkEan;save();showToast("🔗 Barkod povezan s "+(it.it.code||it.it.name));
    $("have47In").value=linkEan;linkEan=null;renderHave();
  };
  // skeniranje barkoda (Chrome na Androidu; na iPhoneu nije podržano)
  let stream=null,scanT=null;
  function stopScan(){clearInterval(scanT);scanT=null;if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}const c=$("have47Cam");if(c)c.style.display="none";}
  window.have47Scan=async function(){
    if(stream){stopScan();return;}
    try{
      const det=new BarcodeDetector({formats:["ean_13","ean_8","upc_a","upc_e","code_128","code_39"]});
      stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});
      const v=$("have47Vid");v.srcObject=stream;await v.play();$("have47Cam").style.display="block";
      scanT=setInterval(async()=>{
        try{const r=await det.detect(v);if(r&&r.length){const val=r[0].rawValue;stopScan();if(navigator.vibrate)navigator.vibrate(60);
          const hit=allItems().find(x=>x.it.ean&&nk(x.it.ean)===nk(val));
          if(hit){$("have47In").value=val;linkEan=null;}else{linkEan=val;$("have47In").value="";}
          renderHave();if(!hit)$("have47In").focus();}}catch(e){}
      },350);
    }catch(e){stopScan();showToast("Kamera nije dostupna: "+(e.message||e));}
  };
  // gumbi: računalo (gore desno) i mobitel (donja traka)
  (function haveButtons(){
    const right=document.querySelector(".nav-right");
    if(right&&!$("haveBtn47")){const b=document.createElement("button");b.className="btn-sm have-top47";b.id="haveBtn47";b.textContent="🔎 Imam li?";b.title="Brza provjera imaš li neki proizvod (npr. u trgovini)";b.onclick=()=>openHave47();right.insertBefore(b,right.firstChild);}
    const nav=document.querySelector(".mnav");
    if(nav&&!nav.querySelector('[data-p="__have"]')){
      const b=document.createElement("button");b.dataset.p="__have";b.innerHTML='<span class="mi">🔎</span>Imam li?';
      b.addEventListener("click",e=>{e.stopImmediatePropagation();openHave47();},true);
      const mak=nav.querySelector('[data-p="makete"]');nav.insertBefore(b,mak);
    }
  })();

  // ═════════ 2) FOTOGRAFIJE NAPRETKA ═════════
  let progM=null,progStep=0;
  const photos=m=>(m.progress46||[]);
  window.openProg47=function(id,step){
    const m=(S.makete.find(x=>x.id===id)||(S.diorame||[]).find(x=>x.id===id));if(!m)return;progM=m;
    progStep=step!=null?step:(m.stage||0);
    modal("prog47",`<div id="prog47Body"></div>
      <input type="file" id="prog47Cam" accept="image/*" capture="environment" style="display:none">
      <input type="file" id="prog47File" accept="image/*" multiple style="display:none">
      <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn-sm" onclick="close47('prog47')">Zatvori</button></div>`,760);
    const onFiles=async e=>{const fs=[...e.target.files];e.target.value="";if(!fs.length)return;
      showToast("Spremam "+fs.length+" fotografij"+(fs.length===1?"u":"e")+"…");
      for(const f of fs){if(!f.type.startsWith("image/"))continue;
        const url=await compressImage(f,1400,0.78);
        if(!progM.progress46)progM.progress46=[];
        progM.progress46.push({id:"ph_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),step:progStep,url,date:Date.now(),note:""});}
      save();progRender();renderMakete();showToast("📸 Fotografija spremljena");};
    $("prog47Cam").onchange=onFiles;$("prog47File").onchange=onFiles;
    progRender();
  };
  window.prog47Step=v=>{progStep=Number(v);};
  window.prog47Add=cam=>$(cam?"prog47Cam":"prog47File").click();
  function lbList(m){return photos(m).map(p=>({url:p.url,caption:`${m.name} · ${stepName(p.step)} · ${new Date(p.date).toLocaleDateString("hr-HR")}${p.note?" · "+p.note:""}`}));}
  window.prog47Open=function(id,phId){const m=(S.makete.find(x=>x.id===id)||(S.diorame||[]).find(x=>x.id===id));if(!m)return;const L=photos(m);openLightbox(lbList(m),Math.max(0,L.findIndex(p=>p.id===phId)));};
  window.prog47Note=async function(phId){const p=photos(progM).find(x=>x.id===phId);if(!p)return;
    const v=await customPrompt("Bilješka uz fotografiju","npr. što je napravljeno, koja boja, problem…",p.note||"");if(v===null)return;
    p.note=v.trim();save();progRender();};
  window.prog47Del=async function(phId){
    const L=photos(progM),i=L.findIndex(x=>x.id===phId);if(i<0)return;
    const [rm]=L.splice(i,1);save();progRender();renderMakete();
    showToastAction("Fotografija obrisana","Poništi",()=>{L.splice(i,0,rm);save();progRender();renderMakete();});
  };
  window.prog47Move=function(phId,step){const p=photos(progM).find(x=>x.id===phId);if(!p)return;p.step=Number(step);save();progRender();};
  function progRender(){
    const m=progM,box=$("prog47Body");if(!m||!box)return;
    const L=[...photos(m)].sort((a,b)=>a.step-b.step||a.date-b.date);
    const kb=Math.round(L.reduce((a,p)=>a+p.url.length*0.75,0)/1024);
    const groups={};L.forEach(p=>{(groups[p.step]=groups[p.step]||[]).push(p);});
    const opts=sel=>[0,...STEPS().map(s=>s.n)].map(n=>`<option value="${n}"${n===sel?" selected":""}>${esc(stepName(n))}</option>`).join("");
    const first=L[0],last=L[L.length-1];
    box.innerHTML=`<h3>📸 Napredak — ${esc(m.name)}</h3>
      <div class="prog47-add"><label>Faza</label><select onchange="prog47Step(this.value)">${opts(progStep)}</select>
        <button class="btn-sm" onclick="prog47Add(true)">📷 Snimi</button><button class="btn-sm" onclick="prog47Add(false)">🖼 Iz galerije</button></div>
      ${L.length>=2?`<div class="oz-sub">Prije i poslije</div><div class="prog47-ba">
        <figure onclick="prog47Open('${m.id}','${first.id}')"><img src="${first.url}" alt=""><figcaption>${esc(stepName(first.step))}<br>${new Date(first.date).toLocaleDateString("hr-HR")}</figcaption></figure>
        <figure onclick="prog47Open('${m.id}','${last.id}')"><img src="${last.url}" alt=""><figcaption>${esc(stepName(last.step))}<br>${new Date(last.date).toLocaleDateString("hr-HR")}</figcaption></figure></div>`:""}
      ${L.length?Object.keys(groups).map(Number).sort((a,b)=>a-b).map(s=>`<div class="oz-sub">${esc(stepName(s))} <span style="color:var(--muted)">(${groups[s].length})</span></div>
        <div class="prog47-grid">${groups[s].map(p=>`<div class="prog47-ph">
          <img src="${p.url}" alt="" loading="lazy" onclick="prog47Open('${m.id}','${p.id}')">
          <div class="prog47-meta">${new Date(p.date).toLocaleDateString("hr-HR")}${p.note?` · ${esc(p.note)}`:""}</div>
          <div class="prog47-tools"><button title="Bilješka" onclick="prog47Note('${p.id}')">✎</button>
            <select title="Premjesti u fazu" onchange="prog47Move('${p.id}',this.value)">${opts(p.step)}</select>
            <button title="Obriši" onclick="prog47Del('${p.id}')">✕</button></div></div>`).join("")}</div>`).join("")
        :`<div class="ekv-hint" style="margin-top:10px">Još nema fotografija. Snimi maketu nakon svake faze — na kraju dobiješ cijeli tijek izrade i usporedbu „prije i poslije”.</div>`}
      ${L.length?`<div class="ekv-hint" style="margin-top:10px">${L.length} fotografija · ${kb>1024?(kb/1024).toFixed(1)+" MB":kb+" KB"} · spremaju se u backup zajedno s ostalim podacima.</div>`:""}`;
  }

  // nakon "✓ Sljedeći korak": ponuda za fotografiju i provjeru sljedeće faze
  const _adv=window.advanceModelStage;
  window.advanceModelStage=function(id){
    const m=S.makete.find(x=>x.id===id);const before=m?m.stage||0:0;
    const r=_adv.apply(this,arguments);
    if(m&&(m.stage||0)>before)snack(m);
    return r;
  };
  function snack(m){
    let el=$("snack47");if(el)el.remove();
    el=document.createElement("div");el.id="snack47";el.className="snack47";
    const nxt=m.stage<REDOSLIJED_STEPS.length?REDOSLIJED_STEPS[m.stage]:null;
    const w=window.WAIT48&&WAIT48[m.stage];
    el.innerHTML=`<div><b>✓ ${esc(stepName(m.stage))}</b> gotovo${w?`<br><small style="color:var(--gold)">⏱ ${esc(w)}</small>`:""}</div>
      <div class="snack47-btns"><button class="btn-sm" onclick="document.getElementById('snack47').remove();openProg47('${m.id}',${m.stage})">📸 Fotka</button>
      ${nxt?`<button class="btn-sm" onclick="document.getElementById('snack47').remove();openNeed46('${m.id}')">🧰 Provjera: ${esc(nxt.name)}</button>`:""}
      <button class="btn-sm" onclick="document.getElementById('snack47').remove()">✕</button></div>`;
    document.body.appendChild(el);
    setTimeout(()=>{if(el.isConnected)el.remove();},12000);
  }

  // ═════════ 3) SCALEMATES ═════════
  function smQuery(m){
    const code=(m.code||"").trim(),mfr=(m.mfr||"").trim();
    if(code&&code!=="–")return (mfr&&!code.toLowerCase().includes(mfr.toLowerCase())?mfr+" ":"")+code;
    return (mfr?mfr+" ":"")+m.name;
  }
  window.openSm47=function(id){
    const m=S.makete.find(x=>x.id===id);if(!m)return;
    const url=m.smUrl||("https://www.scalemates.com/search.php?q="+encodeURIComponent(smQuery(m)));
    window.open(url,"_blank","noopener");
    if(!m.smUrl&&!AppStore.getItem("__sm47hint")){AppStore.setItem("__sm47hint","1");setTimeout(()=>showToast("Savjet: kad nađeš kit, kopiraj njegovu poveznicu u ✎ Uredi → Scalemates"),800);}
  };
  (function smField(){
    const ref=$("mmRefUrl");if(!ref||$("mmSmUrl"))return;
    const wrap=ref.parentElement;
    const lbl=document.createElement("label");lbl.textContent="Scalemates (poveznica na kit — recenzije, upute, aftermarket)";
    const row=document.createElement("div");row.style.cssText="display:flex;gap:6px;align-items:flex-start";
    row.innerHTML=`<input type="text" id="mmSmUrl" placeholder="https://www.scalemates.com/kits/..." style="flex:1"><button class="btn-sm" type="button" id="mmSmFind" style="white-space:nowrap">🔎 Traži</button>`;
    wrap.after(lbl);lbl.after(row);
    $("mmSmFind").onclick=()=>{const q=smQuery({code:$("mmCode").value,mfr:$("mmMfr").value,name:$("mmName").value});if(!q.trim()){showToast("Prvo upiši naziv ili šifru makete");return;}window.open("https://www.scalemates.com/search.php?q="+encodeURIComponent(q),"_blank","noopener");};
  })();
  const _ome=window.openEditModel;window.openEditModel=function(id){const r=_ome.apply(this,arguments);const m=S.makete.find(x=>x.id===id);if($("mmSmUrl"))$("mmSmUrl").value=(m&&m.smUrl)||"";return r;};
  const _omm=window.openModelModal;window.openModelModal=function(){const r=_omm.apply(this,arguments);if($("mmSmUrl"))$("mmSmUrl").value="";return r;};
  const _sub=window.submitModel;window.submitModel=function(){
    const v=($("mmSmUrl")&&$("mmSmUrl").value.trim())||"";const ed=mmEditId,n=S.makete.length;
    const r=_sub.apply(this,arguments);
    const m=ed?S.makete.find(x=>x.id===ed):(S.makete.length>n?S.makete[S.makete.length-1]:null);
    if(m){const u=v&&!/^https?:\/\//i.test(v)?"https://"+v:v;if(u)m.smUrl=u;else delete m.smUrl;save();renderMakete();}
    return r;
  };

  // ═════════ kartica makete: novi gumbi + traka fotografija ═════════
  const _bmc=window.buildModelCard;
  window.buildModelCard=function(m){
    const d=_bmc.apply(this,arguments);
    try{
      const need=d.querySelector('[onclick^="openNeed46"]');if(need){need.textContent="🧰 Provjera faze";need.title="Provjera prije faze: imaš li sve za sljedeći korak, što nedostaje, recepti za taj korak";}
      const rec=d.querySelector('[onclick^="openReceptiModal"]');
      const L=photos(m);
      const ph=document.createElement("button");ph.className="btn-sm";ph.style.cssText="color:#9fc3e6;border-color:rgba(159,195,230,.4)";
      ph.textContent="📸 Napredak"+(L.length?` (${L.length})`:"");ph.title="Fotografije napretka po fazama izrade";ph.onclick=()=>openProg47(m.id);
      const sm=document.createElement("button");sm.className="btn-sm";sm.style.cssText="color:#e3b55a;border-color:rgba(227,181,90,.4)";
      sm.textContent="🌐 Scalemates"+(m.smUrl?" ✓":"");sm.title=m.smUrl?"Otvori spremljenu stranicu kita na Scalemates":"Traži ovaj kit na Scalemates (recenzije, upute, aftermarket)";sm.onclick=()=>openSm47(m.id);
      if(rec){rec.after(ph);ph.after(sm);}
      if(L.length){
        const last=[...L].sort((a,b)=>b.date-a.date).slice(0,5);
        const strip=document.createElement("div");strip.className="prog47-strip";
        strip.innerHTML=last.map(p=>`<img src="${p.url}" alt="" title="${esc(stepName(p.step))}" onclick="prog47Open('${m.id}','${p.id}')">`).join("")+(L.length>5?`<span onclick="openProg47('${m.id}')">+${L.length-5}</span>`:"");
        const st=d.querySelector(".model-stage-box");if(st)st.after(strip);
        // maketa bez naslovne slike dobije zadnju fotografiju napretka
        const ph0=d.querySelector(".model-card-img-ph");
        if(ph0&&ph0.style.display!=="none"&&!d.querySelector(".model-card-img")){const img=document.createElement("img");img.className="model-card-img";img.src=last[0].url;img.style.cursor="zoom-in";img.onclick=()=>prog47Open(m.id,last[0].id);ph0.before(img);ph0.style.display="none";}
      }
    }catch(e){console.warn("card47",e);}
    return d;
  };

  // ═════════ 4) RECEPTI 2.0 ═════════
  const CODE_RE=/\b(?:AK|RC|AMIG|A\.?MIG-?|MIG|XF-?|X-?|VAL|H|C|LP)\s?\d{2,5}\b|\b\d{2}\.\d{3}\b/gi;
  function chipify(text){
    return esc(text).replace(CODE_RE,c=>{
      const hit=findInv(c);
      if(hit&&hit.it.status==="imam")return `<span class="code46 own" onclick="closeReceptiModal();goToItems46(['${hit.it.id}'])" title="Imaš: ${esc(hit.it.name)}">✓ ${c}</span>`;
      return `<span class="code46 miss" title="Nemaš u Inventaru" onclick="openHave47();setTimeout(()=>{const i=document.getElementById('have47In');i.value='${c}';i.dispatchEvent(new Event('input'))},80)">${c}</span>`;
    });
  }
  (function recFields(){
    const nap=$("rcNapomena");if(!nap||$("rcFaza"))return;
    const frag=document.createElement("div");
    frag.innerHTML=`<label>Faza izrade (opcionalno)</label><select id="rcFaza"><option value="0">— bilo koja —</option>${REDOSLIJED_STEPS.map(s=>`<option value="${s.n}">${s.n}. ${s.icon} ${esc(s.name)}</option>`).join("")}</select>
      <label>Airbrush (opcionalno)</label><input type="text" id="rcAb" placeholder="npr. razrijeđeno 1:1 thinnerom, 15–18 psi, igla 0.3">`;
    nap.after(...frag.children);
    const sast=$("rcSastojci");if(sast)sast.placeholder="2 dijela AK11029 Matt Black\n1 dio AK11001 Matt White\npar kapi razrjeđivača\n(šifre se same povezuju s Inventarom)";
    const add=document.querySelector('#receptiModal [onclick="openReceptForm()"]');
    if(add&&!$("rcLib47")){const b=document.createElement("button");b.className="btn-sm";b.id="rcLib47";b.type="button";b.style.marginLeft="6px";b.textContent="📚 Recepti iz drugih maketa";b.onclick=()=>recLib();add.after(b);
      const lib=document.createElement("div");lib.id="rcLibBox47";lib.style.display="none";b.after(lib);}
  })();
  const _orf=window.openReceptForm;
  window.openReceptForm=function(id){const r=_orf.apply(this,arguments);
    const m=S.makete.find(x=>x.id===receptiMaketaId),rc=id&&m?(m.recepti||[]).find(x=>x.id===id):null;
    if($("rcFaza"))$("rcFaza").value=String((rc&&rc.faza)||0);if($("rcAb"))$("rcAb").value=(rc&&rc.ab)||"";return r;};
  const _sr=window.submitRecept;
  window.submitRecept=function(){
    const faza=Number(($("rcFaza")||{}).value||0),ab=(($("rcAb")||{}).value||"").trim(),ed=rcEditId;
    const m=S.makete.find(x=>x.id===receptiMaketaId),n=m?(m.recepti||[]).length:0;
    const r=_sr.apply(this,arguments);
    if(m&&m.recepti){const rc=ed?m.recepti.find(x=>x.id===ed):(m.recepti.length>n?m.recepti[m.recepti.length-1]:null);
      if(rc){rc.faza=faza||0;if(ab)rc.ab=ab;else delete rc.ab;save();renderReceptiList();}}
    if($("rcAb"))$("rcAb").value="";if($("rcFaza"))$("rcFaza").value="0";
    return r;
  };
  const _orm=window.openReceptiModal;window.openReceptiModal=function(){const r=_orm.apply(this,arguments);const b=$("rcLibBox47");if(b)b.style.display="none";return r;};
  window.renderReceptiList=function(){
    const m=S.makete.find(x=>x.id===receptiMaketaId),list=$("receptiList");if(!list)return;
    if(!m){list.innerHTML="";return;}
    const R=m.recepti||[];
    if(!R.length){list.innerHTML='<div style="color:var(--muted);font-size:12px;padding:.25rem 0 .5rem">Još nema spremljenih recepata za ovu maketu.</div>';return;}
    list.innerHTML=[...R].sort((a,b)=>(a.faza||99)-(b.faza||99)||(b.createdAt||0)-(a.createdAt||0)).map(r=>`
      <div class="recept-card" data-id="${esc(r.id)}">
        <div class="recept-name">${esc(r.name)}${r.faza?` <span class="rc47-faza">${esc(stepName(r.faza))}</span>`:""}</div>
        ${r.sastojci?`<div class="recept-sastojci">${chipify(r.sastojci)}</div>`:""}
        ${r.ab?`<div class="rc47-ab">💨 ${esc(r.ab)}</div>`:""}
        ${r.napomena?`<div class="recept-note">${esc(r.napomena)}</div>`:""}
        ${r.from?`<div class="recept-note">↪ iz makete: ${esc(r.from)}</div>`:""}
        <div class="recept-actions">
         <button class="wish-btn" onclick="openReceptForm('${esc(r.id)}')">✎ Uredi</button>
         <button class="wish-btn" onclick="rc47Copy('${esc(r.id)}',this)">⧉ Kopiraj u…</button>
         <button class="wish-btn del" onclick="delRecept('${esc(r.id)}')">✕</button>
        </div>
      </div>`).join("");
  };
  window.rc47Copy=function(rid,btn){
    const m=S.makete.find(x=>x.id===receptiMaketaId);const r=m&&(m.recepti||[]).find(x=>x.id===rid);if(!r)return;
    const others=S.makete.filter(x=>x.id!==m.id);if(!others.length){showToast("Nema drugih maketa");return;}
    const sel=document.createElement("select");sel.className="rc47-sel";
    sel.innerHTML=`<option value="">— odaberi maketu —</option>`+others.map(o=>`<option value="${o.id}">${esc(o.name)}</option>`).join("");
    sel.onchange=()=>{const t=S.makete.find(x=>x.id===sel.value);if(!t)return;
      if(!t.recepti)t.recepti=[];const c=JSON.parse(JSON.stringify(r));c.id="rc_"+Date.now();c.createdAt=Date.now();c.from=m.name;t.recepti.push(c);
      save();renderMakete();showToast(`⧉ „${r.name}” kopiran u ${t.name}`);sel.remove();};
    btn.after(sel);sel.focus();
  };
  function recLib(){
    const box=$("rcLibBox47");if(!box)return;
    if(box.style.display!=="none"){box.style.display="none";return;}
    const all=S.makete.filter(x=>x.id!==receptiMaketaId).flatMap(o=>(o.recepti||[]).map(r=>({o,r})));
    box.style.display="block";
    box.innerHTML=all.length?`<div class="rc47-lib">${all.map(({o,r})=>`<div class="rc47-lib-row"><div><b>${esc(r.name)}</b>${r.faza?` <span class="rc47-faza">${esc(stepName(r.faza))}</span>`:""}<br><small>${esc(o.name)}${r.sastojci?" · "+esc(r.sastojci.split("\n").join(" · ")):""}</small></div>
      <button class="btn-sm" onclick="rc47Take('${o.id}','${esc(r.id)}')">+ Uzmi</button></div>`).join("")}</div>`
      :`<div class="ekv-hint">Druge makete još nemaju recepata.</div>`;
  }
  window.rc47Take=function(oid,rid){
    const o=S.makete.find(x=>x.id===oid),r=o&&(o.recepti||[]).find(x=>x.id===rid),m=S.makete.find(x=>x.id===receptiMaketaId);if(!r||!m)return;
    if(!m.recepti)m.recepti=[];const c=JSON.parse(JSON.stringify(r));c.id="rc_"+Date.now();c.createdAt=Date.now();c.from=o.name;m.recepti.push(c);
    save();renderReceptiList();renderMakete();showToast("✓ Recept dodan");
  };

  // ═════════ 5) HD oznake za rad bez interneta ═════════
  (function hdOffline(){
    if(window.NO_HD)return;
    const inv=document.getElementById("d46Inv");if(!inv||document.getElementById("d47Hd"))return;
    const sec=document.createElement("div");sec.className="data46-sec";
    sec.innerHTML=`<div class="oz-sub">Oznake u visokoj rezoluciji</div><div class="data46-row"><button class="btn-sm" id="d47Hd">📥 Spremi HD oznake za offline</button></div>
      <div class="ekv-hint" id="d47HdInfo">HD slike oznaka (iz tvojih knjiga) učitavaju se kad otvoriš oznaku. Ovim gumbom spremiš sve odjednom (oko 73 MB) pa rade i bez interneta.</div>`;
    inv.parentElement.after(sec);
    document.getElementById("d47Hd").onclick=async function(){
      if(location.protocol==="file:"){showToast("Radi samo kad je aplikacija otvorena s weba (Netlify)");return;}
      const L=(typeof OZNAKE_DATA!=="undefined"?OZNAKE_DATA:[]).filter(o=>o.hi).map(o=>o.hi);
      const info=document.getElementById("d47HdInfo");this.disabled=true;let ok=0,fail=0;
      for(let i=0;i<L.length;i+=4){
        await Promise.all(L.slice(i,i+4).map(u=>fetch(u).then(r=>{r.ok?ok++:fail++;}).catch(()=>fail++)));
        info.textContent=`Spremam… ${ok+fail}/${L.length}`;
      }
      info.textContent=fail?`Spremljeno ${ok}/${L.length} (${fail} nije uspjelo — pokušaj ponovno).`:`✓ Svih ${ok} HD oznaka spremljeno za rad bez interneta.`;
      this.disabled=false;
    };
  })();
})();
