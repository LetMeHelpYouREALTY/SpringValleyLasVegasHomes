/**
 * Schema.org Structured Data Generators for SpringValleyLasVegasHomes.com
 * Following Google's 2025 Structured Data Guidelines
 *
 * @see https://schema.org
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { siteConfig, agentInfo, officeInfo, agentStats, siteSocialUrls } from "./site-config";
import { absoluteUrlForPath, sitelinkStructuredDataNav } from "./site-navigation";
import { absoluteMediaUrl, agentHeadshotSrc, faviconSrc } from "./site-media";

// ============================================================================
// Types
// ============================================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

export interface NeighborhoodData {
  name: string;
  slug: string;
  description: string;
  medianPrice?: string;
  latitude?: number;
  longitude?: number;
  containedIn?: string;
}

export interface CommunityAmenity {
  name: string;
  description?: string;
}

export interface SeniorCommunityData {
  name: string;
  description: string;
  priceRange: string;
  numberOfHomes: number;
  yearBuilt?: string;
  amenities: CommunityAmenity[];
  latitude?: number;
  longitude?: number;
  hoaFees?: string;
  ageRestriction?: string;
}

// ============================================================================
// Constants
// ============================================================================

const BASE_URL = siteConfig.url;

/** Matches `generateRealEstateAgentSchema` `@id` — use for `itemReviewed` on Review nodes. */
export const REAL_ESTATE_AGENT_SCHEMA_ID = `${BASE_URL}#organization` as const;

// Social media profiles — align with gbp-schema / GBP (sameAs)
export const socialProfiles = {
  facebook: siteSocialUrls.facebook,
  instagram: siteSocialUrls.instagram,
  linkedin: siteSocialUrls.linkedin,
  linkedinCompany: siteSocialUrls.linkedinCompany,
  youtube: siteSocialUrls.youtube,
  twitter: siteSocialUrls.twitter,
};

// ============================================================================
// Core Schema Generators
// ============================================================================

/**
 * Generate RealEstateAgent schema (LocalBusiness subtype)
 * Used site-wide in the root layout
 */
export function generateRealEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": REAL_ESTATE_AGENT_SCHEMA_ID,
    name: "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
    alternateName: [
      siteConfig.name,
      "BHHS Nevada Properties",
      "Berkshire Hathaway HomeServices",
    ],
    url: BASE_URL,
    logo: absoluteMediaUrl(agentHeadshotSrc),
    image: absoluteMediaUrl(agentHeadshotSrc),
    description: siteConfig.description,
    telephone: agentInfo.phoneE164,
    email: agentInfo.email,
    priceRange: "$385K - $10M+",
    address: {
      "@type": "PostalAddress",
      streetAddress: officeInfo.address.street,
      addressLocality: officeInfo.address.city,
      addressRegion: officeInfo.address.state,
      postalCode: officeInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: officeInfo.coordinates.lat,
      longitude: officeInfo.coordinates.lng,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Las Vegas",
        sameAs: "https://en.wikipedia.org/wiki/Las_Vegas",
      },
      {
        "@type": "Place",
        name: "Spring Valley, Nevada",
      },
      {
        "@type": "City",
        name: "Henderson",
        sameAs: "https://en.wikipedia.org/wiki/Henderson,_Nevada",
      },
      {
        "@type": "Place",
        name: "Summerlin",
      },
      {
        "@type": "City",
        name: "North Las Vegas",
      },
      {
        "@type": "Place",
        name: "Green Valley",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Real Estate License",
      recognizedBy: {
        "@type": "Organization",
        name: "Nevada Real Estate Division",
      },
      validIn: {
        "@type": "State",
        name: "Nevada",
      },
      identifier: agentInfo.license,
    },
    sameAs: Object.values(socialProfiles),
    parentOrganization: {
      "@type": "Organization",
      "@id": `${BASE_URL}#parent-organization`,
      name: "Berkshire Hathaway HomeServices Nevada Properties",
      url: "https://www.bfrre.com",
      parentOrganization: {
        "@type": "Organization",
        name: "Berkshire Hathaway HomeServices",
        url: "https://www.bhhs.com",
        sameAs: "https://en.wikipedia.org/wiki/Berkshire_Hathaway_HomeServices",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: agentStats.averageRating.toString(),
      reviewCount: agentStats.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    knowsAbout: [
      "Spring Valley Las Vegas homes",
      "Spring Valley Las Vegas map",
      "Spring Valley Nevada homes",
      "Spring Valley Nevada homes for sale",
      "Spring Valley Nevada real estate",
      "West Las Vegas Valley real estate",
      "Las Vegas homes for sale",
      "Las Vegas real estate",
      "Henderson homes",
      "Summerlin properties",
      "Luxury homes",
      "New construction",
      "Investment properties",
      "Relocation services",
      "55+ communities",
      "First-time homebuyers",
    ],
    slogan: "Your Berkshire Hathaway HomeServices expert in Las Vegas",
  };
}

