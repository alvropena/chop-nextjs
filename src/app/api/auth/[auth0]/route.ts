import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import axios from "axios";

const afterCallback = async (req: any, session: any, state: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    // Send the user data from the session to the API for processing
    const response = await axios.post(
      `${baseUrl}/api/user/?secret_key=${process.env.AUTH0_SECRET}`,
      session.user,
      {
        headers: {
          "Content-Type": "application/json", // Ensure the request body is in JSON format
        },
      }
    );

    // Handle the response if needed (removed logging of sensitive data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to send POST request:", error.message); // Log any request errors
    } else {
      console.error("An unexpected error occurred:", error); // Log unexpected errors
    }
  }

  return session; // Return the session to complete the authentication flow
};

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/home", // Redirect the user to the home page after login
  }),
  callback: handleCallback({ afterCallback }), // Execute afterCallback after the Auth0 callback
});
