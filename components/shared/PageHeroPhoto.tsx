import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import AgentHeadshot from "@/components/shared/AgentHeadshot";

type PageHeroPhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  /** Circular Dr. Jan Duffy badge over the photo (every inner-page section). */
  showAgentBadge?: boolean;
};

/** Full-bleed section photo for inner pages — Cloudflare URL or git JPEG backup. */
export default function PageHeroPhoto({
  src,
  alt,
  priority = true,
  showAgentBadge = true,
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
      {showAgentBadge ? (
        <div className="absolute bottom-4 right-4 z-10 h-20 w-20 sm:bottom-6 sm:right-8 sm:h-24 sm:w-24 md:h-28 md:w-28">
          <AgentHeadshot
            frameClassName="h-full w-full aspect-square drop-shadow-lg"
            sizes="112px"
            priority={priority}
          />
        </div>
      ) : null}
    </div>
  );
}
