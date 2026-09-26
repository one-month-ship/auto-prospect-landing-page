# Brief de relecture : /blog/statistiques-annonces-voitures-occasion-particuliers-2026

Article de statistiques (skill `statistics-article`), data first-party, produit le 2026-09-26, PR #24.

## Source des chiffres
Requêtes agrégées via le rôle lecture seule `autoprospect_readonly` sur la table `ads`, fenêtre `initial_publication_date` du 2026-06-01 au 2026-09-25 (35 122 lignes). Aucune donnée personnelle lue ni publiée. Les libellés de marques, carburants et positions marché viennent des seeds de `auto-prospect-app/packages/db/supabase/seeds/prod.seed.sql`.

## Réserves [FACT-CHECK HUMAIN]
- [FACT-CHECK HUMAIN] Représentativité : l'échantillon est filtré par les recherches des clients (hunts). L'article le dit dans « Limites ». Si Nassim préfère ne pas révéler que les annonces viennent des recherches clients, reformuler.
- [FACT-CHECK HUMAIN] Champ `accept_salesmen` (Leboncoin : `!ad.no_salesmen` dans `leboncoin.mapper.ts`) : 16,1 % de vrai seulement, ce qui semble inversé (une conversion de chaîne « false » est possible). Chiffre volontairement ÉCARTÉ de l'article. À vérifier côté app avant toute utilisation.
- [FACT-CHECK HUMAIN] `has_been_reposted` vaut 100 % sur La Centrale et `price_has_dropped` 0 % sur AutoScout24/La Centrale : artefacts de collecte. L'article ne présente ces deux indicateurs que sur Leboncoin (ou globalement pour la baisse de prix, dominée par Leboncoin à 92 %). Si Nassim veut, restreindre aussi la baisse de prix à Leboncoin (10,8 %).
- [FACT-CHECK HUMAIN] Définition de « baisse de prix » et « remise en ligne » : formulées d'après les noms de champs ; à confirmer par la logique du worker.
- [FACT-CHECK HUMAIN] Licence CC BY 4.0 déclarée dans le schema Dataset et « citation libre » dans le texte : choix par défaut pour maximiser les citations, à valider.
- La comparaison diesel 53,1 % vs 45 % (AAA Data, part de marché 2025 toutes transactions VO) compare deux périmètres différents ; le texte le précise.

## Maillage
Entrants : `/blog`, article méthode (lien ajouté). Sortants : `/fonctionnalites/analyse-prix-marche`, article méthode. Recommandé après fusion : lien depuis `/fonctionnalites/analyse-prix-marche` vers l'article.

## Suite
Mise à jour trimestrielle annoncée dans l'article (prochaine : janvier 2027, fenêtre oct.→déc. 2026). Sujets stats suivants possibles avec la même base : délai de vente par segment (nécessite la date de disparition de l'annonce), taux de réponse par canal (table `messages`, quand les statuts de réponse existeront).
