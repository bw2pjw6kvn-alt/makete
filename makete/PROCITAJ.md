# Makete & Alati

## Što je novo u odnosu na v44
- **Nema više ograničenja od ~5 MB.** Podaci se spremaju u IndexedDB (stotine MB), pa slike više ne pune memoriju.
- **Automatski prijenos podataka.** Kad prvi put otvoriš v45 u **istom pregledniku** u kojem si koristio v44, podaci se sami prenesu. Stari podaci ostaju netaknuti kao rezerva.
- **Lakša aplikacija.** Umjesto jedne datoteke od 11 MB sada je to mapa: slike su u `img/`, kod u `js/`, a stil u `css/`.
- **Prilagođena mobitelu.** Na mobitelu je navigacija dolje (Inventar, Želje, Makete, Računi, Više), a prozori se otvaraju preko cijelog ekrana.
- **Instalira se kao aplikacija i radi bez interneta.** To radi kad je aplikacija postavljena na web adresu (vidi dolje).

## Pokretanje na računalu
Otvori `index.html` (dvoklik). Sve radi kao i prije, a pohrana je sada veća.

> Prije prvog otvaranja v45 napravi **⬇ Backup** u staroj v44. Ako se podaci ne prenesu sami (npr. zbog drugog preglednika), u v45 klikni **⬆ Uvezi JSON** i odaberi taj backup.

## Instalacija na mobitel (preporučeno)
Mobitel ne može otvoriti mapu s datotekama kao aplikaciju, pa je treba postaviti na besplatnu web adresu:

1. Otvori **https://app.netlify.com/drop** i povuci cijelu mapu `Makete-i-Alati` u prozor. Za trajni link napravi besplatan račun.
2. Otvori dobiveni link na mobitelu:
   - **Android (Chrome):** izbornik ⋮ → *Instaliraj aplikaciju*.
   - **iPhone (Safari):** Dijeli → *Dodaj na početni zaslon*.
3. U aplikaciji na mobitelu klikni **⬆ Uvezi JSON** i učitaj backup s računala.

Nakon toga aplikacija radi i bez interneta.

Napomena: podaci na računalu i na mobitelu su odvojeni. Za prijenos koristi **⬇ Backup** i **⬆ Uvezi JSON**.

Druga mogućnost je GitHub Pages: napravi repozitorij, učitaj sadržaj mape i uključi Pages.

## Ažuriranje na novu verziju
Na webu zamijeni datoteke novom verzijom (na Netlifyju napraviš novi deploy). Aplikacija na mobitelu sama preuzme novu verziju pri sljedećem otvaranju s internetom, a podaci ostaju.

## Novo u 45.14
- **🔎 Imam li?** (gore desno / na mobitelu u donjoj traci): upiši šifru ili naziv i odmah vidiš imaš li to. Na Androidu 📷 skenira barkod, a nepoznati barkod možeš jednom povezati s proizvodom.
- **🧰 Provjera faze** (na kartici makete): jesi li spreman za sljedeći korak, kvačice za stvari koje si stavio na stol, boje koje nedostaju (✦ Sve u Želje), tvoji recepti za taj korak i gumb „✓ Korak gotov”.
- **📸 Napredak**: fotografije po fazama, usporedba prije i poslije, bilješke. Spremaju se u backup.
- **🧪 Recepti**: faza i postavke airbrusha, šifre se same povezuju s Inventarom, a recept se može kopirati na drugu maketu ili uzeti s nje.
- **🌐 Scalemates**: traži kit; kad spremiš poveznicu (✎ Uredi), gumb otvara izravno stranicu kita.

## Novo u 45.15
- **Oznake u HD rezoluciji:** 240 od 247 oznaka sada ima originalnu sliku iz knjige (do 2000 px). Pri otvaranju oznake najprije se prikaže mala slika, a zatim se zamijeni HD verzijom (oznaka **HD** zasvijetli zeleno). Zum je sad oštar.
- HD slike se ne spremaju unaprijed (oko 73 MB). Učitavaju se kad ih otvoriš, a u ⚙ Podaci → „📥 Spremi HD oznake za offline” spremiš sve odjednom.
- Mat lak iz kompleta DAK sada ima ispravnu šifru 71.520.

## Novo u 45.31
- Želje: uklonjena oznaka prioriteta (stupac, sažetak, obrazac i lista za kupovinu; lista se sada slaže po kategoriji).

## Novo u 45.30
- Želje: provjerene i ispravljene kategorije (kitovi → „Makete (kitovi)”, gusjenice i vitrine → „Dodaci i pribor za makete”, AMMO teren → Teren i diorama, prazne kategorije popunjene). Nove kategorije za Želje: „Makete (kitovi)” i „Dodaci i pribor za makete”; kategorija se sama predloži po šifri i nazivu.

