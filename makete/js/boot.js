// ── BOOT: trajna pohrana u IndexedDB + učitavanje aplikacije ─────────────
// Aplikacija je ranije sve držala u localStorage (≈5–10 MB). Sada se podaci
// drže u IndexedDB-u (stotine MB / GB), a aplikaciji se izlaže isto sučelje
// (getItem/setItem/removeItem) preko objekta AppStore, tako da ostatak koda
// radi kao i prije. Čitanje je sinkrono iz memorije, a upis u IDB ide odmah
// u pozadini (uzastopni upisi istog ključa se spajaju).
(function(){
  "use strict";
  const DB_NAME = "makete_app_db", STORE = "kv", DB_VER = 1;
  const MIGRATED_FLAG = "__migrated_from_localStorage";
  const APP_KEY_RE = /^ak_inv_v\d+$/;   // ključevi podataka aplikacije (v44, v10, v9…)
  const SCRIPTS = ["js/seed.js", "js/oznake-data.js", "js/app.js", "js/mobile.js", "js/links46.js", "js/oznake46.js", "js/ui46.js", "js/feat47.js", "js/prirucnici.js", "js/knjige.js", "js/lib48.js", "js/ui49.js", "js/add50.js", "js/schemes51.js", "js/diorama52.js", "js/scale53.js", "js/feat56.js", "js/steps57.js", "js/sync58.js", "js/nav59.js", "js/ral60.js", "js/trash61.js"];

  const cache = new Map();
  let db = null;
  let backend = "idb";               // "idb" | "localStorage" | "memory"
  const pending = new Map();          // ključ -> zadnja vrijednost čeka upis
  let writing = false;
  let lastError = null;

  function openDb(){
    return new Promise((resolve, reject) => {
      let req;
      try { req = indexedDB.open(DB_NAME, DB_VER); } catch(e){ reject(e); return; }
      req.onupgradeneeded = () => { req.result.createObjectStore(STORE); };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error("IndexedDB blocked"));
    });
  }
  function readAll(){
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const st = tx.objectStore(STORE);
      const out = new Map();
      const req = st.openCursor();
      req.onsuccess = () => {
        const c = req.result;
        if (c){ out.set(String(c.key), c.value); c.continue(); }
        else resolve(out);
      };
      req.onerror = () => reject(req.error);
    });
  }
  function putMany(entries){
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const st = tx.objectStore(STORE);
      for (const [k, v] of entries){
        if (v === null) st.delete(k); else st.put(v, k);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("IDB transaction aborted"));
    });
  }
  async function pump(){
    if (writing || !pending.size) return;
    writing = true;
    const batch = [...pending.entries()];
    pending.clear();
    try {
      await putMany(batch);
      if (lastError){ lastError = null; notify(true); }
    } catch(e){
      lastError = e;
      console.warn("AppStore: upis u IndexedDB nije uspio", e);
      // vrati u red (ako u međuvremenu nije stigla novija vrijednost)
      for (const [k, v] of batch) if (!pending.has(k)) pending.set(k, v);
      notify(false, e);
      writing = false;
      setTimeout(pump, 3000);
      return;
    }
    writing = false;
    if (pending.size) pump();
  }
  function notify(ok, err){
    try { window.dispatchEvent(new CustomEvent("appstore-status", {detail:{ok, error: err ? String(err && err.name || err) : null}})); } catch(e){}
  }

  const AppStore = {
    get backend(){ return backend; },
    get hasPendingWrites(){ return writing || pending.size > 0; },
    getItem(key){
      key = String(key);
      if (backend === "localStorage") return localStorage.getItem(key);
      return cache.has(key) ? cache.get(key) : null;
    },
    setItem(key, val){
      key = String(key); val = String(val);
      if (backend === "localStorage"){ localStorage.setItem(key, val); return; }
      cache.set(key, val);
      if (backend === "idb"){ pending.set(key, val); pump(); }
    },
    removeItem(key){
      key = String(key);
      if (backend === "localStorage"){ try{ localStorage.removeItem(key); }catch(e){} return; }
      cache.delete(key);
      if (backend === "idb"){ pending.set(key, null); pump(); }
    },
    // čeka da svi upisi završe (koristi se npr. prije izvoza / zatvaranja)
    async flush(){
      for (let i = 0; i < 200 && (writing || pending.size); i++){
        pump();
        await new Promise(r => setTimeout(r, 25));
      }
    },
    async estimate(){
      try { return await navigator.storage.estimate(); } catch(e){ return null; }
    },
  };
  window.AppStore = AppStore;

  // Kad se kartica skriva/zatvara, pokušaj odmah isprazniti red upisa
  const kick = () => { pump(); };
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") kick(); });
  window.addEventListener("pagehide", kick);

  function lsAvailable(){
    try { const k = "__t"; localStorage.setItem(k, "1"); localStorage.removeItem(k); return true; } catch(e){ return false; }
  }

  async function init(){
    try {
      if (!("indexedDB" in window)) throw new Error("no indexedDB");
      db = await openDb();
      const all = await readAll();
      for (const [k, v] of all) cache.set(k, v);

      // Jednokratni prijenos postojećih podataka iz localStorage (stara verzija)
      if (!cache.has(MIGRATED_FLAG)){
        const moved = [];
        try {
          for (let i = 0; i < localStorage.length; i++){
            const k = localStorage.key(i);
            if (APP_KEY_RE.test(k) && !cache.has(k)){
              const v = localStorage.getItem(k);
              if (v != null){ cache.set(k, v); moved.push([k, v]); }
            }
          }
        } catch(e){ /* localStorage blokiran — nema što prenijeti */ }
        const flagVal = JSON.stringify({at: new Date().toISOString(), keys: moved.map(m => m[0])});
        cache.set(MIGRATED_FLAG, flagVal);
        moved.push([MIGRATED_FLAG, flagVal]);
        await putMany(moved);
        if (moved.length > 1) window.__appMigratedFromLS = moved.length - 1;
        // Stari podaci u localStorage se NAMJERNO ne brišu — ostaju kao rezerva.
      }

      // Zamoli preglednik da ne briše podatke kad ponestane prostora na disku
      try {
        if (navigator.storage && navigator.storage.persist){
          const already = await navigator.storage.persisted();
          if (!already) await navigator.storage.persist();
        }
      } catch(e){}
    } catch(e){
      console.warn("AppStore: IndexedDB nije dostupan, koristim rezervni način", e);
      db = null;
      backend = lsAvailable() ? "localStorage" : "memory";
    }
  }

  function loadScripts(){
    return SCRIPTS.reduce((p, src) => p.then(() => new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src + "?v=" + (window.APP_VERSION || "");
      s.onload = resolve;
      s.onerror = () => reject(new Error("Ne mogu učitati " + src));
      document.body.appendChild(s);
    })), Promise.resolve());
  }

  function hideSplash(){
    const sp = document.getElementById("bootSplash");
    if (sp){ sp.classList.add("gone"); setTimeout(() => sp.remove(), 400); }
  }

  init()
    .then(loadScripts)
    .then(() => {
      hideSplash();
      if (window.__appMigratedFromLS && typeof showToast === "function"){
        setTimeout(() => showToast("✓ Podaci preneseni u novu, veću pohranu (IndexedDB)"), 900);
      }
      if (backend !== "idb" && typeof showToast === "function"){
        setTimeout(() => showToast("⚠️ IndexedDB nije dostupan — koristim staru pohranu preglednika"), 1200);
      }
    })
    .catch(err => {
      console.error(err);
      const sp = document.getElementById("bootSplash");
      if (sp) sp.innerHTML = '<div class="boot-err">⚠️ Aplikacija se nije uspjela pokrenuti.<br><small>' + String(err && err.message || err) + '</small></div>';
    });

  // Service worker (rad bez interneta) — samo kad je aplikacija na http(s) adresi
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)){
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(e => console.warn("SW:", e));
      // nova verzija s weba: ponudi osvježavanje
      const had = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!had || document.getElementById("upd56")) return;
        const b = document.createElement("div"); b.id = "upd56"; b.className = "bk56";
        b.innerHTML = '<span>🔄 Stigla je nova verzija aplikacije.</span><div class="bk56-b"><button class="btn-sm" onclick="location.reload()">Osvježi sada</button></div>';
        document.body.prepend(b);
      });
    });
  }
})();
