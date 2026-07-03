/**
 * Primary internal navigation — single source of truth for:
 * - Navbar / footer (consistent crawl paths + anchor text)
 * - WebSite JSON-LD `hasPart` / SiteNavigationElement (helps search engines understand site structure)
 *
 * Align labels with page `<title>` / H1 where practical (Google sitelinks best practices).
 * @see https://developers.google.com/search/docs/appearance/sitelinks
 */

import { siteConfig } from "@/lib/site-config";
import { seoPrimaryKeyword } from "@/lib/seo";

export type InternalNavLink = {
  href: string;
  /** Concise, destination-relevant anchor text */
  label: string;
};

export type MainNavEntry = InternalNavLink & {
  external?: boolean;
};

/** Desktop/mobile main bar: Home, Properties (portal), Neighborhoods, About, Contact */
export function buildMainNavLinks(portalRootUrl: string): MainNavEntry[] {
  return [
    { href: "/", label: "Home" },
    { href: `${portalRootUrl}/`, label: "Properties", external: true },
    { href: "/neighborhoods", label: "Neighborhoods" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
}

/** Services dropdown — same-origin only */
export const navbarServiceLinks: InternalNavLink[] = [
  { href: "/neighborhoods/spring-valley", label: "Spring Valley Homes" },
  { href: "/buyers", label: "Home Buying" },
  { href: "/sellers", label: "Home Selling" },
  { href: "/luxury-homes", label: "Luxury Homes" },
  { href: "/55-plus-communities", label: "55+ Communities" },
  { href: "/new-construction", label: "New Construction" },
  { href: "/market-report", label: "Market Report" },
  { href: "/market-insights", label: "Market Insights" },
  { href: "/resources", label: "Resources" },
];

/** Footer column: quick links (order = priority for users + crawlers) */
export const footerQuickLinks: InternalNavLink[] = [
  { href: "/neighborhoods/spring-valley", label: seoPrimaryKeyword },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/neighborhoods/paradise", label: "Paradise NV homes near the Strip" },
  { href: "/las-vegas-zip-code-map", label: "Las Vegas zip code map" },
  { href: "/why-berkshire-hathaway", label: "Why Berkshire Hathaway" },
  { href: "/market-report", label: "Las Vegas housing market report" },
  { href: "/resources", label: "Real estate resources and guides" },
  { href: "/about", label: "About Dr. Jan Duffy" },
  { href: "/contact", label: "Contact" },
];

/** Footer column: services */
export const footerServiceLinks: InternalNavLink[] = [
  { href: "/buyers", label: "Home buying in Las Vegas" },
  { href: "/buyers/california-relocator", label: "California to Las Vegas relocation" },
  { href: "/sellers", label: "Selling your Las Vegas home" },
  { href: "/luxury-homes", label: "Luxury homes" },
  { href: "/55-plus-communities", label: "55+ communities" },
  { href: "/55-plus-communities/sun-city-summerlin", label: "Sun City Summerlin homes" },
  { href: "/new-construction", label: "New construction homes" },
  { href: "/market-insights", label: "Market insights" },
  { href: "/google-business", label: "Google Business Profile" },
  { href: "/showing", label: "Schedule a home showing" },
];

/**
 * Same-origin URLs exposed as SiteNavigationElement under WebSite — no external MLS portal.
 * Keep list focused; avoid noisy duplicates with identical destinations.
 */
export const sitelinkStructuredDataNav: InternalNavLink[] = [
  { href: "/listings", label: "Homes for sale — Las Vegas and Henderson" },
  { href: "/neighborhoods", label: "Las Vegas area neighborhoods" },
  { href: "/neighborhoods/spring-valley", label: `${seoPrimaryKeyword} guide` },
  { href: "/neighborhoods/paradise", label: "Paradise NV homes near Strip and UNLV" },
  { href: "/55-plus-communities/sun-city-summerlin", label: "Sun City Summerlin 55+ homes" },
  { href: "/buyers", label: "Home buying resources" },
  { href: "/sellers", label: "Home selling resources" },
  { href: "/showing", label: "Schedule a home showing" },
  { href: "/google-business", label: "Google Business Profile" },
  { href: "/contact", label: "Contact Dr. Jan Duffy" },
  { href: "/about", label: "About Dr. Jan Duffy" },
  { href: "/faq", label: "Real estate FAQ" },
  { href: "/market-report", label: "Las Vegas market report" },
  { href: "/resources", label: "Resources and guides" },
  { href: "/las-vegas-zip-code-map", label: "Las Vegas zip code map" },
];

export function absoluteUrlForPath(path: string): string {
  if (path.startsWith("http")) return path;
  const base = siteConfig.url.replace(/\/$/, "");
  if (path === "/" || path === "") return `${base}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
