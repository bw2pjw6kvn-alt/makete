// ── v45: mobilna navigacija, status pohrane ─────────────────────────────
(function(){
  "use strict";
  const MAIN = [
    {p:"inventar",  i:"🧰", l:"Inventar"},
    {p:"zelje",     i:"✦",  l:"Želje"},
    {p:"makete",    i:"⬡",  l:"Makete"},
    {p:"narudzba",  i:"🧾", l:"Računi"},
  ];
  const MORE = [
    {p:"diorame",       i:"🏞️", l:"Diorame"},
    {p:"izvori",        i:"🔗", l:"Izvori"},
    {p:"oznake",        i:"🎖️", l:"Oznake"},
    {p:"ekvivalencije", i:"🎨", l:"Usporedba boja"},
    {p:"redoslijed",    i:"🧭", l:"Redoslijed izrade"},
    {p:"upute",         i:"📋", l:"Upute"},
    {p:"prirucnici",    i:"📖", l:"Priručnici"},
    {p:"knjiznica",     i:"📚", l:"Knjižnica"},
  ];
  const tabBtn = p => document.querySelector(".nav-tab.t-" + (p === "inventar" ? "inv" : p === "ekvivalencije" ? "ekv" : p));

  // donja traka
  const nav = document.createElement("nav");
  nav.className = "mnav";
  nav.setAttribute("aria-label", "Glavna navigacija");
  nav.innerHTML = MAIN.map(x => `<button data-p="${x.p}"><span class="mi">${x.i}</span>${x.l}</button>`).join("")
    + `<button data-p="__more"><span class="mi">☰</span>Više</button>`;
  document.body.appendChild(nav);

  // "Više" izbornik
  const bd = document.createElement("div"); bd.className = "mnav-backdrop";
  const sh = document.createElement("div"); sh.className = "mnav-sheet";
  sh.innerHTML = `<div class="grab"></div><h4>Ostale sekcije</h4><div class="grid">`
    + MORE.map(x => `<button data-p="${x.p}"><span class="mi">${x.i}</span>${x.l}</button>`).join("")
    + `<button data-act="data"><span class="mi">⚙</span>Podaci i backup</button><button data-act="help"><span class="mi">?</span>Pomoć</button></div>`
    + `<div class="storage-line" id="mStorageLine"></div>`;
  document.body.appendChild(bd); document.body.appendChild(sh);

  function openSheet(){ bd.classList.add("open"); sh.classList.add("open"); updateStorageLine(); }
  function closeSheet(){ bd.classList.remove("open"); sh.classList.remove("open"); }
  bd.addEventListener("click", closeSheet);

  function go(p){
    closeSheet();
    showPage(p, tabBtn(p));
    window.scrollTo({top:0});
  }
  nav.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.p === "__more"){ sh.classList.contains("open") ? closeSheet() : openSheet(); return; }
    go(b.dataset.p);
  });
  sh.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.act === "help"){ closeSheet(); openHelpModal(); return; }
    if (b.dataset.act === "data"){ closeSheet(); if (window.openData46) openData46(); return; }
    go(b.dataset.p);
  });

  function syncActive(p){
    const inMore = MORE.some(x => x.p === p);
    nav.querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.p === p || (inMore && b.dataset.p === "__more")));
    sh.querySelectorAll("button[data-p]").forEach(b => b.classList.toggle("active", b.dataset.p === p));
  }

  // omotaj showPage tako da i donja traka prati trenutnu stranicu
  const _showPage = window.showPage;
  window.showPage = function(p, btn){ const r = _showPage.apply(this, arguments); syncActive(p); return r; };
  syncActive(typeof page !== "undefined" ? page : "inventar");

  // ── status pohrane ──
  async function updateStorageLine(){
    const el = document.getElementById("mStorageLine"); if (!el) return;
    const est = await AppStore.estimate();
    const be = AppStore.backend === "idb" ? "IndexedDB" : AppStore.backend === "localStorage" ? "localStorage (stari način)" : "samo u memoriji";
    let txt = "💾 Pohrana: " + be;
    if (est && est.usage != null && est.quota){
      txt += ` · zauzeto ${(est.usage/1048576).toFixed(1)} MB od ~${Math.round(est.quota/1048576).toLocaleString("hr-HR")} MB`;
    }
    el.textContent = txt;
  }
  window.updateStorageLine = updateStorageLine;

  // IndexedDB javlja uspjeh/neuspjeh upisa (save() više ne baca grešku sinkrono)
  window.addEventListener("appstore-status", e => {
    lastSaveOk = !!e.detail.ok;
    if (!e.detail.ok) showToast("⚠️ Spremanje nije uspjelo — napravi Backup!");
    updateStorageWarningBanner();
  });
  if (AppStore.backend === "memory"){
    storageBlocked = true; lastSaveOk = false; updateStorageWarningBanner();
  }

  // prije izvoza backupa pričekaj da su svi upisi gotovi
  const _exportData = window.exportData;
  window.exportData = async function(){ await AppStore.flush(); return _exportData.apply(this, arguments); };
})();
