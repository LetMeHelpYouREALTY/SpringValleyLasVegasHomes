import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { MapPin, Phone, Home, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import { metaDescriptionWithKeyword, seoPrimaryKeyword } from "@/lib/seo";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { absoluteMediaUrl, springValleyMarketingOgSrc } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import {
  siblingCommunityLinks,
  springValleySubdivisions,
} from "@/lib/spring-valley-ia";

const neighborhoodsDescription = metaDescriptionWithKeyword(
  "Explore Las Vegas and Henderson neighborhoods—Summerlin, Green Valley, Spring Valley Las Vegas homes, and more with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  true,
);

const neighborhoodsGuideOgUrl = absoluteMediaUrl(springValleyMarketingOgSrc);
const neighborhoodsOgTwitter = ogTwitterImageFields(neighborhoodsGuideOgUrl, {
  alt: "Las Vegas and Henderson neighborhoods — homes and community guide",
});

export const metadata: Metadata = {
  alternates: {
    canonical: "/neighborhoods",
  },
  title: "Las Vegas Neighborhoods Guide",
  description: neighborhoodsDescription,
  keywords: [
    "Las Vegas neighborhoods",
    "Spring Valley Las Vegas homes",
    "Henderson communities",
    "Summerlin real estate",
    "best neighborhoods Las Vegas",
    "where to live Las Vegas",
  ],
  openGraph: {
    title: "Las Vegas Neighborhoods Guide | Dr. Jan Duffy",
    description: neighborhoodsDescription,
    url: `${siteConfig.url}/neighborhoods`,
    type: "website",
    ...neighborhoodsOgTwitter.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Las Vegas Neighborhoods Guide | Dr. Jan Duffy",
    description: neighborhoodsDescription,
    ...neighborhoodsOgTwitter.twitter,
  },
};

const neighborhoodsWebPageLd = generateWebPageSchema({
  name: "Las Vegas & Henderson Neighborhoods",
  description: neighborhoodsDescription,
  url: "/neighborhoods",
  primaryImageOfPage: neighborhoodsGuideOgUrl,
});

const subdivisionNotes: Record<
  (typeof springValleySubdivisions)[number]["slug"],
  string
> = {
  tiburon: "Eight phases, Rhodes Homes, Tropicana & El Capitan",
  "granada-hills": "Guard-gated, inside Tiburon",
  "the-foothills": "Guard-gated, Fort Apache & Katie",
  "buffalo-ranch": "D.R. Horton, Buffalo & Peace Way, five phases",
  "desert-breeze": "Park-adjacent, Spring Mountain & Durango",
  tahoe: "Spring Valley subdivision",
  "spring-mountain-fort-apache": "Lewis Homes 1998–2000, no HOA",
};

export default function NeighborhoodsPage() {
  return (
    <>
      <SchemaScript
        schema={neighborhoodsWebPageLd}
        id="neighborhoods-guide-schema"
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Spring Valley Subdivisions
            </h1>
            <p className="text-xl text-slate-600">
              Spring Valley subdivision index for{" "}
              <Link
                href="/"
                className="text-blue-600 font-semibold hover:underline"
              >
                {seoPrimaryKeyword}
              </Link>
              —with Dr. Jan Duffy, your{" "}
              <strong>Berkshire Hathaway HomeServices</strong> neighborhood
              expert
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Prefer to browse by postal code? Use the{" "}
              <Link
                href="/las-vegas-zip-code-map"
                className="text-blue-600 font-semibold hover:underline"
              >
                Las Vegas zip code map
              </Link>{" "}
              or the{" "}
              <Link
                href="/zip"
                className="text-blue-600 font-semibold hover:underline"
              >
                Spring Valley ZIP index
              </Link>
              , then search MLS or contact the team.
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Want 3D context for schools, parks, and dining? Try{" "}
              <Link
                href="/neighborhood-discovery"
                className="text-blue-600 font-semibold hover:underline"
              >
                neighborhood discovery
              </Link>{" "}
              (Google Maps 3D Area Explorer)—then pair it with a showing when
              you are ready.
            </p>
          </div>

          {/* Neighborhood Grid */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Spring Valley subdivisions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {springValleySubdivisions.map((subdivision) => (
                <Link
                  key={subdivision.slug}
                  href={subdivision.href}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-blue-300 group"
                >
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {subdivision.name}
                  </h2>
                  <p className="text-slate-600 text-sm mt-2">
                    {subdivisionNotes[subdivision.slug]}
                  </p>
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">
              Nearby communities
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {siblingCommunityLinks.map((community) => (
                <a
                  key={community.href}
                  href={community.href}
                  target="_blank"
                  rel="noopener"
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-blue-300 group"
                >
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {community.name}
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">
                    Opens the dedicated community site
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* Expert Quote */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                "Every Las Vegas neighborhood has its own personality. Whether
                you want the family-friendly parks of Summerlin, the established
                charm of Green Valley, or the luxury of The Ridges, I'll help
                you find the community that matches your lifestyle. That's the
                Berkshire Hathaway HomeServices difference—personalized guidance
                backed by local expertise."
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, BHHS Nevada Properties
              </cite>
            </div>
          </section>

          {/* Neighborhood Services */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Neighborhood Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Area Tours</h3>
                <p className="text-slate-400 text-sm">
                  Personalized neighborhood tours to help you experience each
                  community firsthand
                </p>
              </div>
              <div className="text-center">
                <GraduationCap className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">School Research</h3>
                <p className="text-slate-400 text-sm">
                  Detailed school district information, ratings, and enrollment
                  guidance
                </p>
              </div>
              <div className="text-center">
                <Home className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Home Matching</h3>
                <p className="text-slate-400 text-sm">
                  Find homes that match your criteria in the neighborhoods you
                  love
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Choosing a Neighborhood?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Dr. Jan Duffy knows every Las Vegas community inside and out. Call
              for personalized neighborhood recommendations.
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

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">
          Last Updated: January 2026
        </div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
