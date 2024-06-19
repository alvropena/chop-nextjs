import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chop",
  description: "Learn quicker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <Head>
        <title>{"Chop"}</title>
        <meta name="description" content={"Learn quicker."} />
      </Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// import React, { useEffect, useState } from "react";
// import Hero from "./HeroComponent";
// import LearnPage from "./LearnPageComponent";

// const HomePage = () => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
//   const [auth, setAuth] = useState(false);

//   useEffect(() => {
//     // Llamar a la función asincrónica y actualizar el estado basado en su resultado
//     const fetchAuth = async () => {
//       const authState = await checkAuthentication();
//       setAuth(authState.isAuthenticated);
//     };
//     fetchAuth();
//   }, []);

//   // Función para verificar la autenticación
//   const checkAuthentication = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/api/v1/auth/verify`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Usar el token de acceso desde localStorage
//         },
//         credentials: "include", // Enviar cookies relevantes si es necesario
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("sessionToken", data); // Guarda el token en localStorage si es necesario
//         return { accessToken: data, isAuthenticated: true };
//       }
//       return { isAuthenticated: false };
//     } catch (error) {
//       console.error("Error checking authentication:", error);
//       return { isAuthenticated: false };
//     }
//   };
//
//   // Renderizar el componente basado en el estado de autenticación
//   return (
//     <div>
//       {auth ? <LearnPage /> : <Hero />}
//       {/* Botón de logout solo visible cuando el usuario está autenticado */}
//       {auth && <button onClick={logOutUser}>Log Out</button>}
//     </div>
//   );
// };

// export default HomePage;

