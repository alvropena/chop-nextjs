"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const getProfile = async (sessionToken: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  try {
    const url = `http://${baseUrl}/api/v1/user/profile-user/me`;
    const response = await fetch(url, {
      method: "GET", // Cambiado a POST ya que generalmente se usa para enviar datos
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`, // Incluir el token en el encabezado Authorization
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Response from server:", result);
    return result;
  } catch (error) {
    console.error("Failed to send prompt:", error);
  }
};

export default function Component() {
  const [sessionToken, setSessionToken] = useState<string>("");

  useEffect(() => {
    // Obtener el sessionToken del localStorage y guardarlo en el estado
    const storedToken = localStorage.getItem("sessionToken");
    if (storedToken) {
      setSessionToken(storedToken);
    }
  }, []);
  useEffect(() => {
    // Llamar a la función asincrónica y actualizar el estado basado en su resultado
    const fetchAuth = async () => {
      const authState = await getProfile(sessionToken);
    };
    fetchAuth();
  }, [sessionToken]);

  return (
    <div className="w-full max-w-3xl">
      <div className="items-center gap-4">
        <div className="space-y-1">
          <Avatar className="items-center justify-center w-20 h-20">
            <div>AP</div>
          </Avatar>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information.</CardDescription>
        </div>
      </div>
      <div className="gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value="Alex Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value="alexdoe99" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthday">Birthday</Label>
            <Input id="birthday" type="date" value="1990-01-01" />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <div className="space-x-4">
              <Label htmlFor="gender-male" className="cursor-pointer">
                <Input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value="male"
                  className="form-radio"
                />
                Male
              </Label>
              <Label htmlFor="gender-female" className="cursor-pointer">
                <Input
                  id="gender-female"
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-radio"
                />
                Female
              </Label>
              <Label htmlFor="gender-other" className="cursor-pointer">
                <Input
                  id="gender-other"
                  type="radio"
                  name="gender"
                  value="other"
                  className="form-radio"
                />
                Other
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Enter your bio"
              className="min-h-[100px]"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter your location" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="social">Social</Label>
            <Input id="social" placeholder="Enter your social media handles" />
            <div>Enter your social media handles separated by a comma.</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              type="tel"
            />
          </div>
        </div>
      </div>

      <Button size="sm">Save</Button>
    </div>
  );
}
