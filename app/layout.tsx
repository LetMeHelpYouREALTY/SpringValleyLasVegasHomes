import "./globals.css";

import React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { Cormorant_Garamond } from "next/font/google";
import { cn } from "lib/utils";
import CalendlyBadge from "@/components/calendly/CalendlyBadge";

import {
  AIChatWidget,
  VercelAnalytics,
} from "@/components/layouts/ClientOnlyWidgets";
import SchemaScript from "@/components/SchemaScript";
import AutoBreadcrumbSchema from "@/components/AutoBreadcrumbSchema";
import {
  generateRealEstateAgentSchema,
  generateWebSiteSchema,
  combineSchemas,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { faviconAppleSrc, faviconSrc } from "@/lib/site-media";
import { seoKeywordVariations, seoPrimaryKeyword } from "@/lib/seo";
import { realScoutConfig } from "@/lib/integrations";

/** Editorial serif for headlines (luxury theme); body stays Geist Sans. */
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-serif",
});

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
    /** Every route `title` becomes: {segment} | Spring Valley Las Vegas homes | Dr. Jan Duffy */
    template: `%s | ${seoPrimaryKeyword} | Dr. Jan Duffy`,
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
  generateWebSiteSchema(),
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
    <html
      lang="en"
      className="scroll-smooth antialiased"
      style={{ colorScheme: "light" }}
    >
      <head>
        <meta name="color-scheme" content="light" />
        {/* RealScout loads after the load event, so a DNS hint is enough (a preconnect would go unused) */}
        <link rel="dns-prefetch" href="https://em.realscout.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        {homebotPrefetchOrigin ? (
          <link rel="dns-prefetch" href={homebotPrefetchOrigin} />
        ) : null}
        {/* Site-wide JSON-LD Schema: RealEstateAgent + WebSite */}
        <SchemaScript schema={siteWideSchemas} id="site-schema" />
        <AutoBreadcrumbSchema />
        {/* RealScout (~410 KB): once globally, after the load event so it doesn't compete with the hero for bandwidth on mobile */}
        <Script
          src={realScoutConfig.widgetScriptSrc}
          type="module"
          strategy="lazyOnload"
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
          serif.variable,
          "antialiased bg-ivory font-sans text-sm md:text-base text-slate-800",
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Skip to main content
        </a>
        {children}
        {/* GA4 after the load event: keeps ~180 KB of gtag off the mobile LCP path */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}');`}
        </Script>
        <AIChatWidget />
        <CalendlyBadge text="Book a private consultation" color="#14120f" textColor="#faf7f2" />
        <VercelAnalytics />
      
        {/* Follow Up Boss pixel (Widget Tracker) */}
        <Script id="fub-widget-tracker" strategy="afterInteractive">{`
(function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
{(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
(t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
e.parentNode.insertBefore(t,e);})
(window,"https://widgetbe.com/agent",document,"widgetTracker");
window.widgetTracker("create", "WT-XQHVYQWW");
window.widgetTracker("send", "pageview");
        `}</Script>
</body>
    </html>
  );
}
