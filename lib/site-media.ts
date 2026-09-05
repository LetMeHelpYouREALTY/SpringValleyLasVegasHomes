/**
 * Site media: Cloudflare Images is the primary CDN; git files under /public
 * are backups for local/preview when `NEXT_PUBLIC_CF_IMAGE_*_ID` is unset.
 *
 * Set those IDs in Vercel after `scripts/upload-heading-images-to-cloudflare.mjs`.
 * Uses direct `process.env.NEXT_PUBLIC_*` reads so Next.js can inline values at build time.
 */

import { siteConfig } from "@/lib/site-config";
import { cfImageUrl, isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import {
  headingBrandAssets,
  headingCommunityAssets,
  headingFeaturedAssets,
  headingHeroAssets,
  headingWorkWithMeAsset,
} from "@/lib/heading-images";

/** Default variant names — create matching variants in Cloudflare dashboard (or use `public`). */
const V = {
  public: process.env.NEXT_PUBLIC_CF_VARIANT_PUBLIC?.trim() || "public",
  hero: process.env.NEXT_PUBLIC_CF_VARIANT_HERO?.trim() || "public",
} as const;

const faviconVariant =
  process.env.NEXT_PUBLIC_CF_VARIANT_FAVICON?.trim() || "w=800";

const faviconAppleVariant =
  process.env.NEXT_PUBLIC_CF_VARIANT_FAVICON_APPLE?.trim() || faviconVariant;

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

/**
 * Dr. Jan Duffy circular gold-framed portrait.
 * Cloudflare Images when `NEXT_PUBLIC_CF_IMAGE_PORTRAIT_ID` is set; git PNG backup otherwise.
 */
export const agentHeadshotSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_PORTRAIT_ID,
  headingBrandAssets.headshot.local,
  V.public,
);

/** Circular portrait used as the navbar logo mark. */
export const logoMarkSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_LOGO_MARK_ID,
  headingBrandAssets.logo.local,
  V.public,
);

export const logoMarkAlt = headingBrandAssets.logo.alt;

/** Horizontal wordmark git backup. */
export const logoWordmarkSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_WORDMARK_ID,
  headingBrandAssets.wordmark.local,
  V.public,
);

/**
 * H1 hero rotation — Spring Valley pool home, Spanish Trail, Desert Breeze Park.
 * Cloudflare IDs override git JPEGs when set.
 */
export const heroBackgroundSrcs: [string, string, string] = [
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_HERO_1_ID,
    headingHeroAssets[0].local,
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_HERO_2_ID,
    headingHeroAssets[1].local,
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_HERO_3_ID,
    headingHeroAssets[2].local,
    V.hero,
  ),
];

export const heroBackgroundAlts: [string, string, string] = [
  headingHeroAssets[0].alt,
  headingHeroAssets[1].alt,
  headingHeroAssets[2].alt,
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
  headingHeroAssets[0].local,
  V.hero,
);

/** H2 realtor-service cards: Buy, Search MLS, Sell. */
export const featuredPropertyImageSrcs: [string, string, string] = [
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_1_ID,
    headingFeaturedAssets[0].local,
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_2_ID,
    headingFeaturedAssets[1].local,
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_FEATURED_3_ID,
    headingFeaturedAssets[2].local,
    V.hero,
  ),
];

export const featuredPropertyImageAlts: [string, string, string] = [
  headingFeaturedAssets[0].alt,
  headingFeaturedAssets[1].alt,
  headingFeaturedAssets[2].alt,
];

/** H3 community tiles: Spanish Trail, Desert Breeze, Chinatown / Spring Mountain. */
export const featuredCommunityImageSrcs: [string, string, string] = [
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_COMMUNITY_1_ID,
    headingCommunityAssets[0].local,
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_COMMUNITY_2_ID,
    headingCommunityAssets[1].local,
    V.hero,
  ),
  resolveCfOrLocal(
    process.env.NEXT_PUBLIC_CF_IMAGE_COMMUNITY_3_ID,
    headingCommunityAssets[2].local,
    V.hero,
  ),
];

export const featuredCommunityTiles = headingCommunityAssets.map(
  (asset, index) => ({
    name: asset.name,
    href: asset.href,
    image: featuredCommunityImageSrcs[index],
    alt: asset.alt,
  }),
);

/** H2 Work With Me full-bleed photo. */
export const workWithMeImageSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_WORK_WITH_ME_ID,
  headingWorkWithMeAsset.local,
  V.hero,
);

export const workWithMeImageAlt = headingWorkWithMeAsset.alt;

/** Listing detail placeholder when API data is not wired. */
export const listingPlaceholderSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_LISTING_PLACEHOLDER_ID,
  headingFeaturedAssets[0].local,
  V.public,
);

/** Favicon — Cloudflare when ID is set; git PNG under public/images/icons otherwise. */
export const faviconSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_FAVICON_MARK_ID,
  headingBrandAssets.favicon.local,
  faviconVariant,
);

/** Apple touch icon (180×180 circular portrait). */
export const faviconAppleSrc = resolveCfOrLocal(
  process.env.NEXT_PUBLIC_CF_IMAGE_APPLE_ICON_ID,
  headingBrandAssets.apple.local,
  faviconAppleVariant,
);
