import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SpringValleyPropertyTaxEstimator from "@/components/tools/SpringValleyPropertyTaxEstimator";
import SchemaScript from "@/components/SchemaScript";
import type { Metadata } from "next";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
  combineSchemas,
} from "@/lib/schema";
import {
  agentInfo,
  googleMyMapEmbedUrl,
  googleMyMapViewerUrl,
  officeInfo,
  siteConfig,
} from "@/lib/site-config";
import {
  clarkCountyTaxResources,
  effectiveRateCitation,
  estimateAnnualPropertyTaxIllustrative,
  propertyTaxDisclaimerMedium,
  springValleyTaxExampleMarketValue,
  springValleyEffectiveRatePercentDisplay,
} from "@/lib/spring-valley-property-tax";
import { absoluteMediaUrl, springValleyMarketingOgSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import { Phone, ExternalLink, MapPin } from "lucide-react";

const propertyTaxOgUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
const propertyTaxOgTwitter = ogTwitterImageFields(propertyTaxOgUrl, {
  alt: "Spring Valley Las Vegas homes and west valley real estate — representative preview",
});

const pagePath = "/neighborhoods/spring-valley/property-taxes";
const pageUrl = `${siteConfig.url}${pagePath}`;

const exampleAnnual = estimateAnnualPropertyTaxIllustrative(springValleyTaxExampleMarketValue);

export const metadata: Metadata = {
  title: "Spring Valley NV Property Taxes & Tax Rate",
  description:
    "Spring Valley, NV effective property tax rate (about 0.48% per third-party estimates), illustrative tax calculator, and how Clark County tax bills work—with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties. Not tax advice.",
  keywords: [
    "Spring Valley NV property tax",
    "Spring Valley property tax rate",
    "Clark County property tax",
    "Nevada property tax Spring Valley",
    "effective tax rate Spring Valley",
  ],
  alternates: {
    canonical: "/neighborhoods/spring-valley/property-taxes",
  },
  openGraph: {
    title: "Spring Valley, NV Property Taxes & Rate | Dr. Jan Duffy",
    description:
      "Illustrative calculator and local context for Spring Valley property taxes in Clark County, Nevada.",
    url: pageUrl,
    type: "article",
    ...propertyTaxOgTwitter.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring Valley, NV Property Taxes & Rate | Dr. Jan Duffy",
    description:
      "Illustrative calculator and local context for Spring Valley property taxes in Clark County, Nevada.",
    ...propertyTaxOgTwitter.twitter,
  },
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Neighborhoods", url: "/neighborhoods" },
  { name: "Spring Valley", url: "/neighborhoods/spring-valley" },
  { name: "Property taxes", url: pagePath },
];

const propertyTaxFaqs = [
  {
    question: "What is the effective property tax rate in Spring Valley, NV?",
    answer:
      "Third-party analyses (including SmartAsset data cited by the Reno Gazette Journal in 2025) often place Spring Valley around a 0.48% effective rate—meaning typical annual property taxes divided by home value across the area. That is an estimate for comparison, not your official tax rate on every parcel.",
  },
  {
    question: "How are Clark County, Nevada property taxes calculated?",
    answer:
      "In Nevada, property taxes are tied to taxable assessed value through county assessment and tax districts—not a simple “market value times one percentage” on the purchase price. Clark County sets assessments, applies exemptions, and applies tax caps where applicable. See the Clark County Assessor for parcel-specific data.",
  },
  {
    question: "Is market value the same as taxable value on my Nevada property tax bill?",
    answer:
      "Not necessarily. Your purchase price is not the same as a county-assessed taxable value. Nevada uses a taxable assessment process and limits on annual increases for primary residences (where applicable). Always verify the assessed value on your tax bill or through the Assessor.",
  },
  {
    question: "Where can I look up my Spring Valley property tax bill or assessed value?",
    answer:
      "Start with the Clark County Assessor (clarkcountynv.gov / assessor.clarkcountynv.gov) for parcel information and assessment questions, and the Clark County government site for payment and department links. Use official county sources for deadlines and amounts.",
  },
  {
    question: "Does Dr. Jan Duffy provide tax or legal advice on property taxes?",
    answer:
      `No. Real estate licensees help you understand how taxes fit into buying and selling; tax preparation, appeals strategy, and legal interpretation belong to CPAs and attorneys. Call ${agentInfo.phone} for real estate guidance and referrals to trusted professionals when needed.`,
  },
];

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(breadcrumbs),
  generateWebPageSchema({
    name: "Spring Valley, NV Property Taxes & Effective Tax Rate",
    description:
      "Illustrative calculator and educational overview of Spring Valley property taxes in Clark County, Nevada—not tax or legal advice.",
    url: pagePath,
    primaryImageOfPage: propertyTaxOgUrl,
  }),
  generateFAQSchema(propertyTaxFaqs),
);

