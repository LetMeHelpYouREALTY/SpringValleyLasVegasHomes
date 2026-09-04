import type { ReactNode } from "react";
import { SPRING_VALLEY_GOOGLE_MAPS } from "@/lib/spring-valley-geography";

type SpringValleyCdpMapProps = {
  heading?: string;
  description?: string;
  footer?: ReactNode;
  showHeading?: boolean;
};

export default function SpringValleyCdpMap({
  heading = "Spring Valley, NV map",
  description = "Google’s Spring Valley census-designated place—Sahara Avenue north, Decatur Boulevard east, Warm Springs Road south, Hualapai Way west.",
  footer,
  showHeading = true,
}: SpringValleyCdpMapProps) {
  return (
    <section
      className={showHeading ? "max-w-4xl mx-auto mb-14" : "mx-auto max-w-5xl"}
      aria-labelledby={
        showHeading ? "spring-valley-cdp-map-heading" : undefined
      }
      aria-label={showHeading ? undefined : heading}
    >
      {showHeading ? (
        <>
          <h2
            id="spring-valley-cdp-map-heading"
            className="text-2xl font-bold text-slate-900 mb-3 text-center"
          >
            {heading}
          </h2>
          <p className="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
            {description}
          </p>
        </>
      ) : null}
      <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
        <iframe
          src={SPRING_VALLEY_GOOGLE_MAPS.embedUrl}
          title="Spring Valley, NV — Google Maps"
          width={600}
          height={450}
          style={{ border: 0 }}
          className="w-full aspect-[4/3] max-h-[min(480px,70vh)]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="text-center text-sm text-slate-500 mt-4">
        <a
          href={SPRING_VALLEY_GOOGLE_MAPS.placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          Open Spring Valley, NV in Google Maps
        </a>
        {footer}
      </p>
    </section>
  );
}
