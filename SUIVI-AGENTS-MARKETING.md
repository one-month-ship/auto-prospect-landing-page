# Suivi — mise en route des agents marketing sur Auto Prospect

Source : `/Users/nassim/Boulot/marketing and prospection/GUIDE-NOUVEAU-PROJET.md`
Projet : site public Auto Prospect (`auto-prospect landing-page`, Astro)
Démarré le : 2026-09-26

Légende : ⬜ à faire · 🔄 en cours · ✅ fait · ⏸️ en attente de Nassim · ⏭️ volontairement sauté

## Avant de commencer
- ✅ Claude Code ouvert dans le dossier du site public (pas l'app)
- ✅ Dépôt propre, sur `main`

## Étape 1 — SEO/GEO et Autorité
- 🔄 1a. Onboarding `geo-engine:geo` → `.claude/geo/` (profil, concurrents, mots-clés)
- ⬜ 1b. `agent-seo-geo` : vérifier treg (solde réel, budget annoncé avant appel payant), Search Console, premier article → branche + PR normale
- ⬜ 1c. `agent-autorite` : `cycle.py --project . --dry` → brief

## Étape 2 — Prospects
- ⬜ Choix mode (cible/volume), offre, cible, objectif, réseaux (LinkedIn / Instagram / TikTok) → `.protocole/prospects.json`
- ⬜ Récapitulatif + budget montré avant lancement, puis exécution `--mode` explicite

## Étape 3 — Emails
- ⬜ Vérifier s'il existe une vraie liste email. Sinon : ⏭️ ne pas lancer (règle du guide)

## Étape 4 — Concurrents
- ⬜ `agent-concurrents` : `.protocole/concurrents.json`, `collect.py`, `initial_report.py` → fiches + `douleurs.md`

## Tâches planifiées (après validation des étapes)
- ⬜ Créer les routines `autoprospect-<agent>-<fréquence>` (rythme à préciser par Nassim)
- ⬜ Passer chaque routine en **Auto** + "Run now" une fois

## Journal
- 2026-09-26 : lecture du guide, création de ce fichier, lancement de l'étape 1a.

## Décisions en attente de Nassim
- (aucune pour l'instant)
