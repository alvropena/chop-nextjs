import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Logger } from "./logger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Función para verificar la autenticación
export const checkAuthentication = async () => {
  try {
    const response = await fetch(`${baseUrl}/Prod/api/v1/auth/verify-with`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include", // Enviar cookies relevantes si es necesario
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("sessionToken", data); // Guarda el token en localStorage si es necesario
      return { accessToken: data, isAuthenticated: true };
    }
    return { isAuthenticated: false };
  } catch (error) {
    Logger.error("Error checking authentication:", error);
    return { isAuthenticated: false };
  }
};

export const logoutAndClearLocalStorage = async () => {
  try {
    // URL del endpoint de logout
    const logoutUrl = `${baseUrl}/Prod/api/v1/logout`;

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
      Logger.info(
        "Logout successful and accessToken removed from localStorage."
      );
    } else {
      // Manejar la situación si la respuesta no es exitosa
      const errorData = await response.json();
      Logger.error("Logout failed:", errorData);
    }
  } catch (error) {
    // Manejar errores de red u otros errores
    Logger.error("An error occurred during logout:", error);
  }
};

export async function getData() {
  const res = await fetch("/api/ruta");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getToken() {
  const res = await fetch(`http://localhost:3000/api/ruta`);
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// utils/api.js

export const createThread = async (
  sessionToken: string,
  promptData: { text: string },
  user_input_generation: string,
  lang: string
) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/threads/create?prompt_settings=${user_input_generation}&lang=${lang}&token=${sessionToken}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promptData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const sendPromptToThread = async (
  sessionToken: string,
  prompt_id: number,
  user_input_generation: string,
  lang: string
) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/threads/continue?prompt_id=${prompt_id}&prompt_settings=${user_input_generation}&lang=${lang}&token=${sessionToken}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const updateOption = async (
  optionId: number,
  sessionToken: string,
  isSelected: boolean
) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/options/option/${optionId}/is-selected?token=${sessionToken}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_selected: isSelected }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getThreadsHistory = async (accessToken: string) => {
  const url = `${baseUrl}/api/v1/prompts/history?token=${accessToken}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const sendOptionTyped = async (
  sessionToken: string,
  question_id: number,
  option_text: string,
  lang: string
) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/options/question/${question_id}/option-typed?lang=${lang}&token=${sessionToken}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option_text: option_text }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
