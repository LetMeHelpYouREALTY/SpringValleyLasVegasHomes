import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateNeighborhoodSchema,
  generateWebPageSchema,
  combineSchemas,
} from "@/lib/schema";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { metaDescriptionWithKeyword } from "@/lib/seo";
import { absoluteMediaUrl, springValleyMarketingOgSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import {
  DESERT_SHORES_NOTE,
  SPRING_VALLEY_BOUNDARY,
  SPRING_VALLEY_OUTBOUND_NEIGHBORS,
  SPRING_VALLEY_SCHOOLS,
  getSpringValleySubdivision,
  otherSpringValleySubdivisions,
  type SpringValleySubdivisionSlug,
} from "@/lib/spring-valley-geography";

export function subdivisionMetadata(
  slug: SpringValleySubdivisionSlug,
): Metadata {
  const subdivision = getSpringValleySubdivision(slug);
  if (!subdivision) {
    return { title: "Spring Valley neighborhood" };
  }
  const description = metaDescriptionWithKeyword(
    `${subdivision.name} in Spring Valley, NV—${subdivision.shortLocation}. Homes and local guidance with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.`,
    true,
  );
  const ogUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
  const og = ogTwitterImageFields(ogUrl, {
    alt: `${subdivision.name} Spring Valley Las Vegas homes`,
  });
  const path = `/neighborhoods/${subdivision.slug}`;
  return {
    alternates: { canonical: path },
    title: `${subdivision.name} Spring Valley Homes`,
    description,
    keywords: [
      `${subdivision.name} Spring Valley`,
      "Spring Valley Las Vegas homes",
      "Spring Valley NV homes",
      subdivision.shortLocation,
    ],
    openGraph: {
      title: `${subdivision.name} Spring Valley Homes | Dr. Jan Duffy`,
      description,
      url: `${siteConfig.url}${path}`,
      type: "website",
      ...og.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: `${subdivision.name} Spring Valley Homes | Dr. Jan Duffy`,
      description,
      ...og.twitter,
    },
  };
}

export default function SpringValleySubdivisionPage({
  slug,
}: {
  slug: SpringValleySubdivisionSlug;
}) {
  const subdivision = getSpringValleySubdivision(slug);
  if (!subdivision) {
    notFound();
  }

  const ogUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Neighborhoods", url: "/neighborhoods" },
    { name: subdivision.name, url: `/neighborhoods/${subdivision.slug}` },
  ];
  const related = subdivision.relatedSlugs
    .map((relatedSlug) => getSpringValleySubdivision(relatedSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const others = otherSpringValleySubdivisions(subdivision.slug);
  const pageSchemas = combineSchemas(
    generateBreadcrumbSchema(breadcrumbs),
    generateWebPageSchema({
      name: `${subdivision.name} Spring Valley Las Vegas homes`,
      description: subdivision.summary,
      url: `/neighborhoods/${subdivision.slug}`,
      primaryImageOfPage: ogUrl,
    }),
    generateNeighborhoodSchema({
      name: subdivision.name,
      slug: subdivision.slug,
      description: subdivision.summary,
      latitude: subdivision.latitude,
      longitude: subdivision.longitude,
      containedIn: "Spring Valley",
    }),
    generateFAQSchema([...subdivision.faqs]),
  );

  return (
    <>
      <SchemaScript schema={pageSchemas} id={`${subdivision.slug}-schema`} />
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
              <span className="text-slate-900">{subdivision.name}</span>
            </nav>
          </div>

          <header className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Spring Valley, NV · inside the CDP
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {subdivision.name} Spring Valley Homes
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {subdivision.summary}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Boundary test: {SPRING_VALLEY_BOUNDARY.north} north,{" "}
              {SPRING_VALLEY_BOUNDARY.east} east, {SPRING_VALLEY_BOUNDARY.south}{" "}
              south, {SPRING_VALLEY_BOUNDARY.west} west (
              {SPRING_VALLEY_BOUNDARY.squareMiles} sq mi).
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {subdivision.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </header>

          <section className="max-w-4xl mx-auto mb-14 space-y-4">
            {subdivision.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-slate-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </section>

          <section className="max-w-4xl mx-auto mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Spring Valley ZIPs for this pocket
            </h2>
            <p className="text-slate-600 mb-4">
              Listings near {subdivision.name} often use these Spring Valley
              ZIPs. Confirm the subdivision on the MLS record.
            </p>
            <ul className="flex flex-wrap gap-3">
              {subdivision.relatedZips.map((zip) => (
                <li key={zip}>
                  <Link
                    href={`/zip/${zip}`}
                    className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:border-blue-300"
                  >
                    {zip}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {slug === "desert-breeze" ||
          slug === "the-foothills" ||
          slug === "buffalo-ranch" ? (
            <section className="max-w-4xl mx-auto mb-14 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Nearby schools (names and addresses)
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
          ) : null}

          <section className="max-w-4xl mx-auto mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Related Spring Valley neighborhoods
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {related.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/neighborhoods/${entry.slug}`}
                    className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-300"
                  >
                    <span className="font-semibold text-slate-900">
                      {entry.name}
                    </span>
                    <span className="mt-1 block text-sm text-slate-600">
                      {entry.shortLocation}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="max-w-4xl mx-auto mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {subdivision.name} — FAQs
            </h2>
            <div className="space-y-4">
              {subdivision.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-slate-200 rounded-lg p-5 bg-white"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-14 bg-blue-600 text-white rounded-2xl p-8 md:p-10 text-center">
            <MapPin className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-3">
              Tour {subdivision.name} with Dr. Jan Duffy
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Berkshire Hathaway HomeServices Nevada Properties ·{" "}
              {officeInfo.address.full}
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
          </section>

          {slug === "canyon-gate" ? (
            <section className="max-w-4xl mx-auto mb-14 rounded-xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Nearby, not Spring Valley
              </h2>
              <p className="text-sm text-slate-700 mb-4">
                {DESERT_SHORES_NOTE}
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
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
                    {" — "}
                    {neighbor.whyOutbound}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="max-w-4xl mx-auto mb-10 text-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-3 text-center">
              All Spring Valley neighborhoods on this site
            </h2>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {others.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/neighborhoods/${entry.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {entry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <RealScoutListings />
        </div>
      </main>
      <Footer />
    </>
  );
}
