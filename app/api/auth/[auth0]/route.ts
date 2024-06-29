import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import axios from "axios";
const afterCallback = async (req: any, session: any, state: any) => {
  try {
    // Enviar una solicitud POST al endpoint especificado con el contenido de session.user
    const response = await axios.post(
      `http://localhost:8000/Prod/api/v1/user/?secret_key=${process.env.AUTH0_SECRET}`,
      session.user,
      {
        headers: {
          "Content-Type": "application/json", // Asegura que el contenido se envíe como JSON
        },
      }
    );
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
    returnTo: "/home",
  }),
  callback: handleCallback({ afterCallback }),
});
