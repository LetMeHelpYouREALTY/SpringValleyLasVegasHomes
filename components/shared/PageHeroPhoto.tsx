import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";

type PageHeroPhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

/** Full-bleed section photo for inner pages — Cloudflare URL or git JPEG backup. */
export default function PageHeroPhoto({
  src,
  alt,
  priority = true,
}: PageHeroPhotoProps) {
  return (
    <div className="relative mb-10 h-[34vh] min-h-[200px] w-full overflow-hidden md:h-[42vh] md:min-h-[280px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        priority={priority}
        unoptimized={isCfDeliveryUrl(src)}
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden />
    </div>
  );
}
