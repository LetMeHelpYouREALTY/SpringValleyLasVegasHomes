import Link from "next/link";
import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { featuredPropertyImageSrcs } from "@/lib/site-media";
import { realScoutConfig } from "@/lib/integrations";

const [imgListings, imgSearch, imgContact] = featuredPropertyImageSrcs;

const cards = [
  {
    title: "Listings",
    href: "/listings",
    image: imgListings,
    alt: "Las Vegas homes for sale and current listings",
  },
  {
    title: "Home Search",
    href: realScoutConfig.portalUrl,
    image: imgSearch,
    alt: "Search Spring Valley Las Vegas homes on the MLS",
    external: true,
  },
  {
    title: "Contact Dr. Jan Duffy",
    href: "/contact",
    image: imgContact,
    alt: "Contact Dr. Jan Duffy, Berkshire Hathaway HomeServices",
  },
] as const;

export default function FeaturedActionCards() {
  return (
    <section
      className="bg-white pb-16 md:pb-24"
      aria-label="Quick destinations"
    >
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
