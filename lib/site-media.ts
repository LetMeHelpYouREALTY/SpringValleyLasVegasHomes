/**
 * Site media: Cloudflare Images IDs (optional) + local fallbacks under /public.
 * Set NEXT_PUBLIC_CF_IMAGE_*_ID in Vercel after uploading assets to Cloudflare Images.
 *
 * Uses direct `process.env.NEXT_PUBLIC_*` reads so Next.js can inline values at build time.
 */

import { siteConfig } from "@/lib/site-config";
import { cfImageUrl, isCfDeliveryUrl } from "@/lib/cf-image-delivery";

/** Default variant names — create matching variants in Cloudflare dashboard (or use `public`). */
const V = {
  public: process.env.NEXT_PUBLIC_CF_VARIANT_PUBLIC?.trim() || "public",
  hero: process.env.NEXT_PUBLIC_CF_VARIANT_HERO?.trim() || "public",
  avatar: process.env.NEXT_PUBLIC_CF_VARIANT_AVATAR?.trim() || "public",
} as const;

function resolveCfOrLocal(
  cfImageId: string | undefined,
  localPublicPath: string,
  variant: string,
): string {
  const id = cfImageId?.trim();
  if (id) {
    return cfImageUrl(id, variant);
  }
  return localPublicPath.startsWith("/")
    ? localPublicPath
    : `/${localPublicPath}`;
}

/** Absolute URL for JSON-LD / Open Graph (same-origin or imagedelivery). */
export function absoluteMediaUrl(src: string): string {
  if (isCfDeliveryUrl(src)) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${siteConfig.url}${path}`;
}

/** Dr. Jan Duffy headshot — `next/image` src (local path or Cloudflare delivery URL). */
export const agentHeadshotSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_HEADSHOT_ID,
  "/images/dr-jan-duffy.jpg",
  V.public,
);

/** Hero background rotation (same order as previous HeroSection). */
export const heroBackgroundSrcs: [string, string, string] = [
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_HERO_1_ID,
    "/Image/luxury/luxury-hero-1-dusk-estate.jpg",
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_HERO_2_ID,
    "/Image/luxury/luxury-hero-2-night-pool.jpg",
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_HERO_3_ID,
    "/Image/luxury/luxury-hero-3-kitchen.jpg",
    V.hero,
  ),
];

/**
 * Same canonical asset as the first homepage hero — use for OG / WebPage on Spring Valley and
 * map-tool hubs so previews stay consistent with valley real-estate imagery (override via HERO_1 env).
 */
export const springValleyMarketingOgSrc = heroBackgroundSrcs[0];

/**
 * Preview image for zip-map and neighborhood-discovery tools (defaults to first hero; optional dedicated CF ID).
 */
export const mapHubOgImageSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_OG_MAP_HUB_ID,
  "/Image/luxury/luxury-section-zip-aerial.jpg",
  V.hero,
);

/** Featured properties cards (same imagery as hero in current site). */
export const featuredPropertyImageSrcs: [string, string, string] = [
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_1_ID,
    "/Image/luxury/luxury-hero-1-dusk-estate.jpg",
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_2_ID,
    "/Image/luxury/luxury-featured-living.jpg",
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_3_ID,
    "/Image/luxury/luxury-featured-patio.jpg",
    V.hero,
  ),
];

/** Review section avatar placeholders. */
export const reviewAvatarSrcs: [string, string, string] = [
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_REVIEW_1_ID,
    "/Image/person1.jpeg",
    V.avatar,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_REVIEW_2_ID,
    "/Image/person_2-min.jpg",
    V.avatar,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_REVIEW_3_ID,
    "/Image/person_4-min.jpg",
    V.avatar,
  ),
];

/** Listing detail placeholder when API data is not wired. */
export const listingPlaceholderSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_LISTING_PLACEHOLDER_ID,
  "/Image/luxury/luxury-listing-placeholder.jpg",
  V.public,
);

/** Default favicon image in Cloudflare Images (same account as other `cfImageUrl` assets). */
const DEFAULT_CF_IMAGE_FAVICON_ID = "3a384fa1-af54-4286-100f-a1a995a15900";

const faviconVariant =
  process.env.NEXT_PUBLIC_CF_VARIANT_FAVICON?.trim() || "w=800";

const faviconAppleVariant =
  process.env.NEXT_PUBLIC_CF_VARIANT_FAVICON_APPLE?.trim() || faviconVariant;

/**
 * Favicon for `<link rel="icon">` and JSON-LD `logo` where a site icon is appropriate.
 * Absolute `imagedelivery.net` URL — Google Search may show it in results; keep URL stable.
 */
export const faviconSrc = cfImageUrl(
  process.env.NEXT_PUBLIC_CF_IMAGE_FAVICON_ID?.trim() ||
    DEFAULT_CF_IMAGE_FAVICON_ID,
  faviconVariant,
);

/** Optional larger touch icon; defaults to same variant as `faviconSrc` if unset. */
export const faviconAppleSrc = cfImageUrl(
  process.env.NEXT_PUBLIC_CF_IMAGE_FAVICON_ID?.trim() ||
    DEFAULT_CF_IMAGE_FAVICON_ID,
  faviconAppleVariant,
);
