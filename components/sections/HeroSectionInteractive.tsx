"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { heroSeo } from "@/lib/seo";
import { greatVibes } from "@/lib/fonts";
import RealScoutSimpleSearch from "@/components/realscout/RealScoutSimpleSearch";

type HeroSectionInteractiveProps = {
  signature?: string;
  headlinePrimary?: string;
  headlineSecondary?: string;
  intro?: string;
};

/** Full-viewport luxury hero — cursive name over Spring Valley luxury H1. */
export default function HeroSectionInteractive({
  signature = heroSeo.signature,
  headlinePrimary = heroSeo.headlinePrimary,
  headlineSecondary = heroSeo.headlineSecondary,
  intro = heroSeo.intro,
}: HeroSectionInteractiveProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative z-20 h-full w-full">
      <div className="flex h-full flex-col items-center justify-center px-4 text-center pt-16">
        <p
          className={`${greatVibes.className} mb-5 text-5xl leading-none text-white md:text-6xl lg:text-7xl`}
        >
          {signature}
        </p>
        <h1 className="text-white mb-4 leading-none">
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.14em] uppercase">
            {headlinePrimary}
          </span>
          <span className="block mt-4 text-sm sm:text-base md:text-lg font-light tracking-[0.22em] text-white/95 uppercase">
            {headlineSecondary}
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
