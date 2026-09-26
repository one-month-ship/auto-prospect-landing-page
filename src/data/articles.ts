/**
 * Registre des articles du blog.
 *
 * Les articles sont des pages `.astro` autonomes dans `src/pages/blog/`.
 * Ce registre alimente la page d'index `/blog` (liste, tri par date) et doit être
 * complété à chaque nouvel article publié : une entrée = un article.
 * Les dates sont au format ISO (AAAA-MM-JJ), identiques à celles du JSON-LD de l'article.
 */
export type Article = {
  /** Slug de l'URL : /blog/<slug> */
  slug: string;
  /** Titre affiché dans la liste (sans le suffixe « — Auto-Prospect ») */
  title: string;
  /** Résumé court affiché sous le titre */
  description: string;
  /** Catégorie affichée en surtitre (identique au surtitre de l'article) */
  category: string;
  datePublished: string;
  dateModified?: string;
};

export const articles: Article[] = [
  {
    slug: "statistiques-annonces-voitures-occasion-particuliers-2026",
    title: "16 statistiques sur les annonces de voitures d'occasion de particuliers en 2026",
    description:
      "Prix médian, kilométrage, âge, part des bonnes affaires, baisses de prix, marques, carburants : 16 chiffres issus de 35 122 annonces de particuliers relevées sur Leboncoin, AutoScout24 et La Centrale entre juin et septembre 2026.",
    category: "Statistiques",
    datePublished: "2026-09-26",
  },
  {
    slug: "prospection-automobile-methode",
    title: "Prospection automobile : la méthode pour trouver et contacter des vendeurs particuliers",
    description:
      "Où chercher, comment trier, quel canal utiliser et quoi dire : la méthode complète de prospection des vendeurs particuliers pour un marchand VO ou un mandataire, avec les chiffres du marché 2025 et les erreurs qui font baisser le taux de réponse.",
    category: "Méthode",
    datePublished: "2026-09-26",
  },
];

/** Articles triés du plus récent au plus ancien (date de publication). */
export const sortedArticles = [...articles].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished),
);

/** Formate une date ISO en français long : « 26 septembre 2026 ». */
export function formatDateFr(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
