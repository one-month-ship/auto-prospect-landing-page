// Tracking publicitaire (Meta Pixel + Google tag) soumis au consentement.
//
// Règles :
// - Aucun script tiers n'est chargé tant que l'utilisateur n'a pas cliqué « Accepter ».
// - Un pixel dont l'ID est absent de l'env n'est jamais chargé (permet d'activer
//   Meta et/ou Google indépendamment).
// - Le choix est mémorisé 6 mois (durée max recommandée par la CNIL), puis redemandé.
// - Les paramètres d'attribution (utm_*, fbclid, gclid) sont conservés le temps de la
//   session et transmis dans l'URL des CTA vers l'app, pour que l'inscription/paiement
//   côté app puisse être rattaché à la campagne d'origine.

const META_PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined;
const GOOGLE_TAG_ID = import.meta.env.PUBLIC_GOOGLE_TAG_ID as string | undefined;

const CONSENT_KEY = "ap_consent";
const CONSENT_TTL_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 mois
const ATTRIBUTION_KEY = "ap_attribution";
// Paramètres d'attribution ajoutés par nos soins (pas présents dans l'URL d'arrivée) :
// ils décrivent la page par laquelle le visiteur est entré, y compris en organique.
// Sans eux, une arrivée depuis Google ou une IA ne laisse aucune trace de l'article lu.
const ORGANIC_PARAMS = ["ap_landing", "ap_referrer"];
const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  ...ORGANIC_PARAMS,
];

export type Consent = "granted" | "denied";

// Événements marketing suivis sur la landing. Le mapping vers les noms standards
// Meta / Google est centralisé ici pour que les composants n'aient qu'un nom à connaître.
export type TrackingEvent =
  | "cta_click" // clic sur un bouton « Essai gratuit » (départ vers l'app)
  | "contact_form" // formulaire de contact envoyé
  | "demo_scheduled" // RDV Calendly confirmé
  | "article_view"; // lecture d'un article de blog (base des audiences de retargeting)

const META_EVENTS: Record<TrackingEvent, { name: string; custom: boolean }> = {
  cta_click: { name: "CTAClick", custom: true },
  contact_form: { name: "Lead", custom: false },
  demo_scheduled: { name: "Schedule", custom: false },
  // ViewContent est un événement standard : il alimente les audiences personnalisées
  // « a consulté tel contenu » dans Meta, ce qu'un événement custom ne permet pas
  // de faire aussi simplement.
  article_view: { name: "ViewContent", custom: false },
};

const GOOGLE_EVENTS: Record<TrackingEvent, string> = {
  cta_click: "cta_click",
  contact_form: "generate_lead",
  demo_scheduled: "schedule_demo",
  article_view: "view_item",
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function safeStorage(storage: () => Storage): Storage | null {
  try {
    return storage();
  } catch {
    return null; // navigation privée / stockage bloqué
  }
}

/* ---------- Consentement ---------- */

export function getConsent(): Consent | null {
  const ls = safeStorage(() => localStorage);
  const raw = ls?.getItem(CONSENT_KEY);
  if (!raw) return null;
  try {
    const { value, at } = JSON.parse(raw) as { value: Consent; at: number };
    if (Date.now() - at > CONSENT_TTL_MS) return null;
    return value;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  safeStorage(() => localStorage)?.setItem(
    CONSENT_KEY,
    JSON.stringify({ value, at: Date.now() }),
  );
  if (value === "granted") loadPixels();
}

export function clearConsent() {
  safeStorage(() => localStorage)?.removeItem(CONSENT_KEY);
}

export const hasAnyPixel = Boolean(META_PIXEL_ID || GOOGLE_TAG_ID);

/* ---------- Chargement des pixels ---------- */

let pixelsLoaded = false;

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadMetaPixel(id: string) {
  // Équivalent du snippet officiel, sans eval ni code minifié
  const fbq: any = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  loadScript("https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", id);
  // PageView enrichi du contexte de page : c'est sur ces paramètres que se
  // construisent les audiences de retargeting (« a visité un article de blog »).
  fbq("track", "PageView", pageContext());
}

function loadGoogleTag(id: string) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Consent Mode v2 : on ne charge le tag qu'après acceptation, donc tout est accordé
  window.gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", id);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
}

export function loadPixels() {
  if (pixelsLoaded || typeof window === "undefined") return;
  if (getConsent() !== "granted") return;
  pixelsLoaded = true;
  if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);
  if (GOOGLE_TAG_ID) loadGoogleTag(GOOGLE_TAG_ID);
}

/* ---------- Contexte de page ---------- */

// Type de page déduit du chemin. Sert à segmenter les audiences Meta : un lecteur
// d'article n'a pas la même intention qu'un visiteur de la page tarifs.
export function pageType(pathname?: string): string {
  pathname ??= typeof window === "undefined" ? "/" : window.location.pathname;
  if (pathname === "/blog" || pathname === "/blog/") return "blog_index";
  if (pathname.startsWith("/blog/")) return "article";
  if (pathname.startsWith("/fonctionnalites")) return "fonctionnalites";
  if (pathname.startsWith("/solutions")) return "solutions";
  if (pathname === "/tarifs") return "tarifs";
  if (pathname === "/") return "home";
  return "autre";
}

