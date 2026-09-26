# Inventaire de contenu : Auto-Prospect

> Mis à jour par chaque skill de production à la fin de son travail, et par `internal-linking`.
> C'est la carte que `geo` lit pour décider quoi produire ensuite.

## Pages existantes

| URL | Famille | Cluster / hub | Langue | Publié le | Mis à jour le | Liens entrants | Liens sortants | Fact-check |
|---|---|---|---|---|---|---|---|---|
| `/` | produit (home) | — | fr | 2025-05 | 2026-09 | navbar, footer | fonctionnalités, solutions, tarifs | validé (copy du site) |
| `/tarifs` | produit | — | fr | 2025 | 2026-09 | navbar, footer, CTA | app | validé |
| `/fonctionnalites/recherche-annonces-automatisee` | produit (hub) | prospection / sourcing | fr | 2026 | 2026-09 | footer, home | tarifs | validé |
| `/fonctionnalites/contact-multicanal` | produit (hub) | contact automatique vendeurs | fr | 2026-09 | 2026-09 | footer | tarifs | validé |
| `/fonctionnalites/contact-vocal-automatique` | produit | contact automatique vendeurs | fr | 2026 | 2026-09 | footer | tarifs | validé |
| `/fonctionnalites/crm-pipeline-vente` | produit (hub) | CRM automobile | fr | 2026 | 2026-09 | footer | tarifs | validé |
| `/fonctionnalites/analyse-prix-marche` | produit | analyse prix (lien vers AlertDeals possible) | fr | 2026 | 2026-09 | footer | tarifs | validé |
| `/solutions/pige-automobile` | BOFU (hub) | logiciel de pige automobile | fr | 2026 | 2026-09 | footer | comparatif, tarifs | validé |
| `/solutions/mandataire-auto` | BOFU (hub) | mandataire auto | fr | 2026 | 2026-09 | footer | tarifs | validé |
| `/solutions/marchand-vehicules-occasion` | BOFU (hub) | sourcing VO | fr | 2026 | 2026-09 | footer | tarifs | validé |
| `/comparatif-outils-pige-automobile` | BOFU (comparatif anonyme) | logiciel de pige automobile | fr | 2026-09-01 | 2026-09 | footer, solutions/pige | tarifs | validé (aucun concurrent nommé) |
| `/blog` | index blog | — | fr | 2026-09-26 (PR) | 2026-09-26 | footer | articles | validé |
| `/blog/prospection-automobile-methode` | fond (MOFU) | prospection automobile (méthode) → hub `/fonctionnalites/recherche-annonces-automatisee` | fr | 2026-09-26 (PR, non fusionnée) | 2026-09-26 | `/blog`, footer | hub, analyse-prix, contact-multicanal, crm, solutions/pige | brief `seo/briefs/2026-09-26-prospection-automobile-methode.md` |
| `/conditions-utilisation`, `/confidentialite`, `/cookies` | légal | — | fr | 2025 | 2026-09 | footer | — | — |

## Hubs

| Hub | Cluster | Spokes rattachés | Spokes manquants |
|---|---|---|---|
| `/solutions/pige-automobile` | logiciel de pige automobile | `/comparatif-outils-pige-automobile` | listicle « meilleurs outils de pige », article « pige classique vs prospection automatisée » (approfondi) |
| `/fonctionnalites/contact-multicanal` | contact automatique vendeurs | `/fonctionnalites/contact-vocal-automatique` | guide « contacter les vendeurs Leboncoin automatiquement », scripts de messages |
| `/fonctionnalites/recherche-annonces-automatisee` | prospection / sourcing | `/blog/prospection-automobile-methode` (PR) | lien retour du hub vers l'article, guide sourcing VO particuliers |
| `/fonctionnalites/crm-pipeline-vente` | CRM automobile | — | comparatif CRM automobile |
| `/solutions/mandataire-auto` | mandataire auto | — | guide outils mandataire |

## Pages orphelines (0 lien entrant)

- Aucune : toutes les pages sont liées depuis le footer.

## Ressources gated (lead magnets)

| Ressource | Persona | Placement (pages) | Outil emailing / tag | Inscrits |
|---|---|---|---|---|
| (aucune) | | | | |

## Outils gratuits

| Outil | URL | Job résolu | Usage (période) | Conversion | Décision (garder / promouvoir / laisser vivre) |
|---|---|---|---|---|---|
| (aucun) | | | | | |

## Prérequis infra

- Rendu serveur vérifié le : 2026-09-26 — Astro SSG, HTML complet servi en production (H1 présent dans le HTML brut de `/solutions/pige-automobile`)
- Sitemap vérifié le : 2026-09-26 — `https://auto-prospect.fr/sitemap-index.xml` → `sitemap-0.xml`, 14 URLs, lastmod par commit git, déclaré dans `robots.txt`
- Bots IA autorisés vérifié le : 2026-09-26 — GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended explicitement autorisés
- Canonical, title, description uniques : oui sur toutes les pages (Layout.astro)
- JSON-LD : `Organization` partout, `SoftwareApplication`/`FAQPage`/`HowTo` sur la home ; aucun `Article`/`BlogPosting` (pas d'article encore)
- Blocages ouverts : aucun bloquant. Fait le 2026-09-26 (dans la PR du premier article) : `src/pages/blog/` + index, règle sitemap `/blog/`, `llms.txt` corrigé (0,19 € HT) avec section blog. Reste : page auteur + schema `author` Person (E-E-A-T), en attente du choix d'auteur par Nassim.
