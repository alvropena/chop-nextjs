import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Pricing
            </h1>
            <p className="mt-4 text-muted-foreground">
              Choose the plan that&apos;s right for you.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Individual</h3>
              <p className="mt-4 text-muted-foreground">
                Ideal for solo users. Are you a student?{" "}
                <Link
                  href="/student-discount"
                  className="text-primary underline"
                >
                  Get a discount.
                </Link>
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  $12
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Family</h3>
              <p className="mt-4 text-muted-foreground">
                Best for families of up to six members.
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  $24
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="mt-4 text-muted-foreground">
                Tailored solutions for large businesses and organizations.
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  Let’s Talk
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}
