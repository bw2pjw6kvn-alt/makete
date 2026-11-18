// ── v45.22: ⚡ Brzi unos (samo šifra) · 🧾 Unos narudžbe (tekst ili PDF) · Želje = samo želje ──
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const canon=s=>nk(s).replace(/^VAL(?=\d)/,"");
  const alpha=s=>canon(s).replace(/\d.*$/,""),digits=s=>(canon(s).match(/\d+/g)||[]).join("");
  function sameCode(a,b){
    const A=canon(a),B=canon(b);if(!A||!B||A==="–"||B==="–")return false;
    if(A===B)return true;
    const da=digits(a),db=digits(b);if(da.length<4||da!==db)return false;
    const aa=alpha(a),ab=alpha(b);
    return !aa||!ab||aa.startsWith(ab)||ab.startsWith(aa);
  }
  const allInv=()=>Object.entries(S.inventar||{}).flatMap(([cat,cd])=>(cd.items||[]).map(it=>({cat,it})));
  function findInvAny(code){
    if(!code||code==="–")return null;
    const hits=allInv().filter(x=>!(x.it.isSetHeader&&!x.it.code)&&sameCode(x.it.code,code));
    return hits.find(x=>x.it.status==="imam")||hits[0]||null;
  }
  const findMak=code=>code&&code!=="–"?(S.makete||[]).find(m=>sameCode(m.code,code)):null;
  const findWish=code=>code&&code!=="–"?(S.zelje||[]).find(w=>sameCode(w.code,code)):null;
  const fmtP=v=>v>0?v.toFixed(2)+" €":"";
  const num=s=>{s=String(s||"").replace(/[^\d,.\-]/g,"");if(!s)return 0;return parseFloat(s.includes(",")&&!s.includes(".")?s.replace(",","."):s.replace(/,(?=\d{3})/g,"").replace(",","."))||0;};
  const CATS=()=>{const o=typeof orderedCats==="function"?orderedCats():Object.keys(S.inventar);const base=typeof cats45Order==="function"?cats45Order():[];return [...o,...base.filter(c=>!o.includes(c))];};

  // ═════ katalog naziva i uzoraka (tablice iz Usporedbe boja) ═════
  let CAT_IDX=null;
  function catalog(){
    if(CAT_IDX)return CAT_IDX;CAT_IDX={};
    try{(typeof EKV_TABS!=="undefined"?EKV_TABS:[]).forEach(t=>{
      if(!["ak2021","rcnew","rcold","playmarkers","quickgen","rcmarkers","gouache","alclad"].includes(t.id))return;
      t.data().forEach(r=>{if(!r.code||!r.name)return;const k=canon(r.code);if(CAT_IDX[k])return;
        CAT_IDX[k]={name:r.name,swatch:(t.swatchOf?t.swatchOf(r):r.swatch)||"",src:t.label,sets:r.sets||""};});
    });}catch(e){console.warn("catalog50",e);}
    return CAT_IDX;
  }
  function akEquivOfVallejo(code){
    try{const d=digits(code);const row=DOC4_DATA.find(r=>nk(r.vallejo)===d);if(!row)return null;
      const c=catalog()[canon(row.akRef)];return c?{code:row.akRef,name:c.name,swatch:c.swatch}:{code:row.akRef};}catch(e){return null;}
  }

  // ═════ pogađanje proizvođača i rubrike po šifri ═════
  function guess(code,name){
    const C=canon(code),N=String(name||"");let mfr="",cat="",line="";
    const has=re=>re.test(N);
    if(/^RCM\d/.test(C)){mfr="AK Interactive";cat="Markeri";line="Real Colors Markers";}
    else if(/^RCS\d/.test(C)){mfr="AK Interactive";cat="Real Colors (lak boje)";line="Real Colors set";}
    else if(/^RC7\d\d$/.test(C)){mfr="AK Interactive";cat="Razrjeđivači i čistači";line="Real Colors razrjeđivač";}
    else if(/^RC\d{3}$/.test(C)){mfr="AK Interactive";cat="Real Colors (lak boje)";line="Real Colors";}
    else if(/^AKMQ\d/.test(C)){mfr="AK Interactive";cat="Markeri";line="Quick Marker";}
    else if(/^AKM\d/.test(C)){mfr="AK Interactive";cat="Markeri";line="Playmarker";}
    else if(/^AKG\d/.test(C)){mfr="AK Interactive";cat="Gvaš boje";line="Gouache";}
    else if(/^AKAD\d/.test(C)){mfr="AK Interactive";cat="Akrilne boje";line="Artistic Dense Acrylic";}
    else if(/^AK115\d\d$/.test(C)){mfr="AK Interactive";cat="Razrjeđivači i čistači";line="3Gen razrjeđivač/čistač";}
    else if(/^AK1124\d$/.test(C)){mfr="AK Interactive";cat="Temeljni premazi (primer)";line="3Gen primer";}
    else if(/^AK1123\d$/.test(C)){mfr="AK Interactive";cat="Lakovi";line="3Gen lak";}
    else if(/^AK11\d{3}$/.test(C)){mfr="AK Interactive";cat="Akrilne boje";line="3Gen akril";}
    else if(/^AK17\d{3}$/.test(C)){mfr="AK Interactive";cat="Quick Gen boje";line="Quick Gen";}
    else if(/^AK10\d{3}$/.test(C)){mfr="AK Interactive";cat="Weathering bojice (olovke)";line="Weathering pencil";}
    else if(/^AK12\d{3}$/.test(C)||/^AK20\d\d$/.test(C)){mfr="AK Interactive";cat="Washevi i paneliner";line="Paneliner";}
    else if(/^AK8\d{3}$/.test(C)){mfr="AK Interactive";cat="Teren i diorama";line="Terrains / Diorama";}
    else if(/^AK4\d{3}$/.test(C)){mfr="AK Interactive";cat="Efekti (emajl)";line="Deposits";}
    else if(/^AK15[67]\d$/.test(C)||/^AK158\d$/.test(C)){mfr="AK Interactive";cat=has(/thinner|razrje/i)?"Razrjeđivači i čistači":"Teren i diorama";line="Dual Exo";}
    else if(/^AK9\d{3}$/.test(C)){mfr="AK Interactive";cat="Airbrush i alati";line="Alati";}
    else if(/^AK7[0-9]\d$/.test(C)){mfr="AK Interactive";cat=has(/primer/i)||/^AK75\d$/.test(C)?"Temeljni premazi (primer)":"Razrjeđivači i čistači";}
    else if(/^AK4[67]\d$/.test(C)){mfr="AK Interactive";cat="Razrjeđivači i čistači";}
    else if(/^AK3[23]\d$/.test(C)){mfr="AK Interactive";cat="Decal sredstva";}
    else if(/^AK1[01]\d$/.test(C)){mfr="AK Interactive";cat="Ljepila i kitovi";}
    else if(/^AK0[34]\d$/.test(C)&&!/wash/i.test(N)){mfr="AK Interactive";cat="Pigmenti";line="Pigment";}
    else if(/^AK0\d\d$/.test(C)){mfr="AK Interactive";cat=has(/wash/i)||/^AK0(4[5-9]|6[67]|7[05]|8[3-9]|9[0-9])$/.test(C)?"Washevi i paneliner":"Efekti (emajl)";line="Enamel";}
    else if(/^AMIG|^AMIG/.test(C)){mfr="AMMO by Mig";
      const d=+digits(C);cat=d>=700&&d<800||d>=1000&&d<1100?"Washevi i paneliner":d>=2100&&d<2300?"Teren i diorama":d>=3000&&d<3100?"Pigmenti":d>=7400&&d<7500?"Pigmenti":"Efekti (emajl)";}
    else if(/^(VAL)?\d{2}\.?\d{3}$/.test(nk(code).replace(/^VAL/,""))||/^VAL/.test(nk(code))){mfr="Vallejo";
      const d=digits(code);cat=/^7[01]5[0-2]\d$/.test(d)?"Lakovi":/^706\d\d$/.test(d)||/^70\d{3}$/.test(d)&&has(/primer/i)?"Temeljni premazi (primer)":/^73\d{3}$/.test(d)?"Efekti (emajl)":/^7[0-9]\d{3}$/.test(d)?"Akrilne boje":"";line=/^71/.test(d)?"Model Air":/^70/.test(d)?"Model Color":/^73/.test(d)?"Weathering Effects":/^78/.test(d)?"set":"";}
    else if(/^TA87\d{3}$/.test(C)){mfr="Tamiya";cat="Ljepila i kitovi";}
    else if(/^(XF|X)\d+$/.test(C)){mfr="Tamiya";cat="Akrilne boje";}
    else if(/^AK\d/.test(C)){mfr="AK Interactive";}
    if(!cat){
      if(has(/thinner|cleaner|razrje/i))cat="Razrjeđivači i čistači";else if(has(/varnish|\blak\b/i))cat="Lakovi";
      else if(has(/primer/i))cat="Temeljni premazi (primer)";else if(has(/putty|cement|glue|ljepil/i))cat="Ljepila i kitovi";
      else if(has(/decal set|setter|softener/i))cat="Decal sredstva";else if(has(/decal|dekal|transfer/i))cat="Dekali i dodaci";
      else if(has(/wash|paneliner/i))cat="Washevi i paneliner";else if(has(/pigment/i))cat="Pigmenti";
      else if(has(/airbrush|compressor|kompresor|hose|crijevo/i))cat="Airbrush i alati";
    }
    return {mfr,cat,line};
  }
  window.guess50=guess;
  // je li stavka narudžbe maketa (kit), a ne boja/pribor
  const KIT_MFR=/^(Academy|Tamiya|Takom|MiniArt|Zvezda|Revell|Trumpeter|Dragon|Italeri|Hobby ?Boss|Meng|Border|Rye ?Field|ICM|Das Werk|Bronco|AFV ?Club|Eduard|Airfix|Hasegawa|Kinetic|Heller)/i;
  function isKit(code,mfr,name){
    if(/1[:\/]\d{2,4}\b/.test(name))return true;
    if(KIT_MFR.test(mfr)&&!/cement|glue|putty|paint|color|colour|thinner|primer|varnish|tool|marker/i.test(name)&&!/^TA87|^XF|^X\d/.test(canon(code)))return true;
    return false;
  }

  // ═════ ⚡ BRZI UNOS ═════
  let qaStatus="imam";
  function modal(id,html,w){let ov=$(id);if(ov)ov.remove();ov=document.createElement("div");ov.id=id;ov.className="modal-overlay";
    ov.innerHTML=`<div class="modal f47" style="max-width:${w||560}px;width:95%">${html}</div>`;
    ov.addEventListener("click",e=>{if(e.target===ov)ov.remove();});document.body.appendChild(ov);ov.style.display="flex";return ov;}
  window.openQuickAdd50=function(prefill){
    modal("qa50",`<h3>⚡ Brzi unos u Inventar</h3>
      <div class="ekv-hint">Upiši šifru — proizvođač, rubrika, naziv i boja popunit će se sami. Provjeri i spremi.</div>
      <input id="qa50Code" class="qa50-code" placeholder="npr. AK11029, RC852, 71.117, AKG05" autocomplete="off" enterkeyhint="next">
      <div id="qa50Found"></div>
      <div class="qa50-grid">
        <label>Naziv *</label><input id="qa50Name" placeholder="naziv proizvoda">
        <label>Proizvođač</label><input id="qa50Mfr" list="qa50Mfrs" placeholder="AK Interactive">
        <label>Rubrika</label><select id="qa50Cat">${CATS().map(c=>`<option>${esc(c)}</option>`).join("")}</select>
        <label>Cijena</label><input id="qa50Price" placeholder="opcionalno, npr. 2,51 €" inputmode="decimal">
        <label>Status</label><div class="qa50-st"><button type="button" data-s="imam" class="on">✓ imam</button><button type="button" data-s="nemam">✗ nemam</button></div>
      </div>
      <datalist id="qa50Mfrs">${[...new Set(allInv().map(x=>x.it.mfr).filter(Boolean))].map(m=>`<option value="${esc(m)}">`).join("")}</datalist>
      <input type="hidden" id="qa50Sw">
      <div class="modal-btns"><button class="btn-secondary" onclick="document.getElementById('qa50').remove()">Zatvori</button>
        <button class="btn-secondary" onclick="qa50Save(true)">Spremi i dodaj još</button><button class="btn-primary" onclick="qa50Save(false)">Spremi</button></div>`);
    qaStatus="imam";
    document.querySelectorAll("#qa50 .qa50-st button").forEach(b=>b.onclick=()=>{qaStatus=b.dataset.s;document.querySelectorAll("#qa50 .qa50-st button").forEach(x=>x.classList.toggle("on",x===b));});
    const ci=$("qa50Code");ci.oninput=qaFill;ci.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();$("qa50Name").focus();}};
    if(prefill){ci.value=prefill;qaFill();}
    setTimeout(()=>ci.focus(),60);
  };
  let qaAuto={name:"",mfr:"",cat:""};
  function qaFill(){
    const code=$("qa50Code").value.trim(),box=$("qa50Found");
    if(code.length<2){box.innerHTML="";return;}
    const g=guess(code,$("qa50Name").value),c=catalog()[canon(code)];
    const setIf=(id,key,val)=>{const el=$(id);if(!el.value||el.value===qaAuto[key]){el.value=val||"";qaAuto[key]=val||"";}};
    let name=c?c.name:"";let sw=c?c.swatch:"";let extra="";
    if(!c&&g.mfr==="Vallejo"){const e=akEquivOfVallejo(code);if(e){extra=`AK ekvivalent: <b>${esc(e.code)}</b> ${esc(e.name||"")}`;sw=sw||e.swatch||"";}}
    setIf("qa50Name","name",name);setIf("qa50Mfr","mfr",g.mfr);
    if(g.cat&&(!qaAuto.cat||$("qa50Cat").value===qaAuto.cat)){$("qa50Cat").value=g.cat;qaAuto.cat=g.cat;}
    $("qa50Sw").value=sw||"";
    const ex=findInvAny(code),wi=findWish(code),mk=findMak(code);
    box.innerHTML=`${ex?`<div class="qa50-warn ${ex.it.status==="imam"?"own":"miss"}">${ex.it.status==="imam"?"⚠ Već imaš":"ℹ Već je u Inventaru (✗ nemam)"}: <b>${esc(ex.it.code)}</b> ${esc(ex.it.name)} · ${esc(ex.cat)}
        ${ex.it.status!=="imam"?`<button class="btn-sm" onclick="qa50MarkOwn('${ex.it.id}')">✓ Označi da imam</button>`:""}</div>`:""}
      ${mk?`<div class="qa50-warn own">⬡ U Maketama: ${esc(mk.name)}</div>`:""}
      ${wi?`<div class="qa50-warn wish">✦ Na popisu Želja: ${esc(wi.name)} — nakon spremanja ukloni se sa Želja.</div>`:""}
      <div class="qa50-prev">${sw?`<span class="color-swatch" style="background:${esc(sw)}"></span>`:""}
        ${c?`📗 Pronađeno u katalogu <i>${esc(c.src)}</i>${c.sets?` · dio seta ${esc(c.sets)}`:""}`:g.mfr?`Prepoznato: ${esc(g.mfr)}${g.line?" · "+esc(g.line):""} — naziv upiši sam`:"Šifra nije prepoznata — popuni podatke ručno"}
        ${extra?`<br>${extra}`:""}</div>`;
  }
  window.qa50MarkOwn=function(id){const x=allInv().find(y=>y.it.id===id);if(!x)return;x.it.status="imam";save();render();showToast("✓ "+(x.it.code||x.it.name)+" označeno: imam");$("qa50").remove();};
  window.qa50Save=async function(again){
    const code=$("qa50Code").value.trim()||"–",name=$("qa50Name").value.trim();
    if(!name){$("qa50Name").focus();showToast("Upiši naziv");return;}
    const ex=findInvAny(code);
    if(ex&&ex.it.status==="imam"){const ok=await customConfirm(`Već imaš ${ex.it.code} ${ex.it.name} (${ex.cat}). Dodati još jedan komad kao zasebnu stavku?`,"Već imaš");if(!ok)return;}
    const cat=$("qa50Cat").value||"Ostalo",sw=$("qa50Sw").value;
    if(!S.inventar[cat]){S.inventar[cat]={items:[]};if(Array.isArray(S.catOrder)&&!S.catOrder.includes(cat))S.catOrder.push(cat);}
    const it={id:"q_"+Date.now(),mfr:$("qa50Mfr").value.trim(),code,name,desc:"",note:"",price:$("qa50Price").value.trim()?fmtP(num($("qa50Price").value)):"",opened:"",pdfUrl:"",imgs:[],status:qaStatus,tags:[],swatches:sw?[sw]:[],subgroup:null,isSetHeader:false,createdAt:Date.now()};
    S.inventar[cat].items.push(it);
    const w=findWish(code);if(w&&qaStatus==="imam")S.zelje=S.zelje.filter(x=>x!==w);
    save();render();renderStats();
    showToast(`✓ Dodano u „${cat}”: ${code!=="–"?code+" ":""}${name}${w&&qaStatus==="imam"?" · uklonjeno sa Želja":""}`);
    if(again){["qa50Code","qa50Name","qa50Price"].forEach(i=>$(i).value="");qaAuto={name:"",mfr:"",cat:""};$("qa50Found").innerHTML="";$("qa50Code").focus();}
    else $("qa50").remove();
  };

  // ═════ 🧾 UNOS NARUDŽBE ═════
  function parseOrder(text){
    const T=text.replace(/\r/g,"").replace(/ /g," ");
    const res={orderNo:"",date:null,shop:"",paid:0,shipping:0,lines:[]};
    const id=T.match(/\bID:\s*([\d]{3,}-[\d]{3,})/)||T.match(/\b(\d{5}-\d{6})\b/);if(id)res.orderNo=id[1];
    const dm=T.match(/(\d{1,2})[\/.](\d{1,2})[\/.](\d{4})\.?\s+(\d{1,2}):(\d{2})/)||T.match(/(\d{1,2})[\/.](\d{1,2})[\/.](\d{4})/);
    if(dm)res.date=new Date(+dm[3],+dm[2]-1,+dm[1],dm[4]?+dm[4]:12,dm[5]?+dm[5]:0).getTime();
    if(/makete\.eu|Hobby Chest/i.test(T))res.shop="Hobby Chest (makete.eu)";
    const tot=[...T.matchAll(/Total:?\s*([\d.,]+\s*€)?\s*([\d.,]+)\s*€/gi)];if(tot.length)res.paid=num(tot[tot.length-1][2]);
    const sh=T.match(/Shipping cost:?\s*([\d.,]+)\s*€/i);if(sh)res.shipping=num(sh[1]);
    // stavke: [ŠIFRA] Proizvođač - Naziv ... cijene ... N pcs
    const re=/\[([^\]\n]{2,30})\]\s*([\s\S]*?)(?=\n\s*\[|Total:|Ukupno|$)/g;let m;
    while((m=re.exec(T))){
      let body=m[2];
      const qm=body.match(/(\d+)\s*(?:pcs|kom|x)\b/i);const qty=qm?+qm[1]:1;
      const eur=[...body.matchAll(/(\d{1,4}[.,]\d{2})\s*€/g)].map(x=>num(x[1]));
      let unit=eur.length>=4?eur[1]:eur.length===2?eur[1]/qty:eur.length?eur[0]:0;
      if(eur.length>=4)unit=eur[1];
      let name=body.replace(/(\d{1,4}[.,]\d{2})\s*€/g," ").replace(/\b\d+\s*(?:pcs|kom)\b/gi," ").replace(/\s+/g," ").trim();
      let mfr="";const parts=name.split(/\s+-\s+/);
      if(parts.length>1&&/^(AK[ -]?Interactive|AMMO|Vallejo|Tamiya|Academy|Takom|MiniArt|Zvezda|Revell|Trumpeter|Dragon|Italeri|Hobby ?Boss|Meng|Mig|Gaahleri|Wiltec|Print ?Scale|Archer|Eduard|ICM|Border|Rye ?Field)/i.test(parts[0])){
        mfr=parts.shift().replace(/^AK[ -]?Interactive$/i,"AK Interactive").replace(/^Ak Interactive$/i,"AK Interactive").replace(/^AMMO$/i,"AMMO by Mig");name=parts.join(" - ");}
      name=name.replace(/\s*\bID:\s*\d[\s\S]*$/,"").replace(/\s*Page\s*\d+\/\d+.*$/i,"").trim();
      const code=m[1].trim();
      name=name.replace(new RegExp("^"+code.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*[-–]?\\s*","i"),"").trim();
      res.lines.push({code,name,mfr,qty,unit});
    }
    // rezerva: retci "ŠIFRA naziv ... 4,50 €" (tekst iz košarice/maila bez uglatih zagrada)
    if(!res.lines.length){
      T.split("\n").forEach(l=>{const mm=l.match(/^\s*((?:AK|RCM?|RCS|AKG|AKM|AMIG|A\.MIG-?|VAL|TA|AC|TAK|TRU|MA)[\w.\-]*\d[\w.\-]*)\s+(.+?)\s+(\d{1,4}[.,]\d{2})\s*€/i);
        if(mm)res.lines.push({code:mm[1],name:mm[2].trim(),mfr:"",qty:(mm[2].match(/(\d+)\s*(?:pcs|kom|x)\b/i)||[0,1])[1]*1,unit:num(mm[3])});});
    }
    return res;
  }
  window.parseOrder50=parseOrder;
  let ORD=null;
  window.openOrderImport50=function(){
    modal("oi50",`<h3>🧾 Unos narudžbe</h3>
      <div class="ekv-hint">Odaberi <b>PDF računa</b> s makete.eu ili zalijepi tekst narudžbe (iz maila ili sa stranice). Aplikacija izvuče stavke, cijene i datum, a ti samo potvrdiš.</div>
      <div class="oi50-src"><button class="btn-sm" onclick="document.getElementById('oi50Pdf').click()">📄 Odaberi PDF računa</button>
        <input type="file" id="oi50Pdf" accept="application/pdf,.pdf" style="display:none"><span id="oi50PdfInfo" class="ekv-hint"></span></div>
      <textarea id="oi50Text" placeholder="…ili ovdje zalijepi tekst narudžbe" style="min-height:90px"></textarea>
      <button class="btn-sm" onclick="oi50Parse()">🔍 Prepoznaj stavke</button>
      <div id="oi50Prev"></div>`,860);
    $("oi50Pdf").onchange=async e=>{const f=e.target.files[0];e.target.value="";if(!f)return;
      $("oi50PdfInfo").textContent="Čitam PDF…";
      try{const t=await pdfText(f);$("oi50Text").value=t;$("oi50PdfInfo").textContent="✓ "+f.name;oi50Parse();}
      catch(err){console.warn(err);$("oi50PdfInfo").textContent="PDF se ne može pročitati — zalijepi tekst ručno.";}};
  };
  function loadPdfJs(){
    if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);
    return new Promise((res,rej)=>{const s=document.createElement("script");s.src="js/vendor/pdf.min.js";
      s.onload=()=>{try{pdfjsLib.GlobalWorkerOptions.workerSrc="js/vendor/pdf.worker.min.js";}catch(e){}res(window.pdfjsLib);};s.onerror=rej;document.head.appendChild(s);});
  }
  async function pdfText(file){
    const lib=await loadPdfJs();const data=new Uint8Array(await file.arrayBuffer());
    let pdf;try{pdf=await lib.getDocument({data}).promise;}catch(e){pdf=await lib.getDocument({data,disableWorker:true}).promise;}
    let out=[];
    for(let p=1;p<=pdf.numPages;p++){
      const pg=await pdf.getPage(p);const tc=await pg.getTextContent();
      const rows=[];tc.items.forEach(it=>{if(!it.str||!it.str.trim())return;const y=it.transform[5],x=it.transform[4];
        let r=rows.find(r=>Math.abs(r.y-y)<3);if(!r){r={y,cells:[]};rows.push(r);}r.cells.push({x,s:it.str});});
      rows.sort((a,b)=>b.y-a.y).forEach(r=>out.push(r.cells.sort((a,b)=>a.x-b.x).map(c=>c.s).join("  ")));
    }
    return out.join("\n");
  }
  window.oi50Parse=function(){
    const r=parseOrder($("oi50Text").value||"");ORD=r;window.ORD50paid="";
    const box=$("oi50Prev");
    if(!r.lines.length){box.innerHTML=`<div class="ekv-hint" style="color:var(--nemam-txt)">Nisam pronašao stavke. Provjeri je li tekst cijeli (šifre u [uglatim zagradama] ili na početku retka).</div>`;return;}
    const dupOrder=r.orderNo&&(S.narudzbe||[]).find(o=>o.orderNo===r.orderNo);
    r.lines.forEach(l=>{
      const g=guess(l.code,l.name);l.mfr=l.mfr||g.mfr;
      l.kit=isKit(l.code,l.mfr,l.name);
      l.inv=findInvAny(l.code);l.mak=findMak(l.code);l.wish=findWish(l.code);
      l.dest=l.mak||l.kit?"makete":"inventar";l.cat=l.inv?l.inv.cat:(g.cat||"Ostalo");l.on=true;l.rmWish=!!l.wish;
      const c=catalog()[canon(l.code)];if(!l.name&&c)l.name=c.name;l.sw=c?c.swatch:"";
    });
    renderPrev50();
  };
  function renderPrev50(){
    const r=ORD,box=$("oi50Prev");if(!r||!box)return;
    const dupOrder=r.orderNo&&(S.narudzbe||[]).find(o=>o.orderNo===r.orderNo);
    const sum=r.lines.reduce((a,l)=>a+l.unit*l.qty,0);
    box.innerHTML=`<div class="oi50-head">${r.orderNo?`Narudžba <b>${esc(r.orderNo)}</b>`:"Narudžba"} · ${r.date?new Date(r.date).toLocaleString("hr-HR",{dateStyle:"short",timeStyle:"short"}):"datum nije pronađen"} ${r.shop?"· "+esc(r.shop):""}
        <br>Stavke: <b>${fmtP(sum)}</b>${r.shipping?` · dostava ${fmtP(r.shipping)}`:""} · plaćeno: <input id="oi50Paid" onchange="window.ORD50paid=this.value" value="${window.ORD50paid||(r.paid?r.paid.toFixed(2).replace(".",","):sum.toFixed(2).replace(".",","))}" style="width:90px"> €</div>
      ${dupOrder?`<div class="qa50-warn miss">⚠ Narudžba ${esc(r.orderNo)} već postoji kao ${esc(dupOrder.label)} — vjerojatno je već unesena.</div>`:""}
      <div class="oi50-list">${r.lines.map((l,i)=>`<div class="oi50-row" data-i="${i}">
        <input type="checkbox" ${l.on?"checked":""} onchange="oi50Set(${i},'on',this.checked)">
        <div class="oi50-main"><div><span class="have47-c">${esc(l.code)}</span> ${l.sw?`<span class="color-swatch" style="background:${esc(l.sw)}"></span>`:""}
          <input class="oi50-name" value="${esc(l.name)}" onchange="oi50Set(${i},'name',this.value)"></div>
          <div class="oi50-meta">${l.qty}× ${fmtP(l.unit)} · ${esc(l.mfr||"?")} ·
            <select onchange="oi50Set(${i},'dest',this.value)"><option value="inventar"${l.dest==="inventar"?" selected":""}>Inventar</option><option value="makete"${l.dest==="makete"?" selected":""}>Makete</option></select>
            ${l.dest==="inventar"?`<select onchange="oi50Set(${i},'cat',this.value)">${[...new Set([l.cat,...CATS()])].map(c=>`<option${c===l.cat?" selected":""}>${esc(c)}</option>`).join("")}</select>`:""}</div>
          <div class="oi50-st">${l.inv?(l.inv.it.status==="imam"?`<span class="own">✓ već u Inventaru — povezat će se s Računom</span>`:`<span class="own">✓ u Inventaru kao „nemam” → postaje „imam”</span>`):l.mak?`<span class="own">⬡ već u Maketama — povezat će se s Računom</span>`:`<span class="new">＋ nova stavka</span>`}
            ${l.wish?` <label class="wish"><input type="checkbox" ${l.rmWish?"checked":""} onchange="oi50Set(${i},'rmWish',this.checked)"> ukloni sa Želja</label>`:""}</div></div></div>`).join("")}</div>
      <div class="modal-btns"><button class="btn-secondary" onclick="document.getElementById('oi50').remove()">Odustani</button>
        <button class="btn-primary" onclick="oi50Import()">✓ Unesi ${r.lines.length} stavk${r.lines.length===1?"u":r.lines.length<5?"e":"i"} i napravi Račun</button></div>`;
    }
  window.oi50Set=function(i,k,v){if(!ORD)return;ORD.lines[i][k]=v;if(k==="dest"||k==="on")renderPrev50();};
  window.oi50Import=async function(){
    const r=ORD;if(!r)return;const L=r.lines.filter(l=>l.on);if(!L.length){showToast("Nijedna stavka nije odabrana");return;}
    if(r.orderNo&&(S.narudzbe||[]).some(o=>o.orderNo===r.orderNo)){const ok=await customConfirm(`Narudžba ${r.orderNo} već postoji. Svejedno je unijeti još jednom?`,"Duplikat računa");if(!ok)return;}
    const T=Date.now();let n=0;const lines=[];let nNew=0,nLinked=0,nWish=0;
    L.forEach(l=>{
      const price=fmtP(l.unit);let refId="",src=l.dest,cat=l.cat,name=l.name||l.code;
      if(l.dest==="makete"){
        const ex=findMak(l.code);
        if(ex){refId=ex.id;nLinked++;if(!parsePrice(ex.price))ex.price=price;}
        else{const sc=(l.name.match(/1[:\/](\d{2,4})/)||[])[1];
          const mk={id:"m_"+T+"_"+(n),name:l.name.replace(/\s*\(1[:\/]\d+\)\s*/,"").trim()||l.code,scale:sc?"1:"+sc:"1:35",code:l.code,mfr:l.mfr||"",price,status:"plan",comment:"",refUrl:"",stage:0,imgs:[],colors:[],createdAt:T};
          S.makete.push(mk);refId=mk.id;nNew++;}
        cat="Makete";
      }else{
        const ex=findInvAny(l.code);
        if(ex){ex.it.status="imam";if(!parsePrice(ex.it.price))ex.it.price=price;refId=ex.it.id;cat=ex.cat;nLinked++;}
        else{
          if(!S.inventar[cat]){S.inventar[cat]={items:[]};if(Array.isArray(S.catOrder)&&!S.catOrder.includes(cat))S.catOrder.push(cat);}
          const it={id:"o_"+T+"_"+n,mfr:l.mfr||"",code:l.code.replace(/^VAL(?=\d{5}$)/,"").replace(/^(\d{2})(\d{3})$/,"$1.$2"),name,desc:"",note:"",price,opened:"",pdfUrl:"",imgs:[],status:"imam",tags:[],swatches:l.sw?[l.sw]:[],subgroup:null,isSetHeader:false,createdAt:T};
          S.inventar[cat].items.push(it);refId=it.id;nNew++;}
      }
      if(l.wish&&l.rmWish){S.zelje=S.zelje.filter(w=>w!==l.wish);nWish++;}
      lines.push({id:"oi_"+T+"_"+String(++n).padStart(2,"0"),qty:l.qty,source:src,refId,code:l.code,name,cat,price});
    });
    S.narudzbe=S.narudzbe||[];let num_=S.narudzbe.length+1;while(S.narudzbe.some(o=>o.label==="Račun #"+num_))num_++;
    const paid=num(($("oi50Paid")||{}).value)||r.paid;
    S.narudzbe.push({id:"ord_"+T,label:"Račun #"+num_,date:r.date||T,paid:paid?paid.toFixed(2):"",closed:true,collapsed:true,orderNo:r.orderNo||"",shop:r.shop||"",items:lines});
    save();render();renderStats();
    $("oi50").remove();
    showToast(`✓ Račun #${num_}: ${nNew} novo, ${nLinked} povezano${nWish?`, ${nWish} uklonjeno sa Želja`:""}`);
  };

  // ═════ ✦ Želje: samo popis želja + usporedba sa stanjem ═════
  const _rz=window.renderZelje;
  window.renderZelje=function(){
    const r=_rz.apply(this,arguments);
    document.querySelectorAll("#wishBody .wish-btn.kupljeno,#wishBody .wish-btn.btn-account").forEach(b=>b.remove());
    document.querySelectorAll("#wishBody tr[data-id]").forEach(tr=>{
      const del=tr.querySelector(".wish-btn.del");if(!del||tr.querySelector(".wish-btn.edit54"))return;
      const b=document.createElement("button");b.className="wish-btn edit54";b.textContent="✎";b.title="Uredi ovu želju";
      b.onclick=()=>wish54Edit(tr.dataset.id);del.before(b);
    });
    return r;
  };
  (function wishHint(){
    const h=[...document.querySelectorAll("#page-zelje .section-hdr span")].find(s=>/kupljeno/.test(s.textContent));
    if(h)h.textContent="Popis želja · nova želja se uspoređuje s Inventarom i Maketama";
  })();
  // jača provjera pri unosu želje (šifra 70.603 = VAL70603, naziv iz kataloga, upozorenje)
  window.checkWishExists=function(){
    const code=$("wmCode").value.trim(),name=$("wmName").value.trim(),warn=$("wmWarn");
    if(!code&&!name){warn.style.display="none";return;}
    const c=code?catalog()[canon(code)]:null;
    if(c&&!name){$("wmName").value=c.name;}
    const g=code?guess(code,name):{};
    const g55=typeof wishCat55==="function"?wishCat55({code,name}):"";if(g55)g.cat=g55;
    if(g.cat){const sel=$("wmCat");if([...sel.options].some(o=>o.value===g.cat)&&!sel.dataset.touched)sel.value=g.cat;}
    const inv=code?findInvAny(code):(name.length>3?allInv().find(x=>x.it.name.toLowerCase()===name.toLowerCase()):null);
    const mk=code?findMak(code):(name.length>3?(S.makete||[]).find(m=>m.name.toLowerCase()===name.toLowerCase()):null);
    const wi=code?findWishX(code):(name.length>3?(S.zelje||[]).find(w=>w.id!==wEdit&&w.name.toLowerCase()===name.toLowerCase()):null);
    const msgs=[];
    if(inv)msgs.push(inv.it.status==="imam"?`✓ VEĆ IMAŠ: ${esc(inv.it.code)} ${esc(inv.it.name)} · ${esc(inv.cat)}`:`ℹ U Inventaru kao „nemam”: ${esc(inv.it.name)} · ${esc(inv.cat)}`);
    if(mk)msgs.push(`⬡ VEĆ U MAKETAMA: ${esc(mk.name)}`);
    if(wi)msgs.push(`✦ VEĆ NA ŽELJAMA: ${esc(wi.name)}`);
    if(!msgs.length&&c)msgs.push(`📗 ${esc(c.name)} — nemaš ga (katalog: ${esc(c.src)})`);
    if(!msgs.length&&code)msgs.push(`✗ Nemaš ovo — nije u Inventaru, Maketama ni Željama.`);
    const bad=(inv&&inv.it.status==="imam")||mk||wi;
    warn.style.display="block";warn.innerHTML=msgs.join("<br>");
    warn.style.color=bad?"var(--nemam-txt)":"var(--imam-txt)";warn.style.background=bad?"var(--nemam-bg)":"var(--imam-bg)";warn.style.borderColor=bad?"var(--nemam-brd)":"var(--imam-brd)";
  };
  const wc=$("wmCat");if(wc)wc.addEventListener("change",()=>{wc.dataset.touched="1";});
  // ✎ uređivanje upisane želje
  let wEdit=null;
  const findWishX=code=>code&&code!=="–"?(S.zelje||[]).find(w=>w.id!==wEdit&&sameCode(w.code,code)):null;
  const wmTitle=()=>document.querySelector("#wishModal h3"),wmBtn=()=>document.querySelector("#wishModal .btn-primary");
  const _owm=window.openWishModal;window.openWishModal=function(){wEdit=null;const r=_owm.apply(this,arguments);const s=$("wmCat");if(s)delete s.dataset.touched;
    if(s){const ost=[...s.options].find(o=>o.value==="Ostalo");["Makete (kitovi)","Dodaci i pribor za makete"].forEach(c=>{if(![...s.options].some(o=>o.value===c)){const o=document.createElement("option");o.value=o.textContent=c;s.insertBefore(o,ost||null);}});}$("wmWarn").style.display="none";
    if(wmTitle())wmTitle().textContent="Dodaj na popis želja";if(wmBtn())wmBtn().textContent="Dodaj";return r;};
  window.wish54Edit=function(id){
    const w=(S.zelje||[]).find(x=>x.id===id);if(!w)return;
    openWishModal();wEdit=id;
    const sel=$("wmCat");if(w.cat&&![...sel.options].some(o=>o.value===w.cat)){const o=document.createElement("option");o.value=o.textContent=w.cat;sel.appendChild(o);}
    sel.value=w.cat||sel.value;sel.dataset.touched="1";
    $("wmCode").value=w.code&&w.code!=="–"?w.code:"";$("wmName").value=w.name||"";$("wmDesc").value=w.desc||"";
    $("wmPrice").value=w.price&&w.price!=="–"?w.price:"";$("wmNote").value=w.note||"";
    const pr=$("wmPrio");if([...pr.options].some(o=>o.value===String(w.prio)))pr.value=String(w.prio);
    if(wmTitle())wmTitle().textContent="✎ Uredi želju";if(wmBtn())wmBtn().textContent="Spremi izmjene";
    checkWishExists();setTimeout(()=>$("wmName").focus(),60);
  };
  const _sw=window.submitWish;
  window.submitWish=async function(){
    const code=$("wmCode").value.trim(),name=$("wmName").value.trim();
    if(wEdit){
      const w=(S.zelje||[]).find(x=>x.id===wEdit);if(!w){wEdit=null;return;}
      if(!name){$("wmName").focus();return;}
      const inv=code?findInvAny(code):null,mk=code?findMak(code):null,wi=code?findWishX(code):(S.zelje||[]).find(x=>x.id!==wEdit&&x.name.toLowerCase()===name.toLowerCase());
      const why=inv&&inv.it.status==="imam"?`Već imaš „${inv.it.name}” u Inventaru (${inv.cat}).`:mk?`„${mk.name}” je već u Maketama.`:wi?`„${wi.name}” je već na popisu Želja.`:"";
      if(why){const ok=await customConfirm(why+" Svejedno spremiti izmjene?","Provjera");if(!ok)return;}
      const changed=w.code!==(code||"–")||w.name!==name;
      Object.assign(w,{cat:$("wmCat").value,code:code||"–",name,desc:$("wmDesc").value.trim(),price:$("wmPrice").value.trim()||"–",prio:parseInt($("wmPrio").value)||w.prio,note:$("wmNote").value.trim()});
      if(changed)delete w.dupDismissed;
      wEdit=null;save();closeWishModal();renderZelje();renderStats();showToast("✓ Želja spremljena: "+name);return;
    }
    if(name){
      const inv=code?findInvAny(code):allInv().find(x=>x.it.name.toLowerCase()===name.toLowerCase());
      const mk=code?findMak(code):(S.makete||[]).find(m=>m.name.toLowerCase()===name.toLowerCase());
      const wi=code?findWish(code):(S.zelje||[]).find(w=>w.name.toLowerCase()===name.toLowerCase());
      const why=inv&&inv.it.status==="imam"?`Već imaš „${inv.it.name}” u Inventaru (${inv.cat}).`:mk?`„${mk.name}” je već u Maketama.`:wi?`„${wi.name}” je već na popisu Želja.`:"";
      if(why){const ok=await customConfirm(why+" Svejedno dodati u Želje?","Provjera");if(!ok)return;}
    }
    return _sw.apply(this,arguments);
  };

  // ═════ gumbi ═════
  (function buttons(){
    const bar=$("inv49Bar");
    if(bar&&!$("qa50Btn")){const b=document.createElement("button");b.className="btn-sm qa50-btn";b.id="qa50Btn";b.textContent="⚡ Brzi unos";b.title="Dodaj proizvod upisom šifre";b.onclick=()=>openQuickAdd50();
      const o=document.createElement("button");o.className="btn-sm";o.textContent="🧾 Unos narudžbe";o.title="Unesi cijelu narudžbu iz PDF-a ili teksta";o.onclick=()=>openOrderImport50();
      const info=$("inv49Info");(info?info.nextSibling:bar.firstChild)&&bar.insertBefore(o,info?info.nextSibling:bar.firstChild);bar.insertBefore(b,o);}
    const hdr=document.querySelector("#page-narudzba .section-hdr");
    if(hdr&&!$("oi50Btn")){const b=document.createElement("button");b.className="btn-sm qa50-btn";b.id="oi50Btn";b.textContent="🧾 Unos narudžbe (PDF/tekst)";b.onclick=()=>openOrderImport50();hdr.insertBefore(b,hdr.children[1]||null);}
  })();
})();
