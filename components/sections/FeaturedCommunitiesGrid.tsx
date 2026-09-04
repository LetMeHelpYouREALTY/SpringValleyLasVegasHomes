import Link from "next/link";
import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { featuredCommunityImageSrcs } from "@/lib/site-media";

const [imgSpring, imgSummerlin, imgHenderson] = featuredCommunityImageSrcs;

const communities = [
  {
    name: "Spring Valley",
    href: "/neighborhoods/spring-valley",
    image: imgSpring,
    alt: "Spring Valley Las Vegas homes and west valley neighborhoods",
  },
  {
    name: "Summerlin",
    href: "/neighborhoods/summerlin",
    image: imgSummerlin,
    alt: "Summerlin Las Vegas homes and master-planned communities",
  },
  {
    name: "Henderson",
    href: "/neighborhoods/henderson",
    image: imgHenderson,
    alt: "Henderson Nevada homes and neighborhoods",
  },
] as const;

export default function FeaturedCommunitiesGrid() {
  return (
    <section
      className="bg-cream py-16 md:py-24"
      aria-labelledby="communities-heading"
    >
      <div className="container mx-auto px-4 mb-10 md:mb-14 text-center">
        <h2 id="communities-heading" className="text-3xl md:text-4xl text-ink">
          Featured Communities
        </h2>
      </div>
      <div className="grid md:grid-cols-3">
        {communities.map((community) => (
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
          View All Neighborhoods
        </Link>
      </div>
    </section>
  );
}
