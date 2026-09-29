// ---------------------------------------------------------------
// Portfolio-items. Nieuwe foto's: zet ze in /img en voeg een regel toe.
// Categorieën: verjaardag, bruiloft, babyshower, thema, frames
// ---------------------------------------------------------------
const PORTFOLIO = [
  { src: "img/zomer-backdrop-bankje.jpg", title: "Zomerse aftrap", alt: "Organische ballonslinger in Caribbean Blue, Raspberry en pasteltinten rond een wit bankje", cat: ["verjaardag"], w: 1206, h: 1070 },
  { src: "img/keti-koti-ballonwand.jpg", title: "Keti Koti", alt: "Ballonwand in de vorm van de Surinaamse vlag", cat: ["thema"], w: 1206, h: 1085 },
  { src: "img/babyshower-blauw-backdrop.jpg", title: "Babyshower in blauwtinten", alt: "Backdrop met organische slinger, cirkelframes, bloemen en 'Oh Baby'-bord", cat: ["babyshower", "frames"], w: 1206, h: 1065 },
  { src: "img/valentijn-hartjes-gevel.jpg", title: "Hartjes tegen steen en raam", alt: "Valentijnsdecoratie met ballonharten in rood, pink rose, wit en lichtroze", cat: ["thema"], w: 1206, h: 1070 },
  { src: "img/bruiloft-ballonboog.jpg", title: "Trouwdag", alt: "Ballonboog in oranje, roze, lichtroze en parelmoer wit bij de entree", cat: ["bruiloft"], w: 768, h: 654 },
  { src: "img/herfstboom-ballonkunst.jpg", title: "Herfstboom", alt: "Boom van ballonnen in Honey Yellow, Imperial Red, Deep Teal en Purple Orchid", cat: ["thema"], w: 768, h: 910 },
  { src: "img/verjaardag-paars-happy-birthday.jpg", title: "Happy Birthday in paars", alt: "Ballonpilaar en frames in paarse tinten met bloemen en 'Happy Birthday'-bord", cat: ["verjaardag", "frames"], w: 768, h: 654 },
  { src: "img/oranje-shirt-ballonwand.jpg", title: "Ready for the match!", alt: "Dubbelzijdige ballonwand in de vorm van een oranje voetbalshirt", cat: ["thema"], w: 768, h: 646 },
  { src: "img/cirkelframe-blauw-paars-goud.jpg", title: "Klein maar fijn", alt: "Cirkelframe met ballonnen in blauw, koningsblauw, goud en paars", cat: ["frames"], w: 768, h: 580 },
  { src: "img/babyshower-blauw-goud.jpg", title: "Blauwe droom", alt: "Babyshower in blauwtinten met gouden accenten en bloemen", cat: ["babyshower"], w: 768, h: 654 },
  { src: "img/pasen-paashaas.jpg", title: "Welkom lieve paashaas", alt: "Paashaas en wortel van ballonnen bij de voordeur", cat: ["thema"], w: 768, h: 654 },
  { src: "img/bruiloft-ballonpilaar.jpg", title: "Pilaar met reuzeballon", alt: "Ballonpilaar in oranje, roze en wit voor een bruiloft", cat: ["bruiloft", "frames"], w: 768, h: 650 },
  { src: "img/pilaren-lichtblauw-rosegoud.jpg", title: "Soms is minder meer", alt: "Pilaren met grote ballonnen in wit, lichtblauw, roségoud en latte", cat: ["frames"], w: 768, h: 444 },
  { src: "img/wk-shirt-ballonwand.jpg", title: "Een droom mag je altijd vieren", alt: "Blauw WK-shirt gemaakt van ballonnen", cat: ["thema"], w: 768, h: 648 },
  { src: "img/cirkelframe-roze-bloemen.jpg", title: "Cirkelframe 4-laags", alt: "Cirkelframe met grote ballon, afgewerkt met roze bloemen", cat: ["frames"], w: 768, h: 654 },
  { src: "img/halloween-decoratie.jpg", title: "Welkom bij gevaar", alt: "Halloween-decoratie met oranje en witte ballonnen en skeletten", cat: ["thema"], w: 768, h: 652 },
  { src: "img/cirkelframe-blueday.jpg", title: "Beautiful blueday", alt: "Cirkelframes in blauw, geel en oranje met zonnebloemen", cat: ["frames"], w: 768, h: 654 },
  { src: "img/pasen-ballonkruis.jpg", title: "Wit voor zuiverheid", alt: "Wit ballonkruis met paarse doek voor Pasen", cat: ["thema"], w: 768, h: 654 },
  { src: "img/voetbal-ballon.jpg", title: "Voetbal van ballonnen", alt: "Voetbal gemaakt van gele en witte ballonnen", cat: ["thema"], w: 768, h: 648 },
  { src: "img/bruiloft-locatie-avond.jpg", title: "Feest op locatie", alt: "Feestlocatie in de avond met verlichte ballonboog", cat: ["bruiloft"], w: 768, h: 636 },
];
const CAT_LABEL = { verjaardag: "Verjaardag", bruiloft: "Bruiloft", babyshower: "Babyshower", thema: "Thema & feestdagen", frames: "Frames & pilaren" };

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ---------------- Portfolio + lightbox ----------------
const gallery = $("#gallery");
const lightbox = $("#lightbox");
const lbImg = $("#lb-img");
const lbCap = $("#lb-cap");
let visible = [];
let current = 0;

