import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import BuyerEngagementStrip from "@/components/sections/BuyerEngagementStrip";
import Link from "next/link";
import { Phone, MapPin, Home, School, Car, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateNeighborhoodSchema,
  generateWebPageSchema,
  combineSchemas,
} from "@/lib/schema";
import { absoluteMediaUrl, springValleyMarketingOgSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import {
  agentInfo,
  googleMyMapEmbedUrl,
  googleMyMapViewerUrl,
  officeInfo,
  siteConfig,
} from "@/lib/site-config";
import { metaDescriptionWithKeyword, seoPrimaryKeyword } from "@/lib/seo";
import { realScoutConfig } from "@/lib/integrations";

const propertyTaxGuideUrl = `${siteConfig.url}/neighborhoods/spring-valley/property-taxes`;

const springValleyCityMapUrl = realScoutConfig.springValleyCityMapUrl;

const springValleyOgUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
const springValleyOgTwitter = ogTwitterImageFields(springValleyOgUrl, {
  alt: "Spring Valley Las Vegas homes and west valley real estate — neighborhood guide preview",
});

export const metadata: Metadata = {
  alternates: {
    canonical: "/neighborhoods/spring-valley",
  },
  title: "Spring Valley NV Homes & West Valley Guide",
  description: metaDescriptionWithKeyword(
    "Spring Valley NV real estate guide—map, popular west valley pockets, MLS search for Spring Valley Nevada homes for sale, and buyer-seller guidance with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    true,
  ),
  keywords: [
    "Spring Valley Las Vegas homes",
    "Spring Valley NV homes",
    "Spring Valley Las Vegas map",
    "Spring Valley Nevada homes",
    "Spring Valley Nevada homes for sale",
    "Spring Valley NV real estate",
    "west Las Vegas homes",
    "Spring Valley neighborhood",
    "homes for sale Spring Valley Las Vegas",
    "Enterprise Las Vegas homes",
    "West Sahara Las Vegas",
    "Rhodes Ranch Las Vegas",
  ],
  openGraph: {
    title: "Spring Valley NV Homes & West Valley Guide | Dr. Jan Duffy",
    description: metaDescriptionWithKeyword(
      "Spring Valley NV real estate guide—map, popular west valley pockets, MLS search for Spring Valley Nevada homes for sale, and buyer-seller guidance with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
      true,
    ),
    url: `${siteConfig.url}/neighborhoods/spring-valley`,
    type: "website",
    ...springValleyOgTwitter.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring Valley NV Homes & West Valley Guide | Dr. Jan Duffy",
    description: metaDescriptionWithKeyword(
      "Spring Valley NV real estate guide—map, popular west valley pockets, MLS search for Spring Valley Nevada homes for sale, and buyer-seller guidance with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
      true,
    ),
    ...springValleyOgTwitter.twitter,
  },
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Neighborhoods", url: "/neighborhoods" },
  { name: "Spring Valley", url: "/neighborhoods/spring-valley" },
];

const springValleyFaqs = [
  {
    question: "Where can I see a Spring Valley Las Vegas map?",
    answer:
      "A Spring Valley Las Vegas map helps you see how the community sits on the west side of the valley versus the Strip, Summerlin, and major roads. This guide includes an interactive map layer for orientation; for turn-by-turn directions to a specific Spring Valley Nevada homes address, we use MLS mapping and tour planning once you pick listings you want to see.",
  },
  {
    question: "What are Spring Valley Nevada homes like?",
    answer:
      "Spring Valley Nevada homes span many subdivisions and price points—single-family homes, townhomes, and condos—within unincorporated Clark County. Because “Spring Valley” covers a wide area, Spring Valley Nevada homes can differ sharply by block, school zone, and HOA. We help you compare comps in the same pocket, not just the neighborhood name.",
  },
  {
    question: "How do I search Spring Valley Nevada homes for sale?",
    answer: `Start with the live MLS map search filtered to Spring Valley city boundaries on our portal—open ${springValleyCityMapUrl} to pan, zoom, and scan inventory on the map, then refine by price, beds, baths, and area. Inventory for Spring Valley Nevada homes for sale changes daily, so save your search and act quickly on well-priced listings. Dr. Jan Duffy can coordinate showings and offer strategy for the specific Spring Valley pocket you prefer.`,
  },
  {
    question: "What are Spring Valley Las Vegas homes like?",
    answer:
      "Spring Valley Las Vegas homes include single-family houses, townhomes, and condos across a large unincorporated area on the west side of the Las Vegas Valley. You will find everything from mid-century properties to newer infill builds, with price points that often differ by block and HOA. Searching Spring Valley Las Vegas homes by ZIP and subdivision helps compare apples to apples.",
  },
  {
    question: "Is Spring Valley the same as Spring Valley Ranch?",
    answer:
      "People often use “Spring Valley” for the broader west valley area. Smaller named pockets and subdivisions can have different HOA rules and price trends. When you tour Spring Valley Las Vegas homes, we review the specific community name, HOA budget, and recent comps—not just the mailing address.",
  },
  {
    question: "How is the commute from Spring Valley to the Strip or Summerlin?",
    answer:
      "Many Spring Valley locations offer a practical commute to employment centers along I-15, the 215 Beltway, and Charleston Boulevard corridors. Exact drive times depend on your street and time of day. We map morning and evening routes when you are narrowing Spring Valley Las Vegas homes by workplace.",
  },
  {
    question: "Who can help me buy or sell Spring Valley Las Vegas homes?",
    answer: `Dr. Jan Duffy and the team at Berkshire Hathaway HomeServices Nevada Properties represent buyers and sellers across Spring Valley and the Las Vegas Valley. Call ${agentInfo.phone} or email ${agentInfo.email}. Office: ${officeInfo.address.full}.`,
  },
  {
    question: "Is Rhodes Ranch the same as Spring Valley?",
    answer:
      "Not exactly. Rhodes Ranch is a well-known guard-gated golf community in the Enterprise area of the southwest valley. Buyers often compare Rhodes Ranch listings with Spring Valley Las Vegas homes because both sit on the west side of the valley, but MLS boundaries and mailing addresses are not identical to everyday neighborhood names. We align your search to the communities and commute you want—not just a label on a map.",
  },
  {
    question: "What ZIP codes are used for Spring Valley, NV?",
    answer:
      "Spring Valley spans multiple ZIP codes (commonly including areas such as 89103, 89117, 89146, and 89147—always confirm on a specific listing). Schools, HOA rules, and insurance can change block by block, so we verify details on the property you choose rather than assuming one ZIP tells the whole story.",
  },
  {
    question: "What are popular pockets buyers compare to Spring Valley?",
    answer:
      "West-side buyers often compare Spring Valley with nearby corridors and communities—examples include west Sahara and Charleston corridors, The Lakes and Chinatown/Spring Mountain dining, Enterprise-area communities like Rhodes Ranch, and condo or townhome pockets such as Rancho Viejo. Inventory and pricing change weekly; we run live MLS comps for the pocket you care about.",
  },
  {
    question: "What is the effective property tax rate in Spring Valley, NV?",
    answer:
      `Third-party sources often cite an effective rate near 0.48% for Spring Valley (total tax relative to value)—useful for comparison, not your official bill. See the Spring Valley property tax guide for an illustrative calculator, citations, and Clark County resources: ${propertyTaxGuideUrl}`,
  },
  {
    question: "How are Clark County property taxes calculated for Spring Valley homes?",
    answer:
      `Nevada property taxes use taxable assessed value and district levies—not a simple market value times one percentage. Spring Valley sits in unincorporated Clark County; verify assessments and bills with the Clark County Assessor. Full overview: ${propertyTaxGuideUrl}`,
  },
  {
    question: "Is market value the same as taxable value on my Nevada property tax bill?",
    answer:
      `Not necessarily. Your purchase price or online estimate is not the same as the county-assessed taxable value. Abatements and caps can apply to primary residences. Confirm on your assessment notice or the Assessor. More detail: ${propertyTaxGuideUrl}`,
  },
  {
    question: "Where can I learn more about Spring Valley property taxes before I buy?",
    answer:
      `Read the dedicated guide for effective rates, an illustrative calculator, and official Clark County links—then call ${agentInfo.phone} to fold taxes into your overall budget.`,
  },
];

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(breadcrumbs),
  generateWebPageSchema({
    name: "Spring Valley Las Vegas Homes & West Valley Real Estate",
    description:
      "Spring Valley, NV—large west Las Vegas Valley area in Clark County. Spring Valley Las Vegas homes span diverse ZIP codes and pockets. Search Spring Valley Nevada homes for sale with MLS-backed guidance.",
    url: "/neighborhoods/spring-valley",
    primaryImageOfPage: springValleyOgUrl,
  }),
  generateNeighborhoodSchema({
    name: "Spring Valley",
    slug: "spring-valley",
    description:
      "Spring Valley, NV—large west Las Vegas Valley area in Clark County. Spring Valley Las Vegas homes span diverse ZIP codes and pockets (including west Sahara corridors, Enterprise-adjacent communities buyers compare such as Rhodes Ranch, and condo areas like Rancho Viejo). Search Spring Valley Nevada homes for sale with MLS-backed guidance.",
    latitude: 36.107,
    longitude: -115.245,
    containedIn: "Las Vegas",
  }),
  generateFAQSchema(springValleyFaqs),
);

