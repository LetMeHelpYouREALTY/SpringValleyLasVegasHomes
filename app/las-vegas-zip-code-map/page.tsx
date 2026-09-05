import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import PageAgentMark from "@/components/shared/PageAgentMark";
import Footer from "@/components/layouts/Footer";
import LasVegasZipCodeMap from "@/components/tools/LasVegasZipCodeMap";
import type { Metadata } from "next";
import {
  agentInfo,
  officeInfo,
  siteConfig,
  siteSocialUrls,
} from "@/lib/site-config";
import { lasVegasZipStats } from "@/lib/las-vegas-zip-data";
import { combineSchemas } from "@/lib/schema";
import { absoluteMediaUrl, mapHubOgImageSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import { Phone, Mail } from "lucide-react";

const zipMapPageUrl = `${siteConfig.url}/las-vegas-zip-code-map`;
const zipMapOgUrl = absoluteMediaUrl(mapHubOgImageSrc);
const zipMapOgTwitter = ogTwitterImageFields(zipMapOgUrl, {
  alt: "Las Vegas Valley homes and neighborhoods — preview image for zip code map",
});

export const metadata: Metadata = {
  title: "Las Vegas Zip Code Map",
  description:
    "Las Vegas Valley zip code map and directory—Spring Valley, Summerlin, Henderson, North Las Vegas, Boulder City, and more. Find Spring Valley Nevada homes and homes for sale by zip; call Dr. Jan Duffy, REALTOR® at Berkshire Hathaway HomeServices Nevada Properties.",
  keywords: [
    "Las Vegas zip code map",
    "Spring Valley Las Vegas map",
    "Spring Valley Nevada homes",
    "Spring Valley Nevada homes for sale",
    "Henderson zip codes",
    "Summerlin zip codes",
    "Spring Valley Las Vegas zip",
    "Clark County zip codes",
    "homes by zip code Las Vegas",
  ],
  alternates: {
    canonical: "/las-vegas-zip-code-map",
  },
  openGraph: {
    title: "Las Vegas Zip Code Map | Dr. Jan Duffy, REALTOR®",
    description:
      "Interactive map and full zip directory for the Las Vegas Valley—narrow Spring Valley and west valley homes, then search MLS or contact our team.",
    url: zipMapPageUrl,
    type: "website",
    ...zipMapOgTwitter.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Las Vegas Zip Code Map | Dr. Jan Duffy, REALTOR®",
    description:
      "Interactive map and full zip directory for the Las Vegas Valley—narrow Spring Valley and west valley homes, then search MLS or contact our team.",
    ...zipMapOgTwitter.twitter,
  },
};

const sameAsProfiles = [
  siteSocialUrls.facebook,
  siteSocialUrls.instagram,
  siteSocialUrls.linkedin,
  siteSocialUrls.linkedinCompany,
  siteSocialUrls.youtube,
];

const pageSchemas = combineSchemas(
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${zipMapPageUrl}#webpage`,
    name: "Las Vegas Zip Code Map",
    description:
      "Interactive Las Vegas Valley zip code map and directory covering Spring Valley, Summerlin, Henderson, North Las Vegas, and Boulder City—with links to search homes by zip and contact Dr. Jan Duffy.",
    url: zipMapPageUrl,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: zipMapOgUrl,
    },
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: officeInfo.name,
      url: siteConfig.url,
      telephone: agentInfo.phoneE164,
      address: {
        "@type": "PostalAddress",
        streetAddress: officeInfo.address.street,
        addressLocality: officeInfo.address.city,
        addressRegion: officeInfo.address.state,
        postalCode: officeInfo.address.zip,
        addressCountry: officeInfo.address.country,
      },
    },
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#agent`,
      name: agentInfo.name,
      jobTitle: agentInfo.title,
      telephone: agentInfo.phoneE164,
      email: agentInfo.email,
      url: siteConfig.url,
      sameAs: sameAsProfiles,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Real Estate License",
        credentialNumber: agentInfo.license,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: officeInfo.address.street,
        addressLocality: officeInfo.address.city,
        addressRegion: officeInfo.address.state,
        postalCode: officeInfo.address.zip,
        addressCountry: officeInfo.address.country,
      },
      worksFor: {
        "@type": "Organization",
        name: agentInfo.brokerage,
        url: siteConfig.url,
        address: {
          "@type": "PostalAddress",
          streetAddress: officeInfo.address.street,
          addressLocality: officeInfo.address.city,
          addressRegion: officeInfo.address.state,
          postalCode: officeInfo.address.zip,
          addressCountry: officeInfo.address.country,
        },
      },
    },
    about: [
      {
        "@type": "AdministrativeArea",
        name: "Clark County",
        containedInPlace: { "@type": "State", name: "Nevada" },
      },
      { "@type": "Place", name: "Las Vegas Valley" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Map",
    "@id": `${zipMapPageUrl}#map`,
    name: "Las Vegas Valley Zip Code Map",
    url: zipMapPageUrl,
    description:
      "Interactive map with approximate center points for Las Vegas Valley zip codes; use with the on-page directory to explore neighborhoods.",
    mapType: "https://schema.org/VenueMap",
    about: {
      "@type": "City",
      name: "Las Vegas",
      containedInPlace: {
        "@type": "State",
        name: "Nevada",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Neighborhoods",
        item: `${siteConfig.url}/neighborhoods`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Las Vegas Zip Code Map",
        item: zipMapPageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I search Las Vegas or Spring Valley homes by zip code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the zip directory or interactive map on this page, open the search hub for your zip, then use the live MLS home search and type the zip or city in the search box. You can also call or email Dr. Jan Duffy for a curated list.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Spring Valley on this Las Vegas zip map?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spring Valley is in the west Las Vegas Valley; zip 89103 is a core Spring Valley area. Listings may show Spring Valley or Las Vegas—use nearby zips on the map for context when comparing homes.",
        },
      },
      {
        "@type": "Question",
        name: "Does this map show official zip code boundaries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Markers and circles show approximate centers for reference, not legal boundaries. Confirm schools, taxes, and HOA details on the listing and with your agent.",
        },
      },
    ],
  },
);

