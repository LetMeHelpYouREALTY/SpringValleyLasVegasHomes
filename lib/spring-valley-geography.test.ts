import { describe, expect, it } from "vitest";
import {
  SPRING_VALLEY_EXCLUDED_ZIP_CODES,
  SPRING_VALLEY_SUBDIVISIONS,
  SPRING_VALLEY_ZIP_CODES,
  SPRING_VALLEY_ZIPS,
  isSpringValleyZip,
  springValleyZipStaticParams,
} from "./spring-valley-geography";

describe("Spring Valley ZIP generateStaticParams set", () => {
  it("returns exactly the seven in-boundary ZIPs", () => {
    expect([...SPRING_VALLEY_ZIP_CODES]).toEqual([
      "89103",
      "89113",
      "89117",
      "89118",
      "89146",
      "89147",
      "89148",
    ]);
    expect(SPRING_VALLEY_ZIP_CODES).toHaveLength(7);
    expect(SPRING_VALLEY_ZIPS.map((entry) => entry.zip)).toEqual([
      ...SPRING_VALLEY_ZIP_CODES,
    ]);
  });

  it("does not include ZIPs outside the CDP boundary", () => {
    for (const zip of SPRING_VALLEY_EXCLUDED_ZIP_CODES) {
      expect(SPRING_VALLEY_ZIP_CODES).not.toContain(zip);
      expect(isSpringValleyZip(zip)).toBe(false);
    }
    expect([...SPRING_VALLEY_EXCLUDED_ZIP_CODES]).toEqual([
      "89102",
      "89139",
      "89161",
      "89178",
    ]);
  });

  it("maps generateStaticParams to those seven zipcodes only", () => {
    const params = springValleyZipStaticParams();
    expect(params).toEqual(
      SPRING_VALLEY_ZIP_CODES.map((zipcode) => ({ zipcode })),
    );
  });
});

describe("Spring Valley subdivision routes", () => {
  it("is exactly eleven in-boundary slugs and does not include Tahoe", () => {
    const slugs = SPRING_VALLEY_SUBDIVISIONS.map((entry) => entry.slug);
    expect(slugs).toEqual([
      "spanish-trail",
      "tiburon",
      "granada-hills",
      "the-foothills",
      "buffalo-ranch",
      "canyon-gate",
      "desert-breeze",
      "rancho-viejo",
      "section-10",
      "spring-mountain-fort-apache",
      "chinatown-spring-mountain",
    ]);
    expect(slugs).toHaveLength(11);
    expect(slugs).not.toContain("tahoe");
  });
});
