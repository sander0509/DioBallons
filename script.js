// Portfolio-items. Nieuwe foto's: zet ze in /img en voeg hier een regel toe.
// Categorieën: verjaardag, bruiloft, babyshower, thema, frames
const PORTFOLIO = [
  { src: "img/zomer-backdrop-bankje.jpg", alt: "Organische ballonslinger in zomerse pasteltinten rond een wit bankje", cat: ["verjaardag"], w: 1206, h: 1070 },
  { src: "img/keti-koti-ballonwand.jpg", alt: "Keti Koti: ballonwand in de vorm van de Surinaamse vlag", cat: ["thema"], w: 1206, h: 1085 },
  { src: "img/babyshower-blauw-backdrop.jpg", alt: "Babyshower-backdrop in blauwtinten met cirkelframes en bloemen", cat: ["babyshower", "frames"], w: 1206, h: 1065 },
  { src: "img/valentijn-hartjes-gevel.jpg", alt: "Valentijn: ballonhartjes in rood, pink rose, wit en lichtroze tegen de gevel", cat: ["thema"], w: 1206, h: 1070 },
  { src: "img/bruiloft-ballonboog.jpg", alt: "Bruiloft: ballonboog in oranje, roze, lichtroze en parelmoer wit", cat: ["bruiloft"], w: 384, h: 327 },
  { src: "img/herfstboom-ballonkunst.jpg", alt: "Herfstboom van ballonnen in Honey Yellow, Imperial Red, Deep Teal en Purple Orchid", cat: ["thema"], w: 384, h: 455 },
  { src: "img/verjaardag-paars-happy-birthday.jpg", alt: "Happy Birthday-decoratie in paarse tinten met bloemen", cat: ["verjaardag", "frames"], w: 384, h: 327 },
  { src: "img/oranje-shirt-ballonwand.jpg", alt: "Dubbelzijdige ballonwand in de vorm van een oranje voetbalshirt", cat: ["thema"], w: 384, h: 323 },
  { src: "img/cirkelframe-blauw-paars-goud.jpg", alt: "Cirkelframe met ballonnen in blauw, koningsblauw, goud en paars", cat: ["frames"], w: 384, h: 290 },
  { src: "img/babyshower-blauw-goud.jpg", alt: "Babyshower in blauwtinten met gouden accenten", cat: ["babyshower"], w: 384, h: 327 },
  { src: "img/pasen-paashaas.jpg", alt: "Pasen: paashaas en wortel van ballonnen bij de voordeur", cat: ["thema"], w: 384, h: 327 },
  { src: "img/bruiloft-ballonpilaar.jpg", alt: "Bruiloft: ballonpilaar met reuzeballon", cat: ["bruiloft", "frames"], w: 384, h: 325 },
  { src: "img/pilaren-lichtblauw-rosegoud.jpg", alt: "Pilaren met grote ballonnen in wit, lichtblauw, roségoud en latte", cat: ["frames"], w: 384, h: 222 },
  { src: "img/wk-shirt-ballonwand.jpg", alt: "Blauw WK-shirt gemaakt van ballonnen", cat: ["thema"], w: 384, h: 324 },
  { src: "img/cirkelframe-roze-bloemen.jpg", alt: "Cirkelframe, 4-laags, afgewerkt met roze bloemen", cat: ["frames"], w: 384, h: 327 },
  { src: "img/halloween-decoratie.jpg", alt: "Halloween-decoratie met oranje en witte ballonnen en skeletten", cat: ["thema"], w: 384, h: 326 },
  { src: "img/cirkelframe-blueday.jpg", alt: "Cirkelframes in blauw, geel en oranje met zonnebloemen", cat: ["frames"], w: 384, h: 327 },
  { src: "img/pasen-ballonkruis.jpg", alt: "Pasen: wit ballonkruis met paarse doek", cat: ["thema"], w: 384, h: 327 },
  { src: "img/voetbal-ballon.jpg", alt: "Voetbal gemaakt van gele en witte ballonnen", cat: ["thema"], w: 384, h: 324 },
  { src: "img/bruiloft-locatie-avond.jpg", alt: "Bruiloftslocatie in de avond met verlichte ballonboog", cat: ["bruiloft"], w: 384, h: 318 },
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-cap");
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
    btn.setAttribute("aria-label", "Vergroot: " + item.alt);
    btn.innerHTML =
      `<img src="${item.src}" alt="${item.alt}" width="${item.w}" height="${item.h}" loading="lazy">` +
      `<span class="cap">${item.alt}</span>`;
    frag.appendChild(btn);
  });
  gallery.appendChild(frag);
  updateVisible();
}

function updateVisible() {
  visible = [...gallery.querySelectorAll(".gallery-item:not(.is-hidden)")].map((el) => +el.dataset.index);
}

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    const f = btn.dataset.filter;
    gallery.querySelectorAll(".gallery-item").forEach((el) => {
      el.classList.toggle("is-hidden", f !== "alles" && !el.dataset.cat.split(" ").includes(f));
    });
    updateVisible();
  });
});

function openLightbox(index) {
  current = visible.indexOf(index);
  showCurrent();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lb-close").focus();
}
function showCurrent() {
  const item = PORTFOLIO[visible[current]];
  lbImg.src = item.src;
  lbImg.alt = item.alt;
  lbCap.textContent = item.alt;
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  const el = gallery.querySelector(`[data-index="${visible[current]}"]`);
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
lightbox.querySelector(".lb-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lb-prev").addEventListener("click", () => step(-1));
lightbox.querySelector(".lb-next").addEventListener("click", () => step(1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

renderGallery();

// Mobiel menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Offerteformulier: opent voorlopig een ingevulde e-mail.
// Later vervangen door WhatsApp of een formulierdienst (zie TODO.md).
const OFFERTE_EMAIL = "Dioballons@outlook.com";
const form = document.getElementById("offerte-form");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstInvalid = null;
  form.querySelectorAll("[required]").forEach((el) => {
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
form.querySelectorAll("[required]").forEach((el) =>
  el.addEventListener("input", () => { el.classList.remove("is-invalid"); el.removeAttribute("aria-invalid"); })
);

// Zachte fade-in bij scrollen
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".section-head, .card, .steps li, .review, .over-grid > *, .offerte-grid > *").forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
