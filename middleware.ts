import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n";
import { localePrefix } from "./navigation";
import { cookies } from "next/headers";
import { HttpStatus } from "@/server/http-status-codes";

// Define the protected routes
const protectedRoutes = ["/home", "/settings", "/notifications", "/explore"];
const protectedApiRoutes = ["/api/protected-route"];
const authRoutes = [
  "/sign-in",
  "/sign-in/forgot-password",
  "/sign-in/magic",
  "/sign-in/magic/sent",
  "/sign-in/magic/error",
  "/sign-up",
  "/reset-password",
  "/verify-success",
  "/",
];

// Middleware for internationalization
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix,
});

// Main middleware that handles authentication and internationalization logic
export default async function middleware(
  req: NextRequest
): Promise<NextResponse> {
  const pathname = req.nextUrl.pathname;
  const origin = req.nextUrl.origin;

  const isProtectedApiRoute = protectedApiRoutes.some((route) =>
    pathname.includes(route)
  );
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // this is just an workaround to handle the auth verification
  // inside the middleware - Since the middleware is "edge only"
  // we have to call an internal api endpoint to run the lucia magic
  const verifyRequest = await fetch(`${origin}/api/auth/verify-session`, {
    // without this, we can't check the cookie in the called api route
    headers: { Cookie: cookies().toString() },
    cache: "no-cache",
  });

  const verifySession = (await verifyRequest.json()) as {
    valid: boolean;
  };

  if (verifySession.valid && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Just to make sure users don't try to access blog page or pricing page
  if (pathname === "/blog") {
    return NextResponse.redirect(new URL("/#blog", req.url));
  }
  if (pathname === "/pricing") {
    return NextResponse.redirect(new URL("/#pricing", req.url));
  }

  // Check for protected API routes
  if (isProtectedApiRoute) {
    if (!verifySession.valid) {
      return NextResponse.json(
        {
          error: "Unauthorized API request",
        },
        { status: HttpStatus.UNAUTHORIZED }
      );
    }
  }

  // Check for protected page routes
  if (isProtectedRoute) {
    if (!verifySession.valid) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // intl should run on specific routes
  if (!pathname.includes("api")) {
    return intlMiddleware(req) as NextResponse;
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/((?!about|settings|home|search|notifications|followers|following|pricing|blog|c|contact|sign-up|sign-in|reset-password|favicon.ico)[^/]+)", // Matcher for /[username] pattern
    "/(en|ja|es|ind)/:path*",
    "/home",
    "/search/:path*",
    "/notifications",
    "/:path*/followers",
    "/:path*/following",
    "/settings",
    "/about",
    "/pricing/:path*",
    "/blog/:path*",
    "/c/:path*",
    "/contact",
    "/sign-up",
    "/sign-in/:path*",
    "/reset-password",
    "/verify-success",
    "/api/protected-route", //for testing
  ],
};
