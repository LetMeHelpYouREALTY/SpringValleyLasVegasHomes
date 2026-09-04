/**
 * Homepage H1 / H2 / H3 media map.
 * Cloudflare Images custom IDs are primary once `NEXT_PUBLIC_CF_IMAGE_*_ID` is set
 * (or after `scripts/upload-heading-images-to-cloudflare.mjs` runs). Git JPEGs
 * under `public/images/` are the backup.
 */
import headingImagesJson from "@/lib/heading-images.json";

export type HeadingImageAsset = {
  heading: string;
  env: string;
  id: string;
  file: string;
  local: string;
  alt: string;
  name?: string;
  href?: string;
};

export const headingHeroAssets = headingImagesJson.hero as [
  HeadingImageAsset,
  HeadingImageAsset,
  HeadingImageAsset,
];

export const headingFeaturedAssets = headingImagesJson.featured as [
  HeadingImageAsset,
  HeadingImageAsset,
  HeadingImageAsset,
];

export const headingCommunityAssets = headingImagesJson.communities as [
  HeadingImageAsset & { name: string; href: string },
  HeadingImageAsset & { name: string; href: string },
  HeadingImageAsset & { name: string; href: string },
];

export const headingWorkWithMeAsset =
  headingImagesJson.workWithMe as HeadingImageAsset;
