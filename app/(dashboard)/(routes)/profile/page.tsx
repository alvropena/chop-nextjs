"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, ReactNode } from "react";
import { DatePicker } from "../../_components/date-picker";
import { User } from "@/types/user";
import { GenderRadioGroup } from "@/app/(dashboard)/_components/gender-radio-group"

const getUser = async (sessionToken: string): Promise<User | undefined> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const url = `${baseUrl}/Prod/api/v1/user/profile-user/me`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: User = await response.json();
    return result;
  } catch (error) {}
};

interface FormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, children }) => (
  <div className="space-y-2">
    <Label className="" htmlFor={id}>{label}</Label>
    {children}
  </div>
);

export default function Profile() {
  const [sessionToken, setSessionToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("sessionToken");
    if (storedToken) {
      setSessionToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchAuth = async () => {
      if (sessionToken) {
        const authState = await getUser(sessionToken);
        setUser(authState || null);
      }
    };
    fetchAuth();
  }, [sessionToken]);

  return (
    <div className="w-full p-4 space-y-4 md:space-y-4 md:p-6">
      <h1 className="text-2xl">Profile</h1>
      <div className="flex items-center">
        <Avatar className="w-20 h-20 items-center justify-center">
          <div>AP</div>
        </Avatar>
      </div>
      <FormField label="Name" id="name">
        <Input id="name" placeholder="John Doe" readOnly />
      </FormField>
      <FormField label="Username" id="username">
        <Input id="username" placeholder="johndoe123" readOnly />
      </FormField>
      <FormField label="Bio" id="bio">
        <Textarea id="bio" placeholder="Enter your bio" className="min-h-[100px]" defaultValue="" />
      </FormField>
      <FormField label="Location" id="location">
        <Input id="location" placeholder="San Francisco, CA" defaultValue="" />
      </FormField>
      <FormField label="Birthday" id="birthday">
        <DatePicker />
      </FormField>
      <FormField label="Phone" id="phone">
        <Input id="phone" placeholder="(123) 456-7890" type="tel" defaultValue="" />
      </FormField>
      <FormField label="Gender" id="gender">
        <GenderRadioGroup />
      </FormField>
      <div className="flex justify-end">
        <Button>Save</Button>
      </div>
    </div>
  );
}
