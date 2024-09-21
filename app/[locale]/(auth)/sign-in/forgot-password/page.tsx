import { ForgotPasswordForm } from "@/components/composites/forgot-password-form";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="space-y-3 text-center w-[21rem] sm:w-[22.375rem]">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Already have your password?{" "}
          <span className="text-primary font-semibold">
            <Link href="/sign-in">Sign in</Link>
          </span>
        </p>
      </div>
      <div className="space-y-4">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
