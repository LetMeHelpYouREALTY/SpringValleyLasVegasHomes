import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  springValleySubdivisions,
  springValleyZips,
} from "@/lib/spring-valley-ia";

/**
 * Google Search Console — keep in sync with production:
 * - Property URL in GSC must match `siteConfig.url` (www host) and `metadataBase` in `app/layout.tsx`.
 * - Submit once: `{siteConfig.url}/sitemap.xml` → Sitemaps. After material deploys, use URL Inspection
 *   on high-value URLs or rely on normal recrawl (avoid excessive “Request indexing”).
 * - Do not block `/_next/static` in robots (needed for rendering). API routes stay disallowed.
 * - Redirect sources are omitted. 410 URLs are omitted.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  const at = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const neighborhoodUrls = [
    at("/neighborhoods", 0.8, "weekly"),
    ...springValleySubdivisions.map((s) => at(s.href, 0.8, "weekly")),
  ];

  const zipUrls = [
    at("/zip", 0.8, "weekly"),
    ...springValleyZips.map((zip) => at(`/zip/${zip}`, 0.8, "weekly")),
  ];

  const schoolUrls = [
    at("/schools", 0.7, "monthly"),
    at("/schools/spring-valley-high-school", 0.7, "monthly"),
    at("/schools/durango-high-school", 0.7, "monthly"),
    at("/schools/attendance-zones", 0.7, "monthly"),
  ];

  const guideUrls = [
    at("/guides", 0.7, "monthly"),
    at("/guides/no-hoa-homes-spring-valley", 0.7, "monthly"),
    at("/guides/property-taxes", 0.7, "monthly"),
    at("/guides/spring-valley-vs-summerlin", 0.7, "monthly"),
  ];

  return [
    at("/", 1.0, "weekly"),
    at("/homes-for-sale", 0.6, "daily"),
    ...neighborhoodUrls,
    ...zipUrls,
    ...schoolUrls,
    ...guideUrls,
    at("/market-report", 0.6, "weekly"),
    at("/buyers", 0.6, "monthly"),
    at("/sellers", 0.6, "monthly"),
    at("/home-valuation", 0.6, "monthly"),
    at("/about", 0.6, "monthly"),
    at("/contact", 0.6, "monthly"),
    at("/faq", 0.6, "monthly"),
    at("/las-vegas-zip-code-map", 0.6, "monthly"),
    at("/relocation", 0.6, "monthly"),
  ];
}
