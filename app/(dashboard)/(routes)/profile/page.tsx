"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, ReactNode } from "react";
import { DatePicker } from "../../_components/date-picker";
import { User } from "@/types/user";
import { GenderRadioGroup } from "@/app/(dashboard)/_components/gender-radio-group";
import { toast, useToast } from "@/components/ui/use-toast";
import { getAccessToken } from "@auth0/nextjs-auth0";
interface FormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, children }) => (
  <div className="space-y-2">
    <Label className="" htmlFor={id}>
      {label}
    </Label>
    {children}
  </div>
);
export default function ProfileClient() {
  const { user, error, isLoading, checkSession } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ruta", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Error fetching data from API:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div className="w-full p-4 space-y-4 md:space-y-4 md:p-6">
          <h1 className="text-2xl">Profile</h1>

          <div className="flex items-center">
            <Avatar className="w-20 h-20 items-center justify-center cursor-pointer">
              <AvatarImage src="" alt="" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
            <input type="file" style={{ display: "none" }} accept="image/*" />
          </div>
          <FormField label="Name" id="name">
            <Input id="name" placeholder="John Doe" readOnly />
          </FormField>
          <FormField label="Username" id="username">
            <Input id="username" placeholder="johndoe123" readOnly />
          </FormField>
          <FormField label="Bio" id="bio">
            <Textarea
              id="bio"
              placeholder="Enter your bio"
              className="min-h-[100px]"
              defaultValue=""
            />
          </FormField>
          <FormField label="Location" id="location">
            <Input
              id="location"
              placeholder="San Francisco, CA"
              defaultValue=""
            />
          </FormField>
          <FormField label="Birthday" id="birthday">
            <DatePicker />
          </FormField>
          <FormField label="Phone" id="phone">
            <Input
              id="phone"
              placeholder="(123) 456-7890"
              type="tel"
              defaultValue=""
            />
          </FormField>
          <FormField label="Gender" id="gender">
            <GenderRadioGroup />
          </FormField>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                toast({
                  title: "Profile updated",
                  description: "Your changes have been saved.",
                });
              }}
              size={"lg"}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    )
  );
}