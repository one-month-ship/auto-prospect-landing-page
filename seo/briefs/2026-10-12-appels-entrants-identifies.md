# Brief de relecture : feature « appels entrants identifiés » (page, accueil, article)

Produit le 2026-10-12 à la demande de Nassim, hors cycle de l'agent. Branche `feat/incoming-calls` du site. Livrables :

- Page fonctionnalité `/fonctionnalites/appels-entrants-identifies/` (nouvelle, `src/pages/fonctionnalites/appels-entrants-identifies.astro`)
- Section « Nouveau » sur la page d'accueil (`src/components/IncomingCalls.astro`, placée après « Comment ça marche »), carte mise en avant dans la grille Fonctionnalités, étape 3 de « Comment ça marche », question dans la FAQ
- Article `/blog/rappel-vendeur-particulier-identifier-annonce/` (skill `foundational-article`, item `appels-entrants-001`, priorité haute)
- Mentions et liens : contact vocal (section + FAQ), contact multicanal, CRM (puce), comparatif (ligne + FAQ), pige automobile (ligne du tableau), footer, `llms.txt`, JSON-LD de la home (FAQPage, HowTo, SoftwareApplication), meta keywords
- Correction d'indexation annexe : le `canonical` du JSON-LD des quatre articles existants pointait sans barre finale alors que le `<link rel="canonical">` du Layout et le sitemap pointent avec ; aligné sur la forme avec barre

## Ce que fait le feature (vérifié dans le code de l'app le 2026-10-12)

Source : `auto-prospect-app`, branche `feat/show-ad-information-at-call`, commit 5a08c27 ; `plan-appels-entrants-twilio.md`, `packages/shared/src/config/incoming-call.config.ts`, `apps/worker/src/services/incoming-call.service.ts`, `apps/worker/src/config/worker.config.ts`, `apps/web/src/components/settings/incoming-calls-card.tsx`, `apps/web/src/components/layout/incoming-call-banner.tsx`.

- Un numéro dédié par compte (`accounts.twilio_phone_number`), attribué à la main par l'équipe (« Notre équipe l'active pour toi à la validation de ton essai » dans la carte réglages). L'utilisateur renseigne lui-même la ligne de renvoi (`call_forwarding_phone_number`).
- Ce numéro est le caller id du message vocal et la valeur de la variable `{{telephone}}` des templates écrits (`getAccountCallbackPhoneNumber`). Sans numéro attribué : WhatsApp donne le numéro WhatsApp du compte, les autres canaux la ligne de renvoi.
- À l'appel : le vendeur est identifié par son numéro (`ads.phone_number`, E.164), l'annonce retenue est celle du lead du compte contacté en dernier (dernier message SENT, puis `updatedAt`). Transfert sur la ligne de renvoi, `answerOnBridge` : le vendeur entend une sonnerie pendant l'annonce vocale.
- Texte lu : préfixe « Appel Auto-Prospect. » puis marque, modèle, année (ou le titre de l'annonce si marque/modèle absents), prix arrondi en euros, ville. Inconnu : « Appel Auto-Prospect, annonce non identifiée. » Voix française de synthèse.
- Sonnerie 20 secondes puis appel manqué ; le vendeur entend alors « Votre correspondant n'est pas disponible pour le moment. Merci de réessayer plus tard. » et l'appel est raccroché (pas de messagerie vocale côté vendeur).
- CRM : bandeau vert (rafraîchi toutes les quelques secondes) avec véhicule, prix, numéro du vendeur, lien « Voir l'annonce » vers le lead ; statuts En cours / Répondu / Manqué / Échoué ; le bandeau reste jusqu'à ce que l'utilisateur le ferme ou ouvre l'annonce. Note ajoutée sur le lead : « Appel entrant du vendeur : répondu (2 min 10 s) » ou « manqué ».
- Caller id présenté à l'agence : le numéro du vendeur (comportement par défaut, point ouvert dans le plan), donc rappel possible depuis le mobile.

## Réserves à vérifier par un humain

- À vérifier, bloquant pour la mise en ligne : la branche `feat/show-ad-information-at-call` de l'app n'est pas fusionnée dans `main` au 2026-10-12, et la migration, les variables d'environnement et la configuration du numéro restent à faire à la main (section « À FAIRE PAR TOI » du plan). Fusionner la PR du site après, ou en même temps que, la mise en production du feature : tout le contenu parle au présent.
- À vérifier : l'attribution du numéro est manuelle (« notre équipe l'active à la validation de votre essai »). La page et la FAQ reprennent cette formulation sans promettre de délai. Si la conformité opérateur prend ~72 h par agence (plan), prévoir une phrase sur le délai, ou automatiser avant de communiquer plus largement.
- Tranché par Nassim le 2026-10-12 : le numéro dédié est **inclus dans l'abonnement**. Ligne ajoutée à la liste « inclus » de `/tarifs` et de `Pricing.tsx`, mention dans `llms.txt`, la page hub, la page contact vocal et l'article.
- Tranché par Nassim le 2026-10-12 : le numéro à rappeler est **écrit dans le texte des messages**, pas présenté comme numéro d'appelant. Ce niveau de détail ne doit pas apparaître dans un contenu marketing : toutes les formulations « part avec votre numéro comme appelant » ont été remplacées par « vos messages donnent aux vendeurs votre numéro Auto-Prospect à rappeler ».
- À vérifier : « À ce jour, aucun autre outil de pige automobile n'identifie les rappels des vendeurs » (page fonctionnalité, comparatif, `llms.txt`). Affirmation cohérente avec le dossier concurrents du 2026-09-26 (Prospelia, Inspectoo, Pistoneo : aucun ne décrit ce mécanisme), non revérifiée sur leurs sites ce jour. Refaire un passage avant publication ou adoucir en « rare sur le marché ».
- À vérifier : l'article affirme que le vendeur « ne rappelle presque jamais une seconde fois » et que le rappel doit se faire « dans l'heure ». Ce sont des règles de pratique, sans chiffre : formulées comme telles (aucun pourcentage avancé). Si un chiffre first-party devient disponible (part des appels manqués rappelés par le vendeur, table `incoming_calls`), le substituer.
- À vérifier : l'article dit que le vendeur « entend une sonnerie » pendant l'annonce vocale. Exact selon `answerOnBridge`, à confirmer à l'oreille sur un vrai appel.
- À vérifier, juridique : la FAQ de l'article avance que rappeler un vendeur qui a appelé n'est pas une sollicitation. Raisonnement de bon sens cohérent avec l'article loi du 11 août 2026, non sourcé à une position officielle : l'article renvoie à l'article loi et à la relecture juridique déjà recommandée dans le brief du 2026-10-04.
- Chiffre réutilisé à l'identique : 35 122 annonces, 47,9 % d'annonces Leboncoin avec téléphone (article statistiques).
- Stack : aucun nom de fournisseur, d'API, de webhook ni de route dans `src/` ou `public/`. Le mot « whisper » est interdit par `check:leaks` (fournisseur de transcription) : le feature est appelé « annonce vocale » ou « annonce lue avant de décrocher » dans tout le contenu publié. Vérifié par `pnpm check:leaks`.

