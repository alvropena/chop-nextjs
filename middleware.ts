import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const checkAuthentication = async (token: string) => {
  try {
    const response = await fetch(`http://${baseUrl}/Prod/api/v1/auth/verify`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return { accessToken: data, isAuthenticated: true };
    }

    console.error("Response status:", response.status, response.statusText);
    const errorData = await response.json();
    console.error("Error data:", errorData);

    return { isAuthenticated: false };
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false };
  }
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value ?? "";

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { isAuthenticated } = await checkAuthentication(token);

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/profile", "/history", "/billing", "/settings"],
};