/**
 * Generate Organization schema for BHHS brand
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#parent-organization`,
    name: "Berkshire Hathaway HomeServices Nevada Properties",
    url: "https://www.bfrre.com",
    logo: absoluteMediaUrl(faviconSrc),
    parentOrganization: {
      "@type": "Organization",
      name: "Berkshire Hathaway HomeServices",
      url: "https://www.bhhs.com",
      sameAs: [
        "https://en.wikipedia.org/wiki/Berkshire_Hathaway_HomeServices",
        "https://www.linkedin.com/company/berkshire-hathaway-homeservices/",
      ],
    },
  };
}

// ============================================================================
// Navigation Schema Generators
// ============================================================================

/**
 * Generate BreadcrumbList schema for navigation trails
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
  /** Same-origin primary destinations — supports sitelink discovery (structure + consistent labeling). */
  const hasPart = sitelinkStructuredDataNav.map((item) => ({
    "@type": "SiteNavigationElement",
    name: item.label,
    url: absoluteUrlForPath(item.href),
  }));

  // No SearchAction: a urlTemplate like /listings?q={search_term_string} was
  // crawled literally by Google (GSC "Crawled - currently not indexed"). MLS
  // search is RealScout (external), not an on-site query endpoint.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}#website`,
    name: siteConfig.name,
    url: BASE_URL,
    description: siteConfig.description,
    publisher: {
      "@id": REAL_ESTATE_AGENT_SCHEMA_ID,
    },
    hasPart,
  };
}

// ============================================================================
// Content Schema Generators
// ============================================================================

/**
 * Generate FAQPage schema from FAQ items
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate AggregateRating schema
 */
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
  bestRating = 5,
  worstRating = 1
) {
  return {
    "@type": "AggregateRating",
    ratingValue: ratingValue.toString(),
    reviewCount: reviewCount.toString(),
    bestRating: bestRating.toString(),
    worstRating: worstRating.toString(),
  };
}

/**
 * Review entities for merging into a combined `@graph` via `combineSchemas` (each item includes `@context`).
 */
export function homepageReviewSchemasForCombine(reviews: ReviewItem[]): Record<string, unknown>[] {
  return reviews.map((review, index) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${BASE_URL}#home-review-${index + 1}`,
    name: `Client review: ${review.author}`,
    author: {
      "@type": "Person",
      name: review.author,
    },
    itemReviewed: {
      "@id": REAL_ESTATE_AGENT_SCHEMA_ID,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished || new Date().toISOString().split("T")[0],
  }));
}

/**
 * Standalone Review JSON-LD for the homepage (references agent via `@id`; does not duplicate RealEstateAgent).
 * Satisfies Google Rich Results: `itemReviewed` + `Person` author.
 */
export function generateHomepageReviewJsonLd(reviews: ReviewItem[]) {
  const graph = homepageReviewSchemasForCombine(reviews).map((node) => {
    const { "@context": _omitContext, ...rest } = node;
    return rest;
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Single JSON-LD payload for the homepage: FAQPage + WebPage (for `SchemaScript`).
 *
 * Does **not** emit standalone `Review` nodes here: Google Search Console often flags
 * first-party `Review` markup on the same URL as `RealEstateAgent` + `aggregateRating`
 * (root layout `site-schema`). Stars remain eligible via site-wide `aggregateRating` on
 * the agent entity; visible testimonials stay on-page without duplicate review JSON-LD.
 */
export function combineHomepageStructuredData(args: {
  faqs: FAQItem[];
  webPage: {
    name: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
    primaryImageOfPage?: string;
  };
}) {
  return combineSchemas(generateFAQSchema(args.faqs), generateWebPageSchema(args.webPage));
}

/**
 * Generate Review schema for individual testimonials
 */
export function generateReviewSchema(reviews: ReviewItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": REAL_ESTATE_AGENT_SCHEMA_ID,
    name: "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
    aggregateRating: generateAggregateRatingSchema(
      agentStats.averageRating,
      agentStats.reviewCount
    ),
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      itemReviewed: {
        "@id": REAL_ESTATE_AGENT_SCHEMA_ID,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished || new Date().toISOString().split("T")[0],
    })),
  };
}

// ============================================================================
// Location Schema Generators
// ============================================================================

/**
 * Generate Place schema for neighborhoods
 */
