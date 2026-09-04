"use client";

import { realScoutConfig } from "@/lib/integrations";

export default function RealScoutListings() {
  return (
    <section
      id="featured-properties"
      className="py-16 md:py-24 bg-white scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl text-ink mb-4">
              Featured Properties
            </h2>
            <p className="text-neutral-600 text-base font-light max-w-xl normal-case tracking-normal">
              Explore live MLS listings with photos, prices, and map—tap a
              property to dive deeper or adjust filters to match how you want to
              live.
            </p>
          </div>
          <a
            href={`${realScoutConfig.portalUrl}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury"
          >
            Open full MLS search
          </a>
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
