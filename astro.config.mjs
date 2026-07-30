import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { execSync } from "node:child_process";

// Domaine canonique : le site est servi sur www (l'apex fait un 307 vers www).
// Le sitemap et les canonicals doivent pointer vers l'URL finale, jamais vers une redirection.
const SITE = "https://www.auto-prospect.fr";

// lastmod réel par page = date du dernier commit git touchant le fichier source
function gitLastmod(pagePath) {
  const file =
    pagePath === "/"
      ? "src/pages/index.astro"
      : `src/pages/${pagePath.replace(/^\/|\/$/g, "")}.astro`;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, {
      encoding: "utf8",
    }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

// priority/changefreq : ignorés par Google mais lus par Bing et certains crawlers IA
function sectionMeta(pagePath) {
  if (pagePath === "/") return { priority: 1.0, changefreq: "weekly" };
  if (pagePath === "/tarifs/") return { priority: 0.9, changefreq: "weekly" };
  if (
    pagePath.startsWith("/fonctionnalites/") ||
    pagePath.startsWith("/solutions/")
  )
    return { priority: 0.8, changefreq: "monthly" };
  // pages légales (confidentialité, CGU, cookies)
  return { priority: 0.3, changefreq: "yearly" };
}

export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const pagePath = new URL(item.url).pathname;
        const lastmod = gitLastmod(pagePath);
        return {
          ...item,
          ...(lastmod && { lastmod }),
          ...sectionMeta(pagePath),
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
