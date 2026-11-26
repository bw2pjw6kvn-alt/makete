// ── v45.26: 📏 Mjere u mjerilu (Diorame) — vrata, prozori, cigle, oprema, vozila; kalkulator i šabloni za ispis ──
(function(){
  "use strict";
  const $=id=>document.getElementById(id);
  // stvarne mjere u cm: w = širina, h = visina, d = dubina/duljina; "o" = okvirno
  const GROUPS=[
    {g:"🏠 Zgrade",items:[
      {n:"Unutarnja vrata",w:80,h:200,ic:"🚪"},
      {n:"Ulazna vrata kuće",w:90,h:210,ic:"🚪"},
      {n:"Dvokrilna vrata štale / garaže",w:240,h:220,ic:"🚪"},
      {n:"Prozor (standardni)",w:100,h:120,ic:"🪟",note:"donji rub ~90 cm od poda"},
      {n:"Mali prozor (podrum, štala)",w:60,h:40,ic:"🪟"},
      {n:"Visina kata (pod – pod)",h:300,ic:"🏢"},
      {n:"Debljina zida od cigle",w:30,ic:"🧱",note:"25–38 cm"},
      {n:"Cigla (njemački NF format)",w:24,h:7.1,d:11.5,ic:"🧱"},
      {n:"Stepenica",h:17,d:29,ic:"🪜",note:"visina × gazište"},
      {n:"Crijep (biber)",w:18,h:38,ic:"🏠"},
    ]},
    {g:"🪖 Ljudi i oprema",items:[
      {n:"Vojnik",h:180,ic:"🧍",note:"figura 1:35 ≈ 51 mm"},
      {n:"Kanistar 20 l (Wehrmachtskanister)",w:34,h:47,d:16,ic:"⛽"},
      {n:"Bačva 200 l",w:58,h:88,ic:"🛢️",note:"širina = promjer"},
      {n:"Vreća s pijeskom (puna)",w:50,h:15,d:30,ic:"🟫",o:1},
    ]},
    {g:"🌳 Okoliš",items:[
      {n:"Telegrafski stup",w:20,h:750,ic:"🪵",note:"7–8 m, promjer ~20 cm",o:1},
      {n:"Vrtna ograda (drvena)",h:120,ic:"🚧",o:1},
      {n:"Rubnik pločnika",h:15,ic:"🛣️"},
      {n:"Jedna prometna traka",w:300,ic:"🛣️",note:"3–3,5 m"},
      {n:"Željeznički kolosijek (normalni)",w:143.5,ic:"🛤️",note:"razmak tračnica"},
      {n:"Odraslo listopadno stablo",h:1500,ic:"🌳",note:"15–20 m",o:1},
    ]},
    {g:"⬡ Vozila (tlocrt na podlozi)",items:[
      {n:"Sd.Kfz.223",d:483,w:199,h:175,ic:"🚙"},
      {n:"Sd.Kfz.250/1",d:456,w:195,h:166,ic:"🚛"},
      {n:"Panzer IV Ausf. H (s topom)",d:702,w:288,h:268,ic:"🛡️"},
      {n:"StuG III Ausf. G",d:677,w:295,h:216,ic:"🛡️"},
      {n:"Tiger I (s topom)",d:845,w:356,h:300,ic:"🛡️"},
    ]},
  ];
  const SCALES=[["1:35",35],["1:48",48],["1:72",72],["1:16",16],["1:24",24],["1:76",76],["1:100",100]];
  let sc=35;
  const mm=cm=>{if(cm==null)return "";const v=cm*10/sc;return v.toFixed(v<100?1:0).replace(".",",");};
  const fmtCm=cm=>cm==null?"":(cm>=100?(cm/100).toFixed(cm%100?2:0).replace(".",",")+" m":String(cm).replace(".",",")+" cm");
  const dims=x=>[x.w!=null?"š":"",x.h!=null?"v":"",x.d!=null?"d":""].filter(Boolean);

  window.openScale53=function(){
    let ov=$("scale53");if(ov)ov.remove();
    ov=document.createElement("div");ov.id="scale53";ov.className="modal-overlay";
    ov.innerHTML=`<div class="modal f47" style="max-width:860px;width:96%"><h3>📏 Mjere u mjerilu</h3>
      <div class="sc53-bar"><label>Mjerilo</label><select id="sc53S">${SCALES.map(([l,v])=>`<option value="${v}"${v===sc?" selected":""}>${l}</option>`).join("")}</select>
        <button class="btn-sm" onclick="print53()">🖨 Šabloni za ispis</button></div>
      <div class="sc53-calc"><b>🧮 Kalkulator</b>
        <span>stvarno <input id="sc53R" inputmode="decimal" placeholder="npr. 2,10"><select id="sc53U"><option value="100">m</option><option value="1" selected>cm</option></select></span>
        <span>→ u mjerilu <b id="sc53Out">–</b></span>
        <span class="sc53-or">ili</span>
        <span>u mjerilu <input id="sc53M" inputmode="decimal" placeholder="mm"> mm → stvarno <b id="sc53Back">–</b></span></div>
      <div id="sc53Svg"></div>
      <div id="sc53Tab"></div>
      <div class="ekv-hint" style="margin-top:8px">Mjere su tipične/okvirne (posebno one označene ~) — za konkretnu zgradu ili vozilo provjeri referencu. Vozila: duljina × širina × visina.</div>
      <div class="modal-btns"><button class="btn-secondary" onclick="document.getElementById('scale53').remove()">Zatvori</button></div></div>`;
    ov.addEventListener("click",e=>{if(e.target===ov)ov.remove();});document.body.appendChild(ov);ov.style.display="flex";
    $("sc53S").onchange=e=>{sc=+e.target.value;draw();calc();calcBack();};
    $("sc53R").oninput=calc;$("sc53U").onchange=calc;$("sc53M").oninput=calcBack;
    draw();
  };
  const num=s=>parseFloat(String(s||"").replace(",","."));
  function calc(){const v=num($("sc53R").value),u=+$("sc53U").value;$("sc53Out").textContent=isFinite(v)?mm(v*u)+" mm":"–";}
  function calcBack(){const v=num($("sc53M").value);$("sc53Back").textContent=isFinite(v)?fmtCm(Math.round(v*sc/10*10)/10):"–";}
  function draw(){
    // usporedni crtež: figura, vrata, prozor, kanistar, bačva i vreće u istom omjeru
    const H=250,k=H/260;   // px po cm (crtež do ~2,6 m visine)
    const objs=[
      {n:"Vojnik",w:46,h:180,kind:"fig"},
      {n:"Vrata 90×210",w:90,h:210,kind:"door"},
      {n:"Prozor 100×120",w:100,h:120,y:90,kind:"win"},
      {n:"Kanistar",w:34,h:47,kind:"box"},
      {n:"Bačva",w:58,h:88,kind:"barrel"},
      {n:"Vreće",w:100,h:45,kind:"bags"},
    ];
    let x=10;const parts=[];
    objs.forEach(o=>{
      const w=o.w*k,h=o.h*k,y0=H-(o.y||0)*k;const top=y0-h;
      let g="";
      if(o.kind==="fig")g=`<circle cx="${x+w/2}" cy="${top+11*k}" r="${11*k}" class="s53f"/><rect x="${x+w*0.18}" y="${top+22*k}" width="${w*0.64}" height="${h-22*k-80*k}" rx="4" class="s53f"/><rect x="${x+w*0.22}" y="${H-82*k}" width="${w*0.24}" height="${82*k}" class="s53f"/><rect x="${x+w*0.54}" y="${H-82*k}" width="${w*0.24}" height="${82*k}" class="s53f"/>`;
      else if(o.kind==="door")g=`<rect x="${x}" y="${top}" width="${w}" height="${h}" class="s53d"/><rect x="${x+w*0.12}" y="${top+h*0.08}" width="${w*0.76}" height="${h*0.36}" class="s53l"/><rect x="${x+w*0.12}" y="${top+h*0.52}" width="${w*0.76}" height="${h*0.4}" class="s53l"/><circle cx="${x+w*0.82}" cy="${top+h*0.5}" r="3" class="s53k"/>`;
      else if(o.kind==="win")g=`<line x1="${x-4}" y1="${H}" x2="${x-4}" y2="${y0}" class="s53dim"/><text x="${x-6}" y="${H-(o.y*k)/2}" class="s53t" text-anchor="end">90</text><rect x="${x}" y="${top}" width="${w}" height="${h}" class="s53w"/><line x1="${x+w/2}" y1="${top}" x2="${x+w/2}" y2="${y0}" class="s53l"/><line x1="${x}" y1="${top+h*0.35}" x2="${x+w}" y2="${top+h*0.35}" class="s53l"/>`;
      else if(o.kind==="barrel")g=`<rect x="${x}" y="${top}" width="${w}" height="${h}" rx="6" class="s53b"/><line x1="${x}" y1="${top+h*0.33}" x2="${x+w}" y2="${top+h*0.33}" class="s53l"/><line x1="${x}" y1="${top+h*0.66}" x2="${x+w}" y2="${top+h*0.66}" class="s53l"/>`;
      else if(o.kind==="box")g=`<rect x="${x}" y="${top}" width="${w}" height="${h}" rx="3" class="s53b"/><path d="M${x+w*0.2} ${top+h*0.25} L${x+w*0.8} ${top+h*0.75} M${x+w*0.8} ${top+h*0.25} L${x+w*0.2} ${top+h*0.75}" class="s53l"/>`;
      else if(o.kind==="bags")g=[0,1,2].map(r=>[0,1].map(c=>`<rect x="${x+c*50*k+(r%2)*25*k}" y="${H-(r+1)*15*k}" width="${48*k}" height="${14*k}" rx="5" class="s53s"/>`).join("")).join("");
      else if(o.kind==="car")g=`<path d="M${x} ${H-40*k} L${x+40*k} ${H-120*k} L${x+330*k} ${H-125*k} L${x+w} ${H-70*k} L${x+w} ${H-40*k} Z" class="s53c"/><rect x="${x+150*k}" y="${H-160*k}" width="${120*k}" height="${38*k}" class="s53c"/><path d="M${x+120*k} ${H-160*k} L${x+210*k} ${top} L${x+300*k} ${H-160*k}" class="s53l" fill="none"/><circle cx="${x+90*k}" cy="${H-38*k}" r="${38*k}" class="s53k"/><circle cx="${x+380*k}" cy="${H-38*k}" r="${38*k}" class="s53k"/>`;
      parts.push(`<g>${g}<text x="${x+w/2}" y="${H+16}" class="s53t" text-anchor="middle">${o.n}</text><text x="${x+w/2}" y="${top-6}" class="s53t s53mm" text-anchor="middle">${mm(o.h)} mm</text></g>`);
      x+=w+22;
    });
    $("sc53Svg").innerHTML=`<div class="sc53-svgwrap"><svg viewBox="0 0 ${x} ${H+24}" width="100%" style="max-height:300px" role="img" aria-label="Usporedba veličina">
      <line x1="0" y1="${H}" x2="${x}" y2="${H}" class="s53g"/>${parts.join("")}</svg>
      <div class="ekv-hint">Sve je u istom omjeru; iznad svakog predmeta je njegova visina u mjerilu 1:${sc}.</div></div>`;
    $("sc53Tab").innerHTML=GROUPS.map(G=>`<div class="oz-sub">${G.g}</div><div class="sc53-tab">${G.items.map(x=>{
      const real=[x.d!=null&&G.g.startsWith("⬡")?fmtCm(x.d):null,x.w!=null?fmtCm(x.w):null,x.h!=null?fmtCm(x.h):null,x.d!=null&&!G.g.startsWith("⬡")?fmtCm(x.d):null].filter(Boolean).join(" × ");
      const sm=[x.d!=null&&G.g.startsWith("⬡")?mm(x.d):null,x.w!=null?mm(x.w):null,x.h!=null?mm(x.h):null,x.d!=null&&!G.g.startsWith("⬡")?mm(x.d):null].filter(Boolean).join(" × ");
      return `<div class="sc53-row"><span class="sc53-ic">${x.ic}</span><span class="sc53-n">${x.n}${x.o?" ~":""}${x.note?`<small>${x.note}</small>`:""}</span><span class="sc53-r">${real}</span><span class="sc53-m"><b>${sm} mm</b></span></div>`;}).join("")}</div>`).join("");
  }
  // šabloni u stvarnoj veličini za ispis (CSS mm = točno pri ispisu na 100 %)
  window.print53=function(){
    const sel=[["Unutarnja vrata",80,200],["Ulazna vrata",90,210],["Vrata štale / garaže",240,220],["Prozor",100,120],["Mali prozor",60,40],["Vojnik 1,80 m",46,180],["Kanistar 20 l",34,47],["Bačva 200 l",58,88]];
    const r=v=>(v*10/sc).toFixed(1);
    const boxes=sel.map(([n,w,h])=>`<div class="b"><div class="r" style="width:${r(w)}mm;height:${r(h)}mm"></div><div class="c">${n}<br>${r(w).replace(".",",")} × ${r(h).replace(".",",")} mm</div></div>`).join("");
    const bricks=Array.from({length:6},(_,i)=>`<div style="display:flex;margin-left:${i%2?r(12):0}mm">${Array.from({length:12},()=>`<div style="width:${r(24)}mm;height:${r(7.1)}mm;border:0.15mm solid #555;box-sizing:border-box"></div>`).join("")}</div>`).join("");
    const steps=Array.from({length:8},(_,i)=>`<div style="position:absolute;left:${(i*29*10/sc).toFixed(2)}mm;bottom:${(i*17*10/sc).toFixed(2)}mm;width:${r(29)}mm;height:${r(17)}mm;border:0.2mm solid #333;box-sizing:border-box"></div>`).join("");
    const ruler=Array.from({length:101},(_,i)=>`<div style="position:absolute;left:${i}mm;bottom:0;width:0.15mm;height:${i%10?(i%5?2:3.5):5}mm;background:#000"></div>${i%10?"":`<div style="position:absolute;left:${i-1}mm;bottom:5.5mm;font-size:2.6mm">${i}</div>`}`).join("");
    const w=window.open("","_blank");if(!w){alert("Preglednik je blokirao novi prozor.");return;}
    w.document.write(`<!DOCTYPE html><html lang="hr"><head><meta charset="UTF-8"><title>Šabloni 1:${sc} – Makete & Alati</title><style>
      body{font-family:Arial,sans-serif;color:#111;margin:10mm}h1{font-size:5mm;margin:0 0 2mm}p{font-size:3.2mm;margin:0 0 4mm;color:#444}
      .g{display:flex;flex-wrap:wrap;gap:6mm;align-items:flex-end}.b{display:flex;flex-direction:column;align-items:center}.r{border:0.3mm solid #000;box-sizing:border-box}.c{font-size:2.8mm;text-align:center;margin-top:1mm}
      h2{font-size:4mm;margin:7mm 0 2mm}@page{size:A4;margin:8mm}</style></head><body>
      <h1>Šabloni u mjerilu 1:${sc}</h1><p>Ispiši na <b>100 % (stvarna veličina)</b>, bez „prilagodi stranici”. Provjeri ravnalo: 0–100 mm mora biti točno 10 cm.</p>
      <div style="position:relative;height:9mm;width:101mm;border-bottom:0.2mm solid #000;margin-bottom:6mm">${ruler}</div>
      <div class="g">${boxes}</div>
      <h2>Zid od cigle (NF 24 × 11,5 × 7,1 cm, polovični vez)</h2><div>${bricks}</div>
      <h2>Stepenice (17 × 29 cm)</h2><div style="position:relative;height:${(8*17*10/sc+1).toFixed(1)}mm;width:${(8*29*10/sc+1).toFixed(1)}mm">${steps}</div>
      <script>setTimeout(()=>print(),400)<\/script></body></html>`);
    w.document.close();
  };
  // gumb na stranici Diorame
  (function btn(){
    const hdr=document.querySelector("#page-diorame .section-hdr");if(!hdr||$("sc53Btn"))return;
    const b=document.createElement("button");b.className="btn-sm qa50-btn";b.id="sc53Btn";b.textContent="📏 Mjere u mjerilu";b.onclick=()=>openScale53();
    hdr.insertBefore(b,hdr.children[2]||null);
  })();
})();
