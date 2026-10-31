"use client";

import { usePathname } from "next/navigation";
import { breadcrumbsFromPathname } from "@/lib/breadcrumb-from-path";
import { generateBreadcrumbSchema, schemaToJsonLd } from "@/lib/schema";

/**
 * BreadcrumbList JSON-LD for all inner pages.
 *
 * Client component on purpose: `usePathname()` is resolved during prerender, so
 * the JSON-LD still ships in the initial HTML, but the root layout no longer
 * calls `headers()` — which forced every route to render dynamically
 * (`Cache-Control: private, no-store`, no CDN cache, slow mobile TTFB).
 */
export default function AutoBreadcrumbSchema() {
  const pathname = usePathname() ?? "/";
  const items = breadcrumbsFromPathname(pathname);
  if (!items || items.length < 2) {
    return null;
  }

  return (
    <script
      id="auto-breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: schemaToJsonLd(generateBreadcrumbSchema(items)),
      }}
    />
  );
}
