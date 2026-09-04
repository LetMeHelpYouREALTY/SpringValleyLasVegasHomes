import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import StatsBand from "@/components/sections/StatsBand";
import FeaturedActionCards from "@/components/sections/FeaturedActionCards";
import MeetAgentSection from "@/components/sections/MeetAgentSection";
import FeaturedCommunitiesGrid from "@/components/sections/FeaturedCommunitiesGrid";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TeamPreview from "@/components/sections/TeamPreview";
import WorkWithMeCta from "@/components/sections/WorkWithMeCta";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layouts/Footer";
import type { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";
import SiteBylineDate from "@/components/shared/SiteBylineDate";
import { siteConfig, siteContentDates } from "@/lib/site-config";
import { homePageFaqs } from "@/lib/home-faqs";
import { combineHomepageStructuredData } from "@/lib/schema";
import { absoluteMediaUrl, heroBackgroundSrcs } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import { homePageTitleAbsolute } from "@/lib/seo";

const homePreferredImageUrl = absoluteMediaUrl(heroBackgroundSrcs[0]);
const homeOgTwitter = ogTwitterImageFields(homePreferredImageUrl, {
  alt: "Contemporary Spring Valley Las Vegas home with a pool and mountain views",
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

        <div
          className="border-b border-black/10 bg-white py-2.5"
          aria-label="Page last updated"
        >
          <div className="container mx-auto px-4">
            <SiteBylineDate />
          </div>
        </div>

        <RealScoutListings />
        <StatsBand />
        <FeaturedActionCards />
        <MeetAgentSection />
        <FeaturedCommunitiesGrid />
        <ReviewsSection
          title="Testimonials"
          subtitle="Clients who bought and sold Spring Valley homes with Dr. Jan Duffy"
        />
        <TeamPreview />
        <WorkWithMeCta />
        <FAQSection
          faqs={homePageFaqs}
          title="Spring Valley Las Vegas Homes — FAQs"
          subtitle="Straight answers about Spring Valley real estate, homes for sale, and working with Dr. Jan Duffy's team"
        />
      </main>
      <Footer />
    </>
  );
}
