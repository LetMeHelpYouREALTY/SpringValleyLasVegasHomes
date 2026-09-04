import { realScoutConfig } from "@/lib/integrations";

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/**
 * RealScout `<realscout-office-listings>` body markup.
 *
 * Attribute names match RealScout’s customizable widgets (support.realscout.com,
 * “Using the Customizable Widgets”, 2026): listing-status “For Sale”; property-types
 * SFR / MF / TC (single-family, multi-family, townhomes and condos).
 *
 * Do not prefix `property-types` with a leading comma — an empty first type returns
 * zero listings. Do not pin a tight price-min/price-max on Featured Properties;
 * a $500k–$800k band was emptying the homepage widget.
 */
export function getRealScoutOfficeListingsMarkup(): string {
  const id = escapeAttr(realScoutConfig.agentEncodedId);
  return `<realscout-office-listings agent-encoded-id="${id}" sort-order="NEWEST" listing-status="For Sale" property-types="SFR,MF,TC"></realscout-office-listings>`;
}
