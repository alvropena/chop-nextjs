import createMiddleware from "next-intl/middleware";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { locales } from "./i18n";
import { localePrefix } from "./navigation";

// Define the protected routes
const protectedRoutes = ["/home", "/settings", "/notifications", "/explore"];

// Authentication middleware
type CustomMiddleware = (req: NextRequest) => Promise<NextRequest>;
const customMiddleware: CustomMiddleware = async (req) => {
  console.log("Custom middleware executed before next-intl");
  return req;
};

// Middleware for internationalization
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix,
});

// Middleware for authentication with internationalization support
const authMiddleware = withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  return intlMiddleware(req) as NextResponse;
});

// Main middleware that handles authentication and internationalization logic
export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
): Promise<NextResponse> {
  const url = new URL(req.url);

  await customMiddleware(req);

  if (protectedRoutes.some((route) => url.pathname.includes(route))) {
    console.log("This route is protected");
    const authResponse = await authMiddleware(req, event);
    if (authResponse) {
      // If authMiddleware returns a response, return it
      return authResponse as NextResponse;
    }
  }

  // Always execute intlMiddleware
  return intlMiddleware(req) as NextResponse;
}

export const config = {
  matcher: [
    "/",
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
    "/contact",
  ],
};
