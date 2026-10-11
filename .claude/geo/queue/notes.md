# Notes de lot (décisions et conventions découvertes pendant la production)

- 2026-09-26 : le site n'a pas de dossier blog. Convention retenue, identique à AlertDeals : `src/pages/blog/<slug>.astro`, un registre `src/data/articles.ts` alimentant `src/pages/blog/index.astro`, et une règle `/blog/` dans `sectionMeta()` de `astro.config.mjs`.
- Classes Tailwind du site : `text-text`, `text-text-secondary`, `bg-card`, `border-border`, `text-accent`, `bg-accent` (voir `src/styles/global.css`). Ne pas reprendre les classes AlertDeals (`text-ink`, `bg-tint`…).
- Voix : vouvoiement (le site vouvoie), à la différence d'AlertDeals.
- Auteur : à confirmer par Nassim ; en attendant, signer « L'équipe Auto-Prospect » sans schema Person inventé.
- 2026-09-27 (item-002) : les étapes réelles du Kanban de l'app sont Nouveau / Contacté / Relance / Gagné / Perdu (`auto-prospect-app/packages/shared/src/config/lead.config.ts`) ; la page `/fonctionnalites/crm-pipeline-vente` en décrit d'autres. Toujours vérifier une affirmation produit dans le code de l'app avant de l'écrire (rappels masqués par `SHOW_REMINDERS = false`, donc à ne pas citer).
- 2026-09-27 : titre SEO avec le suffixe « | Auto-Prospect » (règle « aucun tiret cadratin »). Les briefs de `seo/briefs/` sont committés : pas de marqueur entre crochets, écrire « À vérifier : ».
- 2026-09-28 (items 008/009, loi du 11 août 2026) : faits vérifiés aux sources primaires, à reprendre tels quels dans les articles.
  - Consentement préalable : art. **L223-1 c. consommation**, en vigueur au 11/08/2026 (décret n° 2026-662 du 23 juillet 2026). Interdit d'appeler « un consommateur qui n'a pas préalablement exprimé son consentement ». Consentement = manifestation « libre, spécifique, éclairée, univoque et révocable » par acte positif clair ; **la preuve incombe au professionnel**.
  - **Périmètre : B2C uniquement.** Le B2B reste sur l'intérêt légitime, avec droit d'opposition simple et gratuit (CNIL). Enjeu pour Auto-Prospect : le vendeur particulier sur Leboncoin **est** un consommateur — la loi touche donc le cœur du métier des clients.
  - **Bloctel disparaît** : ancien art. L223-4 abrogé au 11/08/2026. Logique inversée : opt-out → opt-in, le silence vaut refus.
  - Horaires (consentement recueilli) : lun-ven, 10h-13h et 14h-20h. Un décret fixe jours, horaires et fréquence ; le consommateur peut consentir explicitement à être appelé hors de ces plages.
  - Exception : sollicitation « relative à l'exécution d'un contrat en cours » — **inapplicable à un premier contact**, ne pas s'en servir comme échappatoire dans les articles.
  - Sanction citable sans risque : **nullité du contrat** conclu à la suite d'un démarchage illégal, et responsabilité présumée du professionnel qui en a tiré profit.
  - `À vérifier :` les montants d'amende administrative (personne physique / morale) et si les SMS et messageries électroniques sont visés ou seulement la voix — non confirmés, deux sources (economie.gouv.fr, actu-juridique) renvoient 403. Ne pas avancer de chiffre sans l'avoir.
  - Sources : legifrance.gouv.fr (L223-1 à L223-7, version 11/08/2026), cnil.fr (prospection par téléphone hors automate d'appel), legifrance.gouv.fr (décret n° 2026-662).
  - Angle juridique à tenir dans les deux articles : **répondre à une annonce publiée par un vendeur n'est pas du démarchage au sens de L223-1** — le vendeur sollicite lui-même des contacts en publiant. C'est ce qui rend l'usage d'Auto-Prospect licite, et c'est la nature du contact qui le justifie, pas l'ordre des propositions. Ne jamais présenter la séquence achat-puis-service comme une astuce de contournement. Zone à faire relire : consigner dans le brief (« À vérifier : ») toute affirmation de licéité, sans marqueur dans l'article.
- 2026-10-04 (item-008 produit) : `cycle.py` tire les lots par ordre alphabétique de fichier, sans lire la mention « priorité : HAUTE » ; le lot `agent-*` passe donc avant `lot-*`. Vérifier les priorités à la main avant de suivre `seo/prochain.json`.
  - Légifrance et economie.gouv.fr bloquent la lecture automatique (vérification anti-robot) : passer par les fiches CNIL, lisibles, et consigner dans le brief ce qui n'a pas été relu à la source.
  - Cadre retenu dans l'article, à reprendre pour `agent-2026-40-001` et l'item-009 : l'appel vocal relève de L223-1 c. conso. ; les envois automatisés (vocal sur répondeur, SMS, WhatsApp) relèvent de L34-5 CPCE, antérieur à 2026 ; les deux se déclenchent sur le caractère de prospection (promotion d'un bien ou d'un service). Une offre d'achat en réponse à une annonce n'en est pas une ; une proposition de service (dépôt-vente, mandat) en est une. Cette seconde partie contredit la note du 2026-09-28 sur l'item-009 : à faire trancher par Nassim avant de produire l'item-009.
  - Produit : l'app stocke la mention Leboncoin de refus du démarchage (`ads.accept_salesmen`) sans filtrer les envois. Ne pas écrire qu'Auto-Prospect respecte cette mention tant que ce n'est pas le cas.
- 2026-10-10 (règle permanente, demande de Nassim) : **ne jamais nommer un
  fournisseur, une API ou un service technique qu'Auto-Prospect utilise** dans un
  contenu publié. Trouver ces outils a coûté du temps de recherche, c'est un
  avantage concurrentiel qu'un partenaire ou un concurrent ne doit pas pouvoir
  lire dans un article. Règle complète en § 15 de `profile.md` et dans le
  `CLAUDE.md` du dépôt.
  - Interdits : fournisseur de collecte d'annonces, scraping, proxy,
    enrichissement ; fournisseur de SMS, d'appels, de vocal, de WhatsApp, de
    messagerie marketplace, d'email ; base de données et son hébergeur, ORM, file
    de jobs, cache, hébergeur de l'app, logs, monitoring ; modèles et
    fournisseurs d'IA ; et tout détail d'implémentation (nom de table ou de
    colonne, chemin de fichier du dépôt applicatif, variable d'environnement,
    endpoint, nom de worker ou de webhook).
  - Autorisé car déjà public : les trois marketplaces (Leboncoin, AutoScout24,
    La Centrale) sans jamais dire comment leurs annonces sont récupérées ;
    Stripe sur le paiement uniquement ; les canaux en tant que canaux (WhatsApp,
    messagerie Leboncoin, vocal sur répondeur) sans nommer qui les achemine.
  - Ces notes et les briefs de `seo/briefs/` ne sont pas publiés : ils peuvent
    continuer à citer les chemins de fichiers de l'app, c'est utile pour
    vérifier une affirmation produit. Ce qui change, c'est ce qui sort dans
    `src/`. Ne jamais recopier un passage technique d'un brief vers un article.
  - Attention particulière sur les comparatifs (`comparison-page`, dont
    `agent-2026-41-001`) : comparer Auto-Prospect à un concurrent pousse à
    expliquer comment il fonctionne. Décrire le résultat pour l'utilisateur
    (temps réel, exclusivité des prospects, zones illimitées), jamais la
    plomberie qui le produit.
  - Un chiffre issu de nos données se cite « données internes Auto-Prospect,
    N annonces, période », sans nommer la base, le schéma ni le rôle de lecture.
  - Vérification avant publication : `pnpm check:leaks` (scan de `src/` et
    `public/`, également en CI via `.github/workflows/no-stack-leaks.yml`).

## 2026-10-10 : méthode de mesure des redirections, et cause de non-indexation

- **Ne jamais lire un code de redirection avec `curl -w "%{http_code}"`.** Cette
  option renvoie le statut du **dernier** saut de la chaîne, pas celui de la
  redirection. C'est ce qui a produit la mention « www redirige en 307 » de
  `profile.md`. La bonne commande : `curl -s -I <url>` et lire la première ligne
  `HTTP/...` (ou `-I -L` pour toute la chaîne).
- **État réel vérifié le 2026-10-10** : `www` vers l'apex en **308 Permanent
  Redirect**, HTTP vers HTTPS en **308**. Permanent dans les deux cas, rien à
  corriger côté Vercel. 301 est « Moved Permanently », 308 « Permanent
  Redirect », 307 « Temporary Redirect » : seul 307 est temporaire.
- **Cause d'une non-indexation, corrigée dans la PR 34** : chaque URL répondait
  200 avec et sans barre finale, les liens internes pointaient vers la version
  sans barre et les canonicals déclaraient celle avec. Google suivait un lien,
  lisait un canonical désignant une autre URL, et laissait la page en
  « détectée, jamais explorée ». `trailingSlash` n'était pas défini dans
  `astro.config.mjs` ; il vaut désormais `"always"`.
- Piège associé : `pageType()` de `src/lib/tracking.ts` comparait `pathname` au
  littéral `"/tarifs"`. Avec `trailingSlash: "always"` la condition n'aurait plus
  jamais été vraie et la segmentation d'audience Meta aurait cessé de classer la
  page tarifs. Toute comparaison de `pathname` à un littéral doit accepter les
  deux formes.
- À retenir pour les mesures : ce site part d'une bien meilleure situation que
  le dépôt AlertDeals (142 requêtes réelles en Search Console, « pige auto » à
  1 077 impressions sur 90 jours, position 7,5). Ne pas transposer le diagnostic
  « rien n'est indexé » d'AlertDeals.

## 2026-10-11 (item `agent-2026-40-001`, WhatsApp et vocal)

- **Écart entre le produit et la copy publique** : l'app implémente **quatre**
  canaux de contact (WhatsApp, SMS, vocal sans sonnerie, messagerie Leboncoin),
  la copy publique du site n'en annonce que **trois** (messagerie Leboncoin,
  WhatsApp, vocal). L'article s'en tient aux trois canaux publics et traite le
  SMS comme un canal du marché à déconseiller en premier contact, sans dire
  qu'Auto-Prospect l'envoie. Aligner la copy publique sur quatre canaux est une
  décision de Nassim, pas de l'agent SEO : à trancher avant le prochain article
  du cluster « contact automatique vendeurs » (item-005).
