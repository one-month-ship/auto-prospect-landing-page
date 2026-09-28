# Notes de lot (décisions et conventions découvertes pendant la production)

- 2026-09-26 : le site n'a pas de dossier blog. Convention retenue, identique à AlertDeals : `src/pages/blog/<slug>.astro`, un registre `src/data/articles.ts` alimentant `src/pages/blog/index.astro`, et une règle `/blog/` dans `sectionMeta()` de `astro.config.mjs`.
- Classes Tailwind du site : `text-text`, `text-text-secondary`, `bg-card`, `border-border`, `text-accent`, `bg-accent` (voir `src/styles/global.css`). Ne pas reprendre les classes AlertDeals (`text-ink`, `bg-tint`…).
- Voix : vouvoiement (le site vouvoie), à la différence d'AlertDeals.
- Auteur : à confirmer par Nassim ; en attendant, signer « L'équipe Auto-Prospect » sans schema Person inventé.
- 2026-09-27 (item-002) : les étapes réelles du Kanban de l'app sont Nouveau / Contacté / Relance / Gagné / Perdu (`auto-prospect-app/packages/shared/src/config/lead.config.ts`) ; la page `/fonctionnalites/crm-pipeline-vente` en décrit d'autres. Toujours vérifier une affirmation produit dans le code de l'app avant de l'écrire (rappels masqués par `SHOW_REMINDERS = false`, donc à ne pas citer).
- 2026-09-27 : titre SEO avec le suffixe « | Auto-Prospect » (règle « aucun tiret cadratin »). Les briefs de `seo/briefs/` sont committés : pas de marqueur entre crochets, écrire « À vérifier : ».
