import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MagicLinkPage() {
  return (
    <div className="w-full space-y-6 py-24">
      <h1 className="text-3xl font-bold">Expired Token</h1>
      <p className="text-xl">
        Sorry, this token was either expired or already used. Please try logging
        in again
      </p>

      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
