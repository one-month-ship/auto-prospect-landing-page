# Univers de mots-clés : Auto-Prospect

> Produit par `keyword-pipeline`. Un cluster = un hub potentiel (voir `internal-linking`).
> Priorité : intention d'achat et citabilité avant volume brut.
>
> Première liste écrite à l'onboarding (2026-09-26). Volumes mesurés le même jour via treg/Serpstat (base g_fr,
> 40 mots-clés interrogés, 14 trouvés, coût 0,007 $) et impressions Google Search Console sur 90 jours (2026-06-28 → 2026-09-25). Répartition avec
> le produit frère AlertDeals : AlertDeals couvre rentabilité / marge / rotation du stock ;
> Auto-Prospect couvre prospection / contact vendeur / CRM / pige.

## Clusters

| Cluster | Requêtes et prompts IA réels | Intention | Famille → skill | Priorité | Hub (page pilier) | Statut |
|---|---|---|---|---|---|---|
| Logiciel de pige automobile | « pige auto » (GSC : 1 077 impressions, position 7,5 ; aucun volume Serpstat retourné), « pige automobile » (77 impressions), « logiciel pige automobile », « quel est le meilleur logiciel de pige automobile pour un marchand VO ? » | commercial | comparison-page (listicle sans marque tant que pas de volume de marque) | **haute** | `/solutions/pige-automobile` + `/comparatif-outils-pige-automobile` | à faire |
| Contact automatique des vendeurs Leboncoin | « contacter vendeur leboncoin automatiquement », « message automatique leboncoin voiture », « prospection whatsapp automobile », « comment contacter automatiquement les vendeurs de voitures sur Leboncoin ? » | commercial / how-to | foundational-article | **haute** | `/fonctionnalites/contact-multicanal` | à faire |
| Prospection automobile (méthode) | « prospection automobile » (320/mois, difficulté 3, GSC 196 impressions position 19), « prospection automatique » (260/mois, GSC 347 impressions position 44), « prospection auto » (18 impressions position 7,8), « comment prospecter des vendeurs particuliers de voitures » | how-to | foundational-article | **haute** | `/fonctionnalites/recherche-annonces-automatisee` | à faire |
| Sourcing VO auprès des particuliers | « sourcing auto » (140/mois), « sourcing vo » (GSC 27 impressions), « sourcing automobile » (25 impressions), « marchand automobile » (210/mois, difficulté 7), « devenir marchand automobile » (30/mois), « achat revente voiture » (590/mois, difficulté 10, déjà visé par AlertDeals) | commercial / how-to | foundational-article | moyenne | `/solutions/marchand-vehicules-occasion` | à faire |
| Mandataire auto : outils et sourcing | « outil mandataire auto », « logiciel mandataire automobile », « comment trouver des véhicules pour ses clients mandataire » | commercial | comparison-page / foundational-article | moyenne | `/solutions/mandataire-auto` | à faire |
| CRM automobile | « crm automobile » (720/mois, difficulté 2, GSC 443 impressions position 51), « crm auto » (720/mois), « logiciel crm automobile » (10/mois), « quel CRM utiliser pour suivre ses achats de véhicules d'occasion ? » | commercial | comparison-page | moyenne | `/fonctionnalites/crm-pipeline-vente` | à faire |
| Statistiques marché VO particuliers (data first-party) | « prix moyen voiture occasion leboncoin 2026 », « délai de vente voiture occasion particulier », « taux de réponse vendeurs leboncoin », « quel canal pour joindre un vendeur particulier » | data | statistics-article | moyenne (haute dès que l'accès lecture à la base `ads`/`messages` est confirmé) | à créer (`/blog/statistiques-...`) | à faire |
| Outil gratuit : simulateur | « calculateur temps de prospection auto », « simulateur coût pige manuelle vs automatisée » | outil | free-tool | basse | `/fonctionnalites/recherche-annonces-automatisee` | à faire |

## Rejetés (et pourquoi)

| Sujet | Raison (TOFU générique, hors cible, pas de data…) |
|---|---|
| « Qu'est-ce que la pige automobile » (définition seule) | Générique, toute IA le répond sans source ; à traiter seulement comme section d'un article de fond, pas comme page |
| « Comment acheter une voiture d'occasion » (particulier) | Hors cible : Auto-Prospect vise les professionnels de l'achat-revente |
| « voiture occasion », « leboncoin voiture » | Volumes massifs mais difficulté 74-88 mesurée côté AlertDeals, dominés par les marketplaces, intention grand public |
| « mandataire auto » (27 100/mois, difficulté 69) | Requête grand public (particuliers cherchant un mandataire pour acheter moins cher), pas la cible ; la page `/solutions/mandataire-auto` reste pour la longue traîne « outil mandataire » |
| Pages « Auto-Prospect vs <marque> » | Aucun volume de recherche mesuré sur les noms de marque de la niche (constat AlertDeals 2026-09-20) ; à reconsidérer si un volume apparaît |
| Marge / rentabilité / rotation VO | Couvert par AlertDeals (produit frère) : lien contextuel plutôt que doublon |

## Sources d'expansion utilisées

- Google Search Console (90 jours) : 142 requêtes, dont « pige auto » 1 077 impressions, « crm automobile » 443, « prospection automatique » 347, « prospection automobile » 196
- Autocomplétion et « autres questions posées » : pas encore fait
- Outil de mots-clés (si connecté) : treg → Serpstat g_fr, appelé le 2026-09-26 (0,007 $) ; « pige auto », « logiciel pige automobile », « sourcing vo », « contacter vendeur leboncoin » n'ont retourné aucune ligne Serpstat malgré des impressions Search Console réelles : se fier à la Search Console pour ces requêtes
- Prompts trackés dans l'outil de visibilité IA (si connecté) : aucun outil connecté
- Pages concurrentes analysées : aucune à ce stade ; pistoneo.com et inspectoo.fr analysés côté AlertDeals (2026-09-20/21)
