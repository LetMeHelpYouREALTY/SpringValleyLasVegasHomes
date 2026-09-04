"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { agentInfo } from "@/lib/site-config";
import { heroSeo } from "@/lib/seo";
import RealScoutSimpleSearch from "@/components/realscout/RealScoutSimpleSearch";

type HeroSectionInteractiveProps = {
  headlinePrimary?: string;
  headlineSecondary?: string;
  intro?: string;
};

/** Full-viewport luxury hero — large uppercase name, like kim-bibb.com. */
export default function HeroSectionInteractive({
  headlinePrimary = "Dr. Jan Duffy",
  headlineSecondary = heroSeo.headlinePrimary,
  intro = heroSeo.intro,
}: HeroSectionInteractiveProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative z-20 h-full w-full">
      <div className="flex h-full flex-col items-center justify-center px-4 text-center pt-16">
        <p className="text-white/90 text-[11px] md:text-xs font-light uppercase tracking-[0.28em] mb-5">
          {agentInfo.license} · Berkshire Hathaway HomeServices
        </p>
        <h1 className="text-white mb-4 leading-none">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-normal tracking-[0.14em]">
            {headlinePrimary}
          </span>
          <span className="block mt-5 text-sm sm:text-base md:text-lg font-light tracking-[0.22em] text-white/95">
            Leading {headlineSecondary}
          </span>
        </h1>
        <p className="text-sm md:text-base text-white/85 mb-10 max-w-2xl font-light leading-relaxed normal-case tracking-normal">
          {intro}
        </p>

        <p className="mb-3 max-w-xl text-center text-xs font-light uppercase tracking-luxury text-white/90">
          Search live MLS homes by city, zip, or neighborhood
        </p>
        <RealScoutSimpleSearch className="mb-4 max-w-2xl py-0" />
      </div>

      <div
        className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform ${
          prefersReducedMotion ? "" : "animate-bounce"
        }`}
      >
        <div className="flex h-10 w-6 items-start justify-center border border-white/60 p-2">
          <div className="h-3 w-1 bg-white/60" />
        </div>
      </div>
    </div>
  );
}
