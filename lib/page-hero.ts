/**
 * Inner-page hero photos. Cloudflare Images when env IDs are set; git JPEGs otherwise.
 */
import type { SpringValleySubdivisionSlug } from "@/lib/spring-valley-geography";
import {
  featuredCommunityImageSrcs,
  featuredPropertyImageSrcs,
  heroBackgroundAlts,
  heroBackgroundSrcs,
  workWithMeImageAlt,
  workWithMeImageSrc,
} from "@/lib/site-media";
import {
  headingCommunityAssets,
  headingFeaturedAssets,
} from "@/lib/heading-images";

export type PageHero = { src: string; alt: string };

export const pageHero = {
  about: {
    src: heroBackgroundSrcs[0],
    alt: heroBackgroundAlts[0],
  },
  contact: {
    src: workWithMeImageSrc,
    alt: workWithMeImageAlt,
  },
  buyers: {
    src: featuredPropertyImageSrcs[0],
    alt: headingFeaturedAssets[0].alt,
  },
  sellers: {
    src: featuredPropertyImageSrcs[2],
    alt: headingFeaturedAssets[2].alt,
  },
  services: {
    src: featuredPropertyImageSrcs[1],
    alt: headingFeaturedAssets[1].alt,
  },
  neighborhoods: {
    src: heroBackgroundSrcs[2],
    alt: heroBackgroundAlts[2],
  },
  listings: {
    src: featuredPropertyImageSrcs[0],
    alt: headingFeaturedAssets[0].alt,
  },
  search: {
    src: featuredPropertyImageSrcs[1],
    alt: headingFeaturedAssets[1].alt,
  },
  faq: {
    src: heroBackgroundSrcs[0],
    alt: heroBackgroundAlts[0],
  },
  zip: {
    src: heroBackgroundSrcs[0],
    alt: heroBackgroundAlts[0],
  },
} as const satisfies Record<string, PageHero>;

const GOLF_SLUGS: SpringValleySubdivisionSlug[] = [
  "spanish-trail",
  "tiburon",
  "granada-hills",
  "the-foothills",
  "buffalo-ranch",
];

const PARK_SLUGS: SpringValleySubdivisionSlug[] = [
  "canyon-gate",
  "desert-breeze",
  "rancho-viejo",
  "section-10",
];

const CORRIDOR_SLUGS: SpringValleySubdivisionSlug[] = [
  "spring-mountain-fort-apache",
  "chinatown-spring-mountain",
];

export function subdivisionPageHero(
  slug: SpringValleySubdivisionSlug,
): PageHero {
  if (GOLF_SLUGS.includes(slug)) {
    return {
      src: featuredCommunityImageSrcs[0],
      alt: headingCommunityAssets[0].alt,
    };
  }
  if (PARK_SLUGS.includes(slug)) {
    return {
      src: featuredCommunityImageSrcs[1],
      alt: headingCommunityAssets[1].alt,
    };
  }
  if (CORRIDOR_SLUGS.includes(slug)) {
    return {
      src: featuredCommunityImageSrcs[2],
      alt: headingCommunityAssets[2].alt,
    };
  }
  return {
    src: heroBackgroundSrcs[0],
    alt: heroBackgroundAlts[0],
  };
}
