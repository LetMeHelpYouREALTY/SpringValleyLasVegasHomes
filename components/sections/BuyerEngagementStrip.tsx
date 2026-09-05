import Link from "next/link";
import { MapPin, Search, Home, BookOpen, Newspaper } from "lucide-react";
import SectionPortrait from "@/components/shared/SectionPortrait";

export type BuyerEngagementStripProps = {
  /** First tile: in-page anchor for listings (home uses `#featured-properties`). */
  browseListingsHref?: string;
};

/**
 * Compact buyer-first links immediately below the hero — search, neighborhoods, zip map, buyer guide, KCM articles.
 */
export default function BuyerEngagementStrip({
  browseListingsHref = "#featured-properties",
}: BuyerEngagementStripProps) {
  const items = [
    {
      href: browseListingsHref,
      label: "Browse listings",
      sub: "Jump to homes for sale",
      icon: Search,
    },
    {
      href: "/neighborhoods/spring-valley",
      label: "Spring Valley",
      sub: "Homes & local guide",
      icon: Home,
    },
    {
      href: "/las-vegas-zip-code-map",
      label: "Search by zip",
      sub: "Map & directory",
      icon: MapPin,
    },
    {
      href: "/buyers",
      label: "Buyer resources",
      sub: "Financing & process",
      icon: BookOpen,
    },
    {
      href: "/market-insights/kcm-blog",
      label: "Market articles",
      sub: "KCM weekly feed",
      icon: Newspaper,
    },
  ] as const;

  return (
    <section
      className="border-b border-black/10 bg-cream"
      aria-label="Quick links for home buyers"
    >
      <div className="container mx-auto px-4 py-8 md:py-10">
        <SectionPortrait sizeClassName="h-14 w-14 sm:h-16 sm:w-16" />
        <p className="text-center text-[11px] font-light uppercase tracking-luxury text-mist mb-6">
          Start your home search
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
          {items.map(({ href, label, sub, icon: Icon }) => (
            <Link
              key={`${href}-${label}`}
              href={href}
              className="group flex flex-col items-center text-center border border-black/10 bg-white p-4 transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span className="mb-2 p-2.5 text-ink">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-ink text-xs md:text-sm uppercase tracking-wider font-normal">
                {label}
              </span>
              <span className="mt-0.5 text-xs text-mist font-light normal-case tracking-normal">
                {sub}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
