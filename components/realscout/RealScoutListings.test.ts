import { describe, it, expect } from "vitest";
import { getRealScoutOfficeListingsMarkup } from "@/lib/realscout-markup";
import {
  realScoutConfig,
  sanitizeRealScoutPropertyTypes,
  toRealScoutAgentEncodedId,
} from "@/lib/integrations";

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
    expect(html).toContain('agent-encoded-id="QWdlbnQtMjI1MDUw"');
  });
});

describe("toRealScoutAgentEncodedId", () => {
  it("encodes a raw numeric agent id used on production search", () => {
    expect(toRealScoutAgentEncodedId("225050")).toBe("QWdlbnQtMjI1MDUw");
  });

  it("leaves an already-encoded dashboard id unchanged", () => {
    expect(toRealScoutAgentEncodedId("QWdlbnQtMjI1MDUw")).toBe(
      "QWdlbnQtMjI1MDUw",
    );
  });
});

describe("sanitizeRealScoutPropertyTypes", () => {
  it("strips the leading comma RealScout’s generator inserts", () => {
    expect(sanitizeRealScoutPropertyTypes(",SFR")).toBe("SFR");
    expect(sanitizeRealScoutPropertyTypes(",SFR,MF,TC")).toBe("SFR,MF,TC");
  });
});
