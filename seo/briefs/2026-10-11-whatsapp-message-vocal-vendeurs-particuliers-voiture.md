# Brief : whatsapp-message-vocal-vendeurs-particuliers-voiture

- **Item** : `agent-2026-40-001` (lot `agent-2026-40`, skill `foundational-article`)
- **Date de production** : 2026-10-11
- **Slug** : `/blog/whatsapp-message-vocal-vendeurs-particuliers-voiture/`
- **Branche** : `geo/2026-10-11-whatsapp-message-vocal-vendeurs-particuliers`

## Cible de recherche

- Prompt IA à zéro citation (source `.protocole/seo.json`, prompt n° 4) :
  « Existe-t-il un outil qui envoie des messages WhatsApp ou vocaux aux vendeurs
  particuliers de voitures ? »
- Requête associée : « prospection whatsapp automobile ».
- Cluster : contact automatique vendeurs. Hub :
  `/fonctionnalites/contact-vocal-automatique`.

## Angle retenu

Le prompt est une question d'existence d'outil : la réponse extractible doit
donc tenir en tête d'article, dire que oui, ces outils existent, nommer les
trois canaux réellement utilisés et la contrainte juridique qui les encadre.

Le reste de l'article est un guide de méthode canal par canal (quand utiliser
WhatsApp, quand utiliser le vocal sur répondeur, quand rester sur la messagerie
de la plateforme), avec ce qu'on écrit dans le message et les erreurs qui
coupent le taux de réponse. C'est ce qui le distingue des deux pages hub, qui
décrivent la capacité produit, et de l'article du 4 octobre, qui traite le
droit.

## Ce qui a été vérifié dans le dépôt de l'app (interne, ne sort pas)

- Canaux réellement implémentés, `packages/shared/src/config/message.config.ts`,
  `CONTACT_CHANNEL_DEFINITIONS` : `whatsapp_text` (Message WhatsApp),
  `sms` (SMS), `ringless_voice` (Message Vocal, sans sonnerie),
  `leboncoin` (Messagerie Leboncoin). Soit **quatre** canaux dans le produit,
  alors que la copy publique du site en annonce **trois** (messagerie Leboncoin,
  WhatsApp, vocal).
  - Décision : l'article reste sur les trois canaux de la copy publique. Le SMS
    est traité comme un canal du marché, à déconseiller en premier contact,
    sans dire qu'Auto-Prospect l'envoie. Aligner un jour la copy publique sur
    les quatre canaux est une décision de Nassim, pas de l'agent SEO.
- Étapes du CRM : Nouveau / Contacté / Relance / Gagné / Perdu
  (`packages/shared/src/config/lead.config.ts`). Reprises à l'identique quand
  l'article les cite.
- Le vocal est bien « sans sonnerie » (dépôt direct sur répondeur), ce qui est
  la formulation produit déjà publique.

## Confidentialité de la stack (§ 15 du profil)

- Le fichier de config de l'app nomme le prestataire qui achemine les messages
  Leboncoin. **Ce nom ne sort pas** et n'apparaît nulle part dans l'article.
- Rien sur la façon dont les annonces sont collectées, ni sur l'acheminement
  des messages. L'article décrit le résultat pour l'utilisateur.
- Chiffres produit cités : uniquement les chiffres canoniques déjà publics
  (69 € HT/mois annuel, 89 € HT sans engagement, 0,19 € HT par vocal, essai
  5 jours, 273 professionnels).
- Vérification avant commit : `pnpm check:leaks`.

## Cadre juridique repris (déjà sourcé le 2026-09-28 et le 2026-10-04)

- Appel vocal de prospection d'un consommateur : consentement préalable,
  article L223-1 du Code de la consommation, en vigueur au 11 août 2026.
- Envois automatisés (vocal sur répondeur, SMS, messages écrits) : article
  L34-5 du Code des postes et des communications électroniques, antérieur
  à 2026, consentement préalable déjà exigé pour la prospection directe.
- Point de bascule tenu dans l'article : répondre à une annonce publiée par un
  vendeur qui sollicite lui-même des contacts n'est pas de la prospection
  commerciale au sens de ces textes. Une proposition de service en est une.
  Formulé sans le présenter comme un contournement.
- Pas de montant d'amende cité dans cet article : les montants restent à
  vérifier (note du 2026-09-28), et l'article du 4 octobre porte déjà le sujet.

## À vérifier (réserves, ne figurent pas dans l'article)

- `À vérifier :` l'article ne cite aucun taux de réponse chiffré par canal. Les
  données de l'app permettraient de calculer un taux de réponse réel par canal
  (`messages` par canal croisés aux `leads` passés en Relance ou Gagné), mais
  le volume constaté le 2026-09-26 est faible (environ 1 150 messages) et le
  canal Leboncoin domine : un taux publié sur cette base serait fragile. À
  reprendre quand le volume le permettra, en article de statistiques dédié.
- `À vérifier :` les conditions d'utilisation de WhatsApp Business pour un
  premier contact non sollicité avec un particulier. L'article s'en tient à ce
  qui est vérifiable (le numéro doit être affiché dans l'annonce, le message
  doit identifier le professionnel) sans affirmer la position de la plateforme.
- `À vérifier :` l'app stocke la mention Leboncoin de refus du démarchage sans
  filtrer les envois (note du 2026-10-04). L'article ne dit donc pas
  qu'Auto-Prospect respecte cette mention. À reprendre si le filtrage est
  implémenté.

## Maillage interne

Sortants depuis l'article :
- `/fonctionnalites/contact-vocal-automatique/` (hub du cluster)
- `/fonctionnalites/contact-multicanal/`
- `/blog/loi-11-aout-2026-demarchage-prospection-vendeurs-particuliers/`
- `/blog/prospection-automobile-methode/`
- `/blog/crm-automobile-marchand-vo/`
- `/solutions/pige-automobile/`
- `/tarifs/`

Entrants à ajouter plus tard : un lien depuis
`/fonctionnalites/contact-vocal-automatique/` et depuis
`/fonctionnalites/contact-multicanal/` vers cet article, à faire dans une passe
de maillage interne et pas dans cette PR.
