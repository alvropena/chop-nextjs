import Link from "next/link";
import { LoginForm } from "@/components/composites/login-form";
import { OauthLoginButtons } from "@/components/composites/oauth-login-buttons";

export default function SignInPage() {
  return (
    <>
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-gray-500 dark:text-gray-400">
          New to Chop?{" "}
          <span className="text-primary font-semibold">
            <Link href="/sign-up">Create an account.</Link>
          </span>
        </p>
      </div>
      <div className="space-y-4">
        <LoginForm />
        <div className="text-end text-sm text-primary font-semibold">
          <Link href="/sign-in/forgot-password">Forgot password</Link>
        </div>
        <OauthLoginButtons />
      </div>
    </>
  );
}
