"use client"

import React, { ChangeEvent, useEffect, useState } from "react";
import Hero from "../components/Home/HeroComponent";
import LearnPage from "../components/Home/LearnPageComponent";
// Función para verificar la autenticación
const checkAuthentication = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/auth/verify", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Usar el token de acceso desde localStorage
      },
      credentials: "include", // Enviar cookies relevantes si es necesario
    });

    if (response.ok) {
      const data = await response.json();
      return { accessToken: data, isAuthenticated: true };
    }
    return { isAuthenticated: false };
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false };
  }
};

// Componente principal HomePage
export default function HomePage() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // Llamar a la función asincrónica y actualizar el estado basado en su resultado
    const fetchAuth = async () => {
      const authState = await checkAuthentication(); // Llamar a la función para verificar la autenticación
      setAuth(authState.isAuthenticated);
    };
    fetchAuth();
  }, []);

  // Renderizar el componente basado en el estado de autenticación
  return auth ? <LearnPage /> : <Hero />;
}
