"use client";

import { useState } from "react";
import { CalendarDays, Home, KeyRound } from "lucide-react";
import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import {
  CALENDLY_BUYER_URL,
  CALENDLY_LISTING_URL,
  CALENDLY_SHOWING_URL,
} from "@/lib/calendly";
import { agentInfo } from "@/lib/site-config";

/**
 * Homepage booking band: three Calendly event types (live on calendly.com/drjanduffy, checked
 * 2026-10-29). The inline scheduler only mounts after a visitor picks one, so Calendly's iframe
 * never competes with the hero for LCP.
 */
const OPTIONS = [
  {
    id: "buy",
    icon: KeyRound,
    label: "Buying",
    title: "Buyer consultation",
    detail:
      "30 minutes by phone or Zoom. What's selling in your target area this week, and whether your budget and timing fit.",
    url: CALENDLY_BUYER_URL,
  },
  {
    id: "sell",
    icon: Home,
    label: "Selling",
    title: "Listing consultation",
    detail:
      "30 minutes on your home. Recent comparable sales with addresses, prices, and days on market, plus three pricing strategies.",
    url: CALENDLY_LISTING_URL,
  },
  {
    id: "tour",
    icon: CalendarDays,
    label: "Touring",
    title: "Private showing",
    detail:
      "30 minutes at the property. Comps pulled before we walk in, and a clear next step after.",
    url: CALENDLY_SHOWING_URL,
  },
] as const;

export default function BookingSection() {
  const [selected, setSelected] = useState<
    (typeof OPTIONS)[number]["id"] | null
  >(null);
  const active = OPTIONS.find((o) => o.id === selected);

  return (
    <section
      id="book-consultation"
      className="scroll-mt-24 bg-sand py-20 md:py-28"
      aria-labelledby="book-consultation-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-bronze-700">
            Private consultation
          </p>
          <h2
            id="book-consultation-heading"
            className="mb-5 text-4xl text-ink md:text-5xl"
          >
            Book time with Dr. Jan Duffy
          </h2>
          <p className="text-base text-slate-700 md:text-lg">
            Pick the conversation you need and choose a time that works. Prefer
            to talk now? Call{" "}
            <a href={agentInfo.phoneTel} className="font-semibold text-ink">
              {agentInfo.phone}
            </a>
            .
          </p>
        </div>

        <div
          className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3"
          role="tablist"
          aria-label="Consultation type"
        >
          {OPTIONS.map((o) => {
            const Icon = o.icon;
            const isActive = o.id === selected;
            return (
              <button
                key={o.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="booking-scheduler"
                onClick={() => setSelected(o.id)}
                className={`group flex flex-col items-start border p-7 text-left transition-colors ${
                  isActive
                    ? "border-ink bg-ink text-ivory"
                    : "border-bronze-200 bg-ivory text-ink hover:border-bronze-500"
                }`}
              >
                <Icon
                  className={`mb-5 h-6 w-6 ${isActive ? "text-bronze-300" : "text-bronze-600"}`}
                  aria-hidden
                />
                <span
                  className={`mb-1 text-xs font-medium uppercase tracking-[0.18em] ${
                    isActive ? "text-bronze-300" : "text-bronze-700"
                  }`}
                >
                  {o.label}
                </span>
                <span className="mb-3 font-serif text-2xl font-semibold">
                  {o.title}
                </span>
                <span
                  className={`text-sm leading-relaxed ${isActive ? "text-ivory/80" : "text-slate-600"}`}
                >
                  {o.detail}
                </span>
                <span
                  className={`mt-6 text-xs font-semibold uppercase tracking-[0.18em] ${
                    isActive
                      ? "text-ivory"
                      : "text-ink group-hover:text-bronze-700"
                  }`}
                >
                  {isActive ? "Choose a time below" : "See open times →"}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="booking-scheduler"
          role="tabpanel"
          className="mx-auto mt-8 max-w-5xl"
        >
          {active ? (
            <div className="border border-bronze-200 bg-white">
              <CalendlyWidget key={active.id} url={active.url} height="680px" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
