import dynamic from "next/dynamic";

const CommunityAmenityMap = dynamic(() => import("@/components/tools/CommunityAmenityMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-[380px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 md:h-[480px]"
      aria-hidden
    >
      <p className="text-sm text-slate-500">Loading nearby amenities map…</p>
    </div>
  ),
});

type NearbyAmenitiesSectionProps = {
  /** Section background */
  variant?: "white" | "muted";
};

export default function NearbyAmenitiesSection({ variant = "muted" }: NearbyAmenitiesSectionProps) {
  return (
    <section
      className={
        variant === "white"
          ? "border-y border-slate-100 bg-white py-14 md:py-20"
          : "border-y border-slate-100 bg-slate-50 py-14 md:py-20"
      }
      aria-labelledby="nearby-amenities-heading"
    >
      <div className="container mx-auto px-4">
        <CommunityAmenityMap
          showTitle
          amenitiesPageHref="/amenities"
          defaultCategory="grocery"
          mapHeightClass="h-[380px] md:h-[480px]"
        />
      </div>
    </section>
  );
}
