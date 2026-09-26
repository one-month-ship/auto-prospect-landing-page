# Suivi — mise en route des agents marketing sur Auto Prospect

Source : `/Users/nassim/Boulot/marketing and prospection/GUIDE-NOUVEAU-PROJET.md`
Projet : site public Auto Prospect (`auto-prospect landing-page`, Astro)
Démarré le : 2026-09-26

Légende : ⬜ à faire · 🔄 en cours · ✅ fait · ⏸️ en attente de Nassim · ⏭️ volontairement sauté

## Avant de commencer
- ✅ Claude Code ouvert dans le dossier du site public (pas l'app)
- ✅ Dépôt propre, sur `main`

## Étape 1 — SEO/GEO et Autorité
- ✅ 1a. Onboarding `geo-engine:geo` → `.claude/geo/` (profil, concurrents, mots-clés). Reste des `[À CONFIRMER]` dans `profile.md` (voir décisions en attente)
- ✅ 1b. `agent-seo-geo` : treg connecté (solde 10,59 $, org one-month-ship, top-up auto activé), Search Console `sc-domain:auto-prospect.fr` OK, volumes Serpstat (0,007 $), premier article « prospection automobile » → PR #24 https://github.com/one-month-ship/auto-prospect-landing-page/pull/24 (à relire et fusionner par Nassim)
- ✅ 1c. `agent-autorite` : cycle à blanc lancé (coût 0,055 $, aucune alerte) → `autorite/brief-2026-09-26.md` : DR 5, 1 domaine référent, 10 annuaires à soumettre (copy anglais ajouté en relecture). Mots-clés de la config corrigés (« pige » lu comme outillage)

## Étape 2 — Prospects
- ✅ `.protocole/prospects.json` repris d'AlertDeals (même cible) : LinkedIn + Instagram + TikTok actifs, mêmes comptes de niche, mode volume pré-rempli, `systeme.py` lancé
- ⏸️ Lancement `weekly.py --mode volume` : objectif (ex. 1 000 prospects) et budget à valider par Nassim (règle du guide : récapitulatif + budget avant tout lancement)

## Étape 3 — Emails
- ⏭️ Aucune liste email marketing trouvée (l'app utilise Resend en transactionnel seulement) : agent Emails non lancé, conformément au guide

## Étape 4 — Concurrents
- ✅ `agent-concurrents` : Prospelia (nouveau, concurrent direct), Inspectoo, Pistoneo, Deal Detector → `concurrents/*.md`. `douleurs.md` vide : aucun avis public (Trustpilot/Product Hunt) trouvé pour ces 4 outils

## Tâches planifiées (après validation des étapes)
- ⬜ Créer les routines `autoprospect-<agent>-<fréquence>` (rythme à préciser par Nassim)
- ⬜ Passer chaque routine en **Auto** + "Run now" une fois

## Journal
- 2026-09-26 : lecture du guide, création de ce fichier, lancement de l'étape 1a.
- 2026-09-26 : 1a terminé (profil + volumes réels), 1b terminé (PR #24), `.protocole/` créé (treg.json, seo.json, autorite.json), lancement de 1c.
- 2026-09-26 : 1c terminé (brief Autorité), étape 4 terminée (fiches concurrents), étape 3 sautée (pas de liste), étape 2 préparée et en attente de validation. Dépense treg totale du jour : 0,062 $ (solde 10,53 $).

## Décisions en attente de Nassim
- Auteur E-E-A-T des articles (Nassim ? un profil métier ?) : l'article est signé « l'équipe Auto-Prospect » en attendant.
- Année de création et entité juridique (absentes du site) pour le profil et le schema Organization.
- Accès en lecture à la base de l'app (`ads`, `messages`) pour des articles de statistiques (taux de réponse par canal, prix par marque).
- Hub multi-produits : faut-il lier Auto-Prospect et AlertDeals entre eux (liens contextuels) ?
- PR #24 à relire et fusionner.
- Prospects : valider objectif + budget (proposition : 1 000 prospects en volume, plafond 3 $/semaine comme AlertDeals) pour lancer `weekly.py --mode volume`.
- Tâches planifiées : rythme souhaité par agent (article hebdo ? mesure SEO lundi ? brief Autorité lundi ?) pour créer les routines `autoprospect-*`.
