import "./globals.css";

import React from "react";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GeistSans } from "geist/font/sans";
import { cn } from "lib/utils";
import CalendlyBadge from "@/components/calendly/CalendlyBadge";

/** Defer below-the-fold / non-critical client bundles to reduce main-thread work (lab TBT). */
const AIChatWidget = dynamic(() => import("@/components/chat/AIChatWidget"), { ssr: false });
const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
  { ssr: false },
);
import SchemaScript from "@/components/SchemaScript";
import {
  generateRealEstateAgentSchema,
  generateWebSiteSchema,
  combineSchemas,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { faviconAppleSrc, faviconSrc } from "@/lib/site-media";
import { seoKeywordVariations, seoPrimaryKeyword } from "@/lib/seo";
import { realScoutConfig } from "@/lib/integrations";

const title = siteConfig.name;
const description = siteConfig.description;
const url = siteConfig.url;

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/** GA4 measurement ID — prefer env in Vercel; fallback keeps existing property if unset */
const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-WB5DLLZ4C6";

export const metadata: Metadata = {
  title: {
    default: title,
    /** Every route `title` becomes: {segment} | Spring Valley Las Vegas homes | BHHS */
    template: `%s | ${seoPrimaryKeyword} | ${siteConfig.brandName}`,
  },
  description,
  metadataBase: new URL(url),
  keywords: [
    ...seoKeywordVariations,
    "Berkshire Hathaway HomeServices",
    "Berkshire Hathaway HomeServices Nevada Properties",
    "Berkshire Hathaway HomeServices Las Vegas",
    "BHHS real estate agent",
    "Berkshire Hathaway realtor Las Vegas",
    "Dr. Jan Duffy",
    "Las Vegas real estate",
    "Henderson real estate",
    "Las Vegas homes for sale",
    "Henderson homes for sale",
    "Summerlin real estate",
    "luxury homes Las Vegas",
  ],
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
  // Default OG image: app/opengraph-image.tsx (1200×630). Per-route metadata can override.
  openGraph: {
    title,
    description,
    url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: faviconSrc,
    apple: faviconAppleSrc,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Mobile-friendly viewport + theme (Google / Page Experience baseline) */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

// Combined site-wide schemas using the schema utility
const siteWideSchemas = combineSchemas(
  generateRealEstateAgentSchema(),
  generateWebSiteSchema()
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homebotPrefetchOrigin = (() => {
    const raw = process.env.NEXT_PUBLIC_HOMEBOT_WIDGET_URL?.trim();
    if (!raw) return null;
    try {
      return new URL(raw).origin;
    } catch {
      return null;
    }
  })();

  return (
    <html lang="en" className="scroll-smooth antialiased" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light" />
        {/* Early connections for third-party origins (reduces LCP / script latency) */}
        <link rel="preconnect" href="https://em.realscout.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        {homebotPrefetchOrigin ? (
          <link rel="dns-prefetch" href={homebotPrefetchOrigin} />
        ) : null}
        {/* Site-wide JSON-LD Schema: RealEstateAgent + WebSite */}
        <SchemaScript schema={siteWideSchemas} id="site-schema" />
        {/* RealScout: once globally; afterInteractive avoids blocking first paint (vs beforeInteractive) */}
        <Script
          src={realScoutConfig.widgetScriptSrc}
          type="module"
          strategy="afterInteractive"
        />
        {/* Calendly: idle load — badge still works; reduces contention with LCP/interaction */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          "antialiased bg-white text-sm md:text-base text-slate-800",
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Skip to main content
        </a>
        {children}
        <GoogleAnalytics gaId={gaMeasurementId} />
        <AIChatWidget />
        <CalendlyBadge />
        <VercelAnalytics />
      </body>
    </html>
  );
}
