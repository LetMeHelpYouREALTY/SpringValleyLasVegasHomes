/**
 * Third-party integrations — single source of truth for RealScout, Homebot, and FUB-related defaults.
 * Use NEXT_PUBLIC_* for values required in the browser (inlined at build time).
 */

/** Default RealScout agent (Dr. Jan Duffy) — override with NEXT_PUBLIC_REALSCOUT_AGENT_ID in Vercel. */
const DEFAULT_REALSCOUT_AGENT_ID = "QWdlbnQtMjI1MDUw";

/**
 * RealScout `agent-encoded-id` is base64("Agent-{numericId}").
 * Simple-search accepts a raw numeric id (e.g. 225050); office listings
 * `GET /widgets/api/office_properties` 404s on that form and the widget
 * shows "No listings available". Normalize so both widgets share one id.
 */
export function toRealScoutAgentEncodedId(raw?: string): string {
  const value = raw?.trim() || DEFAULT_REALSCOUT_AGENT_ID;
  if (/^\d+$/.test(value)) {
    return btoa(`Agent-${value}`);
  }
  if (/^Agent-\d+$/i.test(value)) {
    return btoa(`Agent-${value.slice("Agent-".length)}`);
  }
  return value;
}

/** Drop empty segments so dashboard copy `,SFR` does not become `property_types=,SFR`. */
export function sanitizeRealScoutPropertyTypes(raw: string): string {
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(",");
}

/** City-scoped map search on the agent portal (Spring Valley / west valley focus). */
const DEFAULT_REALSCOUT_SPRING_VALLEY_MAP_URL =
  "https://drjanduffy.realscout.com/homesearch/map?geo_type=city&geo_id=3268585";

export const realScoutConfig = {
  /** Base URL for “View all properties” / MLS portal (HTTPS). */
  portalUrl: (
    process.env.NEXT_PUBLIC_REALSCOUT_PORTAL_URL ??
    "https://drjanduffy.realscout.com"
  ).replace(/\/$/, ""),
  agentEncodedId: toRealScoutAgentEncodedId(
    process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID,
  ),
  widgetScriptSrc:
    "https://em.realscout.com/widgets/realscout-web-components.umd.js",
  /**
   * Hint shown in the simple-search field (RealScout `custom-placeholder` on the web component).
   * Not a committed MLS query—users still pick a place from omnisearch results.
   */
  simpleSearchPlaceholder:
    process.env.NEXT_PUBLIC_REALSCOUT_SIMPLE_SEARCH_PLACEHOLDER ??
    "Spring Valley, NV",
  /**
   * RealScout MLS portal map with city geo filter (Spring Valley). Used for CTAs and FAQ deep links.
   * Override if RealScout updates geo_id for this market area.
   */
  springValleyCityMapUrl:
    process.env.NEXT_PUBLIC_REALSCOUT_SPRING_VALLEY_MAP_URL?.trim() ||
    DEFAULT_REALSCOUT_SPRING_VALLEY_MAP_URL,
  /**
   * Office listings widget (Marketing → Widgets). Script loads once in root layout.
   * Dashboard copy-paste often prefixes property-types with a comma (`,SFR`); that empty
   * type serializes as `property_types=,SFR` and the API returns zero rows — emit `SFR` only.
   */
  officeListings: {
    sortOrder: "PRICE_LOW",
    listingStatus: "For Sale",
    propertyTypes: "SFR",
    priceMin: "600000",
    priceMax: "900000",
    dividerColor: "rgb(101, 141, 172)",
  },
} as const;

/** Homebot iframe URL from your Homebot dashboard (embed / widget URL). Optional. */
export const homebotConfig = {
  widgetUrl: process.env.NEXT_PUBLIC_HOMEBOT_WIDGET_URL?.trim() ?? "",
} as const;

/** Site slug for CRM tagging / source enrichment (Spring Valley Las Vegas Homes). */
export const siteIntegration = {
  domain: "springvalleylasvegashomes.com",
  /** Default FUB tag for leads from this site (override with FUB_DEFAULT_LEAD_TAG). */
  defaultLeadTag: process.env.FUB_DEFAULT_LEAD_TAG ?? "spring-valley-site",
} as const;

/** Keeping Current Matters — English “Simplifying the Market” (Las Vegas buyer audience). */
const DEFAULT_KCM_BLOG_EMBED_URL =
  "https://www.simplifyingthemarket.com/?a=956758-ef2edda2f940e018328655620ea05f18";

const DEFAULT_KCM_RSS_FEED_URL =
  "https://www.simplifyingthemarket.com/feed?a=956758-ef2edda2f940e018328655620ea05f18";

export const kcmConfig = {
  /**
   * Full-page embed for KCM blog. Defaults to English; set `NEXT_PUBLIC_KCM_BLOG_EMBED_URL` to the
   * Spanish `/es/?a=…` URL if you need a Spanish iframe instead.
   */
  blogEmbedUrl:
    process.env.NEXT_PUBLIC_KCM_BLOG_EMBED_URL?.trim() ||
    DEFAULT_KCM_BLOG_EMBED_URL,
  /**
   * RSS for on-site cards + CRM. Defaults to English feed; use `NEXT_PUBLIC_KCM_RSS_FEED_URL`
   * with the `/es/feed?a=…` URL for Spanish article titles.
   */
  rssFeedUrl:
    process.env.NEXT_PUBLIC_KCM_RSS_FEED_URL?.trim() ||
    DEFAULT_KCM_RSS_FEED_URL,
} as const;
