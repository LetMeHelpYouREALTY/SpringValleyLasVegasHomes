import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { heroBackgroundSrcs } from "@/lib/site-media";

/**
 * Server-rendered first hero frame so LCP can discover the image in initial HTML.
 * Sliding images 2–3 are client-only in `HeroBackgroundCarousel`.
 */
export default function HeroLcpBackdrop() {
  const src = heroBackgroundSrcs[0];
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={src}
        alt="Spring Valley Las Vegas homes and Las Vegas Valley real estate — hero"
        fill
        sizes="100vw"
        className="object-cover"
        priority
        fetchPriority="high"
        unoptimized={isCfDeliveryUrl(src)}
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />
    </div>
  );
}
