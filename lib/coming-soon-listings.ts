/**
 * Homepage coming-soon listings. Do not put the street address in this file until
 * `showStreetAddress` is true and listing photos are ready to publish.
 *
 * Structure facts: Clark County Assessor, appraisal year 2025 / fiscal year 2026-27.
 * Assessor records are for assessment use; they are not a list price.
 */

export type ComingSoonListing = {
  id: string;
  status: "coming-soon";
  showStreetAddress: boolean;
  streetAddress?: string;
  city: string;
  unincorporatedTown: string;
  state: string;
  zip: string;
  subdivisionName: string;
  subdivisionHref: string;
  builder: string;
  yearBuilt: number;
  stories: string;
  bedrooms: number;
  bathroomsFull: number;
  bathroomsHalf: number;
  firstFloorSqFt: number;
  secondFloorSqFt: number;
  garageSqFt: number;
  lotAcresEstimated: number;
  pool: boolean;
  spa: boolean;
  construction: string;
  roof: string;
  landUse: string;
  photoStatus: "pending-photoshoot";
  images: readonly string[];
  expectedListWindow: string;
};

export function livingSquareFeet(listing: ComingSoonListing): number {
  return listing.firstFloorSqFt + listing.secondFloorSqFt;
}

export const comingSoonListings: readonly ComingSoonListing[] = [
  {
    id: "spring-mountain-fort-apache-coming-soon",
    status: "coming-soon",
    showStreetAddress: false,
    city: "Las Vegas",
    unincorporatedTown: "Spring Valley",
    state: "NV",
    zip: "89147",
    subdivisionName: "Spring Mountain & Fort Apache",
    subdivisionHref: "/neighborhoods/spring-mountain-fort-apache",
    builder: "Lewis Homes",
    yearBuilt: 1999,
    stories: "Two story",
    bedrooms: 4,
    bathroomsFull: 2,
    bathroomsHalf: 1,
    firstFloorSqFt: 1170,
    secondFloorSqFt: 1377,
    garageSqFt: 420,
    lotAcresEstimated: 0.1,
    pool: true,
    spa: false,
    construction: "Frame-stucco",
    roof: "Concrete tile",
    landUse: "Single-family residential",
    photoStatus: "pending-photoshoot",
    images: [],
    expectedListWindow: "about 4 weeks",
  },
];
