import Navbar from "@/components/layouts/Navbar";
import PageAgentMark from "@/components/shared/PageAgentMark";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import BuyerEngagementStrip from "@/components/sections/BuyerEngagementStrip";
import SpringValleyCdpMap from "@/components/maps/SpringValleyCdpMap";
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
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { metaDescriptionWithKeyword, seoPrimaryKeyword } from "@/lib/seo";
import { realScoutConfig } from "@/lib/integrations";
import {
  SPRING_VALLEY_BOUNDARY,
  SPRING_VALLEY_OUTBOUND_NEIGHBORS,
  SPRING_VALLEY_SCHOOLS,
  SPRING_VALLEY_SUBDIVISIONS,
  SPRING_VALLEY_ZIP_CODES,
  SPRING_VALLEY_ZIPS,
} from "@/lib/spring-valley-geography";

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
  title: "Spring Valley NV Homes Inside the CDP",
  description: metaDescriptionWithKeyword(
    "Spring Valley NV real estate guide—Sahara, Decatur, Warm Springs, and Hualapai boundary, seven ZIP codes, Spanish Trail and other in-CDP pockets, MLS search with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    true,
  ),
  keywords: [
    "Spring Valley Las Vegas homes",
    "Spring Valley NV homes",
    "Spring Valley Las Vegas map",
    "Spring Valley Nevada homes",
    "Spring Valley Nevada homes for sale",
    "Spring Valley NV real estate",
    "Spanish Trail Spring Valley",
    "Spring Valley neighborhood",
    "homes for sale Spring Valley Las Vegas",
  ],
  openGraph: {
    title: "Spring Valley NV Homes Inside the CDP | Dr. Jan Duffy",
    description: metaDescriptionWithKeyword(
      "Spring Valley NV real estate guide—Sahara, Decatur, Warm Springs, and Hualapai boundary, seven ZIP codes, Spanish Trail and other in-CDP pockets, MLS search with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
      true,
    ),
    url: `${siteConfig.url}/neighborhoods/spring-valley`,
    type: "website",
    ...springValleyOgTwitter.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring Valley NV Homes Inside the CDP | Dr. Jan Duffy",
    description: metaDescriptionWithKeyword(
      "Spring Valley NV real estate guide—Sahara, Decatur, Warm Springs, and Hualapai boundary, seven ZIP codes, Spanish Trail and other in-CDP pockets, MLS search with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
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

const zipList = SPRING_VALLEY_ZIP_CODES.join(", ");
const zipCaveats = SPRING_VALLEY_ZIPS.filter((entry) => entry.caveat)
  .map((entry) => entry.caveat)
  .join(" ");

const springValleyFaqs = [
  {
    question: "Where can I see a Spring Valley Las Vegas map?",
    answer:
      "The map on this page is Google’s official Spring Valley, NV embed (Sahara Avenue north, Decatur Boulevard east, Warm Springs Road south, Hualapai Way west). For turn-by-turn directions to a specific address, we use MLS mapping once you pick listings to tour.",
  },
  {
    question: "What are Spring Valley Nevada homes like?",
    answer:
      "Spring Valley Nevada homes include single-family houses, townhomes, and condos inside unincorporated Clark County. Product type, HOA, and lot size change by subdivision—Spanish Trail is not Rancho Viejo. Compare comps in the same pocket, not just the name Spring Valley.",
  },
  {
    question: "How do I search Spring Valley Nevada homes for sale?",
    answer: `Start with the live MLS map search filtered to Spring Valley city boundaries on our portal—open ${springValleyCityMapUrl} to pan, zoom, and scan inventory on the map, then refine by price, beds, baths, and area. Inventory for Spring Valley Nevada homes for sale changes daily, so save your search and act quickly on well-priced listings. Dr. Jan Duffy can coordinate showings and offer strategy for the specific Spring Valley pocket you prefer.`,
  },
  {
    question: "What are Spring Valley Las Vegas homes like?",
    answer:
      "Spring Valley Las Vegas homes include single-family houses, townhomes, and condos across the census-designated place west of Decatur Boulevard. Searching by subdivision (Spanish Trail, Canyon Gate, Desert Breeze) and ZIP helps compare apples to apples.",
  },
  {
    question: "Is Spring Valley the same as Spring Valley Ranch?",
    answer:
      "This site does not treat Spring Valley Ranch as a confirmed in-CDP subdivision. “Spring Valley” here means the census-designated place. When you tour, we review the subdivision name, HOA, and comps on the listing—not just the mailing city.",
  },
  {
    question:
      "How is the commute from Spring Valley to the Strip or Summerlin?",
    answer:
      "Drive times depend on the street and time of day. From inside the CDP, I-15, the 215 Beltway, and Tropicana, Spring Mountain, Sahara, and Decatur corridors are the usual routes. We map morning and evening times from the listing address.",
  },
  {
    question: "Who can help me buy or sell Spring Valley Las Vegas homes?",
    answer: `Dr. Jan Duffy and the team at Berkshire Hathaway HomeServices Nevada Properties represent buyers and sellers in Spring Valley. Call ${agentInfo.phone} or email ${agentInfo.email}. Office: ${officeInfo.address.full}.`,
  },
  {
    question: "Is Rhodes Ranch the same as Spring Valley?",
    answer:
      "No. Rhodes Ranch is in Enterprise, south of Warm Springs Road—the south boundary of Spring Valley. This site links it out rather than listing it as a Spring Valley neighborhood.",
  },
  {
    question: "What ZIP codes are used for Spring Valley, NV?",
    answer: `This site generates pages for seven ZIPs that intersect the Spring Valley CDP: ${zipList}. ${zipCaveats} We still confirm jurisdiction on the listing, not the ZIP alone.`,
  },
  {
    question: "What are popular pockets buyers compare to Spring Valley?",
    answer:
      "Inside the CDP, buyers often compare Spanish Trail, Tiburon, Granada Hills, Canyon Gate, Desert Breeze, Buffalo Ranch, The Foothills, Rancho Viejo, Section 10, the Spring Mountain and Fort Apache Lewis Homes streets, and the Chinatown / Spring Mountain corridor west of Decatur. Rancho Viejo is a Spring Valley condo pocket—not a neighboring city. Peccole Ranch (north of Sahara), Rhodes Ranch (Enterprise), and The Lakes (City of Las Vegas) are outbound, not this site’s neighborhood set.",
  },
  {
    question: "What is the effective property tax rate in Spring Valley, NV?",
    answer: `Third-party sources often cite an effective rate near 0.48% for Spring Valley (total tax relative to value)—useful for comparison, not your official bill. See the Spring Valley property tax guide for an illustrative calculator, citations, and Clark County resources: ${propertyTaxGuideUrl}`,
  },
  {
    question:
      "How are Clark County property taxes calculated for Spring Valley homes?",
    answer: `Nevada property taxes use taxable assessed value and district levies—not a simple market value times one percentage. Spring Valley sits in unincorporated Clark County; verify assessments and bills with the Clark County Assessor. Full overview: ${propertyTaxGuideUrl}`,
  },
  {
    question:
      "Is market value the same as taxable value on my Nevada property tax bill?",
    answer: `Not necessarily. Your purchase price or online estimate is not the same as the county-assessed taxable value. Abatements and caps can apply to primary residences. Confirm on your assessment notice or the Assessor. More detail: ${propertyTaxGuideUrl}`,
  },
  {
    question:
      "Where can I learn more about Spring Valley property taxes before I buy?",
    answer: `Read the dedicated guide for effective rates, an illustrative calculator, and official Clark County links—then call ${agentInfo.phone} to fold taxes into your overall budget.`,
  },
];

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(breadcrumbs),
  generateWebPageSchema({
    name: "Spring Valley Las Vegas Homes",
    description:
      "Spring Valley, NV census-designated place in unincorporated Clark County—Sahara Avenue, Decatur Boulevard, Warm Springs Road, and Hualapai Way. Seven intersecting ZIP codes and eleven in-boundary subdivisions.",
    url: "/neighborhoods/spring-valley",
    primaryImageOfPage: springValleyOgUrl,
  }),
  generateNeighborhoodSchema({
    name: "Spring Valley",
    slug: "spring-valley",
    description:
      "Unincorporated Spring Valley, NV (census-designated place): Sahara Avenue north, Decatur Boulevard east, Warm Springs Road south, Hualapai Way west. Spanish Trail, Canyon Gate, Desert Breeze, and related pockets sit inside this box—not Rhodes Ranch, Paradise, or The Ridges.",
    latitude: 36.1080258,
    longitude: -115.2450006,
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
        <PageAgentMark />
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
              Spring Valley Las Vegas Homes
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Unincorporated Spring Valley is bounded by{" "}
              {SPRING_VALLEY_BOUNDARY.north}, {SPRING_VALLEY_BOUNDARY.east},{" "}
              {SPRING_VALLEY_BOUNDARY.south}, and {SPRING_VALLEY_BOUNDARY.west}
              —about {SPRING_VALLEY_BOUNDARY.squareMiles} square miles. Use this
              guide for the CDP, then search live listings or call Dr. Jan Duffy
              about a specific subdivision and ZIP.
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
                Opens the MLS portal map with a Spring Valley city filter—refine
                by price, beds, and baths on the same search Dr. Jan uses with
                buyers.
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
              Spring Valley is a census-designated place in unincorporated Clark
              County. The inclusion test for this site is{" "}
              {SPRING_VALLEY_BOUNDARY.north} on the north,{" "}
              {SPRING_VALLEY_BOUNDARY.east} on the east,{" "}
              {SPRING_VALLEY_BOUNDARY.south} on the south, and{" "}
              {SPRING_VALLEY_BOUNDARY.west} on the west.{" "}
              <strong>Spring Valley Las Vegas homes</strong> still differ by
              subdivision and ZIP inside that box—that is why we pair the map
              with neighborhood pages before you write an offer.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
              What types of properties will I find?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Buyers exploring Spring Valley Las Vegas homes often consider
              single-family homes with pools, renovated mid-century properties,
              and low-maintenance townhomes—depending on budget and lifestyle.
              Investment buyers may look at duplex opportunities where allowed.
              We help you align property type with HOA rules, insurance
              considerations, and your long-term plans—whether you are upsizing,
              relocating, or buying your first home.
            </p>
          </section>

          <SpringValleyCdpMap
            heading="Spring Valley Las Vegas map"
            description="Official Google embed for Spring Valley, NV (satellite). The pin is Google’s Spring Valley place—Sahara Avenue, Decatur Boulevard, Warm Springs Road, and Hualapai Way—not the Tropicana office. For a specific address or tour route, we pair maps with MLS data when you are under contract to buy or sell."
            footer={
              <>
                {" · "}
                <Link
                  href="/contact"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Office map &amp; directions
                </Link>
              </>
            }
          />

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
              Browse active inventory and filter by price, beds, baths, and
              more. When you are serious about{" "}
              <strong>Spring Valley Nevada homes for sale</strong>, we narrow by
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
                Diverse product types across Spring Valley mean your search
                should be filtered by price, beds, baths, and HOA—not just the
                word “Spring Valley.”
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <Car className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Central access</h3>
              <p className="text-sm text-slate-600">
                Many locations balance west valley living with commute options
                toward the 215, I-15, and major employment hubs.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <School className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">
                Schools &amp; services
              </h3>
              <p className="text-sm text-slate-600">
                School names and addresses only. Confirm assignment with Clark
                County School District for a specific street.{" "}
                {SPRING_VALLEY_SCHOOLS.map(
                  (school) => `${school.name}, ${school.address}`,
                ).join("; ")}
                .
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
              Third-party estimates often put the{" "}
              <strong>effective rate near 0.48%</strong>—useful for budgeting,
              not your official bill. Use the guide for an illustrative
              calculator, how Nevada assessments work, and Clark County Assessor
              links.
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

          <section
            className="max-w-6xl mx-auto mb-16"
            aria-labelledby="spring-valley-pockets-heading"
          >
            <h2
              id="spring-valley-pockets-heading"
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-center"
            >
              Neighborhoods inside the Spring Valley CDP
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
              These eleven pockets sit inside Sahara, Decatur, Warm Springs, and
              Hualapai. Spanish Trail belongs on this site. Pricing and HOA
              rules change by tract—we use live MLS comps for the street you
              choose.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {SPRING_VALLEY_SUBDIVISIONS.map((neighborhood) => (
                <article
                  key={neighborhood.slug}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    <Link
                      href={`/neighborhoods/${neighborhood.slug}`}
                      className="text-blue-700 hover:underline"
                    >
                      {neighborhood.name}
                    </Link>
                  </h3>
                  <p className="text-slate-500 text-xs mb-2">
                    {neighborhood.shortLocation}
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {neighborhood.summary}
                  </p>
                </article>
              ))}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-10 mb-4 text-center">
              Next to Spring Valley—not this site’s neighborhood set
            </h3>
            <ul className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {SPRING_VALLEY_OUTBOUND_NEIGHBORS.map((neighbor) => (
                <li
                  key={neighbor.href}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"
                >
                  <a
                    href={neighbor.href}
                    className="font-semibold text-blue-700 hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {neighbor.name}
                  </a>
                  <p className="mt-2 text-slate-600">{neighbor.whyOutbound}</p>
                </li>
              ))}
            </ul>
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
                <h3 className="font-semibold text-slate-900 mb-3">
                  Search &amp; market
                </h3>
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
                    <Link
                      href="/listings"
                      className="text-blue-600 hover:underline"
                    >
                      Spring Valley Nevada homes for sale (MLS)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search"
                      className="text-blue-600 hover:underline"
                    >
                      Search by zip code
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/las-vegas-zip-code-map"
                      className="text-blue-600 hover:underline"
                    >
                      Las Vegas zip code map
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/market-report"
                      className="text-blue-600 hover:underline"
                    >
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
                <h3 className="font-semibold text-slate-900 mb-3">
                  Buyers &amp; sellers
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/buyers"
                      className="text-blue-600 hover:underline"
                    >
                      Spring Valley home buyers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sellers"
                      className="text-blue-600 hover:underline"
                    >
                      Sell a home in Las Vegas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-blue-600 hover:underline"
                    >
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
                <h3 className="font-semibold text-slate-900 mb-3">
                  Spring Valley ZIPs
                </h3>
                <ul className="space-y-2">
                  {SPRING_VALLEY_ZIPS.map((entry) => (
                    <li key={entry.zip}>
                      <Link
                        href={`/zip/${entry.zip}`}
                        className="text-blue-600 hover:underline"
                      >
                        {entry.zip} Spring Valley homes
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Outbound neighbors
                </h3>
                <ul className="space-y-2">
                  {SPRING_VALLEY_OUTBOUND_NEIGHBORS.map((neighbor) => (
                    <li key={neighbor.href}>
                      <a
                        href={neighbor.href}
                        className="text-blue-600 hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {neighbor.name}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/neighborhoods"
                      className="text-blue-600 hover:underline"
                    >
                      All Spring Valley neighborhoods
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
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <SpringValleyFaqAnswerBody
                      text={faq.answer}
                      mapUrl={springValleyCityMapUrl}
                    />
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-16 bg-blue-600 text-white rounded-2xl p-8 md:p-10 text-center">
            <MapPin className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-3">
              Talk with Dr. Jan Duffy about Spring Valley
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get a clear plan for touring Spring Valley Las Vegas homes,
              pricing strategy, and contract timelines—backed by Berkshire
              Hathaway HomeServices Nevada Properties.
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
              Spring Valley neighborhoods and ZIPs
            </h2>
            <p className="text-center text-slate-600 mb-6">
              See every in-boundary pocket on the{" "}
              <Link
                href="/neighborhoods"
                className="text-blue-600 hover:underline"
              >
                Spring Valley neighborhoods hub
              </Link>
              , or start with{" "}
              <Link
                href="/neighborhoods/spanish-trail"
                className="text-blue-600 hover:underline"
              >
                Spanish Trail
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
