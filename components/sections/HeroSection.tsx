import HeroLcpBackdrop from "@/components/sections/HeroLcpBackdrop";
import HeroBackgroundCarousel from "@/components/sections/HeroBackgroundCarousel";
import HeroSectionInteractive from "@/components/sections/HeroSectionInteractive";
import { LISTING_HERO_ACTIVE } from "@/lib/site-media";

type HeroSectionProps = {
  headlinePrimary?: string;
  headlineSecondary?: string;
  intro?: string;
};

/**
 * Full-viewport hero: LCP image is server-rendered (`HeroLcpBackdrop`); carousel + MLS search are client.
 */
export default function HeroSection(props: HeroSectionProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <HeroLcpBackdrop />
      <HeroBackgroundCarousel />
      <HeroSectionInteractive {...props} />
      {LISTING_HERO_ACTIVE ? (
        <p className="absolute bottom-3 left-4 z-20 text-[0.7rem] text-white/70 md:left-6">
          Pictured: 9528 Rainfall Ave, listed by Dr. Jan Duffy. Twilight sky digitally edited.
        </p>
      ) : null}
    </div>
  );
}