export function generateNeighborhoodSchema(neighborhood: NeighborhoodData) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${BASE_URL}/neighborhoods/${neighborhood.slug}#place`,
    name: `${neighborhood.name}, Las Vegas`,
    description: neighborhood.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: neighborhood.containedIn || "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
  };

  if (neighborhood.latitude && neighborhood.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: neighborhood.latitude,
      longitude: neighborhood.longitude,
    };
  }

  if (neighborhood.containedIn) {
    schema.containedInPlace = {
      "@type": "City",
      name: neighborhood.containedIn,
      addressRegion: "NV",
    };
  }

  return schema;
}

/**
 * Generate Residence schema for 55+ communities
 * Uses ResidentialComplex with amenityFeature
 */
export function generateSeniorCommunitySchema(community: SeniorCommunityData) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    name: community.name,
    description: community.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Henderson",
      addressRegion: "NV",
      addressCountry: "US",
    },
    numberOfAccommodationUnits: community.numberOfHomes,
    petsAllowed: true,
  };

  if (community.latitude && community.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: community.latitude,
      longitude: community.longitude,
    };
  }

  if (community.yearBuilt) {
    schema.yearBuilt = community.yearBuilt;
  }

  // Add amenity features
  if (community.amenities.length > 0) {
    schema.amenityFeature = community.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.name,
      value: true,
      ...(amenity.description && { description: amenity.description }),
    }));
  }

  // Add price range as offers
  if (community.priceRange) {
    schema.additionalProperty = [
      {
        "@type": "PropertyValue",
        name: "Price Range",
        value: community.priceRange,
      },
      {
        "@type": "PropertyValue",
        name: "Age Restriction",
        value: community.ageRestriction || "55+",
      },
    ];

    if (community.hoaFees) {
      (schema.additionalProperty as Array<Record<string, unknown>>).push({
        "@type": "PropertyValue",
        name: "HOA Fees",
        value: community.hoaFees,
      });
    }
  }

  return schema;
}

/**
 * Generate RealEstateListing schema for property pages
 */
export function generateRealEstateListingSchema(listing: {
  name: string;
  description: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  images?: string[];
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.name,
    description: listing.description,
    url: listing.url.startsWith("http") ? listing.url : `${BASE_URL}${listing.url}`,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address.street,
      addressLocality: listing.address.city,
      addressRegion: listing.address.state,
      postalCode: listing.address.zip,
      addressCountry: "US",
    },
    ...(listing.bedrooms && { numberOfBedrooms: listing.bedrooms }),
    ...(listing.bathrooms && { numberOfBathroomsTotal: listing.bathrooms }),
    ...(listing.sqft && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: listing.sqft,
        unitCode: "FTK",
      },
    }),
    ...(listing.images &&
      listing.images.length > 0 && {
        image: listing.images.map((img) =>
          img.startsWith("http") ? img : `${BASE_URL}${img}`
        ),
      }),
  };
}

// ============================================================================
// Page-Specific Schema Generators
// ============================================================================

/**
 * Generate Service schema for services pages
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url.startsWith("http") ? service.url : `${BASE_URL}${service.url}`,
    provider: {
      "@id": REAL_ESTATE_AGENT_SCHEMA_ID,
    },
    areaServed: service.areaServed || ["Las Vegas", "Henderson", "Summerlin", "North Las Vegas"],
    serviceType: "Real Estate Services",
  };
}

/**
 * Preferred preview image for Google (WebPage.primaryImageOfPage). Pass an absolute URL.
 */
function primaryImageObjectFromAbsoluteUrl(absoluteUrl: string) {
  return {
    "@type": "ImageObject",
    url: absoluteUrl,
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  /** Absolute image URL (same as og:image when set). */
  primaryImageOfPage?: string;
}) {
  const pageUrl = page.url.startsWith("http") ? page.url : `${BASE_URL}${page.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: page.name,
    description: page.description,
    url: pageUrl,
    isPartOf: {
      "@id": `${BASE_URL}#website`,
    },
    about: {
      "@id": REAL_ESTATE_AGENT_SCHEMA_ID,
    },
    ...(page.datePublished && { datePublished: page.datePublished }),
    ...(page.dateModified && { dateModified: page.dateModified }),
    ...(page.primaryImageOfPage && {
      primaryImageOfPage: primaryImageObjectFromAbsoluteUrl(page.primaryImageOfPage),
    }),
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Combine multiple schemas into a single JSON-LD script
 */
export function combineSchemas(...schemas: Record<string, unknown>[]) {
  if (schemas.length === 1) {
    return schemas[0];
  }
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((schema) => {
      // Remove @context from individual schemas when combining
      const { "@context": _, ...rest } = schema;
      return rest;
    }),
  };
}

/**
 * Convert schema object to JSON-LD string
 */
export function schemaToJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}
