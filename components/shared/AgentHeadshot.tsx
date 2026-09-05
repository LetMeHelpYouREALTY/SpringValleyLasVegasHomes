import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { agentHeadshotSrc } from "@/lib/site-media";
import { agentInfo } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type AgentHeadshotProps = {
  className?: string;
  /** Outer wrapper (rounded, shadow) */
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Dr. Jan Duffy professional headshot — single source: {@link agentHeadshotSrc} in site-media.
 */
export default function AgentHeadshot({
  className,
  frameClassName,
  priority,
  sizes,
}: AgentHeadshotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none bg-cream",
        frameClassName,
      )}
    >
      <Image
        src={agentHeadshotSrc}
        alt={`${agentInfo.name}, ${agentInfo.title} — ${agentInfo.brokerage}`}
        width={960}
        height={1280}
        className={cn("h-full w-full object-cover object-top", className)}
        sizes={sizes ?? "(max-width: 768px) 100vw, 28rem"}
        priority={priority}
        unoptimized={isCfDeliveryUrl(agentHeadshotSrc)}
      />
    </div>
  );
}
