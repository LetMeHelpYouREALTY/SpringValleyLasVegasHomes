/** Default Calendly event for private showings / consultations. */
export const CALENDLY_SHOWING_URL =
  "https://calendly.com/drjanduffy/showing";

export const CALENDLY_APPOINTMENT_URL =
  "https://calendly.com/drjanduffy/appointment";

/**
 * Resolve a Calendly URL. Relative slugs like "showing" must become absolute
 * calendly.com URLs — otherwise the embed loads /showing on *this* site (404 in GSC).
 */
export function resolveCalendlyUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const slug = trimmed.replace(/^\/+/, "");
  return `https://calendly.com/drjanduffy/${slug}`;
}
