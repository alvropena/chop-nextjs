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
import { GenderRadioGroup } from "@/app/(dashboard)/_components/gender-radio-group";
import { toast } from "@/components/ui/use-toast";
import { Logger } from "@/lib/logger";
import { useUserStore } from "@/providers/user-store-provider";

interface FormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
}

async function getData() {
  const res = await fetch("/api/ruta");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const FormField: React.FC<FormFieldProps> = ({ label, id, children }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    {children}
  </div>
);

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const { user: userStore } = useUserStore((state) => state);
  console.log(userStore);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <div className="w-full p-4 space-y-4 md:space-y-4 md:p-6">
          <h1 className="text-2xl">Profile</h1>

          <div className="flex items-center">
            <Avatar className="w-20 h-20 items-center justify-center cursor-pointer">
              <AvatarImage
                src={user.picture ?? "/default-avatar.png"}
                alt={user.nickname ?? "User"}
              />
              <AvatarFallback>
                {user.name ? user.name.substring(0, 2).toUpperCase() : "NA"}
              </AvatarFallback>
            </Avatar>
            <input type="file" style={{ display: "none" }} accept="image/*" />
          </div>
          <FormField label="Name" id="name">
            <Input id="name" placeholder={user.name ?? "No name"} />
          </FormField>
          <FormField label="Username" id="username">
            <Input
              id="username"
              placeholder={user.nickname ?? "No nickname"}
              readOnly
            />
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
