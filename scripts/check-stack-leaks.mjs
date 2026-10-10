#!/usr/bin/env node
/**
 * Vérifie qu'aucun nom de fournisseur, service technique ou détail
 * d'implémentation n'apparaît dans un contenu publié.
 *
 * Règle complète : CLAUDE.md et § 15 de .claude/geo/profile.md
 *
 * Scanne ce qui est servi au public (src/, public/) et laisse de côté les
 * fichiers internes non publiés (.claude/, seo/), qui ont le droit de
 * détailler la méthode.
 *
 * Usage : node scripts/check-stack-leaks.mjs
 * Sortie : code 1 et liste des fuites, ou code 0.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

/** Dossiers servis au public : tout ce qui s'y trouve est lisible par un concurrent. */
const SCANNED_DIRS = ["src", "public"];

/** Internes, non publiés : ils peuvent et doivent détailler la plomberie. */
const IGNORED_DIRS = new Set([
  "node_modules",
  "dist",
  ".astro",
  ".git",
  ".claude",
  ".protocole",
  "seo",
  "autorite",
  "concurrents",
  "prospects",
  "images",
  "reels",
]);

const SCANNED_EXT = new Set([
  ".astro", ".ts", ".tsx", ".js", ".jsx", ".mjs",
  ".md", ".mdx", ".json", ".txt", ".html", ".xml", ".css",
]);

/**
 * Fournisseurs et briques techniques à ne jamais nommer publiquement.
 * Chaque entrée : motif + libellé affiché dans l'erreur.
 * Les exceptions autorisées (Stripe, marketplaces, canaux) ne sont pas listées.
 */
