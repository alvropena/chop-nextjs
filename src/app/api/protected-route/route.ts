import { NextResponse } from "next/server";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

// This GET function is protected by Auth0 and requires the user to be authenticated.
const GET = withApiAuthRequired(async function GET(req) {
  const res = new NextResponse();

  // Retrieve the access token for the authenticated user
  const { accessToken } = await getAccessToken(req, res);

  // Return the access token as a JSON response
  return NextResponse.json({ accessToken }, res);
});

export { GET };
