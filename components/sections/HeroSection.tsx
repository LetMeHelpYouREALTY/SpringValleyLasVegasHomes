import HeroLcpBackdrop from "@/components/sections/HeroLcpBackdrop";
import HeroBackgroundCarousel from "@/components/sections/HeroBackgroundCarousel";
import HeroSectionInteractive from "@/components/sections/HeroSectionInteractive";

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
    </div>
  );
}