const FORBIDDEN = [
  // Collecte d'annonces, scraping, proxies, enrichissement
  { re: /\blobstr\b/i, label: "fournisseur de collecte d'annonces" },
  { re: /\b(apify|phantombuster|scrapingbee|scraperapi|zenrows|bright\s?data|oxylabs|smartproxy|brightdata|serpapi|zyte|crawlbase)\b/i, label: "service de scraping ou de proxy" },
  { re: /\b(clay\.com|dropcontact|hunter\.io|apollo\.io|lusha|kaspr|fullenrich|datagma)\b/i, label: "service d'enrichissement de données" },

  // Communication : SMS, voix, WhatsApp, email
  { re: /\btwilio\b/i, label: "fournisseur de SMS, voix ou WhatsApp" },
  { re: /\b(vonage|nexmo|sinch|messagebird|plivo|telnyx|bandwidth\.com|brevo|sendinblue|ovh\s?sms|smsmode|octopush|allmysms)\b/i, label: "fournisseur de messagerie ou de téléphonie" },
  { re: /\b(aircall|ringover|axialys|kavkom|3cx|twenty\s?four\s?seven)\b/i, label: "fournisseur de téléphonie" },
  { re: /\b(resend|sendgrid|mailgun|postmark|mailjet|amazon\s?ses|aws\s?ses|mandrill|sparkpost|lemlist|instantly\.ai|smartlead|lumail)\b/i, label: "fournisseur d'email" },
  { re: /\bwhatsapp\s+(business\s+)?(api|cloud\s+api|platform)\b/i, label: "API WhatsApp (nommer le canal est OK, l'API non)" },

  // Voix de synthèse et transcription
  { re: /\b(elevenlabs|eleven\s?labs|deepgram|assemblyai|whisper|retell|bland\.ai|vapi\.ai|playht|play\.ht|cartesia|speechmatics)\b/i, label: "fournisseur de voix ou de transcription" },

  // Infrastructure
  { re: /\bsupabase\b/i, label: "hébergeur de base de données" },
  { re: /\b(drizzle|prisma|typeorm|sequelize|knex)\b/i, label: "ORM" },
  { re: /\b(bullmq|bull\s?board|rabbitmq|kafka|sidekiq|celery|temporal\.io|inngest|trigger\.dev|qstash)\b/i, label: "file de jobs" },
  { re: /\b(upstash|redis|memcached|elasticache)\b/i, label: "cache ou base clé-valeur" },
  { re: /\b(railway\.app|render\.com|fly\.io|heroku|digitalocean|scaleway|hetzner|neon\.tech|planetscale|cockroachdb)\b/i, label: "hébergeur d'infrastructure" },
  { re: /\b(sentry|datadog|new\s?relic|grafana|logtail|betterstack|axiom\.co|posthog|mixpanel|amplitude)\b/i, label: "service de logs, monitoring ou analytics" },

  // IA
  { re: /\b(openai|anthropic|\bgpt-[0-9]|chatgpt\s+api|claude\s+(api|opus|sonnet|haiku|fable)|mistral\s?ai|cohere|deepseek|perplexity\s+api|gemini\s+api|llama\s?[0-9])\b/i, label: "fournisseur ou modèle d'IA" },

  // Détails d'implémentation
  { re: /\bauto-prospect-app\b/i, label: "chemin du dépôt applicatif" },
  { re: /\b(apps\/(web|worker)|packages\/(db|shared|whatsapp))\//i, label: "chemin de fichier interne" },
  { re: /\bautoprospect_readonly\b/i, label: "rôle de base de données" },
  { re: /\bSUPABASE_[A-Z_]+\b/, label: "variable d'environnement interne" },
  { re: /\b(LOBSTR|TWILIO|REDIS|BULLMQ)_[A-Z_]+\b/, label: "variable d'environnement interne" },
  { re: /\bsquid\s?id\b/i, label: "détail de la collecte d'annonces" },
  { re: /\b(leboncoin_message_run|unmapped_values|needs_review)\b/i, label: "nom de table ou de colonne interne" },
  { re: /\bwebhooks?\/lobstr\b/i, label: "endpoint interne" },
  { re: /\bprod\.seed\.sql\b/i, label: "fichier de seed interne" },
];

/** Faux positifs connus : "fichier publié:motif à ignorer". */
const ALLOWED = [
  // robots.txt et llms.txt doivent nommer les bots IA pour les autoriser.
  { file: /^public\/robots\.txt$/, re: /\b(anthropic|claude|openai|gpt|perplexity)\b/i },
  { file: /^public\/llms\.txt$/, re: /\b(anthropic|claude|openai|gpt|perplexity)\b/i },
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (IGNORED_DIRS.has(name) || name.startsWith(".DS_Store")) continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full, out);
    else if (SCANNED_EXT.has(extname(name))) out.push(full);
  }
  return out;
}

const files = SCANNED_DIRS.flatMap((d) => walk(join(ROOT, d)));
const leaks = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, "utf8").split("\n");

  lines.forEach((line, i) => {
    for (const { re, label } of FORBIDDEN) {
      const match = line.match(re);
      if (!match) continue;

      const excused = ALLOWED.some(
        (a) => a.file.test(rel) && a.re.test(match[0]),
      );
      if (excused) continue;

      leaks.push({
        file: rel,
        line: i + 1,
        match: match[0],
        label,
        excerpt: line.trim().slice(0, 160),
      });
    }
  });
}

if (leaks.length === 0) {
  console.log(`OK — aucune fuite de stack dans ${files.length} fichiers publiés.`);
  process.exit(0);
}

console.error(
  `\n${leaks.length} fuite(s) potentielle(s) de stack dans un contenu publié :\n`,
);
for (const l of leaks) {
  console.error(`  ${l.file}:${l.line}  « ${l.match} » — ${l.label}`);
  console.error(`    ${l.excerpt}\n`);
}
console.error(
  "Règle : CLAUDE.md et § 15 de .claude/geo/profile.md.\n" +
    "Décrire la capacité, pas l'outil. Faux positif : ajouter une entrée dans ALLOWED.\n",
);
process.exit(1);
