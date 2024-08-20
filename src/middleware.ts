import createMiddleware from "next-intl/middleware";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { locales } from "./i18n";
import { localePrefix } from "./navigation";

// Definir las rutas protegidas
const protectedRoutes = ["/home", "/profile", "/settings"];

// Middleware de autenticación

type CustomMiddleware = (req: NextRequest) => Promise<NextRequest>;
const customMiddleware: CustomMiddleware = async (req) => {
  console.log("Custom middleware executed before next-intl");
  return req;
};

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix,
});
const authMiddleware = withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  return intlMiddleware(req) as NextResponse;
});

// Middleware principal que maneja la lógica de autenticación e internacionalización
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
      // Si authMiddleware devuelve una respuesta, la retornamos
      return authResponse as NextResponse;
    }
  }

  // Siempre ejecutamos intlMiddleware
  return intlMiddleware(req) as NextResponse;
}

export const config = {
  matcher: [
    "/",
    "/(fr|en|ja|de|ru|es|fa|ar)/:path*",
    "/home",
    "/search/:path*",
    "/profile",
    "/settings",
    "/about",
    "/pricing",
    "/blog",
    "/contact",
  ],
};