function renderGallery() {
  const frag = document.createDocumentFragment();
  PORTFOLIO.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-item";
    btn.dataset.cat = item.cat.join(" ");
    btn.dataset.index = i;
    btn.setAttribute("aria-label", `Vergroot: ${item.title}`);
    btn.innerHTML =
      `<img src="${item.src}" alt="${item.alt}" width="${item.w}" height="${item.h}" loading="lazy">` +
      `<span class="cap"><small>${CAT_LABEL[item.cat[0]]}</small>${item.title}</span>`;
    frag.appendChild(btn);
  });
  gallery.appendChild(frag);
  updateVisible();

  // Aantallen in de filterknoppen
  $$(".filter").forEach((b) => {
    const f = b.dataset.filter;
    const n = f === "alles" ? PORTFOLIO.length : PORTFOLIO.filter((p) => p.cat.includes(f)).length;
    b.insertAdjacentHTML("beforeend", `<span class="count">${n}</span>`);
  });
}

function updateVisible() {
  visible = $$(".gallery-item:not(.is-hidden)", gallery).map((el) => +el.dataset.index);
}

function applyFilter(f) {
  $$(".filter").forEach((b) => {
    const on = b.dataset.filter === f;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on);
  });
  $$(".gallery-item", gallery).forEach((el) => {
    const hide = f !== "alles" && !el.dataset.cat.split(" ").includes(f);
    el.classList.toggle("is-hidden", hide);
    if (!hide) { el.style.animation = "none"; el.offsetHeight; el.style.animation = ""; }
  });
  updateVisible();
}
$$(".filter").forEach((btn) => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));
$$("[data-goto]").forEach((a) => a.addEventListener("click", () => applyFilter(a.dataset.goto)));

