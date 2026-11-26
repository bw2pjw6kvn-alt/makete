// ── v45.43: 🧭 Redoslijed izrade → uz svaki korak „🧰 Čime” (što imaš u inventaru + preporuka) ──
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const N=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const K="__steps57m";
  const getM=()=>{try{return AppStore.getItem(K)||"";}catch(e){return "";}};
  const setM=v=>{try{AppStore.setItem(K,v);}catch(e){}};

  // pravila po koraku: cat = rubrika inventara, re = naziv/šifra/opis, not = isključi; tip = savjet; buy = prijedlog ako nemaš ništa
  const AB={cat:/airbrush/i,re:/airbrush|seeker/i};
  const R={
    1:{rules:[],tip:"Mlaka voda + deterdžent za posuđe + stara četkica za zube. Iz inventara ništa ne treba."},
    2:{rules:[{cat:/primer|temelj/i},{re:/primer/i,not:/marker|olovk|pencil/i}],tool:true,
       tip:"Sivi primer (AK758) najbolje otkriva greške. Crni (AK757) je podloga za black & white pre-shade. Primer razrijedi prema uputi i prskaj tanko.",
       buy:[{c:"AK758",n:"Grey Primer & Microfiller"}]},
    3:{rules:[{re:/\b(black|crn[aio]?)\b|smoke black|rubber black/i,cat:/akriln|real colors|quick gen/i},{re:/\bwhite|bijel|ivory|aged white|white grey/i,cat:/akriln|real colors/i}],tool:true,
       tip:"Klasično: tamne linije uz spojeve ploča. Black & white: crni primer + bijelo na sredine ploča. Za svijetli Dunkelgelb budi suptilan.",
       buy:[{c:"AK11029",n:"Black (3Gen)"},{c:"AK11001",n:"White (3Gen)"}]},
    4:{scheme:"base",tool:true,tip:"Tanki slojevi airbrushem dok se pre-shade još nazire. Real Colors razrijedi s RC701 (~1:1), 3Gen s AK11500.",rules:[{cat:/real colors|akriln|quick gen/i,not:/varnish|lak|primer|thinner|cleaner|smoke|clear/i}],limit:8},
    5:{scheme:"camo",tool:true,tip:"Mrlje i pruge prema referenci. Tanko, s nižim tlakom (~0,8–1 bar) za meke rubove.",rules:[{cat:/real colors|akriln|quick gen/i,not:/varnish|lak|primer|thinner|cleaner|smoke|clear/i}],limit:8},
    6:{rules:[{re:/gloss|sjajn/i,cat:/lak|varnish|akriln/i}],tool:true,tip:"Sjajni lak daje glatku podlogu za dekale i wash.",buy:[{c:"AK11239",n:"Gloss Varnish (3Gen)"}]},
    7:{rules:[{cat:/decal sred/i},{re:/decal (setter|softener)|micro ?(set|sol)/i},{cat:/dekali/i}],tip:"Prvo Decal Setter na podlogu, postavi dekal, pa Softener da prione uz reljef. Višak upij papirom.",buy:[{c:"AK329",n:"Decal Setter"},{c:"AK330",n:"Decal Softener"}]},
    8:{rules:[{re:/gloss|sjajn/i,cat:/lak|varnish|akriln/i}],tool:true,tip:"Tanki sloj glossa preko suhih dekala – sakrije rub filma.",buy:[{c:"AK11239",n:"Gloss Varnish (3Gen)"}]},
    9:{rules:[{re:/filter/i},{cat:/gva/i}],tip:"Jako razrijeđen enamel/uljni filter po cijeloj plohi. Za DAK: AK 065. Može i jako razrijeđen gvaš (AKG) vodom.",buy:[{c:"AK065",n:"Filter for Afrika Korps vehicles"}]},
    10:{rules:[{cat:/wash|panel/i,not:/rust|hrđ|track/i},{re:/wash|panel ?liner/i,not:/rust|track|hrđ/i}],tip:"Pin wash u udubine i oko zakovica, višak nakon par minuta skini kistom s AK011 / White Spiritom. Za DAK: AK 066 ili AMMO Afrika Korps Wash.",buy:[{c:"AK066",n:"Afrika Korps Wash"}]},
    11:{rules:[{re:/\bmatt?\b|satin|mat varnish|ultra.?matt/i,cat:/lak|varnish|akriln/i}],tool:true,tip:"Mat lak daje hrapavu površinu na koju se dobro hvataju pigmenti i olovke.",buy:[{c:"AK11237",n:"Matt Varnish (3Gen)"}]},
    12:{rules:[{re:/chipping/i},{re:/aging|scratch|ogrebot/i}],tip:"Spužvica s tamnosmeđom (npr. AK11108/AK11111) ili olovke i flomasteri za chipping po rubovima i mjestima gdje se hoda.",buy:[{c:"AK10019",n:"Chipping color (olovka)"}]},
    13:{rules:[{re:/rust|hrđ|streak|fuel|stain|grease|oil|track wash|deposit/i,not:/primer|pigment fixer/i},{cat:/efekti/i}],tip:"Curenja (streaking), hrđa, mrlje goriva i ulja. Enamel efekti se razrjeđuju White Spiritom.",buy:[{c:"AK067",n:"Streaking Grime for DAK"}]},
    14:{rules:[{cat:/pigment/i},{re:/pigment|dust effects|earth effects|africa dust|damp earth|fixer/i}],tip:"Suhi pigment kistom na donji dio, kotače i gusjenice, pa fiksiraj (AK048 ili White Spirit).",buy:[{c:"AK048",n:"Pigment Fixer"}]},
    15:{rules:[{re:/\bmatt?\b|satin|mat varnish|ultra.?matt/i,cat:/lak|varnish|akriln/i}],tool:true,tip:"Opcionalno. Vrlo tanko i s udaljenosti – lak preko pigmenata ih zna potamniti.",buy:[{c:"AK11237",n:"Matt Varnish (3Gen)"}]}
  };

  function owned(){
    const out=[];
    for(const [cat,cd] of Object.entries(S.inventar||{}))(cd.items||[]).forEach(it=>{if(it.status==="imam"&&!it.isSetHeader&&it.code&&it.code!=="–")out.push({cat,it,txt:[it.code,it.name,(it.desc||"").slice(0,120)].join(" ")});});
    return out;
  }
  function match(rule,o){
    if(rule.not&&rule.not.test(o.it.name+" "+o.cat))return false;
    const c=rule.cat?rule.cat.test(o.cat):null,r=rule.re?rule.re.test(o.txt):null;
    if(rule.cat&&rule.re)return c&&r;return !!(c||r);
  }
  function forStep(n,O){
    const s=R[n];if(!s)return [];
    const seen=new Set(),res=[];
    (s.rules||[]).forEach(rule=>O.forEach(o=>{const k=N(o.it.code);if(!seen.has(k)&&match(rule,o)){seen.add(k);res.push(o);}}));
    return res.slice(0,s.limit||6);
  }
  function tools(O){
    const ab=O.find(o=>/airbrush/i.test(o.cat)&&/seeker|airbrush/i.test(o.it.name)&&!/compressor|kompres|clean|pot|fabric|tkanin/i.test(o.it.name));
    const th=O.filter(o=>/razrje/i.test(o.cat)&&/thinner|razrje/i.test(o.it.name)&&!/cleaner|čistač|dual exo|xtreme/i.test(o.it.name)).slice(0,3);
    return [ab,...th].filter(Boolean);
  }
  function schemePaints(m,kind){
    if(!m||!m.scheme||typeof PAINT_SCHEMES==="undefined")return null;
    const s=PAINT_SCHEMES.find(x=>x.key===m.scheme);if(!s)return null;
    try{if(window.schemeCardHtml)schemeCardHtml(m);}catch(e){}   // osvježi prepoznavanje boja istog standarda (npr. Vallejo RAL 8020)
    const own=schOwned();
    const isBase=(p,i)=>i===0||/osnova|base/i.test(p.role);const skip=p=>/gum|rubber|guse|track|oznak|marking|broj/i.test(p.role);
    const list=s.paints.filter((p,i)=>kind==="base"?isBase(p,i):!isBase(p,i)&&!skip(p));
    return {s,rows:list.map(p=>{const i=schPaintInfo(p,own);const sub=!i.hit&&window.subsFor56?subsFor56(p.ak||p.rc,i.swatch,1)[0]:null;return {p,i,sub};})};
  }
  const chip=o=>`<span class="st57-c" title="${esc(o.it.name)} · ${esc(o.cat)}" onclick="goToProduct('${jsStr(o.it.code)}')"><b>${esc(o.it.code)}</b> ${esc(String(o.it.name).replace(/\s*[–-]\s*(PLAYMARKER|QUICK GEN COLOR).*$/i,"").slice(0,26))}</span>`;

  function cell(n,O,m){
    const s=R[n]||{};let h="";
    if(s.scheme){
      const sp=schemePaints(m,s.scheme);
      if(sp&&sp.rows.length){
        h+=`<div class="st57-lbl">🎨 ${esc(sp.s.name)}</div>`+sp.rows.map(({p,i,sub})=>i.hit
          ?`<span class="st57-c ok" title="${esc(p.role)}" onclick="goToProduct('${jsStr(i.hit)}')">${i.swatch?`<span class="color-swatch" style="background:${esc(i.swatch)}"></span>`:""}<b>${esc(i.hit)}</b> ${esc(p.role.replace(/^[^–]*–\s*/,"").slice(0,22))}</span>`
          :`<span class="st57-c no" title="${esc(p.role)} – nemaš">✗ ${esc(p.ak||p.rc)}${sub?` → <b>${esc(sub.code)}</b> <small>${sub.g.t}</small>`:""}</span>`).join("");
      }else if(sp){h+=`<div class="st57-lbl">🎨 ${esc(sp.s.name)}: ${s.scheme==="camo"?"jednobojna shema, nema kamuflaže":"nema posebne osnovne boje"}.</div>`;}
      else if(m){h+=`<div class="st57-lbl">Maketa nema odabranu shemu – 🎨 Shema bojanja na kartici makete.</div>`;}
      else{const L=forStep(n,O);h+=`<div class="st57-lbl">Boje koje imaš (odaberi maketu gore za točne boje sheme):</div>`+L.map(chip).join("");}
    }else{
      const L=forStep(n,O);
      if(L.length)h+=L.map(chip).join("");
      else if(s.buy)h+=`<span class="st57-c no">Nemaš – preporuka: ${s.buy.map(b=>`<b>${esc(b.c)}</b> ${esc(b.n)}`).join(", ")}</span>`;
    }
    if(s.tool){const T=tools(O);if(T.length)h+=`<div class="st57-tools">🔧 ${T.map(o=>`<span class="st57-c" title="${esc(o.it.name)}" onclick="goToProduct('${jsStr(o.it.code)}')"><b>${esc(o.it.code)}</b> ${esc(/airbrush|seeker/i.test(o.it.name)?"airbrush":/real colors/i.test(o.it.name)?"razrj. RC":"razrj. 3Gen")}</span>`).join("")}</div>`;}
    if(s.tip)h+=`<div class="st57-tip">💡 ${esc(s.tip)}</div>`;
    return h||`<span class="st57-lbl">—</span>`;
  }

  function render(){
    const tbl=$("redoslijedTable");if(!tbl)return;
    const head=tbl.querySelector("thead tr");
    const dh=head&&head.children[2];if(dh&&!dh.dataset.st57){dh.dataset.st57=1;dh.innerHTML+=" · <span style='color:#a8dcae'>🧰 čime (iz tvog inventara)</span>";}
    let bar=$("st57Bar");
    if(!bar){bar=document.createElement("div");bar.id="st57Bar";bar.className="st57-bar";const wrap=tbl.closest(".ekv-table-wrap")||tbl;wrap.parentNode.insertBefore(bar,wrap);}
    const mk=(S.makete||[]).filter(x=>!/^Set za dioramu|AFV Miniature/i.test(x.name));
    const sel=getM();const m=mk.find(x=>x.id===sel)||null;
    bar.innerHTML=`<label>Prikaži za maketu:</label> <select id="st57Sel"><option value="">— općenito (sve što imaš) —</option>${mk.map(x=>`<option value="${x.id}"${m&&x.id===m.id?" selected":""}>${esc(x.name)}${x.scheme?" 🎨":""}</option>`).join("")}</select>
      <span class="ekv-hint">Zeleno = imaš (klik otvara proizvod) · ✗ = nemaš, uz najsličniju zamjenu</span>`;
    $("st57Sel").onchange=e=>{setM(e.target.value);render();};
    const O=owned();
    for(let n=1;n<=15;n++){
      const row=$("rs-step-"+n);if(!row)continue;
      let td=row.querySelector(".st57-td");if(!td){td=document.createElement("div");td.className="st57-td";(row.children[2]||row).appendChild(td);}
      td.innerHTML=cell(n,O,m);
    }
  }
  window.render57=render;
  const _sp=window.showPage;
  window.showPage=function(p){const r=_sp.apply(this,arguments);if(p==="redoslijed")try{render();}catch(e){console.warn("steps57",e);}return r;};
  const _bmc=window.buildModelCard;if(_bmc)window.buildModelCard=function(m){const d=_bmc.apply(this,arguments);try{d.dataset.id=m.id;}catch(e){}return d;};
  // otvaranje s kartice makete („➡ Sljedeće: …”) – prikaži za tu maketu
  const _g=window.goToRedoslijedStep;
  if(_g)window.goToRedoslijedStep=function(n){try{const ev=window.event;const card=ev&&ev.target&&ev.target.closest&&ev.target.closest("[data-id],.model-card");const id=card&&(card.dataset.id||"");if(id&&(S.makete||[]).some(x=>x.id===id))setM(id);}catch(e){}return _g.apply(this,arguments);};
  try{if(typeof page!=="undefined"&&page==="redoslijed")render();}catch(e){}
})();
