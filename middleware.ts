import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export default withMiddlewareAuthRequired();
export const config = {
  matcher: ["/home", "/profile", "/history", "/billing", "/settings"],
};
