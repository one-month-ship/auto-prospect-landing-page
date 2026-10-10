# Auto-Prospect — site public (landing + blog)

Dépôt du site public `auto-prospect.fr` (Astro 5 + React + Tailwind 4, SSG,
déployé sur Vercel). Les articles vivent dans `src/pages/blog/<slug>.astro` et
sont référencés dans `src/data/articles.ts`.

Le pilotage éditorial est dans `.claude/geo/` (profil, mots-clés, inventaire,
file d'exécution) et les briefs internes dans `seo/`.
**`.claude/geo/profile.md` est la source de vérité.** Le lire avant d'écrire ou
de modifier un contenu.

## RÈGLE ABSOLUE : ne jamais dévoiler la stack

Tout ce qui est publié ici est public, lu par les concurrents, les partenaires
et les IA. Trouver nos fournisseurs a coûté du temps de recherche : c'est un
avantage concurrentiel, il ne se raconte pas dans un article.

**Jamais dans un contenu publié** — article, page, lead magnet, `llms.txt`,
JSON-LD, meta, commentaire HTML, nom de fichier ou d'image :

- le nom du fournisseur de collecte d'annonces, de scraping, de proxy ou
  d'enrichissement de données
- le nom du fournisseur d'envoi de SMS, d'appels, de messages vocaux, de
  WhatsApp, de messagerie marketplace ou d'email transactionnel
- l'infrastructure : base de données et son hébergeur, ORM, file de jobs,
  cache, hébergeur de l'app, logs, monitoring
- les modèles ou fournisseurs d'IA utilisés dans le produit ou pour écrire
- les détails d'implémentation : nom de table ou de colonne, chemin de fichier
  du dépôt applicatif, variable d'environnement, endpoint interne, nom de
  worker ou de webhook

Décrire la capacité, pas l'outil : « notre infrastructure de collecte », « nos
canaux de contact », « notre moteur d'analyse de prix », « nos propres
données ». Le plus souvent, ne pas en parler du tout est la bonne réponse.

**Exceptions déjà publiques, à garder telles quelles** : les trois marketplaces
sources (Leboncoin, AutoScout24, La Centrale), sans jamais dire comment leurs
annonces sont récupérées ; Stripe, uniquement comme argument de confiance sur
le paiement ; les canaux en tant que canaux (WhatsApp, messagerie Leboncoin,
vocal sur répondeur), sans nommer qui les achemine.

Le détail complet, les formulations de remplacement et la règle de citation de
nos chiffres sont en § 15 de `.claude/geo/profile.md`.

**En cas de doute : ne pas nommer**, et le signaler dans le brief.

## Frontière brief interne / article publié

`seo/briefs/` et `.claude/geo/` ne sont pas publiés : ils peuvent détailler la
méthode, les requêtes et les chemins de fichiers. Les pages de `src/` le sont.
Garder cette frontière nette, et ne jamais recopier un passage technique d'un
brief vers un article.

Un chiffre issu de nos données se cite « données internes Auto-Prospect, N
annonces, période », sans nommer la base, le schéma ni le rôle de lecture.

## Avant de publier

Vérifier qu'aucun nom de fournisseur ni détail d'implémentation n'a glissé dans
le contenu ajouté, y compris dans le JSON-LD, les meta et `public/llms.txt`.
