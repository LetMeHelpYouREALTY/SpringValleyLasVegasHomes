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
 * Also strips /search?zip= and /contact?zip= to clean paths (cookie keeps UX).
 */
const ZIP_PATHS = new Set(["/search", "/contact"]);

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
