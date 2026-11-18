// ── v45.37: 🔁 Zamjenske boje (najsličnija boja koju imaš) · 💾 Podsjetnik za backup ──
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const N=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");

  // ═════ 🔁 ZAMJENSKE BOJE ═════
  const EQ=typeof EQUIV_DATA!=="undefined"?EQUIV_DATA:[];
  const byAk={},byVal={},byRal={},byFs={},byTam={};
  EQ.forEach(e=>{
    if(!e.swatch)return;
    byAk[N(e.code)]=e;
    String(e.vallejo||"").split(/[\/,;\s]+/).filter(Boolean).forEach(v=>{const d=v.replace(/\D/g,"");if(!d)return;const k=d.length===3?"70"+d:d;if(!byVal[k])byVal[k]=e;});
    if(e.ral){const r=String(e.ral).match(/\d{4}/);if(r&&!byRal[r[0]])byRal[r[0]]=e;}
    if(e.fs){const f=String(e.fs).match(/\d{5}/);if(f&&!byFs[f[0]])byFs[f[0]]=e;}
    if(e.tamiya){const t=N(e.tamiya);if(t&&!byTam[t])byTam[t]=e;}
  });
  const CATSKIP=/wash|weathering|efekt|pigment|teren|gva|ljepil|razrje|decal|airbrush|dekal|lakov|temelj|olovk/i;
  const SKIP=/panel|liner|varnish|\blak\b|clear|smoke|thinner|razrje|metal|alumin|brass|bronze|chipping|wash|filter|gloss|primer|temelj/i;

  // boje bez RAL/FS oznake (flomasteri i Vallejo) – približne nijanse
  const EXTRA={RCM034:"#f0efe9",RCM002:"#e6e1d0",RCM033:"#1d1d1d",RCM001:"#2c2c2a",RCM021:"#4d4a2c",RCM012:"#a2733f",RCM007:"#5c3b22",
    "71132":"#ddd6c3","71075":"#e9dfbf","71028":"#c9ad78","71029":"#5b4a33","71223":"#4f5a3a",AK17063:"#d2b06a",AK17059:"#b88a52",AK17054:"#a8622f",AKMQ029:"#8a5a2e",AKAD017:"#5e4430"};
  const byName={};EQ.forEach(e=>{if(e.swatch&&e.name){const k=N(e.name);if(!byName[k])byName[k]=e;}});
  function swatchOfItem(it){
    const c=N(it.code),txt=(it.name||"")+" "+(it.desc||"").slice(0,80);
    const x=EXTRA[c]||EXTRA[c.replace(/^VAL/,"")];if(x)return {sw:x};
    if(byAk[c])return {sw:byAk[c].swatch,ref:byAk[c]};
    if(/^RC\d{3}$/.test(c)&&typeof RC_SWATCH_MAP!=="undefined"&&RC_SWATCH_MAP[c])return {sw:RC_SWATCH_MAP[c]};
    const v=c.replace(/^VAL/,"");if(/^7\d{4}$/.test(v)&&byVal[v])return {sw:byVal[v].swatch,ref:byVal[v]};
    if(byTam[c])return {sw:byTam[c].swatch,ref:byTam[c]};
    const r=txt.match(/RAL\s*(\d{4})/i)||txt.match(/REAL\s*(\d{4})/i);if(r&&byRal[r[1]])return {sw:byRal[r[1]].swatch,ref:byRal[r[1]]};
    const f=txt.match(/FS\s*(\d{5})/i);if(f&&byFs[f[1]])return {sw:byFs[f[1]].swatch,ref:byFs[f[1]]};
    const nm=N((it.name||"").replace(/[–-].*$/,""));if(nm.length>3&&byName[nm])return {sw:byName[nm].swatch,ref:byName[nm]};
    return null;
  }
  let cache=null,cacheKey="";
  function ownedColors(){
    const items=Object.entries(S.inventar||{}).flatMap(([cat,cd])=>(cd.items||[]).map(it=>({cat,it})))
      .filter(x=>x.it.status==="imam"&&x.it.code&&!x.it.isSetHeader&&!SKIP.test(x.it.name||"")&&!CATSKIP.test(x.cat));
    const key=items.map(x=>x.it.code).join("|");
    if(cache&&key===cacheKey)return cache;
    const seen=new Set();cache=[];
    items.forEach(({cat,it})=>{const k=N(it.code);if(seen.has(k))return;const s=swatchOfItem(it);if(!s)return;seen.add(k);
      cache.push({code:it.code,name:it.name,cat,sw:s.sw,lab:lab(s.sw),set:it.subgroup&&it.subgroup!==it.name?it.subgroup:"",marker:/marker|flomaster/i.test(cat)});});
    cacheKey=key;return cache;
  }
  function lab(hex){
    const m=String(hex||"").match(/^#?([0-9a-f]{6})$/i);if(!m)return null;
    let [r,g,b]=[0,2,4].map(i=>parseInt(m[1].slice(i,i+2),16)/255).map(v=>v>0.04045?Math.pow((v+0.055)/1.055,2.4):v/12.92);
    let x=(r*0.4124+g*0.3576+b*0.1805)/0.95047,y=r*0.2126+g*0.7152+b*0.0722,z=(r*0.0193+g*0.1192+b*0.9505)/1.08883;
    const f=t=>t>0.008856?Math.cbrt(t):7.787*t+16/116;x=f(x);y=f(y);z=f(z);
    return [116*y-16,500*(x-y),200*(y-z)];
  }
  // CIEDE2000 – razlika boja kako je vidi oko (osjetljivija na promjenu nijanse)
  function dE(a,b){
    const [L1,a1,b1]=a,[L2,a2,b2]=b,rad=Math.PI/180,deg=180/Math.PI;
    const C1=Math.hypot(a1,b1),C2=Math.hypot(a2,b2),Cb=(C1+C2)/2,G=0.5*(1-Math.sqrt(Cb**7/(Cb**7+25**7)));
    const ap1=(1+G)*a1,ap2=(1+G)*a2,Cp1=Math.hypot(ap1,b1),Cp2=Math.hypot(ap2,b2);
    const h=(x,y)=>{if(!x&&!y)return 0;const v=Math.atan2(y,x)*deg;return v<0?v+360:v;};
    const hp1=h(ap1,b1),hp2=h(ap2,b2),dL=L2-L1,dC=Cp2-Cp1;
    let dh=0;if(Cp1*Cp2){dh=hp2-hp1;if(dh>180)dh-=360;else if(dh<-180)dh+=360;}
    const dH=2*Math.sqrt(Cp1*Cp2)*Math.sin(dh*rad/2),Lb=(L1+L2)/2,Cpb=(Cp1+Cp2)/2;
    let hb=hp1+hp2;if(Cp1*Cp2){hb=Math.abs(hp1-hp2)>180?(hp1+hp2+360)/2:(hp1+hp2)/2;}
    const T=1-0.17*Math.cos((hb-30)*rad)+0.24*Math.cos(2*hb*rad)+0.32*Math.cos((3*hb+6)*rad)-0.2*Math.cos((4*hb-63)*rad);
    const SL=1+0.015*(Lb-50)**2/Math.sqrt(20+(Lb-50)**2),SC=1+0.045*Cpb,SH=1+0.015*Cpb*T;
    const RT=-2*Math.sqrt(Cpb**7/(Cpb**7+25**7))*Math.sin(60*Math.exp(-(((hb-275)/25)**2))*rad);
    return Math.sqrt((dL/SL)**2+(dC/SC)**2+(dH/SH)**2+RT*(dC/SC)*(dH/SH));
  }
  function grade(d){return d<4?{t:"vrlo slična",c:"g1"}:d<8?{t:"slična",c:"g2"}:{t:"približna",c:"g3"};}

  // najsličnije boje koje imaš za zadanu šifru (AK / RC / Vallejo …) ili swatch
  function subsFor(code,swatch,max){
    const e=byAk[N(code)];let sw=swatch||(e&&e.swatch);
    if(!sw&&/^RC\d{3}$/.test(N(code))&&typeof RC_SWATCH_MAP!=="undefined")sw=RC_SWATCH_MAP[N(code)];
    const L=lab(sw);if(!L)return [];
    return ownedColors().filter(o=>o.lab&&N(o.code)!==N(code)).map(o=>({...o,d:dE(L,o.lab)}))
      .filter(o=>o.d<12).sort((a,b)=>a.d-b.d).slice(0,max||2).map(o=>({...o,g:grade(o.d)}));
  }
  window.subsFor56=subsFor;
  const subHtml=(L,compact)=>L.length?`<div class="sub56">↪ Zamjena koju imaš: ${L.map(o=>`<span class="sub56-i ${o.g.c}" title="${esc(o.name)} · ${esc(o.cat)}${o.set?" · "+esc(o.set):""} · razlika ${o.d.toFixed(1)}"><span class="color-swatch" style="background:${esc(o.sw)}"></span><b>${esc(o.code)}</b>${compact?"":" "+esc(o.name)}${o.marker?" (flomaster)":""} <small>${o.g.t}</small></span>`).join(" ")}</div>`
    :`<div class="sub56 none">↪ Nemaš sličnu boju u inventaru</div>`;

  // 🎨 Shema bojanja → kod svake boje koju nemaš prikaži zamjenu
  const _rsd=window.renderSchemeDetail;
  window.renderSchemeDetail=function(){
    const r=_rsd.apply(this,arguments);
    try{
      const s=PAINT_SCHEMES.find(x=>x.key===schemeSel);const box=$("schemeDetail");if(!s||!box)return r;
      const owned=schOwned(),rows=box.querySelectorAll(".sch-row");
      s.paints.forEach((p,i)=>{const inf=schPaintInfo(p,owned);if(inf.hit||!rows[i])return;
        const main=rows[i].querySelector(".sch-main");if(main)main.insertAdjacentHTML("beforeend",subHtml(subsFor(p.ak||p.rc,inf.swatch,2)));});
      const miss=s.paints.filter(p=>!schPaintInfo(p,owned).hit).length;
      if(miss){const h=box.querySelector(".sch-h");if(h&&!box.querySelector(".sub56-hint"))h.insertAdjacentHTML("afterend",`<div class="ekv-hint sub56-hint">↪ Za boje koje nemaš predložena je najsličnija boja iz tvog inventara (usporedba po nijansi). „Vrlo slična” se može koristiti umjesto originala; „približna” je samo za nuždu ili za miješanje.</div>`);}
    }catch(e){console.warn("sub56",e);}
    return r;
  };
  // kartica makete → ispod boja sheme kratki popis zamjena
  const _sch=window.schemeCardHtml;
  window.schemeCardHtml=function(m){
    let h=_sch.apply(this,arguments);
    try{
      const s=PAINT_SCHEMES.find(x=>x.key===m.scheme);if(!s||!h)return h;
      const owned=schOwned(),out=[];
      s.paints.forEach(p=>{const inf=schPaintInfo(p,owned);if(inf.hit)return;const L=subsFor(p.ak||p.rc,inf.swatch,1);
        out.push(`<span class="sub56-i ${L[0]?L[0].g.c:"g3"}">${esc(p.ak||p.rc)} → ${L[0]?`<span class="color-swatch" style="background:${esc(L[0].sw)}"></span><b>${esc(L[0].code)}</b> <small>${L[0].g.t}</small>`:"<small>nema zamjene</small>"}</span>`);});
      if(out.length)h=h.replace(/<\/div>\s*$/,`<div class="sub56">↪ Zamjene: ${out.join(" ")}</div></div>`);
    }catch(e){console.warn("sub56card",e);}
    return h;
  };

  // ═════ ℹ️ BROJ VERZIJE (u ⚙ i na dnu ekrana) ═════
  (function ver56(){
    const v="v"+(window.APP_VERSION||"?"),where=/^https?:$/.test(location.protocol)?(location.hostname.endsWith("github.io")?"web (GitHub)":"web"):"lokalno";
    const f=document.createElement("div");f.id="ver56";f.className="ver56";f.textContent="Makete & Alati "+v+" · "+where;document.body.appendChild(f);
    const m=document.querySelector("#dataModal46 .data46");
    if(m&&!$("ver56d")){const h=m.querySelector("h3");if(h)h.insertAdjacentHTML("beforeend",` <small class="ver56-tag">${v}</small>`);
      const d=document.createElement("div");d.id="ver56d";d.className="ekv-hint";d.style.marginTop="8px";
      d.innerHTML=`ℹ️ Verzija aplikacije: <b>${v}</b> · ${where}`;const last=m.lastElementChild;m.insertBefore(d,last);}
  })();
  // ═════ 💾 PODSJETNIK ZA BACKUP ═════
  const BK="__lastbk56",SN="__bksnooze56",DAYS=7;
  const now=()=>Date.now();
  const get=k=>{try{return Number(AppStore.getItem(k))||0;}catch(e){return 0;}};
  const set=(k,v)=>{try{AppStore.setItem(k,String(v));}catch(e){}};
  if(!get(BK))set(BK,now());               // prvo pokretanje ove verzije = početna točka
  let prev=typeof hasUnexportedChanges!=="undefined"?hasUnexportedChanges:false;
  const _ubb=window.updateBackupBadge;
  if(_ubb)window.updateBackupBadge=function(){
    const r=_ubb.apply(this,arguments);
    try{const cur=hasUnexportedChanges;if(prev&&!cur){set(BK,now());hideBanner();}prev=cur;tip();}catch(e){}
    return r;
  };
  const _ex=window.exportData;
  window.exportData=async function(){const r=await _ex.apply(this,arguments);set(BK,now());hideBanner();tip();return r;};
  const days=()=>Math.floor((now()-get(BK))/864e5);
  function tip(){const b=document.querySelector('[onclick^="exportData"]');if(b)b.title=`Zadnji backup: ${new Date(get(BK)).toLocaleDateString("hr-HR")} (prije ${days()} d)`;}
  function hideBanner(){const e=$("bk56");if(e)e.remove();}
  function banner(){
    if($("bk56"))return;
    const n=Object.values(S.inventar||{}).reduce((a,c)=>a+(c.items||[]).length,0)+(S.makete||[]).length;if(!n)return;
    const d=days();if(d<DAYS||now()<get(SN))return;
    const el=document.createElement("div");el.id="bk56";el.className="bk56";
    el.innerHTML=`<span>💾 Zadnji backup bio je prije <b>${d} dana</b>${hasUnexportedChanges?" i od tada ima izmjena":""}. Spremi kopiju podataka da ih ne izgubiš (npr. ako se očisti preglednik ili promijeniš mobitel).</span>
      <div class="bk56-b"><button class="btn-sm primary" onclick="bk56Now()">💾 Backup sada</button><button class="btn-sm" onclick="bk56Later()">Podsjeti me sutra</button></div>`;
    const host=document.querySelector(".stats-bar")||document.querySelector("header")||document.body.firstElementChild;
    if(host&&host.parentNode)host.parentNode.insertBefore(el,host.nextSibling);else document.body.prepend(el);
  }
  window.bk56Now=()=>exportData();
  window.bk56Later=()=>{set(SN,now()+864e5);hideBanner();showToast("U redu — podsjetit ću te sutra");};
  window.bk56Days=days;
  setTimeout(()=>{tip();banner();},6000);
  setInterval(banner,6*3600e3);
})();
