"use client";

import { Button } from "@/components/ui/button";
import { realScoutConfig } from "@/lib/integrations";
import LuxurySectionPhoto from "@/components/sections/LuxurySectionPhoto";
import { luxuryImages } from "@/lib/luxury-media";

export default function RealScoutListings() {
  return (
    <section
      id="featured-properties"
      className="py-16 md:py-24 bg-slate-50 scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <LuxurySectionPhoto
          src={luxuryImages.listingPlaceholder}
          alt="Twilight Spring Valley home with pool — live MLS listings below"
          eyebrow="Live MLS"
        />
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Homes for sale — Las Vegas & Henderson
            </h2>
            <p className="text-slate-600 text-lg">
              Explore live MLS listings with photos, prices, and map—tap a
              property to dive deeper or adjust filters to match how you want to
              live.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <a
              href={`${realScoutConfig.portalUrl}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open full MLS search
            </a>
          </Button>
        </div>

        {/* RealScout Widget - using dangerouslySetInnerHTML per rules */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<realscout-office-listings 
              agent-encoded-id="${realScoutConfig.agentEncodedId}" 
              sort-order="NEWEST" 
              listing-status="For Sale" 
              property-types=",SFR,MF,TC" 
              price-min="500000" 
              price-max="800000"
            ></realscout-office-listings>`,
          }}
        />
      </div>
    </section>
  );
}
