// Service worker — omogućuje rad bez interneta i instalaciju kao aplikacije.
const VERSION = "45.38.0";
const CACHE = "makete-" + VERSION;
const CORE = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "img/08a14b2158e0a3.jpg",
 "img/0a9a980db13c40.jpg",
 "img/0fdc8fcdc07436.jpg",
 "img/154444af5d60d0.jpg",
 "img/18ad0d0ec86f4c.jpg",
 "img/1bbe79d4e54695.jpg",
 "img/1f34794dd90a46.jpg",
 "img/2146db2a83d463.jpg",
 "img/23c6bad90385ed.jpg",
 "img/25c6d243fe1030.jpg",
 "img/2716c1a62a752f.jpg",
 "img/2ca2b5b9481087.jpg",
 "img/2cf9a6b3f6c865.jpg",
 "img/2e472e90b7ae72.jpg",
 "img/3357bc32fdc54a.jpg",
 "img/33f692a7b438a3.jpg",
 "img/359cce76ade4a4.jpg",
 "img/35a266d9ef9437.jpg",
 "img/372db0cf7a817a.jpg",
 "img/3812f1551abe0b.jpg",
 "img/3a13f192a8a92d.jpg",
 "img/41a80df5843738.jpg",
 "img/424ebb54ea2992.jpg",
 "img/45c42f36b7bfcb.jpg",
 "img/4626f75a7fd22d.jpg",
 "img/48c019f124ba36.jpg",
 "img/4998fdc1f5e1d7.jpg",
 "img/4a9fb25f3e3c82.jpg",
 "img/4cacf12f8e080a.jpg",
 "img/4e8ddd61a98986.jpg",
 "img/50139883045de7.jpg",
 "img/51a28b27dc02a2.jpg",
 "img/53391a3514531f.jpg",
 "img/5ed59b337f9ca6.jpg",
 "img/62daf43d1b28fc.jpg",
 "img/63799e68009fca.jpg",
 "img/63cb0805159d6f.jpg",
 "img/6ad2480e4cfc01.jpg",
 "img/6cf7805a701a3d.jpg",
 "img/70f1d3aa29d85b.jpg",
 "img/7439347e97b6d7.jpg",
 "img/79879b2d652849.jpg",
 "img/7c40f9397f314e.jpg",
 "img/7f0a75cadfe737.jpg",
 "img/804b3efc64d054.jpg",
 "img/84b2515b977f49.jpg",
 "img/84ed59fc994130.jpg",
 "img/85ac105036ddd9.jpg",
 "img/8c8d5b8652ccd3.jpg",
 "img/8e7746c2d5f949.jpg",
 "img/905448c390658d.jpg",
 "img/93ef3e5471b28a.jpg",
 "img/95212a9ea4b2b8.jpg",
 "img/9712d0a84f4c41.jpg",
 "img/9948ec8895d5d0.jpg",
 "img/9bee89bc1d2f7f.jpg",
 "img/9d935dd44e4fe3.jpg",
 "img/9f5ad4aaff43e6.jpg",
 "img/a122b5f1ad47ff.jpg",
 "img/a454ebc01c801a.jpg",
 "img/a6f8a7c45a971c.jpg",
 "img/a90dcd909ec74a.jpg",
 "img/a975ac474eccd9.jpg",
 "img/ab4717a840c774.jpg",
 "img/b1ca623bfb9021.jpg",
 "img/b4cc049b403e7f.jpg",
 "img/b5dd70be19a668.jpg",
 "img/b705d550d85070.jpg",
 "img/b7b07d9108ae73.jpg",
 "img/b84d2cb5360e7e.jpg",
 "img/bdb106415586ce.jpg",
 "img/c1955ff77a3a3d.jpg",
 "img/c1fc3c8d1db889.jpg",
 "img/c5d67dbae43fab.jpg",
 "img/c736998ab55b3f.jpg",
 "img/cc0c138353d706.jpg",
 "img/d53f637531f764.jpg",
 "img/d6f2d5a9ec8d32.jpg",
 "img/dc179edb2011cf.jpg",
 "img/dc747129d8c125.jpg",
 "img/ddf9cf4f9197ca.jpg",
 "img/de83334cc31181.jpg",
 "img/dfad98a4fd3632.jpg",
 "img/e0b4f6bf718770.jpg",
 "img/e1ea843fc81858.jpg",
 "img/ee662346b6ca62.jpg",
 "img/fdd627b04ddcc7.jpg",
 "img/logo-icon.svg",
 "img/logo.svg",
 "img/p48_223_tunis.jpg",
 "img/p48_afv.jpg",
 "img/p48_alati.jpg",
 "img/p48_ar35500.jpg",
 "img/p48_enterprise.jpg",
 "img/p48_f15e.jpg",
 "img/p48_ps35001.jpg",
 "img/p48_ps35002.jpg",
 "img/p48_vl_brojevi.jpg",
 "img/p48_vl_zastave.jpg",
 "img/p48_vrece.jpg",
 "img/p48_zica.jpg",
 "img/pr_brojevi_0a375a6f548c.jpg",
 "img/pr_brojevi_1e9ffb4897f6.jpg",
 "img/pr_brojevi_2b266fa9e5bd.jpg",
 "img/pr_brojevi_47ec2a3e5404.jpg",
 "img/pr_brojevi_51491e39491e.jpg",
 "img/pr_brojevi_530bd18ceb17.jpg",
 "img/pr_brojevi_6366cba845d4.jpg",
 "img/pr_brojevi_7c9229db1b54.jpg",
 "img/pr_brojevi_811ab3ba7f51.jpg",
 "img/pr_brojevi_89f5cd38d173.jpg",
 "img/pr_brojevi_9f110dd9e117.jpg",
 "img/pr_brojevi_ae300033409e.jpg",
 "img/pr_zastave_2a6dcbaa98d8.jpg",
 "img/pr_zastave_77358023cea0.jpg",
 "img/pr_zastave_7f0c2e016ba3.jpg",
 "img/pr_zastave_9b6a042cd0eb.jpg",
 "img/pr_zastave_d872fbb4a934.jpg",
 "img/pr_zastave_e8e50e20f5b2.jpg",
 "img/pr_zastave_efd757f85dd9.jpg",
 "img/pr_zastave_f310f04bfaaa.jpg",
 "img/pr_zastave_f7c30508acfb.jpg",
 "icons/apple-touch-icon.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "css/app.css",
 "css/mobile.css",
 "js/add50.js",
 "js/app.js",
 "js/boot.js",
 "js/diorama52.js",
 "js/feat47.js",
 "js/knjige.js",
 "js/lib48.js",
 "js/links46.js",
 "js/mobile.js",
 "js/oznake-data.js",
 "js/oznake46.js",
 "js/prirucnici.js",
 "js/scale53.js",
 "js/feat56.js",
 "js/schemes51.js",
 "js/seed.js",
 "js/ui46.js",
 "js/ui49.js",
 "js/vendor/pdf.min.js",
 "js/vendor/pdf.worker.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("makete-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // fontovi s Googlea: spremi pri prvom dohvatu, kasnije posluži iz predmemorije
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const res = await fetch(req); if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }
      catch(err){ return hit || Response.error(); }
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // oznake u visokoj rezoluciji: zasebna trajna predmemorija (ne briše se pri nadogradnji)
  if (url.pathname.includes("/img/ozhr/")){
    e.respondWith(caches.open("ozhr-v1").then(async c => {
      const hit = await c.match(req, {ignoreSearch: true});
      if (hit) return hit;
      const res = await fetch(req); if (res.ok) c.put(req, res.clone()); return res;
    }));
    return;
  }
  // vlastite datoteke: najprije predmemorija (ignoriraj ?v= parametar), zatim mreža
  e.respondWith(
    caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(res => {
      if (res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => req.mode === "navigate" ? caches.match("index.html") : Response.error()))
  );
});
