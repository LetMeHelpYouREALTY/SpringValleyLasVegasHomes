import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, MapPin, LineChart, Home, Phone, DollarSign } from "lucide-react";
import { agentInfo } from "@/lib/site-config";
import { metaDescriptionWithKeyword, seoPrimaryKeyword } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/resources",
  },
  title: "Real Estate Resources & Guides",
  description: metaDescriptionWithKeyword(
    "Guides and tools for Spring Valley Las Vegas homes—neighborhood guide, market reports, MLS search, and contact Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
    true,
  ),
};

const cards = [
  {
    href: "/neighborhoods/spring-valley",
    title: "Spring Valley neighborhood guide",
    body: `Deep dive on ${seoPrimaryKeyword}, west valley context, and FAQs before you tour.`,
    icon: MapPin,
  },
  {
    href: "/listings",
    title: "MLS search & listings",
    body: "Browse active listings and filter by price, beds, baths, and area across the Las Vegas Valley.",
    icon: Home,
  },
  {
    href: "/market-report",
    title: "Market report",
    body: "Median price, days on market, and inventory trends to time your move with confidence.",
    icon: LineChart,
  },
  {
    href: "/neighborhoods/spring-valley/property-taxes",
    title: "Spring Valley property taxes",
    body: "Effective rate context, illustrative calculator, and Clark County Assessor resources—not tax advice.",
    icon: DollarSign,
  },
  {
    href: "/contact",
    title: "Talk with the team",
    body: `Call ${agentInfo.phone} for showings, pricing, and strategy for Spring Valley and beyond.`,
    icon: Phone,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-3">
              <BookOpen className="h-4 w-4" aria-hidden />
              Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {seoPrimaryKeyword} — tools &amp; guides
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start with the Spring Valley guide, search listings, review the market, then reach out for
              a personalized plan with Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada
              Properties.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            {cards.map(({ href, title, body, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all bg-white"
              >
                <Icon className="h-8 w-8 text-blue-600 mb-3" aria-hidden />
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 mb-2">
                  {title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                <span className="inline-block mt-4 text-blue-600 font-semibold text-sm">
                  Open →
                </span>
              </Link>
            ))}
          </div>

          <section className="mt-14 bg-slate-50 rounded-xl p-8 border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">More topics</h2>
            <ul className="flex flex-wrap gap-3 text-sm">
              {[
                ["/buyers", "Buyers"],
                ["/sellers", "Sellers"],
                ["/home-valuation", "Home valuation"],
                ["/luxury-homes", "Luxury homes"],
                ["/55-plus-communities", "55+ communities"],
                ["/faq", "FAQ"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-blue-600 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