/** Renders FAQ answer text; wraps the portal map URL in a descriptive link when present (matches JSON-LD text). */
function SpringValleyFaqAnswerBody({
  text,
  mapUrl,
}: {
  text: string;
  mapUrl: string;
}) {
  if (!text.includes(mapUrl)) {
    return <>{text}</>;
  }
  const parts = text.split(mapUrl);
  return (
    <>
      {parts[0]}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        Spring Valley homes for sale—live map search
      </a>
      {parts[1] ?? ""}
    </>
  );
}

export default function SpringValleyPage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} id="spring-valley-schema" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-6">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/neighborhoods" className="hover:text-blue-600">
                Neighborhoods
              </Link>
              {" / "}
              <span className="text-slate-900">Spring Valley</span>
            </nav>
          </div>

          <header className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              {seoPrimaryKeyword}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Spring Valley Las Vegas Homes &amp; West Valley Real Estate
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Spring Valley is one of the most searched areas for{" "}
              <strong>Spring Valley Las Vegas homes</strong>—a broad, established west valley
              community with diverse housing, mature neighborhoods, and convenient access to
              employment corridors. Use this guide to orient your search, then explore live listings
              or talk with Dr. Jan Duffy about timing, offers, and pricing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <a
                href={springValleyCityMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm"
              >
                Spring Valley homes for sale—live map search
              </a>
              <p className="text-sm text-slate-500 text-center sm:text-left max-w-xs">
                Opens the MLS portal map with a Spring Valley city filter—refine by price, beds, and
                baths on the same search Dr. Jan uses with buyers.
              </p>
            </div>
          </header>
        </div>

        <BuyerEngagementStrip browseListingsHref="#featured-properties" />

        <RealScoutListings />

        <div className="container mx-auto px-4">
          <section className="max-w-4xl mx-auto mb-14 prose prose-slate">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Where is Spring Valley in Las Vegas?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Spring Valley refers to a large section of unincorporated Clark County on the west side
              of the Las Vegas Valley—generally west of the Strip and spanning many residential pockets.
              Because the name covers a wide geography, <strong>Spring Valley Las Vegas homes</strong>{" "}
              can feel very different from one ZIP or subdivision to the next. That is why we pair map
              search with neighborhood-level detail before you write an offer.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
              What types of properties will I find?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Buyers exploring Spring Valley Las Vegas homes often consider single-family homes with
              pools, renovated mid-century properties, and low-maintenance townhomes—depending on budget
              and lifestyle. Investment buyers may look at duplex opportunities where allowed. We help
              you align property type with HOA rules, insurance considerations, and your long-term
              plans—whether you are upsizing, relocating, or buying your first home.
            </p>
          </section>

          {/* Related search: Spring Valley Las Vegas map */}
          <section className="max-w-4xl mx-auto mb-14" aria-labelledby="spring-valley-map-heading">
            <h2
              id="spring-valley-map-heading"
              className="text-2xl font-bold text-slate-900 mb-3 text-center"
            >
              Spring Valley Las Vegas map
            </h2>
            <p className="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
              Use this layer to orient <strong>Spring Valley Nevada homes</strong> within the west
              valley—major roads and nearby communities. For a specific address or tour route, we pair
              maps with MLS data when you are under contract to buy or sell.
            </p>
            <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <iframe
                src={googleMyMapEmbedUrl}
                width={640}
                height={480}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Spring Valley Las Vegas map — west valley orientation"
                className="w-full border-0 aspect-[4/3] max-h-[min(480px,70vh)]"
              />
            </div>
            <p className="text-center text-sm text-slate-500 mt-4">
              <a
                href={googleMyMapViewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Open the full map in Google Maps
              </a>
              {" · "}
              <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                Office map &amp; directions
              </Link>
            </p>
          </section>

          {/* Related search: Spring Valley Nevada homes for sale */}
          <section
            className="max-w-4xl mx-auto mb-14 rounded-2xl border border-blue-100 bg-blue-50/80 px-6 py-8 md:px-10"
            aria-labelledby="spring-valley-homes-sale-heading"
          >
            <h2
              id="spring-valley-homes-sale-heading"
              className="text-2xl font-bold text-slate-900 mb-3 text-center"
            >
              Spring Valley Nevada homes for sale
            </h2>
            <p className="text-slate-700 text-center mb-6 max-w-2xl mx-auto">
              Browse active inventory and filter by price, beds, baths, and more. When you are
              serious about <strong>Spring Valley Nevada homes for sale</strong>, we narrow by
              subdivision, HOA, and recent comps—not just the zip code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a
                href={springValleyCityMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Open Spring Valley map search
              </a>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center bg-white border border-blue-200 text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
              >
                Search MLS listings on this site
              </Link>
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50"
              >
                Call {agentInfo.phone}
              </a>
            </div>
          </section>

          <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <Home className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Housing variety</h3>
              <p className="text-sm text-slate-600">
                Diverse product types across Spring Valley mean your search should be filtered by price,
                beds, baths, and HOA—not just the word “Spring Valley.”
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <Car className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Central access</h3>
              <p className="text-sm text-slate-600">
                Many locations balance west valley living with commute options toward the 215, I-15,
                and major employment hubs.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <School className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Schools &amp; services</h3>
              <p className="text-sm text-slate-600">
                School assignments and services vary by address. We point you to official sources and
                local contacts as part of due diligence.
              </p>
            </div>
          </section>

          <section
            className="max-w-4xl mx-auto mb-14 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-6 py-8 md:px-10"
            aria-labelledby="spring-valley-property-tax-heading"
          >
            <h2
              id="spring-valley-property-tax-heading"
              className="text-xl font-bold text-slate-900 mb-3 text-center md:text-2xl"
            >
              Spring Valley Property Taxes &amp; Clark County
            </h2>
            <p className="text-slate-700 text-center mb-6 max-w-2xl mx-auto text-sm md:text-base">
              Third-party estimates often put the <strong>effective rate near 0.48%</strong>—useful
              for budgeting, not your official bill. Use the guide for an illustrative calculator,
              how Nevada assessments work, and Clark County Assessor links.
            </p>
            <div className="flex justify-center">
              <Link
                href="/neighborhoods/spring-valley/property-taxes"
                className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Spring Valley property tax guide
              </Link>
            </div>
          </section>

          {/* GEO: pockets & corridors buyers compare (entity + internal linking) */}
          <section
            className="max-w-6xl mx-auto mb-16"
            aria-labelledby="spring-valley-pockets-heading"
          >
            <h2
              id="spring-valley-pockets-heading"
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-center"
            >
              Areas buyers often compare with Spring Valley, NV
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
              <strong>Spring Valley Las Vegas homes</strong> sit in a large, established west valley
              footprint. Buyers frequently cross-shop nearby pockets—pricing and inventory change
              daily, so we use live MLS data for the exact community and address you choose.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">West Sahara &amp; west corridors</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Residential pockets along west Sahara and Charleston corridors mix older and newer
                  stock with easy access to west valley shopping, parks like{" "}
                  <span className="whitespace-nowrap">Desert Breeze</span>, and Red Rock views from
                  select elevations. School zones and HOA rules vary—always verify on the listing
                  you like.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Rhodes Ranch &amp; Enterprise</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong>Rhodes Ranch</strong> is a guard-gated golf community in the{" "}
                  <strong>Enterprise</strong> area—often searched alongside Spring Valley listings
                  because both sit on the west side of the valley. If you want a single amenity-rich
                  community, we narrow your search to MLS boundaries that match—not just the name.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Rancho Viejo &amp; condo pockets</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Dense condo and townhome communities offer lower-maintenance options for
                  first-time buyers and investors. We review HOA budgets, reserves, and rental rules
                  when you compare these to single-family Spring Valley Nevada homes.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Chinatown / Spring Mountain</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  The Spring Mountain corridor is known for diverse dining and retail—many
                  Spring Valley buyers want a short drive to this hub. If walkability to restaurants
                  matters, we map realistic drive times from specific listings—not just distance.
                </p>
              </article>
            </div>
          </section>

          {/* GEO hub: internal links (AEO + crawl paths) */}
          <section
            className="max-w-6xl mx-auto mb-16 rounded-2xl border border-slate-200 bg-slate-50/90 px-6 py-10 md:px-10"
            aria-labelledby="spring-valley-local-links-heading"
          >
            <h2
              id="spring-valley-local-links-heading"
              className="text-2xl font-bold text-slate-900 mb-8 text-center"
            >
              Spring Valley, NV — local search &amp; resources
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Search &amp; market</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href={springValleyCityMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Spring Valley homes for sale—live map search
                    </a>
                  </li>
                  <li>
                    <Link href="/listings" className="text-blue-600 hover:underline">
                      Spring Valley Nevada homes for sale (MLS)
                    </Link>
                  </li>
                  <li>
                    <Link href="/search" className="text-blue-600 hover:underline">
                      Search by zip code
                    </Link>
                  </li>
                  <li>
                    <Link href="/las-vegas-zip-code-map" className="text-blue-600 hover:underline">
                      Las Vegas zip code map
                    </Link>
                  </li>
                  <li>
                    <Link href="/market-report" className="text-blue-600 hover:underline">
                      Las Vegas market report
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/neighborhoods/spring-valley/property-taxes"
                      className="text-blue-600 hover:underline"
                    >
                      Spring Valley property taxes &amp; rate
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Buyers &amp; sellers</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/buyers" className="text-blue-600 hover:underline">
                      Spring Valley home buyers
                    </Link>
                  </li>
                  <li>
                    <Link href="/sellers" className="text-blue-600 hover:underline">
                      Sell a home in Las Vegas
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-blue-600 hover:underline">
                      Contact Dr. Jan Duffy
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-blue-600 hover:underline">
                      Real estate FAQs
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Nearby neighborhoods</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/neighborhoods/enterprise" className="text-blue-600 hover:underline">
                      Enterprise &amp; Rhodes Ranch
                    </Link>
                  </li>
                  <li>
                    <Link href="/neighborhoods/paradise" className="text-blue-600 hover:underline">
                      Paradise (Strip &amp; UNLV corridor)
                    </Link>
                  </li>
                  <li>
                    <Link href="/neighborhoods/summerlin" className="text-blue-600 hover:underline">
                      Summerlin homes
                    </Link>
                  </li>
                  <li>
                    <Link href="/neighborhoods/mountains-edge" className="text-blue-600 hover:underline">
                      Mountains Edge
                    </Link>
                  </li>
                  <li>
                    <Link href="/neighborhoods/centennial-hills" className="text-blue-600 hover:underline">
                      Centennial Hills
                    </Link>
                  </li>
                  <li>
                    <Link href="/neighborhoods/the-ridges" className="text-blue-600 hover:underline">
                      The Ridges (luxury)
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">More cities &amp; communities</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/neighborhoods/henderson" className="text-blue-600 hover:underline">
                      Henderson real estate
                    </Link>
                  </li>
                  <li>
                    <Link href="/neighborhoods/green-valley" className="text-blue-600 hover:underline">
                      Green Valley
                    </Link>
                  </li>
                  <li>
                    <Link href="/neighborhoods/north-las-vegas" className="text-blue-600 hover:underline">
                      North Las Vegas
                    </Link>
                  </li>
                  <li>
                    <Link href="/neighborhoods" className="text-blue-600 hover:underline">
                      All Las Vegas neighborhoods
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Spring Valley Las Vegas homes — FAQs
            </h2>
            <div className="space-y-4">
              {springValleyFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-slate-200 rounded-lg p-5 bg-white"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <SpringValleyFaqAnswerBody text={faq.answer} mapUrl={springValleyCityMapUrl} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-16 bg-blue-600 text-white rounded-2xl p-8 md:p-10 text-center">
            <MapPin className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-3">Talk with Dr. Jan Duffy about Spring Valley</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get a clear plan for touring Spring Valley Las Vegas homes, pricing strategy, and
              contract timelines—backed by Berkshire Hathaway HomeServices Nevada Properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
              >
                <Phone className="h-4 w-4 mr-2" />
                {agentInfo.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Schedule a consultation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              {officeInfo.name} · {officeInfo.address.full}
            </p>
          </section>

          <section className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Explore more Las Vegas neighborhoods
            </h2>
            <p className="text-center text-slate-600 mb-6">
              Compare <strong>Spring Valley Las Vegas homes</strong> with{" "}
              <Link href="/neighborhoods/summerlin" className="text-blue-600 hover:underline">
                Summerlin
              </Link>
              ,{" "}
              <Link href="/neighborhoods/green-valley" className="text-blue-600 hover:underline">
                Green Valley
              </Link>
              , or{" "}
              <Link href="/neighborhoods" className="text-blue-600 hover:underline">
                view all neighborhoods
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
