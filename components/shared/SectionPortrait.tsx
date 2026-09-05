import AgentHeadshot from "@/components/shared/AgentHeadshot";
import { cn } from "@/lib/utils";

type SectionPortraitProps = {
  className?: string;
  sizeClassName?: string;
};

/**
 * Compact circular portrait for section headings (homepage bands, CTAs, inner pages).
 */
export default function SectionPortrait({
  className,
  sizeClassName = "h-16 w-16 sm:h-20 sm:w-20",
}: SectionPortraitProps) {
  return (
    <div className={cn("mx-auto mb-5", sizeClassName, className)}>
      <AgentHeadshot
        frameClassName="h-full w-full aspect-square"
        sizes="80px"
      />
    </div>
  );
}
