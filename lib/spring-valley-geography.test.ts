import { describe, expect, it } from "vitest";
import {
  SPRING_VALLEY_EXCLUDED_ZIP_CODES,
  SPRING_VALLEY_GOOGLE_MAPS,
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

describe("Spring Valley Google Maps place", () => {
  it("keeps the official Share → Embed iframe src", () => {
    expect(SPRING_VALLEY_GOOGLE_MAPS.shortUrl).toBe(
      "https://maps.app.goo.gl/rVTHoyMiusBuR46y5",
    );
    expect(SPRING_VALLEY_GOOGLE_MAPS.latitude).toBe(36.1080258);
    expect(SPRING_VALLEY_GOOGLE_MAPS.longitude).toBe(-115.2450006);
    expect(SPRING_VALLEY_GOOGLE_MAPS.placeId).toBe(
      "0x80c8c7226ec7e811:0x872f0a37e2293533",
    );
    expect(SPRING_VALLEY_GOOGLE_MAPS.embedUrl).toBe(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84732.72101378185!2d-115.27082265351692!3d36.096275715059704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c7226ec7e811%3A0x872f0a37e2293533!2sSpring%20Valley%2C%20NV!5e1!3m2!1sen!2sus!4v1788529828937!5m2!1sen!2sus",
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
