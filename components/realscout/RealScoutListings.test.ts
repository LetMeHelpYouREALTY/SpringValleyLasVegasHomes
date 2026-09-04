import { describe, it, expect } from "vitest";
import { getRealScoutOfficeListingsMarkup } from "@/lib/realscout-markup";
import { realScoutConfig } from "@/lib/integrations";

describe("getRealScoutOfficeListingsMarkup", () => {
  it("emits one office-listings widget without empty property types or a tight price band", () => {
    const html = getRealScoutOfficeListingsMarkup();
    expect(html).toMatch(/^<realscout-office-listings\s/);
    expect(html).toContain(
      `agent-encoded-id="${realScoutConfig.agentEncodedId}"`,
    );
    expect(html).toContain('listing-status="For Sale"');
    expect(html).toContain('property-types="SFR,MF,TC"');
    expect(html).not.toContain('property-types=",');
    expect(html).not.toContain("price-min");
    expect(html).not.toContain("price-max");
    expect(html).toMatch(/<\/realscout-office-listings>$/);
    expect(html.match(/<realscout-office-listings/g)?.length).toBe(1);
  });
});
