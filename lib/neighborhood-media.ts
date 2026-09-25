import { absoluteMediaUrl } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";

/**
 * Neighborhood photos generated from each page H1 (physical place only — no people).
 * Paths are local fallbacks under /public/images.
 */
export const neighborhoodSlugs = [
  "spring-valley",
  "enterprise",
  "paradise",
  "summerlin",
  "henderson",
  "green-valley",
  "the-ridges",
  "southern-highlands",
  "north-las-vegas",
  "skye-canyon",
  "centennial-hills",
  "inspirada",
  "mountains-edge",
] as const;

export type NeighborhoodSlug = (typeof neighborhoodSlugs)[number];

export type NeighborhoodPhoto = {
  src: string;
  alt: string;
  name: string;
};

export const neighborhoodPhotoBySlug: Record<
  NeighborhoodSlug,
  NeighborhoodPhoto
> = {
  "spring-valley": {
    src: "/images/hero/spring-valley-las-vegas-homes.jpg",
    alt: "Spring Valley Las Vegas homes on a west-valley street with desert mountains",
    name: "Spring Valley",
  },
  enterprise: {
    src: "/images/neighborhoods/enterprise-las-vegas-homes.jpg",
    alt: "Enterprise Las Vegas homes and Rhodes Ranch-area street with desert landscaping",
    name: "Enterprise",
  },
  paradise: {
    src: "/images/neighborhoods/paradise-nv-homes.jpg",
    alt: "Paradise Nevada homes on a mid-valley street with the Las Vegas skyline in the distance",
    name: "Paradise",
  },
  summerlin: {
    src: "/images/neighborhoods/summerlin-homes-red-rock.jpg",
    alt: "Summerlin Las Vegas homes with Red Rock Canyon cliffs in the background",
    name: "Summerlin",
  },
  henderson: {
    src: "/images/neighborhoods/henderson-nv-homes.jpg",
    alt: "Henderson Nevada suburban homes with desert yards and mountain views",
    name: "Henderson",
  },
  "green-valley": {
    src: "/images/neighborhoods/green-valley-henderson-homes.jpg",
    alt: "Green Valley Henderson homes with mature trees and tile roofs",
    name: "Green Valley",
  },
  "the-ridges": {
    src: "/images/neighborhoods/the-ridges-summerlin-luxury.jpg",
    alt: "The Ridges Summerlin luxury home with desert landscaping and red-rock cliffs",
    name: "The Ridges",
  },
  "southern-highlands": {
    src: "/images/neighborhoods/southern-highlands-homes.jpg",
    alt: "Southern Highlands Las Vegas homes along a golf fairway with mountain views",
    name: "Southern Highlands",
  },
  "north-las-vegas": {
    src: "/images/neighborhoods/north-las-vegas-homes.jpg",
    alt: "North Las Vegas newer-construction homes with desert landscaping",
    name: "North Las Vegas",
  },
  "skye-canyon": {
    src: "/images/neighborhoods/skye-canyon-homes.jpg",
    alt: "Skye Canyon northwest Las Vegas homes in a master-planned streetscape",
    name: "Skye Canyon",
  },
  "centennial-hills": {
    src: "/images/neighborhoods/centennial-hills-homes.jpg",
    alt: "Centennial Hills Las Vegas homes on a hillside street with mountain views",
    name: "Centennial Hills",
  },
  inspirada: {
    src: "/images/neighborhoods/inspirada-henderson-homes.jpg",
    alt: "Inspirada Henderson modern two-story homes with desert landscaping",
    name: "Inspirada",
  },
  "mountains-edge": {
    src: "/images/neighborhoods/mountains-edge-homes.jpg",
    alt: "Mountains Edge southwest Las Vegas homes at the base of desert mountains",
    name: "Mountains Edge",
  },
};

export function isNeighborhoodSlug(value: string): value is NeighborhoodSlug {
  return (neighborhoodSlugs as readonly string[]).includes(value);
}

export function getNeighborhoodPhoto(
  slug: NeighborhoodSlug,
): NeighborhoodPhoto {
  return neighborhoodPhotoBySlug[slug];
}

/** Open Graph / Twitter fields for a neighborhood page H1 photo. */
export function neighborhoodOgTwitter(slug: NeighborhoodSlug) {
  const photo = getNeighborhoodPhoto(slug);
  return ogTwitterImageFields(absoluteMediaUrl(photo.src), {
    width: 1280,
    height: 720,
    alt: photo.alt,
  });
}

export function neighborhoodOgUrl(slug: NeighborhoodSlug): string {
  return absoluteMediaUrl(getNeighborhoodPhoto(slug).src);
}
