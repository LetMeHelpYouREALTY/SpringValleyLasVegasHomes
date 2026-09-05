import Link from "next/link";
import SpringValleyCdpMap from "@/components/maps/SpringValleyCdpMap";
import { seoPrimaryKeyword } from "@/lib/seo";

/**
 * Official Google Maps embed for the Spring Valley CDP (Share → Embed a map).
 */
export default function ServiceAreaMapSection() {
  return (
    <section
      className="py-14 md:py-20 bg-white border-y border-slate-100"
      aria-labelledby="service-area-map-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
          <h2
            id="service-area-map-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3"
          >
            Where we help buyers & sellers
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Explore the Spring Valley census-designated place, then use search
            above or{" "}
            <Link
              href="/contact"
              className="text-blue-600 font-semibold hover:underline"
            >
              get in touch
            </Link>
            . For schools, pockets, and west-side context, read the{" "}
            <Link
              href="/neighborhoods/spring-valley"
              className="text-blue-600 font-semibold hover:underline"
            >
              {seoPrimaryKeyword} guide
            </Link>
            .
          </p>
        </div>

        <SpringValleyCdpMap showHeading={false} />
      </div>
    </section>
  );
}
