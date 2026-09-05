import Link from "next/link";
import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import {
  featuredPropertyImageAlts,
  featuredPropertyImageSrcs,
} from "@/lib/site-media";
import { realScoutConfig } from "@/lib/integrations";
import SectionPortrait from "@/components/shared/SectionPortrait";

const [imgBuy, imgSearch, imgSell] = featuredPropertyImageSrcs;
const [altBuy, altSearch, altSell] = featuredPropertyImageAlts;

const cards = [
  {
    title: "Buy Spring Valley Homes",
    href: "/buyers",
    image: imgBuy,
    alt: altBuy,
  },
  {
    title: "Search the MLS",
    href: realScoutConfig.portalUrl,
    image: imgSearch,
    alt: altSearch,
    external: true,
  },
  {
    title: "Sell Your Spring Valley Home",
    href: "/sellers",
    image: imgSell,
    alt: altSell,
  },
] as const;

export default function FeaturedActionCards() {
  return (
    <section
      className="bg-white pb-16 md:pb-24"
      aria-label="Spring Valley realtor services"
    >
      <div className="container mx-auto px-4 mb-8 md:mb-10 text-center">
        <SectionPortrait />
        <h2 className="text-3xl md:text-4xl text-ink">
          Realtor Services in Spring Valley
        </h2>
        <p className="mt-4 text-base font-light normal-case tracking-normal text-neutral-600 max-w-2xl mx-auto">
          Live MLS search, buyer representation, and listing strategy for the
          unincorporated Spring Valley market — not a valley-wide portal.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {cards.map((card) => {
            const inner = (
              <>
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized={isCfDeliveryUrl(card.image)}
                />
                <span className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors" />
                <span className="relative z-10 text-white text-lg md:text-xl tracking-headline uppercase">
                  {card.title}
                </span>
              </>
            );

            const className =
              "group relative flex h-[280px] md:h-[350px] items-end p-6 overflow-hidden";

            if ("external" in card && card.external) {
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={card.title} href={card.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
