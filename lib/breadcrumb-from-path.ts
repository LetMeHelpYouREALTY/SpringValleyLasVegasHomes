/**
 * Derive BreadcrumbList items from the request pathname (inner pages only).
 * Labels align with site-navigation where possible; hyphen segments are title-cased as fallback.
 */

import type { BreadcrumbItem } from "@/lib/schema";
import {
  footerQuickLinks,
  footerServiceLinks,
  navbarServiceLinks,
  sitelinkStructuredDataNav,
} from "@/lib/site-navigation";

const PATH_LABELS = new Map<string, string>();

function registerPathLabels(links: ReadonlyArray<{ href: string; label: string }>) {
  for (const { href, label } of links) {
    const normalized = normalizePath(href);
    if (!PATH_LABELS.has(normalized)) {
      PATH_LABELS.set(normalized, label);
    }
  }
}

registerPathLabels(footerQuickLinks);
registerPathLabels(footerServiceLinks);
registerPathLabels(navbarServiceLinks);
registerPathLabels(sitelinkStructuredDataNav);

/** Section roots — shorter crumbs than long footer anchor text */
PATH_LABELS.set("/buyers", "Home Buying");
PATH_LABELS.set("/sellers", "Home Selling");
PATH_LABELS.set("/neighborhoods", "Neighborhoods");
PATH_LABELS.set("/55-plus-communities", "55+ Communities");
PATH_LABELS.set("/market-insights", "Market Insights");
PATH_LABELS.set("/faq", "FAQ");
PATH_LABELS.set("/listings", "Listings");
PATH_LABELS.set("/search", "Search Homes");
PATH_LABELS.set("/neighborhood-discovery", "Neighborhood Discovery");
PATH_LABELS.set("/las-vegas-zip-code-map", "Las Vegas Zip Code Map");
PATH_LABELS.set("/neighborhoods/spring-valley", "Spring Valley");
PATH_LABELS.set("/neighborhoods/spring-valley/property-taxes", "Property Taxes");

/** Paths that need an extra section crumb (not reflected in the URL path). */
const BREADCRUMB_OVERRIDES: Record<string, BreadcrumbItem[]> = {
  "/neighborhood-discovery": [
    { name: "Home", url: "/" },
    { name: "Neighborhoods", url: "/neighborhoods" },
    { name: "Neighborhood Discovery", url: "/neighborhood-discovery" },
  ],
  "/las-vegas-zip-code-map": [
    { name: "Home", url: "/" },
    { name: "Neighborhoods", url: "/neighborhoods" },
    { name: "Las Vegas Zip Code Map", url: "/las-vegas-zip-code-map" },
  ],
};

function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0] ?? path;
  if (withoutQuery === "/" || withoutQuery === "") return "/";
  return withoutQuery.replace(/\/$/, "");
}

function humanizeSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => {
      if (word === "55") return "55";
      if (word.toLowerCase() === "plus") return "+";
      if (word.length <= 2) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .replace("55 +", "55+");
}

/**
 * Returns breadcrumb trail for JSON-LD, or null on the homepage.
 */
export function breadcrumbsFromPathname(pathname: string): BreadcrumbItem[] | null {
  const path = normalizePath(pathname);
  if (path === "/") return null;

  const override = BREADCRUMB_OVERRIDES[path];
  if (override) {
    return override;
  }

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const items: BreadcrumbItem[] = [{ name: "Home", url: "/" }];

  let accum = "";
  for (const segment of segments) {
    accum += `/${segment}`;
    const name = PATH_LABELS.get(accum) ?? humanizeSegment(segment);
    items.push({ name, url: accum });
  }

  return items;
}