function openLightbox(index) {
  current = visible.indexOf(index);
  showCurrent();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  $(".lb-close", lightbox).focus();
}
function showCurrent() {
  const item = PORTFOLIO[visible[current]];
  lbImg.src = item.src;
  lbImg.alt = item.alt;
  lbCap.textContent = `${item.title} · ${item.alt}`;
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  const el = $(`[data-index="${visible[current]}"]`, gallery);
  if (el) el.focus();
}
function step(d) {
  current = (current + d + visible.length) % visible.length;
  showCurrent();
}
gallery.addEventListener("click", (e) => {
  const el = e.target.closest(".gallery-item");
  if (el) openLightbox(+el.dataset.index);
});
$(".lb-close", lightbox).addEventListener("click", closeLightbox);
$(".lb-prev", lightbox).addEventListener("click", () => step(-1));
$(".lb-next", lightbox).addEventListener("click", () => step(1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
renderGallery();

// ---------------- Kleurenstudio ----------------
const COLORS = [
  { id: "white", name: "Wit", hex: "#ffffff" },
  { id: "pearl", name: "Parelmoer wit", hex: "#f3ece0" },
  { id: "latte", name: "Latte", hex: "#cfae8f" },
  { id: "rosegold", name: "Roségoud", hex: "#d9a093" },
  { id: "blush", name: "Lichtroze", hex: "#f9c9d6" },
  { id: "pink", name: "Roze", hex: "#f27aa6" },
  { id: "raspberry", name: "Raspberry", hex: "#c8175f" },
  { id: "red", name: "Imperial Red", hex: "#d12b2b" },
  { id: "orange", name: "Oranje", hex: "#f57c1f" },
  { id: "sunset", name: "Sunset Orange", hex: "#ff8f5a" },
  { id: "peach", name: "Pastel perzik", hex: "#ffc09a" },
  { id: "honey", name: "Honey Yellow", hex: "#f2b134" },
  { id: "butter", name: "Pastel Matte Yellow", hex: "#f8eba8" },
  { id: "gold", name: "Chroom goud", hex: "#c9a13b" },
  { id: "lilac", name: "Pastel Matte Lilac", hex: "#c4a9ea" },
  { id: "orchid", name: "Purple Orchid", hex: "#8e3fae" },
  { id: "babyblue", name: "Lichtblauw", hex: "#bfe1f6" },
  { id: "sky", name: "Hemelsblauw", hex: "#4cb2ea" },
  { id: "caribbean", name: "Caribbean Blue", hex: "#16a6b9" },
  { id: "teal", name: "Deep Teal", hex: "#0f6a73" },
  { id: "royal", name: "Koningsblauw", hex: "#2342b0" },
  { id: "green", name: "Groen", hex: "#1f8d4e" },
  { id: "sage", name: "Salie", hex: "#a9c3a1" },
  { id: "black", name: "Zwart", hex: "#23202a" },
];
const byId = Object.fromEntries(COLORS.map((c) => [c.id, c]));
const MAX_COLORS = 5;
let palette = ["caribbean", "raspberry", "lilac", "butter", "peach"];

const swatchWrap = $("#swatches");
COLORS.forEach((c) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "swatch";
  b.style.background = c.hex;
  b.dataset.id = c.id;
  b.title = c.name;
  b.setAttribute("aria-label", c.name);
  b.addEventListener("click", () => toggleColor(c.id));
  swatchWrap.appendChild(b);
});

// Ballontros: vaste, organische posities (x, y, r)
const cluster = $("#balloon-cluster");
const SPOTS = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pts = [];
  for (let i = 0; i < 34; i++) {
    const t = i / 33;
    const x = 200 + Math.sin(t * Math.PI * 1.7 - 0.9) * 100 + (rnd() - 0.5) * 46;
    const y = 50 + t * 320 + (rnd() - 0.5) * 26;
    pts.push([x, y, 20 + rnd() * 24]);
    const extra = 1 + Math.floor(rnd() * 2);
    for (let k = 0; k < extra; k++) pts.push([x + (rnd() - 0.5) * 80, y + (rnd() - 0.5) * 50, 8 + rnd() * 9]);
  }
  return pts.sort((a, b) => b[2] - a[2]);
})();

function drawCluster() {
  const cols = palette.length ? palette.map((id) => byId[id].hex) : ["#ffffff"];
  let s = `<defs>
    <radialGradient id="shine" cx="35%" cy="30%" r="60%"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".35" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <radialGradient id="shade" cx="50%" cy="50%" r="50%"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></radialGradient>
  </defs><g class="cluster">`;
  SPOTS.forEach(([x, y, r], i) => {
    const c = cols[i % cols.length];
    s += `<circle class="bl" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}"/>` +
         `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#shade)"/>` +
         `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#shine)"/>`;
  });
  s += "</g>";
  cluster.innerHTML = s;
}

function syncStudio() {
  $$(".swatch", swatchWrap).forEach((b) => b.classList.toggle("is-selected", palette.includes(b.dataset.id)));
  const names = palette.map((id) => byId[id].name);
  $("#studio-picked").textContent = names.length
    ? `Jouw palet: ${names.join(", ")}`
    : "Kies tot vijf kleuren.";
  $$(".preset").forEach((p) => p.classList.toggle("is-active", p.dataset.colors === palette.join(",")));
  // kleine kleurstipjes bij het formulierveld updaten we pas bij 'gebruik'
  $$("#balloon-cluster .bl").forEach((el, i) => {
    const cols = palette.length ? palette.map((id) => byId[id].hex) : ["#ffffff"];
    el.setAttribute("fill", cols[i % cols.length]);
  });
}

function toggleColor(id) {
  if (palette.includes(id)) palette = palette.filter((p) => p !== id);
  else if (palette.length < MAX_COLORS) palette = [...palette, id];
  else palette = [...palette.slice(1), id];
  syncStudio();
}
$$(".preset").forEach((p) => p.addEventListener("click", () => { palette = p.dataset.colors.split(","); syncStudio(); }));
$("#clear-palette").addEventListener("click", () => { palette = []; syncStudio(); });
$("#use-palette").addEventListener("click", () => {
  if (!palette.length) return;
  $("#kleuren").value = palette.map((id) => byId[id].name).join(", ");
  renderKleurDots(palette);
});
function renderKleurDots(ids) {
  $("#kleur-dots").innerHTML = ids.map((id) => `<i style="background:${byId[id].hex}"></i>`).join("");
  $("#kleuren").style.paddingRight = ids.length ? `${24 + ids.length * 12}px` : "";
}
$("#kleuren").addEventListener("input", () => renderKleurDots([]));
drawCluster();
syncStudio();

