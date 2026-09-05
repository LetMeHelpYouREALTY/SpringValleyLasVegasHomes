import Navbar from "@/components/layouts/Navbar";
import PageAgentMark from "@/components/shared/PageAgentMark";
import Footer from "@/components/layouts/Footer";
import { KcmBlogEmbed } from "@/components/kcm/KcmBlogEmbed";
import { KcmFeedSection } from "@/components/kcm/KcmFeedSection";
import Link from "next/link";
import type { Metadata } from "next";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { kcmConfig } from "@/lib/integrations";
import { generateLocalBusinessSchema } from "@/lib/gbp-schema";
import {
  buildKcmFeedJsonLdGraph,
  getKcmFeedItems,
  kcmHubPreferredImage,
} from "@/lib/kcm-rss";
import { ogTwitterImageFields } from "@/lib/og-image";

const kcmBlogTitle =
  "Market articles (KCM) | Spring Valley Las Vegas — Dr. Jan Duffy";
const kcmBlogDescription =
  "Keeping Current Matters (Simplifying the Market) articles for home buyers and sellers—national context for Las Vegas and Spring Valley. Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties. Call (702) 664-8424.";

export async function generateMetadata(): Promise<Metadata> {
  const items = await getKcmFeedItems(1);
  const pageUrl = `${siteConfig.url}/market-insights/kcm-blog`;
  const ogImage = kcmHubPreferredImage(items);
  const og = ogTwitterImageFields(ogImage, {
    alt: items[0]?.title
      ? `${items[0].title} — market article preview`
      : "Market articles and Las Vegas housing context",
  });
  return {
    title: kcmBlogTitle,
    description: kcmBlogDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: kcmBlogTitle,
      description: kcmBlogDescription,
      url: pageUrl,
      type: "website",
      ...og.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: kcmBlogTitle,
      description: kcmBlogDescription,
      ...og.twitter,
    },
  };
}

export const revalidate = 3600;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is on this page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Article cards built from the Keeping Current Matters RSS feed (headline, excerpt, and link to read on KCM) plus an embedded blog viewer. Content is general U.S. housing education—not legal, tax, or investment advice, and not a substitute for local guidance on your neighborhood or property in Las Vegas.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get local help with Spring Valley or Las Vegas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes. ${agentInfo.name}, ${agentInfo.title}, with ${agentInfo.brokerage}, helps buyers and sellers in Spring Valley and the Las Vegas Valley. Office: ${officeInfo.address.full}. Phone: ${agentInfo.phone}.`,
      },
    },
  ],
};

export default async function KcmBlogPage() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const items = await getKcmFeedItems(9);
  const pageUrl = `${siteConfig.url}/market-insights/kcm-blog`;
  const kcmPrimaryImage = kcmHubPreferredImage(items);
  const feedGraph =
    items.length > 0
      ? buildKcmFeedJsonLdGraph(items, pageUrl, kcmPrimaryImage)
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      {feedGraph ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(feedGraph) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <PageAgentMark />
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-8">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/market-insights" className="hover:text-blue-600">
                Market Insights
              </Link>
              {" / "}
              <span className="text-slate-900">KCM articles</span>
            </nav>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Market articles (Keeping Current Matters)
            </h1>
            <p className="text-lg text-slate-600">
              Educational content from{" "}
              <span className="font-medium">Keeping Current Matters</span> —
              Simplifying the Market. Below: RSS-powered cards and the full
              embedded KCM blog (third-party source).
            </p>
            <p className="mt-4 text-slate-700">
              Buying or selling in{" "}
              <Link
                href="/neighborhoods/spring-valley"
                className="text-blue-600 hover:underline font-medium"
              >
                Spring Valley
              </Link>{" "}
              or the west valley?{" "}
              <a
                href={agentInfo.phoneTel}
                className="font-medium text-blue-600 hover:underline"
              >
                Call {agentInfo.name}
              </a>{" "}
              at {agentInfo.phone}. {officeInfo.name}, {officeInfo.address.full}
              .
            </p>
          </div>

          <KcmFeedSection items={items} variant="full" locale="en" />

          <div className="max-w-4xl mx-auto mb-6">
            <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
              Full KCM blog (embedded)
            </h2>
            <p className="text-center text-sm text-slate-600 mb-4">
              Scroll inside the frame to browse articles as on the KCM site.
            </p>
          </div>

          <KcmBlogEmbed />

          <section
            className="max-w-3xl mx-auto mt-14 prose prose-slate"
            aria-labelledby="faq-kcm-heading"
          >
            <h2
              id="faq-kcm-heading"
              className="text-xl font-bold text-slate-900"
            >
              Frequently asked questions
            </h2>
            <h3 className="text-lg font-semibold text-slate-800 mt-6">
              What is this page?
            </h3>
            <p>
              RSS article cards (summary + link) and an embedded blog viewer.
              Topics are national or general—use them as context, not as a
              forecast for your specific home in Spring Valley.
            </p>
            <h3 className="text-lg font-semibold text-slate-800 mt-6">
              How do I use the RSS URL in email or my CRM?
            </h3>
            <p>
              KCM provides an RSS link for tools like email marketing or
              automation. Your feed URL (for CRM setup) is:{" "}
              <a
                href={kcmConfig.rssFeedUrl}
                className="text-blue-600 break-all hover:underline"
                rel="noopener noreferrer"
              >
                {kcmConfig.rssFeedUrl}
              </a>
              . This page shows those articles as cards plus the iframe viewer.
            </p>
          </section>

          <div className="max-w-3xl mx-auto mt-10 text-center">
            <Link
              href="/market-insights"
              className="inline-flex items-center text-blue-600 font-medium hover:underline"
            >
              ← Back to Market Insights
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
