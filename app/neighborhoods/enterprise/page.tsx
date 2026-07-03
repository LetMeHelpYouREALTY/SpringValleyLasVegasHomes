import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateNeighborhoodSchema,
  combineSchemas,
} from "@/lib/schema";
import {
  agentInfo,
  googleMyMapEmbedUrl,
  googleMyMapViewerUrl,
  officeInfo,
} from "@/lib/site-config";
import { metaDescriptionWithKeyword } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/neighborhoods/enterprise",
  },
  title: "Enterprise Las Vegas Homes & Rhodes Ranch Area",
  description: metaDescriptionWithKeyword(
    "Enterprise NV real estate—southwest Las Vegas homes, Rhodes Ranch, and communities buyers compare with Spring Valley. MLS search and guidance with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    true,
  ),
  keywords: [
    "Enterprise Las Vegas homes",
    "Enterprise NV real estate",
    "Rhodes Ranch Las Vegas",
    "southwest Las Vegas homes",
    "Enterprise Nevada homes for sale",
    "guard gated golf Las Vegas",
  ],
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Neighborhoods", url: "/neighborhoods" },
  { name: "Enterprise", url: "/neighborhoods/enterprise" },
];

const enterpriseFaqs = [
  {
    question: "Is Enterprise the same as Spring Valley?",
    answer:
      "No. Enterprise is a census-designated place in the southwest Las Vegas Valley. Spring Valley sits to the north and west. Buyers often compare Enterprise Las Vegas homes with Spring Valley listings because both sit on the west side of the valley, but MLS boundaries, schools, and commute times differ by address.",
  },
  {
    question: "Is Rhodes Ranch in Enterprise, NV?",
    answer:
      "Rhodes Ranch is a large guard-gated golf community in the Enterprise area—many searches for Rhodes Ranch Las Vegas overlap with Enterprise NV real estate. Always confirm HOA, subdivision, and tax parcel on the specific listing, not just the map pin.",
  },
  {
    question: "How is the commute from Enterprise to the Strip or airport?",
    answer:
      "Many Enterprise and southwest valley locations use I-15, the 215 Beltway, and Dean Martin / Las Vegas Boulevard corridors. Exact drive times depend on your street and time of day—we map realistic routes when you short-list homes.",
  },
  {
    question: "Who helps with Enterprise Las Vegas homes?",
    answer: `Dr. Jan Duffy represents buyers and sellers across Enterprise, Spring Valley, and the Las Vegas Valley. Call ${agentInfo.phone} or email ${agentInfo.email}. Office: ${officeInfo.address.full}.`,
  },
];

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(breadcrumbs),
  generateNeighborhoodSchema({
    name: "Enterprise",
    slug: "enterprise",
    description:
      "Enterprise, NV—southwest Las Vegas Valley census-designated place. Enterprise Las Vegas homes include master-planned and guard-gated communities such as Rhodes Ranch; buyers often compare inventory with Spring Valley and Mountains Edge.",
    latitude: 36.026,
    longitude: -115.245,
    containedIn: "Las Vegas",
  }),
  generateFAQSchema(enterpriseFaqs),
);

export default function EnterprisePage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} id="enterprise-schema" />
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
              <span className="text-slate-900">Enterprise</span>
            </nav>
          </div>

          <header className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-3">Southwest Las Vegas Valley</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Enterprise Las Vegas Homes &amp; Rhodes Ranch Area
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              <strong>Enterprise, NV</strong> covers a fast-growing southwest corridor—known for
              guard-gated golf communities like <strong>Rhodes Ranch</strong>, newer construction,
              and proximity to the 215 Beltway. Use this guide to orient your search, then explore
              live MLS inventory with Dr. Jan Duffy.
            </p>
          </header>

          <section className="max-w-4xl mx-auto mb-14 prose prose-slate">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What is Enterprise, Nevada?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Enterprise is an unincorporated Clark County community in the{" "}
              <strong>southwest Las Vegas Valley</strong>. It is not the same mailing label as{" "}
              <Link href="/neighborhoods/spring-valley" className="text-blue-600 hover:underline">
                Spring Valley
              </Link>
              , but buyers frequently cross-shop <strong>Enterprise Las Vegas homes</strong> with
              Spring Valley and{" "}
              <Link href="/neighborhoods/mountains-edge" className="text-blue-600 hover:underline">
                Mountains Edge
              </Link>{" "}
              depending on budget, HOA appetite, and commute.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
              Why do buyers ask about Rhodes Ranch?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              <strong>Rhodes Ranch</strong> is one of the most searched guard-gated names in the
              southwest valley—golf, clubhouse, and recreation amenities attract families and
              relocators. Pricing and availability change weekly; we run live comps for the exact
              subdivision and floor plan you prefer.
            </p>
          </section>

          <section className="max-w-4xl mx-auto mb-14" aria-labelledby="enterprise-map-heading">
            <h2
              id="enterprise-map-heading"
              className="text-2xl font-bold text-slate-900 mb-3 text-center"
            >
              Map — southwest valley orientation
            </h2>
            <p className="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
              Use this layer to see how Enterprise sits relative to Spring Valley, the 215, and the
              wider valley—pair with MLS search for specific listings.
            </p>
            <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <iframe
                src={googleMyMapEmbedUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Las Vegas valley map — Enterprise and southwest orientation"
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

          <section className="max-w-4xl mx-auto mb-16 bg-blue-600 text-white rounded-2xl p-8 md:p-10 text-center">
            <MapPin className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-3">Tour Enterprise Las Vegas homes</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get a clear search plan for Enterprise, Rhodes Ranch, and southwest listings—backed
              by Berkshire Hathaway HomeServices Nevada Properties.
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
            <p className="mt-6 text-sm text-blue-200">{officeInfo.address.full}</p>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Enterprise, NV — FAQs
            </h2>
            <div className="space-y-4">
              {enterpriseFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-slate-200 rounded-lg p-5 bg-white"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-10 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/neighborhoods/spring-valley" className="text-blue-600 hover:underline">
              Spring Valley guide
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/listings" className="text-blue-600 hover:underline">
              MLS search
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/las-vegas-zip-code-map" className="text-blue-600 hover:underline">
              Zip code map
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/neighborhoods" className="text-blue-600 hover:underline">
              All neighborhoods
            </Link>
          </section>

          <RealScoutListings />
        </div>
      </main>
      <Footer />
    </>
  );
}
