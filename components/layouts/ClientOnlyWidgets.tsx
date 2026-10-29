"use client";

import dynamic from "next/dynamic";

// next/dynamic with ssr: false must live in a Client Component (Next 15+).
// Defers non-critical client bundles to reduce main-thread work (lab TBT).
export const AIChatWidget = dynamic(
  () => import("@/components/chat/AIChatWidget"),
  { ssr: false },
);

export const VercelAnalytics = dynamic(
  () =>
    import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
  { ssr: false },
);
