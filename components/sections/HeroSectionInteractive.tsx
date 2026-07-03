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
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="block">{headlinePrimary}</span>
          <span className="block text-blue-400 mt-1">{headlineSecondary}</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">{intro}</p>

        <p className="mb-3 max-w-xl text-center text-sm font-medium text-white/95 md:text-base">
          Search live MLS homes by city, zip, or neighborhood—results update as you type.
        </p>
        <RealScoutSimpleSearch className="mb-4 max-w-2xl py-0" />

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
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
