import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { cookieName, fallbackLng, languages } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req: NextRequest) {
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)!.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next") &&
    !req.nextUrl.pathname.startsWith("/adminvenkon") &&
    !req.nextUrl.pathname.startsWith("/logo-1.png") &&
    !req.nextUrl.pathname.startsWith("/api/revalidate")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  // Add CORS headers to the response
  const response = NextResponse.next();
  response.headers.append('Access-Control-Allow-Credentials', 'true');
  response.headers.append('Access-Control-Allow-Origin', '*'); // Allow from any origin
  response.headers.append('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT');
  response.headers.append('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer")!);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);

    return response;
  }

  return response;
}
