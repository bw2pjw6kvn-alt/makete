// ── v45.23: sheme bojanja po modelu makete (u „🎨 Shema bojanja” i u „🛠️ Plan radova”) ──
(function(){
  "use strict";
  if(typeof PAINT_SCHEMES==="undefined")return;
  const $=id=>document.getElementById(id);
  // boje: ak = šifra iz AK tablice (Usporedba boja), rc = Real Colors, std = standard (za prepoznavanje boja koje već imaš, npr. Vallejo „RAL 8020”)
  const C={
    dunkelgelb:{role:"Osnova – Dunkelgelb (RAL 7028)",ak:"AK11318",rc:"RC859",std:"7028",alt:["RCM018","RC860","RC060"]},
    olivgrun:{role:"Kamuflaža – Olivgrün (RAL 6003)",ak:"AK11309",rc:"RC852",std:"6003"},
    rotbraun:{role:"Kamuflaža – Rotbraun (RAL 8017)",ak:"AK11330",rc:"RC864",std:"8017"},
    dunkelgrau:{role:"Osnova – Dunkelgrau (RAL 7021)",ak:"AK11316",rc:"RC856",std:"7021",alt:["RCM017"]},
    dunkelbraun:{role:"Kamuflaža – Dunkelbraun (RAL 7017), ~1/3 površine",ak:"AK11315",rc:"RC855",std:"7017"},
    gelbbraun:{role:"Osnova – Gelbbraun (RAL 8000)",ak:"AK11327",rc:"RC861",std:"8000"},
    graugrun:{role:"Mrlje – Graugrün (RAL 7008)",ak:"AK11313",rc:"RC853",std:"7008"},
    braun:{role:"Osnova – Braun (RAL 8020)",ak:"AK11331",rc:"RC865",std:"8020"},
    grau:{role:"Mrlje – Grau (RAL 7027)",ak:"AK11317",rc:"RC857",std:"7027"},
    bijela:{role:"Zimska bijela (vapno, nanosi se preko osnove)",ak:"AK11001",std:""},
    guma:{role:"Gume i gumeni dijelovi",ak:"AK11027",rc:"RC805",alt:["RCM001"]},
    carc:{role:"Osnova – CARC Tan 686A (FS 33446)",ak:"AK11349",rc:"RC885",std:"686",alt:["RC079"]},
    natoGreen:{role:"NATO zelena – Green 383 (FS 34094)",ak:"AK11421",rc:"RC886",std:"34094"},
    natoBrown:{role:"NATO smeđa – Brown 383 (FS 30051)",ak:"AK11110",std:"30051"},
    natoBlack:{role:"NATO crna (FS 37030)",ak:"AK11029",rc:"RC888",std:"37030"},
    cfGreen:{role:"Osnova – kanadska tamna maslinasta (najbliže FS 34094 / Olive Drab)",ak:"AK11421",rc:"RC886",alt:["RCM021","RC901"]},
    unBijela:{role:"Osnova – UN bijela",ak:"AK11001",std:""},
    unCrna:{role:"Natpis „UN” i oznake – crna",ak:"AK11029",alt:["RCM033"]},
    gunship:{role:"Cijeli avion – Gunship Gray (FS 36118)",ak:"AK11881",rc:"RC913",std:"36118"},
    navyBlue:{role:"Bokovi i nadgrađe – Navy Blue 5-N (približno)",ak:"AK11187",std:""},
    deckBlue:{role:"Pilotska paluba – Deck Blue 20-B (približno)",ak:"AK11190",rc:"RC924",std:""},
    seaBlue:{role:"Donji pojas – Sea Blue 5-S (približno)",ak:"AK11190",rc:"RC924",std:""},
    oceanGray:{role:"Srednji pojas – Ocean Gray 5-O",ak:"AK11341",rc:"RC908",std:"35164"},
    hazeGray:{role:"Gornji dio – Haze Gray 5-H (približno FS 36270)",ak:"AK11886",rc:"RC918",std:"36270"},
  };
  const P=(...k)=>k.map(x=>Object.assign({},C[x]));
  const M={
    dak:[{code:"AK022",name:"Africa Dust Effects",why:"pustinjska prašina po vozilu"},{code:"AK041",name:"North Africa Dust (pigment)",why:"suhi nanosi prašine"},{code:"AK4061",name:"Sand Yellow Deposit",why:"nakupine pijeska"},{code:"AMIG1001",name:"Afrika Korps Wash",why:"wash za DAK boje"}],
    europa:[{code:"AK2073",name:"Paneliner for Sand and Desert",why:"panel linije na svijetloj osnovi"},{code:"AK017",name:"Earth Effects",why:"zemlja na donjem stroju"},{code:"AK042",name:"Europe Earth (pigment)",why:"europska zemlja"},{code:"AK4063",name:"Brown Earth Deposit",why:"nakupine zemlje"}],
    istok:[{code:"AK017",name:"Earth Effects",why:"blato Istočne fronte"},{code:"AK078",name:"Damp Earth Effects",why:"vlažna zemlja"},{code:"AK042",name:"Europe Earth (pigment)",why:"suha zemlja"},{code:"AK8026",name:"Splatter Effects Wet Mud",why:"prskanje blata"}],
    zima:[{code:"AK015",name:"Dust Effects",why:"istrošena bijela boja"},{code:"AK10019",name:"Chipping Color (olovka)",why:"oštećenja vapna"},{code:"AK078",name:"Damp Earth Effects",why:"blato i snijeg"}],
    usPust:[{code:"AK2073",name:"Paneliner for Sand and Desert",why:"panel linije"},{code:"AK041",name:"North Africa Dust (pigment)",why:"pustinjska prašina"},{code:"AK4062",name:"Light Dust Deposit",why:"svijetla prašina"},{code:"AMIG0701",name:"Afrika Korps Wash (akril)",why:"smeđi wash za pješčanu osnovu"}],
    nato:[{code:"AK12102",name:"Black Precision Panel Liner",why:"panel linije"},{code:"AK017",name:"Earth Effects",why:"zemlja na gusjenicama/kotačima"},{code:"AK015",name:"Dust Effects",why:"prašina"}],
    un:[{code:"AK12102",name:"Black Precision Panel Liner",why:"panel linije na bijeloj"},{code:"AK015",name:"Dust Effects",why:"prašina"},{code:"AK078",name:"Damp Earth Effects",why:"blato Bosne"}],
    avion:[{code:"AK12102",name:"Black Precision Panel Liner",why:"panel linije na sivoj"},{code:"AMIG1801",name:"Fuel Stains",why:"mrlje goriva"},{code:"AK11239",name:"Gloss Varnish",why:"lak prije dekala"}],
    brod:[{code:"AK12102",name:"Black Precision Panel Liner",why:"detalji palube i nadgrađa"},{code:"AK11237",name:"Matt Varnish",why:"završni mat lak"}],
  };
  const MS=[
    // Panzer IV Ausf. H
    {key:"m51_pz4_troton",model:/panzer\s*iv|pz\.?\s*kpfw\.?\s*iv|pz\.?\s*iv/i,icon:"🟨",name:"Pz.IV H – Dunkelgelb troton (1943–44)",period:"Kursk, Ukrajina, Normandija",note:"Ausf. H je od proljeća 1943. dolazio u tvorničkom Dunkelgelbu; postrojbe su na terenu dodavale pruge ili mrlje Olivgrüna i Rotbrauna. Od rujna 1943. Zimmerit na oklopu.",paints:P("dunkelgelb","olivgrun","rotbraun","guma"),mats:M.europa},
    {key:"m51_pz4_mono",model:/panzer\s*iv|pz\.?\s*kpfw\.?\s*iv|pz\.?\s*iv/i,icon:"🟡",name:"Pz.IV H – Dunkelgelb jednobojno (proljeće 1943.)",period:"novoisporučena vozila",note:"Vozila tek iz tvornice, prije nanošenja terenske kamuflaže — samo Dunkelgelb s križevima i brojevima.",paints:P("dunkelgelb","guma"),mats:M.europa},
    {key:"m51_pz4_zima",model:/panzer\s*iv|pz\.?\s*kpfw\.?\s*iv|pz\.?\s*iv/i,icon:"❄️",name:"Pz.IV H – zimska bijela (Istočna fronta 1943/44)",period:"zima, Istočna fronta",note:"Bijelo vapno preko Dunkelgelba, često istrošeno pa osnova proviruje — idealno za chipping i istrošenost.",paints:P("dunkelgelb","bijela","guma"),mats:M.zima},
    // Sd.Kfz.223
    {key:"m51_223_dak43",model:/sd\.?\s*kfz\.?\s*223/i,icon:"🏜️",name:"Sd.Kfz.223 – DAK Braun/Grau (Tunis 1942–43)",period:"Sjeverna Afrika od 1942.",note:"Od 1942. tropska shema RAL 8020 Braun s mrljama RAL 7027 Grau — to je tvoj Vallejo DAK set i referentna fotografija iz Tunisa 1943.",paints:P("braun","grau","guma"),mats:M.dak},
    {key:"m51_223_dak41",model:/sd\.?\s*kfz\.?\s*223/i,icon:"🌴",name:"Sd.Kfz.223 – DAK Gelbbraun/Graugrün (1941–42)",period:"Sjeverna Afrika 1941–42",note:"Prva tropska shema: RAL 8000 Gelbbraun s mrljama RAL 7008 Graugrün.",paints:P("gelbbraun","graugrun","guma"),mats:M.dak},
    {key:"m51_223_1940",model:/sd\.?\s*kfz\.?\s*223/i,icon:"🌾",name:"Sd.Kfz.223 – Dunkelgrau/Dunkelbraun (Poljska i Francuska 1939–40)",period:"1939–1940",note:"RAL 7021 Dunkelgrau s otprilike trećinom površine u RAL 7017 Dunkelbraun (do ljeta 1940.).",paints:P("dunkelgrau","dunkelbraun","guma"),mats:M.europa},
    {key:"m51_223_istok",model:/sd\.?\s*kfz\.?\s*223/i,icon:"🌲",name:"Sd.Kfz.223 – Dunkelgrau (Istočna fronta 1941–42)",period:"Barbarossa",note:"Jednobojni RAL 7021 Dunkelgrau, puno prašine ljeti i blata u jesen.",paints:P("dunkelgrau","guma"),mats:M.istok},
    // Tiger I Ausf. E (rana proizvodnja)
    {key:"m51_tiger_tunis",model:/tiger\s*(1|i)\b|tiger\s*i\s*ausf|tiger 1/i,icon:"🏜️",name:"Tiger I (rani) – Tunis 1942–43, Braun/Grau",period:"s.Pz.Abt. 501 i 504",note:"Rani Tigri u Tunisu: RAL 8020 Braun s mrljama RAL 7027 Grau, pješčana prašina.",paints:P("braun","grau","guma"),mats:M.dak},
    {key:"m51_tiger_502",model:/tiger\s*(1|i)\b|tiger\s*i\s*ausf|tiger 1/i,icon:"🌲",name:"Tiger I (rani) – Dunkelgrau (Lenjingrad 1942)",period:"s.Pz.Abt. 502",note:"Prvi Tigri u borbi kod Lenjingrada, jednobojni RAL 7021 Dunkelgrau.",paints:P("dunkelgrau","guma"),mats:M.istok},
    {key:"m51_tiger_kursk",model:/tiger\s*(1|i)\b|tiger\s*i\s*ausf|tiger 1/i,icon:"🟨",name:"Tiger I – Dunkelgelb troton (Kursk 1943)",period:"ljeto 1943.",note:"Dunkelgelb s pjegama ili prugama Olivgrüna i Rotbrauna (npr. s.Pz.Abt. 503, SS divizije).",paints:P("dunkelgelb","olivgrun","rotbraun","guma"),mats:M.istok},
    {key:"m51_tiger_zima",model:/tiger\s*(1|i)\b|tiger\s*i\s*ausf|tiger 1/i,icon:"❄️",name:"Tiger I – zimska bijela (1942/43)",period:"zima, Istočna fronta",note:"Bijelo vapno preko Dunkelgraua, istrošeno na rubovima.",paints:P("dunkelgrau","bijela","guma"),mats:M.zima},
    // StuG III Ausf. G (ožujak 1943.)
    {key:"m51_stug_kursk",model:/stug\s*iii|sturmgesch[üu]tz\s*iii/i,icon:"🟨",name:"StuG III G – Dunkelgelb troton (Kursk 1943)",period:"ljeto 1943.",note:"Vozila iz proljeća 1943. u Dunkelgelbu, na terenu s prugama Olivgrüna i/ili Rotbrauna.",paints:P("dunkelgelb","olivgrun","rotbraun","guma"),mats:M.istok},
    {key:"m51_stug_mono",model:/stug\s*iii|sturmgesch[üu]tz\s*iii/i,icon:"🟡",name:"StuG III G – Dunkelgelb jednobojno (proljeće 1943.)",period:"iz tvornice Alkett",note:"Ožujak 1943. je prijelaz na Dunkelgelb kao tvorničku boju — jednobojno vozilo s oznakama.",paints:P("dunkelgelb","guma"),mats:M.europa},
    {key:"m51_stug_zima",model:/stug\s*iii|sturmgesch[üu]tz\s*iii/i,icon:"❄️",name:"StuG III G – zimska bijela (1943/44)",period:"zima, Istočna fronta",note:"Vapno preko Dunkelgelba, jako istrošeno.",paints:P("dunkelgelb","bijela","guma"),mats:M.zima},
    // Sd.Kfz.250/1
    {key:"m51_250_istok",model:/sd\.?\s*kfz\.?\s*250/i,icon:"🌲",name:"Sd.Kfz.250/1 – Dunkelgrau (Barbarossa 1941)",period:"1941–42",note:"Jednobojni RAL 7021 Dunkelgrau.",paints:P("dunkelgrau","guma"),mats:M.istok},
    {key:"m51_250_dak",model:/sd\.?\s*kfz\.?\s*250/i,icon:"🏜️",name:"Sd.Kfz.250/1 – DAK Braun/Grau (1942–43)",period:"Sjeverna Afrika",note:"RAL 8020 Braun s mrljama RAL 7027 Grau.",paints:P("braun","grau","guma"),mats:M.dak},
    {key:"m51_250_troton",model:/sd\.?\s*kfz\.?\s*250/i,icon:"🟨",name:"Sd.Kfz.250/1 – Dunkelgelb troton (1943–44)",period:"npr. Grossdeutschland",note:"Dunkelgelb s Olivgrün/Rotbraun prugama.",paints:P("dunkelgelb","olivgrun","rotbraun","guma"),mats:M.europa},
    // M2A2 Bradley OIF
    {key:"m51_brad_oif",model:/bradley/i,icon:"🏜️",name:"M2A2 Bradley – CARC Tan 686A (Irak 2003, OIF)",period:"Operation Iraqi Freedom",note:"Jednobojna pješčana CARC Tan 686A; tvoj Vallejo set US Modern Desert ima 71.122 US Desert Armour 686.",paints:P("carc","guma"),mats:M.usPust},
    {key:"m51_brad_nato",model:/bradley/i,icon:"🛡️",name:"M2A2 Bradley – NATO troton (Njemačka 1990-ih)",period:"US Army Europe",note:"Green 383, Brown 383 i crna u velikim mrljama.",paints:P("natoGreen","natoBrown","natoBlack","guma"),mats:M.nato},
    // M60A1 USMC
    {key:"m51_m60_ds",model:/m60/i,icon:"🏜️",name:"M60A1 RISE/P USMC – pješčana (Pustinjska oluja 1991.)",period:"Kuvajt 1991.",note:"Marinci su M60A1 s reaktivnim oklopom u Pustinjskoj oluji koristili u pješčanoj boji (Tan 686, FS 33446).",paints:P("carc","guma"),mats:M.usPust},
    {key:"m51_m60_nato",model:/m60/i,icon:"🛡️",name:"M60A1 USMC – NATO troton (kraj 1980-ih)",period:"prije 1991.",note:"Green 383, Brown 383 i crna.",paints:P("natoGreen","natoBrown","natoBlack","guma"),mats:M.nato},
    // Canadian Grizzly
    {key:"m51_griz_cf",model:/grizzly/i,icon:"🍁",name:"Grizzly AVGP – kanadska tamna maslinasta",period:"Kanadske oružane snage",note:"Jednobojna tamna maslinasta zelena — provjeri nijansu na referentnim fotografijama.",paints:P("cfGreen","guma"),mats:M.nato},
    {key:"m51_griz_un",model:/grizzly/i,icon:"🇺🇳",name:"Grizzly AVGP – UN bijela (Bosna i Hercegovina 1990-ih)",period:"UNPROFOR",note:"Bijelo vozilo s velikim crnim natpisom „UN”; puno blata i prašine.",paints:P("unBijela","unCrna","guma"),mats:M.un},
    // F-15E
    {key:"m51_f15e",model:/f-?15/i,icon:"✈️",name:"F-15E Strike Eagle – Gunship Gray (USAF standard)",period:"USAF",note:"Cijeli avion u FS 36118 Gunship Gray; tamniji panel lineri, mrlje goriva i ispušni dijelovi u metalik tonovima.",paints:P("gunship"),mats:M.avion},
    // USS Enterprise CV-6
    {key:"m51_cv6_ms21",model:/enterprise/i,icon:"⚓",name:"USS Enterprise CV-6 – Measure 21 (1942–43)",period:"Pacifik",note:"Bokovi i nadgrađe u Navy Blue 5-N, paluba Deck Blue 20-B. Nijanse su približne — provjeri na referenci za datum koji gradiš.",paints:P("navyBlue","deckBlue"),mats:M.brod},
    {key:"m51_cv6_ms12",model:/enterprise/i,icon:"🌊",name:"USS Enterprise CV-6 – Measure 12 (1941–42)",period:"Pacifik",note:"Pojasevi Sea Blue / Ocean Gray / Haze Gray odozdo prema gore. Provjeri referencu za točno razdoblje.",paints:P("seaBlue","oceanGray","hazeGray","deckBlue"),mats:M.brod},
  ];
  MS.forEach(s=>{s.match=/^$/;PAINT_SCHEMES.push(s);});   // model-sheme se nude preko vlastitog „model” uzorka
  const forModel=m=>MS.filter(s=>s.model.test([m.name,m.code].join(" ")));
  window.schemesForModel51=forModel;

  // boje koje već imaš prepoznaj i po standardu u nazivu (npr. Vallejo „117 – Braun RAL 8020”, „US Desert Armour 686”)
  function refreshAlt(){
    const items=Object.values(S.inventar||{}).flatMap(cd=>cd.items||[]).filter(i=>i.status==="imam"&&i.code&&i.code!=="–"&&!i.isSetHeader);
    MS.forEach(s=>s.paints.forEach(p=>{
      const base=(C[Object.keys(C).find(k=>C[k].ak===p.ak&&C[k].role===p.role)]||{}).alt||[];
      const extra=p.std?items.filter(i=>new RegExp("(^|\\D)"+p.std+"(\\D|$)").test(i.name+" "+(i.desc||"").slice(0,60))&&!/primer/i.test(i.name)).map(i=>i.code):[];
      p.alt=[...new Set([...base,...extra])];
    }));
  }

  // ── izbornik u „🎨 Shema bojanja”: najprije sheme za ovaj model ──
  window.renderSchemeTabs=function(){
    const m=S.makete.find(x=>x.id===schemeMaketaId);if(!m)return;refreshAlt();
    const hay=[m.name,m.code,m.mfr].join(" ");
    const mine=forModel(m),gen=PAINT_SCHEMES.filter(s=>!s.model&&s.match.test(hay)),oth=PAINT_SCHEMES.filter(s=>!s.model&&!s.match.test(hay));
    const owned=schOwned();
    const chip=s=>{const n=s.paints.filter(p=>schPaintInfo(p,owned).hit).length;
      return `<button type="button" class="sch-chip${schemeSel===s.key?" on":""}" onclick="pickScheme('${s.key}')">${s.icon} ${esc(s.name)} <small class="sch51-n${n===s.paints.length?" ok":""}">${n}/${s.paints.length}</small></button>`;};
    $("schemeTabs").innerHTML=
      (mine.length?`<div class="sch-lbl">🎯 Sheme za ovaj model (${mine.length})</div><div class="sch-chips">${mine.map(chip).join("")}</div>`:`<div class="ekv-hint">Za ovaj model još nema posebnih shema — odaberi opću ispod.</div>`)+
      (gen.length?`<div class="sch-lbl">⭐ Opće za ovaj tip vozila</div><div class="sch-chips">${gen.map(chip).join("")}</div>`:"")+
      (oth.length?`<details class="sch51-more"><summary>Ostale opće sheme (${oth.length})</summary><div class="sch-chips">${oth.map(chip).join("")}</div></details>`:"");
  };
  const _osm=window.openSchemeModal;
  window.openSchemeModal=function(id,key){
    refreshAlt();const r=_osm.apply(this,arguments);
    const md=$("schemeModal");if(md)md.style.zIndex="1200";
    const t=$("schemeModalTitle");if(t)t.textContent=t.textContent.replace("Tip izrade boja","Shema bojanja");
    if(key){pickScheme(key);}
    else if(!schemeSel){const m=S.makete.find(x=>x.id===id);const f=m&&forModel(m)[0];if(f)pickScheme(f.key);}
    return r;
  };
  const _scd=window.schemeCardHtml;window.schemeCardHtml=function(m){refreshAlt();return _scd.apply(this,arguments).replace("Tip izrade</div>","Shema bojanja</div>");};

  // ── kartica makete: gumb „🎨 Shema bojanja” s brojem prijedloga ──
  const _bmc=window.buildModelCard;
  window.buildModelCard=function(m){
    const d=_bmc.apply(this,arguments);
    const b=d.querySelector('button[onclick^="openSchemeModal"]');
    if(b&&b.tagName==="BUTTON"){const n=forModel(m).length;b.textContent="🎨 Shema bojanja"+(m.scheme?" ✓":n?` (${n})`:"");b.title=n?`${n} shema bojanja za ovaj model`:"Odaberi shemu bojanja";}
    return d;
  };

  // ── 🛠️ Plan radova: odabir sheme bojanja na vrhu ──
  const _opm=window.openPlanModal;
  window.openPlanModal=function(id){
    const r=_opm.apply(this,arguments);
    const m=S.makete.find(x=>x.id===id);const tasks=$("planTasks");if(!m||!tasks)return r;
    let box=$("planScheme51");if(!box){box=document.createElement("div");box.id="planScheme51";box.className="plan51";tasks.parentElement.insertBefore(box,tasks.previousElementSibling&&tasks.previousElementSibling.tagName==="LABEL"?tasks.previousElementSibling:tasks);}
    const cur=PAINT_SCHEMES.find(s=>s.key===m.scheme),list=forModel(m);refreshAlt();const owned=schOwned();
    box.innerHTML=`<div class="sch-lbl">🎨 Shema bojanja${cur?`: <b>${cur.icon} ${esc(cur.name)}</b>`:""}</div>
      ${list.length?`<div class="sch-chips">${list.map(s=>{const n=s.paints.filter(p=>schPaintInfo(p,owned).hit).length;
        return `<button type="button" class="sch-chip${m.scheme===s.key?" on":""}" onclick="openSchemeModal('${m.id}','${s.key}')">${s.icon} ${esc(s.name)} <small class="sch51-n${n===s.paints.length?" ok":""}">${n}/${s.paints.length}</small></button>`;}).join("")}</div>`
        :`<div class="ekv-hint">Za ovaj model nema posebnih shema.</div>`}
      <div class="ekv-hint">Klik na shemu prikaže boje (✓ imaš / ✗ nemaš) i materijale; „Spremi” ih dodaje u BOJE makete, a što nemaš može ići u Želje.</div>`;
    return r;
  };
  const _ss=window.saveScheme;window.saveScheme=function(){const r=_ss.apply(this,arguments);if(planMaketaId){const id=planMaketaId;setTimeout(()=>{if($("planModal").style.display==="flex"){const keep=planDraft;openPlanModal(id);planDraft=keep;renderPlanTasks();renderPlanSections();}},50);}return r;};
  try{if(page==="makete")renderMakete();}catch(e){}
})();
