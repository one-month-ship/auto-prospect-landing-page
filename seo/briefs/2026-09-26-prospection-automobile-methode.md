# Brief de relecture : /blog/prospection-automobile-methode

Article produit le 2026-09-26 (item-001, lot-2026-09-26), skill `foundational-article`, PR sur la branche `geo/semaine-2026-09-26`.

## Requête visée
« prospection automobile » (320/mois, difficulté 3, la home est déjà en position 19 avec 196 impressions sur 90 jours) et « prospection automatique » (260/mois, 347 impressions, position 44). Angle propre : la prospection des **vendeurs particuliers** (sourcing) par opposition à la prospection d'acheteurs d'une concession, qui domine les résultats actuels.

## Affirmations chiffrées et leur source (vérifiées le 2026-09-26)
| Affirmation | Source | Statut |
|---|---|---|
| 5,4 millions de transactions VO en France en 2025, +0,8 % | AAA Data, « Marché automobile français 2025 : les grandes tendances » (page datée juin 2026) | vérifiée à la source |
| Véhicules de plus de 5 ans échangés à 55 % entre particuliers ; moins de 5 ans vendus à 78 % par des pros | même page AAA Data | vérifiée à la source |
| Plus de 700 000 véhicules disponibles sur leboncoin dont plus de 400 000 de professionnels (2 janvier 2026) | presse.leboncoincorporate.com, rubrique Automobile | vérifiée à la source ; le « environ 300 000 annonces de particuliers » est une soustraction, présentée comme un ordre de grandeur |
| 66 % des pros clients de Leboncoin déclarent un besoin de sourcing VO ; 42 % cherchent auprès de particuliers | L'argus, 4 avril 2022 (enquête Leboncoin) | vérifiée à la source, datée 2022 dans le texte |

## Réserves [FACT-CHECK HUMAIN]
- [FACT-CHECK HUMAIN] Tableau « canal / réponse observée » : formulé comme observation qualitative issue de l'usage d'Auto-Prospect, sans pourcentage. Si Nassim dispose de taux de réponse réels par canal (tables `messages` / `leads` de l'app), les ajouter ferait un vrai article de statistiques ; sinon laisser tel quel.
- Auteur : Nassim Ezzakraoui validé le 2026-09-26, schema Person posé. Reste à créer une page auteur sur le site et à ajouter le profil LinkedIn en sameAs.
- [FACT-CHECK HUMAIN] Phrase « la prospection manuelle occupe facilement une demi-journée quotidienne » : ordre de grandeur, pas une mesure. Le témoignage du site parle de « 3 heures par jour gagnées ». Reformuler si Nassim préfère un chiffre canonique.
- [FACT-CHECK HUMAIN] « Un professionnel qui se présente comme un particulier prend un risque juridique » : affirmation prudente (pratique commerciale trompeuse), sans citation de texte de loi. À valider ou à adoucir.

## Modifications hors article dans la même PR
- `src/pages/blog/index.astro` et `src/data/articles.ts` créés (index du blog, registre).
- `astro.config.mjs` : règle sitemap `/blog/` (priority 0.7) ; sans elle les articles sortaient en « page légale » (0.3, yearly).
- `src/components/Footer.astro` : lien « Blog » dans la colonne Solutions.
- `public/llms.txt` : prix du vocal aligné sur le site (0,19 € HT au lieu de 0,15 € HT) et section Blog ajoutée.

## Maillage
Liens sortants : `/fonctionnalites/recherche-annonces-automatisee` (hub), `/fonctionnalites/analyse-prix-marche`, `/fonctionnalites/contact-multicanal`, `/fonctionnalites/crm-pipeline-vente`, `/solutions/pige-automobile`, `/blog`.
Liens entrants : `/blog` (index), footer. Recommandé après fusion : un lien depuis `/fonctionnalites/recherche-annonces-automatisee` et `/solutions/pige-automobile` vers l'article.
