"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { luxuryBannerForPath } from "@/lib/luxury-media";

/**
 * Route-specific luxury photo under the fixed nav on every page except home
 * (home already has a full-viewport hero).
 */
export default function LuxuryPageBanner() {
  const pathname = usePathname() || "/";
  if (pathname === "/") return null;

  const { src, alt } = luxuryBannerForPath(pathname);

  return (
    <div className="luxury-page-banner relative isolate w-full overflow-hidden border-b border-[#c9a227]/35 bg-black pt-24">
      <div className="relative h-44 w-full md:h-64 lg:h-72">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent" />
      </div>
    </div>
  );
}
