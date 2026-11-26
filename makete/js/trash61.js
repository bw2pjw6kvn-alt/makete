// ── v45.50: 🗑 Koš — sigurnosna mreža za obrisano ──
// Otkad ☁️ sinkronizacija radi sama, slučajno brisanje na jednom uređaju odmah se prenese i na drugi,
// pa kratki "Poništi" toast (par sekundi) više nije dovoljan. Ovo pamti zadnjih N obrisanih stavki
// (proizvodi, želje, računi, stavke računa, makete, recepti, izvori) i do 30 dana, s gumbom za vraćanje.
// Pamti se unutar glavnih podataka (S.trash61), pa se i koš sam sinkronizira na drugi uređaj.
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const DAYS=30,MAX=20,MAXB=3*1024*1024; // 3 MB sigurnosna granica (da koš ne naraste previše za sinkronizaciju)

  function T(){if(!Array.isArray(S.trash61))S.trash61=[];return S.trash61;}
  function prune(){
    const cutoff=Date.now()-DAYS*864e5;
    let L=T().filter(t=>t&&t.at>=cutoff);
    while(L.length>MAX)L.shift();
    let n=0;while(n<50){let big=false;try{big=JSON.stringify(L).length>MAXB;}catch(e){break;}if(!big)break;L.shift();n++;}
    S.trash61=L;
  }
  function add(type,label,data,extra){
    try{
      T().push({id:"tr"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),type,label:String(label||"?").slice(0,90),at:Date.now(),data:JSON.parse(JSON.stringify(data)),extra:extra!=null?JSON.parse(JSON.stringify(extra)):null});
      prune();
    }catch(e){console.warn("trash61 add",e);}
  }

  // zamota postojeću funkciju brisanja: uhvati stavku PRIJE poziva, a nakon poziva provjeri je li stvarno uklonjena
  function wrap(fnName,capture,type,labelFn,extraFn){
    const orig=window[fnName];if(typeof orig!=="function")return;
    window[fnName]=async function(...a){
      let before=null;try{before=capture(...a);}catch(e){}
      const r=await orig.apply(this,a);
      try{
        if(before){
          let after=null;try{after=capture(...a);}catch(e){}
          if(!after)add(type,labelFn(before,a),before,extraFn?extraFn(a,before):null);
        }
      }catch(e){console.warn("trash61 wrap",fnName,e);}
      renderPanel();
      return r;
    };
  }

  wrap("delItem",
    (cat,id)=>(S.inventar[cat]&&S.inventar[cat].items||[]).find(i=>i.id===id),
    "inventar",(it)=>it.name,(a)=>({cat:a[0]}));
  wrap("delWish",
    (id)=>(S.zelje||[]).find(w=>w.id===id),
    "zelja",(it)=>it.name);
  wrap("delOrder",
    (id)=>(S.narudzbe||[]).find(o=>o.id===id),
    "racun",(o)=>o.label||("Račun "+new Date(o.date||o.createdAt||Date.now()).toLocaleDateString("hr-HR")));
  wrap("delOrderItem",
    (orderId,itemId)=>{const o=(S.narudzbe||[]).find(x=>x.id===orderId);return o&&(o.items||[]).find(i=>i.id===itemId);},
    "racunStavka",(it)=>it.name,(a)=>({orderId:a[0]}));
  wrap("delModel",
    (id)=>(S.makete||[]).find(m=>m.id===id),
    "maketa",(m)=>m.name);
  wrap("delRecept",
    (id)=>{const m=(S.makete||[]).find(x=>x.id===(typeof receptiMaketaId!=="undefined"?receptiMaketaId:null));return m&&(m.recepti||[]).find(r=>r.id===id);},
    "recept",(r)=>r.name,()=>({maketaId:typeof receptiMaketaId!=="undefined"?receptiMaketaId:null}));
  wrap("delIzvor",
    (id)=>(S.resursi||[]).find(x=>x.id===id),
    "izvor",(it)=>it.title||it.name);

  // ── vraćanje ──
  function restore(id){
    const L=T();const i=L.findIndex(t=>t.id===id);if(i<0)return;
    const t=L[i];
    let ok=true;
    try{
      if(t.type==="inventar"){
        const cat=t.extra&&t.extra.cat;
        if(!cat||!S.inventar[cat]){showToast("Ta rubrika više ne postoji — nije vraćeno");ok=false;}
        else{if(!S.inventar[cat].items.some(x=>x.id===t.data.id))S.inventar[cat].items.push(t.data);
          save();if(typeof render==="function")render();}
      }else if(t.type==="zelja"){
        S.zelje=S.zelje||[];if(!S.zelje.some(x=>x.id===t.data.id))S.zelje.push(t.data);
        save();if(typeof renderZelje==="function")renderZelje();if(typeof renderStats==="function")renderStats();
      }else if(t.type==="racun"){
        S.narudzbe=S.narudzbe||[];if(!S.narudzbe.some(x=>x.id===t.data.id))S.narudzbe.push(t.data);
        save();if(typeof renderNarudzba==="function")renderNarudzba();if(typeof renderStats==="function")renderStats();
      }else if(t.type==="racunStavka"){
        const ord=(S.narudzbe||[]).find(o=>o.id===(t.extra&&t.extra.orderId));
        if(!ord){showToast("Račun na koji se odnosi je obrisan — nije vraćeno");ok=false;}
        else{ord.items=ord.items||[];if(!ord.items.some(x=>x.id===t.data.id))ord.items.push(t.data);save();if(typeof renderNarudzba==="function")renderNarudzba();if(typeof renderStats==="function")renderStats();}
      }else if(t.type==="maketa"){
        S.makete=S.makete||[];if(!S.makete.some(x=>x.id===t.data.id))S.makete.push(t.data);
        save();if(typeof renderMakete==="function")renderMakete();if(typeof renderStats==="function")renderStats();
      }else if(t.type==="recept"){
        const m=(S.makete||[]).find(x=>x.id===(t.extra&&t.extra.maketaId));
        if(!m){showToast("Maketa na koju se odnosi je obrisana — nije vraćeno");ok=false;}
        else{m.recepti=m.recepti||[];if(!m.recepti.some(x=>x.id===t.data.id))m.recepti.push(t.data);save();if(typeof renderReceptiList==="function")renderReceptiList();if(typeof renderMakete==="function")renderMakete();}
      }else if(t.type==="izvor"){
        S.resursi=S.resursi||[];if(!S.resursi.some(x=>x.id===t.data.id))S.resursi.push(t.data);
        save();if(typeof renderIzvori==="function")renderIzvori();
      }
      if(ok){L.splice(i,1);showToast("↩ Vraćeno: "+t.label);}
    }catch(e){console.warn("trash61 restore",e);showToast("Greška kod vraćanja");}
    renderPanel();
  }
  window.trash61Restore=restore;

  function delForever(id){
    const L=T();const i=L.findIndex(t=>t.id===id);if(i<0)return;
    L.splice(i,1);save();renderPanel();
  }
  window.trash61Del=delForever;

  window.trash61Empty=async function(){
    const n=T().length;if(!n)return;
    const ok=await customConfirm(`Trajno isprazniti koš (${n} ${n===1?"stavka":"stavke/i"})? Ovo se ne može poništiti.`,"Isprazni koš?");
    if(!ok)return;
    S.trash61=[];save();renderPanel();showToast("Koš ispražnjen");
  };

  const TYPE_LBL={inventar:"🎨 Inventar",zelja:"⭐ Želje",racun:"🧾 Račun",racunStavka:"🧾 Stavka računa",maketa:"🛠️ Maketa",recept:"🧪 Recept",izvor:"🖼 Izvor"};
  function renderPanel(){
    const box=$("trash61List");if(!box)return;
    prune();
    const L=[...T()].sort((a,b)=>b.at-a.at);
    const cnt=$("trash61Count");if(cnt)cnt.textContent=L.length?` (${L.length})`:"";
    const eb=$("trash61EmptyBtn");
    if(!L.length){box.innerHTML=`<div style="font-size:12px;color:var(--muted);padding:6px 0">Koš je prazan.</div>`;if(eb)eb.style.display="none";return;}
    if(eb)eb.style.display="";
    box.innerHTML=L.map(t=>`<div class="trash61-row">
      <div class="trash61-i"><span class="trash61-tag">${TYPE_LBL[t.type]||t.type}</span> ${esc(t.label)}</div>
      <div class="trash61-m">${new Date(t.at).toLocaleDateString("hr-HR")} ${new Date(t.at).toLocaleTimeString("hr-HR",{hour:"2-digit",minute:"2-digit"})}</div>
      <div class="trash61-b"><button type="button" class="btn-sm" onclick="trash61Restore('${t.id}')">↩ Vrati</button><button type="button" class="btn-sm" title="Trajno ukloni iz koša" onclick="trash61Del('${t.id}')">✕</button></div>
    </div>`).join("");
  }

  // ── ⚙ Podaci → nova sekcija, odmah iza "Inventar" ──
  function mountUI(){
    const m=document.querySelector("#dataModal46 .data46");if(!m||$("trash61Sec"))return;
    const sec=document.createElement("div");sec.className="data46-sec";sec.id="trash61Sec";
    sec.innerHTML=`<div class="oz-sub">🗑 Koš<span id="trash61Count"></span></div>
      <div class="ekv-hint">Zadnjih do ${MAX} obrisanih stavki (najviše ${DAYS} dana) — proizvodi, želje, računi, makete, recepti i izvori. Vraća i ono što se u međuvremenu sinkroniziralo na drugi uređaj.</div>
      <div id="trash61List"></div>
      <div class="data46-row" style="margin-top:6px"><button type="button" class="btn-sm" id="trash61EmptyBtn" style="display:none" onclick="trash61Empty()">Isprazni koš</button></div>`;
    const anchor=$("d46Inv")&&$("d46Inv").closest(".data46-sec");
    if(anchor)anchor.after(sec);else m.appendChild(sec);
  }
  const _od=window.openData46;
  if(_od)window.openData46=function(){const r=_od.apply(this,arguments);try{mountUI();renderPanel();}catch(e){console.warn(e);}return r;};
  setTimeout(()=>{try{mountUI();}catch(e){}},2500);
})();
