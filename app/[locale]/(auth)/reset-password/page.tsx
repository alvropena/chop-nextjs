import { ResetPasswordForm } from "@/components/composites/reset-password-form";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  return (
    <>
      <div className="space-y-3 text-center w-[22.375rem]">
        <h1 className="text-3xl font-bold">Reset password</h1>
      </div>
      <div className="space-y-4">
        <ResetPasswordForm token={searchParams?.token} />
      </div>
    </>
  );
}
