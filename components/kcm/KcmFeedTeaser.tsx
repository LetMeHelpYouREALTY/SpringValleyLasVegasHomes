import Link from "next/link";
import { getKcmFeedItems } from "@/lib/kcm-rss";
import { KcmFeedSection } from "@/components/kcm/KcmFeedSection";

/** Three-card KCM feed preview (English framing). */
export async function KcmFeedTeaser() {
  const items = await getKcmFeedItems(3);
  return (
    <div className="max-w-6xl mx-auto mb-16">
      <KcmFeedSection items={items} variant="compact" locale="en" />
      <p className="text-center">
        <Link
          href="/market-report"
          className="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-900 hover:bg-purple-100"
        >
          Full KCM feed + embedded reader
        </Link>
      </p>
    </div>
  );
}
