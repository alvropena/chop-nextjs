"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/providers/user-store-provider";
import { type ProfileFormData, profileSchema } from "@/zod/validation-schema";
import { DatePicker } from "../../_components/date-picker";
import { GenderRadioGroup } from "@/app/(dashboard)/_components/gender-radio-group";

interface FormFieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
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
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved.",
    });
  };

  return (
    user && (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <Input
                id="name"
                placeholder={user.name ?? "No name"}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
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
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </FormField>
            <FormField label="Location" id="location">
              <Input
                id="location"
                placeholder="San Francisco, CA"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </FormField>
            <FormField label="Birthday" id="birthday">
              <DatePicker name="birthday" />
              {errors.birthday && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.birthday.message}
                </p>
              )}
            </FormField>
            <FormField label="Phone" id="phone">
              <Input
                id="phone"
                placeholder="(123) 456-7890"
                type="tel"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </FormField>
            <FormField label="Gender" id="gender">
              <GenderRadioGroup name="gender" />
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </FormField>
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    )
  );
}
