// import { signUpAction } from "./actions";
import { RegisterForm } from "@/components/composites/register-form";
import Logo from "@/components/logo";

export default function RegisterPage() {
  // const { execute, isPending, error } = useServerAction(signUpAction, {
  //   onError({ err }) {
  //     toast({
  //       title: "Something went wrong",
  //       description: err.message,
  //       variant: "destructive",
  //     });
  //   },
  // });

  return <h1>qlq</h1>;

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <h1 className="text-center">Sign Up</h1>
      <section className="flex gap-8">
        <div className="w-1/2">
          <Logo />
        </div>

        <RegisterForm />
      </section>
    </div>
  );
}
