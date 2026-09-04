import Link from "next/link";
import LuxurySectionPhoto from "@/components/sections/LuxurySectionPhoto";
import {
  springValley89147MapEmbedUrl,
  springValley89147MapViewerUrl,
  luxuryImages,
} from "@/lib/luxury-media";
import { seoPrimaryKeyword } from "@/lib/seo";

/**
 * 89147 / Spring Valley Google Map — lazy iframe + aerial photo.
 * Office GBP pin remains on /contact (NAP). This layer is the hyperlocal service area.
 */
export default function ServiceAreaMapSection() {
  return (
    <section
      className="border-y border-[#c9a227]/20 bg-[#12100c] py-14 md:py-20"
      aria-labelledby="service-area-map-heading"
    >
      <div className="container mx-auto px-4">
        <LuxurySectionPhoto
          src={luxuryImages.zipAerial}
          alt="Aerial dusk view of Spring Valley Las Vegas ZIP 89147"
          eyebrow="ZIP 89147 · Spring Valley"
        />
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <h2
            id="service-area-map-heading"
            className="mb-3 text-2xl font-bold text-[#f6edd8] md:text-3xl lg:text-4xl"
          >
            Spring Valley ZIP 89147 on the map
          </h2>
          <p className="text-base leading-relaxed text-[#cbbd96] md:text-lg">
            Explore the 89147 grid—generally west of Decatur, with Desert Breeze
            Park and the 215 on the west edge—then{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#e8d48a] hover:underline"
            >
              get in touch
            </Link>
            . For schools, pockets, and west-side context, read the{" "}
            <Link
              href="/"
              className="font-semibold text-[#e8d48a] hover:underline"
            >
              {seoPrimaryKeyword} guide
            </Link>
            .
          </p>
        </div>

        <div className="relative mx-auto aspect-[4/3] max-h-[min(70vh,560px)] max-w-5xl overflow-hidden rounded-2xl border border-[#c9a227]/35 bg-black shadow-[0_0_40px_rgba(201,162,39,0.08)]">
          <iframe
            src={springValley89147MapEmbedUrl}
            title="Google Map of Spring Valley Las Vegas ZIP code 89147"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="mt-4 text-center">
          <a
            href={springValley89147MapViewerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#e8d48a] hover:underline"
          >
            Open ZIP 89147 in Google Maps
          </a>
        </p>
      </div>
    </section>
  );
}
