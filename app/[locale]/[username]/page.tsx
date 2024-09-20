import Link from "next/link";
import { UserProfileData } from "@/data/user-profile-data";
import { UserProfileHeader } from "@/components/user-profile/user-header";

export default function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = params.username;
  const userData = UserProfileData.find(({ username }) => username === user);
  if (!userData) {
    return (
      <div className="flex flex-col items-center py-8">
        <h1 className="text-3xl font-bold mb-10">
          Sorry, this page isn&apos;t available.
        </h1>
        <h1 className="text-lg font-semibold">
          The link you followed maybe broken, or the page may have been removed.{" "}
          <span className="text-blue-500 hover:text-blue-400 duration-300">
            <Link href="/">Go back to Chop.</Link>
          </span>
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-8">
      <UserProfileHeader {...userData} />
    </div>
  );
}