// Identifiant court et stable d'une page, dérivé de son chemin (« /blog/x » -> « blog-x »).
// Il est calculé plutôt que saisi à la main dans chaque page : un composant partagé
// comme la navbar ou le CTA de bas de page vit sur des dizaines de pages, et un
// data-cta écrit en dur y produirait un seul et même identifiant pour toutes.
export function pageSlug(pathname?: string): string {
  pathname ??= typeof window === "undefined" ? "/" : window.location.pathname;
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  return clean === "" ? "home" : clean.replace(/\//g, "-");
}

// Chemin de la page courante. Le <link rel="canonical"> est rendu par le serveur
// pour la page réellement servie ; il est préféré à window.location, qui peut
// pointer ailleurs (page chargée dans une iframe, URL réécrite par un proxy).
function currentPath(): string {
  const canonical = document
    .querySelector<HTMLLinkElement>('link[rel="canonical"]')
    ?.getAttribute("href");
  if (canonical) {
    try {
      return normalizePath(new URL(canonical, window.location.origin).pathname);
    } catch {
      // canonical malformé : on retombe sur l'URL du navigateur
    }
  }
  return normalizePath(window.location.pathname);
}

// Un même contenu est servi avec ou sans slash final selon la source du chemin
// (canonical, URL du navigateur). Sans normalisation, « /tarifs » et « /tarifs/ »
// seraient deux identifiants d'audience distincts pour la même page.
function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

// Paramètres joints à chaque événement envoyé aux pixels.
function pageContext(): Record<string, string> {
  const path = currentPath();
  return {
    content_type: pageType(path),
    content_name: document.title,
    page_path: path,
  };
}

/* ---------- Événements ---------- */

export function track(event: TrackingEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !pixelsLoaded) return;
  params = { ...pageContext(), ...params };
  if (window.fbq) {
    const meta = META_EVENTS[event];
    window.fbq(meta.custom ? "trackCustom" : "track", meta.name, params);
  }
  if (window.gtag) {
    window.gtag("event", GOOGLE_EVENTS[event], params);
  }
}

/* ---------- Attribution (UTM / fbclid / gclid) ---------- */

// À appeler au chargement de chaque page : mémorise les paramètres de campagne
// présents dans l'URL d'arrivée (les pages suivantes ne les ont plus).
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const ss = safeStorage(() => sessionStorage);
  if (!ss) return;
  const url = new URL(window.location.href);
  const found: Record<string, string> = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const v = url.searchParams.get(key);
    if (v) found[key] = v;
  }
  // Arrivée organique (Google, IA, lien direct) : aucun paramètre de campagne dans
  // l'URL. On mémorise alors la page d'entrée et le domaine référent, sans quoi
  // l'inscription qui suivra serait indistinguable d'une arrivée directe.
  // Premier contact gagnant : une attribution déjà en session n'est pas écrasée.
  if (Object.keys(found).length === 0) {
    if (ss.getItem(ATTRIBUTION_KEY)) return;
    found.ap_landing = url.pathname;
    const referrerHost = safeReferrerHost();
    if (referrerHost) found.ap_referrer = referrerHost;
  }

  ss.setItem(ATTRIBUTION_KEY, JSON.stringify(found));
}

// Domaine du référent uniquement : l'URL complète pourrait contenir les termes de
// recherche de l'utilisateur, qu'on n'a aucune raison de transporter.
function safeReferrerHost(): string | null {
  if (!document.referrer) return null;
  try {
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? null : host;
  } catch {
    return null;
  }
}

export function getAttribution(): Record<string, string> {
  const raw = safeStorage(() => sessionStorage)?.getItem(ATTRIBUTION_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// Ajoute les paramètres d'attribution à une URL (typiquement celle de l'app)
export function withAttribution(href: string): string {
  const attribution = getAttribution();
  if (Object.keys(attribution).length === 0) return href;
  try {
    const url = new URL(href, window.location.origin);
    for (const [k, v] of Object.entries(attribution)) {
      if (!url.searchParams.has(k)) url.searchParams.set(k, v);
    }
    return url.toString();
  } catch {
    return href;
  }
}

/* ---------- Initialisation globale (appelée une fois par page) ---------- */

export function initTracking() {
  captureAttribution();
  loadPixels();

  // Vue d'article : l'événement qui rend le retargeting possible. Meta ne peut
  // cibler « les lecteurs de cet article » que s'il a reçu un ViewContent nommé.
  if (pageType(currentPath()) === "article") {
    track("article_view", { content_ids: [currentPath()] });
  }

  // Tous les liens vers l'app portent data-cta="<emplacement>". Au clic : on envoie
  // l'événement et on enrichit l'URL avec l'attribution, avant la navigation.
  // Délégation d'événement pour couvrir aussi les liens rendus plus tard par React.
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest?.("a[data-cta]");
    if (!(link instanceof HTMLAnchorElement)) return;
    link.href = withAttribution(link.href);
    // location = l'emplacement du bouton, content_ids = la page d'où part le clic.
    // Les deux sont nécessaires : « tous les clics navbar » et « tous les clics
    // depuis cet article » sont deux audiences différentes.
    const page = link.dataset.ctaPage || pageSlug(currentPath());
    track("cta_click", {
      location: link.dataset.cta,
      content_ids: [page],
    });
  });

  // Calendly signale la prise de RDV par postMessage depuis son iframe
  window.addEventListener("message", (e) => {
    if (e.origin !== "https://calendly.com") return;
    if (e.data?.event === "calendly.event_scheduled") track("demo_scheduled");
  });
}