- **Pas de taux de réponse chiffré par canal** : calculable depuis les données
  de l'app, mais le volume constaté (environ 1 150 messages, dominés par un seul
  canal) rendrait un chiffre publié fragile. Reporté à un article de
  statistiques dédié quand le volume suivra. Réserve consignée dans le brief.
- **Lignes de plus de 500 caractères** : les réponses longues de la FAQ
  dépassaient la limite de la CI `no-long-lines`. Solution retenue, à réutiliser :
  couper la chaîne en littéraux concaténés par `+`, en gardant l'espace de fin
  sur chaque morceau pour ne pas souder deux mots. Le texte du JSON-LD reste
  identique. La CI ne scanne pas `public/llms.txt` (extensions `.txt` hors
  périmètre), mais garder les lignes courtes là aussi.
- **Maillage retour à poser** : les hubs `/fonctionnalites/contact-multicanal`
  et `/fonctionnalites/contact-vocal-automatique` ne pointent pas encore vers
  cet article. À faire dans une passe `internal-linking`, pas dans la PR de
  l'article.

## 2026-10-12 : feature « appels entrants identifiés » (demande de Nassim)

- Feature livré dans l'app (branche `feat/show-ad-information-at-call`, non fusionnée au 2026-10-12) : quand un vendeur rappelle le numéro dédié du compte, l'utilisateur entend l'annonce avant de décrocher (« Appel Auto-Prospect. Peugeot 208 2019, 9900 euros, Lyon. »), l'appel s'affiche dans le CRM avec l'annonce (même manqué) et son issue est notée sur le lead. Nassim le considère comme le feature le plus différenciant : à mettre en avant dans tout contenu qui parle du contact des vendeurs.
- Vocabulaire publié : « appels entrants identifiés », « annonce vocale avant de décrocher », « numéro Auto-Prospect dédié ». **Jamais « whisper »** (mot interdit par `check:leaks`, fournisseur de transcription), ni « transfert d'appel via … », ni le nom de l'opérateur, ni « webhook ».
- Hub créé : `/fonctionnalites/appels-entrants-identifies/`. Article : `/blog/rappel-vendeur-particulier-identifier-annonce/`. Brief : `seo/briefs/2026-10-12-appels-entrants-identifies.md` (réserves : branche app non fusionnée, attribution manuelle du numéro, prix du numéro non tranché, caller id vocal à confirmer).
- L'item `agent-2026-40-001` (WhatsApp / vocal) doit mentionner le feature dans sa section vocal et lier le hub.
- Canonical des articles : le `const canonical` du JSON-LD doit porter la barre finale (`/blog/<slug>/`), comme le `<link rel="canonical">` du Layout et le sitemap. Les quatre articles antérieurs ont été alignés le 2026-10-12.
- 2026-10-12, relecture de Nassim : **ne jamais écrire « numéro Auto-Prospect », « numéro dédié » ou « numéro attribué »** dans un contenu publié. Le client n'a pas à savoir qu'un numéro lui est assigné : dire « quand un vendeur vous rappelle » et « vos messages donnent aux vendeurs votre numéro à rappeler ». Aucune mécanique (numéro d'appelant, variable de modèle) dans le marketing.
