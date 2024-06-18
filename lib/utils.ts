import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Función para verificar la autenticación
export const checkAuthentication = async () => {
  try {
    const response = await fetch(
      `http://${baseUrl}/Prod/api/v1/auth/verify-with`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include", // Enviar cookies relevantes si es necesario
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("sessionToken", data); // Guarda el token en localStorage si es necesario
      return { accessToken: data, isAuthenticated: true };
    }
    return { isAuthenticated: false };
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false };
  }
};

export const logoutAndClearLocalStorage = async () => {
  try {
    // URL del endpoint de logout
    const logoutUrl = `${baseUrl}Prod/api/v1/logout`;

    // Realizar la solicitud al endpoint de logout
    const response = await fetch(logoutUrl, {
      method: "GET", // Usualmente, las solicitudes de logout usan el método POST
      headers: {
        "Content-Type": "application/json", // Ajustar si el servidor espera otro tipo de contenido
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Si es necesario pasar el token de acceso
      },
      credentials: "include",
    });

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      // Eliminar el ítem del localStorage
      localStorage.removeItem("sessionToken");
      console.log(
        "Logout successful and accessToken removed from localStorage."
      );
    } else {
      // Manejar la situación si la respuesta no es exitosa
      const errorData = await response.json();
      console.error("Logout failed:", errorData);
    }
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error("An error occurred during logout:", error);
  }
};
