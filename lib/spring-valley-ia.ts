/**
 * Spring Valley information architecture — subdivisions, ZIPs, and sibling-site outbound links.
 * Used by the neighborhood index, homepage module, sitemap, and /zip static params.
 */

export const springValleySubdivisions = [
  { slug: "tiburon", name: "Tiburon", href: "/neighborhoods/tiburon" },
  {
    slug: "granada-hills",
    name: "Granada Hills",
    href: "/neighborhoods/granada-hills",
  },
  {
    slug: "the-foothills",
    name: "The Foothills",
    href: "/neighborhoods/the-foothills",
  },
  {
    slug: "buffalo-ranch",
    name: "Buffalo Ranch",
    href: "/neighborhoods/buffalo-ranch",
  },
  {
    slug: "desert-breeze",
    name: "Desert Breeze",
    href: "/neighborhoods/desert-breeze",
  },
  { slug: "tahoe", name: "Tahoe", href: "/neighborhoods/tahoe" },
  {
    slug: "spring-mountain-fort-apache",
    name: "Spring Mountain & Fort Apache",
    href: "/neighborhoods/spring-mountain-fort-apache",
  },
] as const;

export const springValleyZips = [
  "89147",
  "89117",
  "89113",
  "89148",
  "89103",
  "89146",
  "89102",
  "89118",
  "89178",
] as const;

export type SpringValleyZip = (typeof springValleyZips)[number];

/** Valley-wide communities that now live on sibling domains (outbound, not redirects). */
export const siblingCommunityLinks = [
  { name: "Summerlin", href: "https://searchforhomesinsummerlin.com/" },
  { name: "The Ridges", href: "https://www.theridgessummerlinhomes.com/" },
  { name: "Henderson", href: "https://www.searchforhomesinhenderson.com/" },
  { name: "Green Valley", href: "https://www.greenvalleyranchinsider.com/" },
  { name: "Inspirada", href: "https://www.inspiradahomes.com/" },
  { name: "Mountain's Edge", href: "https://www.mountainedgehomes.com/" },
  {
    name: "North Las Vegas",
    href: "https://www.searchnorthlasvegashomes.com/",
  },
  { name: "Skye Canyon", href: "https://www.skyecanyonhomesforsale.com/" },
  {
    name: "Centennial Hills",
    href: "https://www.centennialhillshomesforsale.com/",
  },
  {
    name: "Enterprise / Rhodes Ranch",
    href: "https://www.rhodesranchlasvegas.com/",
  },
] as const;
