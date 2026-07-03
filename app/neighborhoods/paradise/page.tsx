import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { Phone, Building2, Plane, GraduationCap, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateNeighborhoodSchema,
  combineSchemas,
} from "@/lib/schema";
import { agentInfo, officeInfo } from "@/lib/site-config";
import { metaDescriptionWithKeyword } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/neighborhoods/paradise",
  },
  robots: { index: true, follow: true },
  title: "Paradise NV Homes Near Strip & UNLV",
  description: metaDescriptionWithKeyword(
    "Paradise NV real estate—homes near the Las Vegas Strip, Harry Reid International Airport, and UNLV. Search MLS and get local guidance with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    true,
  ),
  keywords: [
    "Paradise NV homes",
    "Paradise Las Vegas real estate",
    "homes near UNLV",
    "Las Vegas Strip area homes",
    "Paradise Nevada homes for sale",
    "east Las Vegas valley homes",
  ],
  openGraph: {
    title: "Paradise NV Homes Near Strip & UNLV",
    description:
      "Paradise Las Vegas real estate near the Strip, Harry Reid Airport, and UNLV—with Dr. Jan Duffy.",
    url: "/neighborhoods/paradise",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Neighborhoods", url: "/neighborhoods" },
  { name: "Paradise", url: "/neighborhoods/paradise" },
];

const paradiseFaqs = [
  {
    question: "Is Paradise the same as Las Vegas city?",
    answer:
      "Paradise is an unincorporated census-designated place in Clark County that includes much of the Las Vegas Strip corridor and nearby residential pockets. Street addresses may say Las Vegas, but tax districts, services, and HOA rules can differ from the City of Las Vegas—verify on each listing.",
  },
  {
    question: "Who buys Paradise NV homes?",
    answer:
      "Buyers include hospitality and airport employees, UNLV-area students and faculty, investors evaluating short-term rental rules carefully, and owner-occupants who want central access to employment centers. We align your search with financing, HOA rental caps, and your commute.",
  },
  {
    question: "How close is Paradise to the airport?",
    answer:
      "Many Paradise locations offer practical access to Harry Reid International Airport via Tropicana, Paradise Road, and I-15—exact minutes depend on your block and time of day. We test realistic routes when you short-list homes.",
  },
  {
    question: "Who can represent me in Paradise?",
    answer: `Dr. Jan Duffy assists buyers and sellers across Paradise and Clark County. Call ${agentInfo.phone} or email ${agentInfo.email}. Office: ${officeInfo.address.full}.`,
  },
];

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(breadcrumbs),
  generateNeighborhoodSchema({
    name: "Paradise",
    slug: "paradise",
    description:
      "Paradise, NV—Clark County census-designated place including much of the Las Vegas Strip corridor and nearby residential areas. Paradise NV homes attract buyers seeking central valley access, UNLV proximity, and employment near hospitality and the airport.",
    latitude: 36.097,
    longitude: -115.147,
    containedIn: "Las Vegas",
  }),
  generateFAQSchema(paradiseFaqs),
);

export default function ParadisePage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} id="paradise-schema" />
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
              <span className="text-slate-900">Paradise</span>
            </nav>
          </div>

          <header className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-3">Central Las Vegas Valley</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Paradise NV Homes — Strip Corridor &amp; UNLV Area
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              <strong>Paradise, Nevada</strong> includes much of the world-famous resort corridor and
              nearby residential neighborhoods—plus practical access to{" "}
              <strong>Harry Reid International Airport</strong> and{" "}
              <strong>UNLV</strong>. If you want a central Las Vegas lifestyle, we help you navigate{" "}
              <strong>Paradise NV homes</strong> with MLS-backed diligence on HOAs and rental rules.
            </p>
          </header>

          <section className="max-w-5xl mx-auto mb-16" aria-labelledby="paradise-buyers-heading">
            <h2 id="paradise-buyers-heading" className="text-2xl font-bold text-slate-900 text-center mb-8">
              Why buyers consider Paradise, NV
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <Building2 className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Hospitality &amp; employment</h3>
              <p className="text-sm text-slate-600">
                Many buyers work on or near the resort corridor—neighborhood choice affects commute,
                parking, and lifestyle noise. We filter for what you can live with day to day.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <Plane className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Airport access</h3>
              <p className="text-sm text-slate-600">
                Frequent travelers often prioritize predictable routes to Harry Reid—test drive times
                before you write an offer, not after.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <GraduationCap className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2 text-lg">UNLV &amp; education</h3>
              <p className="text-sm text-slate-600">
                Faculty, students, and staff may want a short hop to campus—school assignments for
                younger children still depend on the exact address.
              </p>
            </div>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-14 prose prose-slate">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How is Paradise different from Summerlin or Henderson?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Paradise skews <strong>central and east-valley</strong>, while{" "}
              <Link href="/neighborhoods/summerlin" className="text-blue-600 hover:underline">
                Summerlin
              </Link>{" "}
              and{" "}
              <Link href="/neighborhoods/henderson" className="text-blue-600 hover:underline">
                Henderson
              </Link>{" "}
              offer different master-planned character and commute patterns. There is no single
              &quot;best&quot; answer—only the fit for your budget, timeline, and daily routes.
            </p>
          </section>

          <section className="max-w-4xl mx-auto mb-16 bg-blue-600 text-white rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Search Paradise NV homes</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Tell us your commute, HOA tolerance, and financing timeline—we align MLS search with
              reality on the ground.
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
                Get in touch
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-200">{officeInfo.address.full}</p>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Paradise, NV — FAQs
            </h2>
            <div className="space-y-4">
              {paradiseFaqs.map((faq) => (
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
            <Link href="/neighborhoods/henderson" className="text-blue-600 hover:underline">
              Henderson
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/neighborhoods/spring-valley" className="text-blue-600 hover:underline">
              Spring Valley
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/listings" className="text-blue-600 hover:underline">
              MLS search
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/relocation" className="text-blue-600 hover:underline">
              Relocation
            </Link>
          </section>

          <RealScoutListings />
        </div>
      </main>
      <Footer />
    </>
  );
}
