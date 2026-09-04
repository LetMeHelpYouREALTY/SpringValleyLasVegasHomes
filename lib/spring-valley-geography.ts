/**
 * Hyperlocal Spring Valley CDP geography — ZIP params, subdivision routes, and
 * the boundary used as the inclusion test for this site.
 *
 * Boundary (census-designated place): Sahara Avenue (north), Decatur Boulevard
 * (east), Warm Springs Road (south), Hualapai Way (west). About 33.4 sq mi.
 *
 * Do not add 89102, 89139, 89161, or 89178 to generateStaticParams or the sitemap.
 */

export const SPRING_VALLEY_BOUNDARY = {
  north: "Sahara Avenue",
  east: "Decatur Boulevard",
  south: "Warm Springs Road",
  west: "Hualapai Way",
  squareMiles: 33.4,
} as const;

/** Exact set for `app/zip/[zipcode]/page.tsx` generateStaticParams. */
export const SPRING_VALLEY_ZIP_CODES = [
  "89103",
  "89113",
  "89117",
  "89118",
  "89146",
  "89147",
  "89148",
] as const;

export type SpringValleyZipCode = (typeof SPRING_VALLEY_ZIP_CODES)[number];

/** Outside the CDP boundary — must not be generated or added to the sitemap. */
export const SPRING_VALLEY_EXCLUDED_ZIP_CODES = [
  "89102",
  "89139",
  "89161",
  "89178",
] as const;

export type SpringValleySubdivisionSlug =
  | "spanish-trail"
  | "tiburon"
  | "granada-hills"
  | "the-foothills"
  | "buffalo-ranch"
  | "canyon-gate"
  | "desert-breeze"
  | "rancho-viejo"
  | "section-10"
  | "spring-mountain-fort-apache"
  | "chinatown-spring-mountain";

export type SpringValleyZipRecord = {
  zip: SpringValleyZipCode;
  name: string;
  summary: string;
  /** On-page caveat — not a reason to exclude the ZIP from static params. */
  caveat: string | null;
  relatedSlugs: SpringValleySubdivisionSlug[];
  latitude: number;
  longitude: number;
};

export type SpringValleySubdivision = {
  slug: SpringValleySubdivisionSlug;
  name: string;
  shortLocation: string;
  highlights: readonly string[];
  summary: string;
  body: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  relatedSlugs: SpringValleySubdivisionSlug[];
  relatedZips: readonly SpringValleyZipCode[];
  latitude: number;
  longitude: number;
};

export type SpringValleyOutboundNeighbor = {
  name: string;
  href: string;
  whyOutbound: string;
};

export const SPRING_VALLEY_SCHOOLS = [
  {
    name: "Spring Valley High School",
    address: "3750 S Buffalo Dr, Las Vegas, NV 89147",
  },
  {
    name: "Durango High School",
    address: "7100 W Dewey Dr, Las Vegas, NV 89113",
  },
  {
    name: "Sierra Vista High School",
    address: "8100 W Robindale Rd, Las Vegas, NV 89113",
  },
  {
    name: "Roger M. Bryan Elementary School",
    address: "8255 W Katie Ave, Las Vegas, NV 89147",
    note: "Next to Desert Breeze Park at Spring Mountain Road and Durango Drive.",
  },
] as const;

