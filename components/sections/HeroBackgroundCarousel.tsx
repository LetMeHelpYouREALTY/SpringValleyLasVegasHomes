"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { heroBackgroundSrcs } from "@/lib/site-media";

/**
 * Slides 2–3 only. Slide 1 is server-rendered in `HeroLcpBackdrop` for LCP.
 * When `currentSlide === 0`, both layers are opacity-0 so the backdrop shows.
 */
export default function HeroBackgroundCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const extraSlides = heroBackgroundSrcs.slice(1) as [string, string];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {extraSlides.map((src, i) => {
        const slideIndex = i + 1;
        const isActive = currentSlide === slideIndex;
        return (
          <div
            key={slideIndex}
            className={`absolute inset-0 ${
              prefersReducedMotion ? "" : "transition-opacity duration-1000"
            } ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={src}
              alt={`Spring Valley Las Vegas homes and Las Vegas Valley real estate — hero ${slideIndex + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
              fetchPriority="low"
              unoptimized={isCfDeliveryUrl(src)}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        );
      })}
    </div>
  );
}
