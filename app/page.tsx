import Navbar from "@/components/layouts/Navbar";
import AgentHeadshot from "@/components/shared/AgentHeadshot";
import HeroSection from "@/components/sections/HeroSection";
import BuyerEngagementStrip from "@/components/sections/BuyerEngagementStrip";
import ComingSoonListingSection from "@/components/sections/ComingSoonListingSection";
import ServiceAreaMapSection from "@/components/sections/ServiceAreaMapSection";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Home as HomeIcon,
  TrendingUp,
  Shield,
  Users,
  Phone,
} from "lucide-react";
import SchemaScript from "@/components/SchemaScript";
import SiteBylineDate from "@/components/shared/SiteBylineDate";
import {
  agentStats,
  marketStats,
  siteConfig,
  siteContentDates,
  valuePropositions,
} from "@/lib/site-config";
import { homePageFaqs } from "@/lib/home-faqs";
import { combineHomepageStructuredData } from "@/lib/schema";
import { absoluteMediaUrl, heroBackgroundSrcs } from "@/lib/site-media";
import { luxuryImages } from "@/lib/luxury-media";
import LuxurySectionPhoto from "@/components/sections/LuxurySectionPhoto";
import { ogTwitterImageFields } from "@/lib/og-image";
import { homePageTitleAbsolute } from "@/lib/seo";
import {
  siblingCommunityLinks,
  springValleySubdivisions,
} from "@/lib/spring-valley-ia";

const homePreferredImageUrl = absoluteMediaUrl(heroBackgroundSrcs[0]);
const homeOgTwitter = ogTwitterImageFields(homePreferredImageUrl, {
  alt: "Spring Valley Las Vegas homes and Las Vegas Valley real estate — hero image",
});

const homeStructuredData = combineHomepageStructuredData({
  faqs: homePageFaqs,
  webPage: {
    name: homePageTitleAbsolute,
    description: siteConfig.description,
    url: "/",
    datePublished: siteContentDates.datePublished,
    dateModified: siteContentDates.dateModified,
    primaryImageOfPage: homePreferredImageUrl,
  },
});

const lv = marketStats.lasVegas;
const medianDisplay = `$${Math.round(lv.medianPrice / 1000)}K`;
const listingsDisplay = lv.activeListings.toLocaleString("en-US");

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: {
    absolute: homePageTitleAbsolute,
  },
  description: siteConfig.description,
  openGraph: {
    title: homePageTitleAbsolute,
    description: siteConfig.description,
    url: siteConfig.url,
    ...homeOgTwitter.openGraph,
  },
  twitter: {
    title: homePageTitleAbsolute,
    description: siteConfig.description,
    ...homeOgTwitter.twitter,
  },
};