export const SPRING_VALLEY_ZIPS: readonly SpringValleyZipRecord[] = [
  {
    zip: "89103",
    name: "89103 — east Spring Valley",
    summary:
      "East Spring Valley along the Decatur edge, including the Tropicana office corridor and condo pockets such as Rancho Viejo. Listings may say Las Vegas or Spring Valley; confirm the subdivision, not just the ZIP.",
    caveat: null,
    relatedSlugs: [
      "rancho-viejo",
      "chinatown-spring-mountain",
      "spanish-trail",
    ],
    latitude: 36.126,
    longitude: -115.209,
  },
  {
    zip: "89113",
    name: "89113 — south Spring Valley",
    summary:
      "South Spring Valley toward Warm Springs Road, including the Durango and Rainbow corridors. Durango High School (7100 W Dewey Dr) and Sierra Vista High School (8100 W Robindale Rd) are in this ZIP.",
    caveat: null,
    relatedSlugs: ["spanish-trail", "tiburon", "granada-hills"],
    latitude: 36.061,
    longitude: -115.261,
  },
  {
    zip: "89117",
    name: "89117 — north and west Spring Valley",
    summary:
      "Covers Canyon Gate, Desert Breeze Park, and the Sahara–Durango edge of unincorporated Spring Valley.",
    caveat:
      "The northern half of 89117 is incorporated City of Las Vegas rather than unincorporated Spring Valley. Confirm jurisdiction on the listing, not the ZIP alone.",
    relatedSlugs: ["canyon-gate", "desert-breeze", "section-10"],
    latitude: 36.143,
    longitude: -115.28,
  },
  {
    zip: "89118",
    name: "89118 — southeast Spring Valley",
    summary:
      "Southeast Spring Valley along the Decatur and industrial/commercial corridors. Housing sits beside employment and warehouse uses; compare comps on the same block.",
    caveat: null,
    relatedSlugs: ["chinatown-spring-mountain", "rancho-viejo"],
    latitude: 36.085,
    longitude: -115.205,
  },
  {
    zip: "89146",
    name: "89146 — central-west Spring Valley",
    summary:
      "Central-west Spring Valley along the Rainbow corridor, between the Chinatown/Spring Mountain draw and established single-family pockets.",
    caveat: null,
    relatedSlugs: [
      "chinatown-spring-mountain",
      "desert-breeze",
      "buffalo-ranch",
    ],
    latitude: 36.145,
    longitude: -115.235,
  },
  {
    zip: "89147",
    name: "89147 — west Spring Valley",
    summary:
      "West Spring Valley including Buffalo Ranch, The Foothills, Spring Valley High School at 3750 S Buffalo Dr, and Roger M. Bryan Elementary beside Desert Breeze Park.",
    caveat: null,
    relatedSlugs: [
      "buffalo-ranch",
      "the-foothills",
      "desert-breeze",
      "spring-mountain-fort-apache",
    ],
    latitude: 36.098,
    longitude: -115.28,
  },
  {
    zip: "89148",
    name: "89148 — southwest Spring Valley edge",
    summary:
      "Southwest edge of the Spring Valley ZIP set along the Warm Springs line. Use the street, not the ZIP, to tell Spring Valley from Enterprise.",
    caveat:
      "89148 straddles Warm Springs Road, so its southern half is Enterprise. Addresses north of Warm Springs can still be Spring Valley; confirm on the listing.",
    relatedSlugs: ["the-foothills", "buffalo-ranch"],
    latitude: 36.063,
    longitude: -115.29,
  },
];

