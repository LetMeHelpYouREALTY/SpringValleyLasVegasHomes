/** Cookie used to pass zip context without crawlable query-string URLs. */
export const PREFERRED_ZIP_COOKIE = "sv_preferred_zip";

/** 24 hours — long enough for a search → contact session. */
export const PREFERRED_ZIP_MAX_AGE_SEC = 60 * 60 * 24;

export function isValidZip(zip: string | undefined | null): zip is string {
  return typeof zip === "string" && /^\d{5}$/.test(zip);
}

export function preferredZipFromCookie(value: string | undefined): string | null {
  return isValidZip(value) ? value : null;
}
