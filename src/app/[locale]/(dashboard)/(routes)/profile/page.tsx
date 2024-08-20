'use client'

import { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { DatePicker } from '@/components/date-picker'
import { GenderRadioGroup } from '@/components/gender-radio-group'

import axios from 'axios'
import { type ProfileFormData, profileSchema } from '@/zod/validation-schema'
import { Logger } from '@/lib/logger'
import { getData } from '@/lib/utils'
import Loading from '@/app/[locale]/loading'
import { useTranslations } from "next-intl";

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
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const t = useTranslations("");
    const methods = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = methods;

    const onSubmit = async (data: ProfileFormData) => {
        try {
            const response = await axios.put(
                `${baseUrl}/api/user/me?user_id=${user?.sub}`,
                data
            );
            Logger.info(data);
            toast({
                title: t("Profile_updated"),
                description: t("Your_changes_have_been_saved"),
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                title: t("Error"),
                description: t("An_error_occurred_while_updating_your_profile"),
            });
        }
    };

    useEffect(() => {
        async function fetchProfile() {
            try {
              // Assuming getData returns an object with an accessToken.
              const response = await axios.get(
                `${baseUrl}/api/user/profile-user/me?user_id=${user?.sub}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(response.data);

              const profileData = response.data;
              reset({
                name: profileData.name ?? "",
                bio: profileData.bio ?? "",
                username: profileData.username ?? "",
                location: profileData.location ?? "",
                birthday: profileData.birthday
                  ? new Date(profileData.birthday)
                  : undefined,
                gender: profileData.gender ?? "",
                phone: profileData.phone_number ?? "",
              });
            } catch (error) {
                console.error(error);
            }
        }

        if (user) {
            fetchProfile();
        }
    }, [user]);

    if (isLoading) return <Loading />;

    return (
      user && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center min-h-screen">
              <div className="flex flex-col flex-1 w-full max-w-md justify-center space-y-4 p-4 md:p-6">
                <h1 className="text-2xl">Profile</h1>
                <div className="flex items-center">
                  <Avatar className="h-20 w-20 cursor-pointer items-center justify-center">
                    <AvatarImage
                      src={user.picture ?? "/default-avatar.png"}
                      alt={user.nickname ?? "User"}
                    />
                    <AvatarFallback>
                      {user.name
                        ? user.name.substring(0, 2).toUpperCase()
                        : "NA"}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </div>
                <FormField label={t("Name")} id="name">
                  <Input
                    id="name"
                    placeholder={t("Enter_your_name")}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </FormField>

                <FormField label={t("Username")} id="username">
                  <Input
                    id="username"
                    placeholder={t("Enter_your_username")}
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </FormField>

                <FormField label={t("Bio")} id="bio">
                  <Textarea
                    id="bio"
                    placeholder={t("Enter_your_bio")}
                    className="min-h-[100px]"
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.bio.message}
                    </p>
                  )}
                </FormField>

                <FormField label={t("Location")} id="location">
                  <Input
                    id="location"
                    placeholder={t("Enter_your_location")}
                    {...register("location")}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </FormField>

                <FormField label={t("Birthday")} id="birthday">
                  <DatePicker name="birthday" />
                  {errors.birthday && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.birthday.message}
                    </p>
                  )}
                </FormField>

                <FormField label={t("Phone")} id="phone">
                  <Input
                    id="phone"
                    placeholder={t("Enter_your_phone_number")}
                    type="tel"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </FormField>

                <FormField label={t("Gender")} id="gender">
                  <GenderRadioGroup name="gender" />
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </FormField>
                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    {t("Save_Changes")}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      )
    );
}