export const SPRING_VALLEY_SUBDIVISIONS: readonly SpringValleySubdivision[] = [
  {
    slug: "spanish-trail",
    name: "Spanish Trail",
    shortLocation: "Tropicana to Hacienda, Rainbow to Durango",
    highlights: ["Guard-gated", "Golf community", "Inside Spring Valley"],
    summary:
      "Spanish Trail is Spring Valley’s premier guard-gated golf community. It sits Tropicana Avenue to Hacienda Avenue and Rainbow Boulevard to Durango Drive—inside the CDP on all four sides.",
    body: [
      "This site covers Spanish Trail because the community is inside unincorporated Spring Valley, not a neighboring city or a sibling-domain market. Gates, golf, and HOA rules are specific to this subdivision; we review those on the listing rather than treating every west-valley gated community as interchangeable.",
      "Inventory is mostly single-family homes on interior streets around the country club. Compare recent sales inside Spanish Trail to other Spring Valley pockets such as Tiburon and Granada Hills rather than to Enterprise golf communities south of Warm Springs Road.",
    ],
    faqs: [
      {
        question: "Is Spanish Trail in Spring Valley?",
        answer:
          "Yes. Spanish Trail runs Tropicana to Hacienda and Rainbow to Durango, inside the Spring Valley census-designated place (Sahara Avenue, Decatur Boulevard, Warm Springs Road, and Hualapai Way).",
      },
      {
        question: "Is Spanish Trail the same as Rhodes Ranch?",
        answer:
          "No. Rhodes Ranch is in Enterprise, south of Warm Springs Road. Spanish Trail is a separate guard-gated golf community inside Spring Valley.",
      },
    ],
    relatedSlugs: ["tiburon", "granada-hills", "rancho-viejo"],
    relatedZips: ["89103", "89113", "89147"],
    latitude: 36.1,
    longitude: -115.248,
  },
  {
    slug: "tiburon",
    name: "Tiburon",
    shortLocation: "Tropicana Avenue and El Capitan Way",
    highlights: ["Tropicana & El Capitan", "Inside Spring Valley"],
    summary:
      "Tiburon is an established Spring Valley subdivision around Tropicana Avenue and El Capitan Way, east of Spanish Trail and still west of Decatur Boulevard.",
    body: [
      "Buyers often cross-shop Tiburon with Spanish Trail and the guard-gated Granada Hills pocket inside Tiburon. Product type, HOA, and lot size change by street, so we match comps inside this pocket rather than the ZIP alone.",
      "The location is inside the Spring Valley box: south of Sahara Avenue, west of Decatur Boulevard, north of Warm Springs Road, and east of Hualapai Way.",
    ],
    faqs: [
      {
        question: "Where is Tiburon in Spring Valley?",
        answer:
          "Tiburon is near Tropicana Avenue and El Capitan Way in unincorporated Spring Valley, east of Spanish Trail.",
      },
      {
        question: "Is Granada Hills part of Tiburon?",
        answer:
          "Granada Hills is a guard-gated pocket inside the Tiburon area. Confirm the subdivision name, gates, and HOA on the specific listing.",
      },
    ],
    relatedSlugs: ["granada-hills", "spanish-trail", "rancho-viejo"],
    relatedZips: ["89103", "89113"],
    latitude: 36.101,
    longitude: -115.226,
  },
  {
    slug: "granada-hills",
    name: "Granada Hills",
    shortLocation: "Guard-gated pocket inside Tiburon",
    highlights: ["Guard-gated", "Inside Tiburon", "Inside Spring Valley"],
    summary:
      "Granada Hills is a guard-gated residential pocket inside Tiburon in Spring Valley—not a separate city and not a master-planned community south of Warm Springs Road.",
    body: [
      "Gates and HOA documents are the practical difference versus ungated Tiburon streets nearby. We review access, dues, and rental rules on the listing you choose.",
      "Because Granada Hills sits inside Tiburon, it is inside the Spring Valley CDP boundary. Search this pocket by subdivision name so results do not mix in Enterprise or City of Las Vegas streets.",
    ],
    faqs: [
      {
        question: "Is Granada Hills in Spring Valley?",
        answer:
          "Yes. Granada Hills is a guard-gated pocket inside Tiburon, which sits in unincorporated Spring Valley near Tropicana Avenue and El Capitan Way.",
      },
    ],
    relatedSlugs: ["tiburon", "spanish-trail"],
    relatedZips: ["89103", "89113"],
    latitude: 36.102,
    longitude: -115.228,
  },
  {
    slug: "the-foothills",
    name: "The Foothills",
    shortLocation: "Fort Apache Road and Katie Avenue",
    highlights: ["Fort Apache & Katie", "West Spring Valley"],
    summary:
      "The Foothills is a west Spring Valley subdivision around Fort Apache Road and Katie Avenue, still east of Hualapai Way and north of Warm Springs Road.",
    body: [
      "This pocket is often searched with Buffalo Ranch and the Lewis Homes streets near Spring Mountain Road and Fort Apache. Housing is primarily single-family; HOA and lot size still vary by tract.",
      "Roger M. Bryan Elementary School (8255 W Katie Ave, 89147) is in this Katie Avenue corridor, next to Desert Breeze Park. School assignments are by address—confirm with Clark County School District.",
    ],
    faqs: [
      {
        question: "Where is The Foothills in Spring Valley?",
        answer:
          "The Foothills is near Fort Apache Road and Katie Avenue in west unincorporated Spring Valley, inside the Sahara–Decatur–Warm Springs–Hualapai box.",
      },
    ],
    relatedSlugs: [
      "buffalo-ranch",
      "desert-breeze",
      "spring-mountain-fort-apache",
    ],
    relatedZips: ["89147", "89148"],
    latitude: 36.116,
    longitude: -115.298,
  },
  {
    slug: "buffalo-ranch",
    name: "Buffalo Ranch",
    shortLocation: "Buffalo Drive and Peace Way",
    highlights: ["Buffalo & Peace Way", "Inside Spring Valley"],
    summary:
      "Buffalo Ranch is a Spring Valley subdivision around Buffalo Drive and Peace Way, west of Rainbow Boulevard and well inside the CDP boundary.",
    body: [
      "Spring Valley High School (3750 S Buffalo Dr, 89147) sits on Buffalo Drive in this west-central corridor. Use the official CCSD assignment for a specific address rather than assuming one school serves every Buffalo Ranch street.",
      "Buyers comparing Buffalo Ranch with The Foothills or Desert Breeze should filter by subdivision and HOA, not by the word Spring Valley alone.",
    ],
    faqs: [
      {
        question: "Is Buffalo Ranch in Spring Valley?",
        answer:
          "Yes. Buffalo Ranch is near Buffalo Drive and Peace Way, inside unincorporated Spring Valley.",
      },
    ],
    relatedSlugs: ["the-foothills", "desert-breeze", "spanish-trail"],
    relatedZips: ["89147", "89113"],
    latitude: 36.118,
    longitude: -115.26,
  },
  {
    slug: "canyon-gate",
    name: "Canyon Gate",
    shortLocation: "Sahara Avenue and Durango Drive",
    highlights: ["Sahara & Durango", "North Spring Valley", "Country club"],
    summary:
      "Canyon Gate sits at Sahara Avenue and Durango Drive on the north edge of unincorporated Spring Valley. This site has no separate Canyon Gate domain; the community belongs here.",
    body: [
      "Sahara Avenue is the north boundary of the Spring Valley CDP. Canyon Gate is on the Spring Valley side of that line. Immediately north, Peccole Ranch (Charleston to Sahara) is outside the CDP.",
      "The Lakes sits nearby inside the same geographic box (Sahara to Desert Inn, Durango to Hualapai) but is incorporated City of Las Vegas—a different jurisdiction. We link The Lakes out rather than treating it as a Spring Valley subdivision.",
    ],
    faqs: [
      {
        question: "Is Canyon Gate in Spring Valley?",
        answer:
          "Yes. Canyon Gate is at Sahara Avenue and Durango Drive inside unincorporated Spring Valley. Sahara Avenue is the CDP’s north boundary.",
      },
      {
        question: "Is Canyon Gate the same as The Lakes?",
        answer:
          "No. The Lakes is incorporated City of Las Vegas even though it sits in the same west-valley geographic box. Canyon Gate is unincorporated Spring Valley. Confirm jurisdiction on the tax bill and listing.",
      },
    ],
    relatedSlugs: ["desert-breeze", "section-10", "chinatown-spring-mountain"],
    relatedZips: ["89117", "89146"],
    latitude: 36.145,
    longitude: -115.279,
  },
  {
    slug: "desert-breeze",
    name: "Desert Breeze",
    shortLocation: "Spring Mountain Road and Durango Drive",
    highlights: ["Desert Breeze Park", "North-central Spring Valley"],
    summary:
      "Desert Breeze is the north-central Spring Valley pocket around Spring Mountain Road and Durango Drive, named for Desert Breeze Park and the county recreation center.",
    body: [
      "Desert Breeze Park and the Desert Breeze Community Center (8275 Spring Mountain Rd) sit in the north-central part of the town. Roger M. Bryan Elementary School (8255 W Katie Ave) is next to the park.",
      "Residential streets around the park mix single-family homes with nearby condo and townhome pockets. This is unincorporated Spring Valley, not Summerlin and not City of Las Vegas streets north of Sahara Avenue.",
    ],
    faqs: [
      {
        question: "Is Desert Breeze Park in Spring Valley?",
        answer:
          "Yes. The park is at Spring Mountain Road and Durango Drive in the north-central part of unincorporated Spring Valley.",
      },
    ],
    relatedSlugs: ["canyon-gate", "buffalo-ranch", "the-foothills"],
    relatedZips: ["89117", "89147", "89146"],
    latitude: 36.126,
    longitude: -115.279,
  },
  {
    slug: "rancho-viejo",
    name: "Rancho Viejo",
    shortLocation: "Condo and townhome pockets in east Spring Valley",
    highlights: ["Condo pockets", "East Spring Valley"],
    summary:
      "Rancho Viejo refers to condo and townhome pockets in east Spring Valley—lower-maintenance product compared with guard-gated golf streets to the west.",
    body: [
      "HOA budgets, reserves, and rental rules matter more here than in many single-family tracts. We review those documents on the community you are actually buying, not a generic Spring Valley average.",
      "These pockets sit west of Decatur Boulevard and inside the CDP. They are not Paradise (east of Decatur) and not central Las Vegas 89102 north of Sahara Avenue.",
    ],
    faqs: [
      {
        question: "Is Rancho Viejo in Spring Valley?",
        answer:
          "Yes. Rancho Viejo is used for condo and townhome pockets in unincorporated Spring Valley, typically on the east side of the CDP toward Decatur Boulevard.",
      },
    ],
    relatedSlugs: ["chinatown-spring-mountain", "spanish-trail", "tiburon"],
    relatedZips: ["89103", "89118"],
    latitude: 36.12,
    longitude: -115.215,
  },
  {
    slug: "section-10",
    name: "Section 10",
    shortLocation: "Rural-estate zoning, north Spring Valley",
    highlights: ["Rural-estate zoning", "Large lots", "North Spring Valley"],
    summary:
      "Section 10 is the large-lot, rural-estate / horse-property pocket in north Spring Valley—one of the genuinely hyperlocal pieces of the CDP, not a master-planned village.",
    body: [
      "Clark County rural-estate zoning here means larger parcels than typical Spring Valley subdivisions. Utilities, animals, and outbuildings are governed by county zoning and any private restrictions on the parcel—not by a golf-community HOA.",
      "The pocket sits south of Sahara Avenue and east of Hualapai Way. North of Sahara is outside Spring Valley (including Peccole Ranch). Confirm lot size and zoning on the assessor record before you write an offer.",
    ],
    faqs: [
      {
        question: "What is Section 10 in Spring Valley?",
        answer:
          "Section 10 is the rural-estate, large-lot horse-property pocket in north unincorporated Spring Valley, inside the Sahara–Decatur–Warm Springs–Hualapai boundary.",
      },
    ],
    relatedSlugs: [
      "canyon-gate",
      "desert-breeze",
      "spring-mountain-fort-apache",
    ],
    relatedZips: ["89117", "89146"],
    latitude: 36.14,
    longitude: -115.3,
  },
  {
    slug: "spring-mountain-fort-apache",
    name: "Spring Mountain & Fort Apache",
    shortLocation: "Lewis Homes, 1998–2000, no HOA — Rainfall streets",
    highlights: ["Lewis Homes 1998–2000", "No HOA", "Rainfall"],
    summary:
      "The Spring Mountain Road and Fort Apache Road pocket includes Lewis Homes tracts built about 1998–2000 with no HOA, including streets such as Rainfall.",
    body: [
      "No HOA is the practical distinction versus gated golf communities a few miles east. Buyers still verify CC&Rs, county zoning, and any landscaping or wall-maintenance agreements that are not a full HOA.",
      "This pocket is west Spring Valley, east of Hualapai Way and south of Sahara Avenue. It is not Summerlin and not Mountain’s Edge (89178) south of Warm Springs Road.",
    ],
    faqs: [
      {
        question:
          "Is there a no-HOA pocket at Spring Mountain and Fort Apache?",
        answer:
          "Yes. Lewis Homes built streets in this west Spring Valley pocket about 1998–2000 without an HOA, including Rainfall. Confirm HOA status on the specific parcel.",
      },
    ],
    relatedSlugs: ["the-foothills", "desert-breeze", "section-10"],
    relatedZips: ["89147", "89117"],
    latitude: 36.126,
    longitude: -115.298,
  },
  {
    slug: "chinatown-spring-mountain",
    name: "Chinatown / Spring Mountain",
    shortLocation: "Spring Mountain Road corridor west of Decatur Boulevard",
    highlights: [
      "Spring Mountain corridor",
      "West of Decatur",
      "Lifestyle draw",
    ],
    summary:
      "The Chinatown / Spring Mountain corridor west of Decatur Boulevard is inside Spring Valley and is the high-volume dining and retail draw for much of the CDP.",
    body: [
      "Decatur Boulevard is the east boundary of the Spring Valley CDP. The Spring Mountain corridor west of Decatur is in Spring Valley; east of Decatur is not. Residential search here is about specific condo and small-lot streets, not the restaurant strip alone.",
      "Drive times from Spanish Trail, Rancho Viejo, or Desert Breeze to this corridor vary by signal timing. We map that from the listing address rather than from the neighborhood name.",
    ],
    faqs: [
      {
        question: "Is Chinatown in Spring Valley?",
        answer:
          "The Spring Mountain Road dining corridor west of Decatur Boulevard is inside unincorporated Spring Valley. Decatur Boulevard is the CDP’s east boundary.",
      },
    ],
    relatedSlugs: ["rancho-viejo", "desert-breeze", "canyon-gate"],
    relatedZips: ["89103", "89146", "89118"],
    latitude: 36.126,
    longitude: -115.21,
  },
];

