import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Google Search Console: allow marketing HTML and `/_next/static` (needed for rendering).
 * Disallow non-document URLs that show up as "Crawled - currently not indexed".
 * Keep `sitemap` on the same canonical host as `siteConfig.url`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/manifest.webmanifest",
        "/opengraph-image",
        "/opengraph-image/",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