export default function LasVegasZipCodeMapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <PageAgentMark />
        <nav
          className="border-b border-slate-200 bg-white"
          aria-label="Breadcrumb"
        >
          <div className="container mx-auto max-w-7xl px-4 py-3 text-sm text-slate-500">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <Link
              href="/neighborhoods"
              className="text-blue-600 hover:underline"
            >
              Neighborhoods
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-slate-700">Las Vegas zip code map</span>
          </div>
        </nav>

        <section className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 text-center text-white md:py-14">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
            Las Vegas Valley Zip Code Map
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200">
            Use this Spring Valley Las Vegas map-style guide to scan the whole
            valley by zip—from west-side Spring Valley and Summerlin to
            Henderson and North Las Vegas—then jump to MLS search or call{" "}
            {agentInfo.phone}.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div>
              <div className="text-3xl font-extrabold text-sky-400">
                {lasVegasZipStats.zipCount}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Zip codes
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-sky-400">
                {lasVegasZipStats.regionCount}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Region filters
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-sky-400">6</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Cities &amp; areas
              </div>
            </div>
          </div>
        </section>

        <LasVegasZipCodeMap />

        <section className="mx-auto max-w-4xl px-4 py-12 prose prose-slate">
          <h2 className="text-2xl font-bold text-slate-900">
            Understanding Las Vegas zip codes
          </h2>
          <p className="mt-4 text-slate-700">
            The Las Vegas Valley spans a large portion of Clark County, Nevada,
            including several municipalities and master-planned communities.
            Whether you are relocating, investing in real estate, or comparing
            neighborhoods, zip code geography helps you narrow listings and
            commute times. Searching <strong>Spring Valley Nevada homes</strong>{" "}
            or <strong>Spring Valley Nevada homes for sale</strong> often starts
            with a zip—use the tools above to see how Spring Valley fits next to
            nearby west valley communities.
          </p>
          <h3 className="mt-8 text-lg font-bold text-slate-900">
            Las Vegas (89101–89166)
          </h3>
          <p className="text-slate-700">
            The City of Las Vegas covers a wide range of zip codes. Downtown
            anchors the urban core; westward you will find established
            neighborhoods and Summerlin across multiple zips. The southwest
            corridor includes Southern Highlands, Rhodes Ranch, and
            Mountain&apos;s Edge—among the valley&apos;s active markets.
          </p>
          <h3 className="mt-8 text-lg font-bold text-slate-900">
            Henderson &amp; Boulder City
          </h3>
          <p className="text-slate-700">
            Henderson spans the southeastern valley with communities such as
            Green Valley, Inspirada, and Anthem. Boulder City (89005) sits near
            Lake Mead and is often grouped with southeast valley searches.
          </p>
          <h3 className="mt-8 text-lg font-bold text-slate-900">
            North Las Vegas
          </h3>
          <p className="text-slate-700">
            North Las Vegas includes growth corridors such as Aliante and Tule
            Springs. The northwest valley continues to add new construction
            toward Skye Canyon and the 89166 area.
          </p>
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Work with Dr. Jan Duffy
          </h2>
          <p className="text-slate-700">
            Dr. Jan Duffy serves buyers and sellers across the Las Vegas Valley
            with Berkshire Hathaway HomeServices Nevada Properties. Call{" "}
            <a
              href={agentInfo.phoneTel}
              className="font-medium text-blue-600 hover:underline"
            >
              {agentInfo.phone}
            </a>
            , email{" "}
            <a
              href={`mailto:${agentInfo.email}`}
              className="font-medium text-blue-600 hover:underline"
            >
              {agentInfo.email}
            </a>
            , or use the{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-600 hover:underline"
            >
              contact page
            </Link>{" "}
            to schedule a consultation.
          </p>
        </section>

        <section
          className="mx-auto max-w-3xl px-4 pb-12"
          aria-labelledby="zip-map-faq-heading"
        >
          <h2
            id="zip-map-faq-heading"
            className="text-2xl font-bold text-slate-900"
          >
            Las Vegas zip map — common questions
          </h2>
          <dl className="mt-6 space-y-6">
            <div>
              <dt className="font-semibold text-slate-900">
                How do I search Las Vegas or Spring Valley homes by zip code?
              </dt>
              <dd className="mt-2 text-slate-700">
                Use the directory or map above, open the search link for your
                zip, then use the live MLS home search and enter that zip or
                city in the search box. You can also{" "}
                <Link
                  href="/contact"
                  className="font-medium text-blue-600 hover:underline"
                >
                  contact
                </Link>{" "}
                Dr. Jan Duffy for listings matched to your zip and budget.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">
                Where is Spring Valley on this map?
              </dt>
              <dd className="mt-2 text-slate-700">
                Spring Valley sits in the west valley; zip 89103 is a central
                Spring Valley area. Listings may say &quot;Spring Valley&quot;
                or &quot;Las Vegas&quot;—compare nearby zips on the map when you
                evaluate{" "}
                <Link
                  href="/neighborhoods/spring-valley"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Spring Valley Las Vegas homes
                </Link>
                .
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">
                Does this map show official zip boundaries?
              </dt>
              <dd className="mt-2 text-slate-700">
                No. Markers show approximate centers for reference, not legal
                boundaries. Confirm schools, taxes, and HOA details on each
                listing and with your agent.
              </dd>
            </div>
          </dl>
        </section>

        <section className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-14 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">
            Find your neighborhood
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-200">
            Ready to see homes? Open the live MLS search or contact Dr. Jan
            Duffy&apos;s team—we&apos;ll help you match zip, budget, and
            lifestyle.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Phone className="mr-2 h-5 w-5" aria-hidden />
              Call {agentInfo.phone}
            </a>
            <a
              href={`mailto:${agentInfo.email}`}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden />
              Email {agentInfo.name.split(" ")[0]}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
