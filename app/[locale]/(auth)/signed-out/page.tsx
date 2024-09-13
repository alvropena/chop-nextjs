"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function SignedOutPage() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="space-y-6 py-24">
      <h1 className="text-3xl font-bold">Successfully Signed Out</h1>
      <p className="text-xl">
        You have been successfully signed out. You can now sign in to your
        account.
      </p>

      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
