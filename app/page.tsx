import Navbar from "@/components/layouts/Navbar";
import AgentHeadshot from "@/components/shared/AgentHeadshot";
import HeroSection from "@/components/sections/HeroSection";
import BuyerEngagementStrip from "@/components/sections/BuyerEngagementStrip";
import FeaturedListing from "@/components/sections/FeaturedListing";
import ServiceAreaMapSection from "@/components/sections/ServiceAreaMapSection";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import BookingSection from "@/components/sections/BookingSection";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { Home as HomeIcon, TrendingUp, Shield, Users, Phone } from "lucide-react";
import SchemaScript from "@/components/SchemaScript";
import SiteBylineDate from "@/components/shared/SiteBylineDate";
import {
  agentInfo,
  agentStats,
  marketStats,
  siteConfig,
  siteContentDates,
  valuePropositions,
} from "@/lib/site-config";
import { homePageFaqs } from "@/lib/home-faqs";
import { combineHomepageStructuredData } from "@/lib/schema";
import { absoluteMediaUrl, heroBackgroundSrcs } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import { homePageTitleAbsolute } from "@/lib/seo";

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
const listingsDisplay = lv.listingsWithoutOffers.toLocaleString("en-US");

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
        <HeroSection />

        <FeaturedListing
          phone={agentInfo.phone}
          phoneHref={agentInfo.phoneTel}
          siteHost="springvalleylasvegashomes.com"
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

        <RealScoutListings />

        <ServiceAreaMapSection />

        {/* Why work with Dr. Jan — copy aligned with site-config value props; details on /why-berkshire-hathaway */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="bhhs-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2
                id="bhhs-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
              >
                The Dr. Jan Duffy difference
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">{valuePropositions.main}</p>
              <p className="mt-4">
                <Link
                  href="/why-berkshire-hathaway"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Why work with Dr. Jan Duffy →
                </Link>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Trusted Advisor</h3>
                <p className="text-slate-600 text-sm">
                  In real estate since 1983, with honest advice and transparent communication in
                  every transaction.
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
                  In real estate since {agentStats.servingSince} with {agentStats.volumeClosed} in
                  closed transactions.
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
                    &ldquo;When clients ask why they should choose a local REALTOR®, I tell them: you&apos;re not just getting me—you&apos;re getting a global
                    network and a brand that&apos;s synonymous with trust.&rdquo;
                  </blockquote>
                  <cite className="text-slate-900 font-semibold not-italic">
                    — Dr. Jan Duffy, REALTOR®
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BookingSection />

        {/* Market snapshot — figures from site-config `marketStats` (update with source of truth) */}
        <section className="py-16 bg-ink text-ivory" aria-labelledby="market-snapshot-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="market-snapshot-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Las Vegas Real Estate Market | {marketStats.lastUpdated}
              </h2>
              <p className="text-slate-300">
                Snapshot for general Las Vegas market context—see the full report for methodology and
                the latest detail.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{medianDisplay}</div>
                <div className="text-slate-300 text-sm">Median Single-Family Price</div>
                <div className="text-bronze-300 text-sm">{lv.yearOverYearChange} YoY</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {lv.soldWithin60Days}
                </div>
                <div className="text-slate-300 text-sm">Sold Within 60 Days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {listingsDisplay}
                </div>
                <div className="text-slate-300 text-sm">Homes Listed Without Offers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {lv.inventoryMonths}
                </div>
                <div className="text-slate-300 text-sm">Months of Supply</div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm max-w-2xl mx-auto mt-6">
              Source:{" "}
              <a href={lv.sourceUrl} className="text-slate-300 underline" rel="noopener noreferrer">
                {lv.source}
              </a>
              . Single-family homes, Greater Las Vegas. Not financial advice.
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Las Vegas Neighborhoods We Serve
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Dr. Jan Duffy covers all of Southern Nevada
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {(
                [
                  {
                    name: "Spring Valley",
                    detail: "Spring Valley Las Vegas homes",
                    href: "/neighborhoods/spring-valley",
                  },
                  { name: "Enterprise", detail: "Rhodes Ranch area", slug: "enterprise" },
                  { name: "Paradise", detail: "Strip & UNLV area", slug: "paradise" },
                  { name: "Summerlin", detail: "From $625K", slug: "summerlin" },
                  { name: "Henderson", detail: "From $485K", slug: "henderson" },
                  { name: "Green Valley", detail: "From $520K", slug: "green-valley" },
                  { name: "The Ridges", detail: "From $2.5M", slug: "the-ridges" },
                  { name: "Southern Highlands", detail: "From $750K", slug: "southern-highlands" },
                  { name: "North Las Vegas", detail: "From $385K", slug: "north-las-vegas" },
                  { name: "Skye Canyon", detail: "From $550K", slug: "skye-canyon" },
                  { name: "Centennial Hills", detail: "From $495K", slug: "centennial-hills" },
                  { name: "Inspirada", detail: "From $525K", slug: "inspirada" },
                  { name: "Mountains Edge", detail: "From $475K", slug: "mountains-edge" },
                ] as const
              ).map((area) => {
                const href = "href" in area ? area.href : `/neighborhoods/${area.slug}`;
                const key = "href" in area ? area.href : area.slug;
                return (
                  <Link
                    key={key}
                    href={href}
                    className="bg-slate-50 hover:bg-blue-50 rounded-lg p-4 text-center transition-colors group"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                      {area.name}
                    </h3>
                    <p className="text-sm text-slate-500">{area.detail}</p>
                  </Link>
                );
              })}
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

        <WhyChooseUs />
        <ReviewsSection />
        <FAQSection
          faqs={homePageFaqs}
          title="Spring Valley Las Vegas Homes — FAQs"
          subtitle="Straight answers about Spring Valley real estate, homes for sale, and working with Dr. Jan Duffy's team"
        />

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-ink text-ivory">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Work with Dr. Jan Duffy?
            </h2>
            <p className="text-xl text-ivory/80 mb-8 max-w-2xl mx-auto">
              Whether you're buying, selling, or investing in Las Vegas real estate, Dr. Jan Duffy
              is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17026648424"
                className="inline-flex items-center justify-center bg-ivory text-ink px-8 py-4 font-semibold text-lg hover:bg-bronze-100 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (702) 664-8424
              </a>
              <Link
                href="/#book-consultation"
                className="inline-block border border-bronze-300 text-ivory hover:bg-bronze-700 px-8 py-4 font-semibold text-lg transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
            <p className="mt-6 text-bronze-300 text-sm">
              Dr. Jan Duffy, REALTOR® | In real estate since 1983
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <div className="bg-slate-100 py-4 text-center text-sm text-slate-500">
          Last Updated: January 2026 | {siteConfig.name}
        </div>
      </main>
      <Footer showOfficeListings={false} />
    </>
  );
}