## Novo u 45.29
- Želje: gumb ✎ uz svaku želju za ispravak (kategorija, šifra, naziv, opis, cijena, prioritet, bilješka).

## Novo u 45.28
- Mjere u mjerilu: iz usporednog crteža uklonjen Sd.Kfz.223.

## Novo u 45.27
- Mjere u mjerilu: vojnik 1,80 m (1:35 ≈ 51,4 mm).

## Novo u 45.26
- Diorame → 📏 Mjere u mjerilu: vrata, prozori, visina kata, cigla, stepenice, crijep, vojnik, kanistar, bačva, vreće, ograda, stup, cesta, kolosijek i tvoja vozila u mjerilu 1:35 (ili 1:48, 1:72…), usporedni crtež, kalkulator (stvarno ↔ mm) i šabloni u stvarnoj veličini za ispis.

## Novo u 45.25
- Diorame → 🧰 Proizvodi → Nedostaje: gumb „✓ Imam” dodaje nabavljenu stvar u Inventar (✓ imam), na popis proizvoda diorame i miče je sa Želja.

## Novo u 45.24
- 🏞️ Diorame (nova sekcija uz Makete; na mobitelu ☰ Više): 14 faza izrade od plana do završnog laka, popis proizvoda iz Inventara s prijedlogom po temi terena (pustinja, Europa, blato, zima, ruševine, voda), popis onoga što nedostaje (jednim klikom u Želje), makete u diorami, 📸 napredak i 🖼 reference.

## Novo u 45.23
- 🎨 Shema bojanja po modelu: svaka maketa dobiva sheme za svoj model (npr. Tiger I Tunis/Lenjingrad/Kursk/zima, Sd.Kfz.223 DAK 1941 i 1942–43, Bradley OIF/NATO…), s oznakom koliko boja već imaš. Sheme se biraju i u 🛠️ Planu radova.

## Novo u 45.22
- ⚡ Brzi unos (Inventar): upišeš šifru, a proizvođač, rubrika, naziv i boja popune se sami; upozorava ako već imaš.
- 🧾 Unos narudžbe (Inventar i Računi): odabereš PDF računa s makete.eu ili zalijepiš tekst, pa se stavke, cijene i Račun unesu odjednom.
- Želje su samo popis želja: nema više „✓ kupljeno” ni „🧾”, a svaka nova želja uspoređuje se s Inventarom, Maketama i Željama.

## Novo u 45.21
- Provjera Inventara: 71.520 Mat Varnish vraćen u DAK komplet, AMMO Europe Earth set premješten u Pigmente, uklonjeno 5 dvostrukih unosa, ispravljene šifre i nazivi.

## Novo u 45.20
- Dvije nove teme: DAK (tamna pješčana) i DAK svijetla (Sandgelb).

## Novo u 45.19
- Inventar: gumbi „⊟ Zatvori sve” i „⊞ Otvori sve” za rubrike (stanje se pamti).
- ⚙ Podaci → 🎨 Izgled: teme Grafit, Feldgrau, Pustinja (DAK), Mornarica i Dnevna.

## Novo u 45.18
- Academy A.F.V. Miniature Accessories premješten je iz Inventara u Makete.

## Novo u 45.17
- Setovi za dioramu (žica i prepreke, vreće s pijeskom, alati) premješteni su iz Inventara u Makete.

## Novo u 45.16
- **📖 Priručnici** (Znanje): Kratki savjet iz maketarstva, Taktički brojevi i Signalne zastave, sa slikama. Rade bez interneta.
- **⏱ Vremena čekanja** iz Kratkog savjeta prikazuju se u Provjeri faze i nakon „✓ Sljedeći korak”.
- **📚 Knjižnica** (Znanje): 99 knjiga po mapama s hrvatskim nazivima i oznakom 🇭🇷 za prijevode, plus filter po vozilu. 📋 kopira putanju datoteke. Na kartici makete gumb „📚 Knjige (N)” prikazuje knjige za to vozilo.
- **🖼 Reference** na kartici makete: vlastite referentne slike. Sd.Kfz.223 već ima fotografiju iz Tunisa 1943. i DAK dekale.
- Nova rubrika **Dekali i dodaci** te makete USS Enterprise CV-6 i F-15E Strike Eagle.

## Novo u 45.37
- **Zamjenske boje:** u 🎨 Shemi bojanja, kod svake boje koju nemaš, prikazuje se najsličnija boja iz tvog inventara (AK, Real Colors, Vallejo, flomasteri) s ocjenom „vrlo slična / slična / približna”. Na kartici makete ispod sheme je kratki popis zamjena.
- **Podsjetnik za backup:** ako backup nije napravljen 7 dana, na vrhu se pojavi obavijest s gumbom „💾 Backup sada” (ili „Podsjeti me sutra”). Računa se i ručni i automatski backup. Datum zadnjeg backupa vidi se kad zadržiš miš na gumbu Backup.
