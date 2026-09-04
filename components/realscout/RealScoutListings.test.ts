import { describe, it, expect } from "vitest";
import { getRealScoutOfficeListingsMarkup } from "@/lib/realscout-markup";
import { realScoutConfig } from "@/lib/integrations";

describe("getRealScoutOfficeListingsMarkup", () => {
  it("matches the RealScout dashboard office-listings embed (without a leading property-types comma)", () => {
    const html = getRealScoutOfficeListingsMarkup();
    const { agentEncodedId, officeListings } = realScoutConfig;
    expect(html).toMatch(/^<realscout-office-listings\s/);
    expect(html).toContain(`agent-encoded-id="${agentEncodedId}"`);
    expect(html).toContain(`sort-order="${officeListings.sortOrder}"`);
    expect(html).toContain(`listing-status="${officeListings.listingStatus}"`);
    expect(html).toContain(`property-types="${officeListings.propertyTypes}"`);
    expect(html).toContain(`price-min="${officeListings.priceMin}"`);
    expect(html).toContain(`price-max="${officeListings.priceMax}"`);
    expect(html).not.toContain('property-types=",');
    expect(html).toMatch(/<\/realscout-office-listings>$/);
    expect(html.match(/<realscout-office-listings/g)?.length).toBe(1);
  });
});
