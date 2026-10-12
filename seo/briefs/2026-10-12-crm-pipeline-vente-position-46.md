# Brief PR-ready — Auto-Prospect — Retravailler `/fonctionnalites/crm-pipeline-vente`

Date : 2026-10-12
Statut : brief prêt
Priorité : P1

## Opportunité source

- Produit : Auto-Prospect
- Cible : marchands et revendeurs VO, mandataires auto, qui sourcent auprès des particuliers
- Type : optimisation
- Source : Google Search Console, 28 jours au 2026-10-09
- Signal réel : 125 impressions, 0 clic, position moyenne 46,6. La requête
  « crm automobile » apporte 96 impressions sur la période et atterrit sur cette page.
  C'est la seule page du site à cumuler un vrai volume d'impressions et une position
  au-delà de la page 4 : l'intention est là, la page ne se classe pas.
- Hypothèse : la page répond en termes de fonctionnalité (« pipeline de vente ») là où
  la requête est un nom de catégorie (« crm automobile »). L'article
  `/blog/crm-automobile-marchand-vo`, indexé le 2026-10-10, vise la même requête :
  le risque est qu'ils se cannibalisent au lieu de se renforcer.

## Objectif de la PR

Faire de cette page le hub de la requête « crm automobile » et pointer l'article vers
elle, plutôt que l'inverse. Reprendre le titre et la réponse de tête sur le nom de
catégorie, puis mailler l'article en appui.

## Réponse extractible (en tête de page, 60 à 90 mots)

À écrire à la production, sur ce canevas : ce qu'est un CRM automobile pour un marchand
qui achète aux particuliers, ce qu'il suit (annonce, vendeur, échange, issue), et en quoi
le suivi démarre dès le premier contact plutôt qu'à la vente. Reprendre les termes
exacts des fonctionnalités réellement livrées, sans nommer l'infrastructure.

## Structure H2/H3

- H2 : Ce qu'un CRM automobile doit suivre quand on achète aux particuliers
- H2 : Du premier contact à l'achat : les étapes réelles d'un pipeline VO
- H2 : Ce que le suivi manuel fait perdre (tableur, notes, messages dispersés)
- H2 : Les appels entrants identifiés dans le pipeline
- H2 : Questions fréquentes

## FAQ

1. Qu'est-ce qu'un CRM automobile : réponse courte, centrée sur l'achat aux particuliers.
2. En quoi diffère-t-il d'un CRM de concession : la concession suit des ventes, le
   marchand VO suit des achats et des vendeurs à recontacter.
3. Peut-on suivre les vendeurs qui rappellent : oui, lier vers
   `/fonctionnalites/appels-entrants-identifies`.
4. Faut-il un CRM quand on fait moins de dix achats par mois : réponse honnête, sans
   survendre.

## JSON-LD

- WebPage ou Product avec dateModified à jour
- FAQPage sur la section Questions fréquentes
- BreadcrumbList

Vérifier qu'aucun nom de fournisseur ni détail d'implémentation n'entre dans le JSON-LD.

## Liens internes

- Depuis l'article `/blog/crm-automobile-marchand-vo` vers cette page, en lien contextuel
  sur le nom de catégorie, pour désigner le hub sans ambiguïté.
- Vers `/fonctionnalites/appels-entrants-identifies` et
  `/fonctionnalites/contact-multicanal`, pages sœurs du cycle de contact.
- Depuis `/solutions/marchand-vehicules-occasion`, qui porte 118 impressions.

## Appel à l'action

- Principal : créer un compte et suivre un premier vendeur de bout en bout.
- À éviter : promesses d'automatisation, « sans risque », « garanti ».

## Drapeaux fact-check

- [FACT-CHECK HUMAIN] toute fonctionnalité décrite doit exister dans l'app au jour de la
  production, et tout chiffre issu de nos données se cite « données internes
  Auto-Prospect, N annonces, période », sans nommer la base ni le schéma.

## Definition of Done mesurable

- URL publique en 200 avec slash final, indexable, dans le sitemap
- Canonique vers la forme apex avec slash, comme le reste du site
- Mesure à J+7, J+14, J+28 : impressions, clics, position sur « crm automobile »
- Objectif de contrôle : sortir de la position 46 sur « crm automobile » ; une position
  encore au-delà de 30 à J+28 signifie que le problème n'était pas la page.
