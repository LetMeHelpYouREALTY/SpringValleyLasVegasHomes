import { realScoutConfig } from "@/lib/integrations";

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/**
 * RealScout `<realscout-office-listings>` body markup from the agent dashboard
 * (agent-encoded-id QWdlbnQtMjI1MDUw, PRICE_LOW, For Sale, SFR, $600k–$900k).
 *
 * The script tag belongs in root layout only (`type="module"`). Do not emit a
 * second copy here. Strip a leading comma on `property-types` — RealScout’s
 * generator outputs `,SFR`, and `property_types=,SFR` returns an empty list.
 */
export function getRealScoutOfficeListingsMarkup(): string {
  const { agentEncodedId, officeListings } = realScoutConfig;
  const id = escapeAttr(agentEncodedId);
  const types = escapeAttr(officeListings.propertyTypes);
  const sort = escapeAttr(officeListings.sortOrder);
  const status = escapeAttr(officeListings.listingStatus);
  const min = escapeAttr(officeListings.priceMin);
  const max = escapeAttr(officeListings.priceMax);
  return `<realscout-office-listings agent-encoded-id="${id}" sort-order="${sort}" listing-status="${status}" property-types="${types}" price-min="${min}" price-max="${max}"></realscout-office-listings>`;
}
