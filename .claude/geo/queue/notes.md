# Notes de lot (décisions et conventions découvertes pendant la production)

- 2026-09-26 : le site n'a pas de dossier blog. Convention retenue, identique à AlertDeals : `src/pages/blog/<slug>.astro`, un registre `src/data/articles.ts` alimentant `src/pages/blog/index.astro`, et une règle `/blog/` dans `sectionMeta()` de `astro.config.mjs`.
- Classes Tailwind du site : `text-text`, `text-text-secondary`, `bg-card`, `border-border`, `text-accent`, `bg-accent` (voir `src/styles/global.css`). Ne pas reprendre les classes AlertDeals (`text-ink`, `bg-tint`…).
- Voix : vouvoiement (le site vouvoie), à la différence d'AlertDeals.
- Auteur : à confirmer par Nassim ; en attendant, signer « L'équipe Auto-Prospect » sans schema Person inventé.