// ---------------- Pakketkeuze ----------------
$$("[data-package]").forEach((a) =>
  a.addEventListener("click", () => { $("#pakket").value = a.dataset.package.replace("&amp;", "&"); })
);

// ---------------- Reviews-carrousel ----------------
const track = $("#reviews-track");
const scrollByCard = (dir) => {
  const card = $(".review", track);
  track.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
};
$("#rv-prev").addEventListener("click", () => scrollByCard(-1));
$("#rv-next").addEventListener("click", () => scrollByCard(1));

// ---------------- Header, menu, knoppen ----------------
const header = $(".site-header");
const toTop = $("#to-top");
const mobileCta = $(".mobile-cta");
const hero = $(".hero");
const offerte = $("#offerte");
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 10);
  toTop.classList.toggle("is-visible", y > 900);
  const heroBottom = hero.offsetTop + hero.offsetHeight;
  const inOfferte = y + innerHeight > offerte.offsetTop + 200 && y < offerte.offsetTop + offerte.offsetHeight;
  mobileCta.classList.toggle("is-visible", y > heroBottom - 200 && !inOfferte);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const toggle = $(".nav-toggle");
const nav = $("#nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
});
$$("a", nav).forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Actieve sectie in het menu
if ("IntersectionObserver" in window) {
  const links = $$('.nav a[href^="#"]:not(.btn)');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("is-current", l.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((l) => { const s = $(l.getAttribute("href")); if (s) spy.observe(s); });
}

// ---------------- Offerteformulier ----------------
// Opent voorlopig een ingevulde e-mail. Later koppelen aan WhatsApp of een formulierdienst (zie TODO.md).
const OFFERTE_EMAIL = "Dioballons@outlook.com";
const form = $("#offerte-form");
const statusEl = $("#form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstInvalid = null;
  $$("[required]", form).forEach((el) => {
    const ok = el.type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) : el.value.trim() !== "";
    el.classList.toggle("is-invalid", !ok);
    el.setAttribute("aria-invalid", !ok);
    if (!ok && !firstInvalid) firstInvalid = el;
  });
  if (firstInvalid) {
    statusEl.textContent = "Vul de verplichte velden (*) in.";
    statusEl.className = "form-status err";
    firstInvalid.focus();
    return;
  }

  const d = new FormData(form);
  const soorten = d.getAll("soort").join(", ") || "-";
  const datum = d.get("datum") ? new Date(d.get("datum")).toLocaleDateString("nl-NL") : "-";
  const body = [
    `Naam: ${d.get("naam")}`,
    `E-mail: ${d.get("email")}`,
    `Telefoon: ${d.get("telefoon") || "-"}`,
    `Gelegenheid: ${d.get("gelegenheid")}`,
    `Datum: ${datum}`,
    `Plaats/locatie: ${d.get("plaats") || "-"}`,
    `Pakket: ${d.get("pakket") || "-"}`,
    `Soort decoratie: ${soorten}`,
    `Kleurwensen: ${d.get("kleuren") || "-"}`,
    "",
    d.get("bericht"),
  ].join("\n");
  const subject = `Offerteaanvraag: ${d.get("gelegenheid")} - ${d.get("naam")}`;
  window.location.href = `mailto:${OFFERTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  statusEl.textContent = "Je e-mailprogramma wordt geopend. Verstuur de e-mail om je aanvraag af te ronden.";
  statusEl.className = "form-status ok";
});
$$("[required]", form).forEach((el) =>
  el.addEventListener("input", () => { el.classList.remove("is-invalid"); el.removeAttribute("aria-invalid"); })
);
$("#datum").min = new Date().toISOString().slice(0, 10);

// ---------------- Animaties ----------------
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduce) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  $$(".section-head, .card, .package, .steps li, .occasion, .story, .usp, .faq-list details, .over-grid > *, .offerte-grid > *, .studio-grid > *, .cta-inner").forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

  // Tellers
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const end = +el.dataset.count;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1400);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (el.dataset.suffix || "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counter.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counter.observe(el));
}

$("#year").textContent = new Date().getFullYear();
