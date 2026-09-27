import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SchemaScript from "@/components/SchemaScript";
import FAQSection from "@/components/sections/FAQSection";
import AgentHeadshot from "@/components/shared/AgentHeadshot";
import CommunityAmenityMap from "@/components/tools/CommunityAmenityMap";
import Link from "next/link";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import {
  agentInfo,
  officeInfo,
  siteConfig,
} from "@/lib/site-config";
import { absoluteMediaUrl, springValleyMarketingOgSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import { metaDescriptionWithKeyword } from "@/lib/seo";
import {
  amenitiesPageFaqs,
  curatedSpringValleyPlaces,
  springValleyCommunity,
} from "@/lib/spring-valley-amenities";
import {
  REAL_ESTATE_AGENT_SCHEMA_ID,
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
} from "@/lib/schema";

const pagePath = "/amenities";
const pageTitle = "Nearby Amenities in Spring Valley, Las Vegas";
const pageDescription = metaDescriptionWithKeyword(
  "Interactive map and guide to restaurants, grocery, parks, golf, healthcare, and schools near Spring Valley Las Vegas homes. Verified places, buyer FAQs, and local REALTOR® Dr. Jan Duffy.",
  true,
);

const ogUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
const ogFields = ogTwitterImageFields(ogUrl, {
  alt: "Spring Valley Las Vegas nearby amenities and local map guide",
});

export const metadata: Metadata = {
  alternates: { canonical: pagePath },
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | Dr. Jan Duffy`,
    description: pageDescription,
    url: `${siteConfig.url}${pagePath}`,
    type: "website",
    ...ogFields.openGraph,
  },
  twitter: {
    title: `${pageTitle} | Dr. Jan Duffy`,
    description: pageDescription,
    ...ogFields.twitter,
  },
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Nearby Amenities", url: pagePath },
];

function generateCommunityPlaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${siteConfig.url}${pagePath}#spring-valley-place`,
    name: springValleyCommunity.displayName,
    description:
      "Spring Valley is a census-designated west Las Vegas Valley area in unincorporated Clark County, Nevada.",
    address: {
      "@type": "PostalAddress",
      addressLocality: springValleyCommunity.city,
      addressRegion: springValleyCommunity.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: springValleyCommunity.center.lat,
      longitude: springValleyCommunity.center.lng,
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: springValleyCommunity.county,
    },
  };
}

function generateFeaturedPlacesItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured places near Spring Valley, Las Vegas",
    itemListElement: curatedSpringValleyPlaces.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": place.schemaType,
        name: place.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: place.address,
          addressLocality: "Las Vegas",
          addressRegion: "NV",
          addressCountry: "US",
        },
      },
    })),
  };
}

/** Extends site-wide agent entity with hyperlocal areaServed (same @id as root layout). */
function generateAgentAreaServedExtension() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": REAL_ESTATE_AGENT_SCHEMA_ID,
    areaServed: {
      "@type": "Place",
      name: "Spring Valley, Nevada",
      geo: {
        "@type": "GeoCoordinates",
        latitude: springValleyCommunity.center.lat,
        longitude: springValleyCommunity.center.lng,
      },
    },
  };
}

const pageSchema = combineSchemas(
  generateBreadcrumbSchema(breadcrumbs),
  generateFAQSchema([...amenitiesPageFaqs]),
  generateCommunityPlaceSchema(),
  generateFeaturedPlacesItemList(),
  generateAgentAreaServedExtension(),
  generateWebPageSchema({
    name: pageTitle,
    description: pageDescription,
    url: pagePath,
    dateModified: "2026-09-27T12:00:00-07:00",
    primaryImageOfPage: ogUrl,
  }),
);