export default function SpringValleyPropertyTaxesPage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} id="spring-valley-property-tax-schema" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="mb-6 max-w-4xl text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link href="/neighborhoods" className="hover:text-blue-600">
              Neighborhoods
            </Link>
            {" / "}
            <Link href="/neighborhoods/spring-valley" className="hover:text-blue-600">
              Spring Valley
            </Link>
            {" / "}
            <span className="text-slate-700">Property taxes</span>
          </nav>

          <header className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Clark County · Spring Valley CDP
            </p>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
              Spring Valley, NV real estate taxes &amp; property tax rate
            </h1>
            <p className="text-lg text-slate-600">
              Ballpark the annual cost of owning in Spring Valley, then confirm with the Clark County
              Assessor. Dr. Jan Duffy provides real estate guidance—not tax or legal advice.
            </p>
          </header>

          <div className="mx-auto mb-14 max-w-3xl">
            <SpringValleyPropertyTaxEstimator />
          </div>

          <section className="mx-auto mb-14 max-w-3xl prose prose-slate" aria-labelledby="understanding-heading">
            <h2 id="understanding-heading" className="text-2xl font-bold text-slate-900">
              What is the Spring Valley, NV effective property tax rate?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Published third-party analyses often describe Spring Valley with an{" "}
              <strong>effective rate near {springValleyEffectiveRatePercentDisplay}</strong>—that is
              typical total property tax as a share of home value, not a single statutory rate on every
              home. For example, at an estimated market value of{" "}
              <strong>${springValleyTaxExampleMarketValue.toLocaleString("en-US")}</strong>, an
              illustrative multiplication yields about{" "}
              <strong>${exampleAnnual.toLocaleString("en-US")} per year</strong> before rounding to
              your actual bill. Source:{" "}
              <a
                href={effectiveRateCitation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                {effectiveRateCitation.publisher}
              </a>{" "}
              (SmartAsset-based data; {effectiveRateCitation.accessedYear}).
            </p>
            <p className="text-slate-600 text-sm">{propertyTaxDisclaimerMedium}</p>
          </section>

          <section className="mx-auto mb-14 max-w-3xl prose prose-slate" aria-labelledby="how-clark-heading">
            <h2 id="how-clark-heading" className="text-2xl font-bold text-slate-900">
              How do Spring Valley and Clark County property tax bills work?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Spring Valley is a large census-designated place (CDP) in <strong>unincorporated Clark County</strong>.
              Property taxes are assessed by the county, and your bill reflects{" "}
              <strong>taxable assessed value</strong>, district levies, exemptions, and abatements—not
              a single “list price × rate” shortcut. Bills are mailed on a county schedule; payment
              rules and deadlines are on the county Treasurer site when you are ready to pay.
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Assessed value is determined by the Assessor; you can appeal if you have evidence.</li>
              <li>Primary residences may qualify for abatements and caps under Nevada law—verify eligibility.</li>
              <li>Buyer budgets should include taxes, insurance, and HOA—not just principal and interest.</li>
            </ul>
          </section>

          <section className="mx-auto mb-14 max-w-3xl prose prose-slate" aria-labelledby="compare-heading">
            <h2 id="compare-heading" className="text-2xl font-bold text-slate-900">
              How does Spring Valley compare to the U.S. average property tax burden?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              National surveys often cite a <strong>roughly 1.1% effective rate</strong> as a U.S.
              average for comparison. Many Nevada communities, including Spring Valley, show{" "}
              <strong>lower effective rates</strong> in third-party rankings—one reason buyers compare
              total cost of ownership when relocating from higher-tax states. Your actual bill still
              depends on your assessed value and district.
            </p>
          </section>

          <section className="mx-auto mb-14 max-w-3xl" aria-labelledby="community-heading">
            <h2 id="community-heading" className="text-2xl font-bold text-slate-900 mb-3">
              Where can I see population and income data for Spring Valley?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Demographics change with every Census and American Community Survey release. For
              current tables (population, income, housing costs) without pasting stale numbers on
              this page, use the{" "}
              <a
                href="https://data.census.gov/profile?q=Spring%20Valley%20CDP,%20Nevada"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                U.S. Census Bureau profile for Spring Valley CDP, NV
              </a>
              . That keeps this guide focused on <strong>how property taxes fit</strong> into your
              homebuying or selling plan in Spring Valley.
            </p>
          </section>

          <section className="mx-auto mb-14 max-w-3xl" aria-labelledby="resources-heading">
            <h2 id="resources-heading" className="text-2xl font-bold text-slate-900 mb-4">
              Clark County tax resources (official)
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a
                  href={clarkCountyTaxResources.assessorHome}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                >
                  Clark County Assessor
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
                — assessments, parcel records, and assessment questions.
              </li>
              <li>
                <a
                  href={clarkCountyTaxResources.countyGovernment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                >
                  Clark County, Nevada — government home
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
                — departments, Treasurer, and county services.
              </li>
            </ul>
          </section>

          <section className="mx-auto mb-14 max-w-4xl" aria-labelledby="map-heading">
            <h2 id="map-heading" className="text-2xl font-bold text-slate-900 mb-3 text-center">
              Spring Valley area map (orientation)
            </h2>
            <p className="text-slate-600 text-center mb-6 max-w-2xl mx-auto text-sm">
              Same west valley layer used on our Spring Valley guide—useful for commute and amenities
              context alongside tax budgeting.
            </p>
            <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <iframe
                src={googleMyMapEmbedUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Spring Valley Las Vegas area map — orientation"
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
            </p>
          </section>

          <section className="mx-auto mb-14 max-w-3xl" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {propertyTaxFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{officeInfo.name}</h2>
            <p className="text-slate-600 text-sm mb-4">{officeInfo.address.full}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700"
              >
                <Phone className="h-5 w-5" />
                {agentInfo.phone}
              </a>
              <Link
                href="/neighborhoods/spring-valley"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 hover:border-blue-400"
              >
                <MapPin className="h-5 w-5" />
                Spring Valley guide
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 hover:border-blue-400"
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