export default function Home() {
  return (
    <>
      <SchemaScript schema={homeStructuredData} id="home-structured-data" />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection
          headlinePrimary="Spring Valley Las Vegas Homes for Sale"
          headlineSecondary=""
        />

        <div
          className="border-b border-slate-200 bg-slate-50 py-2.5"
          aria-label="Page last updated"
        >
          <div className="container mx-auto px-4">
            <SiteBylineDate />
          </div>
        </div>

        <BuyerEngagementStrip />

        <ComingSoonListingSection />

        <RealScoutListings />

        <ServiceAreaMapSection />

        {/* Berkshire Hathaway — copy aligned with site-config value props; details on /why-berkshire-hathaway */}
        <section
          className="py-16 md:py-20 bg-white"
          aria-labelledby="bhhs-heading"
        >
          <div className="container mx-auto px-4">
            <LuxurySectionPhoto
              src={luxuryImages.bhhs}
              alt="Dark conference setting with gold light — Berkshire Hathaway HomeServices"
              eyebrow="Berkshire Hathaway HomeServices"
            />
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2
                id="bhhs-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
              >
                The Berkshire Hathaway HomeServices difference
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {valuePropositions.main}
              </p>
              <p className="mt-4">
                <Link
                  href="/why-berkshire-hathaway"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Why Berkshire Hathaway HomeServices →
                </Link>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Trusted Brand</h3>
                <p className="text-slate-600 text-sm">
                  Berkshire Hathaway HomeServices is the only major real estate
                  brand backed by Warren Buffett&apos;s Berkshire Hathaway Inc.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Global Network</h3>
                <p className="text-slate-600 text-sm">
                  50,000+ agents worldwide for referrals and relocations.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Market Expertise</h3>
                <p className="text-slate-600 text-sm">
                  Serving Las Vegas since {agentStats.servingSince} with{" "}
                  {agentStats.volumeClosed} in closed transactions.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <HomeIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Full Service</h3>
                <p className="text-slate-600 text-sm">
                  Buying, selling, luxury, investment, relocation—we do it all
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mt-12 bg-slate-50 rounded-lg p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <AgentHeadshot
                  frameClassName="w-36 shrink-0 aspect-square sm:w-40"
                  sizes="160px"
                />
                <div>
                  <blockquote className="text-lg text-slate-700 italic mb-4">
                    &ldquo;When clients ask why they should choose a Berkshire
                    Hathaway HomeServices agent, I tell them: you&apos;re not
                    just getting me—you&apos;re getting a global network and a
                    brand that&apos;s synonymous with trust.&rdquo;
                  </blockquote>
                  <cite className="text-slate-900 font-semibold not-italic">
                    — Dr. Jan Duffy, BHHS Nevada Properties
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market snapshot — figures from site-config `marketStats` (update with source of truth) */}
        <section
          className="py-16 bg-slate-900 text-white"
          aria-labelledby="market-snapshot-heading"
        >
          <div className="container mx-auto px-4">
            <LuxurySectionPhoto
              src={luxuryImages.market}
              alt="West Las Vegas Valley at dusk from Spring Valley"
              eyebrow="Market snapshot"
            />
            <div className="text-center mb-12">
              <h2
                id="market-snapshot-heading"
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Las Vegas Real Estate Market | {marketStats.lastUpdated}
              </h2>
              <p className="text-slate-300">
                Snapshot for general Las Vegas market context—see the full
                report for methodology and the latest detail.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {medianDisplay}
                </div>
                <div className="text-slate-300 text-sm">Median Home Price</div>
                <div className="text-green-400 text-sm">
                  {lv.yearOverYearChange} YoY
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {lv.daysOnMarket}
                </div>
                <div className="text-slate-300 text-sm">Avg Days on Market</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {listingsDisplay}
                </div>
                <div className="text-slate-300 text-sm">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {lv.inventoryMonths}
                </div>
                <div className="text-slate-300 text-sm">Months Inventory</div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm max-w-2xl mx-auto mt-6">
              Not financial advice; figures are for general market context. For
              methodology and detail, see the full report.
            </p>
            <div className="text-center mt-8">
              <Link
                href="/market-report"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                View Full Market Report
              </Link>
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <LuxurySectionPhoto
              src={luxuryImages.neighborhoods}
              alt="Dusk streetscape in Spring Valley Las Vegas"
              eyebrow="Subdivisions"
            />
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Spring Valley Subdivisions
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Browse Spring Valley communities, then compare nearby valley
                markets on their own sites
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {springValleySubdivisions.map((area) => (
                <Link
                  key={area.slug}
                  href={area.href}
                  className="bg-slate-50 hover:bg-blue-50 rounded-lg p-4 text-center transition-colors group"
                >
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                    {area.name}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mt-6">
              {siblingCommunityLinks.map((area) => (
                <a
                  key={area.href}
                  href={area.href}
                  target="_blank"
                  rel="noopener"
                  className="bg-slate-50 hover:bg-blue-50 rounded-lg p-4 text-center transition-colors group"
                >
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                    {area.name}
                  </h3>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/neighborhoods"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All Neighborhoods →
              </Link>
            </div>
          </div>
        </section>

        <section
          className="py-12 bg-emerald-50/70"
          aria-labelledby="spring-valley-property-tax-heading"
        >
          <div className="container mx-auto px-4">
            <LuxurySectionPhoto
              src={luxuryImages.guides}
              alt="Brass keys and a dark folio on walnut"
              eyebrow="Property taxes"
            />
            <div className="max-w-4xl mx-auto rounded-2xl border border-emerald-100 bg-white px-6 py-8 md:px-10">
              <h2
                id="spring-valley-property-tax-heading"
                className="text-xl font-bold text-slate-900 mb-3 text-center md:text-2xl"
              >
                Spring Valley Property Taxes &amp; Clark County
              </h2>
              <p className="text-slate-700 text-center mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Third-party estimates often put the{" "}
                <strong>effective rate near 0.48%</strong>—useful for budgeting,
                not your official bill. Use the guide for an illustrative
                calculator, how Nevada assessments work, and Clark County
                Assessor links.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/guides/property-taxes"
                  className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Spring Valley property tax guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#12100c] pt-10">
          <div className="container mx-auto px-4">
            <LuxurySectionPhoto
              src={luxuryImages.about}
              alt="Stucco and tile architectural detail at golden hour"
              eyebrow="Why choose us"
            />
          </div>
          <WhyChooseUs />
        </section>
        <section className="bg-[#14110c]">
          <div className="container mx-auto px-4 pt-10">
            <LuxurySectionPhoto
              src={luxuryImages.contact}
              alt="Dark luxury lobby with champagne-gold lighting"
              eyebrow="Client reviews"
            />
          </div>
          <ReviewsSection />
        </section>
        <section className="bg-[#12100c]">
          <div className="container mx-auto px-4 pt-10">
            <LuxurySectionPhoto
              src={luxuryImages.faq}
              alt="Gold desk lamp on a dark notebook"
              eyebrow="FAQs"
            />
          </div>
          <FAQSection
            faqs={homePageFaqs}
            title="Spring Valley Las Vegas Homes — FAQs"
            subtitle="Straight answers about Spring Valley real estate, homes for sale, and working with Dr. Jan Duffy's team"
          />
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <LuxurySectionPhoto
              src={luxuryImages.sellers}
              alt="Twilight exterior of a Spring Valley home"
              eyebrow="Work with Dr. Jan Duffy"
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Work with Berkshire Hathaway HomeServices?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're buying, selling, or investing in Las Vegas real
              estate, Dr. Jan Duffy is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17026648424"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (702) 664-8424
              </a>
              <Link
                href="/contact"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Send a Message
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              Dr. Jan Duffy | License S.0197614.LLC | Berkshire Hathaway
              HomeServices Nevada Properties
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <div className="bg-slate-100 py-4 text-center text-sm text-slate-500">
          Last Updated: January 2026 | {siteConfig.name} — Berkshire Hathaway
          HomeServices Nevada Properties
        </div>
      </main>
      <Footer />
    </>
  );
}
