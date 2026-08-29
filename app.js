const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

async function getJSON(path, fallback) {
  try {
    const r = await fetch(path, {cache:"no-store"});
    if (!r.ok) throw new Error(path);
    return await r.json();
  } catch (e) {
    return fallback;
  }
}

function el(tag, cls, html) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function card(item, kind="project") {
  const article = el("article","card");
  const media = el("div","card-media" + (item.image ? "" : " no-image"));
  if (item.image) {
    const img = new Image();
    img.src = item.image;
    img.alt = item.title || "";
    media.appendChild(img);
  }
  const body = el("div","card-body");
  const metaText = kind === "project"
    ? [item.category, item.year].filter(Boolean).join(" · ")
    : item.type || "Recurso";
  body.appendChild(el("div","meta",metaText));
  body.appendChild(el("h3","",item.title || ""));
  body.appendChild(el("p","",item.summary || item.description || ""));
  const url = kind === "project" ? item.behance_url : item.url;
  const label = kind === "project" ? "Ver caso extendido ↗" : (item.cta || "Abrir recurso ↗");
  if (url) {
    const a = el("a","card-link",label);
    a.href = url;
    if (/^https?:\/\//.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    body.appendChild(a);
  } else {
    body.appendChild(el("span","card-link small",label || "Próximamente"));
  }
  article.append(media, body);
  return article;
}

async function initSite() {
  const site = await getJSON("data/site.json", {});
  $$("[data-brand]").forEach(x => x.textContent = site.brand || "JMELENDEZBRAND");
  $$("[data-tagline]").forEach(x => x.textContent = site.tagline || "Diseña marcas con criterio");
  $$("[data-footer-note]").forEach(x => x.textContent = site.footer_note || "");
  $$("[data-about-short]").forEach(x => x.textContent = site.about_short || "");
  const heroTitle = $("[data-hero-title]");
  if (heroTitle) heroTitle.textContent = site.hero_title || "";
  const heroText = $("[data-hero-text]");
  if (heroText) heroText.textContent = site.hero_text || "";
  const heroEyebrow = $("[data-hero-eyebrow]");
  if (heroEyebrow) heroEyebrow.textContent = site.hero_eyebrow || "";
  const pcta = $("[data-primary-cta]");
  if (pcta) { pcta.textContent = site.primary_cta_label || "Empieza aquí"; pcta.href = site.primary_cta_url || "recursos.html"; }
  const scta = $("[data-secondary-cta]");
  if (scta) { scta.textContent = site.secondary_cta_label || "Ver proyectos"; scta.href = site.secondary_cta_url || "proyectos.html"; }

  const socials = [
    ["Instagram", site.instagram_url],
    ["LinkedIn", site.linkedin_url],
    ["YouTube", site.youtube_url],
    ["Behance", site.behance_url]
  ].filter(x => x[1]);
  const socialBox = $("[data-socials]");
  if (socialBox) {
    socialBox.innerHTML = "";
    socials.forEach(([label,url]) => {
      const a = el("a","",label);
      a.href=url; a.target="_blank"; a.rel="noopener";
      socialBox.appendChild(a);
    });
  }

  const hz = $$("[data-horizonte]");
  hz.forEach(a => {
    if (site.horizonte_url) {
      a.href = site.horizonte_url;
      if (/^https?:\/\//.test(site.horizonte_url)) { a.target="_blank"; a.rel="noopener"; }
    } else {
      a.href="#";
      a.addEventListener("click", e => e.preventDefault());
      a.title="Configura la URL de Horizonte desde Pages CMS";
    }
  });

  const form = $("[data-newsletter-form]");
  if (form) {
    if (site.newsletter_action) {
      form.action = site.newsletter_action;
    } else {
      form.addEventListener("submit", e => {
        e.preventDefault();
        alert("El formulario todavía no está conectado. Añade la URL de tu herramienta de email desde Pages CMS.");
      });
    }
  }

  const current = location.pathname.split("/").pop() || "index.html";
  $$(".nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });
}

async function renderProjects(targetSelector, featuredOnly=false, limit=99) {
  const box = $(targetSelector);
  if (!box) return;
  const all = await getJSON("data/projects.json", []);
  const items = all.filter(x => x.published !== false && (!featuredOnly || x.featured)).slice(0, limit);
  box.innerHTML = "";
  if (!items.length) {
    box.appendChild(el("div","empty","Los próximos casos de estudio aparecerán aquí. Podrás publicarlos desde el panel gráfico sin tocar código."));
    return;
  }
  items.forEach(x => box.appendChild(card(x,"project")));
}

async function renderResources(targetSelector, featuredOnly=false, limit=99) {
  const box = $(targetSelector);
  if (!box) return;
  const all = await getJSON("data/resources.json", []);
  const items = all.filter(x => x.published !== false && (!featuredOnly || x.featured)).slice(0, limit);
  box.innerHTML = "";
  if (!items.length) {
    box.appendChild(el("div","empty","Los recursos aparecerán aquí cuando los publiques desde Pages CMS."));
    return;
  }
  items.forEach(x => box.appendChild(card(x,"resource")));
}

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = $(".menu-btn");
  if (menuBtn) menuBtn.addEventListener("click", () => $(".nav")?.classList.toggle("open"));
  initSite();
  renderProjects("[data-projects]", false);
  renderProjects("[data-featured-projects]", true, 3);
  renderResources("[data-resources]", false);
  renderResources("[data-featured-resources]", true, 3);
  const year = $("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});
