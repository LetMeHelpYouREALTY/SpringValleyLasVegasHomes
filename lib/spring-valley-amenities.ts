/**
 * Spring Valley, Nevada — hyperlocal amenity map config and curated places.
 * Center: U.S. Census Bureau 2020 Gazetteer file (Spring Valley CDP, Clark County, NV).
 * @see https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html
 */

export const springValleyCommunity = {
  name: "Spring Valley",
  displayName: "Spring Valley, Las Vegas",
  city: "Las Vegas",
  state: "NV",
  county: "Clark County",
  /** Census CDP centroid — not a single HOA clubhouse; represents the community area center. */
  center: {
    lat: 36.107159,
    lng: -115.245216,
  },
  centerSource:
    "U.S. Census Bureau 2020 Gazetteer — Spring Valley census-designated place (Clark County, Nevada)",
  defaultZoom: 14,
  searchRadiusMeters: 6000,
} as const;

export type AmenityCategoryId =
  | "restaurants"
  | "cafes"
  | "grocery"
  | "parks"
  | "golf"
  | "healthcare"
  | "pharmacies"
  | "shopping"
  | "parking"
  | "fitness"
  | "schools";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Places API (New) primary types — one searchNearby per category */
  primaryTypes: string[];
};

/** General west-valley / Spring Valley — schools included; not 55+ or high-rise ordering. */
export const amenityCategories: AmenityCategory[] = [
  { id: "restaurants", label: "Restaurants", primaryTypes: ["restaurant"] },
  { id: "cafes", label: "Cafes", primaryTypes: ["cafe", "coffee_shop"] },
  { id: "grocery", label: "Grocery", primaryTypes: ["supermarket", "grocery_store"] },
  { id: "parks", label: "Parks", primaryTypes: ["park"] },
  { id: "golf", label: "Golf", primaryTypes: ["golf_course"] },
  { id: "healthcare", label: "Healthcare", primaryTypes: ["hospital", "doctor"] },
  { id: "pharmacies", label: "Pharmacies", primaryTypes: ["pharmacy"] },
  { id: "shopping", label: "Shopping", primaryTypes: ["shopping_mall", "department_store"] },
  { id: "parking", label: "Parking", primaryTypes: ["parking"] },
  { id: "fitness", label: "Fitness", primaryTypes: ["gym", "fitness_center"] },
  { id: "schools", label: "Schools", primaryTypes: ["school", "primary_school", "secondary_school"] },
];

export type CuratedPlace = {
  name: string;
  address: string;
  category: AmenityCategoryId;
  /** Official site used to verify name and address */
  sourceUrl: string;
  /** schema.org type for ItemList entries */
  schemaType:
    | "Restaurant"
    | "CafeOrCoffeeShop"
    | "GroceryStore"
    | "Park"
    | "GolfCourse"
    | "Hospital"
    | "Pharmacy"
    | "ShoppingCenter"
    | "School"
    | "ExerciseGym"
    | "Library";
  note?: string;
};

/** Verified public venues — names and street addresses from primary sources only. */
export const curatedSpringValleyPlaces: CuratedPlace[] = [
  {
    name: "Spring Valley Hospital Medical Center",
    address: "5400 S Rainbow Blvd, Las Vegas, NV 89118",
    category: "healthcare",
    schemaType: "Hospital",
    sourceUrl: "https://www.springvalleyhospital.com/patients-visitors/visitors/directions-and-map",
  },
  {
    name: "Desert Breeze Park",
    address: "8275 Spring Mountain Rd, Las Vegas, NV 89117",
    category: "parks",
    schemaType: "Park",
    sourceUrl: "https://www.clarkcountynv.gov/government/departments/parks___recreation/desert-breeze-park-information",
    note: "Clark County regional park — 119 developed acres",
  },
  {
    name: "Spring Valley Community Park",
    address: "7600 W Flamingo Rd, Las Vegas, NV 89147",
    category: "parks",
    schemaType: "Park",
    sourceUrl: "https://parkslocator.clarkcountynv.gov/Search/ParkDetail?parkId=79",
  },
  {
    name: "Spring Valley Library",
    address: "4280 S Jones Blvd, Las Vegas, NV 89103",
    category: "parks",
    schemaType: "Library",
    sourceUrl: "https://thelibrarydistrict.org/locations/sv/",
    note: "Las Vegas-Clark County Library District branch",
  },
  {
    name: "Smith's Food and Drug",
    address: "8050 S Rainbow Blvd, Las Vegas, NV 89139",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/rainbow-southern/706/00706",
  },
  {
    name: "Smith's Food and Drug",
    address: "9851 W Charleston Blvd, Las Vegas, NV 89117",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/charleston-fort-apache/706/00353",
  },
  {
    name: "Sprouts Farmers Market",
    address: "7530 W Lake Mead Blvd, Las Vegas, NV 89128",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.sprouts.com/store/nv/las-vegas/las-vegas-lake-mead/",
  },
  {
    name: "Whole Foods Market",
    address: "8855 W Charleston Blvd, Las Vegas, NV 89117",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.wholefoodsmarket.com/stores/fortapache",
  },
  {
    name: "Rhodes Ranch Golf Club",
    address: "20 E Rhodes Ranch Pkwy, Las Vegas, NV 89148",
    category: "golf",
    schemaType: "GolfCourse",
    sourceUrl: "https://www.rhodesranchgolf.com/",
    note: "Adjacent Enterprise area — common for southwest-valley golfers",
  },
  {
    name: "Bali Hai Golf Club",
    address: "5160 S Las Vegas Blvd, Las Vegas, NV 89119",
    category: "golf",
    schemaType: "GolfCourse",
    sourceUrl: "https://www.balihaigolfclub.com/",
  },
  {
    name: "CVS Pharmacy",
    address: "8750 W Charleston Blvd, Las Vegas, NV 89117",
    category: "pharmacies",
    schemaType: "Pharmacy",
    sourceUrl: "https://www.cvs.com/store-locator/cvs-pharmacy-address/Las+Vegas-NV-89117/ID=10162",
    note: "Inside Target at Boca Park",
  },
  {
    name: "Boca Park Fashion Village",
    address: "750 S Rampart Blvd, Las Vegas, NV 89145",
    category: "shopping",
    schemaType: "ShoppingCenter",
    sourceUrl: "https://bocaparklv.com/",
  },
  {
    name: "Sig Rogich Middle School",
    address: "235 N Pavilion Center Dr, Las Vegas, NV 89144",
    category: "schools",
    schemaType: "School",
    sourceUrl: "https://www.rogichms.info/contact",
    note: "Clark County School District — verify zoning for your address",
  },
  {
    name: "John W. Bonner Elementary School",
    address: "765 Crestdale Ln, Las Vegas, NV 89144",
    category: "schools",
    schemaType: "School",
    sourceUrl: "https://www.bonnerelementary.com/contact",
    note: "Clark County School District — verify zoning for your address",
  },
];

