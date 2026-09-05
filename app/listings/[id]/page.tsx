import Navbar from "@/components/layouts/Navbar";
import PageAgentMark from "@/components/shared/PageAgentMark";
import Footer from "@/components/layouts/Footer";
import AgentHeadshot from "@/components/shared/AgentHeadshot";
import SchemaScript from "@/components/SchemaScript";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { absoluteMediaUrl, listingPlaceholderSrc } from "@/lib/site-media";
import { siteConfig } from "@/lib/site-config";
import { realScoutConfig } from "@/lib/integrations";
import {
  generateRealEstateListingSchema,
  generateWebPageSchema,
  combineSchemas,
} from "@/lib/schema";
import { ogTwitterImageFields } from "@/lib/og-image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  const canonical = `${siteConfig.url}/listings/${encodeURIComponent(id)}`;
  const imageAbs = absoluteMediaUrl(property.image);
  const og = ogTwitterImageFields(imageAbs, {
    alt: `${property.name} — ${property.location}`,
  });
  const desc =
    property.description.length > 155
      ? `${property.description.slice(0, 152).trim()}…`
      : property.description;
  return {
    title: `${property.name} | Las Vegas Listing`,
    description: desc,
    alternates: {
      canonical,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${property.name} | Las Vegas Listing`,
      description: desc,
      url: canonical,
      type: "website",
      ...og.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.name} | Las Vegas Listing`,
      description: desc,
      ...og.twitter,
    },
  };
}

type PropertyData = {
  id: string;
  name: string;
  location: string;
  price: number;
  priceDisplay: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};

// This would typically fetch from RealScout API
async function getProperty(id: string): Promise<PropertyData> {
  // Placeholder - replace with RealScout API call
  return {
    id,
    name: "Modern Luxury Home",
    location: "Summerlin, Las Vegas, NV",
    price: 850_000,
    priceDisplay: "$850,000",
    image: listingPlaceholderSrc,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    yearBuilt: 2018,
    description:
      "Stunning modern home in desirable Summerlin community. Features open floor plan, updated kitchen, and beautiful backyard. Close to schools, shopping, and entertainment.",
    address: {
      street: "123 Example Estates Lane",
      city: "Las Vegas",
      state: "NV",
      zip: "89144",
    },
  };
}

type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getProperty(id);
  const listingPath = `/listings/${encodeURIComponent(id)}`;
  const imageAbs = absoluteMediaUrl(property.image);
  const listingJsonLd = combineSchemas(
    generateWebPageSchema({
      name: property.name,
      description: property.description,
      url: listingPath,
      primaryImageOfPage: imageAbs,
    }),
    generateRealEstateListingSchema({
      name: property.name,
      description: property.description,
      price: property.price,
      address: property.address,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.squareFeet,
      images: [property.image],
      url: listingPath,
    }),
  );
  const mainPhotoAlt = `${property.name} — main exterior or interior photo in ${property.location}`;

  return (
    <>
      <SchemaScript schema={listingJsonLd} id="listing-property-schema" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <PageAgentMark />
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2 text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <a
                  href={`${realScoutConfig.portalUrl}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  Properties
                </a>
              </li>
              <li>/</li>
              <li className="text-slate-900">{property.name}</li>
            </ol>
          </nav>

          {/* Property Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {property.name}
            </h1>
            <div className="flex items-center text-slate-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              {property.location}
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {property.priceDisplay}
            </div>
          </div>

          {/* Main Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={property.image}
              alt={mainPhotoAlt}
              fill
              className="object-cover"
              priority
              unoptimized={isCfDeliveryUrl(property.image)}
            />
          </div>

          {/* Property Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Property Details
              </h2>
              <p className="text-slate-700 mb-6">{property.description}</p>

              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Features
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">
                      {property.bedrooms} Bedrooms
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">
                      {property.bathrooms} Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">
                      {property.squareFeet.toLocaleString()} sq ft
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">
                      Built {property.yearBuilt}
                    </span>
                  </div>
                </div>
              </div>

              {/* RealScout Widget Integration Point */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Schedule a Showing
                </h3>
                <p className="text-slate-700 mb-4">
                  Contact us to schedule a private viewing of this property.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href="/contact">Contact Agent</a>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white border border-slate-200 rounded-lg p-6 sticky top-24">
                <div className="mb-4 flex justify-center">
                  <AgentHeadshot
                    frameClassName="max-w-[140px] w-full aspect-square"
                    sizes="140px"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Contact Agent
                </h3>
                <p className="text-slate-600 mb-4">Dr. Jan Duffy</p>
                <p className="text-sm text-slate-600 mb-6">
                  Berkshire Hathaway HomeServices Nevada Properties
                </p>
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <a href="tel:+17026648424">Call (702) 664-8424</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/contact">Send Message</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
