import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface LoadingButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  isLoading?: boolean;
  spinnerStyles?: string;
}

export function LoadingButton({
  isLoading,
  children,
  spinnerStyles,
  ...buttonProps
}: LoadingButtonProps) {
  return (
    <Button {...buttonProps}>
      {isLoading ? (
        <LoaderCircle
          className={cn("animate-spin text-black size-6", spinnerStyles)}
        />
      ) : (
        children
      )}
    </Button>
  );
}
