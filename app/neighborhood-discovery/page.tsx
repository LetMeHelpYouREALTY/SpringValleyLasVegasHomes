import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import NeighborhoodDiscoveryEmbed from "@/components/neighborhoods/NeighborhoodDiscoveryEmbed";
import type { Metadata } from "next";
import {
  agentInfo,
  officeInfo,
  siteConfig,
  siteSocialUrls,
} from "@/lib/site-config";
import { seoPrimaryKeyword } from "@/lib/seo";
import { combineSchemas } from "@/lib/schema";
import { absoluteMediaUrl, mapHubOgImageSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import {
  buildNeighborhoodDiscoveryDemoUrl,
  getNeighborhoodDiscoveryIframeUrl,
  google3dAreaExplorerLinks,
  springValley3dExplorerCenter,
} from "@/lib/neighborhood-3d-explorer";
import { Phone, MapPin, ExternalLink } from "lucide-react";

const pageUrl = `${siteConfig.url}/neighborhood-discovery`;
const neighborhoodDiscoveryOgUrl = absoluteMediaUrl(mapHubOgImageSrc);
const neighborhoodDiscoveryOgTwitter = ogTwitterImageFields(
  neighborhoodDiscoveryOgUrl,
  {
    alt: "Spring Valley and Las Vegas Valley neighborhoods — preview for Neighborhood Discovery",
  },
);
const neighborhoodMapUrl = getNeighborhoodDiscoveryIframeUrl();
const threeDdemoUrl = buildNeighborhoodDiscoveryDemoUrl();

export const metadata: Metadata = {
  title: "Neighborhood Discovery | Spring Valley Map & Local Highlights",
  description:
    "Explore Spring Valley and the west valley—restaurants, schools, parks, and more—with Google Maps Neighborhood Discovery. Pair with MLS search and Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  keywords: [
    "Spring Valley neighborhood map",
    "Las Vegas neighborhood map",
    "Spring Valley schools parks",
    "west valley Las Vegas neighborhoods",
    "Google Maps neighborhood discovery",
  ],
  alternates: {
    canonical: "/neighborhood-discovery",
  },
  openGraph: {
    title: "Neighborhood Discovery | Spring Valley & Las Vegas 3D Map",
    description:
      "Interactive 3D neighborhood highlights with local context—pair with MLS search and a Berkshire Hathaway HomeServices tour.",
    url: pageUrl,
    type: "website",
    ...neighborhoodDiscoveryOgTwitter.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Neighborhood Discovery | Spring Valley & Las Vegas 3D Map",
    description:
      "Interactive 3D neighborhood highlights with local context—pair with MLS search and a Berkshire Hathaway HomeServices tour.",
    ...neighborhoodDiscoveryOgTwitter.twitter,
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
    "@id": `${pageUrl}#webpage`,
    name: "Neighborhood Discovery — Spring Valley Map & Highlights",
    description:
      "Google Maps Neighborhood Discovery for Spring Valley with restaurants, parks, schools, and more; not a substitute for MLS listings or a showing.",
    url: pageUrl,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: neighborhoodDiscoveryOgUrl,
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
        name: "Neighborhood Discovery",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Google Maps Neighborhood Discovery / 3D Area Explorer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is a Google Maps Platform sample that combines photorealistic 3D tiles with Places API highlights such as restaurants, parks, and schools. You can customize the experience in Google's Admin app and export starter code for your own site.",
        },
      },
      {
        "@type": "Question",
        name: "Does this 3D map show homes for sale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. It helps you explore area context and points of interest. For active listings, use the live MLS search on this site or contact Dr. Jan Duffy for a curated list.",
        },
      },
    ],
  },
);