## Intention et angle de l'article

Requêtes visées (longue traîne, sans volume mesuré) : « vendeur rappelle quelle annonce », « identifier appel vendeur leboncoin », « appel manqué vendeur particulier », « numéro dédié prospection automobile », « que dire quand un vendeur rappelle ». Angle propre : le rappel comme moment décisif et jamais préparé de la prospection automatique, quatre méthodes d'identification classées, deux scripts (connu / inconnu), la règle de l'heure pour l'appel manqué, puis le fonctionnement d'Auto-Prospect. Aucun concurrent nommé. Aucun appel treg payant.

## Maillage

Hub : `/fonctionnalites/appels-entrants-identifies/` (lien dans le corps et la FAQ). Liens sortants de l'article : article méthode, article statistiques, article loi, article CRM, contact vocal, CRM, page fonctionnalité. Liens entrants vers la page fonctionnalité : home (section, carte, FAQ), footer, contact vocal, contact multicanal, CRM, comparatif, pige automobile, article. Liens entrants vers l'article : `/blog` (index), article méthode (étape 4, date de mise à jour passée au 2026-10-12), `llms.txt`.

## Schema

Page fonctionnalité : BreadcrumbList, Service, HowTo (3 étapes), FAQPage (7 questions). Article : BlogPosting (author Organization « L'équipe Auto-Prospect »), HowTo (6 pratiques), FAQPage (7 questions), BreadcrumbList. Home : question ajoutée au FAQPage, étape 3 du HowTo et description de SoftwareApplication complétées (identiques au texte visible).

## Suivi proposé

- Ajouter le prompt « Existe-t-il un outil qui me dit pour quelle annonce un vendeur me rappelle ? » au suivi IA du lundi (item `appels-entrants-002`).
- Demander l'indexation de la page fonctionnalité et de l'article dans la Search Console après fusion (URL avec barre finale).
- `/tarifs` et la liste « inclus » mis à jour le 2026-10-12 (numéro dédié inclus).

## Complément du 2026-10-12 (relecture de Nassim)

- Ne jamais écrire « numéro Auto-Prospect », « numéro dédié » ou « numéro attribué » dans un contenu publié : du point de vue du client, c'est simplement son numéro. Toutes les occurrences ont été retirées (home, FAQ, JSON-LD, hub, contact vocal, contact multicanal, tarifs, article, `llms.txt`). L'article passe de quatre à trois méthodes d'identification (la méthode « numéro réservé à la prospection » est supprimée).
- Ligne tarifs retenue : « Appels entrants identifiés (le véhicule annoncé avant de décrocher) ».
