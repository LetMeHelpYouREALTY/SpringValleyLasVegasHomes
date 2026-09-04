import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SpringValleyCdpMap from "@/components/maps/SpringValleyCdpMap";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { metaDescriptionWithKeyword } from "@/lib/seo";
import { absoluteMediaUrl, springValleyMarketingOgSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import {
  SPRING_VALLEY_BOUNDARY,
  SPRING_VALLEY_SCHOOLS,
  SPRING_VALLEY_ZIP_CODES,
  getSpringValleySubdivision,
  getSpringValleyZip,
  springValleyZipStaticParams,
} from "@/lib/spring-valley-geography";

export const dynamicParams = false;

export function generateStaticParams() {
  return springValleyZipStaticParams();
}

type ZipPageProps = {
  params: { zipcode: string };
};

export function generateMetadata({ params }: ZipPageProps): Metadata {
  const record = getSpringValleyZip(params.zipcode);
  if (!record) {
    return { title: "Spring Valley ZIP" };
  }
  const description = metaDescriptionWithKeyword(
    `${record.name}. Spring Valley Las Vegas homes in ZIP ${record.zip} with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.`,
    true,
  );
  const ogUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
  const og = ogTwitterImageFields(ogUrl, {
    alt: `Spring Valley Las Vegas homes in ZIP ${record.zip}`,
  });
  const path = `/zip/${record.zip}`;
  return {
    alternates: { canonical: path },
    title: `${record.zip} Spring Valley Homes`,
    description,
    keywords: [
      `${record.zip} Spring Valley`,
      "Spring Valley Las Vegas homes",
      `homes for sale ${record.zip}`,
    ],
    openGraph: {
      title: `${record.zip} Spring Valley Homes | Dr. Jan Duffy`,
      description,
      url: `${siteConfig.url}${path}`,
      type: "website",
      ...og.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: `${record.zip} Spring Valley Homes | Dr. Jan Duffy`,
      description,
      ...og.twitter,
    },
  };
}

export default function SpringValleyZipPage({ params }: ZipPageProps) {
  const record = getSpringValleyZip(params.zipcode);
  if (!record) {
    notFound();
  }

  const ogUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
  const relatedNeighborhoods = record.relatedSlugs
    .map((slug) => getSpringValleySubdivision(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const faqs = [
    {
      question: `Is ${record.zip} a Spring Valley ZIP code?`,
      answer: record.caveat
        ? `${record.summary} ${record.caveat}`
        : `Yes. ${record.zip} is one of the seven Spring Valley ZIP codes on this site (${SPRING_VALLEY_ZIP_CODES.join(", ")}). ${record.summary}`,
    },
    {
      question: "What is the Spring Valley boundary?",
      answer: `Unincorporated Spring Valley is bounded by ${SPRING_VALLEY_BOUNDARY.north} on the north, ${SPRING_VALLEY_BOUNDARY.east} on the east, ${SPRING_VALLEY_BOUNDARY.south} on the south, and ${SPRING_VALLEY_BOUNDARY.west} on the west (about ${SPRING_VALLEY_BOUNDARY.squareMiles} square miles).`,
    },
  ];
  const pageSchemas = combineSchemas(
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Spring Valley ZIPs", url: "/neighborhoods" },
      { name: record.zip, url: `/zip/${record.zip}` },
    ]),
    generateWebPageSchema({
      name: record.name,
      description: record.summary,
      url: `/zip/${record.zip}`,
      primaryImageOfPage: ogUrl,
    }),
    generateFAQSchema(faqs),
  );

  return (
    <>
      <SchemaScript schema={pageSchemas} id={`zip-${record.zip}-schema`} />
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
              <span className="text-slate-900">{record.zip}</span>
            </nav>
          </div>

          <header className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Spring Valley ZIP
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {record.name}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {record.summary}
            </p>
            {record.caveat ? (
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                {record.caveat}
              </p>
            ) : null}
          </header>

          <SpringValleyCdpMap
            heading={`${record.zip} in the Spring Valley CDP`}
            description={`${record.zip} is one of seven ZIP codes that intersect the Spring Valley CDP (${SPRING_VALLEY_BOUNDARY.north}–${SPRING_VALLEY_BOUNDARY.south}, ${SPRING_VALLEY_BOUNDARY.east}–${SPRING_VALLEY_BOUNDARY.west}). The map is Google’s Spring Valley, NV place pin, not a ZIP polygon.`}
          />

          <section className="max-w-4xl mx-auto mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Spring Valley neighborhoods in this ZIP
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {relatedNeighborhoods.map((entry) => (
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

          {(record.zip === "89113" || record.zip === "89147") && (
            <section className="max-w-4xl mx-auto mb-14 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Schools in or near this ZIP
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Names and addresses only. Confirm assignment with Clark County
                School District.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                {SPRING_VALLEY_SCHOOLS.filter((school) =>
                  school.address.includes(record.zip),
                ).map((school) => (
                  <li key={school.name}>
                    <strong>{school.name}</strong> — {school.address}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="max-w-4xl mx-auto mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ZIP {record.zip} — FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
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

          <section className="max-w-4xl mx-auto mb-14">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              All Spring Valley ZIPs on this site
            </h2>
            <ul className="flex flex-wrap gap-3">
              {SPRING_VALLEY_ZIP_CODES.map((zip) => (
                <li key={zip}>
                  <Link
                    href={`/zip/${zip}`}
                    className={`inline-flex rounded-lg border px-4 py-2 text-sm font-semibold ${
                      zip === record.zip
                        ? "border-blue-600 bg-blue-50 text-blue-800"
                        : "border-slate-200 bg-white text-blue-700 hover:border-blue-300"
                    }`}
                  >
                    {zip}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              This site does not generate pages for 89102, 89139, 89161, or
              89178—those ZIPs are outside the Spring Valley boundary.
            </p>
          </section>

          <section className="max-w-4xl mx-auto mb-14 bg-blue-600 text-white rounded-2xl p-8 md:p-10 text-center">
            <MapPin className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-3">
              Search {record.zip} with Dr. Jan Duffy
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
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
                href="/listings"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Browse listings
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </section>

          <RealScoutListings />
        </div>
      </main>
      <Footer />
    </>
  );
}
