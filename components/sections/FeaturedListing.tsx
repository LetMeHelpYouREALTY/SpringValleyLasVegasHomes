/**
 * Featured listing band shown directly below the homepage hero.
 * Facts come from the RealScout listing page (MLS data); update FEATURED_LISTING
 * when the listing changes, or set `active: false` to hide the band.
 */

export const FEATURED_LISTING = {
  active: true,
  address: "9528 Rainfall Avenue",
  cityStateZip: "Las Vegas, NV 89147",
  price: "$469,900",
  beds: 4,
  baths: "2.5",
  sqft: "2,547",
  yearBuilt: 1999,
  headline: "Private pool, no HOA dues, and owned solar",
  summary:
    "Two-story home with a 10.22 kW owned rooftop solar system, quartz kitchen island, gas fireplace, a downstairs bedroom, and an upstairs loft. Two-car garage.",
  mlsNumber: "2829192",
  listingOffice: "BHHS Nevada Properties",
  url: "https://drjanduffy.realscout.com/homesearch/listings/p-9528-rainfall-avenue-las-vegas-89147-glvartrestle-886",
} as const;

type FeaturedListingProps = {
  /** This site's own display phone, e.g. "(702) 555-0100". */
  phone: string;
  /** Matching tel: href, e.g. "tel:+17025550100". */
  phoneHref: string;
};

export default function FeaturedListing({ phone, phoneHref }: FeaturedListingProps) {
  const l = FEATURED_LISTING;
  if (!l.active) return null;

  const facts = [
    { label: "Beds", value: String(l.beds) },
    { label: "Baths", value: l.baths },
    { label: "Sq ft", value: l.sqft },
    { label: "Built", value: String(l.yearBuilt) },
  ];

  return (
    <section
      id="featured-listing"
      aria-labelledby="featured-listing-heading"
      className="border-b border-slate-200 bg-white py-10 md:py-12"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            New listing · For sale
          </p>
          <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h2
              id="featured-listing-heading"
              className="text-2xl font-bold text-slate-900 md:text-3xl"
            >
              {l.address}, {l.cityStateZip}
            </h2>
            <p className="text-2xl font-bold text-slate-900 md:text-3xl">{l.price}</p>
          </div>
          <p className="mt-1 text-slate-700">
            Listing offered by {l.listingOffice} · Listing agent Dr. Jan Duffy · MLS #{l.mlsNumber}
          </p>
          <p className="mt-3 text-lg font-semibold text-slate-800">{l.headline}</p>
          <p className="mt-2 text-slate-700">{l.summary}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-lg bg-white p-3 text-center">
                <dt className="text-xs uppercase tracking-wide text-slate-500">{f.label}</dt>
                <dd className="text-lg font-bold text-slate-900">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              See photos and details
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-100"
            >
              Call Dr. Jan Duffy at {phone} to tour
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Source: GLVAR. Information deemed reliable but not guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
