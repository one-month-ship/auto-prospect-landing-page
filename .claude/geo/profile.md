# Profil GEO : Auto-Prospect

> Ce fichier est la source de vérité de tous les skills du plugin GEO Engine.
> Il est écrit par l'onboarding du skill `geo`, puis maintenu à la main.
> Règle : garder la copy identique à celle du site en ligne (cohérence d'entité,
> c'est un signal que les IA utilisent pour associer le nom au produit).
>
> Les lignes marquées `[À CONFIRMER]` ont été déduites du repo par l'onboarding
> (2026-09-26) et n'ont pas encore été validées par un humain.

## 1. Identité

- **Nom** : Auto-Prospect
- **URL publique** : https://auto-prospect.fr (apex canonique, www redirige en 307)
- **Catégorie principale** : logiciel de prospection automobile automatisée (pige auto + contact automatique des vendeurs) pour professionnels de l'achat-revente
- **Catégories secondaires** : CRM automobile, outil de sourcing VO, analyse prix vs marché
- **Plateformes** : web (app.auto-prospect.fr), canaux de contact WhatsApp / messagerie Leboncoin / message vocal sur répondeur
- **Modèle et prix** : plan unique tout inclus, 69 € HT/mois en facturation annuelle ou 89 € HT/mois sans engagement ; messagerie Leboncoin et WhatsApp inclus ; vocaux à 0,19 € HT (packs 100 = 20 € HT, 500 = 80 € HT) ; essai gratuit 5 jours
- **Pays et année de création** : France, 2025 (premier commit du site en mai 2025) `[À CONFIRMER]`
- **Entité juridique** : non affichée sur le site (aucune mention légale d'éditeur dans CGU/confidentialité) `[À CONFIRMER]`
- **Contact public** : contact@auto-prospect.fr

## 2. Proposition de valeur

- **En une phrase** : Auto-Prospect détecte en temps réel les annonces de véhicules de particuliers sur Leboncoin, AutoScout24 et La Centrale, analyse leur prix par rapport au marché, contacte automatiquement les vendeurs (messagerie Leboncoin, WhatsApp ou vocal sur répondeur) et alimente un CRM Kanban intégré, avec des prospects exclusifs à chaque client.
- **H1 réel de la page d'accueil** : « Automatisez votre prospection auto et gagnez 3x plus de deals »
- **Sous-titre réel** : « Trouvez les meilleures annonces sur Leboncoin, AutoScout24 et La Centrale, contactez les vendeurs automatiquement — messagerie Leboncoin, WhatsApp ou vocal — et gérez vos prospects depuis une seule plateforme. »
- **Meta description réelle** : « Automatisez votre prospection auto : détection d'annonces en temps réel, contact automatique des vendeurs par messagerie Leboncoin, WhatsApp ou vocal, CRM intégré. Déjà 273 professionnels gagnent 3x plus de deals sur Leboncoin, AutoScout24 et La Centrale. »

## 3. Niche et vocabulaire

- **Le domaine en deux mots** : pige automobile (prospection des vendeurs particuliers pour l'achat-revente VO)
- **Les termes que le marché tape ou demande** : « pige auto », « logiciel de pige automobile », « outil de pige », « prospection automobile », « sourcing VO », « trouver des voitures à acheter sur Leboncoin », « contacter les vendeurs Leboncoin automatiquement », « CRM automobile », « marchand VO », « mandataire auto », « achat revente voiture »
- **Les questions que les gens posent à une IA avant d'acheter ce type de produit** (déduites du site et de la niche, à affiner avec les prompts trackés) `[À CONFIRMER]` :
  1. « Quel est le meilleur logiciel de pige automobile pour un marchand VO ? »
  2. « Comment contacter automatiquement les vendeurs de voitures sur Leboncoin ? »
  3. « Comment trouver des véhicules d'occasion sous-cotés à revendre ? »
  4. « Existe-t-il un outil qui envoie des messages WhatsApp ou vocaux aux vendeurs particuliers ? »
  5. « Quel CRM utiliser pour suivre ses achats de véhicules d'occasion ? »
- **Concepts que toutes les IA connaissent déjà** (à NE PAS traiter en article générique) : qu'est-ce que la pige (définition), comment fonctionne Leboncoin, définition de la cote Argus, qu'est-ce qu'un mandataire auto (définition seule)

## 4. Cibles

### Persona principal
- **Qui** : marchand / revendeur de véhicules d'occasion indépendant ou petite structure (1 à 5 personnes), France, qui source auprès des particuliers
- **Problème n°1** : surveiller trois marketplaces à la main et contacter chaque vendeur un par un, en arrivant souvent après la concurrence
- **Ce qu'il cherche à obtenir** : un flux continu de vendeurs qui le rappellent, sur des véhicules au bon prix, sans y passer ses journées

### Personas secondaires
- **Mandataire auto** : une recherche automatique par mandat client, livrer les mandats plus vite (`/solutions/mandataire-auto`)
- **Gérant de concession / agence multi-vendeurs** : travail en équipe dans le CRM, alimentation du parc en continu (`/solutions/marchand-vehicules-occasion`)
- **Utilisateur d'un outil de pige classique** insatisfait des prospects partagés et des zones facturées en plus (`/solutions/pige-automobile`)

## 5. Jobs-to-be-done

1. « Être prévenu tout de suite quand une annonce qui correspond à mes critères sort sur Leboncoin, AutoScout24 ou La Centrale. »
2. « Contacter tous les vendeurs sans les appeler un par un, et qu'ils me rappellent. »
3. « Savoir en un coup d'œil si la voiture est en dessous du prix du marché avant de me déplacer. »
4. « Suivre mes relances et mes prospects avec mon équipe, sans tableur. »
5. « Ne pas démarcher les mêmes vendeurs que tous les autres abonnés du même outil. »

## 6. Fonctionnalités clés

1. Recherche automatique d'annonces en temps réel (3 marketplaces, filtres marque/modèle/prix/km/zone, zones illimitées) : `/fonctionnalites/recherche-annonces-automatisee`
2. Contact multicanal des vendeurs (messagerie Leboncoin, WhatsApp, vocal sur répondeur) : `/fonctionnalites/contact-multicanal`
3. Contact vocal automatique, templates réutilisables, exclusivité des prospects : `/fonctionnalites/contact-vocal-automatique`
4. CRM pipeline de vente Kanban, alimenté automatiquement, travail en équipe : `/fonctionnalites/crm-pipeline-vente`
5. Analyse prix vs marché sur chaque annonce (véhicules sous-cotés) : `/fonctionnalites/analyse-prix-marche`
6. Tarifs, plan unique : `/tarifs`
7. Comparatif des outils de pige (page BOFU existante, sans nom de marque) : `/comparatif-outils-pige-automobile`

## 7. Concurrents

Voir `competitors.md` dans ce dossier. Résumé (repris du projet frère AlertDeals, même niche, à compléter pour l'angle « contact automatique ») `[À CONFIRMER]` :
- **Directs** : outils de pige auto avec contact vendeur (SMS/vocal/WhatsApp) — noms à identifier par `keyword-pipeline` ; Inspectoo, Pistoneo (veille et scoring, sans contact multicanal)
- **Adjacents** : AlertDeals (produit frère, alertes bonnes affaires sans contact automatique), Deal Detector, Auto Intelligence (enchères B2B), pige manuelle + tableur, scrapers maison
- **Ceux qu'on cite dans les comparatifs** : aucun par nom pour l'instant (la page comparatif existante compare « la concurrence » de façon anonyme, choix à conserver tant que les noms de marque n'ont pas de volume de recherche mesuré)

## 8. Data first-party

- **Datasets disponibles** (déduits du schéma Drizzle de `auto-prospect-app/packages/db`) `[À CONFIRMER]` :
  - `ads` : annonces collectées sur les 3 marketplaces (source, marque, modèle, année, km, carburant, boîte, prix, fourchette prix marché min/max, position marché, département, dates de publication, reposts, baisses de prix)
  - `leads` / `messages` / `leboncoin_message_run` : contacts envoyés par canal et suites données (taux de réponse par canal potentiellement calculable)
  - `hunts` : critères de recherche des clients (quelles marques/zones les pros ciblent)
- **Comment y accéder en lecture** : base Supabase Postgres de l'app, hors de ce dépôt ; accès en lecture à demander à Nassim (requête SQL ou export CSV agrégé, jamais de données personnelles)
- **Chiffres canoniques déjà publiés** : « 273 professionnels », « 3x plus de deals », « 3 heures par jour gagnées » (témoignage), « 69 € HT/mois annuel / 89 € HT sans engagement », « 0,19 € HT par vocal »
- **Études ou pages de données déjà en ligne** : aucune

> Ne jamais mettre d'identifiant de base, de clé ou de token ici. Ce fichier est versionné.

## 9. Voix

- **Langue(s) de production** : fr
- **Tutoiement ou vouvoiement** : vouvoiement (« Automatisez votre prospection », « vous n'avez plus qu'à répondre »), à la différence d'AlertDeals qui tutoie
- **Ton** : direct, professionnel, orienté gain de temps et volume de deals ; chiffres concrets ; comparatif « honnête » sans dénigrer les concurrents par nom
- **Interdits** : pas d'emoji dans le corps de texte ; pas de promesse de gain garanti ; ne jamais nommer un concurrent sans fact-check humain ; pas de marqueur `[À CONFIRMER]`/TODO dans un contenu publié
- **Exemple de page qui incarne la voix** : `src/pages/comparatif-outils-pige-automobile.astro` (section « Un comparatif honnête ») et `src/pages/solutions/pige-automobile.astro`

## 10. Site et stack

- **Framework** : Astro 5 + React (Pricing, FAQ, Navbar mobile) + Tailwind 4, déployé sur Vercel
- **Dossier des pages de contenu** : `src/pages/blog/<slug>.astro` (créé le 2026-09-26, même convention que le projet frère AlertDeals), index `src/pages/blog/index.astro` alimenté par le registre `src/data/articles.ts`
- **Format d'une page** : fichiers `.astro` avec `const title/description/jsonLd` en frontmatter et `<Layout>` ; pas de MDX ni de collection de contenu
- **Rendu** : SSG (`astro build`), vérifié en production le 2026-09-26
- **Internationalisation** : aucune, site mono-langue fr (`<html lang="fr">`)
- **Sitemap** : `@astrojs/sitemap`, `https://auto-prospect.fr/sitemap-index.xml`, lastmod réel par commit git, 14 URLs le 2026-09-26 (16 avec le blog). Règle `/blog/` ajoutée dans `sectionMeta()` de `astro.config.mjs` (priority 0.7)
- **robots.txt autorise les bots IA** : oui, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended explicitement autorisés
- **JSON-LD** : `Organization` sur toutes les pages, `SoftwareApplication` + `FAQPage` + `HowTo` sur la home, schémas propres par page via la prop `jsonLd`. Aucun `Article`/`BlogPosting` pour l'instant
- **`llms.txt`** : présent (`public/llms.txt`), prix du vocal aligné sur le site (0,19 € HT) et section Blog ajoutée le 2026-09-26 ; à compléter à chaque article
- **Page auteur et schema author** : à créer
- **Adaptateur choisi** : `markdown-generic`
- **Exemple de page de référence** : `src/pages/blog/prospection-automobile-methode.astro` pour un article (frontmatter, JSON-LD BlogPosting/HowTo/FAQPage/Breadcrumb, sections, CTA) ; `src/pages/solutions/pige-automobile.astro` pour une page produit

## 11. Outils connectés

- **Suivi de la visibilité IA** : aucun
- **Analytics produit** : aucun analytics dans ce dépôt. Pixel Meta et Google Tag chargés après consentement (`src/lib/tracking.ts`), IDs via `PUBLIC_META_PIXEL_ID` / `PUBLIC_GOOGLE_TAG_ID`
- **Google Search Console** : **connectée** via treg (org one-month-ship), propriété `sc-domain:auto-prospect.fr` accessible en siteOwner (vérifié le 2026-09-26). Note : les impressions se répartissent entre `www.` et l'apex ; www redirige en 307 vers l'apex, Google consolidera sur le canonical
- **Emailing** (pour les lead magnets) : Lumail configuré au niveau du plugin email-engine ; l'app utilise Resend pour le transactionnel. Aucune liste marketing connue
- **Automatisation navigateur** (pour les annuaires) : aucune
- **Recherche de mots-clés** : treg → Serpstat g_fr (0,0005 $ par mot-clé trouvé), premier appel le 2026-09-26 ; solde réel à lire (`treg balance`) avant tout appel payant, plafond dans `.protocole/treg.json`

## 12. Auteur (E-E-A-T)

- **Nom** : Nassim Ezzakraoui `[À CONFIRMER]` (fondateur-développeur, signature « N.dev » en pied de page) ; alternative : un profil métier revendeur si Nassim préfère
- **Bio en deux lignes** : à rédiger `[À CONFIRMER]`
- **Page auteur** (URL) : à créer
- **Profils publics à lier** (sameAs) : https://nassim-dev.netlify.app/fr, profil LinkedIn `[À CONFIRMER]`

## 13. Multi-produits (optionnel)

- **Produits de la suite** : Auto-Prospect (https://auto-prospect.fr, prospection + contact automatique + CRM) et AlertDeals (https://alertdeals.fr, alertes bonnes affaires et estimation de marge). Même niche (achat-revente VO en France), mêmes trois marketplaces, même équipe `[À CONFIRMER]`
- **Produit hub** : aucun désigné pour l'instant ; les deux sites vivent séparément `[À CONFIRMER]`
- **Règles d'interlink** : liens contextuels uniquement (ex. un article Auto-Prospect sur la marge peut pointer vers l'analyse tarifaire AlertDeals et inversement), jamais de footer croisé massif. Ne pas dupliquer les mêmes articles sur les deux sites : se répartir les clusters (AlertDeals = rentabilité/marge/rotation ; Auto-Prospect = prospection/contact vendeur/CRM)

## 14. État

- **Inventaire de contenu** : `content-inventory.md` dans ce dossier
- **Univers de mots-clés** : `keywords.md` dans ce dossier
- **Files d'exécution** : `queue/` dans ce dossier
- **Dernier rituel de mesure** : jamais
- **Phase actuelle** : volume (aucun article publié, aucune mesure)