export const amenitiesPageFaqs = [
  {
    question: "What grocery stores are near Spring Valley, Las Vegas?",
    answer:
      "Spring Valley buyers commonly shop at Smith's Food and Drug on South Rainbow Boulevard or West Charleston Boulevard, Sprouts Farmers Market on West Lake Mead Boulevard, and Whole Foods Market on West Charleston Boulevard—plus additional chains along Charleston, Rainbow, and Decatur depending on your pocket. Use the map on this page to orient from your target listing, then confirm drive time during the hours you would actually shop.",
  },
  {
    question: "How far is Spring Valley from the Las Vegas Strip?",
    answer:
      "Spring Valley sits on the west side of the Las Vegas Valley, generally a few miles west of the Strip corridor; approximate drive time to central Strip resorts is often roughly 15–25 minutes in typical traffic, but it varies widely by starting address, time of day, and which resort you target. We label all drive times as approximate—verify with a live map before you commit to a commute.",
  },
  {
    question: "Are there hospitals near Spring Valley?",
    answer:
      "Spring Valley Hospital Medical Center on South Rainbow Boulevard is the closest major acute-care hospital serving much of the Spring Valley area. For emergencies and specialists, confirm in-network providers with your insurer and map routes from the specific home you are buying.",
  },
  {
    question: "What parks and recreation are near Spring Valley homes?",
    answer:
      "Clark County parks such as Desert Breeze Park on Spring Mountain Road and Spring Valley Community Park on West Flamingo Road offer sports fields, walking paths, and community programming. The Spring Valley Library on South Jones Boulevard is a neighborhood anchor for events and resources. Golf options nearby include Rhodes Ranch Golf Club and Bali Hai Golf Club depending on your location within Spring Valley.",
  },
  {
    question: "How far is Spring Valley from Harry Reid International Airport?",
    answer:
      "From most Spring Valley addresses, Harry Reid International Airport is typically an approximate 20–35 minute drive via the 215 Beltway or surface streets, depending on traffic and your starting cross-streets. Run a live directions check from each listing you are serious about—airport runs at rush hour feel very different from mid-day.",
  },
  {
    question: "How far is Spring Valley from Downtown Summerlin?",
    answer:
      "Downtown Summerlin is northwest of much of Spring Valley; approximate drive time is often roughly 15–25 minutes when traffic is light, longer at peak hours. Many west-valley buyers compare Spring Valley with Summerlin villages for price, HOA, and commute—this page helps you map daily errands before you tour.",
  },
  {
    question: "Which schools serve Spring Valley addresses?",
    answer:
      "School assignments in Spring Valley depend on your exact street address and Clark County School District zoning—not the neighborhood name alone. Public schools serving parts of the west valley include sites such as Sig Rogich Middle School and John W. Bonner Elementary School; always confirm current zoning with CCSD and visit campuses before you buy.",
  },
  {
    question: "Who helps buyers compare Spring Valley amenities block by block?",
    answer:
      "Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices Nevada Properties (License S.0197614.LLC), specializes in Spring Valley Las Vegas homes and west valley real estate—call (702) 664-8424 or email DrDuffy@SpringValleyLasVegasHomes.com for showings, offer strategy, and pocket-by-pocket guidance.",
  },
] as const;

export function googleMapsEmbedUrl(lat: number, lng: number, zoom = 14): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function googleMapsDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function categoryById(id: AmenityCategoryId): AmenityCategory {
  const found = amenityCategories.find((c) => c.id === id);
  if (!found) {
    const first = amenityCategories[0];
    return first;
  }
  return found;
}
