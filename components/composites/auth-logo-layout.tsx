"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Logo from "@/components/logo";

const pathWithLogo = [
  "/sign-in",
  "/sign-up",
  "/sign-in/magic",
  "/sign-in/forgot-password",
];

export function AuthLogoLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isPathWithLogo = pathWithLogo.includes(pathname);

  if (isPathWithLogo) {
    return (
      <section className="flex justify-between">
        <div className="w-1/2 flex items-center justify-center h-[inherit]">
          <Logo height={400} width={400} className="w-[25rem] h-[25rem]" />
        </div>
        <div className="flex items-center justify-center py-6">
          <div className="mx-auto max-w-[22.375rem] space-y-4">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center">
      <div className="flex items-center justify-center py-6">
        <div className="mx-auto max-w-xl space-y-4">{children}</div>
      </div>
    </section>
  );
}
