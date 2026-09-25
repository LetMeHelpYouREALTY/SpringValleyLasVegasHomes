import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { MapPin, Phone, Home, Users, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import { metaDescriptionWithKeyword, seoPrimaryKeyword } from "@/lib/seo";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { absoluteMediaUrl, heroBackgroundAlts, heroBackgroundSrcs } from "@/lib/site-media";
import { ogTwitterImageFields } from "@/lib/og-image";
import Image from "next/image";
import NeighborhoodHeroPhoto from "@/components/neighborhoods/NeighborhoodHeroPhoto";
import type { NeighborhoodSlug } from "@/lib/neighborhood-media";

const neighborhoodsDescription = metaDescriptionWithKeyword(
  "Explore Las Vegas and Henderson neighborhoods—Summerlin, Green Valley, Spring Valley Las Vegas homes, and more with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  true,
);

const neighborhoodsGuideOgUrl = absoluteMediaUrl(heroBackgroundSrcs[1]);
const neighborhoodsOgTwitter = ogTwitterImageFields(neighborhoodsGuideOgUrl, {
  alt: heroBackgroundAlts[1],
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
    "Las Vegas neighborhood guide",
    "Henderson neighborhood guide",
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

const neighborhoods = [
  {
    name: "Spring Valley",
    slug: "spring-valley",
    medianPrice: "Varies",
    priceChange: "+4.2%",
    description:
      "Large west valley area—popular for Spring Valley Las Vegas homes with diverse housing and mature neighborhoods",
    highlights: ["West Valley", "Diverse Housing", "Central Access", "Established Areas"],
    bestFor: "Spring Valley Las Vegas homes buyers, move-up buyers, commuters",
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    medianPrice: "Varies",
    priceChange: "+4.2%",
    description:
      "Southwest valley—Rhodes Ranch, guard-gated golf, and communities buyers compare with Spring Valley",
    highlights: ["Rhodes Ranch", "215 Beltway", "Southwest Valley", "Golf Communities"],
    bestFor: "Southwest buyers, golf communities, relocators",
  },
  {
    name: "Paradise",
    slug: "paradise",
    medianPrice: "Varies",
    priceChange: "+4.2%",
    description: "Strip corridor & UNLV area—central access to airport and hospitality employment",
    highlights: ["Strip Corridor", "Airport Access", "UNLV", "Central Valley"],
    bestFor: "Hospitality workers, frequent flyers, UNLV-area buyers",
  },
  {
    name: "Summerlin",
    slug: "summerlin",
    medianPrice: "$625,000",
    priceChange: "+6.8%",
    description: "Master-planned west-valley community with parks, trails, and Red Rock Canyon views",
    highlights: ["150+ Parks", "Trail Network", "Red Rock Views", "Downtown Summerlin"],
    bestFor: "Park-and-trail buyers, professionals, relocators",
  },
  {
    name: "Henderson",
    slug: "henderson",
    medianPrice: "$485,000",
    priceChange: "+5.1%",
    description: "Nevada's second-largest city—Green Valley, Inspirada, and Lake Las Vegas homes",
    highlights: ["Lake Las Vegas", "Green Valley", "Inspirada", "Mountain Views"],
    bestFor: "Henderson buyers, commuters, relocators",
  },
  {
    name: "Green Valley",
    slug: "green-valley",
    medianPrice: "$520,000",
    priceChange: "+4.8%",
    description: "Established Henderson community with mature landscaping and excellent amenities",
    highlights: ["Golf Courses", "Walking Trails", "The District", "Mature Trees"],
    bestFor: "Golfers, professionals, established-home buyers",
  },
  {
    name: "The Ridges",
    slug: "the-ridges",
    medianPrice: "$2,500,000",
    priceChange: "+8.5%",
    description: "Ultra-luxury guard-gated community with custom estates and celebrity residents",
    highlights: ["Guard-Gated", "Custom Estates", "Bear's Best Golf", "Strip Views"],
    bestFor: "Luxury buyers, celebrities, executives",
  },
  {
    name: "Southern Highlands",
    slug: "southern-highlands",
    medianPrice: "$750,000",
    priceChange: "+7.2%",
    description: "Master-planned luxury community with championship golf and mountain views",
    highlights: ["Golf Community", "Guard-Gated", "Mountain Views", "Luxury Amenities"],
    bestFor: "Golfers, luxury buyers, south-valley relocators",
  },
  {
    name: "North Las Vegas",
    slug: "north-las-vegas",
    medianPrice: "$385,000",
    priceChange: "+3.2%",
    description: "Growing north-valley city with newer construction and a shorter drive to Nellis AFB",
    highlights: ["New Construction", "Entry Price Points", "Growing Area", "Nellis Corridor"],
    bestFor: "First-time buyers, investors, north-valley commuters",
  },
  {
    name: "Skye Canyon",
    slug: "skye-canyon",
    medianPrice: "$550,000",
    priceChange: "+5.5%",
    description: "Newer master-planned community in northwest Las Vegas with mountain views",
    highlights: ["New Homes", "Mountain Views", "Skye Center", "Northwest 215"],
    bestFor: "Outdoor buyers, northwest commuters, new-construction shoppers",
  },
  {
    name: "Centennial Hills",
    slug: "centennial-hills",
    medianPrice: "$495,000",
    priceChange: "+4.8%",
    description: "Northwest Las Vegas community with mountain proximity and shopping along the 95",
    highlights: ["Mountain Access", "Parks", "Shopping", "US-95 Corridor"],
    bestFor: "Outdoor buyers, northwest commuters, professionals",
  },
  {
    name: "Inspirada",
    slug: "inspirada",
    medianPrice: "$525,000",
    priceChange: "+5.0%",
    description: "Henderson master-planned community with resort-style living and modern homes",
    highlights: ["Resort Pools", "Walking Trails", "New Construction", "Henderson 215"],
    bestFor: "Active adults, new-home buyers, Henderson relocators",
  },
  {
    name: "Mountains Edge",
    slug: "mountains-edge",
    medianPrice: "$475,000",
    priceChange: "+4.5%",
    description: "Southwest Las Vegas master-planned community with mountain views and parks",
    highlights: ["Mountain Views", "Parks", "Growing Area", "Affordable Luxury"],
    bestFor: "Southwest commuters, mountain-view buyers, value-seekers",
  },
];

export default function NeighborhoodsPage() {
  return (
    <>
      <SchemaScript schema={neighborhoodsWebPageLd} id="neighborhoods-guide-schema" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Las Vegas & Henderson Neighborhoods
            </h1>
            <figure className="relative mx-auto my-8 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={heroBackgroundSrcs[1]}
                alt={heroBackgroundAlts[1]}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </figure>
            <p className="text-xl text-slate-600">
              Explore Las Vegas and Henderson communities—including the{" "}
              <Link href="/neighborhoods/spring-valley" className="text-blue-600 font-semibold hover:underline">
                {seoPrimaryKeyword}
              </Link>{" "}
              guide, Summerlin, Henderson, and more—with Dr. Jan Duffy, your{" "}
              <strong>Berkshire Hathaway HomeServices</strong> neighborhood expert
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Prefer to browse by postal code? Use the{" "}
              <Link href="/las-vegas-zip-code-map" className="text-blue-600 font-semibold hover:underline">
                Las Vegas zip code map
              </Link>{" "}
              to explore the valley, then search MLS or contact the team.
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Want 3D context for schools, parks, and dining? Try{" "}
              <Link href="/neighborhood-discovery" className="text-blue-600 font-semibold hover:underline">
                neighborhood discovery
              </Link>{" "}
              (Google Maps 3D Area Explorer)—then pair it with a showing when you are ready.
            </p>
          </div>

          {/* Neighborhood Grid */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-blue-300 group"
                >
                  <NeighborhoodHeroPhoto
                    slug={neighborhood.slug as NeighborhoodSlug}
                    variant="card"
                    className="mb-4"
                  />
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {neighborhood.name}
                      </h2>
                      <p className="text-sm text-slate-500">{neighborhood.bestFor}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{neighborhood.medianPrice}</div>
                      <div className="text-sm text-green-600">{neighborhood.priceChange} YoY</div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{neighborhood.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Expert Quote */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                "Every Las Vegas neighborhood has its own street pattern, commute, and housing
                stock. Whether you want Summerlin trail miles, Green Valley's established streets,
                or The Ridges custom estates, I'll help you compare square footage, HOA rules, and
                drive times. That's the Berkshire Hathaway HomeServices difference—local guidance
                with a global brand."
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, BHHS Nevada Properties
              </cite>
            </div>
          </section>

          {/* Neighborhood Services */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Neighborhood Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Area Tours</h3>
                <p className="text-slate-400 text-sm">
                  Personalized neighborhood tours to help you experience each community firsthand
                </p>
              </div>
              <div className="text-center">
                <GraduationCap className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">School Research</h3>
                <p className="text-slate-400 text-sm">
                  Detailed school district information, ratings, and enrollment guidance
                </p>
              </div>
              <div className="text-center">
                <Home className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Home Matching</h3>
                <p className="text-slate-400 text-sm">
                  Find homes that match your criteria in the neighborhoods you love
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
              Dr. Jan Duffy knows every Las Vegas community inside and out. Call for personalized
              neighborhood recommendations.
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
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
