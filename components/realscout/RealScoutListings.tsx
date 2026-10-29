"use client";

import { realScoutConfig } from "@/lib/integrations";

/**
 * RealScout office listings band. Rendered site-wide from `Footer` (Dr. Jan's rule, 2026-10-29:
 * office listings on every page); pages that already place it higher pass
 * `showOfficeListings={false}` to Footer so it never appears twice.
 */
export default function RealScoutListings() {
  return (
    <section
      id="featured-properties"
      className="scroll-mt-20 border-t border-bronze-100 bg-ivory py-16 md:py-24"
      aria-labelledby="office-listings-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-eyebrow text-bronze-700">
              Office listings
            </p>
            <h2
              id="office-listings-heading"
              className="mb-4 text-3xl text-ink md:text-4xl lg:text-5xl"
            >
              Homes for sale — Las Vegas &amp; Henderson
            </h2>
            <p className="text-base text-slate-600 md:text-lg">
              Live MLS listings with photos, prices, and map. Tap a property for
              details, or open the full search to set your own filters.
            </p>
          </div>
          <a
            href={`${realScoutConfig.portalUrl}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center border border-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-ivory"
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
