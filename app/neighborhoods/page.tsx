import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { metaDescriptionWithKeyword, seoPrimaryKeyword } from "@/lib/seo";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { absoluteMediaUrl, springValleyMarketingOgSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import {
  DESERT_SHORES_NOTE,
  SPRING_VALLEY_BOUNDARY,
  SPRING_VALLEY_OUTBOUND_NEIGHBORS,
  SPRING_VALLEY_SCHOOLS,
  SPRING_VALLEY_SUBDIVISIONS,
  SPRING_VALLEY_ZIP_CODES,
  SPRING_VALLEY_ZIPS,
} from "@/lib/spring-valley-geography";

const neighborhoodsDescription = metaDescriptionWithKeyword(
  "Spring Valley neighborhoods inside the Sahara–Decatur–Warm Springs–Hualapai boundary—Spanish Trail, Canyon Gate, Desert Breeze, and more with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  true,
);

const neighborhoodsGuideOgUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
const neighborhoodsOgTwitter = ogTwitterImageFields(neighborhoodsGuideOgUrl, {
  alt: "Spring Valley Las Vegas neighborhoods inside the CDP boundary",
});

export const metadata: Metadata = {
  alternates: {
    canonical: "/neighborhoods",
  },
  title: "Spring Valley Neighborhoods",
  description: neighborhoodsDescription,
  keywords: [
    "Spring Valley neighborhoods",
    "Spring Valley Las Vegas homes",
    "Spanish Trail Las Vegas",
    "Canyon Gate Spring Valley",
    "Desert Breeze Spring Valley",
  ],
  openGraph: {
    title: "Spring Valley Neighborhoods | Dr. Jan Duffy",
    description: neighborhoodsDescription,
    url: `${siteConfig.url}/neighborhoods`,
    type: "website",
    ...neighborhoodsOgTwitter.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring Valley Neighborhoods | Dr. Jan Duffy",
    description: neighborhoodsDescription,
    ...neighborhoodsOgTwitter.twitter,
  },
};

const neighborhoodsWebPageLd = generateWebPageSchema({
  name: "Spring Valley Neighborhoods",
  description: neighborhoodsDescription,
  url: "/neighborhoods",
  primaryImageOfPage: neighborhoodsGuideOgUrl,
});

export default function NeighborhoodsPage() {
  return (
    <>
      <SchemaScript
        schema={neighborhoodsWebPageLd}
        id="neighborhoods-guide-schema"
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Spring Valley Neighborhoods
            </h1>
            <p className="text-xl text-slate-600">
              This site covers unincorporated Spring Valley only—the{" "}
              <Link
                href="/neighborhoods/spring-valley"
                className="text-blue-600 font-semibold hover:underline"
              >
                {seoPrimaryKeyword}
              </Link>{" "}
              census-designated place bounded by {SPRING_VALLEY_BOUNDARY.north}{" "}
              (north), {SPRING_VALLEY_BOUNDARY.east} (east),{" "}
              {SPRING_VALLEY_BOUNDARY.south} (south), and{" "}
              {SPRING_VALLEY_BOUNDARY.west} (west). About{" "}
              {SPRING_VALLEY_BOUNDARY.squareMiles} square miles.
            </p>
          </div>

          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Neighborhoods inside the Spring Valley boundary
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {SPRING_VALLEY_SUBDIVISIONS.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-blue-300 group"
                >
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {neighborhood.name}
                  </h2>
                  <p className="text-sm text-slate-500 mb-3">
                    {neighborhood.shortLocation}
                  </p>
                  <p className="text-slate-600 text-sm mb-4">
                    {neighborhood.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Spring Valley ZIP codes
            </h2>
            <p className="text-slate-600 text-center mb-6">
              Seven ZIPs, scored against the CDP boundary. 89102, 89139, 89161,
              and 89178 are outside Spring Valley and are not generated on this
              site.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {SPRING_VALLEY_ZIPS.map((entry) => (
                <li key={entry.zip}>
                  <Link
                    href={`/zip/${entry.zip}`}
                    className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-300"
                  >
                    <span className="font-semibold text-slate-900">
                      {entry.zip}
                    </span>
                    <span className="mt-1 block text-sm text-slate-600">
                      {entry.summary}
                    </span>
                    {entry.caveat ? (
                      <span className="mt-2 block text-xs text-amber-800">
                        {entry.caveat}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-sm text-slate-500">
              {SPRING_VALLEY_ZIP_CODES.join(" · ")}
            </p>
          </section>

          <section className="mb-16 max-w-4xl mx-auto rounded-xl border border-amber-200 bg-amber-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Nearby, not Spring Valley
            </h2>
            <p className="text-slate-700 text-sm mb-4">{DESERT_SHORES_NOTE}</p>
            <ul className="space-y-4">
              {SPRING_VALLEY_OUTBOUND_NEIGHBORS.map((neighbor) => (
                <li key={neighbor.href}>
                  <a
                    href={neighbor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 hover:underline"
                  >
                    {neighbor.name}
                  </a>
                  <p className="text-sm text-slate-700 mt-1">
                    {neighbor.whyOutbound}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16 max-w-4xl mx-auto rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Schools (names and addresses)
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Assignments vary by address. Confirm with Clark County School
              District.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              {SPRING_VALLEY_SCHOOLS.map((school) => (
                <li key={school.name}>
                  <strong>{school.name}</strong> — {school.address}
                  {"note" in school && school.note ? ` ${school.note}` : ""}
                </li>
              ))}
            </ul>
          </section>

          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <MapPin className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tour Spring Valley with Dr. Jan Duffy
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Call for a search plan inside the Spring Valley boundary.
            </p>
            <a
              href="tel:+17026648424"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (702) 664-8424
            </a>
            <p className="mt-4 text-blue-200 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
