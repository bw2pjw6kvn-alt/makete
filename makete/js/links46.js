// ── v45.7: veze iz "Izrada" i "Upute za korištenje" prema stvarnim proizvodima u Inventaru ──
(function(){
  "use strict";
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function allItems(){
    return Object.entries(S.inventar||{}).flatMap(([cat,cd])=>(cd.items||[]).map(it=>({cat,it,c:nk(it.code),n:String(it.name||""),m:String(it.mfr||"")})));
  }

  // ── skok na jedan ili više proizvoda u Inventaru (otvara rubriku i komplet, označi kartice) ──
  window.goToItems46=function(ids){
    ids=[].concat(ids||[]);
    const list=allItems().filter(x=>ids.includes(x.it.id));
    if(!list.length){showToast("Nije pronađeno u Inventaru");return;}
    showPage("inventar",document.querySelector(".nav-tab.t-inv"));
    const si=document.getElementById("searchInput");if(si)si.value="";
    search="";
    if(typeof filter!=="undefined"&&filter!=="all")setFilter("all");
    list.forEach(({cat,it})=>{
      safeSessionSet("o_"+cat,"1");
      if(it.subgroup)safeSessionSet("sg_"+cat+"::"+it.subgroup,"1");
    });
    render();
    setTimeout(()=>{
      const els=list.map(x=>document.querySelector(`.product[data-id="${CSS.escape(x.it.id)}"]`)).filter(Boolean);
      if(els[0])els[0].scrollIntoView({behavior:"smooth",block:"center"});
      els.forEach(el=>{el.classList.add("hl46");setTimeout(()=>el.classList.remove("hl46"),2600);});
    },250);
    showToast(list.length===1?`→ ${list[0].it.code} ${list[0].it.name}`:`→ ${list.length} proizvoda u Inventaru`);
  };

  // stari linkovi na rubrike (imena prije v45.4) i dalje rade
  const _goCat=window.goToCategory;
  window.goToCategory=function(cat){return _goCat.call(this,(typeof mapCat45==="function"&&!S.inventar[cat])?mapCat45(cat):cat);};

  // ── IZRADA: šifre u tablicama terena ──
  function decorateCodes(root){
    const items=allItems();
    root.querySelectorAll(".code46").forEach(el=>{
      if(el.closest(".ekv-hint")&&el.style.pointerEvents==="none")return;   // legenda
      const code=el.dataset.code,url=el.dataset.url||"";
      const k=nk(code);
      const hits=items.filter(x=>x.c===k);
      el.classList.remove("own","miss");
      if(hits.length){
        el.classList.add("own");
        el.textContent="✓ "+code;
        el.title=hits.map(h=>h.it.code+" "+h.it.name+" — rubrika "+h.cat).join("\n")+"\nKlikni za otvaranje u Inventaru";
        el.onclick=()=>goToItems46(hits.map(h=>h.it.id));
      }else{
        el.classList.add("miss");
        el.textContent=code+(url?" ↗":"");
        el.title=url?"Nemaš u Inventaru — klikni za stranicu proizvođača":"Nemaš u Inventaru";
        el.onclick=url?()=>window.open(url,"_blank","noopener"):null;
      }
    });
  }

  // ── UPUTE: svaki redak (vrsta proizvoda) -> proizvodi iz Inventara ──
  const cat=(x,c)=>x.cat===c;
  const RULES={
    "3GEN akril":x=>/^AK11\d{3}$/.test(x.c)&&cat(x,"Akrilne boje"),
    "Quick Gen":x=>/^AK17\d{3}$/.test(x.c),
    "Acrylic Wash":x=>/acrylic wash/i.test(x.n)||x.c==="AMIG0701",
    "Gouache":x=>/^AKG\d/.test(x.c),
    "The Inks":x=>/\binks?\b/i.test(x.n),
    "Dual EXO":x=>/^AK15\d\d$/.test(x.c)&&!/thinner/i.test(x.n),
    "Artist Dense":x=>/^AKAD/.test(x.c),
    "Vallejo / druge marke akrila":x=>/vallejo/i.test(x.m)&&cat(x,"Akrilne boje"),
    "Real Colors":x=>/^RCS?\d{3}$/.test(x.c)&&!/thinner/i.test(x.n),
    "Real Colors — post-shading":x=>/^RCS?\d{3}$/.test(x.c)&&!/thinner/i.test(x.n),
    "Real Colors Markers":x=>/^RCM\d/.test(x.c),
    "Playmarkers":x=>/^AKM\d/.test(x.c),
    "Quick Markers":x=>/^AKMQ/.test(x.c),
    "Weathering Pencil":x=>/^AK100\d\d$/.test(x.c),
    "Dry Pigments":x=>cat(x,"Pigmenti")&&!/fixer/i.test(x.n),
    "Liquid Pigments":x=>/liquid pigment/i.test(x.n),
    "ABT502 Oil":x=>/^ABT/.test(x.c),
    "Terrain paste (Dry/Wet/Muddy Ground, Dark Earth…)":x=>/^AK80(1\d|2[0-5])$/.test(x.c)||/^AMIG21\d\d$/.test(x.c),
    "Rocks & granular material":x=>/^AK8(2[5-9]|3)\d\d$/.test(x.c)||/rocks|gravel/i.test(x.n),
    "Vegetacija (statička trava, lišće)":x=>/tuft|grass|leaves|shrub|foliage/i.test(x.n)&&!/mud and grass/i.test(x.n),
    "Wargame tereni/vegetacija":x=>/wargame/i.test(x.n),
    "Special Effects (Still Water, Snow…)":x=>/^AK80(0\d|2[6-9]|3\d)$/.test(x.c)||/^AMIG22\d\d$/.test(x.c),
    "Panel Liners":x=>/panel ?liner|paneliner/i.test(x.n),
    "Washes (enamel)":x=>/wash/i.test(x.n)&&!/acrylic/i.test(x.n)&&x.c!=="AMIG0701",
    "Filters":x=>/filter/i.test(x.n),
    "Deposits":x=>/^AK40\d\d$/.test(x.c),
    "Effects (Rust Streaks, Streaking Grime…)":x=>cat(x,"Efekti (emajl)")&&!/^AK40\d\d$/.test(x.c)&&!x.it.isSetHeader,
    "Natural Oxidants":x=>/oxid/i.test(x.n),
    "Weathering Sets":x=>x.it.isSetHeader&&/^(Efekti|Pigmenti)/.test(x.cat),
    "Primeri (Primers)":x=>(cat(x,"Temeljni premazi (primer)")||/primer/i.test(x.n))&&!/^AK100/.test(x.c),
    "Basics":x=>/retarder|flow improver|(gloss|matt?e?) medium/i.test(x.n),
    "Cleaner":x=>/clean/i.test(x.n),
    "Thinner":x=>/thinner/i.test(x.n),
    "Varnish (lak)":x=>cat(x,"Lakovi")||/varnish/i.test(x.n),
    "Glue & Fixer":x=>/fixer|glue|cement/i.test(x.n),
    "Anti-slip (protuklizna pasta)":x=>/anti-?slip/i.test(x.n),
    "Putty (kit/glit)":x=>/putty/i.test(x.n),
    "Plastično ljepilo (cement)":x=>/cement/i.test(x.n),
    "Airbrush (uređaj)":x=>cat(x,"Airbrush i alati"),
    "Decal Setter / Softener":x=>/decal/i.test(x.n),
    "Hairspray tehnika":x=>/hairspray|chipping fluid|worn effects/i.test(x.n),
    "Chipping spužvicom/kistom":x=>/chipping/i.test(x.n),
  };
  function decorateUpute(){
    const page=document.getElementById("page-upute");if(!page)return;
    const items=allItems();
    page.querySelectorAll("table.ekv-table tbody tr").forEach(tr=>{
      const td=tr.querySelector("td");if(!td)return;
      const old=td.querySelector(".inv-link46");if(old)old.remove();
      // naziv retka bez starog linka na rubriku
      const lbl=td.querySelector(".ekv-code[onclick]");
      if(lbl){lbl.removeAttribute("onclick");lbl.style.cursor="";lbl.removeAttribute("title");}
      const key=td.textContent.trim();
      const rule=RULES[key];if(!rule)return;
      const hits=items.filter(rule);
      const b=document.createElement("span");
      b.className="inv-link46 "+(hits.length?"has":"none");
      if(hits.length){
        const cats=[...new Set(hits.map(h=>h.cat))];
        b.innerHTML=`✓ ${hits.length} u Inventaru <small>${esc(cats.join(", "))}</small>`;
        b.title=hits.slice(0,25).map(h=>h.it.code+" "+h.it.name).join("\n")+(hits.length>25?"\n…":"")+"\n\nKlikni za prikaz u Inventaru";
        b.onclick=e=>{e.stopPropagation();goToItems46(hits.map(h=>h.it.id));};
      }else{
        b.textContent="nemaš u Inventaru";
      }
      td.appendChild(b);
    });
  }

  // osvježi pri svakom otvaranju stranice
  const _show=window.showPage;
  window.showPage=function(p){
    const r=_show.apply(this,arguments);
    try{
      if(p==="redoslijed")decorateCodes(document.getElementById("page-redoslijed"));
      if(p==="upute")decorateUpute();
    }catch(e){console.warn("links46:",e);}
    return r;
  };
  window.decorateUpute46=decorateUpute;
  window.decorateCodes46=decorateCodes;
})();
