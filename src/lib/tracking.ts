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
const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
];

export type Consent = "granted" | "denied";

// Événements marketing suivis sur la landing. Le mapping vers les noms standards
// Meta / Google est centralisé ici pour que les composants n'aient qu'un nom à connaître.
export type TrackingEvent =
  | "cta_click" // clic sur un bouton « Essai gratuit » (départ vers l'app)
  | "contact_form" // formulaire de contact envoyé
  | "demo_scheduled"; // RDV Calendly confirmé

const META_EVENTS: Record<TrackingEvent, { name: string; custom: boolean }> = {
  cta_click: { name: "CTAClick", custom: true },
  contact_form: { name: "Lead", custom: false },
  demo_scheduled: { name: "Schedule", custom: false },
};

const GOOGLE_EVENTS: Record<TrackingEvent, string> = {
  cta_click: "cta_click",
  contact_form: "generate_lead",
  demo_scheduled: "schedule_demo",
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
  fbq("track", "PageView");
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

/* ---------- Événements ---------- */

export function track(event: TrackingEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !pixelsLoaded) return;
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
  if (Object.keys(found).length > 0) ss.setItem(ATTRIBUTION_KEY, JSON.stringify(found));
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

  // Tous les liens vers l'app portent data-cta="<emplacement>". Au clic : on envoie
  // l'événement et on enrichit l'URL avec l'attribution, avant la navigation.
  // Délégation d'événement pour couvrir aussi les liens rendus plus tard par React.
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest?.("a[data-cta]");
    if (!(link instanceof HTMLAnchorElement)) return;
    link.href = withAttribution(link.href);
    track("cta_click", { location: link.dataset.cta });
  });

  // Calendly signale la prise de RDV par postMessage depuis son iframe
  window.addEventListener("message", (e) => {
    if (e.origin !== "https://calendly.com") return;
    if (e.data?.event === "calendly.event_scheduled") track("demo_scheduled");
  });
}
