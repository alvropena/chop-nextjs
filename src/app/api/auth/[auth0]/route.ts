import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import axios from "axios";
const afterCallback = async (req: any, session: any, state: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    // Enviar una solicitud POST al endpoint especificado con el contenido de session.user
    const response = await axios.post(
      `${baseUrl}/api/user/?secret_key=${process.env.AUTH0_SECRET}`,
      session.user,
      {
        headers: {
          "Content-Type": "application/json", // Asegura que el contenido se envíe como JSON
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al enviar la solicitud POST:", error.message);
    } else {
      console.error("Error inesperado:", error);
    }
  }

  return session;
};
export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/",
  }),
  callback: handleCallback({ afterCallback }),
});
