import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OauthLoginButtonsProps {
  isMagicLinkPage?: boolean;
}

export function OauthLoginButtons({ isMagicLinkPage }: OauthLoginButtonsProps) {
  return (
    <>
      <div className="relative flex justify-center py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <span className="px-2 bg-background uppercase">Or continue with</span>
        </div>
      </div>
      <Button asChild variant="secondary" className="w-full">
        <Link href="/api/auth/sign-in/google">
          <Image
            src="/images/google-logo.svg"
            width={20}
            height={20}
            alt="Google Logo"
            className="mr-2 h-5 w-5"
          />
          Sign in with Google
        </Link>
      </Button>
      {isMagicLinkPage ? (
        <Button asChild variant="secondary" className="w-full">
          <Link href="/sign-in">
            <Mail className="mr-2 h-5 w-5" />
            Sign in with Email and Password
          </Link>
        </Button>
      ) : (
        <Button asChild variant="secondary" className="w-full">
          <Link href="/sign-in/magic">
            <Mail className="mr-2 h-5 w-5" />
            Sign in with Email
          </Link>
        </Button>
      )}
    </>
  );
}
