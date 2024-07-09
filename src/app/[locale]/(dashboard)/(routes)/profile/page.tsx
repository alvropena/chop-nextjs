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
import { DatePicker } from '../../_components/date-picker'
import { GenderRadioGroup } from '@/app/[locale]/(dashboard)/_components/gender-radio-group'

import axios from 'axios'
import { type ProfileFormData, profileSchema } from '@/zod/validation-schema'
import { Logger } from '@/lib/logger'
import { getData } from '@/lib/utils'

interface FormFieldProps {
  label: string
  id: string
  children: React.ReactNode
}

const FormField: React.FC<FormFieldProps> = ({ label, id, children }) => (
  <div className='space-y-2'>
    <Label htmlFor={id}>{label}</Label>
    {children}
  </div>
)

export default function ProfileClient() {
  const { user, error, isLoading } = useUser()
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = methods

  const onSubmit = async (data: ProfileFormData) => {
    console.log(data);
    Logger.info(data);
    const token = await getData();
    console.log(token);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user/me?token=${token.accessToken}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast({
      title: "Profile updated",
      description: "Your changes have been saved.",
    });
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Assuming getData returns an object with an accessToken.
        const tokenData = await getData();
        const response = await axios.get(
          `${baseUrl}/api/v1/user/profile-user/me?token=${tokenData.accessToken}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const profileData = response.data;
        reset({
          name: profileData.name ?? "",
          bio: profileData.bio ?? "",
          location: profileData.location ?? "",
          birthday: profileData.birthday
            ? new Date(profileData.birthday)
            : undefined,
          gender: profileData.gender ?? "",
          phone: profileData.phone_number ?? "5555555555",
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>

  return (
    user && (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-1 w-full space-y-4 p-4 md:space-y-4 md:p-6">
            <h1 className="text-2xl">Profile</h1>
            <div className="flex items-center">
              <Avatar className="h-20 w-20 cursor-pointer items-center justify-center">
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
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </FormField>
            <FormField label="Username" id="username">
              <Input
                id="username"
                placeholder={user.nickname ?? "No nickname"}
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
                <p className="mt-1 text-sm text-red-500">
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
                <p className="mt-1 text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </FormField>
            <FormField label="Birthday" id="birthday">
              <DatePicker name="birthday" />
              {errors.birthday && (
                <p className="mt-1 text-sm text-red-500">
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
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </FormField>
            <FormField label="Gender" id="gender">
              <GenderRadioGroup name="gender" />
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">
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
