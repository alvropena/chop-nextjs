"use client";

import React, { useEffect, useState } from "react";
import Hero from "../components/Home/HeroComponent"; // Asegúrate de que la ruta al componente Hero sea correcta
import LearnPage from "../components/Home/LearnPageComponent"; // Asegúrate de que la ruta al componente LearnPage sea correcta

// Función para verificar la autenticación
const checkAuthentication = async () => {
  try {
    const response = await fetch(`http://${process.env.API_BASE_URL}/api/v1/auth/verify`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Usar el token de acceso desde localStorage
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
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false };
  }
};

const HomePage = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // Llamar a la función asincrónica y actualizar el estado basado en su resultado
    const fetchAuth = async () => {
      const authState = await checkAuthentication();
      setAuth(authState.isAuthenticated);
    };
    fetchAuth();
  }, []);

  const logOutUser = async () => {
    try {
      const url = `http://${process.env.API_BASE_URL}/api/v1/logout/`
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Enviar cookies relevantes si es necesario
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);

      // Eliminar el sessionToken y accessToken del localStorage
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("accessToken");

      // Recargar la página para actualizar el estado de autenticación
      window.location.reload(); // Recargar la página actual

      return result;
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Renderizar el componente basado en el estado de autenticación
  return (
    <div>
      {auth ? <LearnPage /> : <Hero />}
      {/* Botón de logout solo visible cuando el usuario está autenticado */}
      {auth && <button onClick={logOutUser}>Log Out</button>}
    </div>
  );
};

export default HomePage;
