"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, PenIcon } from "lucide-react";
import Image from "next/image";

import { Prompt } from "@/types/types";
import Footer from "@/app/(dashboard)/_components/footer";
// Componente Hero
const Hero = () => {
  const loginUser = async () => {
    const url = "http://localhost:8000/api/v1/auth/login";
    const data = {
      email: "correo9@gmail.com", // Reemplaza con el correo deseado
      password: "Pandita98+", // Reemplaza con la contraseña deseada
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Login successful:", result);

      // Guardar el token en localStorage
      localStorage.setItem("accessToken", result.access_token);
      // Redirigir o actualizar el estado global según sea necesario
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <span className="">Chop</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button onClick={loginUser}>Sign In</Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center text-center py-12 md:py-24 lg:py-32 border-b">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Learn quicker.
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl dark:text-gray-400">
            The first generative learning platform.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button
              onClick={loginUser}
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hero;
