import { lucia, validateRequest } from "@/lib/auth/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { HttpStatus } from "@/server/http-status-codes";

export async function GET(): Promise<Response> {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session } = await validateRequest();
  if (!session) {
    return NextResponse.json(
      { redirectTo: "/sign-in" },
      { status: HttpStatus.OK }
    );
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return NextResponse.json(
    { redirectTo: "/sign-in" },
    { status: HttpStatus.OK }
  );
}
