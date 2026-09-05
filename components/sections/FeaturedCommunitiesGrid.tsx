import Link from "next/link";
import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { featuredCommunityTiles } from "@/lib/site-media";
import SectionPortrait from "@/components/shared/SectionPortrait";

export default function FeaturedCommunitiesGrid() {
  return (
    <section
      className="bg-cream py-16 md:py-24"
      aria-labelledby="communities-heading"
    >
      <div className="container mx-auto px-4 mb-10 md:mb-14 text-center">
        <SectionPortrait />
        <h2 id="communities-heading" className="text-3xl md:text-4xl text-ink">
          Spring Valley Pockets
        </h2>
        <p className="mt-4 text-base font-light normal-case tracking-normal text-neutral-600 max-w-2xl mx-auto">
          Buyer and seller representation inside the Spring Valley CDP — Sahara
          Avenue, Decatur Boulevard, Warm Springs Road, and Hualapai Way.
        </p>
      </div>
      <div className="grid md:grid-cols-3">
        {featuredCommunityTiles.map((community) => (
          <Link
            key={community.href}
            href={community.href}
            className="group relative block overflow-hidden min-h-[320px] md:min-h-[420px]"
          >
            <Image
              src={community.image}
              alt={community.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized={isCfDeliveryUrl(community.image)}
            />
            <span className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center z-10">
              <span className="text-white text-2xl md:text-3xl tracking-headline uppercase">
                {community.name}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="container mx-auto px-4 text-center pt-10">
        <Link href="/neighborhoods" className="btn-luxury">
          All Spring Valley Neighborhoods
        </Link>
      </div>
    </section>
  );
}
