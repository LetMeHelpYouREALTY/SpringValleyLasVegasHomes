import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { agentHeadshotSrc, logoMarkAlt } from "@/lib/site-media";
import { agentInfo } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type AgentHeadshotProps = {
  className?: string;
  /** Outer wrapper (circular badge on transparent ground) */
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Dr. Jan Duffy circular gold-framed portrait — Cloudflare Images when
 * `NEXT_PUBLIC_CF_IMAGE_PORTRAIT_ID` is set; git PNG backup otherwise.
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
        "relative overflow-hidden rounded-full bg-transparent",
        frameClassName,
      )}
    >
      <Image
        src={agentHeadshotSrc}
        alt={
          logoMarkAlt ||
          `${agentInfo.name}, ${agentInfo.title} — ${agentInfo.brokerage}`
        }
        width={1024}
        height={1024}
        className={cn("h-full w-full object-contain", className)}
        sizes={sizes ?? "(max-width: 768px) 80vw, 20rem"}
        priority={priority}
        unoptimized={isCfDeliveryUrl(agentHeadshotSrc)}
      />
    </div>
  );
}
