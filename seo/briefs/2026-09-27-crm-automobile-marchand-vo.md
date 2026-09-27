# Brief de relecture : /blog/crm-automobile-marchand-vo

Article de fond (skill `foundational-article`), item-002 du lot `premier-lot`, produit le 2026-09-27.

## Intention et angle
Requêtes : « crm automobile » (720/mois, difficulté 2, 443 impressions GSC en position 51), « crm auto » (720/mois). Le haut des résultats (relevé le 2026-09-27) est occupé par des CRM de concession et des logiciels VO orientés vente (leads acheteurs, stock, multidiffusion, devis). Angle propre : le pipeline d'ACHAT auprès des particuliers, que ces outils ne couvrent pas. Aucun concurrent nommé (règle du profil §7 et de la tâche).

## Affirmations produit vérifiées dans le code de l'app
- Cinq colonnes du Kanban : Nouveau, Contacté, Relance, Gagné, Perdu (`packages/shared/src/config/lead.config.ts`).
- Passage automatique en Contacté au premier message envoyé, en Relance au suivant (`apps/worker/src/services/message-status.service.ts`).
- Une annonce passée au-delà de « Nouveau » ne peut être prise qu'une fois par groupe (index unique `leads_owner_id_ad_id_active_key`, `lead.schema.ts`). Formulé dans l'article : « une annonce déjà contactée par un membre de l'équipe ne peut pas être reprise par un autre ».
- Notes, assignation à un membre de l'équipe, historique des messages : présents dans le drawer du lead.
- Les rappels (reminders) existent dans le code mais sont masqués (`SHOW_REMINDERS = false`) : volontairement NON mentionnés dans l'article.

## Réserves à vérifier par un humain
- À vérifier : Incohérence à trancher : la page `/fonctionnalites/crm-pipeline-vente` décrit les étapes « contacté, en discussion, rendez-vous, véhicule acheté » (et la FAQ « en négociation, rendez-vous »), alors que l'app a Nouveau / Contacté / Relance / Gagné / Perdu. L'article suit l'app. Aligner la page hub sur l'app (ou l'inverse) pour la cohérence d'entité.
- À vérifier : Le motif de perte est présenté comme une bonne pratique (champ de fiche, indicateur). L'app n'a pas de champ « motif de perte » dédié : l'article ne dit pas qu'Auto-Prospect le fournit, il le recommande (dans Auto-Prospect, il passe par les notes). À vérifier que la formulation ne laisse pas croire le contraire.
- À vérifier : « Taux de réponse par canal sans export » figure dans les critères de choix génériques ; l'app ne l'affiche pas encore à notre connaissance. L'article ne prétend pas qu'Auto-Prospect le fait.
- À vérifier : Le seuil « une trentaine de contacts par semaine » reprend l'article méthode (même source : usage observé, pas une statistique). Mention d'usage en bas de page.
- Chiffres réutilisés à l'identique depuis l'article statistiques (PR #24) : 35 122 annonces, 9,9 % de baisses de prix, 23,9 % pour 2022 et plus, 16,8 % de remises en ligne Leboncoin. AAA Data 55 % (véhicules de plus de cinq ans échangés entre particuliers) repris de l'article méthode.
- Titre SEO : suffixe « | Auto-Prospect » au lieu du tiret long utilisé dans le titre des autres pages, pour respecter la règle « aucun tiret cadratin ». À harmoniser si Nassim préfère.

## Maillage
Hub : `/fonctionnalites/crm-pipeline-vente` (lien dans le corps). Sœurs : `/blog/prospection-automobile-methode` (lien aller et retour ajouté dans l'étape 5 de la méthode), `/blog/statistiques-annonces-voitures-occasion-particuliers-2026`. Recommandé après fusion : lien depuis la page hub CRM vers l'article.

## Schema
BlogPosting (author Organization « L'équipe Auto-Prospect »), HowTo (5 étapes du pipeline), FAQPage (6 questions), BreadcrumbList.
