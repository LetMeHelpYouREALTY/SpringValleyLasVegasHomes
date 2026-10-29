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
  return localPublicPath.startsWith("/") ? localPublicPath : `/${localPublicPath}`;
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

/**
 * Hero shows Dr. Jan's listing at 9528 Rainfall Ave (photos from the listing marketing kit,
 * Oct 28 2026). Set to false when the home sells or the listing ends; the site then falls back
 * to the general valley hero images below.
 */
export const LISTING_HERO_ACTIVE = true;

const listingHero: { srcs: [string, string, string]; alts: [string, string, string] } = {
  srcs: [
    "/images/listings/9528-rainfall-avenue/front-exterior-twilight.jpg",
    "/images/listings/9528-rainfall-avenue/pool-twilight.jpg",
    "/images/listings/9528-rainfall-avenue/pool-view.jpg",
  ],
  alts: [
    "Two-story stucco home with tile roof and two-car garage at 9528 Rainfall Avenue, Spring Valley, Las Vegas (twilight sky digitally edited)",
    "Private in-ground pool with tiled water feature and desert landscaping at 9528 Rainfall Avenue (twilight sky digitally edited)",
    "Covered patio and private pool behind 9528 Rainfall Avenue, Las Vegas NV 89147",
  ],
};

const valleyHero: { srcs: [string, string, string]; alts: [string, string, string] } = {
  srcs: [
    resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_HERO_1_ID, "/Image/hero_bg_1.jpg", V.hero),
    resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_HERO_2_ID, "/Image/hero_bg_2.jpg", V.hero),
    resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_HERO_3_ID, "/Image/hero_bg_3.jpg", V.hero),
  ],
  alts: [
    "Spring Valley Las Vegas homes and Las Vegas Valley real estate — hero",
    "Spring Valley Las Vegas homes and Las Vegas Valley real estate — hero 2",
    "Spring Valley Las Vegas homes and Las Vegas Valley real estate — hero 3",
  ],
};

const activeHero = LISTING_HERO_ACTIVE ? listingHero : valleyHero;

/** Hero background rotation: slide 1 is the LCP image. */
export const heroBackgroundSrcs: [string, string, string] = activeHero.srcs;
export const heroBackgroundAlts: [string, string, string] = activeHero.alts;

/**
 * Same canonical asset as the first homepage hero — use for OG / WebPage on Spring Valley and
 * map-tool hubs so previews stay consistent with valley real-estate imagery (override via HERO_1 env).
 */
export const springValleyMarketingOgSrc = valleyHero.srcs[0];

/**
 * Preview image for zip-map and neighborhood-discovery tools (defaults to first hero; optional dedicated CF ID).
 */
export const mapHubOgImageSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_OG_MAP_HUB_ID,
  "/Image/hero_bg_1.jpg",
  V.hero,
);

/** Featured properties cards (same imagery as hero in current site). */
export const featuredPropertyImageSrcs: [string, string, string] = [
  resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_1_ID, "/Image/hero_bg_1.jpg", V.hero),
  resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_2_ID, "/Image/hero_bg_2.jpg", V.hero),
  resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_3_ID, "/Image/hero_bg_3.jpg", V.hero),
];

/** Review section avatar placeholders. */
export const reviewAvatarSrcs: [string, string, string] = [
  resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_REVIEW_1_ID, "/Image/person1.jpeg", V.avatar),
  resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_REVIEW_2_ID, "/Image/person_2-min.jpg", V.avatar),
  resolveCfOrLocal(process.env.NEXT_PUBLIC_CF_IMAGE_REVIEW_3_ID, "/Image/person_4-min.jpg", V.avatar),
];

/** Listing detail placeholder when API data is not wired. */
export const listingPlaceholderSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_LISTING_PLACEHOLDER_ID,
  "/Image/hero_bg_1.jpg",
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
  process.env.NEXT_PUBLIC_CF_IMAGE_FAVICON_ID?.trim() || DEFAULT_CF_IMAGE_FAVICON_ID,
  faviconVariant,
);

/** Optional larger touch icon; defaults to same variant as `faviconSrc` if unset. */
export const faviconAppleSrc = cfImageUrl(
  process.env.NEXT_PUBLIC_CF_IMAGE_FAVICON_ID?.trim() || DEFAULT_CF_IMAGE_FAVICON_ID,
  faviconAppleVariant,
);
