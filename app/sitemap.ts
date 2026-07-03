import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Google Search Console — keep in sync with production:
 * - Property URL in GSC must match `siteConfig.url` (www host) and `metadataBase` in `app/layout.tsx`.
 * - Submit once: `{siteConfig.url}/sitemap.xml` → Sitemaps. After material deploys, use URL Inspection
 *   on high-value URLs or rely on normal recrawl (avoid excessive “Request indexing”).
 * - Do not block `/_next/static` in robots (needed for rendering). API routes stay disallowed.
 * - Listing detail URLs (`/listings/[id]`) are dynamic; index individual listings only when IDs are real MLS-backed pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  // Core pages
  const corePages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/about`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/showing`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/listings`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${baseUrl}/why-berkshire-hathaway`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/market-report`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/market-update`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/market-insights`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/market-insights/kcm-blog`, priority: 0.75, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/google-business`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/faq`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/resources`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/las-vegas-zip-code-map`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/neighborhood-discovery`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/search`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/security-policy`, priority: 0.4, changeFrequency: "yearly" as const },
  ];

  // Service pages
  const servicePages = [
    { url: `${baseUrl}/buyers`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/sellers`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/luxury-homes`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/new-construction`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/investment-properties`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/relocation`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/home-valuation`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/55-plus-communities`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/services`, priority: 0.7, changeFrequency: "monthly" as const },
  ];

  // Buyer persona pages
  const buyerPersonaPages = [
    { url: `${baseUrl}/buyers/california-relocator`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/buyers/first-time-buyers`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/buyers/luxury-homes-las-vegas`, priority: 0.8, changeFrequency: "monthly" as const },
  ];

  // Seller persona pages
  const sellerPersonaPages = [
    { url: `${baseUrl}/sellers/move-up`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/sellers/downsizing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/sellers/divorce-probate`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/sellers/relocation`, priority: 0.8, changeFrequency: "monthly" as const },
  ];

  // 55+ community sub-pages
  const fiftyPlusCommunityPages = [
    { url: `${baseUrl}/55-plus-communities/sun-city-summerlin`, priority: 0.85, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/55-plus-communities/sun-city-anthem`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/55-plus-communities/sun-city-aliante`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/55-plus-communities/solera-anthem`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/55-plus-communities/trilogy-summerlin`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/55-plus-communities/heritage-stonebridge`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/55-plus-communities/del-webb-lake-las-vegas`, priority: 0.8, changeFrequency: "monthly" as const },
  ];

  // Neighborhood pages
  const neighborhoodPages = [
    { url: `${baseUrl}/neighborhoods`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/spring-valley`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/spring-valley/property-taxes`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/neighborhoods/enterprise`, priority: 0.85, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/paradise`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/summerlin`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/henderson`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/green-valley`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/the-ridges`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/southern-highlands`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/north-las-vegas`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/skye-canyon`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/centennial-hills`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/inspirada`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/neighborhoods/mountains-edge`, priority: 0.7, changeFrequency: "weekly" as const },
  ];

  const allPages = [...corePages, ...servicePages, ...buyerPersonaPages, ...sellerPersonaPages, ...fiftyPlusCommunityPages, ...neighborhoodPages];

  return allPages.map((page) => ({
    url: page.url,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
