import Image from "next/image";
import Link from "next/link";
import type { KcmFeedItem } from "@/lib/kcm-rss";

const KCM_IMAGE_HOST = "files.keepingcurrentmatters.com";

type KcmFeedSectionProps = {
  items: KcmFeedItem[];
  /** Larger heading + bridge copy for the full hub page */
  variant?: "full" | "compact";
  /** Default `en` for Las Vegas buyers; use `es` only if RSS/embed are Spanish. */
  locale?: "en" | "es";
};

function CardImage({ src, title }: { src: string; title: string }) {
  const alt = `${title} — Simplifying the Market`;
  try {
    const u = new URL(src);
    if (u.hostname === KCM_IMAGE_HOST && u.protocol === "https:") {
      return (
        <Image
          src={src}
          alt={alt}
          width={640}
          height={360}
          className="h-44 w-full object-cover transition group-hover:opacity-95"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      );
    }
  } catch {
    /* fall through to img */
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fallback when host is not KCM CDN (remotePatterns)
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-44 w-full object-cover transition group-hover:opacity-95"
    />
  );
}

/**
 * Curated KCM RSS cards (links open KCM article URLs on simplifyingthemarket.com).
 */
export function KcmFeedSection({
  items,
  variant = "full",
  locale = "en",
}: KcmFeedSectionProps) {
  if (items.length === 0) {
    return (
      <section
        className="mb-12 max-w-6xl mx-auto rounded-xl border border-amber-100 bg-amber-50/80 px-4 py-6 text-center"
        aria-live="polite"
      >
        <p className="text-sm text-amber-900">
          {locale === "es"
            ? "No se pudieron cargar los artículos del feed en este momento. Use el visor completo abajo o vuelva más tarde."
            : "We couldn’t load articles from the feed right now. Try again later or open the full KCM hub."}
        </p>
      </section>
    );
  }

  const headingClass =
    variant === "full"
      ? "text-2xl md:text-3xl font-bold text-slate-900"
      : "text-xl md:text-2xl font-bold text-slate-900";

  const title =
    locale === "en"
      ? "What should Las Vegas home buyers read this week?"
      : "¿Qué deberían leer los compradores de vivienda esta semana?";

  const intro =
    locale === "en"
      ? "These summaries come from your personalized Keeping Current Matters feed. Open an article to read it on KCM—we only show the headline and a short excerpt here."
      : "Estos resúmenes provienen de su feed personalizado de Keeping Current Matters (español). Abra un artículo para leerlo en el sitio de KCM; aquí solo mostramos el titular y un extracto.";

  const bridge =
    locale === "en" ? (
      <p className="text-center text-slate-700 max-w-3xl mx-auto mb-8 text-sm md:text-base">
        For{" "}
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          Spring Valley
        </Link>
        , Henderson, and the Las Vegas Valley, use these national themes as
        context—then{" "}
        <Link
          href="/contact"
          className="text-blue-600 font-medium hover:underline"
        >
          talk with your local agent
        </Link>{" "}
        about price, neighborhood, and negotiation.
      </p>
    ) : (
      <p className="text-center text-slate-700 max-w-3xl mx-auto mb-8 text-sm md:text-base">
        En{" "}
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          Spring Valley
        </Link>
        , Henderson y el valle de Las Vegas, use estos temas como contexto
        nacional y{" "}
        <Link
          href="/contact"
          className="text-blue-600 font-medium hover:underline"
        >
          hable con su agente local
        </Link>{" "}
        para aplicarlos a su precio, vecindario y negociación.
      </p>
    );

  return (
    <section
      className={
        variant === "compact"
          ? "mb-10 max-w-6xl mx-auto"
          : "mb-12 max-w-6xl mx-auto"
      }
      aria-labelledby="kcm-feed-heading"
      lang={locale === "en" ? "en" : "es"}
    >
      <h2 id="kcm-feed-heading" className={`${headingClass} text-center mb-3`}>
        {title}
      </h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-4 text-sm md:text-base">
        {intro}
      </p>
      {bridge}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.link}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {item.image ? (
                  <div className="relative overflow-hidden bg-slate-100">
                    <CardImage src={item.image} title={item.title} />
                  </div>
                ) : (
                  <div className="flex h-44 items-center justify-center bg-slate-100 text-slate-400 text-sm">
                    {locale === "en" ? "No image" : "Sin imagen"}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 line-clamp-3">
                    {item.title}
                  </h3>
                  {item.pubDate ? (
                    <time
                      className="mt-1 text-xs text-slate-500"
                      dateTime={item.pubDate}
                    >
                      {item.pubDate}
                    </time>
                  ) : null}
                  {item.excerpt ? (
                    <p className="mt-2 text-sm text-slate-600 line-clamp-4">
                      {item.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-auto pt-3 text-sm font-medium text-blue-600">
                    {locale === "en" ? "Read on KCM →" : "Leer en KCM →"}
                  </span>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