export const SPRING_VALLEY_OUTBOUND_NEIGHBORS: readonly SpringValleyOutboundNeighbor[] =
  [
    {
      name: "Peccole Ranch",
      href: "https://www.peccolehomes.com",
      whyOutbound:
        "Peccole Ranch runs Charleston Boulevard to Sahara Avenue, so it sits north of the Spring Valley CDP boundary.",
    },
    {
      name: "Rhodes Ranch",
      href: "https://www.rhodesranchlasvegas.com",
      whyOutbound:
        "Rhodes Ranch is in Enterprise, south of Warm Springs Road—the south boundary of Spring Valley.",
    },
    {
      name: "The Lakes",
      href: "https://www.thelakesvegas.com",
      whyOutbound:
        "The Lakes falls inside the geographic box at Sahara Avenue to Desert Inn Road, Durango Drive to Hualapai Way, but it is incorporated City of Las Vegas—a separate jurisdiction from unincorporated Spring Valley.",
    },
  ];

export const DESERT_SHORES_NOTE =
  "Desert Shores is in the northwest valley near Cheyenne Road. Some realtor guides wrongly list it as Spring Valley; it is not inside this CDP and is not a neighborhood on this site.";

export function springValleyZipStaticParams(): { zipcode: string }[] {
  return SPRING_VALLEY_ZIP_CODES.map((zipcode) => ({ zipcode }));
}

export function isSpringValleyZip(zip: string): zip is SpringValleyZipCode {
  return (SPRING_VALLEY_ZIP_CODES as readonly string[]).includes(zip);
}

export function getSpringValleyZip(
  zip: string,
): SpringValleyZipRecord | undefined {
  if (!isSpringValleyZip(zip)) return undefined;
  return SPRING_VALLEY_ZIPS.find((entry) => entry.zip === zip);
}

export function getSpringValleySubdivision(
  slug: string,
): SpringValleySubdivision | undefined {
  return SPRING_VALLEY_SUBDIVISIONS.find((entry) => entry.slug === slug);
}

export function otherSpringValleySubdivisions(
  slug: SpringValleySubdivisionSlug,
): SpringValleySubdivision[] {
  return SPRING_VALLEY_SUBDIVISIONS.filter(
    (entry) => entry.slug !== slug,
  ).slice();
}
