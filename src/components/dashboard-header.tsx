import React from "react";
import { Button } from "./ui/button";
import { BellIcon } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-center border-b bg-background px-4 md:static md:h-auto md:border-0 md:bg-transparent md:px-6">
      Chop Inc.
    </header>
  );
}
