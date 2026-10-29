"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { agentStats } from "@/lib/site-config";
import { heroSeo } from "@/lib/seo";
import RealScoutSimpleSearch from "@/components/realscout/RealScoutSimpleSearch";

type HeroSectionInteractiveProps = {
  headlinePrimary?: string;
  headlineSecondary?: string;
  intro?: string;
};

/** Above-the-fold hero copy, search, and scroll cue — client-only for hooks + RealScout. */
export default function HeroSectionInteractive({
  headlinePrimary = heroSeo.headlinePrimary,
  headlineSecondary = heroSeo.headlineSecondary,
  intro = heroSeo.intro,
}: HeroSectionInteractiveProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative z-20 h-full w-full">
      <div className="flex h-full flex-col items-center justify-center px-4 text-center">
        <p className="mb-5 text-xs font-medium uppercase tracking-eyebrow text-bronze-200 md:text-sm">
          Berkshire Hathaway HomeServices Nevada Properties
        </p>
        <h1 className="mb-6 text-4xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl">
          <span className="block">{headlinePrimary}</span>
          <span className="mt-2 block text-2xl font-medium italic text-bronze-200 md:text-4xl lg:text-5xl">
            {headlineSecondary}
          </span>
        </h1>
        <div className="mx-auto mb-6 h-px w-16 bg-bronze-300/70" aria-hidden />
        <p className="mb-8 max-w-2xl text-base text-white/90 md:text-lg">{intro}</p>

        <p className="mb-3 max-w-xl text-center text-xs font-medium uppercase tracking-[0.18em] text-white/80">
          Search live MLS homes by city, zip, or neighborhood—results update as you type.
        </p>
        <RealScoutSimpleSearch className="mb-4 max-w-2xl py-0" />

        <a
          href="/#book-consultation"
          className="mt-2 inline-flex items-center justify-center border border-bronze-200/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-ink"
        >
          Book a private consultation
        </a>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/85">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{agentStats.transactionsClosed}+</span>
            <span>Properties Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Since {agentStats.servingSince}</span>
            <span>Serving Las Vegas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{agentStats.averageRating}★</span>
            <span>Average Rating</span>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform ${
          prefersReducedMotion ? "" : "animate-bounce"
        }`}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-2">
          <div className="h-3 w-1 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}
