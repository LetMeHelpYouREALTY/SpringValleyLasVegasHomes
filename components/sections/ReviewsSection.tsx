"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { agentStats, googleBusinessReviewUrl } from "@/lib/site-config";
import { defaultHomeReviews, type HomeReview } from "@/lib/home-reviews";
import SectionPortrait from "@/components/shared/SectionPortrait";

export type Review = HomeReview;

/** @deprecated import `defaultHomeReviews` from `@/lib/home-reviews` — alias for UI compatibility */
export const defaultReviews = defaultHomeReviews;

/** Align with `agentStats` / GBP — single source for stars + count in UI and JSON-LD helpers */
export const aggregateRating = {
  ratingValue: agentStats.averageRating,
  reviewCount: agentStats.reviewCount,
  bestRating: 5,
  worstRating: 1,
};

interface ReviewsSectionProps {
  /** Custom reviews to display */
  reviews?: Review[];
  /** Custom title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Google Business Profile URL */
  googleReviewsUrl?: string;
  /** Custom class name */
  className?: string;
}

export default function ReviewsSection({
  reviews = defaultHomeReviews,
  title = "What Our Clients Say",
  subtitle = "Clients who bought and sold Spring Valley homes with Dr. Jan Duffy",
  googleReviewsUrl = googleBusinessReviewUrl,
  className = "",
}: ReviewsSectionProps) {
  return (
    <section className={`py-16 md:py-24 bg-cream ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionPortrait />
          <h2 className="text-3xl md:text-4xl text-ink mb-4">{title}</h2>
          <p className="text-base text-neutral-600 max-w-3xl mx-auto font-light normal-case tracking-normal">
            {subtitle}
          </p>
          {/* Aggregate Rating Display */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(aggregateRating.ratingValue)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-900">
              {aggregateRating.ratingValue}
            </span>
            <span className="text-slate-600">
              ({aggregateRating.reviewCount} Google reviews)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 border border-black/5">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  {review.image ? (
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                      unoptimized={
                        review.image ? isCfDeliveryUrl(review.image) : false
                      }
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 text-sm">
                        {review.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{review.name}</h3>
                  <p className="text-sm text-slate-600">{review.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-cream" />
                <p className="text-slate-700 relative z-10 pl-4">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-12">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink uppercase tracking-luxury text-xs font-bold"
          >
            Read More Reviews on Google
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Helper to convert reviews to schema format for ReviewSchema component
 * Use with: <ReviewSchema reviews={getReviewSchemaData(reviews)} aggregateRating={aggregateRating} />
 */
export function getReviewSchemaData(reviews: Review[]) {
  return reviews.map((review) => ({
    author: review.name,
    rating: review.rating,
    text: review.text,
    date: review.date,
  }));
}