export default function NeighborhoodDiscoveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav
            className="mb-6 max-w-4xl text-sm text-slate-500"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link href="/neighborhoods" className="hover:text-blue-600">
              Neighborhoods
            </Link>
            {" / "}
            <span className="text-slate-700">Neighborhood discovery</span>
          </nav>

          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Local context · Google Maps Platform
            </p>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
              Neighborhood discovery — Spring Valley &amp; west valley
            </h1>
            <p className="text-lg text-slate-600">
              Explore nearby{" "}
              <strong>restaurants, parks, schools, and more</strong> on an
              interactive map centered on the Spring Valley area. Use it
              alongside{" "}
              <Link
                href="/"
                className="font-semibold text-blue-600 hover:underline"
              >
                {seoPrimaryKeyword}
              </Link>{" "}
              and MLS search—then call{" "}
              <a
                href={agentInfo.phoneTel}
                className="font-semibold text-blue-600 hover:underline"
              >
                {agentInfo.phone}
              </a>{" "}
              for a tour backed by Berkshire Hathaway HomeServices.
            </p>
          </div>

          <section
            className="max-w-6xl mx-auto mb-12"
            aria-labelledby="explorer-map-heading"
          >
            <h2 id="explorer-map-heading" className="sr-only">
              Interactive 3D neighborhood map
            </h2>
            <NeighborhoodDiscoveryEmbed />
          </section>

          <section className="max-w-3xl mx-auto mb-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Customize or export your own (Google workflow)
            </h2>
            <p className="text-slate-600 mb-4">
              Google&apos;s <strong>Neighborhood Discovery</strong> builder:
              choose a location, curate local highlights, confirm the design,
              then export hosted HTML or integrate with Maps JavaScript API and
              Places in Google Cloud.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>
                Override the hosted embed URL with{" "}
                <code className="rounded bg-white px-1 py-0.5 text-xs">
                  NEXT_PUBLIC_NEIGHBORHOOD_DISCOVERY_IFRAME_URL
                </code>{" "}
                when you publish a new Maps Solutions build.
              </li>
              <li>
                <a
                  href={google3dAreaExplorerLinks.admin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                >
                  3D Area Explorer Admin (optional){" "}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>{" "}
                — photorealistic 3D tiles demo; separate from the map above.
              </li>
              <li>
                <a
                  href={google3dAreaExplorerLinks.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                >
                  3D Area Explorer docs{" "}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </li>
              <li>
                <a
                  href={google3dAreaExplorerLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                >
                  3D sample on GitHub{" "}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              Reference center for the optional 3D demo:{" "}
              <span className="font-mono text-slate-700">
                {springValley3dExplorerCenter.lat},{" "}
                {springValley3dExplorerCenter.lng}
              </span>
              . Override 3D demo host with{" "}
              <code className="rounded bg-white px-1 py-0.5 text-xs">
                NEXT_PUBLIC_GOOGLE_3D_EXPLORER_DEMO_URL
              </code>{" "}
              and add that origin to CSP{" "}
              <code className="text-xs">frame-src</code>.
            </p>
          </section>

          <section className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900 mb-2">
                  What is Google Maps Neighborhood Discovery?
                </h3>
                <p className="text-slate-600 text-sm">
                  It is a Google Maps Platform experience that combines an
                  interactive map with curated nearby places and search—helpful
                  for orientation, not MLS listings.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Does this map show homes for sale?
                </h3>
                <p className="text-slate-600 text-sm">
                  No. It is for neighborhood context and POIs. For listings, use{" "}
                  <Link
                    href="/listings"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    MLS search
                  </Link>{" "}
                  or contact Dr. Jan Duffy.
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              {officeInfo.name}
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              {officeInfo.address.full}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700"
              >
                <Phone className="h-5 w-5" />
                {agentInfo.phone}
              </a>
              <a
                href={neighborhoodMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-semibold text-slate-800 hover:border-blue-400"
              >
                <MapPin className="h-5 w-5" />
                Open neighborhood map
              </a>
              <a
                href={threeDdemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-semibold text-slate-800 hover:border-blue-400"
              >
                <ExternalLink className="h-5 w-5" />
                Optional 3D demo
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-semibold text-slate-800 hover:border-blue-400"
              >
                Contact
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
