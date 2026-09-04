import Link from "next/link";
import { googleMyMapEmbedUrl, googleMyMapViewerUrl } from "@/lib/site-config";
import { seoPrimaryKeyword } from "@/lib/seo";

/**
 * Embedded Google My Maps layer — service area / buyer context. URLs from site-config.
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
            Explore Spring Valley, the west valley, and the wider Las Vegas
            area—then use search above or{" "}
            <Link
              href="/contact"
              className="text-blue-600 font-semibold hover:underline"
            >
              get in touch
            </Link>
            . For schools, pockets, and west-side context, read the{" "}
            <Link
              href="/"
              className="text-blue-600 font-semibold hover:underline"
            >
              {seoPrimaryKeyword} guide
            </Link>
            .
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg aspect-[4/3] max-h-[min(70vh,560px)]">
          <iframe
            src={googleMyMapEmbedUrl}
            title="Las Vegas area map — Dr. Jan Duffy service area and locations"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="mt-4 text-center">
          <a
            href={googleMyMapViewerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Open full map in Google Maps
          </a>
        </p>
      </div>
    </section>
  );
}
