import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth/lucia";

export async function GET(req: NextRequest): Promise<Response> {
  const sessionId = req.cookies.get(lucia.sessionCookieName)?.value ?? null;

  // no cookie exists
  if (!sessionId) {
    return NextResponse.json({ valid: false });
  }

  const { session } = await lucia.validateSession(sessionId);

  if (!session) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true });
}
