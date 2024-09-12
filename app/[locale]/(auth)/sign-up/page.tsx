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

  return (
    <div>
      <section className="flex justify-between">
        <div className="w-1/2 flex items-center justify-center h-[inherit]">
          <Logo height={400} width={400} className="w-[25rem] h-[25rem]" />
        </div>
        <div className="space-y-3 w-5/6 max-w-[24rem]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-1">Sign up</h1>
            <h2 className="text-lg text-gray-500">
              Join the best learning platform now
            </h2>
          </div>
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}
