import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isValidZip,
  PREFERRED_ZIP_COOKIE,
  PREFERRED_ZIP_MAX_AGE_SEC,
} from "@/lib/preferred-zip";

/**
 * GSC "Alternate page with proper canonical tag" was filled with /search?zip= and
 * /contact?zip= variants. Those are not unique pages — 301 them to the clean URL
 * and keep zip context in a short-lived cookie for on-page banners.
 */
const ZIP_PATHS = new Set(["/search", "/contact"]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
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
  matcher: ["/search", "/contact"],
};
