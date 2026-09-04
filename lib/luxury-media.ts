/**
 * Local luxury photography — black/gold grade. Keep Dr. Jan’s headshot as the real photo.
 */

export const luxuryImages = {
  hero1: "/Image/luxury/luxury-hero-1-dusk-estate.jpg",
  hero2: "/Image/luxury/luxury-hero-2-night-pool.jpg",
  hero3: "/Image/luxury/luxury-hero-3-kitchen.jpg",
  comingSoon: "/Image/luxury/luxury-coming-soon-twostory.jpg",
  featuredLiving: "/Image/luxury/luxury-featured-living.jpg",
  featuredPatio: "/Image/luxury/luxury-featured-patio.jpg",
  listingPlaceholder: "/Image/luxury/luxury-listing-placeholder.jpg",
  pageDefault: "/Image/luxury/luxury-page-banner-default.jpg",
  zipAerial: "/Image/luxury/luxury-section-zip-aerial.jpg",
  buyers: "/Image/luxury/luxury-section-buyers.jpg",
  sellers: "/Image/luxury/luxury-section-sellers.jpg",
  neighborhoods: "/Image/luxury/luxury-section-neighborhoods.jpg",
  contact: "/Image/luxury/luxury-section-contact.jpg",
  about: "/Image/luxury/luxury-section-about.jpg",
  market: "/Image/luxury/luxury-section-market.jpg",
  guides: "/Image/luxury/luxury-section-guides.jpg",
  schools: "/Image/luxury/luxury-section-schools.jpg",
  newConstruction: "/Image/luxury/luxury-section-new-construction.jpg",
  investment: "/Image/luxury/luxury-section-investment.jpg",
  relocation: "/Image/luxury/luxury-section-relocation.jpg",
  faq: "/Image/luxury/luxury-section-faq.jpg",
  bhhs: "/Image/luxury/luxury-section-bhhs.jpg",
} as const;

export type LuxuryImageKey = keyof typeof luxuryImages;

const PAGE_BANNERS: {
  test: (path: string) => boolean;
  src: string;
  alt: string;
}[] = [
  {
    test: (p) => p.startsWith("/buyers"),
    src: luxuryImages.buyers,
    alt: "Gold-lit entry of a Spring Valley Las Vegas home at dusk",
  },
  {
    test: (p) => p.startsWith("/sellers"),
    src: luxuryImages.sellers,
    alt: "Twilight exterior of a staged Spring Valley Las Vegas home",
  },
  {
    test: (p) =>
      p.startsWith("/neighborhoods") || p.startsWith("/neighborhood-discovery"),
    src: luxuryImages.neighborhoods,
    alt: "Dusk streetscape in Spring Valley Las Vegas",
  },
  {
    test: (p) =>
      p.startsWith("/zip") || p.startsWith("/las-vegas-zip-code-map"),
    src: luxuryImages.zipAerial,
    alt: "Aerial dusk view of Spring Valley and ZIP 89147 rooftops",
  },
  {
    test: (p) =>
      p.startsWith("/contact") ||
      p.startsWith("/showing") ||
      p.startsWith("/google-business"),
    src: luxuryImages.contact,
    alt: "Dark luxury lobby with champagne-gold lighting",
  },
  {
    test: (p) => p.startsWith("/about"),
    src: luxuryImages.about,
    alt: "Stucco and concrete-tile architectural detail at golden hour",
  },
  {
    test: (p) => p.startsWith("/market-report"),
    src: luxuryImages.market,
    alt: "West Las Vegas Valley dusk skyline from Spring Valley",
  },
  {
    test: (p) => p.startsWith("/guides") || p.startsWith("/resources"),
    src: luxuryImages.guides,
    alt: "Brass keys and a dark folio on walnut",
  },
  {
    test: (p) => p.startsWith("/faq"),
    src: luxuryImages.faq,
    alt: "Gold desk lamp on a dark notebook",
  },
  {
    test: (p) => p.startsWith("/schools"),
    src: luxuryImages.schools,
    alt: "Clark County school campus exterior at dusk",
  },
  {
    test: (p) => p.startsWith("/new-construction"),
    src: luxuryImages.newConstruction,
    alt: "New construction model home in southwest Las Vegas at dusk",
  },
  {
    test: (p) =>
      p.startsWith("/investment-properties") || p.startsWith("/home-valuation"),
    src: luxuryImages.investment,
    alt: "Dusk exterior of a Las Vegas investment property",
  },
  {
    test: (p) => p.startsWith("/relocation"),
    src: luxuryImages.relocation,
    alt: "Driveway at dusk with packed luggage and warm house lights",
  },
  {
    test: (p) =>
      p.startsWith("/why-berkshire-hathaway") || p.startsWith("/services"),
    src: luxuryImages.bhhs,
    alt: "Dark conference table and gold pen with dusk through blinds",
  },
  {
    test: (p) =>
      p.startsWith("/listings") ||
      p.startsWith("/homes-for-sale") ||
      p.startsWith("/search"),
    src: luxuryImages.listingPlaceholder,
    alt: "Two-story Spring Valley home at twilight with pool edge",
  },
];

export function luxuryBannerForPath(pathname: string): {
  src: string;
  alt: string;
} {
  const match = PAGE_BANNERS.find((row) => row.test(pathname));
  if (match) return { src: match.src, alt: match.alt };
  return {
    src: luxuryImages.pageDefault,
    alt: "Desert-modern courtyard with champagne-gold uplighting",
  };
}

/** Google Maps embed centered on Spring Valley ZIP 89147 — no API key required. */
export const springValley89147MapEmbedUrl =
  "https://maps.google.com/maps?q=Spring+Valley+Las+Vegas+NV+89147&hl=en&z=13&output=embed";

export const springValley89147MapViewerUrl =
  "https://www.google.com/maps/search/?api=1&query=Spring+Valley+Las+Vegas+NV+89147";
