import Link from "next/link";
import { cookies } from "next/headers";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { MapPin, Search, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { realScoutConfig } from "@/lib/integrations";
import BuyerEngagementStrip from "@/components/sections/BuyerEngagementStrip";
import {
  PREFERRED_ZIP_COOKIE,
  preferredZipFromCookie,
} from "@/lib/preferred-zip";

export const metadata: Metadata = {
  title: "Search homes by zip code",
  description:
    "Find Las Vegas Valley MLS listings by zip code. Open the live home search to browse photos and map, or contact Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/search",
  },
};

export default function SearchPage() {
  const validZip = preferredZipFromCookie(
    cookies().get(PREFERRED_ZIP_COOKIE)?.value,
  );

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto max-w-3xl px-4">
          <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-slate-700">Search by zip</span>
          </nav>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            <Search className="h-3.5 w-3.5" aria-hidden />
            MLS search hub
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {validZip ? `Homes near zip ${validZip}` : "Search Las Vegas homes"}
          </h1>
          <p className="mb-8 text-lg text-slate-600">
            Browse <strong className="text-slate-800">live MLS homes</strong> across the Las Vegas
            Valley—photos, prices, and map—in one place. Open search below, then type your city or
            zip in the box to zero in on the area you care about.
          </p>
        </div>

        <BuyerEngagementStrip browseListingsHref="/listings#featured-properties" />

        <div className="container mx-auto max-w-3xl px-4">
          {validZip && (
            <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
              <p className="flex items-start gap-2 text-sm font-medium">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  You opened this page for zip <strong>{validZip}</strong>. In the search field, enter{" "}
                  <strong>{validZip}</strong> or the city name to focus results on that area.
                </span>
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={`${realScoutConfig.portalUrl}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              aria-label="Open live MLS home search in a new tab"
            >
              Browse live MLS homes
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700"
            >
              Contact {agentInfo.name.split(" ")[0]}
            </Link>
            <Link
              href="/las-vegas-zip-code-map"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700"
            >
              Las Vegas zip code map
            </Link>
          </div>

          <p className="mt-10 text-sm text-slate-500">
            Prefer a direct line? Call{" "}
            <a href={agentInfo.phoneTel} className="font-medium text-blue-600 hover:underline">
              {agentInfo.phone}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
