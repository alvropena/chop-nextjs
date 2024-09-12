// import { signUpAction } from "./actions";
import Link from "next/link";
import { RegisterForm } from "@/components/composites/register-form";
import { OauthLoginButtons } from "@/components/composites/oauth-login-buttons";

export default function SignUpPage() {
  // const { execute, isPending, error } = useServerAction(signUpAction, {
  //   onError({ err }) {
  //     toast({
  //       title: "Something went wrong",
  //       description: err.message,
  //       variant: "destructive",
  //     });
  //   },
  // });

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-1">Sign up</h1>
        <h2 className="text-lg text-gray-500">
          Join the best learning platform now
        </h2>
      </div>
      <div className="space-y-4">
        <RegisterForm />
        <p className="text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <span className="text-primary font-semibold">
            <Link href="/sign-in">Sign in.</Link>
          </span>
        </p>
        <OauthLoginButtons />
      </div>
    </>
  );
}
