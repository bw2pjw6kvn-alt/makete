// ── v45.45: ☁️ Automatska sinkronizacija računalo ↔ mobitel (privatni GitHub Gist) ──
// Podaci se spremaju u TAJNI gist na korisnikovom GitHub računu. Token (samo ovlast „gist”) unosi korisnik
// jednom po uređaju; ostaje samo u pregledniku tog uređaja. Nakon toga sve ide samo: pri otvaranju se
// povuku novije promjene, a nakon svake izmjene (za par sekundi) pošalju se na GitHub.
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  const FILE="makete_sync.json",API="https://api.github.com";
  const K={tok:"__sync58_tok",gist:"__sync58_gist",seen:"__sync58_seen",dirty:"__sync58_dirty",chg:"__sync58_chg",last:"__sync58_last",conf:"__sync58_conflict",hash:"__sync58_hash"};
  const get=k=>{try{return AppStore.getItem(k)||"";}catch(e){return "";}};
  const set=(k,v)=>{try{if(v===null||v===undefined||v==="")AppStore.removeItem(k);else AppStore.setItem(k,String(v));}catch(e){}};
  const dev=(()=>{const u=navigator.userAgent;return /iPhone/.test(u)?"iPhone":/iPad/.test(u)?"iPad":/Android/.test(u)?"Android":/Windows/.test(u)?"Windows PC":/Mac/.test(u)?"Mac":"uređaj";})();
  let busy=false,timer=null,suppress=false,state="off",msg="",ready=false;
  const hashS=()=>{const t=JSON.stringify(S);let h=2166136261;for(let i=0;i<t.length;i+=7){h^=t.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(36)+"_"+t.length;};
  const markClean=()=>{set(K.dirty,"");set(K.hash,hashS());};

  const hdr=()=>({"Authorization":"Bearer "+get(K.tok),"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"});
  async function gh(path,opt={}){
    const r=await fetch(API+path,{...opt,headers:{...hdr(),...(opt.body?{"Content-Type":"application/json"}:{}),...(opt.headers||{})},cache:"no-store"});
    if(r.status===401||r.status===403){const t=await r.text();throw Object.assign(new Error("Token nije valjan ili nema ovlast „gist” ("+r.status+")"),{auth:true,detail:t});}
    if(!r.ok)throw new Error("GitHub "+r.status);
    return r.status===204?null:r.json();
  }
  const payload=()=>JSON.stringify({app:"Makete & Alati",v:window.APP_VERSION||"",savedAt:Number(get(K.chg))||Date.now(),device:dev,data:S});
  async function readRemote(g){
    const f=g.files&&g.files[FILE];if(!f)return null;
    let txt=f.content;
    if(f.truncated||!txt){const r=await fetch(f.raw_url,{cache:"no-store"});if(!r.ok)throw new Error("Preuzimanje nije uspjelo ("+r.status+")");txt=await r.text();}
    const j=JSON.parse(txt);if(!j||!j.data||typeof j.data.inventar!=="object")throw new Error("Neispravan sadržaj na GitHubu");
    return j;
  }
  function badge(st,m){
    state=st;msg=m||"";
    const ic={off:"☁️",ok:"☁️✓",up:"☁️↑",down:"☁️↓",err:"☁️⚠"}[st]||"☁️";
    let b=$("sync58Btn");
    if(!b){const bk=$("backupBtn")||document.querySelector('[onclick^="exportData"]');if(!bk)return;
      b=document.createElement("button");b.id="sync58Btn";b.className="btn-sm sync58-btn";b.onclick=()=>{openData46&&openData46();setTimeout(()=>{const s=$("sync58Sec");if(s)s.scrollIntoView({block:"center"});},80);};
      bk.parentNode.insertBefore(b,bk);}
    b.textContent=ic;b.dataset.st=st;b.title="Sinkronizacija: "+(msg||({off:"isključena – uključi u ⚙",ok:"sve je usklađeno",up:"šaljem izmjene…",down:"preuzimam izmjene…",err:"greška"})[st]);
    const info=$("sync58Info");if(info)info.innerHTML=infoHtml();
  }
  function infoHtml(){
    if(!get(K.tok))return "Isključeno.";
    const l=Number(get(K.last));
    return `${{ok:"✅",up:"⬆",down:"⬇",err:"⚠️",off:"☁️"}[state]||""} ${esc(msg||"Povezano")}${l?` · zadnje usklađivanje: ${new Date(l).toLocaleString("hr-HR",{day:"numeric",month:"numeric",hour:"2-digit",minute:"2-digit"})}`:""} · ovaj uređaj: ${dev}`;
  }
  function applyRemote(j,note){
    suppress=true;
    try{
      S=j.data;
      try{ensureCatOrder(S);}catch(e){}
      save();
      try{if(typeof render==="function")render();}catch(e){}
      try{if(typeof page!=="undefined"&&page==="makete"&&typeof renderMakete==="function")renderMakete();}catch(e){}
      try{if(typeof page!=="undefined"&&page==="redoslijed"&&window.render57)render57();}catch(e){}
    }finally{suppress=false;}
    markClean();set(K.chg,j.savedAt||Date.now());
    try{hasUnexportedChanges=false;updateBackupBadge();}catch(e){}
    showToast(note||`☁️ Preuzete izmjene s uređaja ${j.device||"?"}`);
  }
  // spajanje kod prvog povezivanja drugog uređaja: ništa se ne gubi (dodaju se stavke kojih na GitHubu nema)
  function mergeInto(remote,local){
    const byId=(a,b)=>{const ids=new Set((a||[]).map(x=>x&&x.id));(b||[]).forEach(x=>{if(x&&x.id&&!ids.has(x.id))a.push(x);});return a;};
    const R=JSON.parse(JSON.stringify(remote));
    for(const [cat,cd] of Object.entries(local.inventar||{})){
      if(!R.inventar[cat]){R.inventar[cat]=cd;if(R.catOrder&&!R.catOrder.includes(cat))R.catOrder.push(cat);continue;}
      R.inventar[cat].items=byId(R.inventar[cat].items||[],cd.items||[]);
    }
    ["zelje","makete","narudzbe","diorame","uklonjeno"].forEach(k=>{if(Array.isArray(local[k]))R[k]=byId(Array.isArray(R[k])?R[k]:[],local[k]);});
    return R;
  }

  async function findGist(){
    let id=get(K.gist);
    if(id){try{const g=await gh("/gists/"+id);if(g.files&&g.files[FILE])return g;}catch(e){if(e.auth)throw e;}}
    for(let p=1;p<=5;p++){
      const L=await gh(`/gists?per_page=100&page=${p}`);if(!L||!L.length)break;
      const hit=L.find(g=>g.files&&g.files[FILE]);
      if(hit){set(K.gist,hit.id);return await gh("/gists/"+hit.id);}
      if(L.length<100)break;
    }
    return null;
  }
  async function upload(){
    const id=get(K.gist);if(!id)return;
    badge("up");
    const g=await gh("/gists/"+id,{method:"PATCH",body:JSON.stringify({files:{[FILE]:{content:payload()}}})});
    set(K.seen,g.updated_at);markClean();set(K.last,Date.now());
    badge("ok","Usklađeno");
  }
  // glavno usklađivanje: povuci novije, pošalji svoje
  async function sync(why){
    if(!get(K.tok)||busy||!navigator.onLine)return;
    busy=true;
    try{
      let g=get(K.gist)?await gh("/gists/"+get(K.gist)).catch(e=>{if(e.auth)throw e;return null;}):null;
      if(!g||!g.files||!g.files[FILE])g=await findGist();
      if(!g){ // prvi uređaj: napravi tajni gist s trenutnim podacima
        badge("up","Prvo spremanje na GitHub…");
        const c=await gh("/gists",{method:"POST",body:JSON.stringify({description:"Makete & Alati – sinkronizacija (ne briši)",public:false,files:{[FILE]:{content:payload()}}})});
        set(K.gist,c.id);set(K.seen,c.updated_at);markClean();set(K.last,Date.now());
        badge("ok","Povezano – podaci spremljeni na GitHub");showToast("☁️ Sinkronizacija uključena");return;
      }
      const remoteNew=g.updated_at!==get(K.seen);
      const dirty=get(K.dirty)==="1";
      if(!get(K.seen)){ // ovaj uređaj se tek povezuje, a na GitHubu već ima podataka → spoji
        badge("down","Spajam podatke…");
        const j=await readRemote(g);
        const merged=mergeInto(j.data,S);
        applyRemote({...j,data:merged},"☁️ Povezano – podaci s GitHuba spojeni s ovim uređajem");
        set(K.seen,g.updated_at);await upload();return;
      }
      if(remoteNew){
        badge("down");
        const j=await readRemote(g);
        if(dirty){ // izmjene na oba uređaja: noviji pobjeđuje, stariji se čuva kao rezervna kopija
          const mine=Number(get(K.chg))||0;
          if((j.savedAt||0)>mine){try{AppStore.setItem(K.conf,JSON.stringify({at:Date.now(),data:S}));}catch(e){}
            applyRemote(j,`☁️ Na ${j.device||"drugom uređaju"} su novije izmjene – preuzete (tvoje starije su spremljene kao rezerva)`);set(K.seen,g.updated_at);set(K.last,Date.now());badge("ok","Usklađeno");return;}
          set(K.seen,g.updated_at);await upload();return;
        }
        applyRemote(j);set(K.seen,g.updated_at);set(K.last,Date.now());badge("ok","Usklađeno");return;
      }
      if(dirty){await upload();return;}
      set(K.last,Date.now());badge("ok","Usklađeno");
    }catch(e){
      console.warn("sync58",e);badge("err",e.auth?"Token ne vrijedi – unesi novi u ⚙":("Nije uspjelo: "+e.message));
    }finally{busy=false;ready=true;}
  }
  window.sync58=sync;

  // svaka izmjena → označi i pošalji za par sekundi
  const _save=window.save;
  window.save=function(){
    const r=_save.apply(this,arguments);
    if(!suppress&&ready&&get(K.tok)&&hashS()!==get(K.hash)){set(K.dirty,"1");set(K.chg,Date.now());clearTimeout(timer);badge("up","Čeka slanje…");timer=setTimeout(()=>sync("save"),4000);}
    return r;
  };
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")sync("show");else if(get(K.dirty)==="1"){clearTimeout(timer);sync("hide");}});
  window.addEventListener("online",()=>sync("online"));
  setInterval(()=>{if(document.visibilityState==="visible")sync("poll");},90*1000);

  // ⚙ Podaci → sekcija za sinkronizaciju
  function settings(){
    const m=document.querySelector("#dataModal46 .data46");if(!m||$("sync58Sec"))return;
    const sec=document.createElement("div");sec.className="data46-sec";sec.id="sync58Sec";
    sec.innerHTML=`<div class="oz-sub">☁️ Sinkronizacija računalo ↔ mobitel</div>
      <div class="ekv-hint" id="sync58Info"></div>
      <div class="data46-row" id="sync58Row"></div>
      <details class="sync58-how"><summary>Kako uključiti (jednom po uređaju)</summary>
        <ol><li>Na github.com: slika profila → <b>Settings</b> → <b>Developer settings</b> → <b>Personal access tokens</b> → <b>Tokens (classic)</b> → <b>Generate new token (classic)</b>.</li>
        <li>Note: <code>Makete</code>, Expiration: <b>No expiration</b>, označi samo kvačicu <b>gist</b> → <b>Generate token</b>.</li>
        <li>Kopiraj token (počinje s <code>ghp_</code>) i zalijepi ga ovdje → <b>Uključi</b>. Isti token zalijepi i na drugom uređaju.</li></ol>
        Podaci idu u tvoj <b>tajni</b> gist (vidiš ga na gist.github.com). Token ostaje samo na ovom uređaju. Ako koristiš oba uređaja istovremeno, vrijedi novija izmjena (starija se čuva kao rezerva).</details>`;
    const anchor=$("d46Import")&&$("d46Import").closest(".data46-sec");
    if(anchor)anchor.after(sec);else m.appendChild(sec);
    row();
  }
  function row(){
    const r=$("sync58Row");if(!r)return;
    if(get(K.tok)){
      r.innerHTML=`<button class="btn-sm" id="sync58Now">🔄 Uskladi sada</button><button class="btn-sm" id="sync58Off">Isključi na ovom uređaju</button>${get(K.conf)?`<button class="btn-sm" id="sync58Undo" title="Vrati verziju koja je prepisana kod zadnjeg sukoba">↩ Vrati rezervu</button>`:""}`;
      $("sync58Now").onclick=()=>sync("btn");
      $("sync58Off").onclick=async()=>{if(!(await customConfirm("Isključiti sinkronizaciju na ovom uređaju? Podaci ostaju, samo se više neće slati ni primati.","Sinkronizacija")))return;[K.tok,K.seen,K.dirty,K.last].forEach(k=>set(k,""));badge("off");row();};
      const u=$("sync58Undo");if(u)u.onclick=async()=>{if(!(await customConfirm("Vratiti podatke koji su bili na ovom uređaju prije zadnjeg preuzimanja? Ta verzija će se poslati i na drugi uređaj.","Rezerva")))return;try{const c=JSON.parse(AppStore.getItem(K.conf));S=c.data;save();render();set(K.conf,"");row();showToast("↩ Vraćeno");}catch(e){showToast("Rezerva nije dostupna");}};
    }else{
      r.innerHTML=`<input type="password" id="sync58Tok" placeholder="Zalijepi GitHub token (ghp_…)" autocomplete="off" style="flex:1;min-width:180px"><button class="btn-sm primary" id="sync58On">Uključi</button>`;
      $("sync58On").onclick=async()=>{const t=$("sync58Tok").value.trim();if(!/^(ghp_|github_pat_)\w{20,}/.test(t)){showToast("To ne izgleda kao GitHub token (ghp_…)");return;}
        set(K.tok,t);set(K.seen,"");set(K.dirty,"");badge("up","Povezujem…");row();
        try{await gh("/gists?per_page=1");}catch(e){set(K.tok,"");badge("err",e.message);row();showToast("⚠️ "+e.message);return;}
        await sync("setup");row();};
    }
    const info=$("sync58Info");if(info)info.innerHTML=infoHtml();
  }
  const _od=window.openData46;
  if(_od)window.openData46=function(){const r=_od.apply(this,arguments);try{settings();row();}catch(e){console.warn(e);}return r;};
  setTimeout(()=>{try{settings();}catch(e){}badge(get(K.tok)?"ok":"off",get(K.tok)?"Povezano":"");if(get(K.tok))sync("start");},2500);
})();
