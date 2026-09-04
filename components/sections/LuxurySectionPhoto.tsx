import Image from "next/image";

type LuxurySectionPhotoProps = {
  src: string;
  alt: string;
  /** Short label over the photo (section name). */
  eyebrow?: string;
};

/** In-page section photograph — black/gold overlay, no JSON-LD. */
export default function LuxurySectionPhoto({
  src,
  alt,
  eyebrow,
}: LuxurySectionPhotoProps) {
  return (
    <div className="relative mx-auto mb-8 max-w-6xl overflow-hidden rounded-2xl border border-[#c9a227]/30 shadow-[0_0_40px_rgba(201,162,39,0.08)]">
      <div className="relative aspect-[21/9] min-h-[140px] max-h-64 w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent"
          aria-hidden
        />
        {eyebrow ? (
          <p className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d48a] md:bottom-6 md:left-6">
            {eyebrow}
          </p>
        ) : null}
      </div>
    </div>
  );
}
