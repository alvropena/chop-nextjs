"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function ProfilePage() {
  // Inline useLocalePath logic
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const getLocalizedPath = (path: string) => `/${locale}${path}`;

  return (
    <div className="flex justify-center h-fit bg-background text-foreground p-8">
      <div className="flex flex-col space-y-6 w-full max-w-md">
      <div className='flex flex-row'>
        {/* Profile Picture */}
        <div className="relative">
          <Image
            src="/cristiano.jpg"
            alt="Profile"
            width={70}
            height={50}
            className='rounded-full'
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 ml-4">
          <h2 className="text-2xl font-bold">alvropena</h2>
          <p className="text-gray-500">Alvaro Peña</p>
          <p className="text-sm">can’t rush greatness</p>
        </div>

        {/* Settings Icon */}
        <div className="ml-4">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-4 flex justify-around border-t pt-4">
        <div className="text-center">
          <span className="block text-lg font-bold">5</span>
          <span className="text-sm text-gray-500">Streak</span>
        </div>
        <Link href={getLocalizedPath('/profile/followers')} className="flex flex-col items-center justify-center">
          <div className="text-center cursor-pointer">
            <span className="block text-lg font-bold">442</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
        </Link>
        <Link href={getLocalizedPath('/profile/following')} className="flex flex-col items-center justify-center">
          <div className="text-center cursor-pointer">
            <span className="block text-lg font-bold">423</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </Link>
      </div>

      {/* Profile Actions */}
      <div className="mt-4 flex space-x-2">
        <Link href={getLocalizedPath('/profile/edit')} className="flex-1">
          <Button className="w-full py-2">
            Edit Profile
          </Button>
        </Link>
        {/* <Link href={getLocalizedPath('/profile/analytics')} className="flex-1">
        <Button className="w-full py-2">
            View Analytics
          </Button>
        </Link> */}
      </div>

      {/* Statistics Section */}
      <div className="mt-6 p-4 flex-grow bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Information</h3>
        <div className="mt-4 flex justify-around">
          <p>No activity yet.</p>
        </div>
      </div>
      </div>
    </div>
  );
}
