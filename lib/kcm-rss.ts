/**
 * KCM (Keeping Current Matters) RSS — server-side fetch + parse for curated article cards.
 * Images and excerpts are derived from feed HTML; full articles stay on simplifyingthemarket.com.
 */

import Parser from "rss-parser";
import { kcmConfig } from "@/lib/integrations";
import { absoluteMediaUrl, springValleyMarketingOgSrc } from "@/lib/site-media";

/** Align with Next.js fetch cache for RSS (ISR-style refresh). */
export const KCM_FEED_REVALIDATE_SECONDS = 3600;

const MAX_EXCERPT_LENGTH = 220;

export type KcmFeedItem = {
  title: string;
  link: string;
  pubDate: string | undefined;
  image?: string;
  excerpt: string;
};

type KcmParserItem = Parser.Item & {
  contentEncoded?: string;
  "content:encoded"?: string;
};

const parser = new Parser<KcmParserItem>({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

function extractFirstImage(html: string | undefined): string | undefined {
  if (!html) return undefined;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1]?.trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlBlobFromItem(item: KcmParserItem): string | undefined {
  const encoded =
    item.contentEncoded ?? item["content:encoded"] ?? (item as { content?: string }).content;
  const desc = (item as { description?: string }).description;
  if (typeof encoded === "string" && encoded.length > 0) return encoded;
  if (typeof desc === "string" && desc.length > 0) return desc;
  if (typeof item.contentSnippet === "string") return item.contentSnippet;
  return undefined;
}

function imageFromItem(item: KcmParserItem): string | undefined {
  const blobs = [
    item.contentEncoded,
    item["content:encoded"],
    (item as { content?: string }).content,
    (item as { description?: string }).description,
    item.contentSnippet,
  ].filter((b): b is string => typeof b === "string" && b.length > 0);

  for (const blob of blobs) {
    const img = extractFirstImage(blob);
    if (img) return img;
  }
  return undefined;
}

function excerptFromItem(item: KcmParserItem): string {
  const raw = htmlBlobFromItem(item) ?? "";
  const text = stripHtml(raw);
  if (text.length <= MAX_EXCERPT_LENGTH) return text;
  return `${text.slice(0, MAX_EXCERPT_LENGTH).trim()}…`;
}

/**
 * Fetches and parses the configured KCM RSS feed (English by default — see `kcmConfig.rssFeedUrl`).
 * Returns an empty array on network/parse failure so pages still render.
 */
/**
 * Preferred og:image / WebPage.primaryImageOfPage for the KCM hub — first RSS image when valid HTTPS, else first homepage hero.
 */
export function kcmHubPreferredImage(items: KcmFeedItem[]): string {
  const first = items[0];
  const raw = first?.image?.trim();
  if (raw && /^https?:\/\//i.test(raw)) return raw;
  return absoluteMediaUrl(springValleyMarketingOgSrc);
}

export async function getKcmFeedItems(limit = 9): Promise<KcmFeedItem[]> {
  const url = kcmConfig.rssFeedUrl;
  try {
    const res = await fetch(url, {
      next: { revalidate: KCM_FEED_REVALIDATE_SECONDS },
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const feed = await parser.parseString(xml);
    const rawItems = feed.items ?? [];

    const out: KcmFeedItem[] = [];
    for (const item of rawItems) {
      if (out.length >= limit) break;
      const link = item.link?.trim();
      if (!link) continue;

      out.push({
        title: (item.title ?? "Article").trim(),
        link,
        pubDate: item.pubDate ?? item.isoDate,
        image: imageFromItem(item),
        excerpt: excerptFromItem(item),
      });
    }
    return out;
  } catch {
    return [];
  }
}

/** JSON-LD ItemList — list items point at third-party article URLs (curation, not republishing). */
export function buildKcmItemListJsonLd(items: KcmFeedItem[], pageUrl: string) {
  const listId = `${pageUrl}#kcm-itemlist`;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": listId,
    name: "Keeping Current Matters — artículos recientes (feed)",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      url: item.link,
    })),
  };
}

/** WebPage node referencing the ItemList as mainEntity (paired in @graph on the hub page). */
export function buildKcmWebPageJsonLd(pageUrl: string, primaryImageAbsoluteUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Market articles | Keeping Current Matters",
    mainEntity: { "@id": `${pageUrl}#kcm-itemlist` },
    ...(primaryImageAbsoluteUrl
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: primaryImageAbsoluteUrl,
          },
        }
      : {}),
  };
}

export function buildKcmFeedJsonLdGraph(
  items: KcmFeedItem[],
  pageUrl: string,
  primaryImageAbsoluteUrl?: string,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildKcmWebPageJsonLd(pageUrl, primaryImageAbsoluteUrl), buildKcmItemListJsonLd(items, pageUrl)],
  };
}
