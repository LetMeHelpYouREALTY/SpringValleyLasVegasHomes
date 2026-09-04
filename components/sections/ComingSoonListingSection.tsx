import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { agentInfo, officeInfo } from "@/lib/site-config";
import { luxuryImages } from "@/lib/luxury-media";
import {
  comingSoonListings,
  livingSquareFeet,
  type ComingSoonListing,
} from "@/lib/coming-soon-listings";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

function ComingSoonCard({ listing }: { listing: ComingSoonListing }) {
  const livingSqFt = livingSquareFeet(listing);
  const locationLine = `${listing.unincorporatedTown}, ${listing.city}, ${listing.state} ${listing.zip}`;
  const addressLine =
    listing.showStreetAddress && listing.streetAddress
      ? listing.streetAddress
      : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-2">
        <div className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 text-center text-[#f6edd8] lg:min-h-[420px]">
          <Image
            src={luxuryImages.comingSoon}
            alt="Two-story Spring Valley home at dusk — listing photos publish after the photoshoot"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden />
          <span className="absolute left-4 top-4 rounded-full border border-[#c9a227]/60 bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#e8d48a]">
            Coming soon
          </span>
          <div className="relative z-10">
            <p className="max-w-sm text-lg font-semibold text-[#f6edd8]">
              Photos after the photoshoot
            </p>
            <p className="mt-2 max-w-sm text-sm text-[#cbbd96]">
              We will replace this stand-in with listing photos when the shoot
              is done. Expected live window: {listing.expectedListWindow}.
            </p>
          </div>
        </div>

        <div className="px-6 py-8 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Upcoming Spring Valley listing
          </p>
          <h2
            id="coming-soon-listing-heading"
            className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
          >
            {listing.bedrooms}-bed {listing.stories.toLowerCase()} in{" "}
            {listing.subdivisionName}
          </h2>
          <p className="mt-3 text-slate-600">
            {addressLine ? (
              <span className="block font-medium text-slate-900">
                {addressLine}
              </span>
            ) : (
              <span>
                Street address publishes with the photos. Until then:{" "}
                {locationLine}.
              </span>
            )}
          </p>
          <p className="mt-3 text-slate-700">
            {livingSqFt.toLocaleString("en-US")} sq ft of finished living area,{" "}
            {listing.bedrooms} bedrooms, {listing.bathroomsFull} full and{" "}
            {listing.bathroomsHalf} half bath
            {listing.pool ? ", and a pool" : ""}. Built {listing.yearBuilt} by{" "}
            {listing.builder}.
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Spec label="Beds" value={`${listing.bedrooms}`} />
            <Spec
              label="Baths"
              value={`${listing.bathroomsFull} full / ${listing.bathroomsHalf} half`}
            />
            <Spec
              label="Living area"
              value={`${livingSqFt.toLocaleString("en-US")} sq ft`}
            />
            <Spec
              label="1st / 2nd floor"
              value={`${listing.firstFloorSqFt.toLocaleString("en-US")} / ${listing.secondFloorSqFt.toLocaleString("en-US")}`}
            />
            <Spec
              label="Garage"
              value={`${listing.garageSqFt.toLocaleString("en-US")} sq ft`}
            />
            <Spec
              label="Lot (est.)"
              value={`${listing.lotAcresEstimated} acre`}
            />
            <Spec label="Year built" value={`${listing.yearBuilt}`} />
            <Spec
              label="Pool / spa"
              value={`${listing.pool ? "Pool" : "No pool"} / ${listing.spa ? "spa" : "no spa"}`}
            />
            <Spec label="ZIP" value={listing.zip} />
          </dl>

          <ul className="mt-4 space-y-1 text-sm text-slate-600">
            <li>
              Construction: {listing.construction}; roof: {listing.roof}.
            </li>
            <li>
              Subdivision:{" "}
              <Link
                href={listing.subdivisionHref}
                className="font-semibold text-blue-700 hover:underline"
              >
                {listing.subdivisionName}
              </Link>
              , {listing.unincorporatedTown}.
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center justify-center rounded-md bg-[#c9a227] px-5 py-3 font-semibold text-[#070604] hover:bg-[#a6851c]"
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden />
              Call {agentInfo.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Get notified when it lists
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            {officeInfo.name}, {officeInfo.address.full}. {agentInfo.name},
            License {agentInfo.license}. Specs from Clark County Assessor
            records (assessment use only). Not a live MLS listing yet.
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ComingSoonListingSection() {
  if (comingSoonListings.length === 0) {
    return null;
  }

  return (
    <section
      id="coming-soon-listing"
      className="border-b border-slate-200 bg-slate-50 py-12 md:py-16"
      aria-labelledby="coming-soon-listing-heading"
    >
      <div className="container mx-auto px-4">
        <ComingSoonCard listing={comingSoonListings[0]} />
      </div>
    </section>
  );
}
