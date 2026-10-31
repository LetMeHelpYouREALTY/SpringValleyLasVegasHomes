import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isValidZip,
  PREFERRED_ZIP_COOKIE,
  PREFERRED_ZIP_MAX_AGE_SEC,
} from "@/lib/preferred-zip";

/** Canonical production host (matches siteConfig.url / GSC property). */
const CANONICAL_HOST = "www.springvalleylasvegashomes.com";
const APEX_HOST = "springvalleylasvegashomes.com";

/**
 * GSC "Page with redirect" for http(s)://apex and http://www is expected —
 * those hosts must permanently land on https://www. Prefer 301 (not 307) so
 * Google consolidates ranking signals on the www property.
 *
 * Also strips /search?zip= and /contact?zip= to clean paths (cookie keeps UX),
 * and strips Calendly embed query junk from /showing.
 */
const ZIP_PATHS = new Set(["/search", "/contact"]);
const EMBED_QUERY_KEYS = ["embed_domain", "embed_type"];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const { pathname, searchParams } = request.nextUrl;

  // Apex → www (permanent). Covers https://apex; http://apex is usually
  // upgraded to https by the platform first, then this hop runs.
  if (host === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 301);
  }

  // Junk short path from GSC 404s — send to homepage permanently.
  if (pathname === "/mo") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  // Literal SearchAction template crawled by Google:
  // /listings?q={search_term_string}
  if (pathname === "/listings") {
    const q = searchParams.get("q");
    if (q && (q.includes("{") || q.includes("search_term_string"))) {
      const url = request.nextUrl.clone();
      url.search = "";
      return NextResponse.redirect(url, 301);
    }
  }

  // Calendly mis-embed used relative "showing" and produced
  // /showing?embed_domain=...&embed_type=Inline — keep clean /showing only.
  if (pathname === "/showing") {
    let dirty = false;
    const url = request.nextUrl.clone();
    for (const key of EMBED_QUERY_KEYS) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        dirty = true;
      }
    }
    if (dirty) {
      return NextResponse.redirect(url, 301);
    }
  }

  if (!ZIP_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const zip = searchParams.get("zip");
  if (!isValidZip(zip)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.searchParams.delete("zip");

  const response = NextResponse.redirect(url, 301);
  response.cookies.set(PREFERRED_ZIP_COOKIE, zip, {
    path: "/",
    maxAge: PREFERRED_ZIP_MAX_AGE_SEC,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
