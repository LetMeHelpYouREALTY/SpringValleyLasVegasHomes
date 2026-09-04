import Link from "next/link";
import { Home, Car, School } from "lucide-react";
import { agentInfo } from "@/lib/site-config";
import { realScoutConfig } from "@/lib/integrations";
import {
  siblingCommunityLinks,
  springValleySubdivisions,
} from "@/lib/spring-valley-ia";

const springValleyCityMapUrl = realScoutConfig.springValleyCityMapUrl;

/**
 * Body sections moved from the former `/neighborhoods/spring-valley` hub.
 * No schema.org markup — homepage JSON-LD stays on `app/page.tsx`.
 */
export default function SpringValleyHubContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="prose prose-slate mx-auto mb-14 max-w-4xl">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Where is Spring Valley in Las Vegas?
        </h2>
        <p className="leading-relaxed text-slate-700">
          Spring Valley refers to a large section of unincorporated Clark County
          on the west side of the Las Vegas Valley—generally west of the Strip
          and spanning many residential pockets. Because the name covers a wide
          geography, <strong>Spring Valley Las Vegas homes</strong> can feel
          very different from one ZIP or subdivision to the next. That is why we
          pair map search with neighborhood-level detail before you write an
          offer.
        </p>
        <h2 className="mb-4 mt-10 text-2xl font-bold text-slate-900">
          What types of properties will I find?
        </h2>
        <p className="leading-relaxed text-slate-700">
          Buyers exploring Spring Valley Las Vegas homes often consider
          single-family homes with pools, renovated mid-century properties, and
          low-maintenance townhomes—depending on budget and lifestyle.
          Investment buyers may look at duplex opportunities where allowed. We
          help you align property type with HOA rules, insurance considerations,
          and your long-term plans—whether you are upsizing, relocating, or
          buying your first home.
        </p>
      </section>

      <section
        className="mx-auto mb-14 max-w-4xl rounded-2xl border border-blue-100 bg-blue-50/80 px-6 py-8 md:px-10"
        aria-labelledby="spring-valley-homes-sale-heading"
      >
        <h2
          id="spring-valley-homes-sale-heading"
          className="mb-3 text-center text-2xl font-bold text-slate-900"
        >
          Spring Valley Nevada homes for sale
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-center text-slate-700">
          Browse active inventory and filter by price, beds, baths, and more.
          When you are serious about{" "}
          <strong>Spring Valley Nevada homes for sale</strong>, we narrow by
          subdivision, HOA, and recent comps—not just the zip code.
        </p>
        <div className="flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
          <a
            href={springValleyCityMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Open Spring Valley map search
          </a>
          <Link
            href="/homes-for-sale"
            className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white px-8 py-3 font-semibold text-blue-800 hover:bg-blue-50"
          >
            Search MLS listings on this site
          </Link>
          <a
            href={agentInfo.phoneTel}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-8 py-3 font-semibold text-slate-800 hover:bg-slate-50"
          >
            Call {agentInfo.phone}
          </a>
        </div>
      </section>

      <section className="mx-auto mb-16 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6">
          <Home className="mb-3 h-8 w-8 text-blue-600" />
          <h3 className="mb-2 font-bold text-slate-900">Housing variety</h3>
          <p className="text-sm text-slate-600">
            Diverse product types across Spring Valley mean your search should
            be filtered by price, beds, baths, and HOA—not just the word “Spring
            Valley.”
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6">
          <Car className="mb-3 h-8 w-8 text-blue-600" />
          <h3 className="mb-2 font-bold text-slate-900">Central access</h3>
          <p className="text-sm text-slate-600">
            Many locations balance west valley living with commute options
            toward the 215, I-15, and major employment hubs.
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6">
          <School className="mb-3 h-8 w-8 text-blue-600" />
          <h3 className="mb-2 font-bold text-slate-900">
            Schools &amp; services
          </h3>
          <p className="text-sm text-slate-600">
            School assignments and services vary by address. We point you to
            official sources and local contacts as part of due diligence.
          </p>
        </div>
      </section>

      <section
        className="mx-auto mb-16 max-w-6xl"
        aria-labelledby="spring-valley-pockets-heading"
      >
        <h2
          id="spring-valley-pockets-heading"
          className="mb-3 text-center text-2xl font-bold text-slate-900 md:text-3xl"
        >
          Areas buyers often compare with Spring Valley, NV
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-center leading-relaxed text-slate-600">
          <strong>Spring Valley Las Vegas homes</strong> sit in a large,
          established west valley footprint. Buyers frequently cross-shop nearby
          pockets—pricing and inventory change daily, so we use live MLS data
          for the exact community and address you choose.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              West Sahara &amp; west corridors
            </h3>
            <p className="text-sm leading-relaxed text-slate-700">
              Residential pockets along west Sahara and Charleston corridors mix
              older and newer stock with easy access to west valley shopping,
              parks like{" "}
              <span className="whitespace-nowrap">Desert Breeze</span>, and Red
              Rock views from select elevations. School zones and HOA rules
              vary—always verify on the listing you like.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              Rhodes Ranch &amp; Enterprise
            </h3>
            <p className="text-sm leading-relaxed text-slate-700">
              <strong>Rhodes Ranch</strong> is a guard-gated golf community in
              the <strong>Enterprise</strong> area—often searched alongside
              Spring Valley listings because both sit on the west side of the
              valley. If you want a single amenity-rich community, we narrow
              your search to MLS boundaries that match—not just the name.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              Rancho Viejo &amp; condo pockets
            </h3>
            <p className="text-sm leading-relaxed text-slate-700">
              Dense condo and townhome communities offer lower-maintenance
              options for first-time buyers and investors. We review HOA
              budgets, reserves, and rental rules when you compare these to
              single-family Spring Valley Nevada homes.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              Chinatown / Spring Mountain
            </h3>
            <p className="text-sm leading-relaxed text-slate-700">
              The Spring Mountain corridor is known for diverse dining and
              retail—many Spring Valley buyers want a short drive to this hub.
              If walkability to restaurants matters, we map realistic drive
              times from specific listings—not just distance.
            </p>
          </article>
        </div>
      </section>

      <section
        className="mx-auto mb-8 max-w-6xl rounded-2xl border border-slate-200 bg-slate-50/90 px-6 py-10 md:px-10"
        aria-labelledby="spring-valley-local-links-heading"
      >
        <h2
          id="spring-valley-local-links-heading"
          className="mb-8 text-center text-2xl font-bold text-slate-900"
        >
          Spring Valley, NV — local search &amp; resources
        </h2>
        <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">
              Search &amp; market
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={springValleyCityMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Spring Valley homes for sale—live map search
                </a>
              </li>
              <li>
                <Link
                  href="/homes-for-sale"
                  className="text-blue-600 hover:underline"
                >
                  Spring Valley Nevada homes for sale (MLS)
                </Link>
              </li>
              <li>
                <Link href="/zip" className="text-blue-600 hover:underline">
                  Spring Valley ZIP codes
                </Link>
              </li>
              <li>
                <Link
                  href="/las-vegas-zip-code-map"
                  className="text-blue-600 hover:underline"
                >
                  Las Vegas zip code map
                </Link>
              </li>
              <li>
                <Link
                  href="/market-report"
                  className="text-blue-600 hover:underline"
                >
                  Las Vegas market report
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/property-taxes"
                  className="text-blue-600 hover:underline"
                >
                  Spring Valley property taxes &amp; rate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">
              Buyers &amp; sellers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/buyers" className="text-blue-600 hover:underline">
                  Spring Valley home buyers
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="text-blue-600 hover:underline">
                  Sell a home in Las Vegas
                </Link>
              </li>
              <li>
                <Link href="/schools" className="text-blue-600 hover:underline">
                  Spring Valley schools
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-blue-600 hover:underline">
                  Spring Valley guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-600 hover:underline">
                  Contact Dr. Jan Duffy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-600 hover:underline">
                  Real estate FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">
              Spring Valley subdivisions
            </h3>
            <ul className="space-y-2">
              {springValleySubdivisions.map((subdivision) => (
                <li key={subdivision.slug}>
                  <Link
                    href={subdivision.href}
                    className="text-blue-600 hover:underline"
                  >
                    {subdivision.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-slate-900">
              Nearby communities
            </h3>
            <ul className="space-y-2">
              {siblingCommunityLinks.map((community) => (
                <li key={community.href}>
                  <a
                    href={community.href}
                    target="_blank"
                    rel="noopener"
                    className="text-blue-600 hover:underline"
                  >
                    {community.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/neighborhoods"
                  className="text-blue-600 hover:underline"
                >
                  Spring Valley subdivision index
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
