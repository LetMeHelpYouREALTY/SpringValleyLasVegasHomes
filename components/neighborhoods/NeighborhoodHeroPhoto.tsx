import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getNeighborhoodPhoto,
  type NeighborhoodSlug,
} from "@/lib/neighborhood-media";

type NeighborhoodHeroPhotoProps = {
  slug: NeighborhoodSlug;
  variant?: "hero" | "card";
  priority?: boolean;
  className?: string;
};

/**
 * Photo generated from the neighborhood page H1 — used under headings and on cards.
 */
export default function NeighborhoodHeroPhoto({
  slug,
  variant = "hero",
  priority = false,
  className,
}: NeighborhoodHeroPhotoProps) {
  const photo = getNeighborhoodPhoto(slug);
  const isHero = variant === "hero";

  return (
    <figure
      className={cn(
        "relative overflow-hidden bg-slate-100",
        isHero
          ? "mx-auto my-8 aspect-[16/9] w-full max-w-4xl rounded-xl"
          : "mb-3 aspect-[16/9] w-full rounded-md",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={
          isHero
            ? "(max-width: 768px) 100vw, 896px"
            : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        }
        className="object-cover"
        priority={priority}
      />
    </figure>
  );
}