export default function AmenitiesPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="amenities-page-schema" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <span className="text-slate-900">Nearby Amenities</span>
          </nav>

          <header className="mx-auto mb-12 max-w-4xl text-center">
            <p className="mb-3 text-sm font-semibold text-blue-600">Spring Valley Las Vegas homes</p>
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              Nearby Amenities in Spring Valley, Las Vegas
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Explore grocery, healthcare, parks, dining, and schools around Spring Valley with an
              interactive map centered at the U.S. Census Spring Valley CDP ({springValleyCommunity.center.lat.toFixed(4)},{" "}
              {springValleyCommunity.center.lng.toFixed(4)}). Written sections below are crawlable
              for search and AI answers—confirm drive times live before you buy.
            </p>
          </header>

          <div className="mx-auto mb-16 max-w-6xl">
            <CommunityAmenityMap
              showTitle={false}
              showCuratedList
              mapHeightClass="h-[420px] md:h-[520px]"
              defaultCategory="grocery"
            />
          </div>

          <div className="prose prose-slate mx-auto mb-16 max-w-4xl">
            <h2>Dining near Spring Valley</h2>
            <p>
              Spring Valley spans many west-valley pockets along Charleston Boulevard, Rainbow
              Boulevard, Decatur Boulevard, and Sahara Avenue, so restaurant options depend on your
              cross-streets. National chains and local favorites cluster along those corridors; use
              the map filters for live restaurant results, and plan a test drive from any listing
              you are considering.
            </p>

            <h2>Parks &amp; recreation</h2>
            <p>
              Clark County Parks &amp; Recreation operates{" "}
              <strong>Desert Breeze Park</strong> (8275 Spring Mountain Rd) and{" "}
              <strong>Spring Valley Community Park</strong> (7600 W Flamingo Rd)—both with fields,
              walking paths, and community programming. The <strong>Spring Valley Library</strong>{" "}
              (4280 S Jones Blvd) is a neighborhood anchor for events and resources.
            </p>

            <h2>Golf</h2>
            <p>
              <strong>Rhodes Ranch Golf Club</strong> (20 E Rhodes Ranch Pkwy) sits in the adjacent
              Enterprise area and is a common choice for southwest-valley golfers.{" "}
              <strong>Bali Hai Golf Club</strong> (5160 S Las Vegas Blvd) offers a Strip-adjacent
              public course a short drive from many Spring Valley addresses.
            </p>

            <h2>Healthcare</h2>
            <p>
              <strong>Spring Valley Hospital Medical Center</strong> (5400 S Rainbow Blvd) provides
              acute-care services for much of the west valley—verify emergency routes and in-network
              providers with your insurer.
            </p>

            <h2>Shopping &amp; grocery</h2>
            <p>
              Everyday grocery runs often include <strong>Smith&apos;s Food and Drug</strong> (8050 S Rainbow Blvd
              or 9851 W Charleston Blvd), <strong>Sprouts Farmers Market</strong> (7530 W Lake Mead Blvd), and{" "}
              <strong>Whole Foods Market</strong> (8855 W Charleston Blvd). For retail and dining
              clusters, <strong>Boca Park Fashion Village</strong> (750 S Rampart Blvd) is a common
              west-valley destination.
            </p>

            <h2>Schools (verify your zone)</h2>
            <p>
              Clark County School District assignments depend on your exact address—not the Spring
              Valley name alone. Public sites serving parts of the west valley include{" "}
              <strong>Sig Rogich Middle School</strong> (235 N Pavilion Center Dr) and{" "}
              <strong>John W. Bonner Elementary School</strong> (765 Crestdale Ln). Confirm current
              zoning with CCSD before you write an offer.
            </p>

            <h2>Commute context (approximate)</h2>
            <p>
              Drive times vary by block and traffic. From typical Spring Valley starting points,
              central Strip resorts are often roughly <strong>15–25 minutes</strong>, Harry Reid
              International Airport roughly <strong>20–35 minutes</strong>, and Downtown Summerlin
              roughly <strong>15–25 minutes</strong> when traffic is light. These ranges are
              approximate—run live directions from each home you tour.
            </p>
          </div>

          <FAQSection
            faqs={[...amenitiesPageFaqs]}
            title="Spring Valley amenities — buyer FAQs"
            subtitle="Concise answers for search and AI overviews—verify distances from your listing"
          />

          <section
            className="mx-auto mt-16 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-10"
            aria-labelledby="amenities-agent-cta"
          >
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <AgentHeadshot frameClassName="w-36 shrink-0 aspect-square md:w-40" sizes="160px" />
              <div>
                <h2 id="amenities-agent-cta" className="text-2xl font-bold text-slate-900">
                  Your Spring Valley REALTOR®
                </h2>
                <p className="mt-3 text-slate-700 leading-relaxed">
                  Dr. Jan Duffy helps buyers and sellers compare Spring Valley Las Vegas homes block
                  by block—HOA rules, commute, and nearby errands included.{" "}
                  {agentInfo.brokerage}. License {agentInfo.license}.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Office: {officeInfo.address.full}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={agentInfo.phoneTel}
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    <Phone className="mr-2 h-5 w-5" aria-hidden />
                    Call {agentInfo.phoneFormatted}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100"
                  >
                    Send a message
                  </Link>
                  <Link
                    href="/neighborhoods/spring-valley"
                    className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-6 py-3 font-semibold text-blue-800 hover:bg-blue-100"
                  >
                    Spring Valley guide
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
